import React from 'react';
import * as Elements from './elements';

type WithLabelProps = {
  label: string | JSX.Element,
  children: React.ReactNode;
}

const WithLabel = React.forwardRef<HTMLDivElement, WithLabelProps>(({ label, children }, forwardRef) => {
  return (
    <Elements.WithLabelWrapper>
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