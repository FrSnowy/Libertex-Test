import React from 'react';
import * as Elements from './elements';
import { FormatFnT } from '../formats';

type WithArrowProps = {
  format?: ReturnType<FormatFnT>,
  onChange: (v: string) => void,
  value: string,
  enable: boolean,
};  

const WithArrow: React.FC<WithArrowProps> = ({
  value,
  enable,
  onChange,
  format,
}) => {
  const interval = React.useRef<number>(-1);

  const arrowDeactivate = ()  => window.clearInterval(interval.current);

  const arrowActivate = (direction: 'up' | 'down', e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    arrowDeactivate();
    const target = e.currentTarget;

    const updateValue = () => {
      const clearedValue = format?.from(value) || value;
      const numericValue = parseInt(clearedValue, 10) || 0;
      const result = direction === 'up' ? `${numericValue + 1}` : `${numericValue - 1}`;
      onChange(result);
    };

    const timeout = window.setTimeout(() => {
      interval.current = window.setInterval(updateValue, 16);
    }, 500);

    const clearHandler = () => {
      updateValue();
      window.clearTimeout(timeout);
      target.removeEventListener('mouseup', clearHandler);
      target.removeEventListener('mouseleave', clearHandler);
    }
  
    target.addEventListener('mouseup', clearHandler);
    target.addEventListener('mouseleave', clearHandler);
  };

  const createHandlers = (direction: 'up' | 'down') => ({
    onMouseEnter: (e: React.MouseEvent) => arrowActivate(direction, e),
    onMouseDown: (e: React.MouseEvent) => arrowActivate(direction, e),
    onMouseLeave: arrowDeactivate,
    onMouseUp: arrowDeactivate,
  });

  if (!enable) return null;

  return (
    <Elements.ArrowsWrapper>
      <Elements.ArrowBlock {...createHandlers('up')}>▲</Elements.ArrowBlock>
      <Elements.ArrowBlock {...createHandlers('down')}>▼</Elements.ArrowBlock>
    </Elements.ArrowsWrapper>
  )
};

export default WithArrow;
