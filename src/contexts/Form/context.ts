import React from 'react';
import { FormT } from './types';

const defaultFn = () => console.error('Form provider was not founded');

export const defaultContextValue: FormT = {
  formRef: null,
  setFormRef: defaultFn,
  sumInv: 5000,
  setSumInv: defaultFn,
  mult: 40,
  setMult: defaultFn,
  limitType: '%',
  setLimitType: defaultFn,
  takeProfit: {
    active: false,
    type: 'takeProfit',
    percent: 30,
    value: 1500,
    setActive: defaultFn,
    setValue: defaultFn,
  },
  stopLoss: {
    active: false,
    type: 'stopLoss',
    percent: 30,
    value: 1500,
    setActive: defaultFn,
    setValue: defaultFn,
  },
}

export default React.createContext<FormT>(defaultContextValue);