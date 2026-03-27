import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children, authValue }) => {
  const [favoriteSets, setFavoriteSets] = useState({});

  const toggleFavorite = (setId) => {
    setFavoriteSets((s) => ({ ...s, [setId]: !s[setId] }));
  };

  const contextValue = {
    ...authValue,
    favoriteSets,
    setFavoriteSets,
    toggleFavorite,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
