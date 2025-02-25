import React, { createContext, useState } from "react";

// Cria o contexto para armazenar os favoritos
export const FavoritesContext = createContext();

// Provider que gerencia o estado global dos favoritos e envolve a aplicação
export const FavoritesProvider = ({ children }) => {
  // Estado inicial com arrays para pilotos, equipes e corridas
  const [favorites, setFavorites] = useState({
    pilotos: [],
    equipes: [],
    corridas: [],
  });

  // pilotoId como chave
  const addFavoritePiloto = (piloto) => {
    setFavorites((prev) => ({
      ...prev,
      pilotos: [...prev.pilotos, piloto],
    }));
  };

  const removeFavoritePiloto = (pilotoId) => {
    setFavorites((prev) => ({
      ...prev,
      pilotos: prev.pilotos.filter((p) => p.driverId !== pilotoId),
    }));
  };

  const addFavoriteEquipe = (equipe) => {
    setFavorites((prev) => ({
      ...prev,
      equipes: [...prev.equipes, equipe],
    }));
  };

  // constructorId como chave
  const removeFavoriteEquipe = (constructorId) => {
    setFavorites((prev) => ({
      ...prev,
      equipes: prev.equipes.filter((e) => e.constructorId !== constructorId),
    }));
  };

  // round + season como chave
  const addFavoriteCorrida = (corrida) => {
    setFavorites((prev) => ({
      ...prev,
      corridas: [...prev.corridas, corrida],
    }));
  };

  const removeFavoriteCorrida = (round) => {
    setFavorites((prev) => ({
      ...prev,
      corridas: prev.corridas.filter((c) => c.round !== round),
    }));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavoritePiloto,
        removeFavoritePiloto,
        addFavoriteEquipe,
        removeFavoriteEquipe,
        addFavoriteCorrida,
        removeFavoriteCorrida,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
