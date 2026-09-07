import { createContext, useContext } from 'react';
import type { SearchIndex } from './utils/search';

export interface SearchContextValue {
  term: string;
  index: SearchIndex;
  showCopyButton: boolean;
}

const defaultValue: SearchContextValue = {
  term: '',
  index: { matches: new Set(), ancestors: new Set() },
  showCopyButton: true,
};

export const SearchContext = createContext<SearchContextValue>(defaultValue);

export function useSearchContext(): SearchContextValue {
  return useContext(SearchContext);
}
