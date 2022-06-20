import React from 'react';
import Input from '../components/Input';
import { ReactComponent as MultipleIcon } from '../assets/multiple.svg';
import WithLabel from '../components/WithLabel';

const formatMultiplicator = (v: string) => {
  if (v[0] === '0' && v.length > 1) v = v.substring(1, v.length);
  let parsedV = v.replace(/[^0-9]/g, '');
  const numericV = parseInt(parsedV, 10);
  if (numericV > 99) return '99';
  return parsedV;
}

type MultiplicatorProps = {
  value?: number,
  onChange?: (v: number) => number,
}

const Multiplicator: React.FC<MultiplicatorProps> = ({
  value,
  onChange
}) => {
  return (
    <WithLabel label='Мультипликатор'>
      <Input
        pre={<MultipleIcon width={6} height={6} />}
        defaultValue={40}
        value={value}
        format={{
          to: formatMultiplicator,
          from: v => v.replace(/[^0-9]/g, ''),
        }}
        onChange={v => onChange && onChange(parseInt(v, 10) || 0)}
      />
    </WithLabel>
    
  )
}

export default Multiplicator;