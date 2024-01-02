import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useFilterState = () => {
  const [activeFilters, setActiveFilters] = useState({
    levels: [],
    categories: [],
    labels: [],
  });

  //add new filter to activeFilters
  const setActiveFilter = useCallback((type, filter) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [type]: toggleFilter(prevFilters[type], filter),
    }));
  }, []);

  const toggleFilter = (prevFilters, filter) =>
    filter
      ? prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
      : [];
  const location = useLocation();
  useEffect(() => {
    // Reset activeFilters when the route changes
    setActiveFilters({
      levels: [],
      categories: [],
      labels: [],
    });
  }, [location.pathname]);

  return { activeFilters, setActiveFilter };
};

export default useFilterState;
