import React from 'react';
import { SettingsState } from '../types/settings';

interface PrintStylesProps {
  settings: SettingsState;
}

const PrintStyles: React.FC<PrintStylesProps> = ({ settings }) => {
  const printStyles = `
    @media print {
      /* Name field - only input */
      .customer-name input {
        font-size: ${settings.nameFontSize}px !important;
      }
      
      /* Address field - only textarea */
      .customer-address textarea {
        font-size: ${settings.addressFontSize}px !important;
      }
      
      /* Phone field - only input */
      .customer-phone input {
        font-size: ${settings.phoneFontSize}px !important;
      }
      
      /* Items table - only inputs and selects */
      .items-table input,
      .items-table select {
        font-size: ${settings.itemsFontSize}px !important;
      }
      
      /* Totals section - only input */
      .totals-section input {
        font-size: ${settings.totalsFontSize}px !important;
      }
      
      /* Notes section - only textarea */
      .notes-section textarea {
        font-size: ${settings.notesFontSize}px !important;
      }

      /* Keep all labels at their default size */
      label {
        font-size: 14px !important;
      }
    }
  `;

  return <style>{printStyles}</style>;
};

export default PrintStyles;
