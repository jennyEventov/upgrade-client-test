(function () {
    'use strict';

    function uiTestComponent() {
        function controller($scope, $q, $filter) {
            /* jshint validthis: true */
            var vm = this;
            vm.process = {
                processType: "AMBULATORY_HEALTH_CLAIM",
                processStatus: 1,
                superClaim: {
                    inquiryPorcessFlag: true,
                    irregularSuperClaimFlag: false,
                    pensionFollowUpForInsuredType: 0,
                    superClaimStatus : {
                        code : 1,
                        value : "פתוחה"
                    },
                    deathAfterDisabilityFlag: false,
                    operativeClaims: [
                        {
                            operativeClaimNum: 123,
                            company : 2,
                            claimStatus : {
                                code : 2,
                                value : "פתוחה"
                            },
                            coverages: [
                                {
                                    coverageNum: 1,
                                    claimParticipating: false
                                },
                                {
                                    coverageNum: 2,
                                    claimParticipating: false
                                }
                            ]
                        }, {
                            operativeClaimNum: 24531,
                            company : 1,
                            claimStatus : {
                                code : 1,
                                value : "מבוטלת"
                            },
                            coverages: [
                                {
                                    coverageNum: 1,
                                    claimParticipating: true
                                },
                                {
                                    coverageNum: 2,
                                    claimParticipating: false
                                }
                            ]
                        }
                    ]
                },
                insured : {
                    companyEmployer : true,
                    position: "פקיד",
                    identity : 27854122145,
                    firstName : "מריה",
                    lastName : "ג'יין",
                    age: 35,
                    lastJobDescription : "כללי - מקפת",
                    smokingCode : 0,
                    email : "NIKITA_JAIN@AMAT.COM",
                    address : {
                        cityName : "רעננה",
                        streetName : "אחוזה",
                        cellPhone : 544485236
                    }
                },

            }

            vm.refreshProcess = function() {
                vm.process.superClaim.inquiryPorcessFlag = false;
                vm.process.superClaim.irregularSuperClaimFlag = true;
            }

            function initiate() {
                var x = 2;
            }

            initiate();

        }

        return {
            restrict: 'E',
            controller: ['$scope', '$q', '$filter', controller],
            controllerAs: 'vm',
            bindToController: true,
            scope: {},
            template: require('!html-loader!./template.html')
        };
    }

    angular
        .module('testModule')
        .directive('uiTest', uiTestComponent);
}());
