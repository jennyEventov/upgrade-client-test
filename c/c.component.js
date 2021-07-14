(function () {
    'use strict';

    /* @ngInject */
    function cComponent() {
        function controller($scope, $q, $filter, testService) {
            var vm = this;
            vm.pensionFollowUpType = [
                { code: 1, value: "במעקב נכות שנתי" },
                { code: 2, value: "במעקב נכות רפואי" },
                { code: 3, value: "במעקב נכות שנתי ורפואי" },
            ]
            var canceledClaimStatus = 2;

            vm.hasIrragularMark = function () {
                return vm.processModel && vm.processModel.superClaim && vm.processModel.superClaim.irregularSuperClaimFlag === true;
            };

            vm.claimRemarks = function () {
                var text = "";
                if (vm.processModel.superClaim && vm.processModel.superClaim.inquiryPorcessFlag) {
                    text += "בירור";
                    if (vm.processModel.superClaim.pensionFollowUpForInsuredType) {
                        text += ", ";
                    }
                }
                return text;
            };

            vm.getClaims = function() {
                if (!vm.processModel.superClaim || !vm.processModel.superClaim.operativeClaims) { return ''; }
                var ParticipatingClaims = getParticipatingClaims(vm.processModel.superClaim.operativeClaims)
                return ParticipatingClaims ? ParticipatingClaims.map(function (claim) {
                    return claim.company + "-" + claim.operativeClaimNum;
                }).join(",") : "אין תביעות משתתפות";
            };

            vm.executeRefresh = function() {
                vm.refresh();
            }

            function getParticipatingClaims(operativeClaims) {
                return _.filter(operativeClaims, function (claim) {
                    return claim.claimStatus.code !== canceledClaimStatus &&  testService.isParticipatingClaim(claim);
                })
            }

            function initiate() {
                var x = 2;
            }

            initiate();
        }

        return {
            restrict: 'E',
            controller: ['$scope', '$q', '$filter', 'testService', controller],
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                processModel: '=',
                refresh: '&'
            },
            template: require('!html-loader!./template.html')
        };
    }

    angular
        .module('testModule')
        .directive('cComponent', cComponent);
}());
