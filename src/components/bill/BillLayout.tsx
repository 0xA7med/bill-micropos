import React from 'react';
import { SettingsState } from '../../types/settings';
import BillHeader from './BillHeader';
import BillForm from './BillForm';
import { BillFormData } from '../../types/bill';

interface BillLayoutProps {
  settings: SettingsState;
  formData: BillFormData;
  onFormChange: (updates: Partial<BillFormData>) => void;
  onToggleCost: () => void;
}

const BillLayout: React.FC<BillLayoutProps> = ({
  settings,
  formData,
  onFormChange,
  onToggleCost
}) => {
  return (
    <div className="shipping-bill bg-white dark:bg-gray-800 shadow-lg rounded-lg dark:text-white print:shadow-none">
      <BillHeader settings={settings} />
      <BillForm 
        settings={settings}
        formData={formData}
        onFormChange={onFormChange}
        onToggleCost={onToggleCost}
      />
    </div>
  );
};

export default BillLayout;