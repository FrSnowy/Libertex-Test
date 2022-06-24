import React from 'react';
import Slider from 'rc-slider';
import * as Elements from './elements';

const dotMap = {
  1: 1,
  5: 5,
  10: 10,
  40: 40,
};

export type SliderProps = {
  value?: number,
  onChange?: (v: number) => void,
};

const MultiplicatorSlider: React.FC<SliderProps> = ({ value, onChange }) => {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref) return;
    const slider = ref.firstChild as HTMLElement | null;
    if (!slider) return;
    const track = slider.querySelector('.rc-slider-track');
    if (!track) return;
    slider.appendChild(track);
  }, [ref])

  const onChangeHandler = React.useCallback((v: number | number[]) => {
    onChange && v <= 40 && onChange(v as number);
  }, [onChange]);

  return React.useMemo(() => (
    <Elements.SliderWrapper ref={r => setRef(r)}>
      <Slider min={1} max={40} dots={true} value={value} marks={dotMap} onChange={onChangeHandler}/>
    </Elements.SliderWrapper>
  ), [onChangeHandler, value])
}

export default MultiplicatorSlider;