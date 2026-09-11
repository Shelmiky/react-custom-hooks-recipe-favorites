export function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <article className="recipe-card">
      <div className="recipe-card__image" aria-hidden="true">
        <span>{recipe.emoji}</span>
      </div>
      <div className="recipe-card__body">
        <div className="recipe-card__topline">
          <span className="recipe-card__category">{recipe.category}</span>
          <button
            type="button"
            className={`favorite-button${isFavorite ? ' favorite-button--active' : ''}`}
            aria-label={isFavorite ? `Удалить ${recipe.title} из избранного` : `Добавить ${recipe.title} в избранное`}
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(recipe.id)}
          >
            <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
          </button>
        </div>
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>
        <span className="recipe-card__time">⏱ {recipe.time}</span>
      </div>
    </article>
  );
}
