var services = angular.module('starter.services', []);



services.factory('Contacts', function ($http) {

    var list = [];
    var lastFilter, lastPage, lastPageSize;
    return {

        getData: function (filter, page, pageSize, append) {
            var url = "http://192.168.1.77/nex/resources/tools_new/Mobile.asmx/Contacts";
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
                    var list2 = response.data.Message;
                    if (append) {
                        list.push(list2);
                        return list;
                    }
                    list = list2;
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
            var url = "http://192.168.1.77/nex/resources/tools_new/Mobile.asmx/UpdateContact";
            var rtn = $http.post(url,
                    {
                        contact: c
                    }
                 ).then(function (response) {
                     //alert('yuppy update is done');
                     //list = response.data.Message;
                     //return list;
                     rtn = response;
                     return rtn;
                 });
            return rtn;
        }

    };//Contacts;
});



services.factory('Customers', function ($http) {

    var list = [];
    var lastFilter, lastPage, lastPageSize;
    return {

        getData: function (filter, page, pageSize, append) {
            var url = "http://192.168.1.77/nex/resources/tools_new/Mobile.asmx/Customers";
            // $http returns a promise, which has a then function, which also returns a promise
            var prevList = list;
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

                    var list2 = response.data.Message;
                    if (append) {
                        for (var i = 0; i < list2.length; i++) {
                            prevList.push(list2[i]);
                        }
                        //list.push(list2);
                        list = prevList;
                        return list;
                    }
                    list = list2;
                    return list;
                });
            // Return the promise to the controller
            return list;
        },

        GetTypes: function () {
            var keyValue = ["^", "R^Customer", "S^Supplier", "F^Forwarder", "P^Prospect"];
            //var array = keyValue.reduce(function (acc, el) {
            var array = keyValue.map(function (el) {
                var keyVal = el.split('^');
                var obj = {};
                obj.value = keyVal[0];
                obj.text = keyVal[1];
                //acc[keyVal[0]] = keyVal[1];
                return obj;
            }, {});
            return array;
        },

        all: function () {
            return list;
        },
        remove: function (customer) {
            list.splice(list.indexOf(customer), 1);
        },
        get: function (idCustomer) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].idCustomer === parseInt(idCustomer)) {
                    return list[i];
                }
            }
            return null;
        },
        set: function (c) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].idCustomer === parseInt(c.idCustomer)) {
                    list[i] = c;
                    return;
                }
            }
        },
        update: function (c) {
            var url = "http://192.168.1.77/nex/resources/tools_new/Mobile.asmx/UpdateCustomer";
            var rtn;
            rtn = $http.post(url,
                    {
                        customer: c
                    }
                 ).then(function (response) {
                     //alert('yuppy update is done');
                     //list = response.data.Message;
                     //return list;
                     rtn = response;
                     return rtn;
                 });
            return rtn;
        }

    };//Customers;
});




services.factory('SearchData', function ($http) {

    var list = [];
    var lastFilter, lastPage, lastPageSize;
    return {

        getData: function (searchFor, filter, page, pageSize, append) {
            var url = "http://192.168.1.77/nex/resources/tools_new/Mobile.asmx/Search";
            // $http returns a promise, which has a then function, which also returns a promise
            var prevList = list;
            list = $http.get(url,
                {
                    params:
                      {
                          searchFor: searchFor,
                          filter: filter,
                          page: page,
                          pageSize: pageSize
                      }
                }).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.

                    var list2 = response.data.Message;
                    if (append) {
                        for (var i = 0; i < list2.length; i++) {
                            prevList.push(list2[i]);
                        }
                        //list.push(list2);
                        list = prevList;
                        return list;
                    }
                    list = list2;
                    return list;
                });
            // Return the promise to the controller
            return list;
        },

        all: function () {
            return list;
        },
        get: function (id) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === parseInt(id)) {
                    return list[i];
                }
            }
            return null;
        }

    };//Customers;
});




/*
class SearchPage {
    constructor() {
        this.searchQuery = '';
        this.initializeItems();
    }

    initializeItems() {
        this.items = [
          'Amsterdam',
          'Bogota',
          'Beirut',
          'London',
          'Paris'
          ];
    }

    getItems(searchbar) {
        // Reset items back to all of the items
        this.initializeItems();

        // set q to the value of the searchbar
        var q = searchbar.value;

        // if the value is an empty string don't filter the items
        if (q.trim() == '') {
            return;
        }

        this.items = this.items.filter((v) => {
            if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        })
    }
}
*/