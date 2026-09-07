import type { ChangeEvent } from 'react';
import { CopyButton } from './CopyButton';
import { safeStringify } from '../utils/json';

export interface ToolbarProps {
  showSearch: boolean;
  showCopyButton: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  matchCount: number;
  data: unknown;
  instanceId: string;
}

export function Toolbar({
  showSearch,
  showCopyButton,
  searchTerm,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
  matchCount,
  data,
  instanceId,
}: ToolbarProps): JSX.Element {
  const searchInputId = `${instanceId}-search`;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="jv-toolbar">
      {showSearch && (
        <div className="jv-search">
          <label htmlFor={searchInputId} className="jv-visually-hidden">
            Search JSON keys and values
          </label>
          <input
            id={searchInputId}
            type="search"
            className="jv-search-input"
            placeholder="Search keys or values..."
            value={searchTerm}
            onChange={handleSearchChange}
            aria-describedby={searchTerm ? `${instanceId}-search-count` : undefined}
          />
          {searchTerm && (
            <span id={`${instanceId}-search-count`} className="jv-search-count" aria-live="polite">
              {matchCount} {matchCount === 1 ? 'match' : 'matches'}
            </span>
          )}
        </div>
      )}
      <div className="jv-toolbar-actions">
        <button type="button" className="jv-btn" onClick={onExpandAll}>
          Expand All
        </button>
        <button type="button" className="jv-btn" onClick={onCollapseAll}>
          Collapse All
        </button>
        {showCopyButton && (
          <CopyButton
            getText={() => safeStringify(data)}
            label="entire JSON"
            className="jv-btn-copy"
          />
        )}
      </div>
    </div>
  );
}
