if (Meteor.isServer) {
    var raccoon = Meteor.require('raccoon');
    raccoon.config.nearestNeighbors = 3;  // number of neighbors you want to compare a user against
    raccoon.config.className = 'star';  // prefix for your items (used for redis)
    raccoon.config.numOfRecsStore = 30;  // number of recommendations to store per user
    raccoon.config.factorLeastSimilarLeastLiked = false;  // if you want to factor in items that
      // users least similar didn't like)
}
