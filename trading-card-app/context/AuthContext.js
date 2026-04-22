import { createContext, useState } from 'react';
import cardsData from '../data/cards';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children, authValue }) => {
  const [favoriteCards, setFavoriteCards] = useState({});
  const [favoriteSets, setFavoriteSets] = useState({});
  const [ownedCards, setOwnedCards] = useState(
    cardsData.reduce((acc, card) => {
      acc[card.id] = card.owned;
      return acc;
    }, {})
  );

  const toggleFavorite = (cardId) => {
    setFavoriteCards((s) => ({ ...s, [cardId]: !s[cardId] }));
  };

  const toggleFavoriteSet = (setKey) => {
    setFavoriteSets((s) => ({ ...s, [setKey]: !s[setKey] }));
  };

  const toggleOwned = (cardId) => {
    setOwnedCards((s) => ({ ...s, [cardId]: !s[cardId] }));
  };

  const contextValue = {
    ...authValue,
    favoriteCards,
    setFavoriteCards,
    toggleFavorite,
    favoriteSets,
    setFavoriteSets,
    toggleFavoriteSet,
    ownedCards,
    setOwnedCards,
    toggleOwned,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
