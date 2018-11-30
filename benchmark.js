/*

	Benchmark public UUIDv4 libraries

	To run this benchmark, first install the following:

		npm install portable-uuid pure-uuid simply-uuid uuid uuid-v4 fast-uuid

*/
var uuids = {

	// No longer exists?
	// 'an-uuid': require('an-uuid'),

	// Deprecated.
	// 'node-uuid': require('node-uuid'),

	// Doesn't even work anymore?
	// 'performance-uuid': require('performance-uuid').uuid,

	// Slightly slower.
	'portable-uuid': require('portable-uuid'),

	// Sooo slow, had to remove it..
	// There are a whole class of modules that use this method and are slow as...
	// 'simply-uuid': require('simply-uuid').generate,

	// Best npm package name
	'uuid': require('uuid'),

	// 2nd best npm package name
	'fast-uuid': require('fast-uuid').uuid4,

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
