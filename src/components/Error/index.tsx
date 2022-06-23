import React from 'react';
import * as Elements from './elemets';
import Tooltip, { TooltipProps } from 'components/Tooltip';
import { ErrorsContext } from 'contexts/Errors';

type ErrorProps = Omit<TooltipProps, 'verticalPosition'>;

const Error: React.FC<ErrorProps> = ({ children, assign }) => {
  const { shaking, onShakeCompleted } = React.useContext(ErrorsContext);

  return ( 
    <Tooltip assign={assign} verticalPosition='over'>
      <Elements.Container shaking={shaking} onAnimationEnd={onShakeCompleted}>
        {children}
      </Elements.Container>
    </Tooltip>
  );
};

export default Error;