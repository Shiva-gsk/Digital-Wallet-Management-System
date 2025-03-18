export interface UserType {
    name: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    username: string;
    password: string | null;
    phoneNum: string | null;
    is_admin: "USER" | "ADMIN";
    wallet_id: string | null;
  }

export interface MoneyRequest {
  id:string;
  status: "pending" | "completed" | "declined";
  amount: number;
  desc: string;
  sender_id: string;
  receiver_id: string;
  request_date: Date;
}