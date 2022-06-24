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
  onDragStart?: () => void,
  onDragEnd?: () => void,
  onChange?: (v: number) => void,
};

const MultiplicatorSlider: React.FC<SliderProps> = ({ value, onChange, onDragStart, onDragEnd }) => {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
  const [innerValue, setInnerValue] = React.useState<number>(value || 1);

  React.useEffect(() => {
    setInnerValue(value || 1);
  }, [value]);

  React.useEffect(() => {
    if (!ref) return;
    const slider = ref.firstChild as HTMLElement | null;
    if (!slider) return;
    const track = slider.querySelector('.rc-slider-track');
    if (!track) return;
    slider.appendChild(track);
  }, [ref]);

  React.useEffect(() => {
    onChange && innerValue <= 40 && onChange(innerValue);
  }, [innerValue, onChange]);

  return React.useMemo(() => (
    <Elements.SliderWrapper ref={r => setRef(r)}>
      <Slider
        min={1}
        max={40}
        dots={true}
        value={innerValue}
        marks={dotMap}
        onChange={v => setInnerValue(v as number)}
        onBeforeChange={onDragStart}
        onAfterChange={onDragEnd}
      />
    </Elements.SliderWrapper>
  ), [innerValue, onDragStart, onDragEnd])
}

export default MultiplicatorSlider;