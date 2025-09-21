
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SparklesIcon } from './icons';

interface PreviewProps {
  originalImage: string;
  restoredImage: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

export const Preview: React.FC<PreviewProps> = ({ originalImage, restoredImage, isLoading, loadingMessage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);
    window.addEventListener('mousemove', handleDragMove as any);
    window.addEventListener('touchmove', handleDragMove as any);

    return () => {
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('mousemove', handleDragMove as any);
      window.removeEventListener('touchmove', handleDragMove as any);
    };
  }, [handleDragEnd, handleDragMove]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg relative aspect-video flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-60 z-30 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm">
          <SparklesIcon className="w-16 h-16 text-white animate-pulse" />
          <p className="text-white text-lg mt-4 font-semibold">{loadingMessage}</p>
        </div>
      )}
      
      <div ref={containerRef} className="relative w-full h-full select-none" onMouseMove={handleDragMove} onTouchMove={handleDragMove}>
        <img src={originalImage} alt="Original" className="absolute top-0 left-0 w-full h-full object-contain rounded-lg" draggable="false" />
        
        {restoredImage && (
          <>
            <img 
              src={restoredImage} 
              alt="Restored" 
              className="absolute top-0 left-0 w-full h-full object-contain rounded-lg" 
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              draggable="false"
            />
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white bg-opacity-80 cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full shadow-lg flex items-center justify-center"
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
              >
                <div className="w-1 h-5 bg-slate-400 rounded-full"></div>
                <div className="w-1 h-5 bg-slate-400 rounded-full transform rotate-90 absolute"></div>
              </div>
            </div>
             <div className="absolute top-2 left-2 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-full pointer-events-none">Before</div>
             <div className="absolute top-2 right-2 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-full pointer-events-none">After</div>
          </>
        )}
      </div>
    </div>
  );
};
