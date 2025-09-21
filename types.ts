
export enum RestorationOption {
  QUICK_RESTORE = 'Quick Restore',
  FULL_DETAIL = 'Full Detail Restore',
  COLORIZE = 'Black & White to Color',
  SCRATCH_REMOVAL = 'Scratch & Damage Removal',
  FACE_ENHANCEMENT = 'Portrait & Face Enhancement'
}

export enum Gender {
  NONE = 'Not Specified',
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum Ethnicity {
  NONE = 'Not Specified',
  ASIAN = 'Asian',
  CAUCASIAN = 'Caucasian',
  AFRICAN = 'African',
  HISPANIC = 'Hispanic',
  MIDDLE_EASTERN = 'Middle Eastern',
  OTHER = 'Other'
}

export interface UserInputState {
  gender: Gender;
  age: number;
  ethnicity: Ethnicity;
  redrawHair: boolean;
  restoreClothing: boolean;
  removeWatermark: boolean;
  enhanceBackground: boolean;
}
