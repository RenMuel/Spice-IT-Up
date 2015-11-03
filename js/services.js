app.factory('RECIPES', function(){
  
  var recipes = angular.fromJson(localStorage.getItem('prepare_food_info') || '[]');
  
  function Persist(){
    localStorage.setItem('prepare_food_info', angular.toJson(recipes));
  }
  
  return {
    List: function(){
      return recipes;
    },
    Add: function( recipeObj ){
      recipes.push(recipeObj);
      Persist();
    },
    GetRecipeByName: function(name){
      for(var i = 0; i < recipes.length; i++){
        if(recipes[i].name == name){
          return recipes[i];
        }
      }
      return undefined;
    },
    RecipeExists: function(name){
      for(var i = 0; i < recipes.length; i++){
        if(recipes[i].name.toLowerCase() == name.toLowerCase()){
          return true;
        }
      }
      return false;
    },
    Save: function(name, obj){
      for(var i = 0; i < recipes.length; i++){
        if(recipes[i].name == name){
          console.log('Before edit', recipes[i]);
          recipes[i] = obj;
          console.log('After edit', recipes[i]);
          Persist();
        }
      }
    }
  }
  
});

app.factory('MESSAGE', ['$ionicPopup', function($ionicPopup){

  return {
    Show: function(title, message){
      var popup = $ionicPopup.alert({
        title: title,
        template: '<center>' + message + '</center>',
        buttons:[
          {
            text: 'OK',
            type:'button-assertive'
          }
        ]
      });
    },
    ShowCallback: function(title, message, callback){
      var popup = $ionicPopup.alert({
        title: title,
        template: '<center>' + message + '</center>',
        buttons:[
          {
            text: 'OK',
            type:'button-assertive'
          }
        ]
      });
      
      popup.then(function(res){
        callback();
      });
    },
    ShowConfirm: function(title, message, callback){
      var confirmPopup = $ionicPopup.confirm({
        title: title,
        template: message
      });
      
      confirmPopup.then(function(res){
        if(res){
          callback();
        }
      });
    }
  }
  
}]);