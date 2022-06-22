import React from 'react';
import Input, { InputFormat } from 'components/Input';
import WithLabel from 'components/WithLabel';
import { FormContext } from 'contexts/Form';
import Check from 'components/Check';

const IncomeLimit: React.FC = () => {
  const { incomeLimit, limitType, set } = React.useContext(FormContext);
  const { value, percent, active } = incomeLimit;
  const { incomeLimitValue: setIncomeLimitValue, incomeLimitActive: setIncomeLimitActive } = set;

  const checkHandler = React.useCallback((v: boolean) => {
    setIncomeLimitActive(v);
  }, [setIncomeLimitActive]);

  const onLimitChangeHandler = React.useCallback((v: string) => {
    const incomeLimitValue = parseInt(v, 10) || 0;
    setIncomeLimitValue(limitType, incomeLimitValue);
  }, [limitType, setIncomeLimitValue]);

  const checkBox = React.useMemo(() => (
    <Check checked={active} onChange={checkHandler}>
      Прибыль
    </Check>
  ), [active, checkHandler]);

  return React.useMemo(() => (
    <WithLabel label={checkBox}>
      <Input
        pre={limitType}
        value={limitType === '%' ? percent : value}
        withArrowController
        format={InputFormat.currency()}
        onChange={onLimitChangeHandler}
      />
    </WithLabel>
  ), [limitType, value, percent, onLimitChangeHandler, checkBox]);
}

export default IncomeLimit;