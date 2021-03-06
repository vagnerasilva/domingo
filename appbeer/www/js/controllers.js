/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,
                                 $ionicModal,
                                 $ionicPopover,
                                 $timeout,                                              
                                 $firebaseArray,
                                 $firebaseAuth,
                                 $firebaseObject) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,                                 $firebaseArray,
                                 $firebaseAuth,
                                 $firebaseObject) {
    
     $scope.loginEmail = function() {
           
           var email="garagempoc@gmail.com"
           var senha="garagem123"
        firebase.auth()
          .signInWithEmailAndPassword(email,senha)
              .then(function(result) {
              console.log("Successfully user uid:", $scope.signedInUser);
               console.log(" Atendente"+ $scope.email);
              },
                function(error) {
                //sharedUtils.hideLoading();
                //sharedUtils.showAlert("Please note","Authentication Error");
                alert('Please note","Authentication Error'+ error);
                console.log(error);
              }
        );
    }// fim da funcao login 

    $scope.loginEmail();


    var db = firebase.database();
    var ref = db.ref(); 



    var ref = new Firebase("https://chatbotpoc-a9a85.firebaseio.com/");
    var chamados = $firebaseArray(ref);

    console.log(chamados)

    $scope.chamados = $firebaseArray(ref);
    console.log($scope.chamados);
    
$scope.loginCreate = function(loginForm,cred) {
            console.log(cred);
           console.log(loginForm);
  //   console.log("criando login");
    firebase.auth()
    .createUserWithEmailAndPassword(cred.email,cred.password)
      .then(function(result) {
        console.log(result);
       // roomId= result.uid;
        $scope.teste=result;
     // $scope.$apply(function () {
     //   $scope.indo="/dashboard";
      //  });
        //$scope.teste.push(result); 
        console.log("User criado com sucesso : ", result.email+" uid: " + result.uid); 
        },
          function(error) {
/* criar popup aqui */  alert('Erro na criacao '+ error); 
          console.log(error);
          }
      );          

}

$scope.logout = function(loginForm,cred) {
    console.log("fazendo logout");
      firebase.auth()
      .signOut().then(function() {
        // Sign-out successful.
        var limpar={};
        $scope.email=null;
        //$scope.usuario= new limpar;
        }, function(error) {
            alert(' Error'+ error);
            console.log(error);
      })
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log("Email: "+ user.email +"ID: " +user.uid );
        console.log(user.displayName);
        signedEmail=user.email;
        signedInUser=user;
        roomId=user.uid;

      

        

        console.log("sala "+roomId);
      }
      else{
        console.log("deslogado");
        //$scope.signedInUser= null;
        roomId=null;
        signedInUser=null;


        
      }
    });
} // logout funcao 


$scope.loginEmail = function(loginForm,cred) {
  	       console.log(cred);
           console.log(loginForm);

      //    var objeto={};

          firebase.auth()
          .signInWithEmailAndPassword(cred.email,cred.password)
              .then(function(result) {
               // console.log();
                $scope.signedInUser=result;
                $scope.indo="dashboard"; 
                  $scope.$apply(function () {
           $scope.profile=result.email;
        }); 
               // console.log($scope.signedInUser.displayName);

                //$scope.teste.push(result); 
              // console.log("Successfully user uid:", $scope.signedInUser);
               $scope.roomId=result.uid;
               console.log(" LOGADO vou abrir esta sala"+ $scope.roomId);

               


              },
                function(error) {
                //sharedUtils.hideLoading();
                //sharedUtils.showAlert("Please note","Authentication Error");
                alert('Please note","Authentication Error'+ error);
                console.log(error);
                  
              }
        );




}// fim da funcao login 

// Verificando usuario
firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log("aqui dentro : "+ user.email +"ID: " +user.uid );
        console.log(user.email);
        $scope.logado=true;
        $scope.email=user.email;

      }
      else{
        console.log("deslogado");
        //$scope.signedInUser= null;
        $scope.logado=false;
        $scope.email=null;
      }
    });
    
    
    
    
    
    
    
    
    
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);






    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();





    
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
