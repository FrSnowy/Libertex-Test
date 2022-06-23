import React from 'react';
import RadioGroup from 'components/RadioGroup';
import WithLabel from 'components/WithLabel';
import { FormContext, FormT } from 'contexts/Form';

const LimitType = () => {
  const { limitType, setLimitType } = React.useContext(FormContext);

  const onChangeHandler = React.useCallback((v: string) => setLimitType(v as FormT.LimitCurrency), [setLimitType]);

  return React.useMemo(() => (
    <WithLabel label='Ограничения в'>
      <RadioGroup variants={['%', '$']} selected={limitType} onChange={onChangeHandler} />
    </WithLabel>
  ), [limitType, onChangeHandler]);
}

export default LimitType;