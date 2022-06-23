import React from 'react';
import { ErrorsT } from './types';

const defaultFn = () => console.error('Errors provider was not founded');

export const defaultContextValue: ErrorsT = {
  shaking: false,
  onShakeCompleted: defaultFn,
  makeShakeOneTime: defaultFn,
}

export default React.createContext<ErrorsT>(defaultContextValue);