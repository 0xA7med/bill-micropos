import { BillFormData } from '../types/bill';

export const createEmptyBillForm = (defaultShippingOption: string): BillFormData => {
  console.log('Creating an empty bill form with default shipping option:', defaultShippingOption);
  
  return {
    name: '',
    address: '',
    phone1: '',
    phone2: '',
    amount: '',
    shippingOption: defaultShippingOption,
    productDesc: '',
    hasCost: true
  };
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as Egyptian phone number
  if (cleaned.length === 11) {
    const formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    console.log('Formatted phone number:', formatted);
    return formatted;
  }
  
  console.warn('Invalid phone number format:', phone);
  return phone;
};