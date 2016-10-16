(function(){

  var i;
  var buf;
  var bufIdx = 0;
  var hexBytes = [];

  // Improve memory performance by decreasing this number (>=16)
  // or improve speed by increasing this number (try 16384)
  uuid.BUFFER_SIZE = 512;

  // Binary uuids (even faster)
  uuid.uuidbin = uuidbin;

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
      if ((typeof buf === 'undefined') || ((bufIdx + n) > uuid.BUFFER_SIZE)) {
        bufIdx = 0;
        if (crypto.getRandomValues) {
          buf = new Uint8Array(uuid.BUFFER_SIZE);
          crypto.getRandomValues(bytes);
        } else if (crypto.randomBytes) {
          buf = crypto.randomBytes(uuid.BUFFER_SIZE);
        } else {
          throw new Error('Non-standard crypto library');
        }
      }
      return buf.slice(bufIdx, bufIdx += n);
    } else {
      r = [];
      for (i=0; i<n; i++) {
        r.push(getRandomInt(0, 16));
      }
      return r;
    }
  }
  
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