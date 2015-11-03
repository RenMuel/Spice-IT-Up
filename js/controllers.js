app.controller('RecipesCtrl', function($scope, RECIPES, $ionicModal, MESSAGE){
  
  //DEFINE INPUT MODEL
  $scope.recipe_data = {};
  
  //GET ALL RECIPES
  $scope.recipes = RECIPES.List();
  
  //ADD RECIPE TO THE FACTORY
  $scope.AddRecipe = function(){
    //RETURN IF RECIPE IS ALREADY IN THE DATABASE
    if(RECIPES.RecipeExists($scope.recipe_data.name)){
      MESSAGE.Show('Add Recipe', 'Recipe name already exists');
      return;
    }
    
    //ADD TO FACTORY
    RECIPES.Add({
      name: angular.copy($scope.recipe_data.name),
      rating: 0,
      servings: '',
      ingredients: [],
      instructions: [],
      notes: ''
    });
    
    //RESET DATA & ALERT MESSAGES
    $scope.recipe_data = {};
    MESSAGE.Show('Add Recipe', 'Recipe Successfully Added');
    
  }
  
});   //END RECIPES SINGLE CONTROLLER

app.controller('RecipesSingleCtrl', function($scope, RECIPES, $ionicModal, $stateParams, MESSAGE, $window){
  
  $scope.current_recipe = RECIPES.GetRecipeByName($stateParams.name);
  console.log('The current recipe: ', $scope.current_recipe);

  
  
});

app.controller('EditRecipeCtrl', function($scope, RECIPES, $ionicModal, $stateParams, MESSAGE, $ionicHistory){

  //GET THE CURRENT RECIPE TO EDIT
  $scope.current_recipe = RECIPES.GetRecipeByName($stateParams.name);
  console.log('Recipe to Edit: ', $scope.current_recipe);
  
  //DEFINE INPUT MODEL & other variables
  $scope.recipe_data = {
    rating: $scope.current_recipe.rating,
    notes: $scope.current_recipe.notes,
    servings: $scope.current_recipe.servings};
  $scope.data = {};
  
  $scope.ingredients = $scope.current_recipe.ingredients;
  $scope.instructions = $scope.current_recipe.instructions;
  
  //ADD INGREDIENT
  $scope.AddIngredient = function(){
    //ADD INGREDIENT TO $SCOPE(TEMPORARY)
    $scope.ingredients.push( angular.copy($scope.data.ingredient) );
    
    //RESET DATA
    $scope.data.ingredient = null;
  }
  
  $scope.AddInstruction = function(){
    //ADD INSTRUCTION TO $SCOPE(TEMPORARY)
    $scope.instructions.push( angular.copy($scope.data.instruction) );
    
    //RESET DATA
    $scope.data.instruction = null;
  }
  
  //SAVE DATA
  $scope.Save = function(){
    //SAVE TO DB
    RECIPES.Save($stateParams.name, {
      name: $stateParams.name,
      rating: $scope.recipe_data.rating,
      servings: $scope.recipe_data.servings,
      ingredients: angular.copy($scope.ingredients),
      instructions: angular.copy($scope.instructions),
      notes: $scope.recipe_data.notes
    });
    
    //RESET VALUES
    $scope.ingredients = [];
    $scope.instructions = [];
    $scope.recipe_data = {};
    
    MESSAGE.ShowCallback('Edit', 'Recipe edited successfully', function(){
      location.href = '#/recipes/' + $stateParams.name;
      //$ionicHistory.goBack(-1);
    });
  }
  
});