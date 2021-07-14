(function () {
    'use strict';

    /* @ngInject */
    function aComponent() {
        function controller($rootScope) {
            var vm = this;
            vm.contactPersons = [
                {
                    id : 1,
                    deliveryFlag : true,
                    type : {
                        code : 1,
                        value : "מבוטח"
                    },
                    firstName : "ניקיטה",
                    lastName : "ג'יין",
                    identity : 278545412,
                    address : {
                        homeNumber : 9,
                        cityName : "רחובות",
                        streetName : "אופנהיימר"
                    },
                    cellPhone : 525816206,
                    email : "NIKITA_JAIN@AMAT.COM"
                },
                {
                    id : 2,
                    deliveryFlag : false,
                    type : {
                        code : 21,
                        value : "סוכן"
                    },
                    firstName : "טוביה",
                    lastName : "בצקי",
                    identity : 433974846,
                    address : {
                        cityName : "מחנה תל נוף",
                    },
                    cellPhone : 525452206,
                }
            ]
            var contactPersonType = {
                INSURED: 1,
                AGENT: 2,
                EMPLOYER: 5,
                ADVOCATE: 19,
                COMMISSIONED: 20,
                OTHER: 21,
                SURVIVOR: 22
            }

            $rootScope.$on('reset-contacts', function () {
                var contacts = [];
                contacts.push(vm.contactPersons[0]);
                vm.contactPersons = contacts;
                $rootScope.$emit('update-contacts-count', vm.contactPersons.length);
            });

            $rootScope.$on('delete-contacts', function () {
                vm.contactPersons = [];
                $rootScope.$emit('update-contacts-count', vm.contactPersons.length);
            });

            $rootScope.$on('add-insured-to-contacts', function (event, params) {
                var newContact = createContact(params);
                vm.contactPersons.push(newContact);
                $rootScope.$emit('update-contacts-count', vm.contactPersons.length);
            });

            function createContact(contact) {
                return {
                    id: vm.contactPersons.length,
                    deliveryFlag : vm.contactPersons[vm.contactPersons.length - 1] ? vm.contactPersons[vm.contactPersons.length - 1].deliveryFlag ? false : true : true,
                    type : {
                        code : 1,
                        value : "מבוטח"
                    },
                    firstName : contact.firstName,
                    lastName : contact.lastName,
                    identity :  contact.identity,
                    address : {
                        cityName : contact.address.cityName,
                        streetName :  contact.address.streetName
                    },
                    cellPhone : contact.cellPhone,
                    email : contact.email
                }
            }

            function isAmbulatoryProcess() {
                return vm.processType === "AMBULATORY_HEALTH_CLAIM" || vm.processType === "AMBULATORY_HEALTH_CLAIM_CONT";
            }

            function contactIsInsured(contactPerson) {
                return contactPerson.type.code === contactPersonType.INSURED;
            }

            vm.isInsuredInHealthClaim = function(contactPerson){
                return isAmbulatoryProcess() && contactIsInsured(contactPerson);
            };

            vm.addContactPerson = function () {
                vm.contactPersons.push({
                    id: vm.contactPersons.length,
                    deliveryFlag : vm.contactPersons[vm.contactPersons.length - 1] ? vm.contactPersons[vm.contactPersons.length - 1].deliveryFlag ? false : true : true,
                    type : {
                        code : 5,
                        value : "שאר"
                    },
                    firstName : "ישראל",
                    lastName : "ישראלי",
                    identity : 278545412,
                    address : {
                        homeNumber : 9,
                        cityName : "רחובות",
                        streetName : "אופנהיימר"
                    },
                    cellPhone : 525816206,
                    email : "NIKITA_JAIN@AMAT.COM"
                },)
                $rootScope.$emit('update-contacts-count', vm.contactPersons.length);
            }

            function initiate() {
                $rootScope.$emit('update-contacts-count', vm.contactPersons.length);
            }

            initiate();

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
        .directive('aComponent', aComponent);
}());
