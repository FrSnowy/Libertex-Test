import React from 'react';
import * as Elements  from './elements';
import Input, { InputFormat } from 'components/Input';
import { ReactComponent as MultipleIcon } from 'assets/multiple.svg';
import WithLabel from 'components/WithLabel';
import { FormContext, FormController } from 'contexts/Form';
import SliderTooltip from './SliderTooltip';
import { throttle } from 'throttle-debounce';

const Multiplicator: React.FC = () => {
  const { sumInv, mult, setMult } = React.useContext(FormContext);
  const [inputRef, setInputRef] = React.useState<HTMLDivElement | null>(null);
  const [showSlider, setShowSlider] = React.useState<boolean>(false);

  const [isBlured, setIsBlured] = React.useState<boolean>(false);
  const [isOutside, setIsOutside] = React.useState<boolean>(false);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const onChangeHandler = React.useMemo(() => throttle(100, (v: string | number) => {
    setMult(typeof v === 'string' ? parseInt(v, 10) || 0 : v);
  }), [setMult]);

  const onFocusHandler = React.useCallback(() => {
    setShowSlider(true)
    setIsBlured(false);
  }, []);

  const onBlurHandler = React.useCallback(() => {
    setIsBlured(true)
    if (!isOutside || isDragging) return;
    setShowSlider(false)
    setIsBlured(false)
    setIsOutside(false);
  }, [isOutside, isDragging]);

  const onMouseEnterHandler = React.useCallback(() => {
    setIsOutside(false);
  }, []);

  const onMouseLeaveHandler = React.useCallback(() => {
    setIsOutside(true);
    if (!isBlured || isDragging) return;
    setShowSlider(false)
    setIsBlured(false)
    setIsOutside(false);
  }, [isBlured, isDragging]);

  const onDragStartHandler = React.useCallback(() => {
    setIsDragging(true)
  }, []);

  const onDragEndHandler = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const errorView = React.useMemo(() => {
    if (!!FormController.multValidate(mult)) return null;
    return 'Неверное значение мультипликатора'
  }, [mult]);

  const inputView = React.useMemo(() => (
    <Elements.InputWrapper ref={r => setInputRef(r)}>
      <Input
        pre={<MultipleIcon width={6} height={6} />}
        value={mult}
        format={InputFormat.number({ maxValue: 99 })}
        onChange={onChangeHandler}
        error={errorView}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
      />
    </Elements.InputWrapper>
  ), [mult, onChangeHandler, errorView, onBlurHandler, onFocusHandler]);

  const sumView = React.useMemo(() => (
    <Elements.FinalSum>
      = ${InputFormat.number().to(sumInv * mult)}
    </Elements.FinalSum>
  ), [sumInv, mult]);

  const slider = React.useMemo(() => {
    if (!showSlider) return null;
    return (
      <SliderTooltip
        value={mult}
        onChange={onChangeHandler}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
        inputRef={inputRef}
      />
    )
  }, [showSlider, mult, onChangeHandler, inputRef, onDragStartHandler, onDragEndHandler]);

  return React.useMemo(() => (
    <WithLabel
      label='Мультипликатор'
      zIndex={1}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {inputView}
      {sumView}
      {slider}
    </WithLabel>
  ), [inputView, sumView, slider, onMouseEnterHandler, onMouseLeaveHandler])
}

export default Multiplicator;