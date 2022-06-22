import React from 'react';
import ReactDOM from 'react-dom';
import * as Elements from './elements';
import { throttle } from 'throttle-debounce';
import ResizeObserver from 'resize-observer-polyfill';
import { FormContext } from 'contexts/Form';

type TooltipProps = {
  assign?: HTMLElement,
  verticalPosition?: 'over' | 'under',
  children?: React.ReactNode,
}

const Tooltip: React.FC<TooltipProps> = ({ assign, verticalPosition = 'over', children }) => {
  const [width, setWidth] = React.useState<number>(0);
  const [top, setTop] = React.useState<number>(0);
  const [left, setLeft] = React.useState<number>(0);
  const { formRef }  = React.useContext(FormContext);

  const targetEl = React.useRef<HTMLElement>();
  const [selfEl, setSelfEl] = React.useState<HTMLDivElement | null>(null);

  const handleResize = React.useCallback((el?: HTMLElement) => {
    if (!el) {
      setWidth(0);
      setTop(0);
      setLeft(0);
      return;
    }

    const computedStyles = window.getComputedStyle(el);
    setWidth(parseInt(computedStyles.width, 10));
    setLeft(el.getBoundingClientRect().left);

    switch (verticalPosition) {
      case 'under':
        const targetHeight = parseInt(getComputedStyle(el).height, 10);
        setTop(el.getBoundingClientRect().top + targetHeight);
        break;
      case 'over':
      default:
        const selfHeight = selfEl ? parseInt(getComputedStyle(selfEl).height, 10) : 0;
        setTop(el.getBoundingClientRect().top - selfHeight);
        break;
    }
  }, [verticalPosition, selfEl]);

  React.useLayoutEffect(() => {
    if (!assign || !formRef) return;
    targetEl.current = assign;
    const onResize = () => handleResize(targetEl.current);
    onResize();
    const throttledHandler = throttle(32, onResize);
    const formRefObserver = new ResizeObserver(throttledHandler);
    formRefObserver.observe(formRef);
    window.addEventListener('resize', throttledHandler);
    return () => {
      window.removeEventListener('resize', throttledHandler);
      formRefObserver.disconnect();
    }
  }, [assign,formRef]);

  //! We don't pass this props as styled-component props because styled-components
  //! will generate new style and put it in dom every time we resizing the window.
  //! It can potentially effect the page productivity. If we just putting styles
  //! inline it will be a way faster.
  const style = React.useMemo(() => ({ width, top, left }), [width, top, left]);

  return ReactDOM.createPortal(
    <Elements.TooltipContainer style={style} ref={r => setSelfEl(r)}>
      {children}
    </Elements.TooltipContainer>,
    document.body,
  );
}

export default Tooltip;