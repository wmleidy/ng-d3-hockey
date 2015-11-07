angular.module('hockeyStats', ['ui.router', 'templates'])

.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});
		$urlRouterProvider.otherwise('home');
	}])
.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}])
.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
	$scope.posts = posts.posts;

	$scope.posts = [
		{title: 'post1', upvotes: 5},
		{title: 'post2', upvotes: 2},
		{title: 'post3', upvotes: 15},
		{title: 'post4', upvotes: 9},
		{title: 'post5', upvotes: 4}
	];

	$scope.addPost = function(){
		if(!$scope.title || $scope.title === '') { return; }
		$scope.posts.push({
			title: $scope.title,
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: 'Joe', body: 'Cool post, dude!', upvotes: 0},
				{author: 'Bob', body: 'Dunno about that...', upvotes: 0}
			]
		});
		$scope.title = '';
		$scope.link  = '';
	}

	$scope.incrementUpvotes = function(post) {
		post.upvotes++;
	}
}])
.controller('PostsCtrl', ['$scope', '$stateParams', 'posts',
	function($scope, $stateParams, posts) {
		$scope.post = posts.posts[$stateParams.id];

		$scope.addComment = function(){
		  if($scope.body === '') { return; }
		  $scope.post.comments.push({
		    body: $scope.body,
		    author: 'user',
		    upvotes: 0
		  });
		  $scope.body = '';
		};
	}
]);