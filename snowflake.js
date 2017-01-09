// Pretty slow but it works
// 
// Could speed up 2.0x by using UInt8Array and "carryMasks"
// https://github.com/indutny/bn.js/blob/master/lib/bn.js#L1953

var EPOCH = 946684800000;
var MACHINE = 123413;
var MACHINE_MAX = 4194303;

var BIT_VAL = [ 
	1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 
	65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 
	33554432, 67108864, 134217728, 268435456, 536870912, 1073741824, 2147483648, 
	4294967296, 8589934592, 17179869184, 34359738368, 68719476736, 137438953472, 
	274877906944, 549755813888, 1099511627776, 2199023255552, 4398046511104,//42
	8796093022208, 17592186044416, 35184372088832, 70368744177664, 
	140737488355328, 281474976710656, 562949953421312, 1125899906842624, 
	2251799813685248, 4503599627370496, 9007199254740992, 18014398509481984, 
	36028797018963970, 72057594037927940, 144115188075855870, 288230376151711740, 
	576460752303423500, 1152921504606847000, 2305843009213694000, 
	4611686018427388000, 9223372036854776000
];

var MAX_BITS = 64;

function toInt(b) {
	var i, l, val = 0;
	for (i = b.length - 1; i >= 0; i--) {
		if (b[i]) {
			val += BIT_VAL[i];
		}
	}
	return val;
}

function toBits(val, bits) {
	bits = bits || MAX_BITS;
	b = new Array(bits);
	for (i = bits - 1; i >= 0; i--) {
		if (val >= BIT_VAL[i]) {
			b[i] = true;
			val -= BIT_VAL[i];
		}
	}
	return b;
}

function randomBits(n) {
	var val = rnd(0, BIT_VAL[n]);
	var b = new Array(n);
	for (i=0; i < n; i++) {
		if (val & BIT_VAL[i]) {
			b[i] = true;
		}
	}
	return b;
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function snowflake(env) {
	var id, seq;

  // Thank the overlords for ES6
  env || (env = {})

  // TODO: env.sequence
  env.epoch || (env.epoch = EPOCH);
  env.machine || (env.machine = MACHINE);
  env.timestamp || (env.timestamp = (new Date - env.epoch));

	// 512 bits = (42 timestamp, 10 machine, 12 sequence)
	return toInt([].concat(randomBits(12)).concat(toBits(env.machine, 10)).concat(toBits(env.timestamp, 42)));
}

module && (module.exports = snowflake);