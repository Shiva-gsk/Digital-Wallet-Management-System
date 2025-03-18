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