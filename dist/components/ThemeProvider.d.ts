import React, { ReactNode } from 'react';
interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}
export declare const useTheme: () => ThemeContextType;
interface ThemeProviderProps {
    children: ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
