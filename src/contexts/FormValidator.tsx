import React from 'react';
import { FormContext, LimitType } from './Form';

export type FormVaidatorT = {
  sumInvValid: boolean,
  multValid: boolean,
  checkLimitValid: (limit: LimitType) => 'too-much' | 'not-enough' | true,
}

const defaultFn = (): any => console.error('FormValidator provider was not founded');

const defaultContextValue: FormVaidatorT = {
  sumInvValid: true,
  multValid: true,
  checkLimitValid: defaultFn,
}

export const FormValidatorContext = React.createContext<FormVaidatorT>(defaultContextValue);

export const MIN_SUM_INV = 100;
export const MAX_SUM_INV = 200000;

export const MIN_MULT = 1;
export const MAX_MULT = 40;

export const MIN_LIMIT_PERCENT = 10;
export const STOP_LOSS_MAX_PERCENT = 100;

const FormValidatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sumInv, mult } = React.useContext(FormContext);

  const [sumInvValid, setSumInvValid] = React.useState<boolean>(defaultContextValue.sumInvValid);
  const [multValid, setMultValid] = React.useState<boolean>(defaultContextValue.sumInvValid);

  React.useEffect(() => {
    setSumInvValid(sumInv >= MIN_SUM_INV && sumInv <= MAX_SUM_INV);
  }, [sumInv]);

  React.useEffect(() => {
    setMultValid(mult >= MIN_MULT && mult <= MAX_MULT);
  }, [mult]);

  const checkLimitValid = React.useCallback((limit: LimitType) => {
    if (!limit.active) return true;
    if (limit.percent < MIN_LIMIT_PERCENT) return 'not-enough';
    if (limit.type === 'stopLoss' && limit.percent > STOP_LOSS_MAX_PERCENT) return 'too-much';
    return true;
  }, []);

  const value: FormVaidatorT = {
    sumInvValid,
    multValid,
    checkLimitValid,
  };

  return (
    <FormValidatorContext.Provider value={value}>
      {children}
    </FormValidatorContext.Provider>
  )
}

export default FormValidatorProvider;