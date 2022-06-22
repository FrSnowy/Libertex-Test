import React from 'react';
import 'modern-css-reset';
import 'whatwg-fetch';
import ReactDOM from 'react-dom/client';
import App from './features/App';
import FormProvider from 'contexts/Form';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>
);


