import { render } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './contexts/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './store/store';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(true).toBe(true);
  });
});
