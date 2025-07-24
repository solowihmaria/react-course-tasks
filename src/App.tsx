import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AppRouter } from './router/Router';

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
