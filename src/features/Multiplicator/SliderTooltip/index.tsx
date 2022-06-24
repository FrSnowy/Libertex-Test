import React from 'react';
import * as Elements from './elementrs';
import Tooltip from 'components/Tooltip';
import Slider, { SliderProps } from '../Slider';

type SliderTooltipProps = SliderProps & {
  inputRef: HTMLDivElement | null;
}

const SliderTooltip: React.FC<SliderTooltipProps> = ({ inputRef, ...sliderProps }) => {
  return React.useMemo(() => (
    <Tooltip assign={inputRef} verticalPosition='under' stayInParentContainer>
      <Elements.Container>
        <Slider {...sliderProps}/>
      </Elements.Container>
    </Tooltip>
  ), [sliderProps, inputRef])
}

export default SliderTooltip;