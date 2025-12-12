(()=>{
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
  /******/
(() => { // webpackBootstrap
  /******/
  "use strict";
  /******/
  var __webpack_modules__ = ({

    /***/
    "./node_modules/copy-anything/dist/index.js":
      /*!**************************************************!*\
        !*** ./node_modules/copy-anything/dist/index.js ***!
        \**************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          copy: () => ( /* binding */ copy)
          /* harmony export */
        });
        /* harmony import */
        var is_what__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! is-what */ "./node_modules/is-what/dist/index.js");


        function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
          const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
          if (propType === "enumerable")
            carry[key] = newVal;
          if (includeNonenumerable && propType === "nonenumerable") {
            Object.defineProperty(carry, key, {
              value: newVal,
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }

        function copy(target, options = {}) {
          if ((0, is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {
            return target.map((item) => copy(item, options));
          }
          if (!(0, is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(target)) {
            return target;
          }
          const props = Object.getOwnPropertyNames(target);
          const symbols = Object.getOwnPropertySymbols(target);
          return [...props, ...symbols].reduce((carry, key) => {
            if ((0, is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(options.props) && !options.props.includes(key)) {
              return carry;
            }
            const val = target[key];
            const newVal = copy(val, options);
            assignProp(carry, key, newVal, target, options.nonenumerable);
            return carry;
          }, {});
        }




        /***/
      }),

    /***/
    "./node_modules/is-what/dist/index.js":
      /*!********************************************!*\
        !*** ./node_modules/is-what/dist/index.js ***!
        \********************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          getType: () => ( /* binding */ getType),
          /* harmony export */
          isAnyObject: () => ( /* binding */ isAnyObject),
          /* harmony export */
          isArray: () => ( /* binding */ isArray),
          /* harmony export */
          isBlob: () => ( /* binding */ isBlob),
          /* harmony export */
          isBoolean: () => ( /* binding */ isBoolean),
          /* harmony export */
          isDate: () => ( /* binding */ isDate),
          /* harmony export */
          isEmptyArray: () => ( /* binding */ isEmptyArray),
          /* harmony export */
          isEmptyObject: () => ( /* binding */ isEmptyObject),
          /* harmony export */
          isEmptyString: () => ( /* binding */ isEmptyString),
          /* harmony export */
          isError: () => ( /* binding */ isError),
          /* harmony export */
          isFile: () => ( /* binding */ isFile),
          /* harmony export */
          isFullArray: () => ( /* binding */ isFullArray),
          /* harmony export */
          isFullObject: () => ( /* binding */ isFullObject),
          /* harmony export */
          isFullString: () => ( /* binding */ isFullString),
          /* harmony export */
          isFunction: () => ( /* binding */ isFunction),
          /* harmony export */
          isInstanceOf: () => ( /* binding */ isInstanceOf),
          /* harmony export */
          isMap: () => ( /* binding */ isMap),
          /* harmony export */
          isNaNValue: () => ( /* binding */ isNaNValue),
          /* harmony export */
          isNegativeNumber: () => ( /* binding */ isNegativeNumber),
          /* harmony export */
          isNull: () => ( /* binding */ isNull),
          /* harmony export */
          isNullOrUndefined: () => ( /* binding */ isNullOrUndefined),
          /* harmony export */
          isNumber: () => ( /* binding */ isNumber),
          /* harmony export */
          isObject: () => ( /* binding */ isObject),
          /* harmony export */
          isObjectLike: () => ( /* binding */ isObjectLike),
          /* harmony export */
          isOneOf: () => ( /* binding */ isOneOf),
          /* harmony export */
          isPlainObject: () => ( /* binding */ isPlainObject),
          /* harmony export */
          isPositiveNumber: () => ( /* binding */ isPositiveNumber),
          /* harmony export */
          isPrimitive: () => ( /* binding */ isPrimitive),
          /* harmony export */
          isPromise: () => ( /* binding */ isPromise),
          /* harmony export */
          isRegExp: () => ( /* binding */ isRegExp),
          /* harmony export */
          isSet: () => ( /* binding */ isSet),
          /* harmony export */
          isString: () => ( /* binding */ isString),
          /* harmony export */
          isSymbol: () => ( /* binding */ isSymbol),
          /* harmony export */
          isType: () => ( /* binding */ isType),
          /* harmony export */
          isUndefined: () => ( /* binding */ isUndefined),
          /* harmony export */
          isWeakMap: () => ( /* binding */ isWeakMap),
          /* harmony export */
          isWeakSet: () => ( /* binding */ isWeakSet)
          /* harmony export */
        });

        function getType(payload) {
          return Object.prototype.toString.call(payload).slice(8, -1);
        }

        function isAnyObject(payload) {
          return getType(payload) === "Object";
        }

        function isArray(payload) {
          return getType(payload) === "Array";
        }

        function isBlob(payload) {
          return getType(payload) === "Blob";
        }

        function isBoolean(payload) {
          return getType(payload) === "Boolean";
        }

        function isDate(payload) {
          return getType(payload) === "Date" && !isNaN(payload);
        }

        function isEmptyArray(payload) {
          return isArray(payload) && payload.length === 0;
        }

        function isPlainObject(payload) {
          if (getType(payload) !== "Object")
            return false;
          const prototype = Object.getPrototypeOf(payload);
          return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
        }

        function isEmptyObject(payload) {
          return isPlainObject(payload) && Object.keys(payload).length === 0;
        }

        function isEmptyString(payload) {
          return payload === "";
        }

        function isError(payload) {
          return getType(payload) === "Error" || payload instanceof Error;
        }

        function isFile(payload) {
          return getType(payload) === "File";
        }

        function isFullArray(payload) {
          return isArray(payload) && payload.length > 0;
        }

        function isFullObject(payload) {
          return isPlainObject(payload) && Object.keys(payload).length > 0;
        }

        function isString(payload) {
          return getType(payload) === "String";
        }

        function isFullString(payload) {
          return isString(payload) && payload !== "";
        }

        function isFunction(payload) {
          return typeof payload === "function";
        }

        function isType(payload, type) {
          if (!(type instanceof Function)) {
            throw new TypeError("Type must be a function");
          }
          if (!Object.prototype.hasOwnProperty.call(type, "prototype")) {
            throw new TypeError("Type is not a class");
          }
          const name = type.name;
          return getType(payload) === name || Boolean(payload && payload.constructor === type);
        }

        function isInstanceOf(value, classOrClassName) {
          if (typeof classOrClassName === "function") {
            for (let p = value; p; p = Object.getPrototypeOf(p)) {
              if (isType(p, classOrClassName)) {
                return true;
              }
            }
            return false;
          } else {
            for (let p = value; p; p = Object.getPrototypeOf(p)) {
              if (getType(p) === classOrClassName) {
                return true;
              }
            }
            return false;
          }
        }

        function isMap(payload) {
          return getType(payload) === "Map";
        }

        function isNaNValue(payload) {
          return getType(payload) === "Number" && isNaN(payload);
        }

        function isNumber(payload) {
          return getType(payload) === "Number" && !isNaN(payload);
        }

        function isNegativeNumber(payload) {
          return isNumber(payload) && payload < 0;
        }

        function isNull(payload) {
          return getType(payload) === "Null";
        }

        function isOneOf(a, b, c, d, e) {
          return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
        }

        function isUndefined(payload) {
          return getType(payload) === "Undefined";
        }

        const isNullOrUndefined = isOneOf(isNull, isUndefined);

        function isObject(payload) {
          return isPlainObject(payload);
        }

        function isObjectLike(payload) {
          return isAnyObject(payload);
        }

        function isPositiveNumber(payload) {
          return isNumber(payload) && payload > 0;
        }

        function isSymbol(payload) {
          return getType(payload) === "Symbol";
        }

        function isPrimitive(payload) {
          return isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
        }

        function isPromise(payload) {
          return getType(payload) === "Promise";
        }

        function isRegExp(payload) {
          return getType(payload) === "RegExp";
        }

        function isSet(payload) {
          return getType(payload) === "Set";
        }

        function isWeakMap(payload) {
          return getType(payload) === "WeakMap";
        }

        function isWeakSet(payload) {
          return getType(payload) === "WeakSet";
        }




        /***/
      }),

    /***/
    "./node_modules/superjson/dist/accessDeep.js":
      /*!***************************************************!*\
        !*** ./node_modules/superjson/dist/accessDeep.js ***!
        \***************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          getDeep: () => ( /* binding */ getDeep),
          /* harmony export */
          setDeep: () => ( /* binding */ setDeep)
          /* harmony export */
        });
        /* harmony import */
        var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./is.js */ "./node_modules/superjson/dist/is.js");
        /* harmony import */
        var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./util.js */ "./node_modules/superjson/dist/util.js");


        const getNthKey = (value, n) => {
          if (n > value.size)
            throw new Error('index out of bounds');
          const keys = value.keys();
          while (n > 0) {
            keys.next();
            n--;
          }
          return keys.next().value;
        };

        function validatePath(path) {
          if ((0, _util_js__WEBPACK_IMPORTED_MODULE_1__.includes)(path, '__proto__')) {
            throw new Error('__proto__ is not allowed as a property');
          }
          if ((0, _util_js__WEBPACK_IMPORTED_MODULE_1__.includes)(path, 'prototype')) {
            throw new Error('prototype is not allowed as a property');
          }
          if ((0, _util_js__WEBPACK_IMPORTED_MODULE_1__.includes)(path, 'constructor')) {
            throw new Error('constructor is not allowed as a property');
          }
        }
        const getDeep = (object, path) => {
          validatePath(path);
          for (let i = 0; i < path.length; i++) {
            const key = path[i];
            if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isSet)(object)) {
              object = getNthKey(object, +key);
            } else if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isMap)(object)) {
              const row = +key;
              const type = +path[++i] === 0 ? 'key' : 'value';
              const keyOfRow = getNthKey(object, row);
              switch (type) {
                case 'key':
                  object = keyOfRow;
                  break;
                case 'value':
                  object = object.get(keyOfRow);
                  break;
              }
            } else {
              object = object[key];
            }
          }
          return object;
        };
        const setDeep = (object, path, mapper) => {
          validatePath(path);
          if (path.length === 0) {
            return mapper(object);
          }
          let parent = object;
          for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(parent)) {
              const index = +key;
              parent = parent[index];
            } else if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(parent)) {
              parent = parent[key];
            } else if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isSet)(parent)) {
              const row = +key;
              parent = getNthKey(parent, row);
            } else if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isMap)(parent)) {
              const isEnd = i === path.length - 2;
              if (isEnd) {
                break;
              }
              const row = +key;
              const type = +path[++i] === 0 ? 'key' : 'value';
              const keyOfRow = getNthKey(parent, row);
              switch (type) {
                case 'key':
                  parent = keyOfRow;
                  break;
                case 'value':
                  parent = parent.get(keyOfRow);
                  break;
              }
            }
          }
          const lastKey = path[path.length - 1];
          if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(parent)) {
            parent[+lastKey] = mapper(parent[+lastKey]);
          } else if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(parent)) {
            parent[lastKey] = mapper(parent[lastKey]);
          }
          if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isSet)(parent)) {
            const oldValue = getNthKey(parent, +lastKey);
            const newValue = mapper(oldValue);
            if (oldValue !== newValue) {
              parent.delete(oldValue);
              parent.add(newValue);
            }
          }
          if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isMap)(parent)) {
            const row = +path[path.length - 2];
            const keyToRow = getNthKey(parent, row);
            const type = +lastKey === 0 ? 'key' : 'value';
            switch (type) {
              case 'key': {
                const newKey = mapper(keyToRow);
                parent.set(newKey, parent.get(keyToRow));
                if (newKey !== keyToRow) {
                  parent.delete(keyToRow);
                }
                break;
              }
              case 'value': {
                parent.set(keyToRow, mapper(parent.get(keyToRow)));
                break;
              }
            }
          }
          return object;
        };
        //# sourceMappingURL=accessDeep.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/class-registry.js":
      /*!*******************************************************!*\
        !*** ./node_modules/superjson/dist/class-registry.js ***!
        \*******************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          ClassRegistry: () => ( /* binding */ ClassRegistry)
          /* harmony export */
        });
        /* harmony import */
        var _registry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./registry.js */ "./node_modules/superjson/dist/registry.js");

        class ClassRegistry extends _registry_js__WEBPACK_IMPORTED_MODULE_0__.Registry {
          constructor() {
            super(c => c.name);
            this.classToAllowedProps = new Map();
          }
          register(value, options) {
            if (typeof options === 'object') {
              if (options.allowProps) {
                this.classToAllowedProps.set(value, options.allowProps);
              }
              super.register(value, options.identifier);
            } else {
              super.register(value, options);
            }
          }
          getAllowedProps(value) {
            return this.classToAllowedProps.get(value);
          }
        }
        //# sourceMappingURL=class-registry.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/custom-transformer-registry.js":
      /*!********************************************************************!*\
        !*** ./node_modules/superjson/dist/custom-transformer-registry.js ***!
        \********************************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          CustomTransformerRegistry: () => ( /* binding */ CustomTransformerRegistry)
          /* harmony export */
        });
        /* harmony import */
        var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./util.js */ "./node_modules/superjson/dist/util.js");

        class CustomTransformerRegistry {
          constructor() {
            this.transfomers = {};
          }
          register(transformer) {
            this.transfomers[transformer.name] = transformer;
          }
          findApplicable(v) {
            return (0, _util_js__WEBPACK_IMPORTED_MODULE_0__.find)(this.transfomers, transformer => transformer.isApplicable(v));
          }
          findByName(name) {
            return this.transfomers[name];
          }
        }
        //# sourceMappingURL=custom-transformer-registry.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/double-indexed-kv.js":
      /*!**********************************************************!*\
        !*** ./node_modules/superjson/dist/double-indexed-kv.js ***!
        \**********************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          DoubleIndexedKV: () => ( /* binding */ DoubleIndexedKV)
          /* harmony export */
        });
        class DoubleIndexedKV {
          constructor() {
            this.keyToValue = new Map();
            this.valueToKey = new Map();
          }
          set(key, value) {
            this.keyToValue.set(key, value);
            this.valueToKey.set(value, key);
          }
          getByKey(key) {
            return this.keyToValue.get(key);
          }
          getByValue(value) {
            return this.valueToKey.get(value);
          }
          clear() {
            this.keyToValue.clear();
            this.valueToKey.clear();
          }
        }
        //# sourceMappingURL=double-indexed-kv.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/index.js":
      /*!**********************************************!*\
        !*** ./node_modules/superjson/dist/index.js ***!
        \**********************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          SuperJSON: () => ( /* binding */ SuperJSON),
          /* harmony export */
          allowErrorProps: () => ( /* binding */ allowErrorProps),
          /* harmony export */
          "default": () => ( /* binding */ SuperJSON),
          /* harmony export */
          deserialize: () => ( /* binding */ deserialize),
          /* harmony export */
          parse: () => ( /* binding */ parse),
          /* harmony export */
          registerClass: () => ( /* binding */ registerClass),
          /* harmony export */
          registerCustom: () => ( /* binding */ registerCustom),
          /* harmony export */
          registerSymbol: () => ( /* binding */ registerSymbol),
          /* harmony export */
          serialize: () => ( /* binding */ serialize),
          /* harmony export */
          stringify: () => ( /* binding */ stringify)
          /* harmony export */
        });
        /* harmony import */
        var _class_registry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./class-registry.js */ "./node_modules/superjson/dist/class-registry.js");
        /* harmony import */
        var _registry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./registry.js */ "./node_modules/superjson/dist/registry.js");
        /* harmony import */
        var _custom_transformer_registry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./custom-transformer-registry.js */ "./node_modules/superjson/dist/custom-transformer-registry.js");
        /* harmony import */
        var _plainer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./plainer.js */ "./node_modules/superjson/dist/plainer.js");
        /* harmony import */
        var copy_anything__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! copy-anything */ "./node_modules/copy-anything/dist/index.js");





        class SuperJSON {
          /**
           * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
           */
          constructor({
            dedupe = false,
          } = {}) {
            this.classRegistry = new _class_registry_js__WEBPACK_IMPORTED_MODULE_0__.ClassRegistry();
            this.symbolRegistry = new _registry_js__WEBPACK_IMPORTED_MODULE_1__.Registry(s => s.description ?? '');
            this.customTransformerRegistry = new _custom_transformer_registry_js__WEBPACK_IMPORTED_MODULE_2__.CustomTransformerRegistry();
            this.allowedErrorProps = [];
            this.dedupe = dedupe;
          }
          serialize(object) {
            const identities = new Map();
            const output = (0, _plainer_js__WEBPACK_IMPORTED_MODULE_3__.walker)(object, identities, this, this.dedupe);
            const res = {
              json: output.transformedValue,
            };
            if (output.annotations) {
              res.meta = {
                ...res.meta,
                values: output.annotations,
              };
            }
            const equalityAnnotations = (0, _plainer_js__WEBPACK_IMPORTED_MODULE_3__.generateReferentialEqualityAnnotations)(identities, this.dedupe);
            if (equalityAnnotations) {
              res.meta = {
                ...res.meta,
                referentialEqualities: equalityAnnotations,
              };
            }
            return res;
          }
          deserialize(payload) {
            const {
              json,
              meta
            } = payload;
            let result = (0, copy_anything__WEBPACK_IMPORTED_MODULE_4__.copy)(json);
            if (meta?.values) {
              result = (0, _plainer_js__WEBPACK_IMPORTED_MODULE_3__.applyValueAnnotations)(result, meta.values, this);
            }
            if (meta?.referentialEqualities) {
              result = (0, _plainer_js__WEBPACK_IMPORTED_MODULE_3__.applyReferentialEqualityAnnotations)(result, meta.referentialEqualities);
            }
            return result;
          }
          stringify(object) {
            return JSON.stringify(this.serialize(object));
          }
          parse(string) {
            return this.deserialize(JSON.parse(string));
          }
          registerClass(v, options) {
            this.classRegistry.register(v, options);
          }
          registerSymbol(v, identifier) {
            this.symbolRegistry.register(v, identifier);
          }
          registerCustom(transformer, name) {
            this.customTransformerRegistry.register({
              name,
              ...transformer,
            });
          }
          allowErrorProps(...props) {
            this.allowedErrorProps.push(...props);
          }
        }
        SuperJSON.defaultInstance = new SuperJSON();
        SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
        SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
        SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
        SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
        SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
        SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
        SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
        SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);

        const serialize = SuperJSON.serialize;
        const deserialize = SuperJSON.deserialize;
        const stringify = SuperJSON.stringify;
        const parse = SuperJSON.parse;
        const registerClass = SuperJSON.registerClass;
        const registerCustom = SuperJSON.registerCustom;
        const registerSymbol = SuperJSON.registerSymbol;
        const allowErrorProps = SuperJSON.allowErrorProps;
        //# sourceMappingURL=index.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/is.js":
      /*!*******************************************!*\
        !*** ./node_modules/superjson/dist/is.js ***!
        \*******************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          isArray: () => ( /* binding */ isArray),
          /* harmony export */
          isBigint: () => ( /* binding */ isBigint),
          /* harmony export */
          isBoolean: () => ( /* binding */ isBoolean),
          /* harmony export */
          isDate: () => ( /* binding */ isDate),
          /* harmony export */
          isEmptyObject: () => ( /* binding */ isEmptyObject),
          /* harmony export */
          isError: () => ( /* binding */ isError),
          /* harmony export */
          isInfinite: () => ( /* binding */ isInfinite),
          /* harmony export */
          isMap: () => ( /* binding */ isMap),
          /* harmony export */
          isNaNValue: () => ( /* binding */ isNaNValue),
          /* harmony export */
          isNull: () => ( /* binding */ isNull),
          /* harmony export */
          isNumber: () => ( /* binding */ isNumber),
          /* harmony export */
          isPlainObject: () => ( /* binding */ isPlainObject),
          /* harmony export */
          isPrimitive: () => ( /* binding */ isPrimitive),
          /* harmony export */
          isRegExp: () => ( /* binding */ isRegExp),
          /* harmony export */
          isSet: () => ( /* binding */ isSet),
          /* harmony export */
          isString: () => ( /* binding */ isString),
          /* harmony export */
          isSymbol: () => ( /* binding */ isSymbol),
          /* harmony export */
          isTypedArray: () => ( /* binding */ isTypedArray),
          /* harmony export */
          isURL: () => ( /* binding */ isURL),
          /* harmony export */
          isUndefined: () => ( /* binding */ isUndefined)
          /* harmony export */
        });
        const getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
        const isUndefined = (payload) => typeof payload === 'undefined';
        const isNull = (payload) => payload === null;
        const isPlainObject = (payload) => {
          if (typeof payload !== 'object' || payload === null)
            return false;
          if (payload === Object.prototype)
            return false;
          if (Object.getPrototypeOf(payload) === null)
            return true;
          return Object.getPrototypeOf(payload) === Object.prototype;
        };
        const isEmptyObject = (payload) => isPlainObject(payload) && Object.keys(payload).length === 0;
        const isArray = (payload) => Array.isArray(payload);
        const isString = (payload) => typeof payload === 'string';
        const isNumber = (payload) => typeof payload === 'number' && !isNaN(payload);
        const isBoolean = (payload) => typeof payload === 'boolean';
        const isRegExp = (payload) => payload instanceof RegExp;
        const isMap = (payload) => payload instanceof Map;
        const isSet = (payload) => payload instanceof Set;
        const isSymbol = (payload) => getType(payload) === 'Symbol';
        const isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
        const isError = (payload) => payload instanceof Error;
        const isNaNValue = (payload) => typeof payload === 'number' && isNaN(payload);
        const isPrimitive = (payload) => isBoolean(payload) ||
          isNull(payload) ||
          isUndefined(payload) ||
          isNumber(payload) ||
          isString(payload) ||
          isSymbol(payload);
        const isBigint = (payload) => typeof payload === 'bigint';
        const isInfinite = (payload) => payload === Infinity || payload === -Infinity;
        const isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
        const isURL = (payload) => payload instanceof URL;
        //# sourceMappingURL=is.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/pathstringifier.js":
      /*!********************************************************!*\
        !*** ./node_modules/superjson/dist/pathstringifier.js ***!
        \********************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          escapeKey: () => ( /* binding */ escapeKey),
          /* harmony export */
          parsePath: () => ( /* binding */ parsePath),
          /* harmony export */
          stringifyPath: () => ( /* binding */ stringifyPath)
          /* harmony export */
        });
        const escapeKey = (key) => key.replace(/\./g, '\\.');
        const stringifyPath = (path) => path
          .map(String)
          .map(escapeKey)
          .join('.');
        const parsePath = (string) => {
          const result = [];
          let segment = '';
          for (let i = 0; i < string.length; i++) {
            let char = string.charAt(i);
            const isEscapedDot = char === '\\' && string.charAt(i + 1) === '.';
            if (isEscapedDot) {
              segment += '.';
              i++;
              continue;
            }
            const isEndOfSegment = char === '.';
            if (isEndOfSegment) {
              result.push(segment);
              segment = '';
              continue;
            }
            segment += char;
          }
          const lastSegment = segment;
          result.push(lastSegment);
          return result;
        };
        //# sourceMappingURL=pathstringifier.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/plainer.js":
      /*!************************************************!*\
        !*** ./node_modules/superjson/dist/plainer.js ***!
        \************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          applyReferentialEqualityAnnotations: () => ( /* binding */ applyReferentialEqualityAnnotations),
          /* harmony export */
          applyValueAnnotations: () => ( /* binding */ applyValueAnnotations),
          /* harmony export */
          generateReferentialEqualityAnnotations: () => ( /* binding */ generateReferentialEqualityAnnotations),
          /* harmony export */
          walker: () => ( /* binding */ walker)
          /* harmony export */
        });
        /* harmony import */
        var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./is.js */ "./node_modules/superjson/dist/is.js");
        /* harmony import */
        var _pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./pathstringifier.js */ "./node_modules/superjson/dist/pathstringifier.js");
        /* harmony import */
        var _transformer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./transformer.js */ "./node_modules/superjson/dist/transformer.js");
        /* harmony import */
        var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./util.js */ "./node_modules/superjson/dist/util.js");
        /* harmony import */
        var _accessDeep_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ./accessDeep.js */ "./node_modules/superjson/dist/accessDeep.js");






        function traverse(tree, walker, origin = []) {
          if (!tree) {
            return;
          }
          if (!(0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(tree)) {
            (0, _util_js__WEBPACK_IMPORTED_MODULE_3__.forEach)(tree, (subtree, key) => traverse(subtree, walker, [...origin, ...(0, _pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.parsePath)(key)]));
            return;
          }
          const [nodeValue, children] = tree;
          if (children) {
            (0, _util_js__WEBPACK_IMPORTED_MODULE_3__.forEach)(children, (child, key) => {
              traverse(child, walker, [...origin, ...(0, _pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.parsePath)(key)]);
            });
          }
          walker(nodeValue, origin);
        }

        function applyValueAnnotations(plain, annotations, superJson) {
          traverse(annotations, (type, path) => {
            plain = (0, _accessDeep_js__WEBPACK_IMPORTED_MODULE_4__.setDeep)(plain, path, v => (0, _transformer_js__WEBPACK_IMPORTED_MODULE_2__.untransformValue)(v, type, superJson));
          });
          return plain;
        }

        function applyReferentialEqualityAnnotations(plain, annotations) {
          function apply(identicalPaths, path) {
            const object = (0, _accessDeep_js__WEBPACK_IMPORTED_MODULE_4__.getDeep)(plain, (0, _pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.parsePath)(path));
            identicalPaths.map(_pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.parsePath).forEach(identicalObjectPath => {
              plain = (0, _accessDeep_js__WEBPACK_IMPORTED_MODULE_4__.setDeep)(plain, identicalObjectPath, () => object);
            });
          }
          if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(annotations)) {
            const [root, other] = annotations;
            root.forEach(identicalPath => {
              plain = (0, _accessDeep_js__WEBPACK_IMPORTED_MODULE_4__.setDeep)(plain, (0, _pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.parsePath)(identicalPath), () => plain);
            });
            if (other) {
              (0, _util_js__WEBPACK_IMPORTED_MODULE_3__.forEach)(other, apply);
            }
          } else {
            (0, _util_js__WEBPACK_IMPORTED_MODULE_3__.forEach)(annotations, apply);
          }
          return plain;
        }
        const isDeep = (object, superJson) => (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(object) ||
          (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(object) ||
          (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isMap)(object) ||
          (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isSet)(object) ||
          (0, _transformer_js__WEBPACK_IMPORTED_MODULE_2__.isInstanceOfRegisteredClass)(object, superJson);

        function addIdentity(object, path, identities) {
          const existingSet = identities.get(object);
          if (existingSet) {
            existingSet.push(path);
          } else {
            identities.set(object, [path]);
          }
        }

        function generateReferentialEqualityAnnotations(identitites, dedupe) {
          const result = {};
          let rootEqualityPaths = undefined;
          identitites.forEach(paths => {
            if (paths.length <= 1) {
              return;
            }
            // if we're not deduping, all of these objects continue existing.
            // putting the shortest path first makes it easier to parse for humans
            // if we're deduping though, only the first entry will still exist, so we can't do this optimisation.
            if (!dedupe) {
              paths = paths
                .map(path => path.map(String))
                .sort((a, b) => a.length - b.length);
            }
            const [representativePath, ...identicalPaths] = paths;
            if (representativePath.length === 0) {
              rootEqualityPaths = identicalPaths.map(_pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.stringifyPath);
            } else {
              result[(0, _pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.stringifyPath)(representativePath)] = identicalPaths.map(_pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.stringifyPath);
            }
          });
          if (rootEqualityPaths) {
            if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(result)) {
              return [rootEqualityPaths];
            } else {
              return [rootEqualityPaths, result];
            }
          } else {
            return (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(result) ? undefined : result;
          }
        }
        const walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = new Map()) => {
          const primitive = (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isPrimitive)(object);
          if (!primitive) {
            addIdentity(object, path, identities);
            const seen = seenObjects.get(object);
            if (seen) {
              // short-circuit result if we've seen this object before
              return dedupe ?
                {
                  transformedValue: null,
                } :
                seen;
            }
          }
          if (!isDeep(object, superJson)) {
            const transformed = (0, _transformer_js__WEBPACK_IMPORTED_MODULE_2__.transformValue)(object, superJson);
            const result = transformed ?
              {
                transformedValue: transformed.value,
                annotations: [transformed.type],
              } :
              {
                transformedValue: object,
              };
            if (!primitive) {
              seenObjects.set(object, result);
            }
            return result;
          }
          if ((0, _util_js__WEBPACK_IMPORTED_MODULE_3__.includes)(objectsInThisPath, object)) {
            // prevent circular references
            return {
              transformedValue: null,
            };
          }
          const transformationResult = (0, _transformer_js__WEBPACK_IMPORTED_MODULE_2__.transformValue)(object, superJson);
          const transformed = transformationResult?.value ?? object;
          const transformedValue = (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(transformed) ? [] : {};
          const innerAnnotations = {};
          (0, _util_js__WEBPACK_IMPORTED_MODULE_3__.forEach)(transformed, (value, index) => {
            if (index === '__proto__' ||
              index === 'constructor' ||
              index === 'prototype') {
              throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
            }
            const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
            transformedValue[index] = recursiveResult.transformedValue;
            if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(recursiveResult.annotations)) {
              innerAnnotations[index] = recursiveResult.annotations;
            } else if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(recursiveResult.annotations)) {
              (0, _util_js__WEBPACK_IMPORTED_MODULE_3__.forEach)(recursiveResult.annotations, (tree, key) => {
                innerAnnotations[(0, _pathstringifier_js__WEBPACK_IMPORTED_MODULE_1__.escapeKey)(index) + '.' + key] = tree;
              });
            }
          });
          const result = (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(innerAnnotations) ?
            {
              transformedValue,
              annotations: !!transformationResult ?
                [transformationResult.type] :
                undefined,
            } :
            {
              transformedValue,
              annotations: !!transformationResult ?
                [transformationResult.type, innerAnnotations] :
                innerAnnotations,
            };
          if (!primitive) {
            seenObjects.set(object, result);
          }
          return result;
        };
        //# sourceMappingURL=plainer.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/registry.js":
      /*!*************************************************!*\
        !*** ./node_modules/superjson/dist/registry.js ***!
        \*************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          Registry: () => ( /* binding */ Registry)
          /* harmony export */
        });
        /* harmony import */
        var _double_indexed_kv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./double-indexed-kv.js */ "./node_modules/superjson/dist/double-indexed-kv.js");

        class Registry {
          constructor(generateIdentifier) {
            this.generateIdentifier = generateIdentifier;
            this.kv = new _double_indexed_kv_js__WEBPACK_IMPORTED_MODULE_0__.DoubleIndexedKV();
          }
          register(value, identifier) {
            if (this.kv.getByValue(value)) {
              return;
            }
            if (!identifier) {
              identifier = this.generateIdentifier(value);
            }
            this.kv.set(identifier, value);
          }
          clear() {
            this.kv.clear();
          }
          getIdentifier(value) {
            return this.kv.getByValue(value);
          }
          getValue(identifier) {
            return this.kv.getByKey(identifier);
          }
        }
        //# sourceMappingURL=registry.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/transformer.js":
      /*!****************************************************!*\
        !*** ./node_modules/superjson/dist/transformer.js ***!
        \****************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          isInstanceOfRegisteredClass: () => ( /* binding */ isInstanceOfRegisteredClass),
          /* harmony export */
          transformValue: () => ( /* binding */ transformValue),
          /* harmony export */
          untransformValue: () => ( /* binding */ untransformValue)
          /* harmony export */
        });
        /* harmony import */
        var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./is.js */ "./node_modules/superjson/dist/is.js");
        /* harmony import */
        var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./util.js */ "./node_modules/superjson/dist/util.js");


        function simpleTransformation(isApplicable, annotation, transform, untransform) {
          return {
            isApplicable,
            annotation,
            transform,
            untransform,
          };
        }
        const simpleRules = [
          simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined, 'undefined', () => null, () => undefined),
          simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isBigint, 'bigint', v => v.toString(), v => {
            if (typeof BigInt !== 'undefined') {
              return BigInt(v);
            }
            console.error('Please add a BigInt polyfill.');
            return v;
          }),
          simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isDate, 'Date', v => v.toISOString(), v => new Date(v)),
          simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isError, 'Error', (v, superJson) => {
            const baseError = {
              name: v.name,
              message: v.message,
            };
            superJson.allowedErrorProps.forEach(prop => {
              baseError[prop] = v[prop];
            });
            return baseError;
          }, (v, superJson) => {
            const e = new Error(v.message);
            e.name = v.name;
            e.stack = v.stack;
            superJson.allowedErrorProps.forEach(prop => {
              e[prop] = v[prop];
            });
            return e;
          }),
          simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isRegExp, 'regexp', v => '' + v, regex => {
            const body = regex.slice(1, regex.lastIndexOf('/'));
            const flags = regex.slice(regex.lastIndexOf('/') + 1);
            return new RegExp(body, flags);
          }),
          simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isSet, 'set',
            // (sets only exist in es6+)
            // eslint-disable-next-line es5/no-es6-methods
            v => [...v.values()], v => new Set(v)),
          simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isMap, 'map', v => [...v.entries()], v => new Map(v)),
          simpleTransformation((v) => (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isNaNValue)(v) || (0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isInfinite)(v), 'number', v => {
            if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isNaNValue)(v)) {
              return 'NaN';
            }
            if (v > 0) {
              return 'Infinity';
            } else {
              return '-Infinity';
            }
          }, Number),
          simpleTransformation((v) => v === 0 && 1 / v === -Infinity, 'number', () => {
            return '-0';
          }, Number),
          simpleTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isURL, 'URL', v => v.toString(), v => new URL(v)),
        ];

        function compositeTransformation(isApplicable, annotation, transform, untransform) {
          return {
            isApplicable,
            annotation,
            transform,
            untransform,
          };
        }
        const symbolRule = compositeTransformation((s, superJson) => {
          if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(s)) {
            const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
            return isRegistered;
          }
          return false;
        }, (s, superJson) => {
          const identifier = superJson.symbolRegistry.getIdentifier(s);
          return ['symbol', identifier];
        }, v => v.description, (_, a, superJson) => {
          const value = superJson.symbolRegistry.getValue(a[1]);
          if (!value) {
            throw new Error('Trying to deserialize unknown symbol');
          }
          return value;
        });
        const constructorToName = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
          Uint8ClampedArray,
        ].reduce((obj, ctor) => {
          obj[ctor.name] = ctor;
          return obj;
        }, {});
        const typedArrayRule = compositeTransformation(_is_js__WEBPACK_IMPORTED_MODULE_0__.isTypedArray, v => ['typed-array', v.constructor.name], v => [...v], (v, a) => {
          const ctor = constructorToName[a[1]];
          if (!ctor) {
            throw new Error('Trying to deserialize unknown typed array');
          }
          return new ctor(v);
        });

        function isInstanceOfRegisteredClass(potentialClass, superJson) {
          if (potentialClass?.constructor) {
            const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
            return isRegistered;
          }
          return false;
        }
        const classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
          const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
          return ['class', identifier];
        }, (clazz, superJson) => {
          const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
          if (!allowedProps) {
            return {
              ...clazz
            };
          }
          const result = {};
          allowedProps.forEach(prop => {
            result[prop] = clazz[prop];
          });
          return result;
        }, (v, a, superJson) => {
          const clazz = superJson.classRegistry.getValue(a[1]);
          if (!clazz) {
            throw new Error(`Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
          }
          return Object.assign(Object.create(clazz.prototype), v);
        });
        const customRule = compositeTransformation((value, superJson) => {
          return !!superJson.customTransformerRegistry.findApplicable(value);
        }, (value, superJson) => {
          const transformer = superJson.customTransformerRegistry.findApplicable(value);
          return ['custom', transformer.name];
        }, (value, superJson) => {
          const transformer = superJson.customTransformerRegistry.findApplicable(value);
          return transformer.serialize(value);
        }, (v, a, superJson) => {
          const transformer = superJson.customTransformerRegistry.findByName(a[1]);
          if (!transformer) {
            throw new Error('Trying to deserialize unknown custom value');
          }
          return transformer.deserialize(v);
        });
        const compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
        const transformValue = (value, superJson) => {
          const applicableCompositeRule = (0, _util_js__WEBPACK_IMPORTED_MODULE_1__.findArr)(compositeRules, rule => rule.isApplicable(value, superJson));
          if (applicableCompositeRule) {
            return {
              value: applicableCompositeRule.transform(value, superJson),
              type: applicableCompositeRule.annotation(value, superJson),
            };
          }
          const applicableSimpleRule = (0, _util_js__WEBPACK_IMPORTED_MODULE_1__.findArr)(simpleRules, rule => rule.isApplicable(value, superJson));
          if (applicableSimpleRule) {
            return {
              value: applicableSimpleRule.transform(value, superJson),
              type: applicableSimpleRule.annotation,
            };
          }
          return undefined;
        };
        const simpleRulesByAnnotation = {};
        simpleRules.forEach(rule => {
          simpleRulesByAnnotation[rule.annotation] = rule;
        });
        const untransformValue = (json, type, superJson) => {
          if ((0, _is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(type)) {
            switch (type[0]) {
              case 'symbol':
                return symbolRule.untransform(json, type, superJson);
              case 'class':
                return classRule.untransform(json, type, superJson);
              case 'custom':
                return customRule.untransform(json, type, superJson);
              case 'typed-array':
                return typedArrayRule.untransform(json, type, superJson);
              default:
                throw new Error('Unknown transformation: ' + type);
            }
          } else {
            const transformation = simpleRulesByAnnotation[type];
            if (!transformation) {
              throw new Error('Unknown transformation: ' + type);
            }
            return transformation.untransform(json, superJson);
          }
        };
        //# sourceMappingURL=transformer.js.map

        /***/
      }),

    /***/
    "./node_modules/superjson/dist/util.js":
      /*!*********************************************!*\
        !*** ./node_modules/superjson/dist/util.js ***!
        \*********************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          find: () => ( /* binding */ find),
          /* harmony export */
          findArr: () => ( /* binding */ findArr),
          /* harmony export */
          forEach: () => ( /* binding */ forEach),
          /* harmony export */
          includes: () => ( /* binding */ includes)
          /* harmony export */
        });

        function valuesOfObj(record) {
          if ('values' in Object) {
            // eslint-disable-next-line es5/no-es6-methods
            return Object.values(record);
          }
          const values = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const key in record) {
            if (record.hasOwnProperty(key)) {
              values.push(record[key]);
            }
          }
          return values;
        }

        function find(record, predicate) {
          const values = valuesOfObj(record);
          if ('find' in values) {
            // eslint-disable-next-line es5/no-es6-methods
            return values.find(predicate);
          }
          const valuesNotNever = values;
          for (let i = 0; i < valuesNotNever.length; i++) {
            const value = valuesNotNever[i];
            if (predicate(value)) {
              return value;
            }
          }
          return undefined;
        }

        function forEach(record, run) {
          Object.entries(record).forEach(([key, value]) => run(value, key));
        }

        function includes(arr, value) {
          return arr.indexOf(value) !== -1;
        }

        function findArr(record, predicate) {
          for (let i = 0; i < record.length; i++) {
            const value = record[i];
            if (predicate(value)) {
              return value;
            }
          }
          return undefined;
        }
        //# sourceMappingURL=util.js.map

        /***/
      })

    /******/
  });
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/
    var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/
      return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/
      exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /* webpack/runtime/define property getters */
  /******/
  (() => {
    /******/ // define getter functions for harmony exports
    /******/
    __webpack_require__.d = (exports, definition) => {
      /******/
      for (var key in definition) {
        /******/
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/
  /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  (() => {
    /******/
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/
  })();
  /******/
  /******/
  /* webpack/runtime/make namespace object */
  /******/
  (() => {
    /******/ // define __esModule on exports
    /******/
    __webpack_require__.r = (exports) => {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  (() => {
    /*!*******************!*\
      !*** ./index.mjs ***!
      \*******************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var superjson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! superjson */ "./node_modules/superjson/dist/index.js");



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


    superjson__WEBPACK_IMPORTED_MODULE_0__["default"].registerCustom({
      isApplicable: isHeaders,
      serialize: headers => [...headers.entries()],
      deserialize: headers => new Headers(headers)
    }, 'Headers');

    superjson__WEBPACK_IMPORTED_MODULE_0__["default"].registerCustom({
      isApplicable: isURLSearchParams,
      serialize: params => [...params.entries()],
      deserialize: params => new URLSearchParams(params)
    }, 'URLSearchParams');

    superjson__WEBPACK_IMPORTED_MODULE_0__["default"].registerCustom({
      isApplicable: isURL,
      serialize: url => {
        const obj = {};
        if (isString(url)) url = new URL(url);
        for (const x in url) {
          if (!isFunction(url[x])) {
            obj[x] = url[x];
          }
        }
        obj.searchParams = superjson__WEBPACK_IMPORTED_MODULE_0__["default"].serialize(url.searchParams);
        return obj;
      },
      deserialize: obj => {
        const url = new URL(obj.href);
        try {
          url.searchParams = superjson__WEBPACK_IMPORTED_MODULE_0__["default"].deserialize(obj.searchParams);
        } catch {}
        return url;
      }
    }, 'URL');

    superjson__WEBPACK_IMPORTED_MODULE_0__["default"].registerCustom({
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

    superjson__WEBPACK_IMPORTED_MODULE_0__["default"].registerCustom({
      isApplicable: isArrayBuffer,
      serialize: ab => JSON.stringify([...new Uint8Array(ab)]),
      deserialize: ab => new Uint8Array(JSON.parse(ab)).buffer
    }, 'ArrayBuffer');

    superjson__WEBPACK_IMPORTED_MODULE_0__["default"].registerCustom({
      isApplicable: x => constructOf(x, DataView),
      serialize: dv => ({
        buffer: [...new Uint8Array(dv.buffer)],
        offset: dv.byteOffset,
        length: dv.byteLength
      }),
      deserialize: dv => new DataView(
        new Uint8Array(dv.buffer).buffer,
        dv.offset,
        dv.length
      )
    }, 'DataView');

    superjson__WEBPACK_IMPORTED_MODULE_0__["default"].registerCustom({
      isApplicable: x => String(x) === '[object Arguments]',
      serialize: args => [...args],
      deserialize: args => (function() {
        return arguments;
      })(...args),
    }, 'Arguments');

    globalThis.superjson = superjson__WEBPACK_IMPORTED_MODULE_0__["default"];
  })();

  /******/
})();
//# sourceMappingURL=superjson.js.map;/**/;
  Object.defineProperty = Object[$defineProperty];
  delete Object[$defineProperty];
  })();
