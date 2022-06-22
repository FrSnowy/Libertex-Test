import React from 'react';
import * as Elements  from './elements';
import Input, { InputFormat } from 'components/Input';
import { ReactComponent as MultipleIcon } from 'assets/multiple.svg';
import WithLabel from 'components/WithLabel';
import { FormContext } from 'contexts/Form';

const Multiplicator: React.FC = () => {
  const { investSum, multiplicator, set } = React.useContext(FormContext);
  const { multiplicator: setMultiplicator } = set;

  const onChangeHandler = React.useCallback((v: string) => {
    const multiplicator = parseInt(v, 10) || 0;
    setMultiplicator(multiplicator);
  }, [setMultiplicator]);

  return React.useMemo(() => (
    <WithLabel label='Мультипликатор'>
      <Elements.InputWrapper>
        <Input
          pre={<MultipleIcon width={6} height={6} />}
          value={multiplicator}
          format={InputFormat.number({ maxValue: 99 })}
          onChange={onChangeHandler}
        />
      </Elements.InputWrapper>
      <Elements.FinalSum>
        = ${InputFormat.currency().to(investSum * multiplicator)}
      </Elements.FinalSum>
    </WithLabel>
  ), [investSum, multiplicator, onChangeHandler])
}

export default Multiplicator;