import Error from 'components/Error';
import React from 'react';
import * as Elements from './elements';
import { FormatFnT } from './formats';
import WithArrow from './WithArrow';

type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'as' | 'onChange' | 'type' | 'defaultValue'> & {
  pre?: React.ReactNode,
  format?: ReturnType<FormatFnT>,
  onChange?: (v: string) => void,
  value?: number,
  withArrowController?: boolean,
  disabled?: boolean,
  error?: React.ReactNode;
  errorTarget?: HTMLElement | null,
};

const Input: React.FC<InputProps> = ({
  pre,
  format,
  value: outerValue = 0,
  onChange,
  label,
  error,
  withArrowController,
  disabled,
  ...rest
}) => {
  const [wrapperRef, setWrapperRef] = React.useState<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
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
    if (!inputRef?.current) return;
    inputRef.current.selectionEnd = position;
  }, [position]);

  const preView = React.useMemo(() => (
    pre ? <Elements.Presymbol>{pre}</Elements.Presymbol> : null
  ), [pre]);

  const errorView = React.useMemo(() => {
    if (!wrapperRef || !error) return null;
    return (
      <Error assign={wrapperRef}>
        {error}
      </Error>
    );
  }, [wrapperRef, error]);

  return (
    <Elements.Wrapper onClick={() => inputRef.current?.focus()} disabled={disabled} error={!!error} ref={r => setWrapperRef(r)}>
      {preView}
      <Elements.Input
        contentEditable={!disabled}
        value={disabled ? '' : value}
        ref={inputRef}
        readOnly={!!disabled}
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
      {errorView}
    </Elements.Wrapper>
  )
};

export * as InputFormat from './formats';
export default Input;