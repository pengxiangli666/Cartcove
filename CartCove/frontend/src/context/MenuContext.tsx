// import React from 'react';

import React, { useState, createContext, ReactNode } from "react";

// Create a Context
export const MyContext = createContext({
  menu: 0,
  setMenu: (menu: number) => {
    console.log(menu);
  },
});