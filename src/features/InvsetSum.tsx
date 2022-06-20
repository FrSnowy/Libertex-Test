import React from 'react';
import Input from '../components/Input';
import WithLabel from '../components/WithLabel';

// str to 9 999 999.00 format
const formatSum = (v: string) => {
  if (v[0] === '0' && v.length > 1) v = v.substring(1, v.length);
  let parsedV = v.replace(/[^0-9]/g, '');
  const numericV = parseInt(parsedV, 10);
  if (numericV > 200000) parsedV = '200000';
  parsedV = parsedV.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  return parsedV;
}

type InvestSumProps = {
  value?: number,
  onChange?: (v: number) => number,
}

const InvestSum: React.FC<InvestSumProps> = ({
  value,
  onChange
}) => {
  return (
    <WithLabel label='Сумма инвестиции'>
      <Input
        pre='$'
        defaultValue={5000}
        value={value}
        format={{
          to: formatSum,
          from: v => v.replace(/[^0-9]/g, ''),
        }}
        onChange={v => onChange && onChange(parseInt(v, 10) || 0)}
      />
    </WithLabel>
    
  )
}

export default InvestSum;