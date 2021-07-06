

const recipeManager =new RecipeManager(0);
console.log(recipeManager);
recipeManager.load();
recipeManager.render();


// Select the New Task Form
const form = document.querySelector("#newrecipeform");


// Add an 'onsubmit' event listener
form.addEventListener("submit", (event) => {
  // Select the inputs
  let validateName = document.querySelector("#newrecipename");
  let validateIngredients = document.querySelector("#newrecipeingredients");
 
  let validationFail = 0;

  // Prevent default action
  event.preventDefault();

  // Call this to clear all the form fields after the submission
  const clearFormFields = () => {
    validateName.value = "";
    validateIngredients.value = "";
    validateName.classList.remove("is-valid");
    validateIngredients.classList.remove("is-valid");
  };
  // Form validation for Task Name Field for min length 2
  if (validateName.value.length > 2) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Task Description Field for min length 8
  if (validateIngredients.value.length > 8) {
    validateIngredients.classList.add("is-valid");
    validateIngredients.classList.remove("is-invalid");
  } else {
    validateIngredients.classList.add("is-invalid");
    validateIngredients.classList.remove("is-valid");
    validationFail++;
  }
  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    // Push the valid input into our tasks array
    recipeManager.addreipe(
      validateName.value,
      validateIngredients.value
    );
    clearFormFields();
    recipeManager.save();
    recipeManager.render();
  }
});




//delete action
const recipeList = document.querySelector("#recipelist");
// Add an 'onclick' event listener to the Tasks List
recipeList.addEventListener("click", (event) => {



     // Check if a "Delete" button was clicked
  if (event.target.classList.contains("delete-button")) {

    // Get the parent Task
 
  const parentTask =
  event.target.parentElement.parentElement.parentElement;
  console.log('parent task');
console.log(parentTask);


// Get the taskId of the parent Task.
const recipeId = Number(parentTask.dataset.recipeId);
console.log(parentTask.dataset);
console.log('recipe id');
console.log(recipeId);
let idlstItem= 'idlst'+ recipeId;
let element = document.getElementById(idlstItem);
console.log('element');
console.log(element);
element.classList.add('lstDeleteStyle');

    // Delete the task
    recipeManager.deleteTask(recipeId);

    // Save the tasks to localStorage
    recipeManager.save();

    // Render the tasks
    recipeManager.render();
  }
    
  
 
 
});

const namecustomer=prompt('Enter your name');
console.log('mesggagte');
console.log(document.getElementById("idWelcomeMsg"));
if(namecustomer !==null && namecustomer !==''){
document.getElementById("idWelcomeMsg").innerHTML=`Welcome ${namecustomer} `;
} else{
  document.getElementById("idWelcomeMsg").innerHTML=`Welcome to pinch of Salt `;
}
