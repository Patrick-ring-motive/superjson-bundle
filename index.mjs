
import superjson from 'superjson';

const instanceOf = (x, y) => {
  try {
    return x instanceof y;
  } catch {
    return false;
  }
};

const typeOf = x => {
  if (x === undefined) return 'undefined';
  if (x === null) return 'null';
  return String(x?.constructor?.name ?? x?.__proto__?.name ?? typeof x);
};
const constructOf = (x, y) => instanceOf(x, y) || (y?.name && typeOf(x) === String(y?.name));
const isString = x => constructOf(x, String) || typeof x === 'string';
const isHeaders = x => constructOf(x, Headers);
const isURLSearchParams = x => constructOf(x, URLSearchParams);
const isURL = x => constructOf(x, URL) || (isString(x) && /^https?\:\/\//i.test(x));
const isFunction = x => constructOf(x, Function);
const isFormData = x => constructOf(x, FormData);
const isArrayBuffer = x => constructOf(x, ArrayBuffer);

const jcopy = x => JSON.parse(JSON.stringify(x));


superjson.registerCustom({
  isApplicable: isHeaders,
  serialize: headers => [...headers.entries()],
  deserialize: headers => new Headers(headers)
}, 'Headers');

superjson.registerCustom({
  isApplicable: isURLSearchParams,
  serialize: params => [...params.entries()],
  deserialize: params => new URLSearchParams(params)
}, 'URLSearchParams');

superjson.registerCustom({
  isApplicable: isURL,
  serialize: url => {
    const obj = {};
    if (isString(url)) url = new URL(url);
    for (const x in url) {
      if (!isFunction(url[x])) {
        obj[x] = url[x];
      }
    }
    obj.searchParams = superjson.serialize(url.searchParams);
    return obj;
  },
  deserialize: obj => {
    const url = new URL(obj.href);
    try {
      url.searchParams = superjson.deserialize(obj.searchParams);
    } catch { }
    return url;
  }
}, 'URL');

superjson.registerCustom({
  isApplicable: isFormData,
  serialize: fd => [...fd.entries()],
  deserialize: obj => {
    const fd = new FormData();
    for (const [key, value] of obj) {
      fd.append(key, value);
    }
    return fd;
  }
}, 'FormData');

superjson.registerCustom({
  isApplicable: isArrayBuffer,
  serialize: ab => JSON.stringify([...new Uint8Array(ab)]),
  deserialize: ab => new Uint8Array(JSON.parse(ab)).buffer
}, 'ArrayBuffer');

superjson.registerCustom({
  isApplicable: x => constructOf(x,DataView),
  serialize: dv =>({
    buffer:[...new Uint8Array(dv.buffer)],
    offset:dv.byteOffset,
    length:dv.byteLength
  }),
  deserialize: dv => new DataView(
    new Uint8Array(dv.buffer).buffer,
    dv.offset, 
    dv.length
  )
}, 'DataView');

superjson.registerCustom({
  isApplicable: x => String(x)==='[object Arguments]',
  serialize: args => [...args],
  deserialize: args => (function (){return arguments;})(...args),
}, 'Arguments');

