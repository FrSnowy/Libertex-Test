import React from 'react';

type LimitType = {
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
  const [lossLimitPercent, setLossLimitPercent] = React.useState<number>(defaultContextValue.lossLimit.value);

  const setIncomeLimit = React.useCallback((t: '%' | '$', v: number) => {
    switch (t) {
      case '%':
        setIncomeLimitPercent(v);
        setIncomeLimitValue(investSum * (v / 100));
        break;
      case '$':
      default:
        setIncomeLimitPercent((incomeLimitValue / investSum) * 100);
        setIncomeLimitValue(v); 
        break;
    }
  }, [investSum, incomeLimitValue]);

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
        setLossLimitPercent(lossPercent);
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
      incomeLimitValue: setIncomeLimit,
      lossLimitActive: setIsLossLimitActive,
      lossLimitValue: setIncomeLimit,
    }
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider;