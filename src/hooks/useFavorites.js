import { useCallback, useState } from 'react';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const toggleFavorite = useCallback((recipeId) => {
    setFavoriteIds((currentIds) => (
      currentIds.includes(recipeId)
        ? currentIds.filter((id) => id !== recipeId)
        : [...currentIds, recipeId]
    ));
  }, []);

  const isFavorite = useCallback(
    (recipeId) => favoriteIds.includes(recipeId),
    [favoriteIds]
  );

  return { favoriteIds, toggleFavorite, isFavorite };
}
