(function () {
    'use strict';

    /* @ngInject */
    function testService($q) {

        function checkIfParticipatingClaim(claim) {
            return _.find(claim.coverages, function (coverage) { return coverage.claimParticipating; });
        }


        // PUBLIC API
        var service = {
            isParticipatingClaim: checkIfParticipatingClaim
        };

        return service;
    }

    angular
        .module('testModule')
        .factory('testService', ['$q', testService]);
})();
