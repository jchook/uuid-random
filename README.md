# uuid-random

Generate RFC-4122 compliant
[random UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29)
with better
[statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion)
than `Math.random()`.


## Install

    npm install uuid-random


## Features

  * 0.3k minified + gzipped
  * Uses [better RNG](http://caniuse.com/#feat=getrandomvalues) when possible
  * Works in browser or node with zero external dependencies
  * Very fast!


## Performance

This is the fastest pure javascript UUID v4 generator I have found,
over **5x faster** than comparable libraries. After inspecting and/or testing every JS UUID package I could find (there are a ton), these were the fastest:

| npm package     | performance     |
|-----------------|-----------------|
| node-uuid       | 370k ops/sec    |
| portable-uuid   | 260k ops/sec    |
| uuid            | 370k ops/sec    |
| **uuid-random** | **2M ops/sec**  |


## What is UUID v4?

**U**niversally **U**nique **ID**entifiers transcend many constraints of
traditional incremental integer IDs, especially in distributed systems. With
version 4, we (essentially) generate a random 128-bit value.

We do sacrifice guaranteed uniqueness for __extremely__ probable uniqueness (you
would need to do-loop `uuid()` at max speed for 73,067 years for a 50% chance of
**one** collision). But for that slight cost, we may now generate valid, unique,
persistent IDs on any node of a distributed system (e.g. intermittently offline
or high-latency clients).


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

### Is UUID?

```javascript
uuid.test('0b99b82f-62cf-4275-88b3-de039020f14e'); // true
```

## Rationale

Random (v4) UUIDs are often
[better](https://blogs.msdn.microsoft.com/oldnewthing/20160114-00/?p=92851) than
clock-based (v1), but `Math.random()`
[sucks](https://medium.com/@betable/tifu-by-using-math-random-f1c308c4fd9d)
[for](http://devoluk.com/google-chrome-math-random-issue.html)
[uuid generation](http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript).

After digging through [npm](https://www.npmjs.com/search?q=uuid)
I settled on using [node-uuid](https://github.com/broofa/node-uuid) to take
advantage of better RNG when possible. It's a great lib, but seemed too large
and featured after using that neat [oneliner-ish solution](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523).
So, I combined ideas from the better implementations and
[researched](https://gist.github.com/jed/982883) a *much* faster, more focused
and compact uuid generator that used the best RNG available.

This library does one thing very well: generate UUID version 4.


## License

MIT
