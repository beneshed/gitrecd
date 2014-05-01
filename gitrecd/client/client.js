if(Meteor.isClient) {
    Meteor.startup(function () {
      Hooks.init();
      Session.set('progressPercent', 10);
    });
    Deps.autorun(function () {
      if(Meteor.user()){
        var info = Loads.findOne({username: Meteor.user().profile.login});
        Session.set('gname', info);
        Session.set('progressPercent', info.session_int);
      }
    });
    Hooks.onLoggedOut = function(userId) {
      Session.set('progressPercent', 0);
      Session.keys = {};
    }
}
