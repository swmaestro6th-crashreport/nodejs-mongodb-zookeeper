var sys = require('sys')
var exec = require('child_process').exec;
var zookeeper = require('node-zookeeper-client');
var util = require('./utils');

var root_shard_path = "/shard1";
var replSet = "replSet2";

function exists(client) {
	client.exists(
		root_shard_path,
		function (event) {
			console.log('Got event: %s.', event);
		},
		function (error, stat) {
			if (error) console.log('Failed to check existence of node: %s due to: %s.', path, error);	
		  if (stat) util.replication(client, root_shard_path, replSet);
    }
	);
}


exports.start = function () {

	var client = zookeeper.createClient('localhost:2181');

	client.once('connected', function () {
		exists(client);
	});

	client.connect();

	function puts(error, stdout, stderr) {sys.puts(stdout)}
	exec("sudo mongod --replSet Mongo_study --port 30000 --dbpath /data/db/secondary1", function (err, stdout, stderr) {
    sys.puts(stdout);
  });
}
