if(Meteor.isClient) {
    Meteor.startup(function () {
      Session.set('progressText', 'Calculating Recommendations');
    });
    Deps.autorun(function () {
      if(Meteor.user()){
      var info = Loads.findOne({username: Meteor.user().profile.login});
      Session.set('progressPercent', info.session_int);
      }
    });
  Meteor.methods({
    getLoad: function() {
    },
    //add starred repos to raccoon
    getStarredRepos: function() {
    },
    //get following 
    getFollowing: function() {
    },
    //get starred of each follower
    getStarredFollowing: function() {
    },
    //add starred repos to raccoon
    addToRaccoon: function() {
    },
    //get recoomendation for user
    getRecommendation: function() {
    }
  })
}
