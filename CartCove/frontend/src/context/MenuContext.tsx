// import React from 'react';

import React, { useState, createContext, ReactNode } from "react";

// Create a Context
export const MyContext = createContext({
  menu: 0,
  setMenu: (menu: number) => {
    console.log(menu);
  },
});

// Create Provider component
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState(0);

  return (
    <MyContext.Provider value={{ menu, setMenu }}>
      {children}
    </MyContext.Provider>
  );
};


