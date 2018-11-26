"use strict";

(function(){

  var
    buf,
    bufIdx = 0,
    hexBytes = [],
    i,
    randomBytes
  ;

  // Improve memory performance by decreasing this number (>=16)
  // or improve speed by increasing this number (try 16384)
  uuid.BUFFER_SIZE = 512;

  // Binary uuids (even faster)
  uuid.bin = uuidbin;

  // Test for uuid
  uuid.test = isUUID;

  // Cache toString(16)
  // This is massively impactful on performance
  for (i = 0; i < 256; i++) {

    // This is a fast way to ensure a 2 char hex byte
    hexBytes[i] = (i + 0x100).toString(16).substr(1);
  }

  // Node & Browser support
  if ((typeof module !== 'undefined') && (typeof require === 'function')) {
    var crypto = require('crypto');
    module.exports = uuid;
  } else if (typeof window !== 'undefined') {
    window.uuid = uuid;
  }

  // Backup method
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // uuid.test
  function isUUID(uuid) {
    if (typeof uuid === 'string') {
      return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid);
    }
  }

  function randomBytesCryptoA(n) {
    return crypto.randomBytes(n);
  }

  function randomBytesCryptoB(n) {
    var bytes = new Uint8Array(n);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  function randomBytesMath(n) {
    var r = [];
    for (i = 0; i < n; i++) {
      r.push(getRandomInt(0, 255));
    }
    return r;
  }

  // Figure out which randomBytes function to use
  if (typeof crypto !== 'undefined') {
    if (crypto.randomBytes) {
      randomBytes = randomBytesCryptoA;
    } else if (crypto.getRandomValues) {
      randomBytes = randomBytesCryptoB;
    } else {
      randomBytes = randomBytesMath;
    }
  }

  // Use best RNG as possible
  function randomBytesBuffered(n) {
    if ((typeof buf === 'undefined') || ((bufIdx + n) > uuid.BUFFER_SIZE)) {
      bufIdx = 0;
      buf = randomBytes(uuid.BUFFER_SIZE);
    }
    return buf.slice(bufIdx, bufIdx += n);
  }

  // uuid.bin
  function uuidbin() {
    var b = randomBytesBuffered(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return b;
  }

  // String UUIDv4 (Random)
  function uuid() {
    var b = uuidbin();
    return hexBytes[b[0]] + hexBytes[b[1]] +
      hexBytes[b[2]] + hexBytes[b[3]] + '-' +
      hexBytes[b[4]] + hexBytes[b[5]] + '-' +
      hexBytes[b[6]] + hexBytes[b[7]] + '-' +
      hexBytes[b[8]] + hexBytes[b[9]] + '-' +
      hexBytes[b[10]] + hexBytes[b[11]] +
      hexBytes[b[12]] + hexBytes[b[13]] +
      hexBytes[b[14]] + hexBytes[b[15]]
    ;
  }

})();