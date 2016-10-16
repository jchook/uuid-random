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
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Use best RNG as possible
  function randomBytes(n) {
    if (crypto) {
      if ((typeof bytes === 'undefined') || ((bytesIdx + n) > bytesSize)) {
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
    var b = randomBytes(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return b;
  }

  // String UUIDv4 (Random)
  function uuid() {
    var b = uuidbin();
    return '' + 
      hexBytes[b[0]] + hexBytes[b[1]] +
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