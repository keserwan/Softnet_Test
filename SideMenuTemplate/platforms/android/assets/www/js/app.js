// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

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
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

    ////.state('app.search', {
    ////    url: '/search/:searchBy',
    ////    views: {
    ////        'menuContent': {
    ////            templateUrl: 'templates/search.html',
    ////            controller: 'SearchCtrl'
    ////        }
    ////    }
    ////})

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })
      .state('app.playlists', {
          url: '/playlists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/playlists.html',
                  controller: 'PlaylistsCtrl'
              }
          }
      })

    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });

    $stateProvider.state('app.contacts', {
        url: '/contacts',
        views: {
            'menuContent': {
                templateUrl: 'templates/contacts.html',
                controller: 'ContactsCtrl'
            }
        }
    });

    $stateProvider.state('app.contact-detail', {
      url: '/contacts/:idContact',
      views: {
          'menuContent': {
              templateUrl: 'templates/contact.html',
              controller: 'ContactDetailCtrl'
          }
      }
  });



    $stateProvider.state('app.customers', {
        url: '/customers',
        views: {
            'menuContent': {
                templateUrl: 'templates/customers.html',
                controller: 'CustomersCtrl'
            }
        }
    });

    $stateProvider.state('app.customer-detail', {
        url: '/customers/:idCustomer',
        views: {
            'menuContent': {
                templateUrl: 'templates/customer.html',
                controller: 'CustomerDetailCtrl'
            }
        }
    });


  $stateProvider.state('app.dashboard', {
          url: '/dashboard',
          views: {
              'menuContent': {
                  templateUrl: 'templates/dashboard.html',
                  controller: 'DashboardCtrl'
              }
          }
      })
 


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
})

 
;
