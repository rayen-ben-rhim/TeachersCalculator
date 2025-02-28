import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  text: string;
  fileName: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  text,
  fileName,
  variant = 'primary',
  className = ''
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch(`/${fileName}`);
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // Append to document, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  const baseStyles = "inline-flex items-center font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-6 sm:px-8",
    secondary: "bg-white text-blue-600 hover:bg-gray-100 py-3 sm:py-4 px-8 sm:px-10"
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <Download className={`${variant === 'primary' ? 'h-5 w-5' : 'h-5 sm:h-6 w-5 sm:w-6'} mr-2`} />
      {downloading ? 'Downloading...' : text}
    </button>
  );
};

export default DownloadButton; 