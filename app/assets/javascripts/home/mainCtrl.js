angular.module('hockeyStats')
.controller('MainCtrl', ['$scope', 'players', 'teams', '$http', function($scope, players, teams, $http){
	// syncs our local controller scope with the player and team data from the services
	$scope.players = players.players;
	$scope.team_stats = teams.team_stats;
	$scope.team_names = teams.team_names;

	$scope.seasons = ['2014-2015', '2013-2014'];
	$scope.situations = ['5v5 All', '5v5 Close'];
	$scope.positions = ['', 'F', 'D'];

	$scope.formatTOI = function(timeInSeconds) {
		// a bad example of cheating with type looseness in JavaScript
		var formattedSeconds;
		if (timeInSeconds% 60 < 10) {
			formattedSeconds = "0" + timeInSeconds % 60;
		} else {
			formattedSeconds = timeInSeconds % 60;
		}
		return String(Math.floor(timeInSeconds / 60)) + ":" + formattedSeconds;
	};

	$scope.team_name = 'Chicago';
	$scope.season = '2014-2015';
	$scope.situation = '5v5 All';
	$scope.position = '';

	$scope.selectParams = function() {
		players.getPlayerDataByTeam($scope.team_name);
		teams.getTeamData($scope.team_name);
	};

	$scope.teamStats = true;
	$scope.playerStats = true;
	// $scope.orderProp = 'cf_per'

  $scope.getPlayerName = players.getPlayerName

  $scope.onSelect = function ($item, $model, $label) {
    players.getPlayerData($item)
  };

  $scope.playerResults = players.player;
  $scope.playerSeasons = ['2014-2015', '2013-2014'];
  $scope.playerSeason = '2014-2015'
  $scope.playerSituations = ['5v5 All', '5v5 Close'];
  $scope.playerSituation = '5v5 All'

  $scope.isEmptyObject = function(obj) {
    return angular.equals([], obj);
  };
}])