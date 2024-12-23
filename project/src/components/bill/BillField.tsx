import React from 'react';
import { SettingsState } from '../../types/settings';

interface BillFieldProps {
  label: string;
  labelColor: string;
  children: React.ReactNode;
  className?: string;
}

const BillField: React.FC<BillFieldProps> = ({ 
  label, 
  labelColor, 
  children,
  className = ''
}) => {
  return (
    <div className={`border dark:border-gray-600 rounded-lg bill-field shadow-sm print:shadow ${className}`}>
      <div className="grid grid-cols-4">
        <div 
          className="col-span-1 p-2 bill-label border-l dark:border-gray-600" 
          style={{ color: labelColor }}
        >
          {label}
        </div>
        <div className="col-span-3 p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BillField;