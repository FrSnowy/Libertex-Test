import React from 'react';
import Input, { InputFormat } from 'components/Input';
import WithLabel from 'components/WithLabel';
import { FormContext, FormController, FormC } from 'contexts/Form';

const InvestSum = () => {
  const { sumInv, setSumInv } = React.useContext(FormContext);

  const onChangeHandler = React.useCallback((v: string): void => {
    const sumInv = parseInt(v, 10) || 0;
    setSumInv(sumInv);
  }, [setSumInv]);

  const errorView = React.useMemo(() => {
    if (!!FormController.sumInvValidate(sumInv)) return null;
    return <span>Минимальная сумма инвестиции ${InputFormat.number().to(FormC.MIN_SUM_INV)}</span>
  }, [sumInv]);

  return React.useMemo(() => (
    <React.Fragment>
      <WithLabel label='Сумма инвестиции'>
        <Input
          pre='$'
          value={sumInv}
          format={InputFormat.number({ maxValue: 200000 })}
          onChange={onChangeHandler}
          error={errorView}
        />
      </WithLabel>
    </React.Fragment>
  ), [sumInv, onChangeHandler, errorView])
};

export default InvestSum;