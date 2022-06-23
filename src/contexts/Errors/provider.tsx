import React from 'react';
import ErrorsContext, { defaultContextValue } from './context';
import { ErrorsT } from './types';

const ErrorsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shaking, setShaking] = React.useState<boolean>(defaultContextValue.shaking);
  const [onShakeCompleted, setOnShakeCompleted] = React.useState<() => void>(() => void 0);

  const makeShakeOneTime = React.useCallback(() => {
    if (shaking) setOnShakeCompleted(() => () => void 0);
    setShaking(true);
    setOnShakeCompleted(() =>
      () => {
        setShaking(false);
        setOnShakeCompleted(() => () => void 0);
      }
    );
  }, [shaking]);

  const value: ErrorsT = {
    shaking,
    onShakeCompleted,
    makeShakeOneTime,
  };

  return (
    <ErrorsContext.Provider value={value}>
      {children}
    </ErrorsContext.Provider>
  )
}

export default ErrorsProvider;