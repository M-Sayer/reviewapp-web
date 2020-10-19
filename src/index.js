import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { CSSReset, theme, ThemeProvider } from '@chakra-ui/core';

ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);