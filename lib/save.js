SavePackage = function(name, data) {
  data = _.clone(data);
  delete data._id;
  Packages.update(name, {$set: data}, {upsert: true});
  EsClient.index({
    index: "meteor",
    type: "packages",
    id: name,
    body: data
  });
};