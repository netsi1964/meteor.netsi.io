/*global Npm, Session, Mongo, Meteor, Template, $, jQuery, localStorage, window, angular, alert, document, console, confirm, require */
/*jshint unused:false */
/*jshint plusplus: false, devel: true, nomen: true, indent: 4, maxerr: 50 */

var Tasks = new Mongo.Collection("tasks");


var conn;
if (Meteor.isServer) {
  Meteor.onConnection(function(connection) {
    conn = connection;
  });

  var apiCall = function(apiUrl, callback) {
    // try…catch allows you to handle errors
    try {
      var errorCode, errorMessage, response = HTTP.get(apiUrl).data;
      // A successful API call returns no error
      // but the contents from the JSON response
      callback(null, response);
    } catch (error) {
      // If the API responded with an error message and a payload
      if (error.response) {
        errorCode = error.response.data.code;
        errorMessage = error.response.data.message;
        // Otherwise use a generic error message
      } else {
        errorCode = 500;
        errorMessage = 'Cannot access the API';
      }
      // Create an Error object and return it via callback
      var myError = new Meteor.Error(errorCode, errorMessage);
      callback(myError, null);
    }
  };



  Meteor.methods({
    'geoJsonForIp': function(ip) {
      // avoid blocking other method calls from the same client
      this.unblock();
      var apiUrl = 'http://www.telize.com/geoip/' + ip;
      // asynchronous call to the dedicated API calling function
      var response = Meteor.wrapAsync(apiCall)(apiUrl);
      return response;
    }
  });

}


if (Meteor.isClient) {
  Template.telize.helpers({
    location: function() {
      return Session.get('location');
    }
  });

  Template.telize.events({
    'click button': function(evt, tpl) {
      var ip = tpl.find('input#ipv4').value;
      Meteor.call('geoJsonForIp', ip, function(err, res) {
        // The method call sets the Session variable to the callback value
        if (err) {
          Session.set('location', {
            error: err
          });
        } else {
          Session.set('location', res);
          return res;
        }
      });
    }
  });

  // This code only runs on the client
  Template.body.helpers({
    tasks: function() {

      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({
          checked: {
            $ne: true
          }
        }, {
          sort: {
            createdAt: -1
          }
        });
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
    },
    hideCompleted: function() {
      return Session.get("hideCompleted");
    },
    info: function() {
      return conn.clientAddress;
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function(event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function() {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {
          checked: !this.checked
        }
      });
    },
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });
}
