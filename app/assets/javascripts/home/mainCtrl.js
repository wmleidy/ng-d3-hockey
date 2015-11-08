angular.module('hockeyStats')
.controller('MainCtrl', ['$scope', 'players', function($scope, players){
	// syncs our local controller scope with the player data from the 'players' service
	$scope.players = players.players;
}])