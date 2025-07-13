import { Component } from 'react';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import Card from './components/Card/Card';
import Pagination from './components/Pagination/Pagination';
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
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
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
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
    };
  }

  componentDidMount(): void {
    const { searchTerm, currentPage, itemsPerPage } = this.state;
    this.fetchItems(searchTerm, currentPage, itemsPerPage);
  }

  fetchItems = async (
    searchTerm: string = '',
    page: number = 1,
    limit: number = 10
  ): Promise<void> => {
    this.setState({ isLoading: true, error: null });

    try {
      const { items, totalCount } = await apiService.fetchItems(
        searchTerm,
        page,
        limit
      );
      const totalPages = Math.ceil(totalCount / limit) || 1;

      this.setState({
        items,
        isLoading: false,
        searchTerm,
        currentPage: page,
        totalPages,
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
        totalPages: 1,
        currentPage: 1,
      });
    }
  };

  handleSearch = (term: string): void => {
    this.fetchItems(term.trim(), 1, this.state.itemsPerPage);
  };

  handlePageChange = (page: number): void => {
    this.fetchItems(this.state.searchTerm, page, this.state.itemsPerPage);
  };

  throwError = (): void => {
    this.setState({ forceError: true });
  };

  renderContent() {
    const { items, searchTerm, currentPage, totalPages } = this.state;

    if (searchTerm && items.length === 1) {
      return <Card item={items[0]} compact={false} />;
    }

    return (
      <>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
        <CardList
          items={items}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
      </>
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
          Test Error
        </button>
      </div>
    );
  }
}

export default App;
