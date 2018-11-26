/*

	Benchmark public UUIDv4 libraries

	To run this benchmark, first install the following:

		npm install an-uiid node-uuid portable-uuid pure-uuid simply-uuid uuid uuid-v4


var uuids = {

	// Keeping up with competition
	'an-uuid': require('an-uuid'),

	// This is the "best" one
	'node-uuid': require('node-uuid'),

	// This doesn't even work?
	// 'performance-uuid': require('performance-uuid').uuid,

	// Slightly slower
	'portable-uuid': require('portable-uuid'),

	// Sooo slow, had to remove it..
	// There are a whole class of modules that use this method and are slow as...
	// 'simply-uuid': require('simply-uuid').generate,

	// Best npm package name
	'uuid': require('uuid'),

	// This lib (fastest)
	'uuid-random': require('./index')

};


var i, start, seconds, ops = 1000000;

for (lib in uuids) {
	start = + new Date;
	for (i = 0; i < ops; i++) uuids[lib]();
	seconds = ((+new Date) - start) / 1000;
	console.log(lib, (ops/seconds) + " ops/sec");
}
*/

// global
var i, start, seconds, ops = 10000000;

// Test ours here
var uuid_random = require('./index');
start = + new Date;
for (i = 0; i < ops; i++) uuid_random();
seconds = ((+new Date) - start) / 1000;
console.log('uuid-random', (ops/seconds) + " ops/sec");

start = + new Date;
for (i = 0; i < ops; i++) uuid_random.bin();
seconds = ((+new Date) - start) / 1000;
console.log('uuid-random-bin', (ops/seconds) + " ops/sec");

var snowflake = require('./snowflake');
start = + new Date;
for (i = 0; i < ops; i++) snowflake();
seconds = ((+new Date) - start) / 1000;
console.log('snowflake', (ops/seconds) + " ops/sec");

// simpleflakes
// var simpleflakes = require('simpleflakes');
// start = + new Date;
// for (i = 0; i < ops; i++) simpleflakes.simpleflake();
// seconds = ((+new Date) - start) / 1000;
// console.log('simpleflakes', (ops/seconds) + " ops/sec");

// simpleflake (slow as dick)
// var simpleflake = require('simpleflake');
// start = + new Date;
// for (i = 0; i < ops; i++) simpleflake();
// seconds = ((+new Date) - start) / 1000;
// console.log('simpleflake', (ops/seconds) + " ops/sec");

// node-uuid
// var node_uuid = require('node-uuid');
// start = + new Date;
// for (i = 0; i < ops; i++) node_uuid();
// seconds = ((+new Date) - start) / 1000;
// console.log('node-uuid', (ops/seconds) + " ops/sec");
