import React, { Component } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: props.initialValue || '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = (): void => {
    this.props.onSearch(this.state.searchTerm);
  };

  handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className={styles['search-container']}>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Search Pokémon..."
          aria-label="Search Pokémon"
        />
        <button
          onClick={this.handleSearch}
          disabled={this.state.searchTerm.trim() === ''}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
