import React from 'react';
import * as Elements from './elements';

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'as' | 'onChange'> & {
  pre?: string | JSX.Element | null,
  format?: {
    to: (v: string) => string,
    from:  (v: string) => string,
  },
  onChange?: (v: string) => void,
};

const Input: React.FC<InputProps> = ({
  pre,
  format,
  defaultValue,
  onChange,
  label,
  ...rest
}) => {
  const formattedDefValue = format ? format.to(`${defaultValue}`) : `${defaultValue}`;

  const ref = React.useRef<HTMLInputElement>(null);
  const [position, setPosition] = React.useState<number | null>(null);
  const [value, setValue] = React.useState<string>(formattedDefValue || '');

  const onInputWithFormatFnChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (!format) return;
    const formattedValue = format.to(e.target.value);
    const lengthDiff = formattedValue.length - e.target.value.length
    const selectionStart = (e.target.selectionStart || e.target.value.length) + lengthDiff;
  
    setValue(formattedValue);
    setPosition(selectionStart);
    return formattedValue;
  }

  const onInputValueChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (format) return onInputWithFormatFnChanged(e);
    setValue(e.target.value);
    return e.target.value;
  }

  React.useLayoutEffect(() => {
    onChange && onChange(format ? format.from(value) : value);
  }, [onChange, value, format])

  React.useLayoutEffect(() => {
    if (!ref?.current) return;
    ref.current.selectionEnd = position;
  }, [position]);

  const preView = React.useMemo(() => (
    pre ? <Elements.Presymbol>{pre}</Elements.Presymbol> : null
  ), [pre])

  return (
    <Elements.Wrapper>
      {preView}
      <Elements.Input value={value} ref={ref} onChange={onInputValueChanged} {...rest}/>
    </Elements.Wrapper>
  )
};

export default Input;