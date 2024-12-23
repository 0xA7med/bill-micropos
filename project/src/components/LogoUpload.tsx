import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LogoUploadProps {
  onLogoChange: (file: File) => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({ onLogoChange }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // Store the base64 string in localStorage
          localStorage.setItem('logoImage', reader.result);
          // Create a File object to pass to the parent
          const logoFile = new File([file], file.name, { type: file.type });
          onLogoChange(logoFile);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Upload className="w-4 h-4" />
        {t('settings.logo.upload')}
      </button>
    </div>
  );
};

export default LogoUpload;