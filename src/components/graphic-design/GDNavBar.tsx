import { memo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GDNavBarProps {
  onExit: () => void;
  onFilterSelect: (filter: string) => void;
  onSearch: (query: string) => void;
}

const TOOL_FILTERS = ['Canva', 'Figma', 'Photoshop', 'Illustrator', 'Framer'];
const CATEGORY_FILTERS = ['Branding', 'Ad Creatives', 'Social Media', 'Marketing', 'Logo', 'Magazine', 'Brochure'];

const GDNavBar = memo(function GDNavBar({ onExit, onFilterSelect, onSearch }: GDNavBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowFilters(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      onFilterSelect('');
    } else {
      setActiveFilter(filter);
      onFilterSelect(filter);
    }
    setShowFilters(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <motion.nav
      className="gd-navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Left — Back to Home */}
      <button
        className="gd-back-btn"
        onClick={onExit}
        aria-label="Back to Home"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      {/* Right — Search */}
      <div className="gd-search-wrapper" ref={dropdownRef}>
        {/* Search icon */}
        <svg className="gd-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        <input
          className="gd-search-input"
          type="text"
          placeholder="Search work..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          aria-label="Search graphic design work"
        />

        {/* Filter toggle */}
        <button
          className="gd-filter-btn"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
          aria-expanded={showFilters}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Filter Dropdown */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="gd-filter-dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <p className="gd-filter-group-title">Tools</p>
              <div className="gd-filter-pills">
                {TOOL_FILTERS.map((tool) => (
                  <button
                    key={tool}
                    className={`gd-filter-pill ${activeFilter === tool ? 'active' : ''}`}
                    onClick={() => handleFilterClick(tool)}
                  >
                    {tool}
                  </button>
                ))}
              </div>

              <p className="gd-filter-group-title">Categories</p>
              <div className="gd-filter-pills">
                {CATEGORY_FILTERS.map((cat) => (
                  <button
                    key={cat}
                    className={`gd-filter-pill ${activeFilter === cat ? 'active' : ''}`}
                    onClick={() => handleFilterClick(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
});

export default GDNavBar;
