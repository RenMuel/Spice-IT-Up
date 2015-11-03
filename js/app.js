var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })

    .state('weeklyMeal', {
      url: '/weeklyMeal',
      templateUrl: 'templates/weeklyMeal.html',
 
    })

    .state('inventory', {
      url: '/inventory',
      templateUrl: 'templates/inventory.html',
 
    })

    .state('grocery', {
      url: '/grocery',
      templateUrl: 'templates/grocery.html',
 
    })

    .state('forums', {
      url: '/forums',
      templateUrl: 'templates/forums.html',
 
    })

    .state('recipes', {
      url: '/recipes',
      templateUrl: 'templates/recipes.html',
      controller: 'RecipesCtrl'
    })


    .state('edit-recipe', {
      url: '/edit/:name',
      templateUrl: 'templates/recipes-edit.html',
      controller: 'EditRecipeCtrl'
    })

    .state('recipes-single', {
      url: '/recipes/:name',
      templateUrl: 'templates/recipes-single.html',
      controller: 'RecipesSingleCtrl'
    })

     
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
