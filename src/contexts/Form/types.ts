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
}

export type RegisterInvestmentProps = Pick<FormT, 'sumInv' | 'mult' | 'takeProfit' | 'stopLoss'>

export type RegisterInvestmentDataProps = {
  sumInv: number,
  mult: number,
  takeProfit?: number,
  stopLoss?: number,
  direction: Direction,
};
