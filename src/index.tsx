import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-css-reset';
import InvestSum from './features/InvsetSum';
import Multiplicator from './features/Multiplicator';
import Spoiler from './components/Spoiler';
import RadioGroup from './components/RadioGroup';
import WithLabel from './components/WithLabel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div style={{ width: 288, margin: '16px auto 0' }}>
      <InvestSum />
      <Multiplicator />
      <Spoiler title='Ограничить прибыль и убыток'>
        <WithLabel label='Ограничения в'>
          <RadioGroup variants={['%', '$']} selected='%' />
        </WithLabel>
      </Spoiler>
    </div>
  </React.StrictMode>
);


