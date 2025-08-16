'use client';

import { ThemeProvider } from '../contexts/ThemeProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
}
