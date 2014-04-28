Router.configure({
layoutTemplate: 'contentLayout'
}); 
Router.map(function() {
  this.route('landing', {path: '/'});
  this.route('notFound', {
    path: '*'
    });
});

