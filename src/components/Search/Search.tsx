'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export const Search = ({ onSearch, initialValue = '' }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const t = useTranslations('Search');

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
        placeholder={t('placeholder')}
      />
      <button onClick={handleSearch} disabled={!searchTerm.trim()}>
        {t('button')}
      </button>
    </div>
  );
};
