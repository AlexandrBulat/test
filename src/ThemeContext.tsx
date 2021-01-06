import { createContext, useContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Theme from './styles/Theme';


export enum ThemeMode {
    Dark = 'Dark',
    Light = 'Light',
}

export const themes = {
    'Dark': {
      background: Theme.color.black,
      text:  Theme.color.white,
      border: Theme.color.white,
    },
    'Light': {
      background: Theme.color.white,
      text: Theme.color.black,
      border: Theme.color.black,
    },
  };

export type ThemeContextType = {
    theme: ThemeMode;
    setTheme: (Theme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: ThemeMode.Light, setTheme: theme => console.warn('no theme provider')});
export const useTheme = () => useContext(ThemeContext);