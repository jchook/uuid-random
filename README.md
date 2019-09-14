# uuid-random

[![MIT Licence](https://img.shields.io/badge/License-MIT-informational)](https://opensource.org/licenses/mit-license.php)
[![Stable](https://img.shields.io/badge/Stable-1.3.0-brightgreen)](https://github.com/jchook/uuid-random/releases)

Generate RFC-4122 compliant [random UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29) (version 4) with better [statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion) than `Math.random()`.


## Install

```sh
npm i uuid-random
```


## Features

  * Tiny (0.3k minified + gzipped)
  * Uses [cryptographic randomness](http://caniuse.com/#feat=getrandomvalues) when possible
  * Works in browser or node with zero external dependencies
  * Very fast!


## Performance

Independent [benchmarks](https://github.com/aarondcohen/benchmark-guid) rank this library as the _fastest_ pure JS UUID v4 generator available with good PRNG— almost **5x faster** than the most popular library.

| npm package     | performance     |
|-----------------|-----------------|
| **uuid-random** <small>(this)</small> | **2.7M ops/sec**  |
| id128           | 2.1M ops/sec    |
| uuid            | 502k ops/sec    |
| portable-uuid   | 487k ops/sec    |


*Results above generated on a 4.20GHz Intel i7-7700K via [`benchmark.js`](benchmark.js) on Node 10.15.0*

## Why use UUID?

**U**niversally **U**nique **ID**entifiers transcend many constraints of traditional incremental integer IDs, especially in distributed systems. In UUID version 4, we essentially generate a random 128-bit value.

We do trade guaranteed uniqueness for __extremely__ probable uniqueness (you would need to do-loop `uuid()` at max speed for 73,067 years for a 50% chance of **one** collision). But for that slight cost, we may now generate valid, unique, persistent IDs on any node of a distributed system (e.g. intermittently offline or high-latency clients).

_Note, if you plan to use UUIDs for a new project, consider a more recent standard that addresses some of the shortcomings of UUID, such as [cuid](https://github.com/ericelliott/cuid) or [ulid](https://github.com/ulid/spec). Also see [`id128`](https://github.com/aarondcohen/benchmark-guid) for a solid JS implementation._


## Example Usage

### Babel

```javascript
import uuid from 'uuid-random';
uuid(); // 'f32dc9ae-7ca8-44ca-8f25-f258f7331c55'
```

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

### Validate a UUID v4 String

```javascript
uuid.test('0b99b82f-62cf-4275-88b3-de039020f14e'); // true
```

### Generate Binary UUIDs

```javascript
uuid.bin(); // <Buffer 41 db 10 54 b3 61 48 50 87 f1 2f 7b 08 a5 0f 06>
```


## Rationale

Random (v4) UUIDs probably have [fewer collisions](https://blogs.msdn.microsoft.com/oldnewthing/20160114-00/?p=92851) than
clock-based (v1), but `Math.random()` [sucks](https://medium.com/@betable/tifu-by-using-math-random-f1c308c4fd9d) [for](http://devoluk.com/google-chrome-math-random-issue.html) [uuid](http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript) [generation](https://bocoup.com/blog/random-numbers).

After digging through [npm](https://www.npmjs.com/search?q=fast+uuid)
I settled on using [uuid](https://www.npmjs.com/package/uuid) to take
advantage of better RNG when possible. I liked the lib, but seemed too large
and featured after using that neat [oneliner-ish solution](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523).
So, I combined ideas from the better implementations and
[researched](https://gist.github.com/jed/982883) a *much* faster, more focused
and compact uuid generator that used the best RNG available.

This library does one thing very well: generate UUID version 4.


## Contributing

Feel free to [open an issue](https://github.com/jchook/uuid-random/issues) or submit a [pull request](https://github.com/jchook/uuid-random/pulls).

## License

MIT.
