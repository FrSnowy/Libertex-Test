import React from 'react';
import 'modern-css-reset';
import 'whatwg-fetch';
import ReactDOM from 'react-dom/client';
import App from './features/App';
import FormProvider from 'contexts/Form';
import ThemeProvider from 'contexts/Theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </ThemeProvider>
  </React.StrictMode>
);


