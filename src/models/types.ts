export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface FinancialInstitution {
  id: number;
  name: string;
  type: "BANK" | "FINTECH";
  created_at: Date;
  updated_at: Date;
}

export interface Account {
  id: number;
  user_id: number;
  institution_id: number;
  account_type: string;
  account_number: string;
  created_at: Date;
  updated_at: Date;
}

export interface Discount {
  id: number;
  institution_id: number;
  category: string;
  description: string;
  discount_percentage: number;
  day_of_week?: number;
  start_date?: Date;
  end_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface UserDiscount {
  id: number;
  user_id: number;
  discount_id: number;
  account_id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
