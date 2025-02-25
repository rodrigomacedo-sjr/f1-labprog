// src/contexts/FavoritesContext.js
import React, { createContext, useState } from "react";

// Cria o contexto de favoritos
export const FavoritesContext = createContext();

// Provider que envolverá o app e gerenciará o estado global dos favoritos
export const FavoritesProvider = ({ children }) => {
  // Estado inicial com categorias para pilotos, equipes e corridas
  const [favorites, setFavorites] = useState({
    pilotos: [],
    equipes: [],
    corridas: [],
  });

  // Funções para gerenciar pilotos
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

  // Funções para gerenciar equipes
  const addFavoriteEquipe = (equipe) => {
    setFavorites((prev) => ({
      ...prev,
      equipes: [...prev.equipes, equipe],
    }));
  };

  const removeFavoriteEquipe = (constructorId) => {
    setFavorites((prev) => ({
      ...prev,
      equipes: prev.equipes.filter((e) => e.constructorId !== constructorId),
    }));
  };

  // Funções para gerenciar corridas (tracks)
  const addFavoriteCorrida = (corrida) => {
    setFavorites((prev) => ({
      ...prev,
      corridas: [...prev.corridas, corrida],
    }));
  };

  const removeFavoriteCorrida = (round) => {
    // Considerando que o "round" seja um identificador único para a corrida
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
