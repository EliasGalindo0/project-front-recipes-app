export async function surpriseMeF() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function surpriseMeD() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

// export async function getIngredients() {
//   const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
//   const response = await fetch(URL);
//   const data = await response.json();
//   return data.meals;
// }
