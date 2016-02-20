# uuid-v4

Generate [UUIDv4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29)
(random universally unique ID) with better [statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion)
than `Math.random()`.

    npm install uuid-v4

## Features

  * 0.2k minified + gzipped
  * Uses best native RNG available in node or browser to minimize collisions

## Use it anywhere

### Node

    var uuid = require('uuid-v4');
    uuid(); // '0b99b82f-62cf-4275-88b3-de039020f14e'

### Babel

    import uuid from 'uuid-v4';
    uuid();

### Browser

    <script src="uuid-v4.min.js">
    <script>
      uuid(); // 'b96ab5e6-f1e8-4653-ab08-4dd82ea65778'
    </script>
