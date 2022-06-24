import React from 'react';
import * as Elements from './elements';

type WithLabelProps = Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'as' | 'label'> & {
  label: string | JSX.Element,
  children: React.ReactNode;
  zIndex?: number;
}

const WithLabel = React.forwardRef<HTMLDivElement, WithLabelProps>(({ label, children, zIndex, ...rest }, forwardRef) => {
  return (
    <Elements.WithLabelWrapper zIndex={zIndex} {...rest}>
      <Elements.Label>
        {label}
      </Elements.Label>
      <Elements.ChildrenWrapper ref={forwardRef}>
        {children}
      </Elements.ChildrenWrapper>
    </Elements.WithLabelWrapper>
  );
});

export default WithLabel;