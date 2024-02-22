import React, { useState, createContext, ReactNode } from "react";

// Create a type interface
interface ISearchContext {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// creat a Context
export const SearchContext = createContext<ISearchContext>({
  searchTerm: '',
  setSearchTerm: () => {}
});

// Create Provider component
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
