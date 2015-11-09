angular.module('hockeyStats')
.controller('MainCtrl', ['$scope', 'players', function($scope, players){
	// syncs our local controller scope with the player data from the 'players' service
	$scope.players = players.players;
	$scope.teams = players.teams;
	$scope.seasons = ['2014-2015', '2013-2014'];
	$scope.situations = ['5v5 All', '5v5 Close'];

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
	$scope.season = '2014-2015';
	$scope.situation = '5v5 All';
}])