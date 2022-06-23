import React from 'react';
import 'modern-css-reset';
import 'whatwg-fetch';
import ReactDOM from 'react-dom/client';
import App from './features/App';
import FormProvider from 'contexts/Form';
import ThemeProvider from 'contexts/Theme';
import FormValidatorProvider from 'contexts/FormValidator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <FormProvider>
        <FormValidatorProvider>
          <App />
        </FormValidatorProvider>
      </FormProvider>
    </ThemeProvider>
  </React.StrictMode>
);


