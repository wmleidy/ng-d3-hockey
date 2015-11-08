angular.module('hockeyStats', ['ui.router', 'templates'])
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
				playerPromise: ['players', function(players){
					return players.getAll();
				}]
			}
		});
		$urlRouterProvider.otherwise('home');
	}])