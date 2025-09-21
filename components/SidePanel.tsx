
import React from 'react';
import { UserInputState, Gender, Ethnicity } from '../types';

interface SidePanelProps {
  userInput: UserInputState;
  setUserInput: React.Dispatch<React.SetStateAction<UserInputState>>;
}

export const SidePanel: React.FC<SidePanelProps> = ({ userInput, setUserInput }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserInput(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenderChange = (gender: Gender) => {
    setUserInput(prev => ({ ...prev, gender }));
  };

  const CheckboxOption: React.FC<{ id: keyof UserInputState; label: string }> = ({ id, label }) => (
    <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={!!userInput[id]}
        onChange={handleInputChange}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <span className="text-slate-600">{label}</span>
    </label>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 sticky top-8">
      <h2 className="text-lg font-semibold text-slate-700">Refine Details</h2>

      {/* Gender Selector */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Gender</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleGenderChange(Gender.MALE)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${userInput.gender === Gender.MALE ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            Male
          </button>
          <button
            onClick={() => handleGenderChange(Gender.FEMALE)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${userInput.gender === Gender.FEMALE ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            Female
          </button>
        </div>
      </div>

      {/* Age Slider */}
      <div>
        <label htmlFor="age" className="flex justify-between text-sm font-medium text-slate-600">
          <span>Age</span>
          <span>{userInput.age}</span>
        </label>
        <input
          id="age"
          name="age"
          type="range"
          min="0"
          max="100"
          value={userInput.age}
          onChange={(e) => setUserInput(p => ({ ...p, age: parseInt(e.target.value, 10) }))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Ethnicity Dropdown */}
      <div>
        <label htmlFor="ethnicity" className="block text-sm font-medium text-slate-600">Ethnicity</label>
        <select
          id="ethnicity"
          name="ethnicity"
          value={userInput.ethnicity}
          onChange={handleSelectChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {Object.values(Ethnicity).map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>
      
      {/* Additional Options */}
      <div className="space-y-4 pt-2">
         <h3 className="text-sm font-medium text-slate-600">Additional Options</h3>
        <CheckboxOption id="redrawHair" label="Redraw hair details" />
        <CheckboxOption id="restoreClothing" label="Restore clothing details" />
        <CheckboxOption id="removeWatermark" label="Remove watermark/signature" />
        <CheckboxOption id="enhanceBackground" label="Background enhancement" />
      </div>

    </div>
  );
};
