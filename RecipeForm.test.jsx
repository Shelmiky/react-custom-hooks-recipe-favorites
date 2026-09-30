import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { RecipeForm } from '../components/RecipeForm';

test('показывает обязательные поля и блокирует отправку, пока они пусты', () => {
  render(<RecipeForm onAddRecipe={vi.fn()} />);

  expect(screen.getByText('Название обязательно')).toBeInTheDocument();
  expect(screen.getByText('Описание обязательно')).toBeInTheDocument();
  expect(screen.getByText('Категория обязательна')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Добавить рецепт' })).toBeDisabled();
});

test('снимает соответствующую ошибку при изменении поля и отправляет валидный рецепт', async () => {
  const user = userEvent.setup();
  const onAddRecipe = vi.fn();
  render(<RecipeForm onAddRecipe={onAddRecipe} />);

  await user.type(screen.getByLabelText('Название'), 'Овощной суп');
  expect(screen.queryByText('Название обязательно')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Добавить рецепт' })).toBeDisabled();

  await user.type(screen.getByLabelText('Описание'), 'Лёгкий сезонный суп.');
  expect(screen.queryByText('Описание обязательно')).not.toBeInTheDocument();

  await user.selectOptions(screen.getByLabelText('Категория'), 'Обед');
  expect(screen.queryByText('Категория обязательна')).not.toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: 'Добавить рецепт' });
  expect(submitButton).toBeEnabled();
  await user.click(submitButton);

  expect(onAddRecipe).toHaveBeenCalledWith({
    title: 'Овощной суп',
    description: 'Лёгкий сезонный суп.',
    category: 'Обед',
    time: '20 минут',
    emoji: '🍽️',
  });
});

test('не считает пробелы заполненным названием', async () => {
  const user = userEvent.setup();
  render(<RecipeForm onAddRecipe={vi.fn()} />);

  await user.type(screen.getByLabelText('Название'), '   ');

  expect(screen.getByText('Название обязательно')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Добавить рецепт' })).toBeDisabled();
});
