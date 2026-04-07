import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children, authValue }) => {
  const [favoriteCards, setFavoriteCards] = useState({});
  const [favoriteSets, setFavoriteSets] = useState({});

  const toggleFavorite = (cardId) => {
    setFavoriteCards((s) => ({ ...s, [cardId]: !s[cardId] }));
  };

  const toggleFavoriteSet = (setKey) => {
    setFavoriteSets((s) => ({ ...s, [setKey]: !s[setKey] }));
  };

  const contextValue = {
    ...authValue,
    favoriteCards,
    setFavoriteCards,
    toggleFavorite,
    favoriteSets,
    setFavoriteSets,
    toggleFavoriteSet,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
