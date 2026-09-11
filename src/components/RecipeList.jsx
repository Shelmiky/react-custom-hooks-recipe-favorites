import { RecipeCard } from './RecipeCard';

export function RecipeList({ recipes, isFavorite, onToggleFavorite }) {
  if (recipes.length === 0) {
    return <p className="empty-state">В избранном пока нет рецептов.</p>;
  }

  return (
    <section className="recipe-list" aria-label="Список рецептов">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={isFavorite(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}
