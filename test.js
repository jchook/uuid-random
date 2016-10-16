var uuid = require('./index');
var i;
for (i = 0; i<1000000; i++) {
	if (!
	  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(uuid())
	) throw new Exception('Invalid UUID');
}
