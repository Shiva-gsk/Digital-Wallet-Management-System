export interface UserType {
  name: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  password: number | null;
  phoneNum: string | null;
  is_admin: "USER" | "ADMIN";
  wallet_id: string | null;
}

export interface MoneyRequest {
  id: string;
  amount: number;
  request_date: Date;
  status: string;
  receiver_id: string;
  sender_id: string;
  desc: string | null;
  sender?: { name: string | null; email: string };
  receiver?: { name: string | null; email: string };
}

export interface Transactions {
  id: string;
  amount: number;
  status: string;
  receiver_id: string;
  sender_id: string;
  transaction_date: Date;
  desc: string | null;
  type: string;
  sender?: { username: string | null; email: string };
  receiver?: { username: string | null; email: string };
}
