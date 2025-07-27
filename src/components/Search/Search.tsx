import React, { useState } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export const Search = ({ onSearch, initialValue = '' }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = () => onSearch(searchTerm.trim());

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={styles['search-container']}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Pokémon..."
      />
      <button onClick={handleSearch} disabled={!searchTerm.trim()}>
        Search
      </button>
    </div>
  );
};
