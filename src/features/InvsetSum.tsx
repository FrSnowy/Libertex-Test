import React from 'react';
import Input, { InputFormat } from 'components/Input';
import WithLabel from 'components/WithLabel';
import { FormContext } from 'contexts/Form';

const InvestSum: React.FC = () => {
  const { investSum, set } = React.useContext(FormContext);
  const { investSum: setInvestSum } = set;

  const onChangeHandler = React.useCallback((v: string): void => {
    const investSum = parseInt(v, 10) || 0;
    setInvestSum(investSum);
  }, [setInvestSum]);

  return React.useMemo(() => (
    <WithLabel label='Сумма инвестиции'>
      <Input
        pre='$'
        value={investSum}
        format={InputFormat.number({ maxValue: 200000 })}
        onChange={onChangeHandler}
      />
    </WithLabel>
  ), [investSum, onChangeHandler])
}

export default InvestSum;