(function(){

  // Node & Browser support
  if ((typeof module !== 'undefined') && (typeof require === 'function')) {
    crypto = require('crypto');
    module.exports = uuid;
  } else if (typeof window !== 'undefined') {
    window.uuid = uuid;
  }

  function uuid(a){
  	return a
  		? (a^rng(16)>>a/4).toString(16)
  		: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)
  	;
  }

  function rng(n) {
  	if (crypto) {
  		if (crypto.getRandomValues) {
  			return crypto.getRandomValues(new Uint8Array(1))[0] % n;
  		} else if (crypto.randomBytes) {
  			return crypto.randomBytes(1)[0] % n;
  		}
  	}
  	return Math.random() * n;
  }

})();
