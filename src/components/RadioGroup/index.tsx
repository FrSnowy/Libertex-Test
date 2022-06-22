import React from 'react';
import * as Elements from './elements';

type RadioElProps = {
  variant: string,
  checked: boolean,
  onClick: (v: string) => void,
};

const RadioEl: React.FC<RadioElProps> = ({
  variant,
  checked,
  onClick
}) => {
  const label = React.useMemo(() => (
    <span>{variant}</span>
  ), [variant]);

  return (
    <Elements.GroupWrapper onClick={() => onClick(variant)}>
      <Elements.RadioBtn checked={checked} />
      {label}
    </Elements.GroupWrapper>
  )
}

type RadioGroupProps = {
  variants: string[],
  selected?: string,
  onChange?: (v: string) => void,
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  variants,
  selected: selectedByDefault,
  onChange,
}) => {
  const [selected, setSelected] = React.useState<string | null>(selectedByDefault || null);

  React.useEffect(() => {
    setSelected(selectedByDefault || null);
  }, [selectedByDefault]);

  const selectHandler = React.useCallback((variant: string) => {
    setSelected(variant);
    onChange && onChange(variant);
  }, [onChange])

  const variantsView = React.useMemo(() => variants.map(variant => (
    <RadioEl key={variant} variant={variant} checked={selected === variant} onClick={v => selectHandler(v)} />
  )), [variants, selected, selectHandler])

  return (
    <Elements.Container>
      {variantsView}
    </Elements.Container>
  )
}

export default RadioGroup;