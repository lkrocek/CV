import React from 'react';

export type ViewMode = 'duration' | 'timeline' | 'companies';
export type SortDirection = 'desc' | 'asc';

export type ExplorerHashState = {
  viewMode: ViewMode;
  sortDirection: SortDirection;
  technology: string | null;
  entryKey: string | null;
  company: string | null;
};

export const VIEW_MODES: ViewMode[] = ['duration', 'timeline', 'companies'];
export const SORT_DIRECTIONS: SortDirection[] = ['desc', 'asc'];

export const DEFAULT_HASH_STATE: ExplorerHashState = {
  viewMode: 'duration',
  sortDirection: 'desc',
  technology: null,
  entryKey: null,
  company: null,
};

export const parseExplorerHash = (hash: string): ExplorerHashState | null => {
  if (!hash.startsWith('#skills')) return null;

  const queryStart = hash.indexOf('?');
  if (queryStart === -1) return DEFAULT_HASH_STATE;

  const params = new URLSearchParams(hash.slice(queryStart + 1));
  const viewMode = params.get('view');
  const sortDirection = params.get('sort');

  return {
    viewMode: VIEW_MODES.includes(viewMode as ViewMode) ? (viewMode as ViewMode) : DEFAULT_HASH_STATE.viewMode,
    sortDirection: SORT_DIRECTIONS.includes(sortDirection as SortDirection) ? (sortDirection as SortDirection) : DEFAULT_HASH_STATE.sortDirection,
    technology: params.get('tech'),
    entryKey: params.get('entry'),
    company: params.get('company'),
  };
};

export const buildExplorerHash = (state: ExplorerHashState): string => {
  const params = new URLSearchParams();
  params.set('view', state.viewMode);
  params.set('sort', state.sortDirection);

  if (state.technology) params.set('tech', state.technology);
  if (state.entryKey) params.set('entry', state.entryKey);
  if (state.company) params.set('company', state.company);

  return `#skills?${params.toString()}`;
};

type UseTechnologyExplorerStateArgs = {
  activeTechnology: string | null;
  onSelectTechnology: (technology: string) => void;
};

export const useTechnologyExplorerState = ({
  activeTechnology,
  onSelectTechnology,
}: UseTechnologyExplorerStateArgs) => {
  const initialHashState = React.useMemo(
    () => (parseExplorerHash(globalThis.location.hash) ?? DEFAULT_HASH_STATE),
    [],
  );
  const hasMountedSelectionReset = React.useRef(false);
  const hasAppliedInitialHashTechnology = React.useRef(false);

  const [viewMode, setViewMode] = React.useState<ViewMode>(initialHashState.viewMode);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(initialHashState.sortDirection);
  const [selectedEntryKey, setSelectedEntryKey] = React.useState<string | null>(initialHashState.entryKey);
  const [selectedCompany, setSelectedCompany] = React.useState<string | null>(initialHashState.company);

  React.useEffect(() => {
    if (hasAppliedInitialHashTechnology.current) return;
    hasAppliedInitialHashTechnology.current = true;

    if (initialHashState.technology && initialHashState.technology !== activeTechnology) {
      onSelectTechnology(initialHashState.technology);
    }
  }, [activeTechnology, initialHashState.technology, onSelectTechnology]);

  React.useEffect(() => {
    const syncFromHash = () => {
      const hashState = parseExplorerHash(globalThis.location.hash);
      if (!hashState) return;

      setViewMode(hashState.viewMode);
      setSortDirection(hashState.sortDirection);
      setSelectedEntryKey(hashState.entryKey);
      setSelectedCompany(hashState.company);

      if (hashState.technology && hashState.technology !== activeTechnology) {
        onSelectTechnology(hashState.technology);
      }
    };

    globalThis.addEventListener('hashchange', syncFromHash);
    return () => globalThis.removeEventListener('hashchange', syncFromHash);
  }, [activeTechnology, onSelectTechnology]);

  React.useEffect(() => {
    if (!hasMountedSelectionReset.current) {
      hasMountedSelectionReset.current = true;
      return;
    }

    setSelectedEntryKey(null);
  }, [activeTechnology, viewMode]);

  React.useEffect(() => {
    if (viewMode !== 'companies') {
      setSelectedCompany(null);
    }
  }, [viewMode]);

  React.useEffect(() => {
    const nextHash = buildExplorerHash({
      viewMode,
      sortDirection,
      technology: viewMode === 'companies' ? null : activeTechnology,
      entryKey: viewMode === 'companies' ? null : selectedEntryKey,
      company: viewMode === 'companies' ? selectedCompany : null,
    });

    if (globalThis.location.hash !== nextHash) {
      globalThis.history.replaceState(null, '', `${globalThis.location.pathname}${globalThis.location.search}${nextHash}`);
    }
  }, [activeTechnology, selectedCompany, selectedEntryKey, sortDirection, viewMode]);

  return {
    viewMode,
    setViewMode,
    sortDirection,
    setSortDirection,
    selectedEntryKey,
    setSelectedEntryKey,
    selectedCompany,
    setSelectedCompany,
  };
};
