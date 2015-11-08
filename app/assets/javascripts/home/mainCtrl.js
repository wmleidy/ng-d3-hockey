angular.module('hockeyStats')
.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
	// syncs our local controller scope with the posts array from the 'posts' service
	$scope.posts = posts.posts;

	$scope.addPost = function(){
		if(!$scope.title || $scope.title === '') { return; }
		// routes to 'posts' service where data is passed to back end
		posts.create({
			title: $scope.title,
			link: $scope.link
		});
		$scope.title = '';
		$scope.link  = '';
	}

	$scope.incrementUpvotes = function(post) {
		posts.upvote(post);
	};
}])