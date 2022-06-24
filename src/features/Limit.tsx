import React from 'react';
import Input, { InputFormat } from 'components/Input';
import WithLabel from 'components/WithLabel';
import { FormContext, FormController, FormT, FormC } from 'contexts/Form';
import Check from 'components/Check';

type LimitProps = {
  limit: FormT.LimitType,
  children: string,
}

const Limit: React.FC<LimitProps> = ({ limit, children }) => {
  const { limitType, sumInv } = React.useContext(FormContext);
  const { active, value, percent, setActive, setValue } = limit;

  const checkHandler = React.useCallback((v: boolean) => setActive(v), [setActive]);
  const onLimitChangeHandler = React.useCallback((v: string) => {
    const numericVal = parseInt(v, 10) || 0;
    setValue(limitType, numericVal)
  }, [limitType, setValue]);

  const errorView = React.useMemo(() => {
    const isOK = FormController.limitValidate(limit, sumInv, limitType);
    if (isOK && typeof isOK !== 'string') return null;
    if (isOK === 'not-enough') {
      if (limitType === '%') return `Не может быть меньше ${FormC.MIN_LIMIT_PERCENT}%`;
      if (limitType === '$') return (
        `Не может быть меньше $${InputFormat.number().to(sumInv * FormC.MIN_LIMIT_PERCENT / 100)}`
      );
      return null;
    }
    if (isOK === 'too-much') {
      if (limitType === '%') return `Не может быть больше ${FormC.STOP_LOSS_MAX_PERCENT}%`;
      if (limitType === '$') return `Не может быть больше $${InputFormat.number().to(sumInv)}`;
      return null;
    }
    return null;
  }, [limit, limitType, sumInv]);

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
    // We dont wont to update view when changing values while input is disabled
    //eslint-disable-next-line react-hooks/exhaustive-deps
  ), active ? [active, limitType, value, percent, onLimitChangeHandler, checkBox, errorView] : [active, limitType]);
}

export default Limit;