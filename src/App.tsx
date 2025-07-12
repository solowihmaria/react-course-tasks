import { Component } from 'react';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import Card from './components/Card/Card';
import { apiService } from './services/api';
import type { Pokemon } from './types/types';
import styles from './App.module.css';

type AppProps = Record<string, never>;

interface AppState {
  items: Pokemon[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  forceError: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      items: [],
      isLoading: true,
      error: null,
      searchTerm: savedTerm,
      forceError: false,
    };
  }

  componentDidMount(): void {
    const { searchTerm } = this.state;
    this.fetchItems(searchTerm);
  }

  fetchItems = async (searchTerm: string = ''): Promise<void> => {
    this.setState({ isLoading: true, error: null });

    try {
      const items = await apiService.fetchItems(searchTerm);
      this.setState({
        items,
        isLoading: false,
        searchTerm,
      });

      if (searchTerm) {
        localStorage.setItem('searchTerm', searchTerm);
      } else {
        localStorage.removeItem('searchTerm');
      }
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
        items: [],
      });
    }
  };

  handleSearch = (term: string): void => {
    this.fetchItems(term.trim());
  };

  throwError = (): void => {
    this.setState({ forceError: true });
  };

  renderContent() {
    const { items, searchTerm } = this.state;

    if (searchTerm && items.length === 1) {
      return <Card item={items[0]} compact={false} />;
    }

    return (
      <CardList
        items={items}
        isLoading={this.state.isLoading}
        error={this.state.error}
      />
    );
  }

  render() {
    if (this.state.forceError) {
      throw new Error('Test Error Boundary');
    }

    return (
      <div className={styles.app}>
        <div className={styles['top-section']}>
          <Search
            onSearch={this.handleSearch}
            initialValue={this.state.searchTerm}
          />
        </div>

        <div className={styles['main-section']}>{this.renderContent()}</div>

        <button className={styles['error-button']} onClick={this.throwError}>
          Test Error Boundary
        </button>
      </div>
    );
  }
}

export default App;
