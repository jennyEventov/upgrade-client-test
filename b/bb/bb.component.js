(function () {
    'use strict';

    function bbComponent() {
        function controller($rootScope) {
            /* jshint validthis: true */
            var vm = this;
            vm.count;
            vm.isToShow = true;

            vm.resetContacts = function () {
                $rootScope.$broadcast('reset-contacts');
            }

            vm.deleteContacts = function () {
                $rootScope.$broadcast('delete-contacts');
            }

            vm.addToContacts = function () {
                vm.add();
            }

            $rootScope.$on('update-contacts-count', function (event, count) {
                vm.count = count;
            });

        }

        return {
            restrict: 'E',
            controller: ['$rootScope', controller],
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                add: '&'
            },
            template: require('!html-loader!./template.html')
        };
    }

    angular
        .module('testModule')
        .directive('bbComponent', bbComponent);
}());
