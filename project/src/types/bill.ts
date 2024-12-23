export interface BillFormData {
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  amount: string;
  shippingOption: string;
  productDesc: string;
  hasCost: boolean;
}

export interface AIAnalysisResult {
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  amount: string;
  productDesc: string;
  isPaid: boolean;
}