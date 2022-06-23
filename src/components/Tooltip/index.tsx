import React from 'react';
import ReactDOM from 'react-dom';
import * as Elements from './elements';
import { throttle } from 'throttle-debounce';
import ResizeObserver from 'resize-observer-polyfill';
import { FormContext } from 'contexts/Form';

export type TooltipProps = {
  assign?: HTMLElement | null,
  verticalPosition?: 'over' | 'under',
  children?: React.ReactNode,
}

const Tooltip: React.FC<TooltipProps> = ({ assign, verticalPosition = 'over', children }) => {
  const { formRef } = React.useContext(FormContext);
  const [minWidth, setMinWidth] = React.useState<number | null>(null);
  const [maxWidth, setMaxWidth] = React.useState<number | null>(null);
  const [top, setTop] = React.useState<number>(0);
  const [left, setLeft] = React.useState<number>(0);

  const targetEl = React.useRef<HTMLElement>();
  const [selfEl, setSelfEl] = React.useState<HTMLDivElement | null>(null);

  const handleResize = React.useCallback((el?: HTMLElement) => {
    if (!el) {
      setMinWidth(null);
      setMaxWidth(null);
      setTop(0);
      setLeft(0);
      return;
    }

    const elRect = el.getBoundingClientRect();
    const formElRect = formRef?.getBoundingClientRect();
    const selfElRect = selfEl?.getBoundingClientRect();

    setMinWidth(elRect.width);
    setLeft(elRect.left);
    formElRect && selfElRect && setMaxWidth(selfElRect.width - (selfElRect.right - formElRect.right) - 8);

    switch (verticalPosition) {
      case 'under':
        setTop(elRect.top + elRect.height);
        break;
      case 'over':
      default:
        setTop(elRect.top - (selfElRect?.height || 0));
        break;
    }
  }, [verticalPosition, selfEl, formRef]);

  React.useLayoutEffect(() => {
    if (!assign || !formRef || !selfEl) return;
    targetEl.current = assign;
    const onResize = () => handleResize(targetEl.current);
    onResize();
    const throttledHandler = throttle(32, onResize);
    const resizeObserver = new ResizeObserver(throttledHandler);
    resizeObserver.observe(formRef);
    resizeObserver.observe(selfEl);
    window.addEventListener('resize', throttledHandler);
    return () => {
      window.removeEventListener('resize', throttledHandler);
      resizeObserver.disconnect();
    }
  }, [assign, formRef, selfEl, handleResize]);

  //! We don't pass this props as styled-component props because styled-components
  //! will generate new style and put it in dom every time we resizing the window.
  //! It can potentially effect the page productivity. If we just putting styles
  //! inline it will be a way faster.
  const style = React.useMemo(() => ({ minWidth: minWidth || 'auto', maxWidth: maxWidth || 'auto', top, left }), [minWidth, maxWidth, top, left]);

  return ReactDOM.createPortal(
    <Elements.TooltipContainer style={style} ref={r => setSelfEl(r)}>
      {children}
    </Elements.TooltipContainer>,
    document.body,
  );
}

export default Tooltip;