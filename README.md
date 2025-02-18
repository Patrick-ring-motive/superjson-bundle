# superjson-bundle 🐢

A bundled version of superjson with additional serialization support for Web APIs and binary data types.

## Features

- Built-in support for Web API types:
  - Headers
  - URLSearchParams
  - URL
  - FormData
  - ArrayBuffer
  - DataView
  - Arguments object


// Example with Headers
const headers = new Headers({ 'Content-Type': 'application/json' });
const serialized = superjson.serialize(headers);
const deserialized = superjson.deserialize(serialized);

// Example with URL
const url = new URL('https://example.com?foo=bar');
const serializedUrl = superjson.serialize(url);
const deserializedUrl = superjson.deserialize(serializedUrl);
```

## Supported Types

- All types supported by [superjson](https://github.com/blitz-js/superjson)
- Web API types
- Binary data types

## License

ISC

## Author

Patrick Ring <patrick.ring.motive@gmail.com>
