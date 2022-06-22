type FormatProps = {
  maxValue: number,
}

export type FormatFnT = (props?: FormatProps) => ({
  to: (v: string | number) => string,
  from: (v: string) => string,
});

const isMax = (val: number | string, max?: number) => {
  val = typeof val === 'string' ? parseInt(val, 10) || 0 : val;
  return max && val > max && val < Number.MAX_SAFE_INTEGER;
}

export const currency: FormatFnT = p => ({
  to: (v: string | number) => {
    v = `${v}`.replace(/[^0-9]/g, '');
    const { maxValue } = p || {};
    if (v[0] === '0' && v.length > 1) v = v.substring(1, v.length);
    if (isMax(v, maxValue)) return `${maxValue}`;
    v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    return v;
  },
  from: (v: string) => v.replace(/[^0-9]/g, ''),
});

export const number: FormatFnT = p => ({
  to: (v: string |  number) => {
    v = `${v}`.replace(/[^0-9]/g, '');
    const { maxValue } = p || {};
    if (v[0] === '0' && v.length > 1) v = v.substring(1, v.length);
    if (isMax(v, maxValue)) return `${maxValue}`;
    return v;
  },
  from: (v: string) => v.replace(/[^0-9]/g, ''),
});
