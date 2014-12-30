PackageData = new ReactiveVar([]);
IsLoading = new ReactiveVar(false);

Template.searchResult.helpers({
  getPackages: function() {
    return PackageData.get();
  },

  isLoading: function() {
    return IsLoading.get();
  }
});

Template.searchResult.rendered = function() {
  getResults("");
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    getResults(text);
  }, 200)
});

function getResults(text) {
  IsLoading.set(true);
  Meteor.call('search-packages', text, function(err, results) {
    if(err) throw err;
    PackageData.set(results);
    IsLoading.set(false);
  });
}