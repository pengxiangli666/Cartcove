import React, { useState, createContext, ReactNode } from "react";

// 创建一个类型接口
interface ISearchContext {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// 创建Context
export const SearchContext = createContext<ISearchContext>({
  searchTerm: '',
  setSearchTerm: () => {}
});

// 创建Provider组件
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
