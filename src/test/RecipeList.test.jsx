import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { RecipeList } from '../components/RecipeList';

test('пробрасывает callback из списка в карточку рецепта', async () => {
  const user = userEvent.setup();
  const onToggleFavorite = vi.fn();
  const recipe = {
    id: 42,
    title: 'Тестовый рецепт',
    category: 'Тест',
    time: '10 минут',
    description: 'Описание',
    emoji: '🍲',
  };

  render(
    <RecipeList
      recipes={[recipe]}
      isFavorite={() => false}
      onToggleFavorite={onToggleFavorite}
    />
  );

  await user.click(screen.getByRole('button', { name: /добавить тестовый рецепт/i }));
  expect(onToggleFavorite).toHaveBeenCalledWith(42);
});
