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
  withMaxWidth?: boolean;
  stayInParentContainer?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  assign,
  children,
  verticalPosition = 'over',
  withMaxWidth = true,
  stayInParentContainer
}) => {
  const { formRef } = React.useContext(FormContext);

  const [selfEl, setSelfEl] = React.useState<HTMLDivElement | null>(null);
  const [minWidth, setMinWidth] = React.useState<number | null>(null);
  const [maxWidth, setMaxWidth] = React.useState<number | null>(null);
  const [top, setTop] = React.useState<number>(0);
  const [left, setLeft] = React.useState<number>(0);

  const handleResize = React.useCallback((el?: HTMLElement) => {
    if (!el || !assign) {
      setMinWidth(null);
      setMaxWidth(null);
      setTop(0);
      setLeft(0);
      return;
    }

    const elRect = el.getBoundingClientRect();
    const assignRect = assign?.getBoundingClientRect();
    const formElRect = formRef?.getBoundingClientRect();
    const selfElRect = selfEl?.getBoundingClientRect();

    setMinWidth(elRect.width);
    setLeft(elRect.left);
    withMaxWidth && formElRect && assignRect && setMaxWidth(formElRect.right - assignRect.left - 8);

    switch (verticalPosition) {
      case 'under':
        setTop(elRect.top + elRect.height);
        break;
      case 'over':
      default:
        setTop(elRect.top - (selfElRect?.height || 0));
        break;
    }
  }, [verticalPosition, selfEl, formRef, assign, withMaxWidth]);

  React.useLayoutEffect(() => {
    if (!assign || !formRef || !selfEl) return;
    const onResize = () => handleResize(assign);
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
  const style = React.useMemo(() => ({
    top,
    left,
    minWidth: minWidth || 'auto',
    maxWidth: maxWidth || 'auto',
  }), [minWidth, maxWidth, top, left]);

  if (!assign) return null;

  const view = (
    <Elements.TooltipContainer style={style} ref={r => setSelfEl(r)}>
      {children}
    </Elements.TooltipContainer>
  )

  if (!stayInParentContainer) return (
    ReactDOM.createPortal(view, document.body)
  );

  return view;
}

export default Tooltip;