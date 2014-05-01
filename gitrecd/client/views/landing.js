Template.home.helpers({
  recs : function() { 
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
    return distinct;
    }
  }
});

