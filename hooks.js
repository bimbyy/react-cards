import { useState, useEffect } from 'react';
import axios from 'axios';

// useLocalStorage Hook
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Could not read from localStorage", error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Could not write to localStorage", error);
    }
  };

  return [storedValue, setValue];
}

// useAxios Hook
export function useAxios(baseUrl) {
  const [data, setData] = useLocalStorage(baseUrl, []); // Keyed by baseUrl for uniqueness

  const addData = async (endpoint = '') => {
    try {
      const url = `${baseUrl}${endpoint}`;
      const response = await axios.get(url);
      setData(currentData => [...currentData, response.data]);
    } catch (error) {
      console.error("Error fetching data with useAxios", error);
    }
  };

  const clearData = () => {
    setData([]);
  };

  return [data, addData, clearData];
}

// useFlip Hook
export function useFlip(initialFlipState = false) {
  const [isFlipped, setIsFlipped] = useState(initialFlipState);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return [isFlipped, toggleFlip];
}
