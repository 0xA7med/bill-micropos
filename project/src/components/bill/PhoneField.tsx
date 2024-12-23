import React from 'react';
import { useTranslation } from 'react-i18next';

interface PhoneFieldProps {
  phone1: string;
  phone2: string;
  onChangePhone1: (value: string) => void;
  onChangePhone2: (value: string) => void;
  labelColor: string;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  phone1,
  phone2,
  onChangePhone1,
  onChangePhone2,
  labelColor
}) => {
  const { t } = useTranslation();

  return (
    <div className="customer-phone flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
      <label 
        className="shrink-0 px-4 py-2 font-bold text-base"
        style={{ color: labelColor }}
      >
        {t('bill.phone')}:
      </label>
      <div className="flex-1 flex divide-x divide-gray-200 dark:divide-gray-600 rtl:divide-x-reverse">
        <input
          type="text"
          value={phone1}
          onChange={(e) => onChangePhone1(e.target.value)}
          placeholder={t('settings.phone1')}
          className="flex-1 px-3 py-2 bg-transparent border-none focus:ring-0 text-lg text-center"
        />
        <input
          type="text"
          value={phone2}
          onChange={(e) => onChangePhone2(e.target.value)}
          placeholder={t('settings.phone2')}
          className="flex-1 px-3 py-2 bg-transparent border-none focus:ring-0 text-lg text-center"
        />
      </div>
    </div>
  );
};

export default PhoneField;
