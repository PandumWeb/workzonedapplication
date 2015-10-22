const API_URL = 'http://lindalor.com/backWorkzoned/public/api/v1';
angular.module('starter.controllers', [])


.controller('FavorisCtrl', function($scope){
  
    $scope.customStyle = {};
$scope.turnStar = function() {

  var style = angular.equals($scope.customStyle.style, {"color":"red"});
  
  if(style === true){
    $scope.customStyle.style = {"color": "#7A7A7A"};
  }
  else {
    $scope.customStyle.style = {"color":"red"};
  }
    
    
}

})


.controller('LoginCtrl', function($scope, $rootScope, $stateParams, $location, $http){
 $('.bar-stable').hide();
 $('.menu-left').hide();
  $scope.formData = {};
  //$scope.i = 0;
  $http.get( API_URL + '/users').success(function(data) {
    $scope.login = data;
      console.log(data);
      $rootScope.tablog = [];
      $scope.loginForm = function(){
      $scope.length = data.users.total;
      $scope.username = data.users.data.username;
      $scope.password = data.users.data.password;
      $scope.error = false; 
          for (i = 0; i < $scope.length; i++){
            if($scope.formData.username == null){
              $scope.message_login = '';
              $scope.message_username = 'Veuillez remplir l\'username !';
              } 
           if($scope.formData.password == null){
              console.log('vide');
              $scope.message_login = '';
              $scope.message_password = 'Veuillez remplir le password !';
            }else if(data.users.data[i].username == $scope.formData.username &&  data.users.data[i].password == $scope.formData.password){
              $rootScope.user_id = data.users.data[i].id;
              $rootScope.username = data.users.data[i].username;
              $rootScope.name = data.users.data[i].name;
              $rootScope.firstname = data.users.data[i].firstname;
              $rootScope.email = data.users.data[i].email;
              $rootScope.password = data.users.data[i].password;
              $rootScope.number_phone = data.users.data[i].number_phone;

              $scope.message_login = '';
              $scope.error = true;
              $location.path('/app/accueil');     
            }else{
                if($scope.error == true){
                $scope.message_username = '';
                $scope.message_password = '';
                $scope.message_login = '';
               }else{
                $scope.message_username = '';
                $scope.message_password = '';
                $scope.message_login = 'L\'username ou le mot de passe est incorrect !';
                console.log($scope.error);
                             }
            }
          }   
        };
    }).error(function(data){
      console.log('nul aussi');
    });

})  


.controller('AccueilCtrl', function($scope, $rootScope, $http) {
     $('.bar-stable').show();
      $('.menu-left').show();
     
    
     //$scope.tab = $rootScope.tablog;
     //alert(JSON.stringify($rootScope.tablog[1], null, 4));
    
    $http.get( API_URL + '/news').success(function(data) {
        $scope.news = data;
        console.log($rootScope.user_id);
        console.log($rootScope.username);
        
    }).error(function() {
        console.log('erreur de connexion');
    });

  



}) 

.controller('SingleCtrl', function($scope, $rootScope, $stateParams, $http, $location) {
   

    $http.get( API_URL + '/new/' + $stateParams.id).success(function(data) {
    
        $scope.news = data;
        console.log(data);
        if ($rootScope.user_id != data.offer.users_id){
          console.log('yolo');
          $('.edit').hide();
          $('.delete').hide();
        }else{
          $('.edit').show();
          $('.delete').show();
        }
          $http.get( API_URL + '/users').success(function(users){
            $scope.login = users;
            $scope.length = users.users.total;
            console.log($scope.length);
            
            for ( i = 0; i < $scope.length ; i++){
              console.log(data.offer.id);
              if (users.users.data[i].id == data.offer.users_id){  
                $scope.userLastName = users.users.data[i].name;
                $scope.userFirstName = users.users.data[i].firstname;
                $scope.userNumberPhone = users.users.data[i].number_phone;
                $scope.userEmail = users.users.data[i].email;
                console.log($scope.userLastName);
                console.log('yolo');
              }
            }
           // alert(JSON.stringify(users, null, 4));
          })

      // alert(JSON.stringify(data, null, 4));

    }).error(function() {
        console.log('erreur de connexion');

    });


    $scope.DeletePost = function(id){
        $http({
            method  : 'DELETE',
            url     : API_URL + '/news/' + $stateParams.id,
            
        }).success(function(){
            $location.path('/app/accueil');
        })
        .error(function() {

        });
    }



}) 

.controller('SendCtrl', function($scope, $rootScope, $location, $http) {
     
          $scope.formData = {users_id : $rootScope.user_id} ;
          $scope.errorLocalisation = "";
          $scope.errorTitle = "";
          $scope.errorCategories = "";
          $scope.errorContent = "";
          $http.get( API_URL + '/categories').success(function(category) {
          $scope.categories = category;
          $('.btn-annonce').click(function(){
            $(this).hide();
          });
          $scope.processForm = function() {
            $http({
              method  : 'POST',
              url     : API_URL + '/news',
              data    : $scope.formData,  // pass in data as strings
              headers : {
                  'Content-Type':'application/json'
              }
            })
             .success(function(data) {
              console.log(data);

        // $scope.message = "Successfull !";   
                
                $scope.formData = {};
                $location.path('/app/accueil');
               
            }).error(function(data){
           $('.btn-annonce').show();
                  if($scope.formData.localisation == null) {
                      $scope.errorLocalisation = "Vous n'avez pas rempli la localisation";
                  }

                  if($scope.formData.title == null) {
                      $scope.errorTitle = "Vous n'avez pas rempli le titre";
                  }

                  if($scope.formData.categories_name == null) {
                      $scope.errorCategories = "Vous n'avez pas rempli la catégorie";
                  }

                  if($scope.formData.content == null) {
                      $scope.errorContent = "Vous n'avez pas rempli le contenu";
                  } 
           });
        };

      }).error(function() {
      console.log('erreur de connexion');
  });

  
})


.controller('EditCtrl', function($scope, $rootScope, $stateParams, $location, $http) {
  

$http.get( API_URL + '/categories').success(function(category) {
        $scope.categories = category;
          $http.get( API_URL + '/new/' + $stateParams.id).success(function(data) {
    
        $scope.news = data;
        
        console.log(data.offer.title);

        $scope.formData = {} ;
      $scope.formData = {
        localisation : data.offer.localisation,
        title : data.offer.title,
        categories_name : data.offer.categories_name,
        content : data.offer.content,
        users_id : $rootScope.user_id
      };
        
 

     $scope.EditPost = function(id) {
       
        $http({
            method : 'PUT',
            url : API_URL + '/news/' + $stateParams.id,
            data : $scope.formData,  })

        .success(function(){
             
                $location.path('/app/accueil');
               
               
            
             
            //$scope.message = "Successfull !";
           // $location.path('app/edit/'+id)
        }).error(function(data) {
               if($scope.formData.localisation == null) {
                 $scope.errorLocalisation = "Vous n'avez pas rempli la localisation";
               }

               

               if($scope.formData.title == null) {
                   $scope.errorTitle = "Vous n'avez pas rempli le titre";
               }

               if($scope.formData.categories_name == null) {
                   $scope.errorCategories = "Vous n'avez pas rempli la catégorie";
               }

               if($scope.formData.content == null) {
                   $scope.errorContent = "Vous n'avez pas rempli le contenu";
               } 
    
        });
    };   
        
      // alert(JSON.stringify(data, null, 4));

    }).error(function() {
        console.log('erreur de connexion');

    });
    
    }).error(function() {
        console.log('erreur de connexion');
    });


  

})


.controller('CategoriesCtrl', function($scope, $stateParams, $location, $http) {

  $http.get( API_URL + '/categories').success(function(category) {
        $scope.categories = category;

        }).error(function() {
        console.log('erreur de connexion');
        });
  })


.controller('RegisterCtrl', function($scope, $stateParams, $location, $http){
$('.bar-stable').hide();
  $scope.formData = {};

           $scope.registerForm = function() {
           $http({
            method  : 'POST',
            url     : API_URL + '/users',
            data    : $scope.formData,  // pass in data as strings
            headers : {
                'Content-Type':'application/json'
            }
          })
           .success(function(data) {
            console.log(data);
            console.log('Bien enregistré');
                $location.path('app/login/');
              
          // $scope.message = "Successfull !";
             }).error(function(data){
              console.log('Erreur');
               $scope.message_username = '';
               $scope.message_name = '';
               $scope.message_password = '';
               $scope.message_email = '';
              if( $scope.formData.username == null){
                $scope.message_username = 'Veuillez remplir le pseudonyme';
              }
              if( $scope.formData.name == null){
                $scope.message_name = 'Veuillez remplir le nom';f
              }
              if( $scope.formData.password == null){
                $scope.message_password = 'Veuillez remplir le mot de passe';
              }
              if( $scope.formData.email == null){
                $scope.message_email =  'Veuillez remplir l\'email';
              }else {
                $scope.message_email = 'Veuillez entrer une email valide';
              }
              if($scope.formData.number_phone == null) {
                $scope.message_number_phone = "Vous n'avez pas rempli le numéro de téléphone";
              }else if ($scope.formData.number_phone != parseInt($scope.formData.number_phone, 10)) {
                $scope.message_number_phone = "Vous devez rentrer des nombres";
              }else if ($scope.formData.number_phone.length > 10 || $scope.formData.number_phone.length < 10) {
                $scope.message_number_phone = "Vous devez rentrer 10 nombres";
              }
             });
      
    };

})



.controller('EditBoardCtrl', function($scope, $rootScope, $stateParams, $location, $http){
  $http.get(API_URL + '/show/' + $stateParams.id).success(function(data){
    $scope.updateUser = data; 
    
   //alert(JSON.stringify(data, null, 4));
    $scope.formData = {};
    $scope.formData = {
      name : $rootScope.name,
      firstname : $rootScope.firstname,
      username : $rootScope.username,
      email : $rootScope.email,
      password : $rootScope.password,
      number_phone : $rootScope.number_phone
    };

    $scope.EditBoardPost = function(id) {
      $http({
            method : 'PUT',
            url : API_URL + '/users/' + $stateParams.id,
            data : $scope.formData,  })
      .success(function(){
        $rootScope.username = $scope.formData.username;
        $rootScope.name = $scope.formData.name;
        $rootScope.firstname = $scope.formData.firstname;
        $rootScope.email = $scope.formData.email;
        $rootScope.password = $scope.formData.password;
        $rootScope.number_phone = $scope.formData.number_phone;
        $location.path('/app/tableau-de-bord');
        console.log('youpi');
      }).error(function(){
          if($scope.formData.name == null) {
            $scope.errorName = "Vous n'avez pas rempli le nom";
          }

          if($scope.formData.firstname == null) {
            $scope.errorFirstName = "Vous n'avez pas rempli le prénom";
          }

          if($scope.formData.username == null) {
              $scope.errorUsername = "Vous n'avez pas rempli le pseudonyme";
          }

          if($scope.formData.email == null) {
              $scope.errorEmail = "Vous n'avez pas rempli l'email'";
          }
          if($scope.formData.password == null) {
              $scope.errorPassword = "Vous n'avez pas rempli le mot de passe";
          }
          if($scope.formData.number_phone == null) {
              $scope.errorNumberPhone = "Vous n'avez pas rempli le numéro de téléphone";
          }else if ($scope.formData.number_phone != parseInt($scope.formData.number_phone, 10)) {
              $scope.errorNumberPhone = "Vous devez rentrer des nombres";
          }else if ($scope.formData.number_phone.length > 10 || $scope.formData.number_phone.length < 10) {
              $scope.errorNumberPhone = "Vous devez rentrer 10 nombres";
          }
        console.log('edit error');
      })
      
    };

  }).error(function(){
    console.log('error');
  })
})  



.controller('BoardCtrl', function($scope, $rootScope, $stateParams, $http){
    $('.bloc-articles-board').hide();
  $('#btn-afficher-post').click(function(){
    $('.bloc-articles-board').slideToggle();
  })
  $scope.userById = [];
     $http.get( API_URL + '/news').success(function(data) {
        $scope.news = data;
             $http.get( API_URL + '/users').success(function(member){
                $scope.username = $rootScope.username;
                $scope.lastname = $rootScope.name;
                $scope.firstname = $rootScope.firstname;
                $scope.email = $rootScope.email;
                $scope.password = $rootScope.password;
                $scope.number_phone = $rootScope.number_phone;
                $scope.length = data.offers.total;
                
                for(i = 0; i < $scope.length; i++){
                  
                  if(data.offers.data[i].users_id == $rootScope.user_id) {
                  //alert(JSON.stringify(member.users.data.id, null, 4));
                      $scope.userById.push(data.offers.data[i]);
                }               
              }
              $scope.number_article = $scope.userById.length;
                console.log($scope.userById.length);

                        
  }).error(function(){
    console.log('error');
  })
            
    }).error(function() {
        console.log('erreur de connexion');
    });
 
})


.controller('CategoryCtrl', function($scope, $stateParams, $location, $http) {
     $scope.categoryById = [];
     $http.get( API_URL + '/news').success(function(data) {
        $scope.news = data;
            $http.get( API_URL + '/category/' + $stateParams.id).success(function(cat) {
              $scope.category = cat;
              //alert(JSON.stringify(cat, null, 4));
              $scope.length = data.offers.total;
              for(i = 0; i < $scope.length; i++){
                if(data.offers.data[i].categories_name == cat.category.categories_name) {
                  //alert(JSON.stringify(data.offers.data[i], null, 4));
                  $scope.categoryById.push(data.offers.data[i]);
                  //alert(JSON.stringify($scope.categoryById, null, 4));
                }               
              }
              }).error(function(){
                console.log('pas ez');
              })
            
    }).error(function() {
        console.log('erreur de connexion');
    });
})  





































