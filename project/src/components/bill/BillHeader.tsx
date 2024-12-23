import React, { useEffect, useState } from 'react';
import { SettingsState } from '../../types/settings';
import '../../styles/variables.css';

interface BillHeaderProps {
  settings: SettingsState;
}

const BillHeader: React.FC<BillHeaderProps> = ({ settings }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('print');
    
    const handlePrintChange = (e: MediaQueryListEvent) => {
      setIsPrinting(e.matches);
      if (e.matches) {
        const style = document.createElement('style');
        style.id = 'print-styles';
        style.innerHTML = `
          :root {
            --header-color: ${settings.headerColor} !important;
            --header-font-size: ${settings.headerFontSize}px !important;
            --name-font-size: ${settings.nameFontSize}px !important;
            --address-font-size: ${settings.addressFontSize}px !important;
            --phone-font-size: ${settings.phoneFontSize}px !important;
            --items-font-size: ${settings.itemsFontSize}px !important;
            --totals-font-size: ${settings.totalsFontSize}px !important;
            --notes-font-size: ${settings.notesFontSize}px !important;
          }
          .bill-header {
            color: var(--header-color) !important;
            font-size: var(--header-font-size) !important;
            margin: 2mm 0 4mm 0 !important;
            padding: 0 !important;
            text-align: center !important;
            font-weight: bold !important;
          }
          .customer-name {
            font-size: var(--name-font-size) !important;
          }
          .customer-address {
            font-size: var(--address-font-size) !important;
          }
          .customer-phone {
            font-size: var(--phone-font-size) !important;
          }
          .items-table {
            font-size: var(--items-font-size) !important;
          }
          .totals-section {
            font-size: var(--totals-font-size) !important;
          }
          .notes-section {
            font-size: var(--notes-font-size) !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        const printStyle = document.getElementById('print-styles');
        if (printStyle) {
          printStyle.remove();
        }
      }
    };

    mediaQueryList.addListener(handlePrintChange);

    return () => {
      mediaQueryList.removeListener(handlePrintChange);
      const printStyle = document.getElementById('print-styles');
      if (printStyle) {
        printStyle.remove();
      }
    };
  }, [settings]);

  const logoClasses = {
    top: 'mx-auto mb-2',
    right: 'float-right ml-2',
    left: 'float-left mr-2',
    inline: 'inline-block align-middle'
  };

  return (
    <div className="mb-4">
      {settings.printLogo && settings.logoUrl && (
        <img 
          src={settings.logoUrl} 
          alt="Logo" 
          className={`${logoClasses[settings.logoPosition]} object-contain`}
          style={{ height: `${settings.logoSize}px` }}
        />
      )}
      <h1 
        className="bill-header text-center"
        style={{
          color: 'var(--header-color)',
          fontSize: 'var(--header-font-size)',
          margin: '2mm 0 4mm 0',
          padding: 0,
          fontWeight: 'bold'
        }}
      >
        {settings.companyName}
      </h1>
    </div>
  );
};

export default BillHeader;