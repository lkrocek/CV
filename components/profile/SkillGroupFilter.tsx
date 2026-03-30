import React from 'react';
import ReactDOM from 'react-dom';
import type { Language } from '../../types';
import { profileCopy } from './profileContent';

export type SkillGroupFilterProps = {
  groups: string[];
  selectedGroups: Set<string>;
  onGroupsChange: (groups: Set<string>) => void;
  isDarkMode: boolean;
  language: Language;
};

export const toggleSkillGroup = (
  group: string,
  selectedGroups: Set<string>,
  allGroups: string[],
): Set<string> => {
  if (selectedGroups.size === 0) {
    return new Set(allGroups.filter((g) => g !== group));
  }
  const next = new Set(selectedGroups);
  if (next.has(group)) {
    next.delete(group);
  } else {
    next.add(group);
  }
  return next.size === allGroups.length ? new Set() : next;
};

export const invertSkillGroups = (selectedGroups: Set<string>, allGroups: string[]): Set<string> => {
  const inverted = new Set(allGroups.filter((g) => !selectedGroups.has(g)));
  return inverted.size === allGroups.length ? new Set() : inverted;
};

export const isGroupActive = (group: string, selectedGroups: Set<string>): boolean =>
  selectedGroups.size === 0 || selectedGroups.has(group);

export const SkillGroupFilter: React.FC<SkillGroupFilterProps> = ({
  groups,
  selectedGroups,
  onGroupsChange,
  isDarkMode,
  language,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownStyle, setDropdownStyle] = React.useState<React.CSSProperties>({});
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const copy = profileCopy[language];

  // Position dropdown relative to the trigger button
  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: 'fixed',
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      ) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      document.removeEventListener('mousedown', handler);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  const hasFilter = selectedGroups.size > 0;
  const label = !hasFilter
    ? copy.filterAllGroups
    : selectedGroups.size === 1
      ? [...selectedGroups][0]
      : `${selectedGroups.size} ${copy.filterGroupsCount}`;

  const dimCls = isDarkMode
    ? 'text-slate-600 cursor-not-allowed'
    : 'text-slate-300 cursor-not-allowed';
  const iconBtnBase = 'rounded-lg p-1.5 transition-colors';
  const iconBtnActive = isDarkMode
    ? 'text-slate-400 hover:bg-white/8 hover:text-slate-200'
    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800';

  const dropdown = isOpen && ReactDOM.createPortal(
    <div
      ref={dropdownRef}
      role="listbox"
      aria-multiselectable="true"
      style={dropdownStyle}
      className={`z-[9999] min-w-[200px] rounded-xl border p-2 shadow-lg ${
        isDarkMode
          ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(8,13,31,0.95)] backdrop-blur-xl'
          : 'border-[rgba(148,163,184,0.24)] bg-white/95 shadow-slate-200/60 backdrop-blur-xl'
      }`}
    >
      {/* Action buttons row — always visible, conditionally disabled */}
      <div className={`mb-1.5 flex items-center justify-end gap-0.5 border-b pb-1.5 ${isDarkMode ? 'border-white/[0.06]' : 'border-slate-100'}`}>
        <button
          onClick={() => onGroupsChange(new Set())}
          disabled={!hasFilter}
          title={copy.filterClearSelection}
          className={`${iconBtnBase} ${hasFilter ? iconBtnActive : dimCls}`}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="sr-only">{copy.filterClearSelection}</span>
        </button>

        <button
          onClick={() => onGroupsChange(invertSkillGroups(selectedGroups, groups))}
          disabled={!hasFilter}
          title={copy.filterInvertSelection}
          className={`${iconBtnBase} ${hasFilter ? iconBtnActive : dimCls}`}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M3 8h10M9.5 4.5L13 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 4.5L3 8l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          </svg>
          <span className="sr-only">{copy.filterInvertSelection}</span>
        </button>
      </div>

      {/* Group rows */}
      {groups.map((group) => {
        const active = isGroupActive(group, selectedGroups);
        return (
          <div key={group} className="group/row flex items-center">
            <label
              role="option"
              aria-selected={active}
              className={`flex flex-1 cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isDarkMode ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => onGroupsChange(toggleSkillGroup(group, selectedGroups, groups))}
                className="sr-only"
              />
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  active
                    ? isDarkMode
                      ? 'border-indigo-500 bg-indigo-600'
                      : 'border-indigo-500 bg-indigo-500'
                    : isDarkMode
                      ? 'border-[rgba(255,255,255,0.2)]'
                      : 'border-slate-300'
                }`}
                aria-hidden="true"
              >
                {active && (
                  <svg viewBox="0 0 10 8" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
                    <path
                      d="M1 4l2.5 2.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              {group}
            </label>

            {/* Solo-select button — always visible, faded until hovered */}
            <button
              onClick={() => onGroupsChange(new Set([group]))}
              title={copy.filterSelectOnly}
              className={`mr-1.5 flex shrink-0 items-center gap-1 px-2 py-1 text-xs font-medium opacity-30 transition-opacity hover:opacity-100 group-hover/row:opacity-60 hover:group-hover/row:opacity-100 ${
                isDarkMode
                  ? 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/35 hover:text-indigo-200'
                  : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-800'
              }`}
            >
              <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="7" cy="7" r="2.5" fill="currentColor" />
              </svg>
              only
              <span className="sr-only"> {copy.filterSelectOnly}</span>
            </button>
          </div>
        );
      })}
    </div>,
    document.body,
  );

  return (
    <div className="relative">
      {/* Trigger — fixed width so the label never causes layout shifts */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`inline-flex w-40 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
          hasFilter
            ? isDarkMode
              ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20'
              : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            : isDarkMode
              ? 'border-[rgba(255,255,255,0.08)] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
              : 'border-[rgba(148,163,184,0.24)] bg-white/80 text-slate-600 hover:bg-white'
        }`}
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
          <path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="flex-1 truncate text-left">{label}</span>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className={`h-3 w-3 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {dropdown}
    </div>
  );
};
