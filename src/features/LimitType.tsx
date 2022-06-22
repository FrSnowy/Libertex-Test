import React from 'react';
import RadioGroup from 'components/RadioGroup';
import WithLabel from 'components/WithLabel';
import { FormContext } from 'contexts/Form';

const LimitType = () => {
  const { limitType, set } = React.useContext(FormContext);
  const { limitType: setLimitType } = set;

  const onChangeHandler = React.useCallback((v: string) => setLimitType(v as '%' | '$'), [setLimitType]);

  return React.useMemo(() => (
    <WithLabel label='Ограничения в'>
      <RadioGroup variants={['%', '$']} selected={limitType} onChange={onChangeHandler} />
    </WithLabel>
  ), [limitType, onChangeHandler]);
}

export default LimitType;