import React from 'react';
import Input, { InputFormat } from 'components/Input';
import WithLabel from 'components/WithLabel';
import { FormContext, LimitType } from 'contexts/Form';
import Check from 'components/Check';
import { FormValidatorContext, MIN_LIMIT_PERCENT, STOP_LOSS_MAX_PERCENT } from 'contexts/FormValidator';

type LimitProps = {
  limit: LimitType,
  children: string,
}

const Limit: React.FC<LimitProps> = ({ limit, children }) => {
  const { limitType, sumInv } = React.useContext(FormContext);
  const { checkLimitValid } = React.useContext(FormValidatorContext);
  const { active, value, percent, setActive, setValue } = limit;

  const checkHandler = React.useCallback((v: boolean) => setActive(v), [setActive]);
  const onLimitChangeHandler = React.useCallback((v: string) => {
    const numericVal = parseInt(v, 10) || 0;
    setValue(limitType, numericVal)
  }, [limitType, setValue]);

  const errorView = React.useMemo(() => {
    const isOK = checkLimitValid(limit);
    if (isOK && typeof isOK !== 'string') return null;
    if (isOK === 'not-enough') {
      if (limitType === '%') return `Не может быть меньше ${MIN_LIMIT_PERCENT}%`;
      if (limitType === '$') return (
        `Не может быть меньше $${InputFormat.number().to(sumInv * MIN_LIMIT_PERCENT / 100)}`
      );
      return null;
    }
    if (isOK === 'too-much') {
      if (limitType === '%') return `Не может быть больше ${STOP_LOSS_MAX_PERCENT}%`;
      if (limitType === '$') return `Не может быть больше $${InputFormat.number().to(sumInv)}`;
      return null;
    }
    return null;
  }, [limit, limitType, checkLimitValid, sumInv]);

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
        error={errorView}
      />
    </WithLabel>
  ), [active, limitType, value, percent, onLimitChangeHandler, checkBox, errorView]);
}

export default Limit;