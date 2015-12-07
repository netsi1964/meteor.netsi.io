Template.telize.helpers({
  location: function() {
    return Session.get('location');
  },
  latLng: function() {
    var point = Session.get('location').split(",")
    return point[0]+","+point[1]
  }
});
Template.telize.events({
  'click button': function(evt, tpl) {
    var ip = tpl.find('input#ipv4').value;
    Meteor.call('geoJsonForIp', ip, function(err, res) {
      if (err) {
        Session.set('location', {
          error: res
        });
      } else {
        Session.set('location', res);
        return res;
      }
    });
  }
});
