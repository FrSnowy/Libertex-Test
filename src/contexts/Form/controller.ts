import * as FormAPI from './api';
import * as FormT from './types';
import { Direction } from 'features/SendButton';

export const MIN_SUM_INV = 100;
export const MAX_SUM_INV = 200000;

export const MIN_MULT = 1;
export const MAX_MULT = 40;

export const MIN_LIMIT_PERCENT = 10;
export const STOP_LOSS_MAX_PERCENT = 100;

export const sumInvValidate = (v: number): boolean => {
  return v >= MIN_SUM_INV && v <= MAX_SUM_INV;
};

export const multValidate = (v: number): boolean => {
  return (v >= MIN_MULT && v <= MAX_MULT);
}

export const limitValidate = (limit: FormT.LimitType, sumInv: number, limitType: FormT.LimitCurrency): 'not-enough' | 'too-much' | true => {
  if (!limit.active) return true;
  if (limitType === '%' && limit.percent < MIN_LIMIT_PERCENT) return 'not-enough';
  if (limitType === '$' && limit.value < sumInv * (MIN_LIMIT_PERCENT / 100)) return 'not-enough';
  if (limitType === '%' && limit.type === 'stopLoss' && limit.percent > STOP_LOSS_MAX_PERCENT) return 'too-much';
  if (limitType === '$' && limit.type === 'stopLoss' && limit.value > sumInv) return 'too-much';
  return true;
}

export const registerInvestment = async (
  direction: Direction,
  { sumInv, mult, takeProfit, stopLoss }: FormT.RegisterInvestmentProps
) => {
  const formattedData: FormT.RegisterInvestmentDataProps = { sumInv, mult, direction }
  if (takeProfit.active) formattedData.takeProfit = takeProfit.value;
  if (stopLoss.active) formattedData.stopLoss = stopLoss.value;
  return await FormAPI.registerInvestment(formattedData);
};