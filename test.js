var assert = require('assert');
var uuid = require('./index');

// Check format
var i;
for (i = 0; i<10000; i++) {
	assert(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(uuid()));
}

// Check the test function on known-valid UUIDs
const healthyUuid = '920b70bf-168a-458d-81ac-50e488e5976f'
assert(uuid.test(healthyUuid) === true)
assert(uuid.test(healthyUuid.toUpperCase()) === true)

// Clear the buffer and change the randomBytes function to return 0s
uuid.clearBuffer();
uuid.randomBytes = function(length) {
	return (new Array(length)).fill(0, 0, length);
};
assert(uuid() === '00000000-0000-4000-8000-000000000000');

