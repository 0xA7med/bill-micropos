import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsState } from '../types/settings';
import AIAssistant from './AIAssistant';
import BillLayout from './bill/BillLayout';
import { BillFormData } from '../types/bill';
import { createEmptyBillForm } from '../utils/billHelpers';

interface ShippingBillProps {
  settings: SettingsState;
}

const ShippingBill: React.FC<ShippingBillProps> = ({ settings }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<BillFormData>(
    createEmptyBillForm(settings.defaultShippingOption)
  );

  const handleAIFill = (data: any) => {
    const hasCost = !!data.amount;
    const shippingOption = hasCost ? t('bill.options.receiverRoundTrip') : t('bill.options.receiverOneWay');
    
    setFormData(prev => ({
      ...prev,
      name: data.name || prev.name,
      address: data.address || prev.address,
      phone1: data.phone1 || prev.phone1,
      phone2: data.phone2 || prev.phone2,
      amount: data.amount || '',
      productDesc: data.productDesc || prev.productDesc,
      hasCost,
      shippingOption
    }));
  };

  const handleFormChange = (updates: Partial<BillFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleCost = () => {
    setFormData(prev => ({
      ...prev,
      hasCost: !prev.hasCost,
      amount: !prev.hasCost ? prev.amount : '',
      shippingOption: !prev.hasCost ? t('bill.options.receiverRoundTrip') : t('bill.options.receiverOneWay')
    }));
  };

  return (
    <div className="bill-container">
      <div className="print:hidden md:w-1/3 mb-6">
        <AIAssistant onFillForm={handleAIFill} />
      </div>
      <div className="print:w-full">
        <BillLayout
          settings={settings}
          formData={formData}
          onFormChange={handleFormChange}
          onToggleCost={toggleCost}
        />
      </div>
    </div>
  );
};

export default ShippingBill;