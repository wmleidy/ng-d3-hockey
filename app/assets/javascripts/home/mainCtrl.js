angular.module('hockeyStats')
.controller('MainCtrl', ['$scope', 'players', 'teams', function($scope, players, teams){
	// syncs our local controller scope with the player and team data from the services
	$scope.players = players.players;
	$scope.team_stats = teams.team_stats;
	$scope.team_names = teams.team_names;

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

	$scope.team_name = 'Chicago';
	$scope.season = '2014-2015';
	$scope.situation = '5v5 All';
}])