'use client';

import { useState, useRef, useEffect } from 'react';

export enum ROOM_FILTERS {
  VOTING = 'voting',
  INDICATION_UNCOMPLETED = 'indication-uncompleted',
  INDICATION_COMPLETED = 'indication-completed',
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface RoomFilterProps {
  selectedFilters: FilterOption[];
  setSelectedFilters: (filters: FilterOption[]) => void;
  placeholder?: string;
  onChange?: (selected: FilterOption[]) => void;
}

export const options: FilterOption[] = [
  { id: '1', label: 'Voting', value: ROOM_FILTERS.VOTING },
  {
    id: '2',
    label: 'Indication Uncompleted',
    value: ROOM_FILTERS.INDICATION_UNCOMPLETED,
  },
  {
    id: '3',
    label: 'Indication Completed',
    value: ROOM_FILTERS.INDICATION_COMPLETED,
  },
];

export default function RoomFilter({
  selectedFilters,
  setSelectedFilters,
  placeholder = 'Select filters',
  onChange,
}: RoomFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: FilterOption) => {
    const isSelected = selectedFilters.some((item) => item.id === option.id);
    let newSelected: FilterOption[];

    if (isSelected) {
      newSelected = selectedFilters.filter((item) => item.id !== option.id);
    } else {
      newSelected = [...selectedFilters, option];
    }

    setSelectedFilters(newSelected);
    onChange?.(newSelected);
  };

  const getDisplayText = () => {
    if (selectedFilters.length === 0) return placeholder;
    if (selectedFilters.length === 1) return selectedFilters[0].label;
    return `${selectedFilters.length} filters selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-primary bg-gray_soft px-4 py-3 text-left shadow-sm hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span
          className={
            selectedFilters.length === 0 ? 'text-gray-500' : 'text-gray-900'
          }
        >
          {getDisplayText()}
        </span>
        <svg
          className={`text-gray-400 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-primary bg-gray_soft shadow-lg">
          {options.map((option) => {
            const isSelected = selectedFilters.some(
              (item) => item.id === option.id,
            );
            return (
              <label
                key={option.id}
                className="hover:bg-gray-50 flex cursor-pointer items-center px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleOption(option)}
                  className="text-green h-4 w-4 rounded border-primary focus:ring-primary"
                />
                <span className="text-gray-900 ml-3">{option.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
