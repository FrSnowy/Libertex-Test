import React from 'react';
import * as Elements from './elemets';
import Tooltip, { TooltipProps } from 'components/Tooltip';

type ErrorProps = Omit<TooltipProps, 'verticalPosition'>;

const Error: React.FC<ErrorProps> = ({ children, assign }) => (
  <Tooltip assign={assign} verticalPosition='over'>
    <Elements.Container>
      {children}
    </Elements.Container>
  </Tooltip>
);

export default Error;