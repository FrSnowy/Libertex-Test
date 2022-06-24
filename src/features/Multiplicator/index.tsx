import React from 'react';
import * as Elements  from './elements';
import Input, { InputFormat } from 'components/Input';
import { ReactComponent as MultipleIcon } from 'assets/multiple.svg';
import WithLabel from 'components/WithLabel';
import { FormContext, FormController } from 'contexts/Form';
import SliderTooltip from './SliderTooltip';

const Multiplicator: React.FC = () => {
  const [showSlider, setShowSlider] = React.useState<boolean>(false);
  const [inputRef, setInputRef] = React.useState<HTMLDivElement | null>(null);
  const { sumInv, mult, setMult } = React.useContext(FormContext);

  const onChangeHandler = React.useCallback((v: string | number) => {
    setMult(typeof v === 'string' ? parseInt(v, 10) || 0 : v);
  }, [setMult]);

  const errorView = React.useMemo(() => {
    if (!!FormController.multValidate(mult)) return null;
    return 'Неверное значение мультипликатора'
  }, [mult]);

  return React.useMemo(() => (
    <WithLabel label='Мультипликатор'>
      <Elements.InputWrapper ref={r => setInputRef(r)}>
        <Input
          pre={<MultipleIcon width={6} height={6} />}
          value={mult}
          format={InputFormat.number({ maxValue: 99 })}
          onChange={onChangeHandler}
          error={errorView}
          onFocus={() => setShowSlider(true)}
        />
      </Elements.InputWrapper>
      <Elements.FinalSum>
        = ${InputFormat.number().to(sumInv * mult)}
      </Elements.FinalSum>
      { showSlider && <SliderTooltip value={mult} onChange={onChangeHandler} inputRef={inputRef}/> }
    </WithLabel>
  ), [sumInv, mult, onChangeHandler, errorView, inputRef, showSlider])
}

export default Multiplicator;