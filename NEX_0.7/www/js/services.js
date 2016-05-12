var services = angular.module('starter.services', []);

services.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});


services.factory('Contacts', function ($http) {

    var list = [];
    var lastFilter, lastPage, lastPageSize;
    return {

        async: function (filter, page, pageSize) {
            var url = "http://192.168.1.120/nex/resources/tools_new/Mobile.asmx/Contacts";
            // $http returns a promise, which has a then function, which also returns a promise
            list = $http.get(url,
                {
                    params:
                      {
                          filter: filter,
                          page: page,
                          pageSize: pageSize
                      }
                }).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.
                    list = response.data.Message;
                    return list;
                });
            // Return the promise to the controller
            return list;
        },



        all: function () {
            return list;
        },
        remove: function (cotact) {
            list.splice(list.indexOf(cotact), 1);
        },
        get: function (idContact) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].idContact === parseInt(idContact)) {
                    return list[i];
                }
            }
            return null;
        },
        set: function (c) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].idContact === parseInt(c.idContact)) {
                    list[i] = c;
                    return;
                }
            }
        },
        update: function (c) {
            var url = "http://192.168.1.120/nex/resources/tools_new/Mobile.asmx/UpdateContact";
            $http.post(url,
                    {
                        contact: c
                    }
                 ).then(function (response) {
                     alert('yuppy update is done');
                     //list = response.data.Message;
                     //return list;
                 });
        }

    };//Contacts;
});

//    var contacts = [
//        //{
//        //    id: 0,
//        //    FirstName: 'Ali',
//        //    LastName: 'Keserwan',
//        //    Mobile: '009611231231',
//        //    Email: 'keserwan@gmail.com'
//        //}, {
//        //    id: 1,
//        //    FirstName: 'Ali 1',
//        //    LastName: 'Keserwan',
//        //    Mobile: '009611231231',
//        //    Email: 'keserwan1@gmail.com'
//        //}, {
//        //    id: 2,
//        //    FirstName: 'Ali 2',
//        //    LastName: 'Keserwan',
//        //    Mobile: '009611231231',
//        //    Email: 'keserwan2@gmail.com'
//        //}, {
//        //    id: 3,
//        //    FirstName: 'Ali 3',
//        //    LastName: 'Keserwan',
//        //    Mobile: '009611231231',
//        //    Email: 'keserwan3@gmail.com'
//        //}, {
//        //    id: 4,
//        //    FirstName: 'Ali 4',
//        //    LastName: 'Keserwan',
//        //    Mobile: '009611231231',
//        //    Email: 'keserwan4@gmail.com'
//        //}
//    ];
//    return {
//        all: function () {
//            var url = "http://192.168.1.120/nex/resources/tools_new/Mobile.asmx/Contacts";
//            $http.get(url).success(function (data) {
//                //contacts.clear();
//                //for (var i = 0; i < data.Message.length; i++) {
//                //    conta
//                //}
//                contacts = data.Message;
//            });
//            return contacts;
//        }
//    };
//});