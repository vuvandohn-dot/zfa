
import React, { useCallback, useState, useRef } from 'react';
import { UploadIcon } from './icons';

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);
  
  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [onImageUpload]);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl transition-all duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white'}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png"
      />
      <div className="text-center">
        <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
        <button
          onClick={onButtonClick}
          className="mt-4 font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          Upload a file
        </button>
        <p className="text-slate-500">or drag and drop</p>
      </div>
      <p className="text-xs text-slate-400 mt-4">Supports JPG, PNG, up to 20MB</p>
    </div>
  );
};
