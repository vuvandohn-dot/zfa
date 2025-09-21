
import React from 'react';
import { SparklesIcon, ResetIcon, DownloadIcon } from './icons';

interface ActionButtonsProps {
  onRestore: () => void;
  onReset: () => void;
  onDownload: () => void;
  isRestoreDisabled: boolean;
  isDownloadReady: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onRestore,
  onReset,
  onDownload,
  isRestoreDisabled,
  isDownloadReady,
}) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <button
        onClick={onRestore}
        disabled={isRestoreDisabled}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        <SparklesIcon className="w-5 h-5" />
        Restore Now
      </button>
      <button
        onClick={onReset}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
      >
        <ResetIcon className="w-5 h-5" />
        Reset
      </button>
      {isDownloadReady && (
        <button
          onClick={onDownload}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-green-600 bg-green-100 border border-green-200 rounded-lg shadow-sm hover:bg-green-200 transition-colors"
        >
          <DownloadIcon className="w-5 h-5" />
          Download (4K)
        </button>
      )}
    </div>
  );
};
