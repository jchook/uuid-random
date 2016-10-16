# uuid-random

Generate [random UUIDv4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29)
with better [statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion)
than `Math.random()`.


## Install

    npm install uuid-random


## Performance

This is the fastest pure javascript UUIDv4 generator I have found, almost **5x 
faster** than comparable libraries.

| npm package     | performance        |
|-----------------|--------------------|
| uuid            | 370k ops/sec       |
| node-uuid       | 370k ops/sec       |
| **uuid-random** | **1.618M ops/sec** |


## Features

  * 0.3k minified + gzipped
  * Uses [better RNG](http://caniuse.com/#feat=getrandomvalues) when possible
  * Works in browser or node
  * Very fast!


## Example Usage

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

## Rationale

`Math.random()` sucks for uuid generation.

After digging through npm and
[stackoverflow](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523),
I settled on using [node-uuid](https://github.com/broofa/node-uuid) to take
advantage of better RNG when possible.

I wasn't happy with the solution so I combined code from the best libs and
[researched](https://gist.github.com/jed/982883) a *much* faster, more compact 
version that still used the best RNG available to the platform.

## License

MIT
