Accounts.onCreateUser(function (options, user) {
  var accessToken = user.services.github.accessToken,
      result,
      profile;

  result = Meteor.http.get("https://api.github.com/user", {
    headers: {"User-Agent": "Meteor/1.0"},

    params: {
      access_token: accessToken
    }
  });
  stars = Meteor.http.get("https://api.github.com/user/starred?per_page=300", {
    headers: {"User-Agent": "Meteor/1.0"},
    
    params: {
      access_token: accessToken
      }
  });

  follow = Meteor.http.get("https://api.github.com/user/following", {
    headers: {"User-Agent": "Meteor/1.0"},
    
    params: {
      access_token: accessToken
      }
  });

  if (result.error)
    throw result.error;

  profile = _.pick(result.data,
    "name",  
    "login",
    "avatar_url",
    "url",
    "company",
    "blog",
    "location",
    "email",
    "bio",
    "html_url");

  user.profile = result.data;
  user.stars = stars;
  user.follow = follow;
  user.ghname = profile.login;
  return user;
});
Accounts.onLogin(function(user) {
    var raccoon = Meteor.require("raccoon");
    raccoon.connect(6379, '127.0.0.1');
    //var popos = Meteor.users.findOne({services.github.id.username : ""});
});
