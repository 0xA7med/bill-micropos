import React from 'react';
import { useTranslation } from 'react-i18next';
import NameField from './NameField';
import AddressField from './AddressField';
import PhoneField from './PhoneField';
import AmountField from './AmountField';
import ShippingField from './ShippingField';
import { BillFormData } from '../../types/bill';
import { SettingsState } from '../../types/settings';

interface BillFormProps {
  settings: SettingsState;
  formData: BillFormData;
  onFormChange: (updates: Partial<BillFormData>) => void;
  onToggleCost: () => void;
}

const BillForm: React.FC<BillFormProps> = ({
  settings,
  formData,
  onFormChange,
  onToggleCost
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-3">
      <NameField
        value={formData.name}
        onChange={(value) => onFormChange({ name: value })}
        labelColor={settings.labelColor}
      />

      <AddressField
        value={formData.address}
        onChange={(value) => onFormChange({ address: value })}
        labelColor={settings.labelColor}
      />

      <PhoneField
        phone1={formData.phone1}
        phone2={formData.phone2}
        onChangePhone1={(value) => onFormChange({ phone1: value })}
        onChangePhone2={(value) => onFormChange({ phone2: value })}
        labelColor={settings.labelColor}
      />

      <div className="grid grid-cols-2 gap-3">
        <AmountField
          value={formData.amount}
          hasCost={formData.hasCost}
          onChange={(value) => onFormChange({ amount: value })}
          onToggleCost={onToggleCost}
          labelColor={settings.labelColor}
        />

        <ShippingField
          value={formData.shippingOption}
          onChange={(value) => onFormChange({ shippingOption: value })}
          labelColor={settings.labelColor}
        />
      </div>

      <div className="text-center mt-2">
        {settings.showContactInfo && (
          <p className="mb-4" style={{ 
            fontSize: `${settings.contactFontSize}px`,
            color: settings.contactColor 
          }}>
            {settings.contactLabel && `${settings.contactLabel}: `}
            {settings.phone1}
            {settings.phone2 && ` - ${settings.phone2}`}
          </p>
        )}
        <input 
          type="text"
          value={formData.productDesc}
          onChange={(e) => onFormChange({ productDesc: e.target.value })}
          placeholder={t('bill.productDesc')}
          className="w-full p-2 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded text-center shadow-sm print:shadow"
        />
      </div>
    </div>
  );
};

export default BillForm;