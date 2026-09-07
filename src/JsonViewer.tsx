import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import type { JsonViewerProps } from './types';
import { getValueKind } from './utils/json';
import { buildSearchIndex } from './utils/search';
import { SearchContext } from './SearchContext';
import { Toolbar } from './components/Toolbar';
import { JsonNode } from './components/JsonNode';
import { injectStylesOnce } from './styles';

const NO_ANCESTORS: ReadonlySet<object> = new Set();

export function JsonViewer({
  data,
  defaultExpandDepth = 1,
  expandAll = false,
  showCopyButton = true,
  showSearch = true,
  theme = 'light',
  className,
  id,
}: JsonViewerProps): JSX.Element {
  useEffect(() => {
    injectStylesOnce();
  }, []);

  const instanceId = useId();
  const [searchTerm, setSearchTerm] = useState('');
  const [treeVersion, setTreeVersion] = useState(0);
  const [forcedExpanded, setForcedExpanded] = useState<boolean | undefined>(undefined);

  const handleExpandAll = useCallback(() => {
    setForcedExpanded(true);
    setTreeVersion((v) => v + 1);
  }, []);

  const handleCollapseAll = useCallback(() => {
    setForcedExpanded(false);
    setTreeVersion((v) => v + 1);
  }, []);

  const searchIndex = useMemo(() => buildSearchIndex(data, searchTerm), [data, searchTerm]);

  const rootClassName = `jv-root${className ? ` ${className}` : ''}`;

  if (data === undefined) {
    return (
      <div className={rootClassName} data-theme={theme} id={id}>
        <p className="jv-empty">No data to display.</p>
      </div>
    );
  }

  const rootKind = getValueKind(data);
  if (rootKind === 'unknown' || rootKind === 'function') {
    return (
      <div className={rootClassName} data-theme={theme} id={id}>
        <p className="jv-error" role="alert">
          Unsupported data provided to JsonViewer (received type &quot;{typeof data}&quot;).
        </p>
      </div>
    );
  }

  return (
    <div className={rootClassName} data-theme={theme} id={id}>
      <Toolbar
        showSearch={showSearch}
        showCopyButton={showCopyButton}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        matchCount={searchIndex.matches.size}
        data={data}
        instanceId={instanceId}
      />
      <div className="jv-tree-container">
        <SearchContext.Provider value={{ term: searchTerm, index: searchIndex, showCopyButton }}>
          <ul className="jv-tree" role="tree" aria-label="JSON data">
            <JsonNode
              key={treeVersion}
              name={null}
              value={data}
              path={[]}
              depth={0}
              defaultExpandDepth={defaultExpandDepth}
              expandAll={expandAll}
              forcedExpanded={forcedExpanded}
              ancestors={NO_ANCESTORS}
            />
          </ul>
        </SearchContext.Provider>
      </div>
    </div>
  );
}
