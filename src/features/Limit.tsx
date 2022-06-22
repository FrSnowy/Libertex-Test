import React from 'react';
import Input, { InputFormat } from 'components/Input';
import WithLabel from 'components/WithLabel';
import { FormContext, LimitType } from 'contexts/Form';
import Check from 'components/Check';

type LimitProps = {
  limit: LimitType,
  children: string,
}

const Limit: React.FC<LimitProps> = ({ limit, children }) => {
  const { limitType } = React.useContext(FormContext);
  const { active, value, percent, setActive, setValue } = limit;

  const checkHandler = React.useCallback((v: boolean) => setActive(v), [setActive]);
  const onLimitChangeHandler = React.useCallback((v: string) => {
    const numericVal = parseInt(v, 10) || 0;
    setValue(limitType, numericVal)
  }, [limitType, setValue]);

  const checkBox = React.useMemo(() => (
    <Check checked={active} onChange={checkHandler}>
      {children}
    </Check>
  ), [active, children, checkHandler]);

  return React.useMemo(() => (
    <WithLabel label={checkBox}>
      <Input
        disabled={!active}
        pre={limitType}
        value={limitType === '%' ? percent : value}
        withArrowController
        format={InputFormat.number()}
        onChange={onLimitChangeHandler}
      />
    </WithLabel>
  ), [active, limitType, value, percent, onLimitChangeHandler, checkBox]);
}

export default Limit;