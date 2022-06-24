import React from 'react';
import * as Elements from './elementrs';
import Tooltip from 'components/Tooltip';
import Slider, { SliderProps } from '../Slider';

type SliderTooltipProps = SliderProps & {
  inputRef: HTMLDivElement | null;
}

const SliderTooltip: React.FC<SliderTooltipProps> = ({ value, onChange, inputRef }) => {
  return React.useMemo(() => (
    <Tooltip assign={inputRef} verticalPosition='under'>
      <Elements.Container>
        <Slider value={value} onChange={onChange} />
      </Elements.Container>
    </Tooltip>
  ), [value, onChange, inputRef])
}

export default SliderTooltip;