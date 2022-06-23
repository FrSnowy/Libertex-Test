import React from 'react';
import * as FormAPI from 'api/Form';
import { Direction } from 'features/SendButton';

export type LimitCurrency = '%' | '$';

export type LimitType = {
  active: boolean,
  type: 'takeProfit' | 'stopLoss',
  percent: number,
  value: number,
  setActive: (v: boolean) => void,
  setValue: (t: LimitCurrency, v: number) => void,
};

export type FormT = {
  formRef: HTMLDivElement | null,
  setFormRef:  (v: HTMLDivElement | null) => void,
  sumInv: number,
  setSumInv: (v: number) => void,
  mult: number,
  setMult: (v: number) => void,
  limitType: LimitCurrency,
  setLimitType: (type: LimitCurrency) => void,
  takeProfit: LimitType,
  stopLoss: LimitType,
  registerInvestment: (direction: Direction) => void,
}

const defaultFn = () => console.error('Form provider was not founded');

const defaultContextValue: FormT = {
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
  registerInvestment: defaultFn,
}

export const FormContext = React.createContext<FormT>(defaultContextValue);

const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formRef, setFormRef] = React.useState<HTMLDivElement | null>(null);
  const [sumInv, setSumInv] = React.useState<number>(defaultContextValue.sumInv);
  const [mult, setMult] = React.useState<number>(defaultContextValue.mult);
  const [limitType, setLimitType] = React.useState<LimitCurrency>(defaultContextValue.limitType);
  const [isTakeProfitActive, setIsTakeProfitActive] = React.useState<boolean>(defaultContextValue.takeProfit.active);
  const [takeProfitPercent, setTakeProfitPercent] = React.useState<number>(defaultContextValue.takeProfit.percent);
  const [takeProfitValue, setTakeProfitValue] = React.useState<number>(defaultContextValue.takeProfit.value);
  const [isStopLossActive, setIsStopLossActive] = React.useState<boolean>(defaultContextValue.stopLoss.active);
  const [stopLossValue, setStopLossValue] = React.useState<number>(defaultContextValue.stopLoss.value);
  const [stopLossPercent, setStopLossPercent] = React.useState<number>(defaultContextValue.stopLoss.percent);

  React.useEffect(() => {
    switch(limitType) {
      case '%':
        const incomeLimit = Math.round(sumInv * (takeProfitPercent / 100));
        const lossLimit = Math.round(sumInv * (stopLossPercent / 100));
        setTakeProfitValue(incomeLimit);
        setStopLossValue(lossLimit);
        break;
      case '$':
      default:
        const incomePercent = parseFloat((takeProfitValue / sumInv).toFixed(2));
        const lossPercent = parseFloat((stopLossValue / sumInv).toFixed(2));
        setTakeProfitPercent(incomePercent * 100);
        setStopLossPercent(lossPercent * 100);
        break;
    }
  }, [sumInv, limitType, takeProfitValue, takeProfitPercent, stopLossValue, stopLossPercent]);

  const setLimit = React.useCallback((limitType: 'take-profit' | 'stop-loss') => {
    const setPercent = limitType === 'take-profit' ? setTakeProfitPercent : setStopLossPercent;
    const setValue = limitType === 'take-profit' ? setTakeProfitValue : setStopLossValue;
    const value = limitType === 'take-profit' ? takeProfitValue : stopLossValue;

    return (t: LimitCurrency, v: number) => {
      switch (t) {
        case '%':
          setPercent(v);
          setValue(sumInv * (v / 100));
          break;
        case '$':
        default:
          setPercent((value / sumInv) * 100);
          setValue(v); 
          break;
      }
    }
  }, [sumInv, takeProfitValue, stopLossValue]);

  const registerInvestment = React.useCallback(async (direction: Direction) => {
    const formattedData: FormAPI.RegisterInvestmentData = { sumInv, mult, direction }
    if (isTakeProfitActive) formattedData.takeProfit = takeProfitValue;
    if (isStopLossActive) formattedData.stopLoss = stopLossValue;

    return await FormAPI.registerInvestment(formattedData);
  }, [sumInv, mult, isTakeProfitActive, isStopLossActive, takeProfitValue, stopLossValue]);

  const value: FormT = {
    formRef,
    setFormRef,
    sumInv,
    setSumInv,
    mult,
    setMult,
    limitType,
    setLimitType,
    registerInvestment,
    takeProfit: {
      type: defaultContextValue.takeProfit.type,
      active: isTakeProfitActive,
      value: takeProfitValue,
      percent: takeProfitPercent,
      setActive: setIsTakeProfitActive,
      setValue: setLimit('take-profit'),
    },
    stopLoss: {
      type: defaultContextValue.stopLoss.type,
      active: isStopLossActive,
      value: stopLossValue,
      percent: stopLossPercent,
      setActive: setIsStopLossActive,
      setValue: setLimit('stop-loss'),
    },
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider;