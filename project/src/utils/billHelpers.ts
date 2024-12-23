import { BillFormData } from '../types/bill';

export const createEmptyBillForm = (defaultShippingOption: string): BillFormData => ({
  name: '',
  address: '',
  phone1: '',
  phone2: '',
  amount: '',
  shippingOption: defaultShippingOption,
  productDesc: '',
  hasCost: true
});

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as Egyptian phone number
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
};