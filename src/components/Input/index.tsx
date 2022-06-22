import React from 'react';
import * as Elements from './elements';
import { FormatFnT } from './formats';

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'as' | 'onChange' | 'type' | 'defaultValue'> & {
  pre?: string | JSX.Element | null,
  format?: ReturnType<FormatFnT>,
  onChange?: (v: string) => void,
  value?: number,
  withArrowController?: boolean,
};  

const Input: React.FC<InputProps> = ({
  pre,
  format,
  value: outerValue = 0,
  onChange,
  label,
  withArrowController,
  ...rest
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>('');
  const [position, setPosition] = React.useState<number | null>(null);
  const [currentInterval, setCurrentInterval] = React.useState<number>(-1);

  React.useLayoutEffect(() => {
    const initValue = format ? format.to(outerValue) : `${outerValue}`;
    setValue(initValue);
  }, [outerValue, format]);

  const getFormattedValue = (e: React.ChangeEvent<HTMLInputElement>): string => {
    if (!format) return e.target.value;
    const formattedValue = format.to(e.target.value);
    const lengthDiff = formattedValue.length - e.target.value.length;
    const selectionStart = (e.target.selectionStart || e.target.value.length) + lengthDiff;
  
    setPosition(selectionStart);
    return formattedValue;
  }

  const onInputValueChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = getFormattedValue(e);
    (!outerValue || !onChange) && setValue(val);
    onChange && onChange(format ? format.from(val) : val);
    return e.target.value;
  }

  React.useEffect(() => {
    if (!ref?.current) return;
    ref.current.selectionEnd = position;
  }, [position]);

  const preView = React.useMemo(() => (
    pre ? <Elements.Presymbol>{pre}</Elements.Presymbol> : null
  ), [pre]);

  const arrowDeactivate = ()  => window.clearInterval(currentInterval);

  const arrowActivate = (direction: 'up' | 'down', e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    arrowDeactivate();
    const target = e.currentTarget;

    const updateValue = () => {
      const clearedValue = format?.from(value) || '';
      const numericValue = parseInt(clearedValue, 10) || 0;
      const result = direction === 'up' ? `${numericValue + 1}` : `${numericValue - 1}`;
      (!outerValue || !onChange) && setValue(result);
      onChange && onChange(format ? format.from(result) : result);
    };

    const timeout = window.setTimeout(() => {
      const intervalId = window.setInterval(updateValue, 16);
      setCurrentInterval(intervalId);
    }, 500);

    const clearHandler = () => {
      updateValue();
      window.clearTimeout(timeout);
      target.removeEventListener('mouseup', clearHandler);
      target.removeEventListener('mouseleave', clearHandler);
    }
  
    target.addEventListener('mouseup', clearHandler);
    target.addEventListener('mouseleave', clearHandler);
  };

  const createHandlers = (direction: 'up' | 'down') => ({
    onMouseEnter: (e: React.MouseEvent) => arrowActivate(direction, e),
    onMouseDown: (e: React.MouseEvent) => arrowActivate(direction, e),
    onMouseLeave: arrowDeactivate,
    onMouseUp: arrowDeactivate,
  });

  return (
    <Elements.Wrapper onClick={() => ref.current?.focus()}>
      {preView}
      <Elements.Input
        value={value}
        ref={ref}
        onChange={onInputValueChanged}
        {...rest}
      />
      {
        withArrowController && (
          <Elements.ArrowsWrapper>
            <Elements.ArrowBlock {...createHandlers('up')}>▲</Elements.ArrowBlock>
            <Elements.ArrowBlock {...createHandlers('down')}>▼</Elements.ArrowBlock>
          </Elements.ArrowsWrapper>
        )
      }
    </Elements.Wrapper>
  )
};

export * as InputFormat from './formats';
export default Input;