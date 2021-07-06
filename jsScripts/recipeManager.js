const createRecipeHtml = (id, name, ingredients) => {
  //   const html = `<li class="card styForm m-1" data-recipe-id="${id}" id="idlst${id}" style="min-width: 30vw">
  //   <div class="card-body">
  //     <h5 class="card-title">${name}</h5>
  //     <p class="card-text">Ingredients:
  //       ${ingredients}
  //     </p>
  //     <div class="card-footer row justify-content-end">
  //         <button class="btn btn-outline-danger delete-button ">
  //           Delete
  //         </button>
  //     </div>
  //   </div>
  // </li>`;

  const html = `
<div class="card" id="idCard${id}" data-recipe-id="${id}" style="width: 30rem">
    <div class="card-header" id="heading${id}">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
        ${name}
        </button>
      </h5>
    </div>

    <div id="collapse${id}" class="collapse" aria-labelledby="heading${id}" data-parent="#recipelist" >
      <div class="card-body">
      <p class="card-text">Ingredients:${ingredients}</p>
      </div>
      <div class="card-footer d-flex justify-content-end">
      <button class="btn btn-outline-danger delete-button ">Delete</button>
    </div>
    </div>
  </div>
`;
  return html;
};
// Create the TaskManager class
class RecipeManager {
  constructor(curntRecipeId = 2) {
    this.recipes = [
      {
        id: 0,
        name: "Cakes",
        ingredients: "Sugar 1Cup, Flour 1Cup, Butter 1/4Cup, 1tsp Baking Powder, A dash of salt",
      },
      {
        id: 1,
        name: "Bread",
        ingredients: "Flour 1Cup, Yeast 1tsp, Butter 2Tbsp, Sugar 2Tbsp, Salt 1tsp",
      },
    ];
    this.curntRecipeId = curntRecipeId;
  }

  //addrecipes
  addreipe(name, ingredients) {
    // Create a recipe object that we will push to the list of recipes
    const recipe = {
      // Increment the current recipe Id for each new recipe
      id: this.curntRecipeId++,
      name: name,
      ingredients: ingredients,
    };
    this.recipes.push(recipe);
  }

  //load
  load() {
    // Check if any recipes are saved in localStorage
    if (localStorage.getItem("recipes")) {
      // Get the JSON string of recipes in localStorage
      const recipesJson = localStorage.getItem("recipes");

      // Convert it to an array and store it in our TaskManager
      this.recipes = JSON.parse(recipesJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("curntRecipeId")) {
      // Get the currentId string in localStorage
      const curntRecipeId = localStorage.getItem("curntRecipeId");

      // Convert the currentId to a number and store it in our TaskManager
      this.curntRecipeId = Number(curntRecipeId);
    }
  }

  render() {
    let recipeHtmlList = [];
    // Loop over our recipes and create the html, storing it in the array
    for (let i = 0; i < this.recipes.length; i++) {
      // Get the current recipe in the loop
      const recipe = this.recipes[i];

      // Create the recipe html
      const recipeHtml = createRecipeHtml(
        recipe.id,
        recipe.name,
        recipe.ingredients
      );
      // Push it to the recipesHtmlList array
      recipeHtmlList.push(recipeHtml);
    }

    // Create the recipesHtml by joining each item in the recipesHtmlList
    // with a new line in between each item.
    const recipeHtml = recipeHtmlList.join("\n");

    // Set the inner html of the recipesList on the page
    const recipeList = document.getElementById("recipelist");
    console.log("in render");
    // console.log(recipeList);
    recipeList.innerHTML = recipeHtml;
    // console.log(recipeHtml);
  }

  save() {
    // Create a JSON string of the recipes
    const recipesJson = JSON.stringify(this.recipes);

    // Store the JSON string in localStorage
    localStorage.setItem("recipes", recipesJson);

    // Convert the currentId to a string;
    const curntRecipeId = String(this.curntRecipeId);

    // Store the currentId in localStorage
    localStorage.setItem("curntRecipeId", curntRecipeId);
  }

  deleteTask(recipeId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];
    // Loop over the recipes
    for (let i = 0; i < this.recipes.length; i++) {
      // Get the current recipe in the loop
      const recipe = this.recipes[i];

      // Check if the recipe id is not the recipe id passed in as a parameter
      if (recipe.id !== recipeId) {
        // Push the recipe to the newTasks array
        newTasks.push(recipe);
      }
    }
    // Set this.recipes to newTasks
    this.recipes = newTasks;
  }
  //end class
}