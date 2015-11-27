angular.module('hockeyStats')
.factory('players', ['$http', function($http){
	var o = {
		players: [],
		player: {}
	};

	// o.getAll = function() {
	// 	return $http.get('/players.json').success(function(data){
	// 		angular.copy(data, o.players);
	// 	});
	// };

	o.getPlayerDataByTeam = function(teamName) {
		return $http.get('/players/search.json?team_name=' + teamName).success(function(data){
			angular.copy(data, o.players);
		});
	}

	// o.getTeams = function() {
	// 	return $http.get('/players/teams.json').success(function(data){
	// 		angular.copy(data, o.teams);
	// 	});
	// };

	// o.get = function(id) {
	// 	return $http.get('/players/' + id + '.json').then(function(res) {
	// 		return res.data;
	// 	});
	// };

	o.getPlayerData = function(playerName) {
		return $http.get('/players/search.json?player_name=' + playerName).success(function(data){
			angular.copy(data, o.player);
		});
	}

	return o;
}])