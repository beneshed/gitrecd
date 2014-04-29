Router.configure({
layoutTemplate: 'contentLayout'
}); 
Router.map(function() {
  this.route('landing', {path: '/'});
  this.route('admin', {
        path: '/admin',
        template: 'adminusers',
        before: function() {
          if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
            this.redirect("/");
          }
        }
  });
  this.route('notFound', {
    path: '*'
    });
});
