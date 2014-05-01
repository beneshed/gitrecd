if (Meteor.isClient) {
  Meteor.startup(function () {
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var raccoon = Meteor.require('raccoon');
    raccoon.connect(6379, '127.0.0.1');
  });
}
