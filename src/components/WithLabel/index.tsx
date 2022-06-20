import React from 'react';
import * as Elements from './elements';

type WithLabelProps = {
  label: string | JSX.Element,
  children: React.ReactNode;
}

const WithLabel: React.FC<WithLabelProps> = ({ label, children }) => {
  return (
    <Elements.WithLabelWrapper>
      <Elements.Label>
        {label}
      </Elements.Label>
      <Elements.ChildrenWrapper>
        {children}
      </Elements.ChildrenWrapper>
    </Elements.WithLabelWrapper>
  );
};

export default WithLabel;