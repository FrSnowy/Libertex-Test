import React from 'react';

export type LimitType = {
  active: boolean,
  percent: number,
  value: number,
};

export type FormT = {
  investSum: number,
  multiplicator: number,
  limitType: '%' | '$',
  incomeLimit: LimitType,
  lossLimit: LimitType,
  set: {
    investSum: (v: number) => void,
    multiplicator: (v: number) => void,
    limitType: (type: '%' | '$') => void,
    incomeLimitActive: (v: boolean) => void,
    incomeLimitValue: (t: '%' | '$', v: number) => void,
    lossLimitActive: (v: boolean) => void,
    lossLimitValue: (t: '%' | '$', v: number) => void,
  },
}

const defaultFn = (...args: any) =>  console.error('Form provider was not founded');

const defaultContextValue: FormT = {
  investSum: 5000,
  multiplicator: 40,
  limitType: '%',
  incomeLimit: {
    active: false,
    percent: 30,
    value: 1500,
  },
  lossLimit: {
    active: false,
    percent: 30,
    value: 1500,
  },
  set: {
    investSum: defaultFn,
    multiplicator: defaultFn,
    limitType: defaultFn,
    incomeLimitActive: defaultFn,
    incomeLimitValue: defaultFn,
    lossLimitActive: defaultFn,
    lossLimitValue: defaultFn,
  }
}

export const FormContext = React.createContext<FormT>(defaultContextValue);

const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [investSum, setInvestSum] = React.useState<number>(defaultContextValue.investSum);
  const [multiplicator, setMultiplicator] = React.useState<number>(defaultContextValue.multiplicator);
  const [limitType, setLimitType] = React.useState<'%' | '$'>(defaultContextValue.limitType);
  const [isIncomeLimitActive, setIsIncomeLimitActive] = React.useState<boolean>(defaultContextValue.incomeLimit.active);
  const [incomeLimitPercent, setIncomeLimitPercent] = React.useState<number>(defaultContextValue.incomeLimit.percent);
  const [incomeLimitValue, setIncomeLimitValue] = React.useState<number>(defaultContextValue.incomeLimit.value);
  const [isLossLimitActive, setIsLossLimitActive] = React.useState<boolean>(defaultContextValue.lossLimit.active);
  const [lossLimitValue, setLossLimitValue] = React.useState<number>(defaultContextValue.lossLimit.value);
  const [lossLimitPercent, setLossLimitPercent] = React.useState<number>(defaultContextValue.lossLimit.percent);

  const setLimit = React.useCallback((limitType: 'income' | 'loss') => {
    const setPercent = limitType === 'income' ? setIncomeLimitPercent : setLossLimitPercent;
    const setValue = limitType === 'income' ? setIncomeLimitValue : setLossLimitValue;
    const value = limitType === 'income' ? incomeLimitValue : lossLimitValue;

    return (t: '%' | '$', v: number) => {
      switch (t) {
        case '%':
          setPercent(v);
          setValue(investSum * (v / 100));
          break;
        case '$':
        default:
          setPercent((value / investSum) * 100);
          setValue(v); 
          break;
      }
    }
  }, [investSum, incomeLimitValue, lossLimitValue])

  React.useEffect(() => {
    switch(limitType) {
      case '%':
        const incomeLimit = Math.round(investSum * (incomeLimitPercent / 100));
        const lossLimit = Math.round(investSum * (lossLimitPercent / 100));
        setIncomeLimitValue(incomeLimit);
        setLossLimitValue(lossLimit);
        break;
      case '$':
      default:
        const incomePercent = parseFloat((incomeLimitValue / investSum).toFixed(2));
        const lossPercent = parseFloat((lossLimitValue / investSum).toFixed(2));
        setIncomeLimitPercent(incomePercent * 100);
        setLossLimitPercent(lossPercent * 100);
        break;
    }
  }, [investSum, limitType, incomeLimitValue, incomeLimitPercent, lossLimitValue, lossLimitPercent]);

  const value: FormT = {
    investSum,
    multiplicator,
    limitType,
    incomeLimit: {
      active: isIncomeLimitActive,
      value: incomeLimitValue,
      percent: incomeLimitPercent,
    },
    lossLimit: {
      active: isLossLimitActive,
      value: lossLimitValue,
      percent: lossLimitPercent,
    },
    set: {
      investSum: setInvestSum,
      multiplicator: setMultiplicator,
      limitType: setLimitType,
      incomeLimitActive: setIsIncomeLimitActive,
      incomeLimitValue: setLimit('income'),
      lossLimitActive: setIsLossLimitActive,
      lossLimitValue: setLimit('loss'),
    }
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider;