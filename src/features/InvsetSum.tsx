import React from 'react';
import Input, { InputFormat } from 'components/Input';
import WithLabel from 'components/WithLabel';
import { FormContext } from 'contexts/Form';

const InvestSum: React.FC = () => {
  const { sumInv, setSumInv } = React.useContext(FormContext);

  const onChangeHandler = React.useCallback((v: string): void => {
    const sumInv = parseInt(v, 10) || 0;
    setSumInv(sumInv);
  }, [setSumInv]);

  return React.useMemo(() => (
    <WithLabel label='Сумма инвестиции'>
      <Input
        pre='$'
        value={sumInv}
        format={InputFormat.number({ maxValue: 200000 })}
        onChange={onChangeHandler}
      />
    </WithLabel>
  ), [sumInv, onChangeHandler])
}

export default InvestSum;