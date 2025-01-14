"use client";

import { createContext, useState } from "react";

export const MyContext = createContext();

const AppProvider = ({ children }) => {
    const [animate, setAnimate] = useState(false);

    return (
        <MyContext.Provider value={{ animate, setAnimate }}>
            {children}
        </MyContext.Provider>
    );
};

export default AppProvider;
