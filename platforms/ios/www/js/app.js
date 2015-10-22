
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

 angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
  
.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    })

  .state('app.deposer-annonce', {
    cache : false,
    url: "/deposer-annonce",
    views: {
      'menuContent': {
        templateUrl: "templates/deposer-annonce.html",
        controller: 'SendCtrl'
      }
    }
  })

  .state('app.categories', {
    url: "/categories",
    views: {
      'menuContent': {
        templateUrl: "templates/categories.html",
        controller: 'CategoriesCtrl'
      }
    }
  })
    

  .state('app.favoris', {
      url: "/favoris",
      views: {
        'menuContent': {
        templateUrl: "templates/favoris.html",
      }
     }
   })
  .state('app.register', {
    cache : false,
      url: "/register",
      views: {
        'menuContent': {
        templateUrl: "templates/register.html",
        controller: 'RegisterCtrl'
      }
     }
   })
  .state('app.single-annonce', {
    cache : false,
      url: "/single-annonce/:id",
      views: {
        'menuContent': {
        templateUrl: "templates/singleAnnonce.html",
        controller: 'SingleCtrl'
      }
     }
   })
  .state('app.edit', {
    cache : false,
      url: "/edit/:id",
      views: {
        'menuContent': {
        templateUrl: "templates/edit.html",
        controller: 'EditCtrl'
      }
     }
   })
  .state('app.accueil', {
    cache : false,
      url: "/accueil",
      views: {
        'menuContent': {
        templateUrl: "templates/accueil.html",
        controller: 'AccueilCtrl', 
      }
     }
   })

  .state('app.login', {
      cache : false,
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
       }
      }
    })

  .state('app.category', {
      cache : false,
      url: "/category/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/category.html",
          controller: 'CategoryCtrl'
       }
      }
    })

  .state('app.tableau-de-bord', {
      cache : false,
      url: "/tableau-de-bord",
      views: {
        'menuContent': {
          templateUrl: "templates/tableau-de-bord.html",
          controller: 'BoardCtrl'
       }
      }
    })

  .state('app.edit-board', {
      cache : false,
      url: "/edit-board/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/edit-board.html",
          controller: 'EditBoardCtrl'
       }
      }
    })

  


  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
