//Context.js
import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState({
    imageUrlsMap: {},
    selectedImage: null,
    filterCriteria: '',
    currentPage: 1,
  });
  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (context === undefined) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return context;
};