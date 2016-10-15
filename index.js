(function(){

  var i;
  var bytes;
  var bytesIdx = 0;
  var bytesSize = 256;
  var hexBytes = [];

  // Cache toString(16)
  // This is massively impactful on performance
  for (i = 0; i < 256; i++) {
    hexBytes[i] = (i + 0x100).toString(16).substr(1);
  }

  // Node & Browser support
  if ((typeof module !== 'undefined') && (typeof require === 'function')) {
    crypto = require('crypto');
    module.exports = uuid;
  } else if (typeof window !== 'undefined') {
    window.uuid = uuid;
  }

  // From MDN docs
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Use best RNG as possible
  function randomBytes(n) {
    if (crypto) {
      if (!bytes || ((bytesIdx + n) >= bytesSize)) {
        bytesIdx = 0;
        if (crypto.getRandomValues) {
          bytes = new Uint8Array(bytesSize);
          crypto.getRandomValues(bytes);
        } else if (crypto.randomBytes) {
          bytes = crypto.randomBytes(bytesSize);
        } else {
          throw new Error('Non-standard crypto library');
        }
      }
      return bytes.slice(bytesIdx, bytesIdx += n);
    } else {
      r = [];
      for (i=0; i<n; i++) {
        r.push(getRandomInt(0, 16));
      }
      return r;
    }
  }

  // This should be exposed?
  function uuidbin() {
    var bytes = randomBytes(16);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    return bytes;
  }

  // String UUIDv4 (Random)
  function uuid() {
    var bytes = uuidbin();
    return
      hexBytes[bytes[0]] + hexBytes[bytes[1]] +
      hexBytes[bytes[2]] + hexBytes[bytes[3]] + '-' +
      hexBytes[bytes[4]] + hexBytes[bytes[5]] + '-' +
      hexBytes[bytes[6]] + hexBytes[bytes[7]] + '-' +
      hexBytes[bytes[8]] + hexBytes[bytes[9]] + '-' +
      hexBytes[bytes[10]] + hexBytes[bytes[11]] +
      hexBytes[bytes[12]] + hexBytes[bytes[13]] +
      hexBytes[bytes[14]] + hexBytes[bytes[15]]
    ;
  }

})();
