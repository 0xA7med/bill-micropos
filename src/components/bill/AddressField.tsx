import React from 'react';
import { useTranslation } from 'react-i18next';

interface AddressFieldProps {
  value: string;
  onChange: (value: string) => void;
  labelColor: string;
}

const AddressField: React.FC<AddressFieldProps> = ({ value, onChange, labelColor }) => {
  const { t } = useTranslation();

  return (
    <div className="customer-address flex bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
      <label 
        className="shrink-0 px-4 py-2 font-bold text-base"
        style={{ color: labelColor }}
      >
        {t('bill.address')}:
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 bg-transparent border-none focus:ring-0 text-lg resize-none min-h-[40px]"
        rows={2}
      />
    </div>
  );
};

export default AddressField;
