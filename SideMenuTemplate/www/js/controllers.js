var m = angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };



})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});


m.controller('ContactsCtrl', function ($scope, $http, Contacts, $ionicLoading) {
    //$scope.contacts = Contacts.all();
    $scope.filter = '';
    $scope.contacts = [];
    $scope.remove = function (contact) {
        Contacts.remove(contact);
    };
    $ionicLoading.show();
    Contacts.getData($scope.filter, 0, 15, false).then(function (d) {
        $scope.contacts = d;
        $ionicLoading.hide();
    });
    $scope.search = function (filter) {
        $ionicLoading.show();
        Contacts.getData(filter, 0, 15, false).then(function (d) {
            $scope.contacts = d;
            $ionicLoading.hide();
        });
    };
});


m.controller('ContactDetailCtrl', function ($scope, $http, $stateParams, $state, Contacts, $ionicLoading, $ionicModal, $ionicPopup) {
    //$scope.contacts = Contacts.all();
    $scope.original = Contacts.get($stateParams.idContact);
    $scope.contact = angular.copy($scope.original);

    $scope.Save = function (c) {
        $ionicLoading.show();
        Contacts.set(c);
        Contacts.update(c).then(function (d) {
            $ionicLoading.hide();
            history.back();
        });

        //$state.to('contacts');
    };





    //create Modal for search
    $scope.modalSearch;
    $ionicModal.fromTemplateUrl('templates/search.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalSearch = modal;
    });


    // Triggered in the search modal to close it
    $scope.selectItem = function (id, name) {
        $scope.contact.idCustomer = id;
        $scope.contact.CustomerName = name;
        $scope.modalSearch.hide();
    };

    $scope.SearchBy = '';
    // Open the search modal
    $scope.closeSearch = function () {

        $scope.modalSearch.hide();
    };
    $scope.Search = function (searchBy) {

        $scope.SearchBy = searchBy;
        $scope.modalSearch.show();
    };
    //$scope.modalSearch.then(function (res) {
    //    alert('finished --1');
    //});

    $scope.items = [
  'Amsterdam',
  'Bogota',
  'London',
  'Beirut',
    ];

    // Perform the Search action when the user submits the login form
    $scope.doSearch = function (filter) {
        //console.log('Doing login', $scope.loginData);
        alert(filter);
        alert($scope.SearchBy);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        //$timeout(function () {
        //    $scope.closeLogin();
        //}, 1000);
    };



    /*
        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
            $scope.data = {};
    
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="password" ng-model="data.wifi">',
                title: 'Enter Wi-Fi Password',
                subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                  { text: 'Cancel' },
                  {
                      text: '<b>Save</b>',
                      type: 'button-positive',
                      onTap: function(e) {
                          if (!$scope.data.wifi) {
                              //don't allow the user to close unless he enters wifi password
                              e.preventDefault();
                          } else {
                              return $scope.data.wifi;
                          }
                      }
                  }
                ]
            });
    
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
    
        };
    */


});






m.controller('CustomersCtrl', function ($scope, $http, Customers, $ionicLoading) {
    //$scope.contacts = Contacts.all();
    $scope.page = 0;
    $scope.pageSize = 15;

    $scope.filter = '';
    $scope.CanLoadMore = false;
    $scope.customers = [];


    $scope.remove = function (customer) {
        Customers.remove(customer);
    };


    $ionicLoading.show();
    Customers.getData($scope.filter, $scope.page, $scope.pageSize, false).then(function (d) {
        $scope.customers = d;
        $scope.CanLoadMore = true;
        $ionicLoading.hide();
    });


    $scope.search = function (filter) {
        $ionicLoading.show();
        $scope.page = 0;
        $scope.filter = filter;
        $scope.CanLoadMore = true;
        Customers.getData(filter, $scope.page, $scope.pageSize, false).then(function (d) {
            $scope.customers = d;
            $ionicLoading.hide();
        });
    };

    $scope.loadMore = function () {

        //$ionicLoading.show();
        $scope.page++;
        var lastCustomerCount = $scope.customers.length;
        Customers.getData($scope.filter, $scope.page, $scope.pageSize, true).then(function (d) {
            $scope.CanLoadMore = d.length > lastCustomerCount;

            $scope.customers = d;
            //$ionicLoading.hide();
            $scope.$broadcast('scroll.infiniteScrollComplete');


        });
    };

});


m.controller('CustomerDetailCtrl', function ($scope, $http, $stateParams, $state, Customers, $ionicLoading) {
    //$scope.contacts = Contacts.all();
    $scope.original = Customers.get($stateParams.idCustomer);
    $scope.customer = angular.copy($scope.original);
    $scope.TYPES = Customers.GetTypes();



    $scope.Save = function (c) {
        $ionicLoading.show();
        Customers.set(c);
        Customers.update(c).then(function (d) {

            $ionicLoading.hide();
            history.back();
        });
        //$state.to('contacts');
    };

});

m.controller('DashboardCtrl', function ($scope, $http) {
    //$scope.contacts = Contacts.all();
    $scope.something = "under construction1";




    $scope.TextScanned = 'No text scanned';

    $scope.scan = function () {
//        cordova.plugins.barcodeScanner.encode(

//    // pick one of TEXT_TYPE / EMAIL_TYPE / PHONE_TYPE / SMS_TYPE
//    cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,

//    // the thing to encode - for a link use TEXT_TYPE above
//    "http://www.telerik.com",

//    // success callback (will currently not be invoked)
//    function (result) {
//        alert("Encoding succeeded: " + result);
//    },

//    // error callback
//       function (error) {
//           alert("Encoding failed: " + error);
//       }
//);
    };


    function hasCameraPermission() {
        cordova.plugins.barcodeScanner.hasCameraPermission(
          function (result) {
              // if this is 'false' you probably want to call 'requestCameraPermission' now
              alert(result);
          }
        )
    }

    function requestCameraPermission() {
        // no callbacks required as this opens a popup which returns async
        cordova.plugins.barcodeScanner.requestCameraPermission();
    }

});
/*
m.controller('SearchCtrl', function ($scope, $http, SearchData, $ionicLoading ) {
    //$scope.contacts = Contacts.all();
    $scope.items = [
      'Amsterdam',
      'Bogota',
      'London',
      'Beirut',
      ];
    $scope.getItems = function (searchbar) {
        alert(searchbar);

    };
    $scope.selectItem = function (item) {
        alert(item);
        return false;
    };







});
*/