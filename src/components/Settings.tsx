import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SettingsState, defaultSettings } from '../types/settings';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import LogoUpload from './LogoUpload';

interface SettingsProps {
  settings: SettingsState;
  onSave: (settings: SettingsState) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSave, onBack }) => {
  const [currentSettings, setCurrentSettings] = React.useState(settings);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLogo = localStorage.getItem('logoImage');
    if (savedLogo) {
      setCurrentSettings(prev => ({ ...prev, logoUrl: savedLogo }));
    }

    const fontSizeKeys: (keyof SettingsState)[] = [
      'headerFontSize',
      'nameFontSize',
      'addressFontSize',
      'phoneFontSize',
      'itemsFontSize',
      'totalsFontSize',
      'notesFontSize',
      'contactFontSize'
    ];

    const savedSettings = { ...currentSettings };
    let hasChanges = false;

    fontSizeKeys.forEach(key => {
      const savedValue = localStorage.getItem(`default_${key}`);
      if (savedValue) {
        savedSettings[key] = Number(savedValue);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setCurrentSettings(savedSettings);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(currentSettings);
  };

  const handleReset = () => {
    localStorage.removeItem('logoImage');
    setCurrentSettings(defaultSettings);
  };

  const handleLogoChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setCurrentSettings(prev => ({ ...prev, logoUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveFontSizeAsDefault = (key: keyof SettingsState, value: number) => {
    localStorage.setItem(`default_${key}`, value.toString());
    alert(t('settings.defaultSaved'));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          {i18n.language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          {t('settings.back')}
        </button>
        <h2 className="text-2xl font-bold text-center flex-1 dark:text-white">{t('settings.title')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Settings */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">{t('settings.basicSettings')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.companyName')}</label>
                <input
                  type="text"
                  value={currentSettings.companyName}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.headerFontSize')}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="16"
                    max="36"
                    value={currentSettings.headerFontSize}
                    onChange={(e) => setCurrentSettings(prev => ({ ...prev, headerFontSize: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveFontSizeAsDefault('headerFontSize', currentSettings.headerFontSize)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t('settings.saveAsDefault')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">{t('settings.contactInfo')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.phone1')}</label>
                <input
                  type="text"
                  value={currentSettings.phone1}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, phone1: e.target.value }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.phone2')}</label>
                <input
                  type="text"
                  value={currentSettings.phone2}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, phone2: e.target.value }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">{t('settings.appearance')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.headerColor')}</label>
                <input
                  type="color"
                  value={currentSettings.headerColor}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, headerColor: e.target.value }))}
                  className="w-full p-1 h-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.labelColor')}</label>
                <input
                  type="color"
                  value={currentSettings.labelColor}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, labelColor: e.target.value }))}
                  className="w-full p-1 h-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Contact Display Settings */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">{t('settings.contactDisplay')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.contact.label')}</label>
                <input
                  type="text"
                  value={currentSettings.contactLabel}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, contactLabel: e.target.value }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.contactFontSize')}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="12"
                    max="24"
                    value={currentSettings.contactFontSize}
                    onChange={(e) => setCurrentSettings(prev => ({ ...prev, contactFontSize: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveFontSizeAsDefault('contactFontSize', currentSettings.contactFontSize)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t('settings.saveAsDefault')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.contactColor')}</label>
                <input
                  type="color"
                  value={currentSettings.contactColor}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, contactColor: e.target.value }))}
                  className="w-full p-1 h-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Font Size Settings */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">{t('settings.fontSize')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.nameFontSize')}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="12"
                    max="36"
                    value={currentSettings.nameFontSize}
                    onChange={(e) => setCurrentSettings(prev => ({ ...prev, nameFontSize: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveFontSizeAsDefault('nameFontSize', currentSettings.nameFontSize)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t('settings.saveAsDefault')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.addressFontSize')}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="12"
                    max="36"
                    value={currentSettings.addressFontSize}
                    onChange={(e) => setCurrentSettings(prev => ({ ...prev, addressFontSize: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveFontSizeAsDefault('addressFontSize', currentSettings.addressFontSize)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t('settings.saveAsDefault')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.phoneFontSize')}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="12"
                    max="36"
                    value={currentSettings.phoneFontSize}
                    onChange={(e) => setCurrentSettings(prev => ({ ...prev, phoneFontSize: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveFontSizeAsDefault('phoneFontSize', currentSettings.phoneFontSize)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t('settings.saveAsDefault')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.itemsFontSize')}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="12"
                    max="36"
                    value={currentSettings.itemsFontSize}
                    onChange={(e) => setCurrentSettings(prev => ({ ...prev, itemsFontSize: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveFontSizeAsDefault('itemsFontSize', currentSettings.itemsFontSize)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t('settings.saveAsDefault')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.totalsFontSize')}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="12"
                    max="36"
                    value={currentSettings.totalsFontSize}
                    onChange={(e) => setCurrentSettings(prev => ({ ...prev, totalsFontSize: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveFontSizeAsDefault('totalsFontSize', currentSettings.totalsFontSize)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t('settings.saveAsDefault')}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.notesFontSize')}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="12"
                    max="36"
                    value={currentSettings.notesFontSize}
                    onChange={(e) => setCurrentSettings(prev => ({ ...prev, notesFontSize: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveFontSizeAsDefault('notesFontSize', currentSettings.notesFontSize)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    {t('settings.saveAsDefault')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Settings */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">{t('settings.logo.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.logo.position')}</label>
                <select
                  value={currentSettings.logoPosition}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, logoPosition: e.target.value as 'top' | 'right' | 'left' | 'inline' }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="top">{t('settings.logo.positions.top')}</option>
                  <option value="right">{t('settings.logo.positions.right')}</option>
                  <option value="left">{t('settings.logo.positions.left')}</option>
                  <option value="inline">{t('settings.logo.positions.inline')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.logo.size')}</label>
                <input
                  type="number"
                  min="32"
                  max="256"
                  value={currentSettings.logoSize}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, logoSize: Number(e.target.value) }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            {/* Logo Margins */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.logo.marginTop')}</label>
                <input
                  type="number"
                  value={currentSettings.logoMarginTop}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, logoMarginTop: Number(e.target.value) }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.logo.marginBottom')}</label>
                <input
                  type="number"
                  value={currentSettings.logoMarginBottom}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, logoMarginBottom: Number(e.target.value) }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.logo.marginLeft')}</label>
                <input
                  type="number"
                  value={currentSettings.logoMarginLeft}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, logoMarginLeft: Number(e.target.value) }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('settings.logo.marginRight')}</label>
                <input
                  type="number"
                  value={currentSettings.logoMarginRight}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, logoMarginRight: Number(e.target.value) }))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4">
              <LogoUpload onLogoChange={handleLogoChange} />
              {currentSettings.logoUrl && (
                <img
                  src={currentSettings.logoUrl}
                  alt="Logo preview"
                  className="mt-2 h-16 object-contain"
                />
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="col-span-2 flex flex-wrap gap-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentSettings.printLogo}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, printLogo: e.target.checked }))}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm dark:text-gray-300">{t('settings.logo.show')}</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentSettings.showContactInfo}
                  onChange={(e) => setCurrentSettings(prev => ({ ...prev, showContactInfo: e.target.checked }))}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm dark:text-gray-300">{t('settings.contact.show')}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('settings.save')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
          >
            {t('settings.reset')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;