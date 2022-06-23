import React from 'react';
import Input, { InputFormat } from 'components/Input';
import WithLabel from 'components/WithLabel';
import { FormContext } from 'contexts/Form';
import { FormValidatorContext, MIN_SUM_INV } from 'contexts/FormValidator';

const InvestSum = () => {
  const { sumInv, setSumInv } = React.useContext(FormContext);
  const { sumInvValid } = React.useContext(FormValidatorContext);

  const onChangeHandler = React.useCallback((v: string): void => {
    const sumInv = parseInt(v, 10) || 0;
    setSumInv(sumInv);
  }, [setSumInv]);

  const errorView = React.useMemo(() => {
    if (!!sumInvValid) return null;
    return <span>Минимальная сумма инвестиции ${InputFormat.number().to(MIN_SUM_INV)}</span>
  }, [sumInvValid]);

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