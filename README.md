# uuid-random

Generate [random UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29)
with better [statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion)
than `Math.random()`.

    npm install uuid-random

## Features

  * 0.3k minified + gzipped
  * Uses best RNG available to minimize collisions
  * Works in browser or server-side

## Use it anywhere

### Node

```javascript
var uuid = require('uuid-random');
uuid(); // '0b99b82f-62cf-4275-88b3-de039020f14e'
```

### Browser

```html
<script src="uuid-random.min.js"></script>
<script>
  uuid(); // 'b96ab5e6-f1e8-4653-ab08-4dd82ea65778'
</script>
```

# License

MIT
