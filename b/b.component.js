(function () {
    'use strict';

    function bComponent() {
        function controller($rootScope) {
            /* jshint validthis: true */
            var vm = this;

            vm.isCompanyEmployer = function () {
                if(!vm.process || !vm.process.insured || !vm.process.insured.companyEmployer) {
                    return '';
                }else{
                    return 'עובד חברה - ' + vm.process.insured.position;
                }
            };

            vm.addInsuredToContacts = function () {
                $rootScope.$broadcast('add-insured-to-contacts', vm.process.insured);
            }

        }

        return {
            restrict: 'E',
            controller: ['$rootScope', controller],
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                process: '='
            },
            template: require('!html-loader!./template.html')
        };
    }

    angular
        .module('testModule')
        .directive('bComponent', bComponent);
}());
