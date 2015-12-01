angular.module('hockeyStats', ['ui.router', 'templates','ui.bootstrap'])
.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/_home.html',
			controller: 'MainCtrl',
			resolve: {
				// playerPromise: ['players', function(players){
				// 	return players.getAll();
				// }],
				defaultPlayerPromise: ['players', function(players){
					return players.getPlayerDataByTeam("Chicago");
				}],
				deafultTeamPromise: ['teams', function(teams){
					return teams.getTeamData("Chicago");
				}],
				teamNamePromise: ['teams', function(teams){
					return teams.getNames();
				}]
			}
		});
		$urlRouterProvider.otherwise('home');
	}])