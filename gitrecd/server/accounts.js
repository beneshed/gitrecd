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
    Loads.insert({username: user.user.ghname, session_int: 10});
    var raccoon = Meteor.require("raccoon");
    raccoon.connect(6379, '127.0.0.1');
    //feed user stars into raccoon

    var my_stars = Meteor.http.get("https://api.github.com/user/starred", {
    headers: {"User-Agent": "Meteor/1.0"},

    params: {
      access_token: user.user.services.github.accessToken
      }
    });
    for(z=0; z<my_stars.data.length; z++)
    {
      //console.log(user.user.ghname + " " + my_stars.data[z].name);
      raccoon.liked(user.user.ghname, my_stars.data[z].name, function() {
      });
    }
    var friends = Meteor.http.get("https://api.github.com/user/followers", {
    headers: {"User-Agent": "Meteor/1.0"},

    params: {
      access_token: user.user.services.github.accessToken
      }
    });
    Loads.update({username: user.user.ghname},{username: user.user.ghname, session_int: 25}); 
    for(i=0; i<friends.data.length;i++)
    {
      var friend = friends.data[i].login;
      var url = "https://api.github.com/users/" + friend + "/starred";
      var stars = Meteor.http.get(url, {
      headers: {"User-Agent": "Meteor/1.0"},

      params: {
        access_token: user.user.services.github.accessToken
        }
      }, function(error,result) {
      if(!error){
        for(j=0; j<result.data.length;j++)
        {
          if(typeof friend != 'undefined' && typeof result.data[j].name != 'undefined') {
            raccoon.liked(friend, result.data[j].name, function() {
            });
          }
        }
      } });
    }
    Loads.update({username: user.user.ghname}, {username: user.user.ghname, session_int: 75}); 
    //make reccomendation
    raccoon.recommendFor(user.user.ghname, 3, function(fuckThis){
      // results will be an array of x ranked recommendations for chris
      //   // in this case it would contain movie2
      //   });})
      raccoon.liked(user.user.ghname, 'test', function() {});
      for(end=0;end<fuckThis.length;end++)
      {
          Recs.insert({ username:user.user.ghname, rec:fuckThis[end] });
      }
    });
    
});
