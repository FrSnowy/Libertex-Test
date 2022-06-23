import * as FormAPI from './api';
import * as FormT from './types';
import * as FormC from './constants';
import { Direction } from 'features/SendButton';

export const sumInvValidate = (v: number): boolean => {
  return v >= FormC.MIN_SUM_INV && v <= FormC.MAX_SUM_INV;
};

export const multValidate = (v: number): boolean => {
  return (v >= FormC.MIN_MULT && v <= FormC.MAX_MULT);
}

export const limitValidate = (limit: FormT.LimitType, sumInv: number, limitType: FormT.LimitCurrency): 'not-enough' | 'too-much' | true => {
  if (!limit.active) return true;
  if (limitType === '%' && limit.percent < FormC.MIN_LIMIT_PERCENT) return 'not-enough';
  if (limitType === '$' && limit.value < sumInv * (FormC.MIN_LIMIT_PERCENT / 100)) return 'not-enough';
  if (limitType === '%' && limit.type === 'stopLoss' && limit.percent > FormC.STOP_LOSS_MAX_PERCENT) return 'too-much';
  if (limitType === '$' && limit.type === 'stopLoss' && limit.value > sumInv) return 'too-much';
  return true;
}

export const isAllValid = (p: FormT.RegisterInvestmentProps, limitType: FormT.LimitCurrency): boolean => {
  const { sumInv, mult, stopLoss, takeProfit } = p;
  const isSumValid = sumInvValidate(sumInv);
  const isMultValid = multValidate(mult);
  const isStopLossValid = limitValidate(stopLoss, sumInv, limitType);
  const isTakeProfitValid = limitValidate(takeProfit, sumInv, limitType);

  return isSumValid && isMultValid && (typeof isStopLossValid !== 'string') && (typeof isTakeProfitValid !== 'string');
};

export const registerInvestment = async (
  direction: Direction,
  { sumInv, mult, takeProfit, stopLoss }: FormT.RegisterInvestmentProps
) => {
  const formattedData: FormT.RegisterInvestmentDataProps = { sumInv, mult, direction }
  if (takeProfit.active) formattedData.takeProfit = takeProfit.value;
  if (stopLoss.active) formattedData.stopLoss = stopLoss.value;
  return await FormAPI.registerInvestment(formattedData);
};