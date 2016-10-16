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
over **5x faster** than comparable libraries.

| npm package     | performance     |
|-----------------|-----------------|
| node-uuid       | 370k ops/sec    |
| portable-uuid   | 260k ops/sec    |
| uuid            | 370k ops/sec    |
| **uuid-random** | **2M ops/sec**  |


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


### Is UUID?

```javascript
uuid.test(uuid()); // true
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
