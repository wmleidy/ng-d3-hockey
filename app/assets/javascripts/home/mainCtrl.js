angular.module('hockeyStats')
.controller('MainCtrl', ['$scope', 'players', 'teams', function($scope, players, teams){
	// syncs our local controller scope with the player and team data from the services
	$scope.players = players.players;
	$scope.team_stats = teams.team_stats;
	$scope.team_names = teams.team_names;

	$scope.seasons = ['2014-2015', '2013-2014'];
	$scope.situations = ['5v5 All', '5v5 Close'];

	$scope.formatTOI = function(thing) {
		// a bad example of cheating with type looseness in JavaScript
		var formattedSeconds;
		if (thing.toi % 60 < 10) {
			formattedSeconds = "0" + thing.toi % 60;
		} else {
			formattedSeconds = thing.toi % 60;
		}
		return String(Math.floor(thing.toi / 60)) + ":" + formattedSeconds;
	};

	$scope.team_name = 'Chicago';
	$scope.season = '2014-2015';
	$scope.situation = '5v5 All';

	$scope.selectParams = function() {
		players.getPlayerDataByTeam($scope.team_name);
	};

	// $scope.orderProp = 'cf_per'
}])