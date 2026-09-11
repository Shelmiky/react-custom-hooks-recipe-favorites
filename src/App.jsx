import { useMemo, useState } from 'react';
import { RecipeList } from './components/RecipeList';
import { recipes } from './data/recipes';
import { useFavorites } from './hooks/useFavorites';

export function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const visibleRecipes = useMemo(
    () => (showFavorites ? recipes.filter((recipe) => favoriteIds.includes(recipe.id)) : recipes),
    [favoriteIds, showFavorites]
  );

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
