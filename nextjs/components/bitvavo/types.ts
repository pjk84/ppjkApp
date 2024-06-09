interface Asset {
  market: string;
  price: number;
  price24h: number;
  priceAction24h: number;
  available: number;
  value: number;
  amountSpent: number;
  result: number;
  returnOnInvestment: number;
  transactionHistory: TransactionHistoryItem[];
}

interface Portfolio {
  assets: Asset[];
  fetchedAt: string;
  totalValue: number;
  totalResult: number;
  totalSpent: number;
  totalReturnOnInvestment: number;
}

interface TransactionHistoryItem {
  date: Date;
  amountSpent: number;
  fees: number;
}

interface PortfolioSnapshot {
  year: number;
  month: number;
  daysInMonth: number;
  monthName: string;
  days: PortfolioSnapshotDay[];
}

interface PortfolioSnapshotDay {
  total: number;
  day: number;
  assets: AssetSnapshot[];
}

interface AssetSnapshot {
  market: string;
  value: number;
}

type TradingPlan = {
  id: string;
  createdAt: string;
  market: string;
  amount: number;
};

type CreateTradingPlanPayload = {
  market: string;
  amount: number;
};
