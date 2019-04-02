"use strict";

(function(){

  var 
    buf,
    bufIdx = 0,
    hexBytes = [],
    i
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
  var _crypto;
  if(typeof crypto !== 'undefined') {
    _crypto = crypto;
  } else if( (typeof window !== 'undefined') && (typeof window.msCrypto !== 'undefined')) {
    // IE11
    _crypto = window.msCrypto;
  } 

  if ((typeof module !== 'undefined') && (typeof require === 'function')) {
    _crypto = _crypto || require('crypto');
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

  // Use best RNG as possible
  function randomBytes(n) {
    var r;
    if (typeof _crypto !== 'undefined') {
      if ((typeof buf === 'undefined') || ((bufIdx + n) > uuid.BUFFER_SIZE)) {
        bufIdx = 0;
        if (_crypto.getRandomValues) {
          buf = new Uint8Array(uuid.BUFFER_SIZE);
          _crypto.getRandomValues(buf);
        } else if (_crypto.randomBytes) {
          buf = _crypto.randomBytes(uuid.BUFFER_SIZE);
        } else {
          throw new Error('Non-standard crypto library');
        }
      }
      return buf.slice(bufIdx, bufIdx += n);
    } else {
      r = [];
      for (i = 0; i < n; i++) {
        r.push(getRandomInt(0, 255));
      }
      return r;
    }
  }

  // uuid.bin
  function uuidbin() {
    var b = randomBytes(16);
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