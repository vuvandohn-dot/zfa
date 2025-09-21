
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { RestorationOptions } from './components/RestorationOptions';
import { SidePanel } from './components/SidePanel';
import { Preview } from './components/Preview';
import { ActionButtons } from './components/ActionButtons';
import { restorePhoto } from './services/geminiService';
import { RestorationOption, UserInputState, Ethnicity, Gender } from './types';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<RestorationOption | null>(null);
  
  const initialUserInput: UserInputState = {
    gender: Gender.NONE,
    age: 30,
    ethnicity: Ethnicity.NONE,
    redrawHair: false,
    restoreClothing: false,
    removeWatermark: false,
    enhanceBackground: false,
  };
  const [userInput, setUserInput] = useState<UserInputState>(initialUserInput);

  const handleImageUpload = (file: File) => {
    handleReset();
    setOriginalImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRestore = useCallback(async () => {
    if (!originalImage || !selectedOption) {
      setError('Please upload an image and select a restoration option.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingMessage('Preparing your photo for restoration...');

    try {
      const base64Image = await fileToBase64(originalImage);
      const mimeType = originalImage.type;
      
      setLoadingMessage('AI is working its magic... this may take a moment.');
      const restoredBase64 = await restorePhoto(base64Image, mimeType, selectedOption, userInput);
      setRestoredImageUrl(`data:image/png;base64,${restoredBase64}`);
    } catch (err) {
      console.error(err);
      setError('An error occurred during restoration. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [originalImage, selectedOption, userInput]);

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setRestoredImageUrl(null);
    setIsLoading(false);
    setError(null);
    setSelectedOption(null);
    setUserInput(initialUserInput);
  };

  const handleDownload = () => {
    if (!restoredImageUrl) return;
    const link = document.createElement('a');
    link.href = restoredImageUrl;
    link.download = `restored-${originalImage?.name || 'photo'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col p-4 md:p-8">
      <Header />
      <main className="flex-grow container mx-auto max-w-7xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {!originalImageUrl && <UploadSection onImageUpload={handleImageUpload} />}
            {originalImageUrl && (
               <Preview 
                originalImage={originalImageUrl}
                restoredImage={restoredImageUrl}
                isLoading={isLoading}
                loadingMessage={loadingMessage}
              />
            )}
            <RestorationOptions selectedOption={selectedOption} onSelectOption={setSelectedOption} />
          </div>
          <div className="lg:col-span-4">
            <SidePanel userInput={userInput} setUserInput={setUserInput} />
          </div>
        </div>
        {error && <div className="text-center text-red-500 mt-4 bg-red-100 p-3 rounded-lg">{error}</div>}
        <ActionButtons
          onRestore={handleRestore}
          onReset={handleReset}
          onDownload={handleDownload}
          isRestoreDisabled={!originalImage || !selectedOption || isLoading}
          isDownloadReady={!!restoredImageUrl && !isLoading}
        />
      </main>
    </div>
  );
};

export default App;
