export interface SettingsState {
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  fontSize: number;
  headerFontSize: number;
  // Font sizes for different elements
  nameFontSize: number;
  addressFontSize: number;
  phoneFontSize: number;
  itemsFontSize: number;
  totalsFontSize: number;
  notesFontSize: number;
  defaultShippingOption: string;
  companyName: string;
  printLogo: boolean;
  showContactInfo: boolean;
  contactLabel: string;
  logoUrl: string;
  logoPosition: 'top' | 'right' | 'left' | 'inline';
  logoSize: number;
  logoMarginTop: number;
  logoMarginBottom: number;
  logoMarginLeft: number;
  logoMarginRight: number;
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  contactFontSize: number;
  contactColor: string;
  headerColor: string;
  labelColor: string;
}

export const defaultSettings: SettingsState = {
  name: 'مركز العامر',
  address: '',
  phone1: '01555335598',
  phone2: '01026043165',
  fontSize: 20,
  headerFontSize: 32,
  // Default values for new font sizes
  nameFontSize: 24,
  addressFontSize: 18,
  phoneFontSize: 16,
  itemsFontSize: 16,
  totalsFontSize: 20,
  notesFontSize: 14,
  defaultShippingOption: 'على المستلم ذهاب',
  companyName: 'مركز العامر لأجهزة الكاشير وأنظمة المحاسبة',
  printLogo: true,
  showContactInfo: true,
  contactLabel: 'مركز العامر',
  logoUrl: '',
  logoPosition: 'top',
  logoSize: 64,
  logoMarginTop: -100,
  logoMarginBottom: -100,
  logoMarginLeft: -100,
  logoMarginRight: -100,
  theme: 'light',
  language: 'ar',
  contactFontSize: 24,
  contactColor: '#4169E1',
  headerColor: '#4169E1',
  labelColor: '#000000'
}