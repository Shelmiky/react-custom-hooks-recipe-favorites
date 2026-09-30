import { useState } from 'react';

const emptyValues = {
  title: '',
  description: '',
  category: '',
};

function getErrors(values) {
  return {
    title: values.title.trim() ? '' : 'Название обязательно',
    description: values.description.trim() ? '' : 'Описание обязательно',
    category: values.category ? '' : 'Категория обязательна',
  };
}

export function RecipeForm({ onAddRecipe }) {
  const [values, setValues] = useState(emptyValues);
  const errors = getErrors(values);
  const hasErrors = Object.values(errors).some(Boolean);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasErrors) return;

    onAddRecipe({
      ...values,
      time: '20 минут',
      emoji: '🍽️',
    });
    setValues(emptyValues);
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit} noValidate>
      <h2>Добавить рецепт</h2>

      <label htmlFor="recipe-title">Название</label>
      <input
        id="recipe-title"
        name="title"
        value={values.title}
        onChange={updateField}
        aria-invalid={Boolean(errors.title)}
        aria-describedby={errors.title ? 'recipe-title-error' : undefined}
      />
      {errors.title && <p className="recipe-form__error" id="recipe-title-error">{errors.title}</p>}

      <label htmlFor="recipe-description">Описание</label>
      <textarea
        id="recipe-description"
        name="description"
        value={values.description}
        onChange={updateField}
        aria-invalid={Boolean(errors.description)}
        aria-describedby={errors.description ? 'recipe-description-error' : undefined}
      />
      {errors.description && <p className="recipe-form__error" id="recipe-description-error">{errors.description}</p>}

      <label htmlFor="recipe-category">Категория</label>
      <select
        id="recipe-category"
        name="category"
        value={values.category}
        onChange={updateField}
        aria-invalid={Boolean(errors.category)}
        aria-describedby={errors.category ? 'recipe-category-error' : undefined}
      >
        <option value="">Выберите категорию</option>
        <option value="Завтрак">Завтрак</option>
        <option value="Обед">Обед</option>
        <option value="Ужин">Ужин</option>
        <option value="Десерт">Десерт</option>
      </select>
      {errors.category && <p className="recipe-form__error" id="recipe-category-error">{errors.category}</p>}

      <button type="submit" disabled={hasErrors}>Добавить рецепт</button>
    </form>
  );
}
