angular.module('hockeyStats')
.controller('PlayersCtrl', ['$scope', '$stateParams', 'players', 'player',
	function($scope, $stateParams, players, player) {
		$scope.player = player;
	};
]);