
import React from 'react';
import { RestorationOption } from '../types';
import { QuickRestoreIcon, FullDetailIcon, ColorizeIcon, ScratchRemovalIcon, FaceEnhancementIcon } from './icons';

interface RestorationOptionsProps {
  selectedOption: RestorationOption | null;
  onSelectOption: (option: RestorationOption) => void;
}

const options = [
  { id: RestorationOption.QUICK_RESTORE, title: 'Quick Restore', description: 'One-click fast enhancement', icon: QuickRestoreIcon },
  { id: RestorationOption.FULL_DETAIL, title: 'Full Detail Restore', description: 'High-quality advanced restoration', icon: FullDetailIcon },
  { id: RestorationOption.COLORIZE, title: 'Colorize', description: 'AI colorization for B&W photos', icon: ColorizeIcon },
  { id: RestorationOption.SCRATCH_REMOVAL, title: 'Damage Removal', description: 'Fix scratches, tears, and stains', icon: ScratchRemovalIcon },
  { id: RestorationOption.FACE_ENHANCEMENT, title: 'Face Enhancement', description: 'Improve facial details & clarity', icon: FaceEnhancementIcon },
];

const RestorationOptionCard: React.FC<{
  option: typeof options[0];
  isSelected: boolean;
  onClick: () => void;
}> = ({ option, isSelected, onClick }) => {
  const { icon: Icon, title, description } = option;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-indigo-500 bg-indigo-50 shadow-lg' : 'border-transparent bg-white hover:border-slate-300 hover:bg-slate-50 shadow-md'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </button>
  );
};

export const RestorationOptions: React.FC<RestorationOptionsProps> = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-700">Restoration Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => (
          <RestorationOptionCard
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            onClick={() => onSelectOption(option.id)}
          />
        ))}
      </div>
    </div>
  );
};
