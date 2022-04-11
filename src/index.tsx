import "@fontsource/roboto";
import "@fontsource/share-tech-mono";
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { config } from './overmind';

const overmind = createOvermind(config, {
  name: 'OnChance',
  // devtools: true,
  // logProxies: true,
});

const container = document.getElementById('app');
if (!container) throw new Error('Missing react container!');
const root = createRoot(container);
root.render(
  <Provider value={overmind}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// if (module.hot) module.hot.accept();
