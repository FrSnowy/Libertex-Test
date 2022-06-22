import React from 'react';
import * as Elements from './elements';
import { FormatFnT } from './formats';
import WithArrow from './WithArrow';

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'as' | 'onChange' | 'type' | 'defaultValue'> & {
  pre?: string | JSX.Element | null,
  format?: ReturnType<FormatFnT>,
  onChange?: (v: string) => void,
  value?: number,
  withArrowController?: boolean,
  disabled?: boolean,
};  

const Input: React.FC<InputProps> = ({
  pre,
  format,
  value: outerValue = 0,
  onChange,
  label,
  withArrowController,
  disabled,
  ...rest
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>('');
  const [position, setPosition] = React.useState<number | null>(null);

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
    if (disabled) return;
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

  return (
    <Elements.Wrapper onClick={() => ref.current?.focus()} disabled={disabled}>
      {preView}
      <Elements.Input
        contentEditable={!disabled}
        value={disabled ? '' : value}
        ref={ref}
        onChange={onInputValueChanged}
        {...rest}
      />
      <WithArrow
        value={value}
        format={format}
        onChange={(v) => {
          (!outerValue || !onChange) && setValue(v);
          onChange && onChange(format ? format.from(v) : v);
        }}
        enable={!!withArrowController}
      />
    </Elements.Wrapper>
  )
};

export * as InputFormat from './formats';
export default Input;