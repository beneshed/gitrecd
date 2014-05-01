Template.home.helpers({
  recs : function() { 
    Session.set("progressPercent", 100);
    var distinct = [];
    if(Meteor.user()){
      var arr = Recs.find({ username: Session.get("gname").username }).fetch();
    for(i = 0; i < arr.length; i++)
    {
      var contains = false;
      if(distinct.length < 1)
      {
        distinct.push(arr[0]);
      }
      else
      {
        for(j = 0; j < distinct.length; j++)
        {
          if(distinct[j].rec == arr[i].rec){
              contains = true;
              break;
          }
        }
        if(!contains){
            distinct.push(arr[i]);
        }
      }
    }
    $("svg-progress-container").hide();
    return distinct;
    }
  }
});

