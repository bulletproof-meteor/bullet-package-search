Packages = new Mongo.Collection('packages');

if(Meteor.isServer) {
  var esUrl = process.env.ES_URL;
  if(!esUrl) {
    throw new Error("ES_URL is required!");
  }

  var elasticsearch = Meteor.npmRequire('elasticsearch');
  var client = new elasticsearch.Client({
    host: esUrl
  });
  EsClient = Async.wrap(client, ['index', 'search']);
}