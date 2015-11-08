angular.module('hockeyStats')
.factory('players', ['$http', function($http){
	var o = {
		players: []
	};

	o.getAll = function() {
		return $http.get('/players.json').success(function(data){
			angular.copy(data, o.players);
		});
	};

	// o.get = function(id) {
	// 	return $http.get('/players/' + id + '.json').then(function(res) {
	// 		return res.data;
	// 	});
	// };

	return o;
}])