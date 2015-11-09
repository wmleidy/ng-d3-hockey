angular.module('hockeyStats')
.factory('teams', ['$http', function($http){
	var o = {
		team_stats: [],
		team_names: []
	}

	o.getAll = function() {
		return $http.get('/teams.json').success(function(data){
			angular.copy(data, o.team_stats);
		});
	};

	o.getNames = function() {
		return $http.get('/teams/names.json').success(function(data){
			angular.copy(data, o.team_names);
		});
	};

	return o;
}])