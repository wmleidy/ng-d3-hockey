angular.module('hockeyStats')
.controller('MainCtrl', ['$scope', 'players', function($scope, players){
	// syncs our local controller scope with the player data from the 'players' service
	$scope.players = players.players;
	$scope.teams = players.teams;

	$scope.formatTOI = function(player) {
		var formattedSeconds;
		if (player.toi % 60 < 10) {
			formattedSeconds = "0" + player.toi % 60;
		} else {
			formattedSeconds = player.toi % 60;
		}
		return String(Math.floor(player.toi / 60)) + ":" + formattedSeconds;
	};

	$scope.team = 'Chicago';
}])