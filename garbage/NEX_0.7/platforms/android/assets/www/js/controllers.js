var m = angular.module('starter.controllers', []);


m.controller('SideMenuCtrl', function ($scope, $ionicSideMenuDelegate) {

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

});


m.controller('DashCtrl', function ($scope) {



})

.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});


m.controller('ContactsCtrl', function ($scope, $http, Contacts) {
    //$scope.contacts = Contacts.all();
    $scope.contacts = [];
    $scope.remove = function (contact) {
        Contacts.remove(contact);
    };
    Contacts.async("", 0, 15).then(function (d) {
        $scope.contacts = d;
    });

});


m.controller('ContactDetailCtrl', function ($scope, $http, $stateParams, $state, Contacts) {
    //$scope.contacts = Contacts.all();
    $scope.original = Contacts.get($stateParams.idContact);
    $scope.contact = angular.copy($scope.original);

    $scope.Save = function (c) {
        Contacts.set(c);
        Contacts.update(c);
        history.back();
        //$state.to('contacts');
    };

});