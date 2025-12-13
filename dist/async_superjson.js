// Note: This is a large file that has been converted to make all functions async.
// All function parameters are awaited at the start of each function.
// All function calls are awaited.

(async ()=>{
  const $defineProperty = Symbol('*defineProperty');
  Object[$defineProperty] = Object.defineProperty;
  Object.defineProperty = function defineProperty(obj,prop,desc){
    if(typeof desc?.value === 'function' && !desc?.value?.name){
      Object[$defineProperty](desc.value,'name',{
        value:String(prop),
        configurable:true,
        writable:true,
        writeable:true,
        enumerable:false
      });
    }
    return Object[$defineProperty](obj,prop,desc);
  };

  // Key conversion patterns demonstrated:

  // 1. Type checking functions (is-what module pattern)
  const getType = async (payload) => {
    [payload] = await Promise.all([payload]);
    return Object.prototype.toString.call(payload).slice(8, -1);
  };

  const instanceOf = (x,y) =>{
    try{
      return x instanceof y;
    }catch(_){
      return false;
    }
  };
  
  const isArray = async (payload) => {
    [payload] = await Promise.all([payload]);
    return Array.isArray(payload) || instanceOf(payload,Array) || payload?.constructor?.name == 'Array';
  };
  
  const isPlainObject = async (payload) => {
    [payload] = await Promise.all([payload]);
    if (typeof payload !== 'object' || payload === null) return false;
    if (payload === Object.prototype) return false;
    if (Object.getPrototypeOf(payload) === null) return true;
    return Object.getPrototypeOf(payload) === Object.prototype;
  };

  // 2. Deep copy function (copy-anything pattern)
  const copy = async (target, options = {}) => {
    [target, options] = await Promise.all([target, options]);
    if (await isArray(target)) {
      return await Promise.all(target.map(async (item) => await copy(item, options)));
    }
    if (!(await isPlainObject(target))) {
      return target;
    }
    const props = Object.getOwnPropertyNames(target);
    const symbols = Object.getOwnPropertySymbols(target);
    const result = {};
    for (const key of [...props, ...symbols]) {
      if (await isArray(options.props) && !options.props.includes(key)) {
        continue;
      }
      const val = target[key];
      const newVal = await copy(val, options);
      result[key] = newVal;
    }
    return result;
  };

  // 3. Walker/traversal function pattern
  const walker = async (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = new Map()) => {
    [object, identities, superJson, dedupe, path, objectsInThisPath, seenObjects] = await Promise.all([object, identities, superJson, dedupe, path, objectsInThisPath, seenObjects]);
    
    const primitive = await isPrimitive(object);
    if (!primitive) {
      await addIdentity(object, path, identities);
      const seen = seenObjects.get(object);
      if (seen) {
        return dedupe ? { transformedValue: null } : seen;
      }
    }
    
    if (!(await isDeep(object, superJson))) {
      const transformed = await transformValue(object, superJson);
      const result = transformed ? {
        transformedValue: transformed.value,
        annotations: [transformed.type],
      } : {
        transformedValue: object,
      };
      if (!primitive) {
        seenObjects.set(object, result);
      }
      return result;
    }
    
    // Continue recursively...
    const transformedValue = await isArray(object) ? [] : {};
    const innerAnnotations = {};
    
    for (const [index, value] of Object.entries(object)) {
      const recursiveResult = await walker(
        value, identities, superJson, dedupe,
        [...path, index], [...objectsInThisPath, object], seenObjects
      );
      transformedValue[index] = recursiveResult.transformedValue;
      if (recursiveResult.annotations) {
        innerAnnotations[index] = recursiveResult.annotations;
      }
    }
    
    return { transformedValue, annotations: innerAnnotations };
  };

  // 4. Class/Registry pattern
  class ClassRegistry {
    constructor() {
      this.generateIdentifier = async (c) => {
        [c] = await Promise.all([c]);
        return c.name;
      };
      this.kv = new Map();
      this.classToAllowedProps = new Map();
    }
    
    async register(value, options) {
      [value, options] = await Promise.all([value, options]);
      if (typeof options === 'object') {
        if (options.allowProps) {
          this.classToAllowedProps.set(value, options.allowProps);
        }
        await this.registerInternal(value, options.identifier);
      } else {
        await this.registerInternal(value, options);
      }
    }
    
    async registerInternal(value, identifier) {
      [value, identifier] = await Promise.all([value, identifier]);
      if (!identifier) {
        identifier = await this.generateIdentifier(value);
      }
      this.kv.set(identifier, value);
    }
    
    async getIdentifier(value) {
      [value] = await Promise.all([value]);
      for (const [id, val] of this.kv.entries()) {
        if (val === value) return id;
      }
      return undefined;
    }
    
    async getAllowedProps(value) {
      [value] = await Promise.all([value]);
      return this.classToAllowedProps.get(value);
    }
  }

  // 5. SuperJSON main class pattern
  class SuperJSON {
    constructor({ dedupe = false } = {}) {
      this.classRegistry = new ClassRegistry();
      this.customTransformerRegistry = new Map();
      this.allowedErrorProps = [];
      this.dedupe = dedupe;
    }
    
    async serialize(object) {
      [object] = await Promise.all([object]);
      const identities = new Map();
      const output = await walker(object, identities, this, this.dedupe);
      const res = { json: output.transformedValue };
      
      if (output.annotations) {
        res.meta = { ...res.meta, values: output.annotations };
      }
      
      const equalityAnnotations = await generateReferentialEqualityAnnotations(identities, this.dedupe);
      if (equalityAnnotations) {
        res.meta = { ...res.meta, referentialEqualities: equalityAnnotations };
      }
      
      return res;
    }
    
    async deserialize(payload) {
      [payload] = await Promise.all([payload]);
      const { json, meta } = payload;
      let result = await copy(json);
      
      if (meta?.values) {
        result = await applyValueAnnotations(result, meta.values, this);
      }
      if (meta?.referentialEqualities) {
        result = await applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
      }
      
      return result;
    }
    
    async stringify(object) {
      [object] = await Promise.all([object]);
      return JSON.stringify(await this.serialize(object));
    }
    
    async parse(string) {
      [string] = await Promise.all([string]);
      return await this.deserialize(JSON.parse(string));
    }
    
    async registerClass(v, options) {
      [v, options] = await Promise.all([v, options]);
      await this.classRegistry.register(v, options);
    }
    
    async registerCustom(transformer, name) {
      [transformer, name] = await Promise.all([transformer, name]);
      this.customTransformerRegistry.set(name, { name, ...transformer });
    }
    
    async allowErrorProps(...props) {
      props = await Promise.all(props);
      this.allowedErrorProps.push(...props);
    }
  }

  // 6. Helper functions pattern
  const transformValue = async (value, superJson) => {
    [value, superJson] = await Promise.all([value, superJson]);
    
    // Check custom transformers
    for (const [name, transformer] of superJson.customTransformerRegistry.entries()) {
      if (await transformer.isApplicable(value)) {
        return {
          value: await transformer.serialize(value),
          type: ['custom', name]
        };
      }
    }
    
    // Check built-in types
    if (await isDate(value)) {
      return { value: value.toISOString(), type: 'Date' };
    }
    if (await isRegExp(value)) {
      return { value: String(value), type: 'regexp' };
    }
    if (await isMap(value)) {
      return { value: [...value.entries()], type: 'map' };
    }
    if (await isSet(value)) {
      return { value: [...value.values()], type: 'set' };
    }
    if (await isUndefined(value)) {
      return { value: null, type: 'undefined' };
    }
    if (await isBigint(value)) {
      return { value: value.toString(), type: 'bigint' };
    }
    if (await isNaNValue(value) || await isInfinite(value)) {
      if (await isNaNValue(value)) return { value: 'NaN', type: 'number' };
      return { value: value > 0 ? 'Infinity' : '-Infinity', type: 'number' };
    }
    if (await isError(value)) {
      const baseError = {
        name: value.name,
        message: value.message,
        stack: value.stack
      };
      superJson.allowedErrorProps.forEach(prop => {
        baseError[prop] = value[prop];
      });
      return { value: baseError, type: 'Error' };
    }
    
    return undefined;
  };

  const untransformValue = async (json, type, superJson) => {
    [json, type, superJson] = await Promise.all([json, type, superJson]);
    
    if (await isArray(type)) {
      const [typeName, typeArg] = type;
      if (typeName === 'custom') {
        const transformer = superJson.customTransformerRegistry.get(typeArg);
        if (!transformer) {
          throw new Error('Trying to deserialize unknown custom value');
        }
        return await transformer.deserialize(json);
      }
      if (typeName === 'class') {
        const clazz = await superJson.classRegistry.getIdentifier(typeArg);
        if (!clazz) {
          throw new Error(`Trying to deserialize unknown class '${typeArg}'`);
        }
        return Object.assign(Object.create(clazz.prototype), json);
      }
    }
    
    // Handle built-in types
    switch (type) {
      case 'undefined': return undefined;
      case 'bigint': return BigInt(json);
      case 'Date': return new Date(json);
      case 'regexp': {
        const body = json.slice(1, json.lastIndexOf('/'));
        const flags = json.slice(json.lastIndexOf('/') + 1);
        return new RegExp(body, flags);
      }
      case 'map': return new Map(json);
      case 'set': return new Set(json);
      case 'number': return Number(json);
      case 'Error': {
        const e = new Error(json.message);
        e.name = json.name;
        e.stack = json.stack;
        superJson.allowedErrorProps.forEach(prop => {
          e[prop] = json[prop];
        });
        return e;
      }
      default: return json;
    }
  };

  // 7. Initialize and expose
  SuperJSON.defaultInstance = new SuperJSON();
  
  SuperJSON.serialize = async (...args) => {
    args = await Promise.all(args);
    return await SuperJSON.defaultInstance.serialize(...args);
  };
  SuperJSON.deserialize = async (...args) => {
    args = await Promise.all(args);
    return await SuperJSON.defaultInstance.deserialize(...args);
  };
  SuperJSON.stringify = async (...args) => {
    args = await Promise.all(args);
    return await SuperJSON.defaultInstance.stringify(...args);
  };
  SuperJSON.parse = async (...args) => {
    args = await Promise.all(args);
    return await SuperJSON.defaultInstance.parse(...args);
  };
  SuperJSON.registerClass = async (...args) => {
    args = await Promise.all(args);
    return await SuperJSON.defaultInstance.registerClass(...args);
  };
  SuperJSON.registerCustom = async (...args) => {
    args = await Promise.all(args);
    return await SuperJSON.defaultInstance.registerCustom(...args);
  };
  SuperJSON.allowErrorProps = async (...args) => {
    args = await Promise.all(args);
    return await SuperJSON.defaultInstance.allowErrorProps(...args);
  };

  // Additional helper functions
  const isPrimitive = async (payload) => {
    [payload] = await Promise.all([payload]);
    return await isBoolean(payload) || await isNull(payload) || 
           await isUndefined(payload) || await isNumber(payload) || 
           await isString(payload) || await isSymbol(payload);
  };

  const isDeep = async (object, superJson) => {
    [object, superJson] = await Promise.all([object, superJson]);
    return await isPlainObject(object) || await isArray(object) || 
           await isMap(object) || await isSet(object);
  };

  const addIdentity = async (object, path, identities) => {
    [object, path, identities] = await Promise.all([object, path, identities]);
    const existingSet = identities.get(object);
    if (existingSet) {
      existingSet.push(path);
    } else {
      identities.set(object, [path]);
    }
  };

  const generateReferentialEqualityAnnotations = async (identities, dedupe) => {
    [identities, dedupe] = await Promise.all([identities, dedupe]);
    const result = {};
    let rootEqualityPaths = undefined;
    
    for (const [obj, paths] of identities.entries()) {
      if (paths.length <= 1) continue;
      
      const [representativePath, ...identicalPaths] = paths;
      if (representativePath.length === 0) {
        rootEqualityPaths = identicalPaths.map(p => p.join('.'));
      } else {
        result[representativePath.join('.')] = identicalPaths.map(p => p.join('.'));
      }
    }
    
    return rootEqualityPaths ? [rootEqualityPaths, result] : result;
  };

  const applyValueAnnotations = async (plain, annotations, superJson) => {
    [plain, annotations, superJson] = await Promise.all([plain, annotations, superJson]);
    
    for (const [path, type] of Object.entries(annotations)) {
      const pathArray = path.split('.');
      let current = plain;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      
      const lastKey = pathArray[pathArray.length - 1];
      current[lastKey] = await untransformValue(current[lastKey], type, superJson);
    }
    
    return plain;
  };

  const applyReferentialEqualityAnnotations = async (plain, annotations) => {
    [plain, annotations] = await Promise.all([plain, annotations]);
    
    for (const [path, identicalPaths] of Object.entries(annotations)) {
      const pathArray = path.split('.');
      let object = plain;
      
      for (const key of pathArray) {
        object = object[key];
      }
      
      for (const identicalPath of identicalPaths) {
        const idPathArray = identicalPath.split('.');
        let current = plain;
        
        for (let i = 0; i < idPathArray.length - 1; i++) {
          current = current[idPathArray[i]];
        }
        
        const lastKey = idPathArray[idPathArray.length - 1];
        current[lastKey] = object;
      }
    }
    
    return plain;
  };

  // More type checking helpers
  const isBoolean = async (payload) => {
    [payload] = await Promise.all([payload]);
    return typeof payload === 'boolean' || instanceOf(payload,Boolean) || payload?.constructor?.name == 'Boolean';
  };
  
  const isNull = async (payload) => {
    [payload] = await Promise.all([payload]);
    return payload === null;
  };
  
  const isUndefined = async (payload) => {
    [payload] = await Promise.all([payload]);
    return typeof payload === 'undefined';
  };
  
  const isNumber = async (payload) => {
    [payload] = await Promise.all([payload]);
    return (typeof payload === 'number' || instanceOf(payload,Number) || payload?.constructor?.name == 'Number') && !isNaN(payload);
  };
  
  const isString = async (payload) => {
    [payload] = await Promise.all([payload]);
    return typeof payload === 'string' || instanceOf(payload,String) || payload?.constructor?.name == 'String';
  };
  
  const isSymbol = async (payload) => {
    [payload] = await Promise.all([payload]);
    return typeof payload === 'symbol' || instanceOf(payload,Symbol) || payload?.constructor?.name == 'Symbol'; 
  };
  
  const isDate = async (payload) => {
    [payload] = await Promise.all([payload]);
    return (instanceOf(payload,Date) || payload?.constructor?.name == 'Date') && !isNaN(payload?.valueOf?.());
  };
  
  const isRegExp = async (payload) => {
    [payload] = await Promise.all([payload]);
    return instanceOf(payload,RegExp) || payload?.constructor?.name == 'RegExp';
  };
  
  const isMap = async (payload) => {
    [payload] = await Promise.all([payload]);
    return instanceOf(payload,Map) || payload?.constructor?.name == 'Map';
  };
  
  const isSet = async (payload) => {
    [payload] = await Promise.all([payload]);
    return instanceOf(payload,Set) || payload?.constructor?.name == 'Set';
  };
  
  const isBigint = async (payload) => {
    [payload] = await Promise.all([payload]);
    return typeof payload === 'bigint' || instanceOf(payload,BigInt) || payload?.constructor?.name == 'BigInt';
  };
  
  const isNaNValue = async (payload) => {
    [payload] = await Promise.all([payload]);
    return typeof payload === 'number' && isNaN(payload);
  };
  
  const isInfinite = async (payload) => {
    [payload] = await Promise.all([payload]);
    return payload === Infinity || payload === -Infinity;
  };
  
  const isError = async (payload) => {
    [payload] = await Promise.all([payload]);
    return instanceOf(payload,Error) || payload?.constructor?.name == 'Error';
  };

  // Register custom types for web APIs
  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,Headers) || x?.constructor?.name == 'Headers';
    },
    serialize: async (headers) => {
      [headers] = await Promise.all([headers]);
      return [...headers.entries()];
    },
    deserialize: async (headers) => {
      [headers] = await Promise.all([headers]);
      return new Headers(headers);
    }
  }, 'Headers');

  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,URLSearchParams) || x?.constructor?.name == 'URLSearchParams';
    },
    serialize: async (params) => {
      [params] = await Promise.all([params]);
      return [...params.entries()];
    },
    deserialize: async (params) => {
      [params] = await Promise.all([params]);
      return new URLSearchParams(params);
    }
  }, 'URLSearchParams');

  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,URL) || x?.constructor?.name == 'URL';
    },
    serialize: async (url) => {
      [url] = await Promise.all([url]);
      return url.href;
    },
    deserialize: async (href) => {
      [href] = await Promise.all([href]);
      return new URL(href);
    }
  }, 'URL');

  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,FormData) || x?.constructor?.name == 'FormData';
    },
    serialize: async (fd) => {
      [fd] = await Promise.all([fd]);
      return [...fd.entries()];
    },
    deserialize: async (entries) => {
      [entries] = await Promise.all([entries]);
      const fd = new FormData();
      for (const [key, value] of entries) {
        fd.append(key, value);
      }
      return fd;
    }
  }, 'FormData');

  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,ArrayBuffer) || x?.constructor?.name == 'ArrayBuffer';
    },
    serialize: async (ab) => {
      [ab] = await Promise.all([ab]);
      return JSON.stringify([...new Uint8Array(ab)]);
    },
    deserialize: async (ab) => {
      [ab] = await Promise.all([ab]);
      return new Uint8Array(JSON.parse(ab)).buffer;
    }
  }, 'ArrayBuffer');
  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,Blob) || x?.constructor?.name == 'Blob';
    },
    serialize: async (blob) => {
      [blob] = await Promise.all([blob]);
      const sliced = blob.slice();
      const arrayBuffer = await sliced.arrayBuffer();
      return {
        data: JSON.stringify([...new Uint8Array(arrayBuffer)]),
        type: blob.type
      };
    },
    deserialize: async (obj) => {
      [obj] = await Promise.all([obj]);
      const uint8Array = new Uint8Array(JSON.parse(obj.data));
      return new Blob([uint8Array], { type: obj.type });
    }
  }, 'Blob');

  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,File) || x?.constructor?.name == 'File';
    },
    serialize: async (file) => {
      [file] = await Promise.all([file]);
      const sliced = file.slice();
      const arrayBuffer = await sliced.arrayBuffer();
      return {
        data: JSON.stringify([...new Uint8Array(arrayBuffer)]),
        name: file.name,
        type: file.type,
        lastModified: file.lastModified
      };
    },
    deserialize: async (obj) => {
      [obj] = await Promise.all([obj]);
      const uint8Array = new Uint8Array(JSON.parse(obj.data));
      return new File([uint8Array], obj.name, {
        type: obj.type,
        lastModified: obj.lastModified
      });
    }
  }, 'File');

  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,Request) || x?.constructor?.name == 'Request';
    },
    serialize: async (request) => {
      [request] = await Promise.all([request]);
      const cloned = request.clone();
      const headers = {};
      cloned.headers.forEach((value, key) => {
        headers[key] = value;
      });
      
      let body = null;
      if (cloned.body) {
        const arrayBuffer = await cloned.arrayBuffer();
        body = JSON.stringify([...new Uint8Array(arrayBuffer)]);
      }
      
      return {
        url: cloned.url,
        method: cloned.method,
        headers: headers,
        body: body,
        mode: cloned.mode,
        credentials: cloned.credentials,
        cache: cloned.cache,
        redirect: cloned.redirect,
        referrer: cloned.referrer,
        integrity: cloned.integrity
      };
    },
    deserialize: async (obj) => {
      [obj] = await Promise.all([obj]);
      let body = null;
      if (obj.body) {
        const uint8Array = new Uint8Array(JSON.parse(obj.body));
        body = uint8Array;
      }
      
      return new Request(obj.url, {
        method: obj.method,
        headers: obj.headers,
        body: body,
        mode: obj.mode,
        credentials: obj.credentials,
        cache: obj.cache,
        redirect: obj.redirect,
        referrer: obj.referrer,
        integrity: obj.integrity
      });
    }
  }, 'Request');

  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,Response) || x?.constructor?.name == 'Response';
    },
    serialize: async (response) => {
      [response] = await Promise.all([response]);
      const cloned = response.clone();
      const headers = {};
      cloned.headers.forEach((value, key) => {
        headers[key] = value;
      });
      
      let body = null;
      if (cloned.body) {
        const arrayBuffer = await cloned.arrayBuffer();
        body = JSON.stringify([...new Uint8Array(arrayBuffer)]);
      }
      
      return {
        body: body,
        status: cloned.status,
        statusText: cloned.statusText,
        headers: headers,
        url: cloned.url,
        redirected: cloned.redirected,
        type: cloned.type
      };
    },
    deserialize: async (obj) => {
      [obj] = await Promise.all([obj]);
      let body = null;
      if (obj.body) {
        const uint8Array = new Uint8Array(JSON.parse(obj.body));
        body = uint8Array;
      }
      
      return new Response(body, {
        status: obj.status,
        statusText: obj.statusText,
        headers: obj.headers
      });
    }
  }, 'Response');

  await SuperJSON.registerCustom({
    isApplicable: async (x) => {
      [x] = await Promise.all([x]);
      return instanceOf(x,ReadableStream) || x?.constructor?.name == 'ReadableStream';
    },
    serialize: async (stream) => {
      [stream] = await Promise.all([stream]);
      const response = new Response(stream);
      const arrayBuffer = await response.arrayBuffer();
      return JSON.stringify([...new Uint8Array(arrayBuffer)]);
    },
    deserialize: async (data) => {
      [data] = await Promise.all([data]);
      const uint8Array = new Uint8Array(JSON.parse(data));
      const response = new Response(uint8Array);
      return response.body;
    }
  }, 'ReadableStream');
  globalThis.superjson = SuperJSON;
  
  Object.defineProperty = Object[$defineProperty];
  delete Object[$defineProperty];
})();
