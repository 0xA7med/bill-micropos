import React from 'react';
import { useTranslation } from 'react-i18next';

interface ShippingFieldProps {
  value: string;
  onChange: (value: string) => void;
  labelColor: string;
}

const ShippingField: React.FC<ShippingFieldProps> = ({
  value,
  onChange,
  labelColor
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
      <label 
        className="shrink-0 px-4 py-2 font-bold text-base"
        style={{ color: labelColor }}
      >
        {t('bill.shippingCost')}:
      </label>
      <div className="flex-1 px-3 py-2">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 text-lg print:appearance-none"
        >
          <option>{t('bill.options.sender')}</option>
          <option>{t('bill.options.receiverOneWay')}</option>
          <option>{t('bill.options.receiverRoundTrip')}</option>
        </select>
      </div>
    </div>
  );
};

export default ShippingField;
