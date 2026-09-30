import { useMemo, useState } from 'react';
import { RecipeForm } from './components/RecipeForm';
import { RecipeList } from './components/RecipeList';
import { recipes } from './data/recipes';
import { useFavorites } from './hooks/useFavorites';

export function App() {
  const [allRecipes, setAllRecipes] = useState(recipes);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const visibleRecipes = useMemo(
    () => (showFavorites ? allRecipes.filter((recipe) => favoriteIds.includes(recipe.id)) : allRecipes),
    [allRecipes, favoriteIds, showFavorites]
  );

  const addRecipe = (recipe) => {
    setAllRecipes((currentRecipes) => [
      ...currentRecipes,
      { ...recipe, id: Math.max(0, ...currentRecipes.map(({ id }) => id)) + 1 },
    ]);
  };

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Домашняя коллекция</p>
          <h1>Рецепты на каждый день</h1>
          <p className="subtitle">Сохраняйте идеи, которые хочется приготовить снова.</p>
        </div>
        <div className="favorites-counter" aria-label={`Избранных рецептов: ${favoriteIds.length}`}>
          <span aria-hidden="true">★</span>
          <strong>{favoriteIds.length}</strong>
          <span>избранных</span>
        </div>
      </header>

      <RecipeForm onAddRecipe={addRecipe} />

      <nav className="view-switcher" aria-label="Фильтр рецептов">
        <button
          type="button"
          className={!showFavorites ? 'view-switcher__button view-switcher__button--active' : 'view-switcher__button'}
          aria-pressed={!showFavorites}
          onClick={() => setShowFavorites(false)}
        >
          Все рецепты
        </button>
        <button
          type="button"
          className={showFavorites ? 'view-switcher__button view-switcher__button--active' : 'view-switcher__button'}
          aria-pressed={showFavorites}
          onClick={() => setShowFavorites(true)}
        >
          Избранное
        </button>
      </nav>

      <RecipeList
        recipes={visibleRecipes}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </main>
  );
}
