import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { App } from '../App';

test('добавляет и удаляет рецепт из избранного через кнопку карточки', async () => {
  const user = userEvent.setup();
  render(<App />);

  const addButton = screen.getByRole('button', { name: /добавить паста с томатами.*в избранное/i });
  expect(addButton).toHaveAttribute('aria-pressed', 'false');

  await user.click(addButton);
  expect(screen.getByRole('button', { name: /удалить паста с томатами.*из избранного/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByLabelText(/избранных рецептов: 1/i)).toHaveTextContent('1');

  await user.click(screen.getByRole('button', { name: /удалить паста с томатами.*из избранного/i }));
  expect(screen.getByRole('button', { name: /добавить паста с томатами.*в избранное/i })).toHaveAttribute('aria-pressed', 'false');
});

test('показывает только избранные рецепты после переключения фильтра', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: /добавить сырники.*в избранное/i }));
  await user.click(screen.getByRole('button', { name: 'Избранное' }));

  expect(screen.getByRole('heading', { name: 'Сырники с ягодами' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Паста с томатами и базиликом' })).not.toBeInTheDocument();
});
