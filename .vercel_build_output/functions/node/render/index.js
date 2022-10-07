var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var ponyfill_es2018 = { exports: {} };
(function(module2, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
    function noop2() {
      return void 0;
    }
    function getGlobals() {
      if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else if (typeof commonjsGlobal !== "undefined") {
        return commonjsGlobal;
      }
      return void 0;
    }
    const globals = getGlobals();
    function typeIsObject(x2) {
      return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
    }
    const rethrowAssertionErrorRejection = noop2;
    const originalPromise = Promise;
    const originalPromiseThen = Promise.prototype.then;
    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
    const originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
      return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
      return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
      return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
      return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
      PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
      uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
      uponPromise(promise, void 0, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
      return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
      PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
    }
    const queueMicrotask = (() => {
      const globalQueueMicrotask = globals && globals.queueMicrotask;
      if (typeof globalQueueMicrotask === "function") {
        return globalQueueMicrotask;
      }
      const resolvedPromise = promiseResolvedWith(void 0);
      return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    function reflectCall(F, V2, args) {
      if (typeof F !== "function") {
        throw new TypeError("Argument is not a function");
      }
      return Function.prototype.apply.call(F, V2, args);
    }
    function promiseCall(F, V2, args) {
      try {
        return promiseResolvedWith(reflectCall(F, V2, args));
      } catch (value) {
        return promiseRejectedWith(value);
      }
    }
    const QUEUE_MAX_ARRAY_SIZE = 16384;
    class SimpleQueue {
      constructor() {
        this._cursor = 0;
        this._size = 0;
        this._front = {
          _elements: [],
          _next: void 0
        };
        this._back = this._front;
        this._cursor = 0;
        this._size = 0;
      }
      get length() {
        return this._size;
      }
      push(element) {
        const oldBack = this._back;
        let newBack = oldBack;
        if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
          newBack = {
            _elements: [],
            _next: void 0
          };
        }
        oldBack._elements.push(element);
        if (newBack !== oldBack) {
          this._back = newBack;
          oldBack._next = newBack;
        }
        ++this._size;
      }
      shift() {
        const oldFront = this._front;
        let newFront = oldFront;
        const oldCursor = this._cursor;
        let newCursor = oldCursor + 1;
        const elements = oldFront._elements;
        const element = elements[oldCursor];
        if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
          newFront = oldFront._next;
          newCursor = 0;
        }
        --this._size;
        this._cursor = newCursor;
        if (oldFront !== newFront) {
          this._front = newFront;
        }
        elements[oldCursor] = void 0;
        return element;
      }
      forEach(callback) {
        let i2 = this._cursor;
        let node = this._front;
        let elements = node._elements;
        while (i2 !== elements.length || node._next !== void 0) {
          if (i2 === elements.length) {
            node = node._next;
            elements = node._elements;
            i2 = 0;
            if (elements.length === 0) {
              break;
            }
          }
          callback(elements[i2]);
          ++i2;
        }
      }
      peek() {
        const front = this._front;
        const cursor = this._cursor;
        return front._elements[cursor];
      }
    }
    function ReadableStreamReaderGenericInitialize(reader, stream) {
      reader._ownerReadableStream = stream;
      stream._reader = reader;
      if (stream._state === "readable") {
        defaultReaderClosedPromiseInitialize(reader);
      } else if (stream._state === "closed") {
        defaultReaderClosedPromiseInitializeAsResolved(reader);
      } else {
        defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
      }
    }
    function ReadableStreamReaderGenericCancel(reader, reason) {
      const stream = reader._ownerReadableStream;
      return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
      if (reader._ownerReadableStream._state === "readable") {
        defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      } else {
        defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      }
      reader._ownerReadableStream._reader = void 0;
      reader._ownerReadableStream = void 0;
    }
    function readerLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released reader");
    }
    function defaultReaderClosedPromiseInitialize(reader) {
      reader._closedPromise = newPromise((resolve2, reject) => {
        reader._closedPromise_resolve = resolve2;
        reader._closedPromise_reject = reject;
      });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
      if (reader._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(reader._closedPromise);
      reader._closedPromise_reject(reason);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
      defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
      if (reader._closedPromise_resolve === void 0) {
        return;
      }
      reader._closedPromise_resolve(void 0);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
    const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
    const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
    const PullSteps = SymbolPolyfill("[[PullSteps]]");
    const NumberIsFinite = Number.isFinite || function(x2) {
      return typeof x2 === "number" && isFinite(x2);
    };
    const MathTrunc = Math.trunc || function(v2) {
      return v2 < 0 ? Math.ceil(v2) : Math.floor(v2);
    };
    function isDictionary(x2) {
      return typeof x2 === "object" || typeof x2 === "function";
    }
    function assertDictionary(obj, context) {
      if (obj !== void 0 && !isDictionary(obj)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertFunction(x2, context) {
      if (typeof x2 !== "function") {
        throw new TypeError(`${context} is not a function.`);
      }
    }
    function isObject(x2) {
      return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
    }
    function assertObject(x2, context) {
      if (!isObject(x2)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertRequiredArgument(x2, position, context) {
      if (x2 === void 0) {
        throw new TypeError(`Parameter ${position} is required in '${context}'.`);
      }
    }
    function assertRequiredField(x2, field, context) {
      if (x2 === void 0) {
        throw new TypeError(`${field} is required in '${context}'.`);
      }
    }
    function convertUnrestrictedDouble(value) {
      return Number(value);
    }
    function censorNegativeZero(x2) {
      return x2 === 0 ? 0 : x2;
    }
    function integerPart(x2) {
      return censorNegativeZero(MathTrunc(x2));
    }
    function convertUnsignedLongLongWithEnforceRange(value, context) {
      const lowerBound = 0;
      const upperBound = Number.MAX_SAFE_INTEGER;
      let x2 = Number(value);
      x2 = censorNegativeZero(x2);
      if (!NumberIsFinite(x2)) {
        throw new TypeError(`${context} is not a finite number`);
      }
      x2 = integerPart(x2);
      if (x2 < lowerBound || x2 > upperBound) {
        throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
      }
      if (!NumberIsFinite(x2) || x2 === 0) {
        return 0;
      }
      return x2;
    }
    function assertReadableStream(x2, context) {
      if (!IsReadableStream(x2)) {
        throw new TypeError(`${context} is not a ReadableStream.`);
      }
    }
    function AcquireReadableStreamDefaultReader(stream) {
      return new ReadableStreamDefaultReader(stream);
    }
    function ReadableStreamAddReadRequest(stream, readRequest) {
      stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readRequest = reader._readRequests.shift();
      if (done) {
        readRequest._closeSteps();
      } else {
        readRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadRequests(stream) {
      return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamDefaultReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamDefaultReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("read"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: () => resolvePromise({ value: void 0, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamDefaultReaderRead(this, readRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamDefaultReader(this)) {
          throw defaultReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultReader",
        configurable: true
      });
    }
    function IsReadableStreamDefaultReader(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
        return false;
      }
      return x2 instanceof ReadableStreamDefaultReader;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "closed") {
        readRequest._closeSteps();
      } else if (stream._state === "errored") {
        readRequest._errorSteps(stream._storedError);
      } else {
        stream._readableStreamController[PullSteps](readRequest);
      }
    }
    function defaultReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
    }
    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    class ReadableStreamAsyncIteratorImpl {
      constructor(reader, preventCancel) {
        this._ongoingPromise = void 0;
        this._isFinished = false;
        this._reader = reader;
        this._preventCancel = preventCancel;
      }
      next() {
        const nextSteps = () => this._nextSteps();
        this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
        return this._ongoingPromise;
      }
      return(value) {
        const returnSteps = () => this._returnSteps(value);
        return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
      }
      _nextSteps() {
        if (this._isFinished) {
          return Promise.resolve({ value: void 0, done: true });
        }
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("iterate"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => {
            this._ongoingPromise = void 0;
            queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
          },
          _closeSteps: () => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            resolvePromise({ value: void 0, done: true });
          },
          _errorSteps: (reason) => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            rejectPromise(reason);
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promise;
      }
      _returnSteps(value) {
        if (this._isFinished) {
          return Promise.resolve({ value, done: true });
        }
        this._isFinished = true;
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("finish iterating"));
        }
        if (!this._preventCancel) {
          const result = ReadableStreamReaderGenericCancel(reader, value);
          ReadableStreamReaderGenericRelease(reader);
          return transformPromiseWith(result, () => ({ value, done: true }));
        }
        ReadableStreamReaderGenericRelease(reader);
        return promiseResolvedWith({ value, done: true });
      }
    }
    const ReadableStreamAsyncIteratorPrototype = {
      next() {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
        }
        return this._asyncIteratorImpl.next();
      },
      return(value) {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
        }
        return this._asyncIteratorImpl.return(value);
      }
    };
    if (AsyncIteratorPrototype !== void 0) {
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
      const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
      iterator._asyncIteratorImpl = impl;
      return iterator;
    }
    function IsReadableStreamAsyncIterator(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
        return false;
      }
      try {
        return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
      } catch (_a2) {
        return false;
      }
    }
    function streamAsyncIteratorBrandCheckException(name) {
      return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
    }
    const NumberIsNaN = Number.isNaN || function(x2) {
      return x2 !== x2;
    };
    function CreateArrayFromList(elements) {
      return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src2, srcOffset, n) {
      new Uint8Array(dest).set(new Uint8Array(src2, srcOffset, n), destOffset);
    }
    function TransferArrayBuffer(O2) {
      return O2;
    }
    function IsDetachedBuffer(O2) {
      return false;
    }
    function ArrayBufferSlice(buffer, begin, end) {
      if (buffer.slice) {
        return buffer.slice(begin, end);
      }
      const length = end - begin;
      const slice = new ArrayBuffer(length);
      CopyDataBlockBytes(slice, 0, buffer, begin, length);
      return slice;
    }
    function IsNonNegativeNumber(v2) {
      if (typeof v2 !== "number") {
        return false;
      }
      if (NumberIsNaN(v2)) {
        return false;
      }
      if (v2 < 0) {
        return false;
      }
      return true;
    }
    function CloneAsUint8Array(O2) {
      const buffer = ArrayBufferSlice(O2.buffer, O2.byteOffset, O2.byteOffset + O2.byteLength);
      return new Uint8Array(buffer);
    }
    function DequeueValue(container) {
      const pair = container._queue.shift();
      container._queueTotalSize -= pair.size;
      if (container._queueTotalSize < 0) {
        container._queueTotalSize = 0;
      }
      return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
      if (!IsNonNegativeNumber(size) || size === Infinity) {
        throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
      }
      container._queue.push({ value, size });
      container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
      const pair = container._queue.peek();
      return pair.value;
    }
    function ResetQueue(container) {
      container._queue = new SimpleQueue();
      container._queueTotalSize = 0;
    }
    class ReadableStreamBYOBRequest {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get view() {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("view");
        }
        return this._view;
      }
      respond(bytesWritten) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respond");
        }
        assertRequiredArgument(bytesWritten, 1, "respond");
        bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(this._view.buffer))
          ;
        ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
      }
      respondWithNewView(view) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respondWithNewView");
        }
        assertRequiredArgument(view, 1, "respondWithNewView");
        if (!ArrayBuffer.isView(view)) {
          throw new TypeError("You can only respond with array buffer views");
        }
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
      }
    }
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
      respond: { enumerable: true },
      respondWithNewView: { enumerable: true },
      view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBRequest",
        configurable: true
      });
    }
    class ReadableByteStreamController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get byobRequest() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("byobRequest");
        }
        return ReadableByteStreamControllerGetBYOBRequest(this);
      }
      get desiredSize() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("desiredSize");
        }
        return ReadableByteStreamControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("close");
        }
        if (this._closeRequested) {
          throw new TypeError("The stream has already been closed; do not close it again!");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
        }
        ReadableByteStreamControllerClose(this);
      }
      enqueue(chunk) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("enqueue");
        }
        assertRequiredArgument(chunk, 1, "enqueue");
        if (!ArrayBuffer.isView(chunk)) {
          throw new TypeError("chunk must be an array buffer view");
        }
        if (chunk.byteLength === 0) {
          throw new TypeError("chunk must have non-zero byteLength");
        }
        if (chunk.buffer.byteLength === 0) {
          throw new TypeError(`chunk's buffer must have non-zero byteLength`);
        }
        if (this._closeRequested) {
          throw new TypeError("stream is closed or draining");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
        }
        ReadableByteStreamControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("error");
        }
        ReadableByteStreamControllerError(this, e);
      }
      [CancelSteps](reason) {
        ReadableByteStreamControllerClearPendingPullIntos(this);
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableByteStreamControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) {
          const entry = this._queue.shift();
          this._queueTotalSize -= entry.byteLength;
          ReadableByteStreamControllerHandleQueueDrain(this);
          const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
          readRequest._chunkSteps(view);
          return;
        }
        const autoAllocateChunkSize = this._autoAllocateChunkSize;
        if (autoAllocateChunkSize !== void 0) {
          let buffer;
          try {
            buffer = new ArrayBuffer(autoAllocateChunkSize);
          } catch (bufferE) {
            readRequest._errorSteps(bufferE);
            return;
          }
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: autoAllocateChunkSize,
            byteOffset: 0,
            byteLength: autoAllocateChunkSize,
            bytesFilled: 0,
            elementSize: 1,
            viewConstructor: Uint8Array,
            readerType: "default"
          };
          this._pendingPullIntos.push(pullIntoDescriptor);
        }
        ReadableStreamAddReadRequest(stream, readRequest);
        ReadableByteStreamControllerCallPullIfNeeded(this);
      }
    }
    Object.defineProperties(ReadableByteStreamController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      byobRequest: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableByteStreamController",
        configurable: true
      });
    }
    function IsReadableByteStreamController(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
        return false;
      }
      return x2 instanceof ReadableByteStreamController;
    }
    function IsReadableStreamBYOBRequest(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
        return false;
      }
      return x2 instanceof ReadableStreamBYOBRequest;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableByteStreamControllerError(controller, e);
      });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
      let done = false;
      if (stream._state === "closed") {
        done = true;
      }
      const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
      if (pullIntoDescriptor.readerType === "default") {
        ReadableStreamFulfillReadRequest(stream, filledView, done);
      } else {
        ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
      }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
      const bytesFilled = pullIntoDescriptor.bytesFilled;
      const elementSize = pullIntoDescriptor.elementSize;
      return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
      controller._queue.push({ buffer, byteOffset, byteLength });
      controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
      const elementSize = pullIntoDescriptor.elementSize;
      const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
      const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
      const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
      const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
      let totalBytesToCopyRemaining = maxBytesToCopy;
      let ready = false;
      if (maxAlignedBytes > currentAlignedBytes) {
        totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
        ready = true;
      }
      const queue = controller._queue;
      while (totalBytesToCopyRemaining > 0) {
        const headOfQueue = queue.peek();
        const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
        const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
        if (headOfQueue.byteLength === bytesToCopy) {
          queue.shift();
        } else {
          headOfQueue.byteOffset += bytesToCopy;
          headOfQueue.byteLength -= bytesToCopy;
        }
        controller._queueTotalSize -= bytesToCopy;
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
        totalBytesToCopyRemaining -= bytesToCopy;
      }
      return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
      pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
      if (controller._queueTotalSize === 0 && controller._closeRequested) {
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(controller._controlledReadableByteStream);
      } else {
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
      if (controller._byobRequest === null) {
        return;
      }
      controller._byobRequest._associatedReadableByteStreamController = void 0;
      controller._byobRequest._view = null;
      controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
      while (controller._pendingPullIntos.length > 0) {
        if (controller._queueTotalSize === 0) {
          return;
        }
        const pullIntoDescriptor = controller._pendingPullIntos.peek();
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
      const stream = controller._controlledReadableByteStream;
      let elementSize = 1;
      if (view.constructor !== DataView) {
        elementSize = view.constructor.BYTES_PER_ELEMENT;
      }
      const ctor = view.constructor;
      const buffer = TransferArrayBuffer(view.buffer);
      const pullIntoDescriptor = {
        buffer,
        bufferByteLength: buffer.byteLength,
        byteOffset: view.byteOffset,
        byteLength: view.byteLength,
        bytesFilled: 0,
        elementSize,
        viewConstructor: ctor,
        readerType: "byob"
      };
      if (controller._pendingPullIntos.length > 0) {
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        return;
      }
      if (stream._state === "closed") {
        const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
        readIntoRequest._closeSteps(emptyView);
        return;
      }
      if (controller._queueTotalSize > 0) {
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          ReadableByteStreamControllerHandleQueueDrain(controller);
          readIntoRequest._chunkSteps(filledView);
          return;
        }
        if (controller._closeRequested) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          readIntoRequest._errorSteps(e);
          return;
        }
      }
      controller._pendingPullIntos.push(pullIntoDescriptor);
      ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
      const stream = controller._controlledReadableByteStream;
      if (ReadableStreamHasBYOBReader(stream)) {
        while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
      ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
      if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
        return;
      }
      ReadableByteStreamControllerShiftPendingPullInto(controller);
      const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
      if (remainderSize > 0) {
        const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
      }
      pullIntoDescriptor.bytesFilled -= remainderSize;
      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
      ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        ReadableByteStreamControllerRespondInClosedState(controller);
      } else {
        ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
      const descriptor = controller._pendingPullIntos.shift();
      return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return false;
      }
      if (controller._closeRequested) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
    }
    function ReadableByteStreamControllerClose(controller) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      if (controller._queueTotalSize > 0) {
        controller._closeRequested = true;
        return;
      }
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (firstPendingPullInto.bytesFilled > 0) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          throw e;
        }
      }
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      const buffer = chunk.buffer;
      const byteOffset = chunk.byteOffset;
      const byteLength = chunk.byteLength;
      const transferredBuffer = TransferArrayBuffer(buffer);
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (IsDetachedBuffer(firstPendingPullInto.buffer))
          ;
        firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
      }
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      if (ReadableStreamHasDefaultReader(stream)) {
        if (ReadableStreamGetNumReadRequests(stream) === 0) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        } else {
          const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
          ReadableStreamFulfillReadRequest(stream, transferredView, false);
        }
      } else if (ReadableStreamHasBYOBReader(stream)) {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      } else {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return;
      }
      ReadableByteStreamControllerClearPendingPullIntos(controller);
      ResetQueue(controller);
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetBYOBRequest(controller) {
      if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
        const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
        controller._byobRequest = byobRequest;
      }
      return controller._byobRequest;
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableByteStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (bytesWritten !== 0) {
          throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        }
      } else {
        if (bytesWritten === 0) {
          throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
        }
        if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
          throw new RangeError("bytesWritten out of range");
        }
      }
      firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
      ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (view.byteLength !== 0) {
          throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        }
      } else {
        if (view.byteLength === 0) {
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        }
      }
      if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
        throw new RangeError("The region specified by view does not match byobRequest");
      }
      if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
        throw new RangeError("The buffer of view has different capacity than byobRequest");
      }
      if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
        throw new RangeError("The region specified by view is larger than byobRequest");
      }
      firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
      ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
      controller._controlledReadableByteStream = stream;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._byobRequest = null;
      controller._queue = controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._closeRequested = false;
      controller._started = false;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      controller._autoAllocateChunkSize = autoAllocateChunkSize;
      controller._pendingPullIntos = new SimpleQueue();
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }, (r2) => {
        ReadableByteStreamControllerError(controller, r2);
      });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
      const controller = Object.create(ReadableByteStreamController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingByteSource.start !== void 0) {
        startAlgorithm = () => underlyingByteSource.start(controller);
      }
      if (underlyingByteSource.pull !== void 0) {
        pullAlgorithm = () => underlyingByteSource.pull(controller);
      }
      if (underlyingByteSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
      }
      const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
      if (autoAllocateChunkSize === 0) {
        throw new TypeError("autoAllocateChunkSize must be greater than 0");
      }
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
      request._associatedReadableByteStreamController = controller;
      request._view = view;
    }
    function byobRequestBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
    }
    function byteStreamControllerBrandCheckException(name) {
      return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
    }
    function AcquireReadableStreamBYOBReader(stream) {
      return new ReadableStreamBYOBReader(stream);
    }
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
      stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readIntoRequest = reader._readIntoRequests.shift();
      if (done) {
        readIntoRequest._closeSteps(chunk);
      } else {
        readIntoRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
      return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamBYOBReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamBYOBReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        if (!IsReadableByteStreamController(stream._readableStreamController)) {
          throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readIntoRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read(view) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("read"));
        }
        if (!ArrayBuffer.isView(view)) {
          return promiseRejectedWith(new TypeError("view must be an array buffer view"));
        }
        if (view.byteLength === 0) {
          return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
        }
        if (view.buffer.byteLength === 0) {
          return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readIntoRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamBYOBReader(this)) {
          throw byobReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readIntoRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBReader",
        configurable: true
      });
    }
    function IsReadableStreamBYOBReader(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
        return false;
      }
      return x2 instanceof ReadableStreamBYOBReader;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "errored") {
        readIntoRequest._errorSteps(stream._storedError);
      } else {
        ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
      }
    }
    function byobReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
    }
    function ExtractHighWaterMark(strategy, defaultHWM) {
      const { highWaterMark } = strategy;
      if (highWaterMark === void 0) {
        return defaultHWM;
      }
      if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
        throw new RangeError("Invalid highWaterMark");
      }
      return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
      const { size } = strategy;
      if (!size) {
        return () => 1;
      }
      return size;
    }
    function convertQueuingStrategy(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
      return {
        highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
        size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
      };
    }
    function convertQueuingStrategySize(fn, context) {
      assertFunction(fn, context);
      return (chunk) => convertUnrestrictedDouble(fn(chunk));
    }
    function convertUnderlyingSink(original, context) {
      assertDictionary(original, context);
      const abort = original === null || original === void 0 ? void 0 : original.abort;
      const close = original === null || original === void 0 ? void 0 : original.close;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      const write = original === null || original === void 0 ? void 0 : original.write;
      return {
        abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
        close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
        write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
        type
      };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context) {
      assertFunction(fn, context);
      return () => promiseCall(fn, original, []);
    }
    function convertUnderlyingSinkStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    function assertWritableStream(x2, context) {
      if (!IsWritableStream(x2)) {
        throw new TypeError(`${context} is not a WritableStream.`);
      }
    }
    function isAbortSignal2(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      try {
        return typeof value.aborted === "boolean";
      } catch (_a2) {
        return false;
      }
    }
    const supportsAbortController = typeof AbortController === "function";
    function createAbortController() {
      if (supportsAbortController) {
        return new AbortController();
      }
      return void 0;
    }
    class WritableStream {
      constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
        if (rawUnderlyingSink === void 0) {
          rawUnderlyingSink = null;
        } else {
          assertObject(rawUnderlyingSink, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
        InitializeWritableStream(this);
        const type = underlyingSink.type;
        if (type !== void 0) {
          throw new RangeError("Invalid type is specified");
        }
        const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
        const highWaterMark = ExtractHighWaterMark(strategy, 1);
        SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
      }
      get locked() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("locked");
        }
        return IsWritableStreamLocked(this);
      }
      abort(reason = void 0) {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("abort"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
        }
        return WritableStreamAbort(this, reason);
      }
      close() {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("close"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
        }
        if (WritableStreamCloseQueuedOrInFlight(this)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamClose(this);
      }
      getWriter() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("getWriter");
        }
        return AcquireWritableStreamDefaultWriter(this);
      }
    }
    Object.defineProperties(WritableStream.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      getWriter: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStream",
        configurable: true
      });
    }
    function AcquireWritableStreamDefaultWriter(stream) {
      return new WritableStreamDefaultWriter(stream);
    }
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(WritableStream.prototype);
      InitializeWritableStream(stream);
      const controller = Object.create(WritableStreamDefaultController.prototype);
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function InitializeWritableStream(stream) {
      stream._state = "writable";
      stream._storedError = void 0;
      stream._writer = void 0;
      stream._writableStreamController = void 0;
      stream._writeRequests = new SimpleQueue();
      stream._inFlightWriteRequest = void 0;
      stream._closeRequest = void 0;
      stream._inFlightCloseRequest = void 0;
      stream._pendingAbortRequest = void 0;
      stream._backpressure = false;
    }
    function IsWritableStream(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
        return false;
      }
      return x2 instanceof WritableStream;
    }
    function IsWritableStreamLocked(stream) {
      if (stream._writer === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamAbort(stream, reason) {
      var _a2;
      if (stream._state === "closed" || stream._state === "errored") {
        return promiseResolvedWith(void 0);
      }
      stream._writableStreamController._abortReason = reason;
      (_a2 = stream._writableStreamController._abortController) === null || _a2 === void 0 ? void 0 : _a2.abort();
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseResolvedWith(void 0);
      }
      if (stream._pendingAbortRequest !== void 0) {
        return stream._pendingAbortRequest._promise;
      }
      let wasAlreadyErroring = false;
      if (state === "erroring") {
        wasAlreadyErroring = true;
        reason = void 0;
      }
      const promise = newPromise((resolve2, reject) => {
        stream._pendingAbortRequest = {
          _promise: void 0,
          _resolve: resolve2,
          _reject: reject,
          _reason: reason,
          _wasAlreadyErroring: wasAlreadyErroring
        };
      });
      stream._pendingAbortRequest._promise = promise;
      if (!wasAlreadyErroring) {
        WritableStreamStartErroring(stream, reason);
      }
      return promise;
    }
    function WritableStreamClose(stream) {
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
      }
      const promise = newPromise((resolve2, reject) => {
        const closeRequest = {
          _resolve: resolve2,
          _reject: reject
        };
        stream._closeRequest = closeRequest;
      });
      const writer = stream._writer;
      if (writer !== void 0 && stream._backpressure && state === "writable") {
        defaultWriterReadyPromiseResolve(writer);
      }
      WritableStreamDefaultControllerClose(stream._writableStreamController);
      return promise;
    }
    function WritableStreamAddWriteRequest(stream) {
      const promise = newPromise((resolve2, reject) => {
        const writeRequest = {
          _resolve: resolve2,
          _reject: reject
        };
        stream._writeRequests.push(writeRequest);
      });
      return promise;
    }
    function WritableStreamDealWithRejection(stream, error2) {
      const state = stream._state;
      if (state === "writable") {
        WritableStreamStartErroring(stream, error2);
        return;
      }
      WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
      const controller = stream._writableStreamController;
      stream._state = "erroring";
      stream._storedError = reason;
      const writer = stream._writer;
      if (writer !== void 0) {
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
      }
      if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
        WritableStreamFinishErroring(stream);
      }
    }
    function WritableStreamFinishErroring(stream) {
      stream._state = "errored";
      stream._writableStreamController[ErrorSteps]();
      const storedError = stream._storedError;
      stream._writeRequests.forEach((writeRequest) => {
        writeRequest._reject(storedError);
      });
      stream._writeRequests = new SimpleQueue();
      if (stream._pendingAbortRequest === void 0) {
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const abortRequest = stream._pendingAbortRequest;
      stream._pendingAbortRequest = void 0;
      if (abortRequest._wasAlreadyErroring) {
        abortRequest._reject(storedError);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
      uponPromise(promise, () => {
        abortRequest._resolve();
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      }, (reason) => {
        abortRequest._reject(reason);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      });
    }
    function WritableStreamFinishInFlightWrite(stream) {
      stream._inFlightWriteRequest._resolve(void 0);
      stream._inFlightWriteRequest = void 0;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error2) {
      stream._inFlightWriteRequest._reject(error2);
      stream._inFlightWriteRequest = void 0;
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamFinishInFlightClose(stream) {
      stream._inFlightCloseRequest._resolve(void 0);
      stream._inFlightCloseRequest = void 0;
      const state = stream._state;
      if (state === "erroring") {
        stream._storedError = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._resolve();
          stream._pendingAbortRequest = void 0;
        }
      }
      stream._state = "closed";
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseResolve(writer);
      }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error2) {
      stream._inFlightCloseRequest._reject(error2);
      stream._inFlightCloseRequest = void 0;
      if (stream._pendingAbortRequest !== void 0) {
        stream._pendingAbortRequest._reject(error2);
        stream._pendingAbortRequest = void 0;
      }
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamCloseQueuedOrInFlight(stream) {
      if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
      if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
      stream._inFlightCloseRequest = stream._closeRequest;
      stream._closeRequest = void 0;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
      stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
      if (stream._closeRequest !== void 0) {
        stream._closeRequest._reject(stream._storedError);
        stream._closeRequest = void 0;
      }
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseReject(writer, stream._storedError);
      }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
      const writer = stream._writer;
      if (writer !== void 0 && backpressure !== stream._backpressure) {
        if (backpressure) {
          defaultWriterReadyPromiseReset(writer);
        } else {
          defaultWriterReadyPromiseResolve(writer);
        }
      }
      stream._backpressure = backpressure;
    }
    class WritableStreamDefaultWriter {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
        assertWritableStream(stream, "First parameter");
        if (IsWritableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive writing by another writer");
        }
        this._ownerWritableStream = stream;
        stream._writer = this;
        const state = stream._state;
        if (state === "writable") {
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
            defaultWriterReadyPromiseInitialize(this);
          } else {
            defaultWriterReadyPromiseInitializeAsResolved(this);
          }
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "erroring") {
          defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "closed") {
          defaultWriterReadyPromiseInitializeAsResolved(this);
          defaultWriterClosedPromiseInitializeAsResolved(this);
        } else {
          const storedError = stream._storedError;
          defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
          defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
        }
      }
      get closed() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      get desiredSize() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("desiredSize");
        }
        if (this._ownerWritableStream === void 0) {
          throw defaultWriterLockException("desiredSize");
        }
        return WritableStreamDefaultWriterGetDesiredSize(this);
      }
      get ready() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
        }
        return this._readyPromise;
      }
      abort(reason = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("abort"));
        }
        return WritableStreamDefaultWriterAbort(this, reason);
      }
      close() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("close"));
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("close"));
        }
        if (WritableStreamCloseQueuedOrInFlight(stream)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamDefaultWriterClose(this);
      }
      releaseLock() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("releaseLock");
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return;
        }
        WritableStreamDefaultWriterRelease(this);
      }
      write(chunk = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("write"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        return WritableStreamDefaultWriterWrite(this, chunk);
      }
    }
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      releaseLock: { enumerable: true },
      write: { enumerable: true },
      closed: { enumerable: true },
      desiredSize: { enumerable: true },
      ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultWriter",
        configurable: true
      });
    }
    function IsWritableStreamDefaultWriter(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
        return false;
      }
      return x2 instanceof WritableStreamDefaultWriter;
    }
    function WritableStreamDefaultWriterAbort(writer, reason) {
      const stream = writer._ownerWritableStream;
      return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
      const stream = writer._ownerWritableStream;
      return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
      if (writer._closedPromiseState === "pending") {
        defaultWriterClosedPromiseReject(writer, error2);
      } else {
        defaultWriterClosedPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
      if (writer._readyPromiseState === "pending") {
        defaultWriterReadyPromiseReject(writer, error2);
      } else {
        defaultWriterReadyPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (state === "errored" || state === "erroring") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
      const stream = writer._ownerWritableStream;
      const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
      WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
      WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
      stream._writer = void 0;
      writer._ownerWritableStream = void 0;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
      const stream = writer._ownerWritableStream;
      const controller = stream._writableStreamController;
      const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
      if (stream !== writer._ownerWritableStream) {
        return promiseRejectedWith(defaultWriterLockException("write to"));
      }
      const state = stream._state;
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
      }
      if (state === "erroring") {
        return promiseRejectedWith(stream._storedError);
      }
      const promise = WritableStreamAddWriteRequest(stream);
      WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
      return promise;
    }
    const closeSentinel = {};
    class WritableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get abortReason() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("abortReason");
        }
        return this._abortReason;
      }
      get signal() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("signal");
        }
        if (this._abortController === void 0) {
          throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
        }
        return this._abortController.signal;
      }
      error(e = void 0) {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("error");
        }
        const state = this._controlledWritableStream._state;
        if (state !== "writable") {
          return;
        }
        WritableStreamDefaultControllerError(this, e);
      }
      [AbortSteps](reason) {
        const result = this._abortAlgorithm(reason);
        WritableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [ErrorSteps]() {
        ResetQueue(this);
      }
    }
    Object.defineProperties(WritableStreamDefaultController.prototype, {
      error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultController",
        configurable: true
      });
    }
    function IsWritableStreamDefaultController(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
        return false;
      }
      return x2 instanceof WritableStreamDefaultController;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledWritableStream = stream;
      stream._writableStreamController = controller;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._abortReason = void 0;
      controller._abortController = createAbortController();
      controller._started = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._writeAlgorithm = writeAlgorithm;
      controller._closeAlgorithm = closeAlgorithm;
      controller._abortAlgorithm = abortAlgorithm;
      const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
      const startResult = startAlgorithm();
      const startPromise = promiseResolvedWith(startResult);
      uponPromise(startPromise, () => {
        controller._started = true;
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (r2) => {
        controller._started = true;
        WritableStreamDealWithRejection(stream, r2);
      });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(WritableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let writeAlgorithm = () => promiseResolvedWith(void 0);
      let closeAlgorithm = () => promiseResolvedWith(void 0);
      let abortAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSink.start !== void 0) {
        startAlgorithm = () => underlyingSink.start(controller);
      }
      if (underlyingSink.write !== void 0) {
        writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
      }
      if (underlyingSink.close !== void 0) {
        closeAlgorithm = () => underlyingSink.close();
      }
      if (underlyingSink.abort !== void 0) {
        abortAlgorithm = (reason) => underlyingSink.abort(reason);
      }
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
      controller._writeAlgorithm = void 0;
      controller._closeAlgorithm = void 0;
      controller._abortAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function WritableStreamDefaultControllerClose(controller) {
      EnqueueValueWithSize(controller, closeSentinel, 0);
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
      try {
        return controller._strategySizeAlgorithm(chunk);
      } catch (chunkSizeE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
        return 1;
      }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
      try {
        EnqueueValueWithSize(controller, chunk, chunkSize);
      } catch (enqueueE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
        return;
      }
      const stream = controller._controlledWritableStream;
      if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
      }
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
      const stream = controller._controlledWritableStream;
      if (!controller._started) {
        return;
      }
      if (stream._inFlightWriteRequest !== void 0) {
        return;
      }
      const state = stream._state;
      if (state === "erroring") {
        WritableStreamFinishErroring(stream);
        return;
      }
      if (controller._queue.length === 0) {
        return;
      }
      const value = PeekQueueValue(controller);
      if (value === closeSentinel) {
        WritableStreamDefaultControllerProcessClose(controller);
      } else {
        WritableStreamDefaultControllerProcessWrite(controller, value);
      }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
      if (controller._controlledWritableStream._state === "writable") {
        WritableStreamDefaultControllerError(controller, error2);
      }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkCloseRequestInFlight(stream);
      DequeueValue(controller);
      const sinkClosePromise = controller._closeAlgorithm();
      WritableStreamDefaultControllerClearAlgorithms(controller);
      uponPromise(sinkClosePromise, () => {
        WritableStreamFinishInFlightClose(stream);
      }, (reason) => {
        WritableStreamFinishInFlightCloseWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkFirstWriteRequestInFlight(stream);
      const sinkWritePromise = controller._writeAlgorithm(chunk);
      uponPromise(sinkWritePromise, () => {
        WritableStreamFinishInFlightWrite(stream);
        const state = stream._state;
        DequeueValue(controller);
        if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (reason) => {
        if (stream._state === "writable") {
          WritableStreamDefaultControllerClearAlgorithms(controller);
        }
        WritableStreamFinishInFlightWriteWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
      const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
      return desiredSize <= 0;
    }
    function WritableStreamDefaultControllerError(controller, error2) {
      const stream = controller._controlledWritableStream;
      WritableStreamDefaultControllerClearAlgorithms(controller);
      WritableStreamStartErroring(stream, error2);
    }
    function streamBrandCheckException$2(name) {
      return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
    }
    function defaultControllerBrandCheckException$2(name) {
      return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
    }
    function defaultWriterBrandCheckException(name) {
      return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
    }
    function defaultWriterLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released writer");
    }
    function defaultWriterClosedPromiseInitialize(writer) {
      writer._closedPromise = newPromise((resolve2, reject) => {
        writer._closedPromise_resolve = resolve2;
        writer._closedPromise_reject = reject;
        writer._closedPromiseState = "pending";
      });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
      if (writer._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._closedPromise);
      writer._closedPromise_reject(reason);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "rejected";
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
      defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
      if (writer._closedPromise_resolve === void 0) {
        return;
      }
      writer._closedPromise_resolve(void 0);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "resolved";
    }
    function defaultWriterReadyPromiseInitialize(writer) {
      writer._readyPromise = newPromise((resolve2, reject) => {
        writer._readyPromise_resolve = resolve2;
        writer._readyPromise_reject = reject;
      });
      writer._readyPromiseState = "pending";
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
      if (writer._readyPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._readyPromise);
      writer._readyPromise_reject(reason);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "rejected";
    }
    function defaultWriterReadyPromiseReset(writer) {
      defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
      defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
      if (writer._readyPromise_resolve === void 0) {
        return;
      }
      writer._readyPromise_resolve(void 0);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "fulfilled";
    }
    const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
    function isDOMExceptionConstructor(ctor) {
      if (!(typeof ctor === "function" || typeof ctor === "object")) {
        return false;
      }
      try {
        new ctor();
        return true;
      } catch (_a2) {
        return false;
      }
    }
    function createDOMExceptionPolyfill() {
      const ctor = function DOMException2(message, name) {
        this.message = message || "";
        this.name = name || "Error";
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      };
      ctor.prototype = Object.create(Error.prototype);
      Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
      return ctor;
    }
    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
      const reader = AcquireReadableStreamDefaultReader(source);
      const writer = AcquireWritableStreamDefaultWriter(dest);
      source._disturbed = true;
      let shuttingDown = false;
      let currentWrite = promiseResolvedWith(void 0);
      return newPromise((resolve2, reject) => {
        let abortAlgorithm;
        if (signal !== void 0) {
          abortAlgorithm = () => {
            const error2 = new DOMException$1("Aborted", "AbortError");
            const actions = [];
            if (!preventAbort) {
              actions.push(() => {
                if (dest._state === "writable") {
                  return WritableStreamAbort(dest, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            if (!preventCancel) {
              actions.push(() => {
                if (source._state === "readable") {
                  return ReadableStreamCancel(source, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
          };
          if (signal.aborted) {
            abortAlgorithm();
            return;
          }
          signal.addEventListener("abort", abortAlgorithm);
        }
        function pipeLoop() {
          return newPromise((resolveLoop, rejectLoop) => {
            function next(done) {
              if (done) {
                resolveLoop();
              } else {
                PerformPromiseThen(pipeStep(), next, rejectLoop);
              }
            }
            next(false);
          });
        }
        function pipeStep() {
          if (shuttingDown) {
            return promiseResolvedWith(true);
          }
          return PerformPromiseThen(writer._readyPromise, () => {
            return newPromise((resolveRead, rejectRead) => {
              ReadableStreamDefaultReaderRead(reader, {
                _chunkSteps: (chunk) => {
                  currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                  resolveRead(false);
                },
                _closeSteps: () => resolveRead(true),
                _errorSteps: rejectRead
              });
            });
          });
        }
        isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
          if (!preventAbort) {
            shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesClosed(source, reader._closedPromise, () => {
          if (!preventClose) {
            shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
          } else {
            shutdown();
          }
        });
        if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
          const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
          } else {
            shutdown(true, destClosed);
          }
        }
        setPromiseIsHandledToTrue(pipeLoop());
        function waitForWritesToFinish() {
          const oldCurrentWrite = currentWrite;
          return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
        }
        function isOrBecomesErrored(stream, promise, action) {
          if (stream._state === "errored") {
            action(stream._storedError);
          } else {
            uponRejection(promise, action);
          }
        }
        function isOrBecomesClosed(stream, promise, action) {
          if (stream._state === "closed") {
            action();
          } else {
            uponFulfillment(promise, action);
          }
        }
        function shutdownWithAction(action, originalIsError, originalError) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), doTheRest);
          } else {
            doTheRest();
          }
          function doTheRest() {
            uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
          }
        }
        function shutdown(isError, error2) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
          } else {
            finalize(isError, error2);
          }
        }
        function finalize(isError, error2) {
          WritableStreamDefaultWriterRelease(writer);
          ReadableStreamReaderGenericRelease(reader);
          if (signal !== void 0) {
            signal.removeEventListener("abort", abortAlgorithm);
          }
          if (isError) {
            reject(error2);
          } else {
            resolve2(void 0);
          }
        }
      });
    }
    class ReadableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("desiredSize");
        }
        return ReadableStreamDefaultControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("close");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits close");
        }
        ReadableStreamDefaultControllerClose(this);
      }
      enqueue(chunk = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("enqueue");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits enqueue");
        }
        return ReadableStreamDefaultControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("error");
        }
        ReadableStreamDefaultControllerError(this, e);
      }
      [CancelSteps](reason) {
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableStream;
        if (this._queue.length > 0) {
          const chunk = DequeueValue(this);
          if (this._closeRequested && this._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(this);
            ReadableStreamClose(stream);
          } else {
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
          readRequest._chunkSteps(chunk);
        } else {
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }
      }
    }
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultController",
        configurable: true
      });
    }
    function IsReadableStreamDefaultController(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
        return false;
      }
      return x2 instanceof ReadableStreamDefaultController;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableStreamDefaultControllerError(controller, e);
      });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableStream;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function ReadableStreamDefaultControllerClose(controller) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      controller._closeRequested = true;
      if (controller._queue.length === 0) {
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        ReadableStreamFulfillReadRequest(stream, chunk, false);
      } else {
        let chunkSize;
        try {
          chunkSize = controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          ReadableStreamDefaultControllerError(controller, chunkSizeE);
          throw chunkSizeE;
        }
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          ReadableStreamDefaultControllerError(controller, enqueueE);
          throw enqueueE;
        }
      }
      ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
      const stream = controller._controlledReadableStream;
      if (stream._state !== "readable") {
        return;
      }
      ResetQueue(controller);
      ReadableStreamDefaultControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
      if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
        return false;
      }
      return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
      const state = controller._controlledReadableStream._state;
      if (!controller._closeRequested && state === "readable") {
        return true;
      }
      return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledReadableStream = stream;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._started = false;
      controller._closeRequested = false;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }, (r2) => {
        ReadableStreamDefaultControllerError(controller, r2);
      });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSource.start !== void 0) {
        startAlgorithm = () => underlyingSource.start(controller);
      }
      if (underlyingSource.pull !== void 0) {
        pullAlgorithm = () => underlyingSource.pull(controller);
      }
      if (underlyingSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
      }
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function defaultControllerBrandCheckException$1(name) {
      return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
    }
    function ReadableStreamTee(stream, cloneForBranch2) {
      if (IsReadableByteStreamController(stream._readableStreamController)) {
        return ReadableByteStreamTee(stream);
      }
      return ReadableStreamDefaultTee(stream);
    }
    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve2) => {
        resolveCancelPromise = resolve2;
      });
      function pullAlgorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              const chunk2 = chunk;
              if (!canceled1) {
                ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableStreamDefaultControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableStreamDefaultControllerClose(branch2._readableStreamController);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
      }
      branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
      branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
      uponRejection(reader._closedPromise, (r2) => {
        ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
        ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
        if (!canceled1 || !canceled2) {
          resolveCancelPromise(void 0);
        }
      });
      return [branch1, branch2];
    }
    function ReadableByteStreamTee(stream) {
      let reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve2) => {
        resolveCancelPromise = resolve2;
      });
      function forwardReaderError(thisReader) {
        uponRejection(thisReader._closedPromise, (r2) => {
          if (thisReader !== reader) {
            return;
          }
          ReadableByteStreamControllerError(branch1._readableStreamController, r2);
          ReadableByteStreamControllerError(branch2._readableStreamController, r2);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
      }
      function pullWithDefaultReader() {
        if (IsReadableStreamBYOBReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamDefaultReader(stream);
          forwardReaderError(reader);
        }
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              let chunk2 = chunk;
              if (!canceled1 && !canceled2) {
                try {
                  chunk2 = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
              }
              if (!canceled1) {
                ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableByteStreamControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableByteStreamControllerClose(branch2._readableStreamController);
            }
            if (branch1._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
            }
            if (branch2._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
      }
      function pullWithBYOBReader(view, forBranch2) {
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamBYOBReader(stream);
          forwardReaderError(reader);
        }
        const byobBranch = forBranch2 ? branch2 : branch1;
        const otherBranch = forBranch2 ? branch1 : branch2;
        const readIntoRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!otherCanceled) {
                let clonedChunk;
                try {
                  clonedChunk = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
              } else if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
            });
          },
          _closeSteps: (chunk) => {
            reading = false;
            const byobCanceled = forBranch2 ? canceled2 : canceled1;
            const otherCanceled = forBranch2 ? canceled1 : canceled2;
            if (!byobCanceled) {
              ReadableByteStreamControllerClose(byobBranch._readableStreamController);
            }
            if (!otherCanceled) {
              ReadableByteStreamControllerClose(otherBranch._readableStreamController);
            }
            if (chunk !== void 0) {
              if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
              if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
              }
            }
            if (!byobCanceled || !otherCanceled) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
      }
      function pull1Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, false);
        }
        return promiseResolvedWith(void 0);
      }
      function pull2Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, true);
        }
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
        return;
      }
      branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
      branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
      forwardReaderError(reader);
      return [branch1, branch2];
    }
    function convertUnderlyingDefaultOrByteSource(source, context) {
      assertDictionary(source, context);
      const original = source;
      const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
      const cancel = original === null || original === void 0 ? void 0 : original.cancel;
      const pull = original === null || original === void 0 ? void 0 : original.pull;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      return {
        autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
        cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
        pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
        type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
      };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSourcePullCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertUnderlyingSourceStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertReadableStreamType(type, context) {
      type = `${type}`;
      if (type !== "bytes") {
        throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
      }
      return type;
    }
    function convertReaderOptions(options2, context) {
      assertDictionary(options2, context);
      const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
      return {
        mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
      };
    }
    function convertReadableStreamReaderMode(mode, context) {
      mode = `${mode}`;
      if (mode !== "byob") {
        throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
      }
      return mode;
    }
    function convertIteratorOptions(options2, context) {
      assertDictionary(options2, context);
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      return { preventCancel: Boolean(preventCancel) };
    }
    function convertPipeOptions(options2, context) {
      assertDictionary(options2, context);
      const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
      const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
      if (signal !== void 0) {
        assertAbortSignal(signal, `${context} has member 'signal' that`);
      }
      return {
        preventAbort: Boolean(preventAbort),
        preventCancel: Boolean(preventCancel),
        preventClose: Boolean(preventClose),
        signal
      };
    }
    function assertAbortSignal(signal, context) {
      if (!isAbortSignal2(signal)) {
        throw new TypeError(`${context} is not an AbortSignal.`);
      }
    }
    function convertReadableWritablePair(pair, context) {
      assertDictionary(pair, context);
      const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
      assertRequiredField(readable2, "readable", "ReadableWritablePair");
      assertReadableStream(readable2, `${context} has member 'readable' that`);
      const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
      assertRequiredField(writable2, "writable", "ReadableWritablePair");
      assertWritableStream(writable2, `${context} has member 'writable' that`);
      return { readable: readable2, writable: writable2 };
    }
    class ReadableStream2 {
      constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
        if (rawUnderlyingSource === void 0) {
          rawUnderlyingSource = null;
        } else {
          assertObject(rawUnderlyingSource, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
        InitializeReadableStream(this);
        if (underlyingSource.type === "bytes") {
          if (strategy.size !== void 0) {
            throw new RangeError("The strategy for a byte stream cannot have a size function");
          }
          const highWaterMark = ExtractHighWaterMark(strategy, 0);
          SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
        } else {
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
        }
      }
      get locked() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("locked");
        }
        return IsReadableStreamLocked(this);
      }
      cancel(reason = void 0) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("cancel"));
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
        }
        return ReadableStreamCancel(this, reason);
      }
      getReader(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("getReader");
        }
        const options2 = convertReaderOptions(rawOptions, "First parameter");
        if (options2.mode === void 0) {
          return AcquireReadableStreamDefaultReader(this);
        }
        return AcquireReadableStreamBYOBReader(this);
      }
      pipeThrough(rawTransform, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("pipeThrough");
        }
        assertRequiredArgument(rawTransform, 1, "pipeThrough");
        const transform = convertReadableWritablePair(rawTransform, "First parameter");
        const options2 = convertPipeOptions(rawOptions, "Second parameter");
        if (IsReadableStreamLocked(this)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
        }
        if (IsWritableStreamLocked(transform.writable)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
        }
        const promise = ReadableStreamPipeTo(this, transform.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
        setPromiseIsHandledToTrue(promise);
        return transform.readable;
      }
      pipeTo(destination, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
        }
        if (destination === void 0) {
          return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
        }
        if (!IsWritableStream(destination)) {
          return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
        }
        let options2;
        try {
          options2 = convertPipeOptions(rawOptions, "Second parameter");
        } catch (e) {
          return promiseRejectedWith(e);
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
        }
        if (IsWritableStreamLocked(destination)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
        }
        return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
      }
      tee() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("tee");
        }
        const branches = ReadableStreamTee(this);
        return CreateArrayFromList(branches);
      }
      values(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("values");
        }
        const options2 = convertIteratorOptions(rawOptions, "First parameter");
        return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
      }
    }
    Object.defineProperties(ReadableStream2.prototype, {
      cancel: { enumerable: true },
      getReader: { enumerable: true },
      pipeThrough: { enumerable: true },
      pipeTo: { enumerable: true },
      tee: { enumerable: true },
      values: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStream",
        configurable: true
      });
    }
    if (typeof SymbolPolyfill.asyncIterator === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
    }
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableByteStreamController.prototype);
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
      return stream;
    }
    function InitializeReadableStream(stream) {
      stream._state = "readable";
      stream._reader = void 0;
      stream._storedError = void 0;
      stream._disturbed = false;
    }
    function IsReadableStream(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
        return false;
      }
      return x2 instanceof ReadableStream2;
    }
    function IsReadableStreamLocked(stream) {
      if (stream._reader === void 0) {
        return false;
      }
      return true;
    }
    function ReadableStreamCancel(stream, reason) {
      stream._disturbed = true;
      if (stream._state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (stream._state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      ReadableStreamClose(stream);
      const reader = stream._reader;
      if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._closeSteps(void 0);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
      const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
      return transformPromiseWith(sourceCancelPromise, noop2);
    }
    function ReadableStreamClose(stream) {
      stream._state = "closed";
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseResolve(reader);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._closeSteps();
        });
        reader._readRequests = new SimpleQueue();
      }
    }
    function ReadableStreamError(stream, e) {
      stream._state = "errored";
      stream._storedError = e;
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseReject(reader, e);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e);
        });
        reader._readRequests = new SimpleQueue();
      } else {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
    }
    function streamBrandCheckException$1(name) {
      return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
    }
    function convertQueuingStrategyInit(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
      return {
        highWaterMark: convertUnrestrictedDouble(highWaterMark)
      };
    }
    const byteLengthSizeFunction = (chunk) => {
      return chunk.byteLength;
    };
    Object.defineProperty(byteLengthSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class ByteLengthQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("highWaterMark");
        }
        return this._byteLengthQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("size");
        }
        return byteLengthSizeFunction;
      }
    }
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "ByteLengthQueuingStrategy",
        configurable: true
      });
    }
    function byteLengthBrandCheckException(name) {
      return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
    }
    function IsByteLengthQueuingStrategy(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x2 instanceof ByteLengthQueuingStrategy;
    }
    const countSizeFunction = () => {
      return 1;
    };
    Object.defineProperty(countSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class CountQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "CountQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("highWaterMark");
        }
        return this._countQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("size");
        }
        return countSizeFunction;
      }
    }
    Object.defineProperties(CountQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "CountQueuingStrategy",
        configurable: true
      });
    }
    function countBrandCheckException(name) {
      return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
    }
    function IsCountQueuingStrategy(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x2 instanceof CountQueuingStrategy;
    }
    function convertTransformer(original, context) {
      assertDictionary(original, context);
      const flush = original === null || original === void 0 ? void 0 : original.flush;
      const readableType = original === null || original === void 0 ? void 0 : original.readableType;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const transform = original === null || original === void 0 ? void 0 : original.transform;
      const writableType = original === null || original === void 0 ? void 0 : original.writableType;
      return {
        flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
        readableType,
        start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
        transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
        writableType
      };
    }
    function convertTransformerFlushCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertTransformerStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertTransformerTransformCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    class TransformStream {
      constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
        if (rawTransformer === void 0) {
          rawTransformer = null;
        }
        const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
        const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
        const transformer = convertTransformer(rawTransformer, "First parameter");
        if (transformer.readableType !== void 0) {
          throw new RangeError("Invalid readableType specified");
        }
        if (transformer.writableType !== void 0) {
          throw new RangeError("Invalid writableType specified");
        }
        const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
        const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
        const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
        const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
        let startPromise_resolve;
        const startPromise = newPromise((resolve2) => {
          startPromise_resolve = resolve2;
        });
        InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
        if (transformer.start !== void 0) {
          startPromise_resolve(transformer.start(this._transformStreamController));
        } else {
          startPromise_resolve(void 0);
        }
      }
      get readable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("readable");
        }
        return this._readable;
      }
      get writable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("writable");
        }
        return this._writable;
      }
    }
    Object.defineProperties(TransformStream.prototype, {
      readable: { enumerable: true },
      writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStream",
        configurable: true
      });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
      function startAlgorithm() {
        return startPromise;
      }
      function writeAlgorithm(chunk) {
        return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
      }
      function abortAlgorithm(reason) {
        return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
      }
      function closeAlgorithm() {
        return TransformStreamDefaultSinkCloseAlgorithm(stream);
      }
      stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
      function pullAlgorithm() {
        return TransformStreamDefaultSourcePullAlgorithm(stream);
      }
      function cancelAlgorithm(reason) {
        TransformStreamErrorWritableAndUnblockWrite(stream, reason);
        return promiseResolvedWith(void 0);
      }
      stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
      stream._backpressure = void 0;
      stream._backpressureChangePromise = void 0;
      stream._backpressureChangePromise_resolve = void 0;
      TransformStreamSetBackpressure(stream, true);
      stream._transformStreamController = void 0;
    }
    function IsTransformStream(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
        return false;
      }
      return x2 instanceof TransformStream;
    }
    function TransformStreamError(stream, e) {
      ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
      TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
      TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
      WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
      if (stream._backpressure) {
        TransformStreamSetBackpressure(stream, false);
      }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
      if (stream._backpressureChangePromise !== void 0) {
        stream._backpressureChangePromise_resolve();
      }
      stream._backpressureChangePromise = newPromise((resolve2) => {
        stream._backpressureChangePromise_resolve = resolve2;
      });
      stream._backpressure = backpressure;
    }
    class TransformStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("desiredSize");
        }
        const readableController = this._controlledTransformStream._readable._readableStreamController;
        return ReadableStreamDefaultControllerGetDesiredSize(readableController);
      }
      enqueue(chunk = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("enqueue");
        }
        TransformStreamDefaultControllerEnqueue(this, chunk);
      }
      error(reason = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("error");
        }
        TransformStreamDefaultControllerError(this, reason);
      }
      terminate() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("terminate");
        }
        TransformStreamDefaultControllerTerminate(this);
      }
    }
    Object.defineProperties(TransformStreamDefaultController.prototype, {
      enqueue: { enumerable: true },
      error: { enumerable: true },
      terminate: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStreamDefaultController",
        configurable: true
      });
    }
    function IsTransformStreamDefaultController(x2) {
      if (!typeIsObject(x2)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
        return false;
      }
      return x2 instanceof TransformStreamDefaultController;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
      controller._controlledTransformStream = stream;
      stream._transformStreamController = controller;
      controller._transformAlgorithm = transformAlgorithm;
      controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
      const controller = Object.create(TransformStreamDefaultController.prototype);
      let transformAlgorithm = (chunk) => {
        try {
          TransformStreamDefaultControllerEnqueue(controller, chunk);
          return promiseResolvedWith(void 0);
        } catch (transformResultE) {
          return promiseRejectedWith(transformResultE);
        }
      };
      let flushAlgorithm = () => promiseResolvedWith(void 0);
      if (transformer.transform !== void 0) {
        transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
      }
      if (transformer.flush !== void 0) {
        flushAlgorithm = () => transformer.flush(controller);
      }
      SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
      controller._transformAlgorithm = void 0;
      controller._flushAlgorithm = void 0;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
        throw new TypeError("Readable side is not in a state that permits enqueue");
      }
      try {
        ReadableStreamDefaultControllerEnqueue(readableController, chunk);
      } catch (e) {
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
        throw stream._readable._storedError;
      }
      const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
      if (backpressure !== stream._backpressure) {
        TransformStreamSetBackpressure(stream, true);
      }
    }
    function TransformStreamDefaultControllerError(controller, e) {
      TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
      const transformPromise = controller._transformAlgorithm(chunk);
      return transformPromiseWith(transformPromise, void 0, (r2) => {
        TransformStreamError(controller._controlledTransformStream, r2);
        throw r2;
      });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      ReadableStreamDefaultControllerClose(readableController);
      const error2 = new TypeError("TransformStream terminated");
      TransformStreamErrorWritableAndUnblockWrite(stream, error2);
    }
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
      const controller = stream._transformStreamController;
      if (stream._backpressure) {
        const backpressureChangePromise = stream._backpressureChangePromise;
        return transformPromiseWith(backpressureChangePromise, () => {
          const writable2 = stream._writable;
          const state = writable2._state;
          if (state === "erroring") {
            throw writable2._storedError;
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        });
      }
      return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
      TransformStreamError(stream, reason);
      return promiseResolvedWith(void 0);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
      const readable2 = stream._readable;
      const controller = stream._transformStreamController;
      const flushPromise = controller._flushAlgorithm();
      TransformStreamDefaultControllerClearAlgorithms(controller);
      return transformPromiseWith(flushPromise, () => {
        if (readable2._state === "errored") {
          throw readable2._storedError;
        }
        ReadableStreamDefaultControllerClose(readable2._readableStreamController);
      }, (r2) => {
        TransformStreamError(stream, r2);
        throw readable2._storedError;
      });
    }
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
      TransformStreamSetBackpressure(stream, false);
      return stream._backpressureChangePromise;
    }
    function defaultControllerBrandCheckException(name) {
      return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
    }
    function streamBrandCheckException(name) {
      return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
    }
    exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports2.CountQueuingStrategy = CountQueuingStrategy;
    exports2.ReadableByteStreamController = ReadableByteStreamController;
    exports2.ReadableStream = ReadableStream2;
    exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports2.TransformStream = TransformStream;
    exports2.TransformStreamDefaultController = TransformStreamDefaultController;
    exports2.WritableStream = WritableStream;
    exports2.WritableStreamDefaultController = WritableStreamDefaultController;
    exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(ponyfill_es2018, ponyfill_es2018.exports);
var POOL_SIZE$1 = 65536;
if (!globalThis.ReadableStream) {
  try {
    Object.assign(globalThis, require("stream/web"));
  } catch (error2) {
    Object.assign(globalThis, ponyfill_es2018.exports);
  }
}
try {
  const { Blob: Blob3 } = require("buffer");
  if (Blob3 && !Blob3.prototype.stream) {
    Blob3.prototype.stream = function name(params) {
      let position = 0;
      const blob = this;
      return new ReadableStream({
        type: "bytes",
        async pull(ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));
          if (position === blob.size) {
            ctrl.close();
          }
        }
      });
    };
  }
} catch (error2) {
}
var POOL_SIZE = 65536;
async function* toIterator(parts, clone2 = true) {
  for (let part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        let end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var _Blob = class Blob {
  #parts = [];
  #type = "";
  #size = 0;
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let part;
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0));
      } else if (element instanceof Blob) {
        part = element;
      } else {
        part = new TextEncoder().encode(element);
      }
      size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
      return part;
    });
    const type = options2.type === void 0 ? "" : String(options2.type);
    this.#type = /[^\u0020-\u007E]/.test(type) ? "" : type;
    this.#size = size;
    this.#parts = parts;
  }
  get size() {
    return this.#size;
  }
  get type() {
    return this.#type;
  }
  async text() {
    const decoder = new TextDecoder();
    let str = "";
    for await (let part of toIterator(this.#parts, false)) {
      str += decoder.decode(part, { stream: true });
    }
    str += decoder.decode();
    return str;
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of toIterator(this.#parts, false)) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    const it = toIterator(this.#parts, true);
    return new ReadableStream({
      type: "bytes",
      async pull(ctrl) {
        const chunk = await it.next();
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
      }
    });
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = this.#parts;
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      if (added >= span) {
        break;
      }
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        let chunk;
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.byteLength;
        } else {
          chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.size;
        }
        blobParts.push(chunk);
        relativeStart = 0;
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    blob.#size = span;
    blob.#parts = blobParts;
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var Blob2 = _Blob;
var Blob$1 = Blob2;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    length += isBlob(value) ? value.size : Buffer.byteLength(String(value));
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (error_) => {
        const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = import_stream.default.Readable.from(body.stream());
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c2) => typeof c2 === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    import_stream.default.Readable.from(body.stream()).pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error2;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
    throw error2;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p2, receiver) {
        switch (p2) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p2].call(target, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p2].call(target, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p2, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status != null ? options2.status : 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      type: "default",
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$1].type;
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS$1].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), reject) : (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), reject);
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}

// .svelte-kit/output/server/app.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive$1(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a2, b2) {
    return b2[1] - a2[1];
  }).forEach(function(entry, i2) {
    names.set(entry[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive$1(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v2, i2) {
          return i2 in thing ? stringify(v2) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive$1(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v2, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v2));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v2) {
            return "add(" + stringify(v2) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a2) {
            var k2 = _a2[0], v2 = _a2[1];
            return "set(" + stringify(k2) + ", " + stringify(v2) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive$1(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c2) {
  return escaped$1[c2] || c2;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal$1(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || (a2 && typeof a2 === "object" || typeof a2 === "function");
}
Promise.resolve();
var subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue$1.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue$1.length; i2 += 2) {
            subscriber_queue$1[i2][0](subscriber_queue$1[i2 + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape$1(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape$1(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape$1(str, dict, unicode_encoder) {
  let result = "";
  for (let i2 = 0; i2 < str.length; i2 += 1) {
    const char = str.charAt(i2);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var s$2 = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s$2(response2.statusText)},"headers":${s$2(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i2 === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options2.load_component(route.b[i2]);
                let node_loaded;
                let j2 = i2;
                while (!(node_loaded = branch[j2])) {
                  j2 -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j2 + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield [key, value[i2]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield [key, value[i2]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield value[i2];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q2 = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q2 ? `?${q2}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || (a2 && typeof a2 === "object" || typeof a2 === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$4 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$4);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.svg" />\n		<link rel="stylesheet" href="https://use.typekit.net/aeh4acf.css">\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<meta property="og:title" content="Creative Studio" />\n		<meta property="og:url" content="https://superbonjour.com/" />\n		<meta property="og:type" content="website" />\n		<meta property="og:description" content="We specialize in strategy, branding & content. We work with brands seeking cultural relevance. We advocate for progressive & sustainable values." />\n		<meta property="og:image" content="https://res.cloudinary.com/dzzdoq1bq/image/upload/v1638569218/static/images/HSCo_Mag_1.jpg" />\n		<meta property="og:image:alt" content="Photo print magazine" />\n		<meta name="google-site-verification" content="nZ19c6GCLRtUanJqIj2jl20RVItk9pBtxHTXDTuchw4" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-b9b09144.js",
      css: [assets + "/_app/assets/start-61d1577b.css"],
      js: [assets + "/_app/start-b9b09144.js", assets + "/_app/chunks/vendor-921ac85d.js", assets + "/_app/chunks/preload-helper-ec9aa979.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": ".DS_Store", "size": 10244, "type": null }, { "file": ".cld-sync", "size": 632, "type": null }, { "file": "favicon.svg", "size": 1690, "type": "image/svg+xml" }, { "file": "images/00-sb-logo-simple-white.svg", "size": 3555, "type": "image/svg+xml" }, { "file": "images/01-sb_cis_7.jpg", "size": 936476, "type": "image/jpeg" }, { "file": "images/01_details_matter.jpg", "size": 892851, "type": "image/jpeg" }, { "file": "images/01_lay_the_table-03.jpg", "size": 846632, "type": "image/jpeg" }, { "file": "images/02-sb_aldo2.jpg", "size": 513657, "type": "image/jpeg" }, { "file": "images/03_back_in_stock.jpg", "size": 633511, "type": "image/jpeg" }, { "file": "images/04-sb_rise_1b.jpg", "size": 866591, "type": "image/jpeg" }, { "file": "images/04_lay_the_table-04.jpg", "size": 1110764, "type": "image/jpeg" }, { "file": "images/05-sb_ka_1.jpg", "size": 423941, "type": "image/jpeg" }, { "file": "images/05_come_together-02.jpg", "size": 691451, "type": "image/jpeg" }, { "file": "images/06-sb_cis_2.jpg", "size": 861695, "type": "image/jpeg" }, { "file": "images/06_shot_so_fresh.jpg", "size": 820362, "type": "image/jpeg" }, { "file": "images/07-sb_cis_3.jpg", "size": 6690500, "type": "image/jpeg" }, { "file": "images/08-sb-boxts.jpg", "size": 324742, "type": "image/jpeg" }, { "file": "images/09-sb_ka_3.jpg", "size": 451988, "type": "image/jpeg" }, { "file": "images/10-sb_4.jpg", "size": 409395, "type": "image/jpeg" }, { "file": "images/11-sb_2.jpg", "size": 413605, "type": "image/jpeg" }, { "file": "images/12-sb-berlinb.jpg", "size": 478686, "type": "image/jpeg" }, { "file": "images/13-sb_rise_4b.jpg", "size": 642599, "type": "image/jpeg" }, { "file": "images/14-sb_cis_6.jpg", "size": 455580, "type": "image/jpeg" }, { "file": "images/16-sb_boy_1.jpg", "size": 678003, "type": "image/jpeg" }, { "file": "images/17-sb_cis_5.jpg", "size": 896156, "type": "image/jpeg" }, { "file": "images/18-sb-denisets.jpg", "size": 339746, "type": "image/jpeg" }, { "file": "images/19-sb_cis_9b.jpg", "size": 1003272, "type": "image/jpeg" }, { "file": "images/20-sb-rentree4.jpg", "size": 372465, "type": "image/jpeg" }, { "file": "images/21-sb_cis_8.jpg", "size": 1625599, "type": "image/jpeg" }, { "file": "images/22-sb_rise_3.jpg", "size": 350799, "type": "image/jpeg" }, { "file": "images/23-sb-aluminium3.jpg", "size": 507473, "type": "image/jpeg" }, { "file": "images/24-sb_cis_10.jpg", "size": 360673, "type": "image/jpeg" }, { "file": "images/ALTI_1.jpg", "size": 245008, "type": "image/jpeg" }, { "file": "images/ALTI_2.jpg", "size": 312585, "type": "image/jpeg" }, { "file": "images/ALTI_3.jpg", "size": 224380, "type": "image/jpeg" }, { "file": "images/ALTI_4.jpg", "size": 187587, "type": "image/jpeg" }, { "file": "images/ALTI_5.jpg", "size": 250790, "type": "image/jpeg" }, { "file": "images/ALTI_6.jpg", "size": 179118, "type": "image/jpeg" }, { "file": "images/CIS_1.jpg", "size": 177529, "type": "image/jpeg" }, { "file": "images/CIS_2.jpg", "size": 100017, "type": "image/jpeg" }, { "file": "images/CIS_3.jpg", "size": 355003, "type": "image/jpeg" }, { "file": "images/CIS_4.jpg", "size": 181623, "type": "image/jpeg" }, { "file": "images/CIS_5.jpg", "size": 190280, "type": "image/jpeg" }, { "file": "images/CIS_6.jpg", "size": 111182, "type": "image/jpeg" }, { "file": "images/CIS_7.jpg", "size": 323030, "type": "image/jpeg" }, { "file": "images/CIS_7x.jpg", "size": 2373085, "type": "image/jpeg" }, { "file": "images/CIS_8.jpg", "size": 296499, "type": "image/jpeg" }, { "file": "images/DT1_1.jpg", "size": 284637, "type": "image/jpeg" }, { "file": "images/DT1_2.jpg", "size": 440378, "type": "image/jpeg" }, { "file": "images/DT1_3.jpg", "size": 146319, "type": "image/jpeg" }, { "file": "images/DT1_4.jpg", "size": 298385, "type": "image/jpeg" }, { "file": "images/DT1_5.jpg", "size": 163723, "type": "image/jpeg" }, { "file": "images/DT1_6.jpg", "size": 150404, "type": "image/jpeg" }, { "file": "images/DT1_7.jpg", "size": 161637, "type": "image/jpeg" }, { "file": "images/DT_2_1.jpg", "size": 280701, "type": "image/jpeg" }, { "file": "images/DT_2_2.jpg", "size": 251784, "type": "image/jpeg" }, { "file": "images/DT_2_3.jpg", "size": 288733, "type": "image/jpeg" }, { "file": "images/DT_2_4.jpg", "size": 276532, "type": "image/jpeg" }, { "file": "images/DT_2_5x.jpg", "size": 818152, "type": "image/jpeg" }, { "file": "images/DT_2_6.jpg", "size": 219467, "type": "image/jpeg" }, { "file": "images/DT_2_7.jpg", "size": 186348, "type": "image/jpeg" }, { "file": "images/Fable_1.jpg", "size": 139592, "type": "image/jpeg" }, { "file": "images/Fable_2.jpg", "size": 166959, "type": "image/jpeg" }, { "file": "images/Fable_3.jpg", "size": 85499, "type": "image/jpeg" }, { "file": "images/Fable_4.jpg", "size": 177611, "type": "image/jpeg" }, { "file": "images/Fable_5.jpg", "size": 205081, "type": "image/jpeg" }, { "file": "images/Fable_6.jpg", "size": 1390640, "type": "image/jpeg" }, { "file": "images/GHANA_1.jpg", "size": 260064, "type": "image/jpeg" }, { "file": "images/GHANA_10.jpg", "size": 308009, "type": "image/jpeg" }, { "file": "images/GHANA_11.jpg", "size": 292787, "type": "image/jpeg" }, { "file": "images/GHANA_2.jpg", "size": 213225, "type": "image/jpeg" }, { "file": "images/GHANA_3.jpg", "size": 263638, "type": "image/jpeg" }, { "file": "images/GHANA_4.jpg", "size": 118530, "type": "image/jpeg" }, { "file": "images/GHANA_5.jpg", "size": 304180, "type": "image/jpeg" }, { "file": "images/GHANA_6.jpg", "size": 284846, "type": "image/jpeg" }, { "file": "images/GHANA_7.jpg", "size": 300028, "type": "image/jpeg" }, { "file": "images/GHANA_8.jpg", "size": 239007, "type": "image/jpeg" }, { "file": "images/GHANA_9.jpg", "size": 112327, "type": "image/jpeg" }, { "file": "images/HIRRS_1.jpg", "size": 236641, "type": "image/jpeg" }, { "file": "images/HIRRS_2.jpg", "size": 211565, "type": "image/jpeg" }, { "file": "images/HIRRS_3.jpg", "size": 267275, "type": "image/jpeg" }, { "file": "images/HIRRS_4.jpg", "size": 92603, "type": "image/jpeg" }, { "file": "images/HIRRS_5.jpg", "size": 246930, "type": "image/jpeg" }, { "file": "images/HIRRS_6.jpg", "size": 203377, "type": "image/jpeg" }, { "file": "images/HSCo_1.jpg", "size": 194725, "type": "image/jpeg" }, { "file": "images/HSCo_2.jpg", "size": 93206, "type": "image/jpeg" }, { "file": "images/HSCo_3.jpg", "size": 173690, "type": "image/jpeg" }, { "file": "images/HSCo_4.jpg", "size": 258608, "type": "image/jpeg" }, { "file": "images/HSCo_5.jpg", "size": 99254, "type": "image/jpeg" }, { "file": "images/HSCo_6.jpg", "size": 201888, "type": "image/jpeg" }, { "file": "images/HSCo_7.jpg", "size": 91257, "type": "image/jpeg" }, { "file": "images/HSCo_Mag_1.jpg", "size": 159468, "type": "image/jpeg" }, { "file": "images/HSCo_Mag_2.jpg", "size": 364575, "type": "image/jpeg" }, { "file": "images/HSCo_Mag_3.jpg", "size": 226142, "type": "image/jpeg" }, { "file": "images/HSCo_Mag_4.jpg", "size": 347770, "type": "image/jpeg" }, { "file": "images/HSCo_Mag_5.jpg", "size": 200906, "type": "image/jpeg" }, { "file": "images/HSCo_Mag_6.jpg", "size": 372892, "type": "image/jpeg" }, { "file": "images/KOMBI_1.jpg", "size": 589540, "type": "image/jpeg" }, { "file": "images/KOMBI_2.jpg", "size": 290015, "type": "image/jpeg" }, { "file": "images/KOMBI_3.jpg", "size": 355454, "type": "image/jpeg" }, { "file": "images/KOMBI_4.jpg", "size": 330519, "type": "image/jpeg" }, { "file": "images/KOMBI_5.jpg", "size": 166465, "type": "image/jpeg" }, { "file": "images/KOMBI_6.jpg", "size": 316375, "type": "image/jpeg" }, { "file": "images/LB_1_1.jpg", "size": 291204, "type": "image/jpeg" }, { "file": "images/LB_1_2.jpg", "size": 387801, "type": "image/jpeg" }, { "file": "images/LB_1_3.jpg", "size": 246204, "type": "image/jpeg" }, { "file": "images/LB_1_4.jpg", "size": 226900, "type": "image/jpeg" }, { "file": "images/LB_1_5.jpg", "size": 177675, "type": "image/jpeg" }, { "file": "images/LB_1_6.jpg", "size": 98440, "type": "image/jpeg" }, { "file": "images/LB_2_1.jpg", "size": 219121, "type": "image/jpeg" }, { "file": "images/LB_2_2.jpg", "size": 369700, "type": "image/jpeg" }, { "file": "images/LB_2_3.jpg", "size": 203551, "type": "image/jpeg" }, { "file": "images/LB_2_4.jpg", "size": 186095, "type": "image/jpeg" }, { "file": "images/LB_2_5.jpg", "size": 137736, "type": "image/jpeg" }, { "file": "images/LB_2_6.jpg", "size": 293707, "type": "image/jpeg" }, { "file": "images/LB_2_7.jpg", "size": 238025, "type": "image/jpeg" }, { "file": "images/LB_2_8.jpg", "size": 309607, "type": "image/jpeg" }, { "file": "images/LOGO-Ai small_Super Bonjour smaller.svg", "size": 2873, "type": "image/svg+xml" }, { "file": "images/LOGO-Ai.svg", "size": 2998, "type": "image/svg+xml" }, { "file": "images/LOGO-Figma.svg", "size": 4252, "type": "image/svg+xml" }, { "file": "images/LOGOFACE-Ai.svg", "size": 4459, "type": "image/svg+xml" }, { "file": "images/LOUISE_1.jpg", "size": 228286, "type": "image/jpeg" }, { "file": "images/LOUISE_2.jpg", "size": 171544, "type": "image/jpeg" }, { "file": "images/LOUISE_3.jpg", "size": 163373, "type": "image/jpeg" }, { "file": "images/LOUISE_4.jpg", "size": 160123, "type": "image/jpeg" }, { "file": "images/More-regular.ttf", "size": 46612, "type": "font/ttf" }, { "file": "images/NIKE_1.jpg", "size": 474737, "type": "image/jpeg" }, { "file": "images/NIKE_2.jpg", "size": 299836, "type": "image/jpeg" }, { "file": "images/NIKE_3.jpg", "size": 274962, "type": "image/jpeg" }, { "file": "images/NIKE_4.jpg", "size": 225708, "type": "image/jpeg" }, { "file": "images/NIKE_5.jpg", "size": 225295, "type": "image/jpeg" }, { "file": "images/NIKE_6.jpg", "size": 224135, "type": "image/jpeg" }, { "file": "images/NP_1.jpg", "size": 79370, "type": "image/jpeg" }, { "file": "images/NP_2.jpg", "size": 30999, "type": "image/jpeg" }, { "file": "images/NP_6.jpg", "size": 48122, "type": "image/jpeg" }, { "file": "images/NP_7.jpg", "size": 109661, "type": "image/jpeg" }, { "file": "images/OD_1.jpg", "size": 217021, "type": "image/jpeg" }, { "file": "images/OD_2.jpg", "size": 204745, "type": "image/jpeg" }, { "file": "images/OD_3.jpg", "size": 110515, "type": "image/jpeg" }, { "file": "images/OD_4.jpg", "size": 185938, "type": "image/jpeg" }, { "file": "images/OD_5.jpg", "size": 279144, "type": "image/jpeg" }, { "file": "images/OD_6.jpg", "size": 217061, "type": "image/jpeg" }, { "file": "images/OD_7.jpg", "size": 239885, "type": "image/jpeg" }, { "file": "images/Rise_1.jpg", "size": 183855, "type": "image/jpeg" }, { "file": "images/Rise_2.jpg", "size": 173223, "type": "image/jpeg" }, { "file": "images/Rise_3.jpg", "size": 662397, "type": "image/jpeg" }, { "file": "images/Rise_4.jpg", "size": 225477, "type": "image/jpeg" }, { "file": "images/Rise_5.jpg", "size": 316417, "type": "image/jpeg" }, { "file": "images/Rise_6.jpg", "size": 218656, "type": "image/jpeg" }, { "file": "images/SB\u2014Logo FACE White.svg", "size": 61128, "type": "image/svg+xml" }, { "file": "images/SB\u2014Logo White.svg", "size": 9977, "type": "image/svg+xml" }, { "file": "images/Saxx_1.jpg", "size": 229468, "type": "image/jpeg" }, { "file": "images/Saxx_2.jpg", "size": 216943, "type": "image/jpeg" }, { "file": "images/Saxx_3.jpg", "size": 161303, "type": "image/jpeg" }, { "file": "images/Saxx_4.jpg", "size": 196939, "type": "image/jpeg" }, { "file": "images/Saxx_5.jpg", "size": 253840, "type": "image/jpeg" }, { "file": "images/Saxx_6.jpg", "size": 147649, "type": "image/jpeg" }, { "file": "images/SuperBonjour.jpeg", "size": 175052, "type": "image/jpeg" }, { "file": "images/dialog-center-mobile.jpeg", "size": 666769, "type": "image/jpeg" }, { "file": "images/dialog-center.jpeg", "size": 517400, "type": "image/jpeg" }, { "file": "images/dialog-icon-mobile.png", "size": 669, "type": "image/png" }, { "file": "images/dialog-icon.png", "size": 1219, "type": "image/png" }, { "file": "images/fable-content.jpg", "size": 720856, "type": "image/jpeg" }, { "file": "images/home-cursor.png", "size": 526, "type": "image/png" }, { "file": "images/left-cursor.png", "size": 10244, "type": "image/png" }, { "file": "images/left-cursor.svg", "size": 6727, "type": "image/svg+xml" }, { "file": "images/mobile_super_bonjour.svg", "size": 5009, "type": "image/svg+xml" }, { "file": "images/peace_hand.svg", "size": 5939, "type": "image/svg+xml" }, { "file": "images/right-cursor.png", "size": 10165, "type": "image/png" }, { "file": "images/right-cursor.svg", "size": 5648, "type": "image/svg+xml" }, { "file": "videos/.DS_Store", "size": 6148, "type": null }, { "file": "videos/DT_2.mp4", "size": 6589360, "type": "video/mp4" }, { "file": "videos/Fable_6.mp4", "size": 39068543, "type": "video/mp4" }, { "file": "videos/LB_2_2v.mp4", "size": 3108513, "type": "video/mp4" }, { "file": "videos/NIKE_6.mov", "size": 15296467, "type": "video/quicktime" }, { "file": "videos/NIKE_6.mp4", "size": 1745538, "type": "video/mp4" }, { "file": "videos/NP_3.mp4", "size": 2112375, "type": "video/mp4" }, { "file": "videos/NP_4.mp4", "size": 2220794, "type": "video/mp4" }, { "file": "videos/NP_5.mp4", "size": 680097, "type": "video/mp4" }, { "file": "videos/NP_7.mov", "size": 29025004, "type": "video/quicktime" }, { "file": "videos/NP_7.mp4", "size": 3328964, "type": "video/mp4" }, { "file": "videos/NP_8.mp4", "size": 1449325, "type": "video/mp4" }, { "file": "videos/Rise_7.mp4", "size": 3400741, "type": "video/mp4" }, { "file": "videos/video1.mov", "size": 38990294, "type": "video/quicktime" }, { "file": "videos/video2.mov", "size": 28912084, "type": "video/quicktime" }, { "file": "videos/video3.mov", "size": 20846441, "type": "video/quicktime" }, { "file": "videos/video4.mov", "size": 41151695, "type": "video/quicktime" }, { "file": "videos/video5.mp4", "size": 25416663, "type": "video/mp4" }, { "file": "videos/video6.mp4", "size": 3134026, "type": "video/mp4" }, { "file": "videos/video7.mp4", "size": 3002962, "type": "video/mp4" }, { "file": "videos/video8.mp4", "size": 2211830, "type": "video/mp4" }],
  layout: ".svelte-kit/build/components/layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  ".svelte-kit/build/components/layout.svelte": () => Promise.resolve().then(function() {
    return layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
var metadata_lookup = { ".svelte-kit/build/components/layout.svelte": { "entry": "layout.svelte-d242d3b5.js", "css": [], "js": ["layout.svelte-d242d3b5.js", "chunks/vendor-921ac85d.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-4aa81bc1.js", "css": [], "js": ["error.svelte-4aa81bc1.js", "chunks/vendor-921ac85d.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-51836910.js", "css": ["assets/pages/index.svelte-d595b616.css"], "js": ["pages/index.svelte-51836910.js", "chunks/preload-helper-ec9aa979.js", "chunks/vendor-921ac85d.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
var layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
var placeholderClass = "svelte-lazy-placeholder";
var Placeholder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { placeholder = null } = $$props;
  let { placeholderProps = null } = $$props;
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.placeholderProps === void 0 && $$bindings.placeholderProps && placeholderProps !== void 0)
    $$bindings.placeholderProps(placeholderProps);
  return `${placeholder ? `<div${add_attribute("class", placeholderClass, 0)}>${typeof placeholder === "string" ? `<div>${escape(placeholder)}</div>` : `${["function", "object"].includes(typeof placeholder) ? `${validate_component(placeholder || missing_component, "svelte:component").$$render($$result, Object.assign(placeholderProps), {}, {})}` : ``}`}</div>` : ``}`;
});
var Src = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { height = 0 } = $$props;
  let { offset = 150 } = $$props;
  let { fadeOption = { delay: 0, duration: 400 } } = $$props;
  let { resetHeightDelay = 0 } = $$props;
  let { onload = null } = $$props;
  let { placeholder = null } = $$props;
  let { placeholderProps = null } = $$props;
  let { class: className = "" } = $$props;
  const rootClass = "svelte-lazy" + (className ? " " + className : "");
  const rootInitialHeight = getStyleHeight();
  function getStyleHeight() {
    return typeof height === "number" ? height + "px" : height;
  }
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.fadeOption === void 0 && $$bindings.fadeOption && fadeOption !== void 0)
    $$bindings.fadeOption(fadeOption);
  if ($$props.resetHeightDelay === void 0 && $$bindings.resetHeightDelay && resetHeightDelay !== void 0)
    $$bindings.resetHeightDelay(resetHeightDelay);
  if ($$props.onload === void 0 && $$bindings.onload && onload !== void 0)
    $$bindings.onload(onload);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.placeholderProps === void 0 && $$bindings.placeholderProps && placeholderProps !== void 0)
    $$bindings.placeholderProps(placeholderProps);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${add_attribute("class", rootClass, 0)} style="${"height: " + escape(rootInitialHeight)}">${`${placeholder ? `${validate_component(Placeholder, "Placeholder").$$render($$result, { placeholder, placeholderProps }, {}, {})}` : ``}`}
</div>`;
});
var css$3 = {
  code: ".mobile-tap-caption.svelte-165g3t7.svelte-165g3t7{display:none}video.svelte-165g3t7.svelte-165g3t7::-webkit-media-controls-fullscreen-button,video.svelte-165g3t7.svelte-165g3t7::-webkit-media-controls-play-button,video.svelte-165g3t7.svelte-165g3t7::-webkit-media-controls-pausebutton{display:none}.video-container.svelte-165g3t7.svelte-165g3t7{position:absolute;padding-bottom:56.25%;padding-top:0;height:0;overflow:hidden;top:50%;left:50%;transform:translate(-50%, -50%)}.image-logo.mobile.svelte-165g3t7.svelte-165g3t7{display:none}.slide-video-extra-padding.svelte-165g3t7 video.svelte-165g3t7{width:70vw;height:70vh;margin-left:15vw;margin-right:15vw;object-fit:contain;margin-top:15vh;margin-bottom:15vh}.slide-video-extra-padding.svelte-165g3t7.svelte-165g3t7{background-color:#c374f6}.slide-column.svelte-165g3t7.svelte-165g3t7{flex-shrink:1;background-color:#c374f6;width:25vw;min-height:300px;display:flex;align-items:center}.slide-right-column.svelte-165g3t7.svelte-165g3t7{margin-left:15px}.slide-left-column.svelte-165g3t7.svelte-165g3t7{margin-right:15px}.slide-left-column.svelte-165g3t7 video.svelte-165g3t7{width:100%;height:auto}.slide-right-column.svelte-165g3t7 img.svelte-165g3t7{width:100%;height:auto}.two-columns-slide.svelte-165g3t7.svelte-165g3t7{display:flex;background-color:#c374f6;flex-direction:row;flex-wrap:nowrap;justify-content:center;align-items:center;align-content:stretch}.text_slide_container.svelte-165g3t7.svelte-165g3t7{padding-left:55px;padding-top:50px;width:88%;line-height:130%}.text_slide_container_mobile.svelte-165g3t7.svelte-165g3t7{width:100%;padding:2rem}.text_title.svelte-165g3t7.svelte-165g3t7{padding-top:50px;padding-bottom:10px;margin-bottom:2px;color:#e2ee75;font-size:18px;font-weight:100;font-family:'Opposit-Medium';line-height:39px}.text_slide.svelte-165g3t7.svelte-165g3t7{background-color:#290b15;height:100vh;width:100vw;color:white;text-align:15vw;font-size:50px;font-weight:100;font-family:'moret'}.slider.svelte-165g3t7.svelte-165g3t7{position:relative;display:flex;flex-wrap:nowrap;transition:all 200ms linear 0s;background:#c3862c}.slide.svelte-165g3t7.svelte-165g3t7{height:100vh;background-size:cover;transition:all 200ms ease-out 0s}.slider-wrapper.svelte-165g3t7.svelte-165g3t7{position:relative;display:flex;flex-wrap:nowrap;width:100vw;overflow:hidden;transition:0.3s all;background:#c3862c}.arrow.svelte-165g3t7.svelte-165g3t7{font-family:'Roc Wide';position:absolute;width:70px;cursor:pointer;top:0;bottom:0;margin:auto;color:#fff}.left.svelte-165g3t7.svelte-165g3t7{left:0}.right.svelte-165g3t7.svelte-165g3t7{right:0}.slider-title.svelte-165g3t7.svelte-165g3t7{width:100%;padding:25px;padding-left:55px;padding-bottom:30px;margin-bottom:50px;padding-right:20vw;font-family:'moret';color:#fff;position:absolute;bottom:0;color:#fff;font-size:1.75rem;font-weight:normal;margin:0;z-index:1;z-index:1;box-sizing:border-box;display:flex;justify-content:space-between}.slider-title.svelte-165g3t7 h2.svelte-165g3t7{font-family:'roc-grotesk', sans-serif;font-size:36px;font-weight:normal;margin:0}.paginator.svelte-165g3t7 h4.svelte-165g3t7{font-size:36px;margin:0}video.svelte-165g3t7.svelte-165g3t7{height:100vh;object-fit:cover}.image-logo.svelte-165g3t7.svelte-165g3t7{position:fixed;left:55px;top:30px;width:177px;height:4.75rem;z-index:1;cursor:url(/images/home-cursor.png), auto}.right-cursor.svelte-165g3t7.svelte-165g3t7{cursor:url(/images/right-cursor.svg), auto}.left-cursor.svelte-165g3t7.svelte-165g3t7{cursor:url(/images/left-cursor.svg), auto}@media screen and (max-width: 900px){.mobile-tap-caption.svelte-165g3t7.svelte-165g3t7{font-family:'Opposit-Medium';text-transform:uppercase;letter-spacing:.12rem;display:block;position:absolute;top:50vh;right:20px;background-color:orange;color:#fff;border:none;width:50px;height:50px;border-radius:50px;z-index:1;line-height:50px;text-align:center}.slider-title.svelte-165g3t7.svelte-165g3t7{margin-bottom:-10px;font-size:1.75rem}.paginator.svelte-165g3t7.svelte-165g3t7{font-size:1.75rem;right:20vw;bottom:0;margin-bottom:-5px}.slide.svelte-165g3t7.svelte-165g3t7{background-attachment:scroll;background-position:center !important}.image-logo.svelte-165g3t7.svelte-165g3t7{width:177px}}@media screen and (max-width: 600px){video.svelte-165g3t7.svelte-165g3t7{width:100vw;height:auto;object-fit:unset}.slide-right-column.svelte-165g3t7.svelte-165g3t7{margin-left:10px}.slide-left-column.svelte-165g3t7.svelte-165g3t7{margin-right:10px}.slide-video-extra-padding.svelte-165g3t7 video.svelte-165g3t7{width:75vw;height:auto;margin:20px 50px}.image-logo.mobile.svelte-165g3t7.svelte-165g3t7{display:block}.slider-title.svelte-165g3t7.svelte-165g3t7{padding-left:25px;align-items:flex-end}.slider-title.svelte-165g3t7 h2.svelte-165g3t7{width:5vw;font-size:1rem}.slider-title.svelte-165g3t7 .paginator h4.svelte-165g3t7{font-size:1rem;right:5vw;margin-right:35px}.slide.svelte-165g3t7.svelte-165g3t7{height:60vw}.text_slide.svelte-165g3t7.svelte-165g3t7{padding-top:0px;font-size:10px !important}.text_slide_container.svelte-165g3t7.svelte-165g3t7{padding-top:5px;padding-left:25px}.text_title.svelte-165g3t7.svelte-165g3t7{padding-top:5px;font-size:18px;margin-top:0}.image-logo.svelte-165g3t7.svelte-165g3t7{width:117px;top:10px;left:25px}}@media screen and (max-width: 1200px) and (max-height: 499px){.slide.svelte-165g3t7.svelte-165g3t7{background-position:unset !important}.slider-title.svelte-165g3t7.svelte-165g3t7{width:100%;padding:30px 55px;align-items:center}.slider-title.svelte-165g3t7 h2.svelte-165g3t7{font-size:1.5rem}.slider-title.svelte-165g3t7 .paginator h4.svelte-165g3t7{font-size:1.5rem;margin-bottom:0}.slide-video-extra-padding.svelte-165g3t7 video.svelte-165g3t7{width:70vw;height:70vh;margin-left:0;margin-right:0}.image-logo.svelte-165g3t7.svelte-165g3t7{position:absolute;left:55px;top:15px;width:100px;height:4.75rem;z-index:1;cursor:url(/images/home-cursor.png), auto}}.text_slide_mobile.svelte-165g3t7.svelte-165g3t7{padding:30px 70px;padding-bottom:30px;box-sizing:border-box}.text_title_mobile.svelte-165g3t7.svelte-165g3t7{font-size:12px;line-height:1.3;margin:0;padding:0;padding-bottom:1.5rem}.text_mobile.svelte-165g3t7.svelte-165g3t7{font-size:20px;line-height:1.3;margin:0}",
  map: "{\"version\":3,\"file\":\"ParallaxSlider.svelte\",\"sources\":[\"ParallaxSlider.svelte\"],\"sourcesContent\":[\"<script>\\n  import Lazy from 'svelte-lazy';\\n  import { debounce } from '$lib/utils/helpers';\\n\\n\\n  export let slidesData;\\n  export let title;\\n  export let title2;\\n  export let titleFont;\\n  export let title2Font;\\n  const cdnImageUrl = \\\"https://res.cloudinary.com/dzzdoq1bq/image/upload/v1638569218/static/\\\"\\n\\n  const cdnVideoUrl = \\\"https://res.cloudinary.com/dzzdoq1bq/video/upload/v1638569211/static/\\\"\\n\\n\\n  // [isMobile] means the user is on a mobile device AND in landscape mode.\\n  export let isMobile = false;\\n\\n  // Inner width and height of window.\\n  export let innerWidth;\\n  export let innerHeight;\\n  // [sliderEl] is the element that wraps all the project slides and translates based on which slide is active (e.g. slides[active_index]).\\n  let sliderEl;\\n\\n  /*\\n  In mobile, the text slides are condensed into one. So the [slides] array is shortened to only have the first text slide.\\n  In the html, we iterate over the leftover text slides slidesData.slice(text_slides_index, slidesData.length) and input them to the main text slide.\\n   */\\n  $: slides = slidesData;\\n  $: text_slide_index = slidesData.findIndex((s) => s.type === 'text');\\n  $: slides = isMobile && slidesData ? slidesData.slice(0, text_slide_index + 1) : slidesData;\\n\\n  $: slide_els = []; // all slide elements\\n  $: active_index = 0; // index of currently displayed slide.\\n\\n  const Cursors = {\\n    RIGHT: 'right-cursor',\\n    LEFT: 'left-cursor'\\n  };\\n\\n  let sliderCursor = 'cursor';\\n  let wrapperWidth = 0;\\n\\n  function handleMousemove(event) {\\n    const cursorXPosition = event.clientX;\\n    sliderCursor = wrapperWidth / 2 <= cursorXPosition ? Cursors.RIGHT : Cursors.LEFT;\\n  }\\n\\n  /*\\n    - SLIDE CHANGE  ------------------------\\n    Assuming that the desktop slides = 100vw and mobile slides have a 5:8 aspect ratio\\n    */\\n  let aspectRatio = { mobile: 8 / 5 };\\n  $: mobile_width = Math.round(innerHeight * aspectRatio.mobile); //in px\\n  $: DESKTOP_WIDTH = 100; //in vw\\n\\n\\n  // Calculates the offset for the x translation.\\n  let calculateXOffset = (w) => {\\n    //w = width\\n    // [offset] is calculated by multiplying the width by the active index.\\n    let offset = active_index * w;\\n    console.log(\\\"w\\\", w)\\n    // When on mobile, the last slide has the image from the previous slide showing on the left.\\n    if (isMobile && active_index === slides.length - 1) {\\n      // calculate the left padding by taking the width of the window - the current slide width\\n      let left_padding = innerWidth - mobile_width;\\n      offset = offset - left_padding;\\n    }\\n    return 0 - offset;\\n  };\\n  \\n\\n  // Handles the translation on [sliderEl] to move to the next slide.\\n  const nextSlide = () => {\\n    // On last slide of project, go to next project index.\\n    if (active_index == 6) {\\n      debugger\\n    }\\n    if (isMobile && active_index === slides.length - 1) {\\n      return updateProjectIndex(id + 1);\\n    }\\n    // Update active index.\\n    active_index = active_index < slides.length - 1 ? active_index + 1 : 0;\\n    let translate_x = isMobile\\n    ? `${calculateXOffset(mobile_width)}px`\\n    : `${calculateXOffset(DESKTOP_WIDTH)}vw`;\\n    \\n    return (sliderEl.style.transform = `translateX(${translate_x})`);\\n  };\\n\\n  // Handles the translation on [sliderEl] to move to the previous slide.\\n  const prevSlide = () => {\\n    // On last slide of project, go to previous project index.\\n    if (isMobile && active_index === 0) {\\n      return updateProjectIndex(id - 1);\\n    }\\n    // Update active index.\\n    active_index = active_index === 0 ? slides.length - 1 : active_index - 1;\\n    let translate_x = isMobile\\n      ? `${calculateXOffset(mobile_width)}px`\\n      : `${calculateXOffset(DESKTOP_WIDTH)}vw`;\\n\\n    return (sliderEl.style.transform = `translateX(${translate_x})`);\\n  };\\n\\n  // Handles the users click depending on which side of the page it's on.\\n  const handleSliderClick = () => {\\n    if (sliderCursor === Cursors.RIGHT) {\\n      nextSlide();\\n    } else if (sliderCursor === Cursors.LEFT) {\\n      prevSlide();\\n    }\\n  };\\n\\n  // -------------------------\\n\\n  // - MOBILE SCROLL -----------------------\\n\\n  export let updateProjectIndex;\\n  export let id;\\n\\n  const handleScrollDown = debounce((e) => {\\n    const { scrollHeight, scrollTop } = e.target;\\n    // Detect if user is at the bottom of the window to move to next slide.\\n    if (scrollTop + innerHeight >= scrollHeight - 100) {\\n      nextSlide();\\n    }\\n  }, 100);\\n\\n  $: textSlides = slidesData.slice(text_slide_index, slidesData.length);\\n  // -------------------------\\n<\/script>\\n\\n<svelte:body\\n  on:viewportchanged={() => {\\n    active_index = 0;\\n  }} />\\n\\n<div\\n  class=\\\"slider-wrapper\\\"\\n  bind:clientWidth={wrapperWidth}\\n  on:mousemove={handleMousemove}\\n  style={isMobile ? `width:${innerWidth}px; height:${innerHeight}px;` : ''}\\n>\\n  <img class=\\\"image-logo\\\" src=\\\"images/LOGO-Ai small_Super Bonjour smaller.svg\\\" alt=\\\"Logo\\\" />\\n  <div class=\\\"mobile-tap-caption\\\" on:click={handleSliderClick}>Tap!</div>\\n  \\n  <!-- <img class=\\\"image-logo mobile\\\" src=\\\"images/LOGOFACE-Ai.svg\\\" alt=\\\"Logo\\\" /> -->\\n  <div class={'slider-title'}>\\n    <h2>\\n      <span style={`font-family: ${titleFont || 'roc-grotesk'};`}>\\n        {title}\\n      </span>\\n      <span style={`font-family: ${title2Font || 'moret'};`}>\\n        {title2}\\n      </span>\\n    </h2>\\n    <div class=\\\"paginator\\\">\\n      <h4>{active_index + 1} / {slides.length}</h4>\\n    </div>\\n  </div>\\n  <div\\n    class={`slider ${sliderCursor}`}\\n    bind:this={sliderEl}\\n    on:click={handleSliderClick}\\n    style={`${\\n      isMobile\\n        ? `width: ${mobile_width * slides.length}px; height:100%;`\\n        : `width: ${slides.length * 100}vw;`\\n    }`}\\n  >\\n    {#each slides as slide, i}\\n      <div\\n        class=\\\"slider-slide\\\"\\n        type={slide.type}\\n        bind:this={slide_els[i]}\\n        style={`${\\n          isMobile\\n            ? `width: ${Math.round(innerHeight * aspectRatio.mobile)}px; height:100%;`\\n            : 'width: 100vw'\\n        }; `}\\n      >\\n        {#if slide.type === 'image'}\\n          <Lazy height={300}>\\n            <div\\n              id={i}\\n              class={`slide ${sliderCursor};`}\\n              style={`background-position: ${i}00vw center; background-image: url(${cdnImageUrl}${slide.src});\\n              ${isMobile ? `height:${innerHeight}px;` : ''}; `}\\n            />\\n          </Lazy>\\n        {:else if slide.type === 'video'}\\n          <div\\n            id={i}\\n            class={`slide slide-video ${sliderCursor} ${\\n              slide.addPadding ? 'slide-video-extra-padding' : ''\\n            }`}\\n            style={`background-position: ${i}00vw center; position: relative;${\\n              isMobile ? '' : 'width:100vw'\\n            }\\n            ${isMobile ? `height:${innerHeight}px;` : ''}; background-color: ${\\n            slide.backgroundColor || ''\\n            };`}\\n          >\\n            <div\\n              class={`${slide.addPadding ? 'video-container' : ''}`}\\n              style={`width: ${isMobile ? '100%' : ''}`}\\n            >\\n              <!-- svelte-ignore a11y-media-has-caption -->\\n              <Lazy height={300}>\\n                <video\\n                  style={`width: ${isMobile ? '100%' : '100vw'}`}\\n                  src={`${cdnVideoUrl}${slide.src}`}\\n                  autoplay=\\\"true\\\"\\n                  loop\\n                  muted\\n                  playsinline\\n                />\\n              </Lazy>\\n            </div>\\n          </div>\\n        {:else if slide.type === 'two-columns'}\\n          <div class=\\\"slide two-columns-slide\\\" style={isMobile ? `height:${innerHeight}px;` : ''}>\\n            <div class=\\\"slide-column slide-left-column\\\">\\n              <video src={slide.videoSrc} autoplay=\\\"true\\\" loop muted playsinline />\\n            </div>\\n            <div class=\\\"slide-column slide-right-column\\\">\\n              <!-- svelte-ignore a11y-img-redundant-alt -->\\n              <Lazy height={300}>\\n                <img src={slide.imageSrc} alt=\\\"left column image\\\" />\\n              </Lazy>\\n            </div>\\n          </div>\\n        {:else}\\n          <div\\n            class=\\\"slide text_slide\\\"\\n            style={`\\n            background-color: ${slide.backgroundColor}; color:${slide.color};\\n            font-family: ${slide.font || 'moret'};\\n            font-size: ${slide.fontSize};\\n            overflow-y:${isMobile ? 'scroll' : 'auto'};\\n            width:100%;\\n            ${isMobile ? `height:${innerHeight}px;` : ''}; \\n            `}\\n            on:scroll={handleScrollDown}\\n          >\\n            {#if isMobile}\\n              <!-- All the text is encapsulated in one slide for mobile -->\\n              {#each textSlides as textSlide, i}\\n                <div\\n                  class=\\\"text_slide_mobile\\\"\\n                  style={`\\n                  padding-top: ${i == 0 ? '70px' : '30px'};\\n                  padding-bottom: ${i == textSlides.length - 1 ? '100px' : '30px'}\\n                  `}\\n                >\\n                  <h5 class=\\\"text_title text_title_mobile\\\">\\n                    {textSlide.title}\\n                  </h5>\\n                  <p\\n                    class=\\\"text_mobile\\\"\\n                    style={`\\n                    font-size: ${i > 0 ? '16px' : '20px'};\\n                    font-family: ${textSlide.font || 'moret'};\\n                    color: ${textSlide.color};\\n                    `}\\n                  >\\n                    {@html textSlide.src}\\n                  </p>\\n                </div>\\n              {/each}\\n            {:else}\\n              <div class=\\\"text_slide_container\\\">\\n                <h5 class=\\\"text_title\\\">\\n                  {slide.title}\\n                </h5>\\n                {@html slide.src}\\n              </div>\\n            {/if}\\n          </div>\\n        {/if}\\n      </div>\\n    {/each}\\n  </div>\\n</div>\\n\\n<style>\\n\\n.mobile-tap-caption {\\n    display: none;\\n  }\\n  video::-webkit-media-controls-fullscreen-button,\\n  video::-webkit-media-controls-play-button,\\n  video::-webkit-media-controls-pausebutton {\\n    display: none;\\n  }\\n\\n  .video-container {\\n    position: absolute;\\n    padding-bottom: 56.25%;\\n    padding-top: 0;\\n    height: 0;\\n    overflow: hidden;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n  }\\n\\n  .image-logo.mobile {\\n    display: none;\\n  }\\n\\n  .slide-video-extra-padding video {\\n    width: 70vw;\\n    height: 70vh;\\n    margin-left: 15vw;\\n    margin-right: 15vw;\\n    object-fit: contain;\\n    margin-top: 15vh;\\n    margin-bottom: 15vh;\\n  }\\n  .slide-video-extra-padding {\\n    background-color: #c374f6;\\n  }\\n\\n  .slide-column {\\n    flex-shrink: 1;\\n    background-color: #c374f6;\\n    width: 25vw;\\n    min-height: 300px;\\n    display: flex;\\n    align-items: center;\\n  }\\n\\n  .slide-right-column {\\n    margin-left: 15px;\\n  }\\n\\n  .slide-left-column {\\n    margin-right: 15px;\\n  }\\n\\n  .slide-left-column video {\\n    width: 100%;\\n    height: auto;\\n  }\\n\\n  .slide-right-column img {\\n    width: 100%;\\n    height: auto;\\n  }\\n\\n  .two-columns-slide {\\n    display: flex;\\n    background-color: #c374f6;\\n    flex-direction: row;\\n    flex-wrap: nowrap;\\n    justify-content: center;\\n    align-items: center;\\n    align-content: stretch;\\n  }\\n  .text_slide_container {\\n    padding-left: 55px;\\n    padding-top: 50px;\\n    width: 88%;\\n    line-height: 130%;\\n  }\\n\\n  .text_slide_container_mobile {\\n    width: 100%;\\n    padding: 2rem;\\n  }\\n\\n  .text_title {\\n    padding-top: 50px;\\n    padding-bottom: 10px;\\n    margin-bottom: 2px;\\n    color: #e2ee75;\\n    font-size: 18px;\\n    font-weight: 100;\\n    font-family: 'Opposit-Medium';\\n    line-height: 39px;\\n  }\\n\\n  .text_slide {\\n    background-color: #290b15;\\n    height: 100vh;\\n    width: 100vw;\\n    color: white;\\n    text-align: 15vw;\\n    font-size: 50px;\\n    font-weight: 100;\\n    font-family: 'moret';\\n  }\\n\\n  .slider {\\n    position: relative;\\n    display: flex;\\n    flex-wrap: nowrap;\\n    transition: all 200ms linear 0s;\\n    background: #c3862c;\\n  }\\n\\n  .slide {\\n    height: 100vh;\\n    background-size: cover;\\n    transition: all 200ms ease-out 0s;\\n  }\\n\\n  .slider-wrapper {\\n    position: relative;\\n    display: flex;\\n    flex-wrap: nowrap;\\n    width: 100vw;\\n    overflow: hidden;\\n    transition: 0.3s all;\\n    background: #c3862c;\\n  }\\n\\n  .arrow {\\n    font-family: 'Roc Wide';\\n    position: absolute;\\n    width: 70px;\\n    cursor: pointer;\\n    top: 0;\\n    bottom: 0;\\n    margin: auto;\\n    color: #fff;\\n  }\\n\\n  .left {\\n    left: 0;\\n  }\\n\\n  .right {\\n    right: 0;\\n  }\\n\\n  .slider-title {\\n    width: 100%;\\n    padding: 25px;\\n    padding-left: 55px;\\n    padding-bottom: 30px;\\n    margin-bottom: 50px;\\n    padding-right: 20vw;\\n    font-family: 'moret';\\n    color: #fff;\\n    position: absolute;\\n    bottom: 0;\\n    color: #fff;\\n    font-size: 1.75rem;\\n    font-weight: normal;\\n    margin: 0;\\n    z-index: 1;\\n    z-index: 1;\\n    box-sizing: border-box;\\n    display: flex;\\n    justify-content: space-between;\\n  }\\n\\n  .slider-title h2 {\\n    font-family: 'roc-grotesk', sans-serif;\\n    font-size: 36px;\\n    font-weight: normal;\\n    margin: 0;\\n  }\\n\\n  .paginator h4 {\\n    font-size: 36px;\\n    margin: 0;\\n  }\\n  video {\\n    height: 100vh;\\n    object-fit: cover;\\n  }\\n\\n  .image-logo {\\n    position: fixed;\\n    left: 55px;\\n    top: 30px;\\n    width: 177px;\\n    height: 4.75rem;\\n    z-index: 1;\\n    cursor: url(/images/home-cursor.png), auto;\\n  }\\n\\n  .right-cursor {\\n    cursor: url(/images/right-cursor.svg), auto;\\n  }\\n  .left-cursor {\\n    cursor: url(/images/left-cursor.svg), auto;\\n  }\\n\\n  @media screen and (max-width: 900px) {\\n    .mobile-tap-caption {\\n      font-family: 'Opposit-Medium';\\n      text-transform: uppercase;\\n      letter-spacing: .12rem;\\n      display: block;\\n      position: absolute;\\n      top: 50vh;\\n      right: 20px;\\n      background-color: orange;\\n      color: #fff;\\n      border: none;\\n      width: 50px;\\n      height: 50px;\\n      border-radius: 50px;\\n      z-index: 1;\\n      line-height: 50px;\\n      text-align: center;\\n    }\\n    \\n    .slider-title {\\n      margin-bottom: -10px;\\n      font-size: 1.75rem;\\n    }\\n    .paginator {\\n      font-size: 1.75rem;\\n      right: 20vw;\\n      bottom: 0;\\n      margin-bottom: -5px;\\n    }\\n\\n    .slide {\\n      background-attachment: scroll;\\n      background-position: center !important;\\n    }\\n\\n    .image-logo {\\n      width: 177px;\\n    }\\n  }\\n\\n  @media screen and (max-width: 600px) {\\n    video {\\n      width: 100vw;\\n      height: auto;\\n      object-fit: unset;\\n    }\\n\\n    .slide-right-column {\\n      margin-left: 10px;\\n    }\\n\\n    .slide-left-column {\\n      margin-right: 10px;\\n    }\\n    .slide-video-extra-padding video {\\n      width: 75vw;\\n      height: auto;\\n      margin: 20px 50px;\\n    }\\n\\n    .image-logo.mobile {\\n      display: block;\\n    }\\n\\n    .slider-title {\\n      padding-left: 25px;\\n      align-items: flex-end;\\n    }\\n\\n    .slider-title h2 {\\n      width: 5vw;\\n      font-size: 1rem;\\n    }\\n\\n    .slider-title .paginator h4 {\\n      font-size: 1rem;\\n      right: 5vw;\\n      margin-right: 35px;\\n    }\\n\\n    .slide {\\n      height: 60vw;\\n    }\\n\\n    .text_slide {\\n      padding-top: 0px;\\n      font-size: 10px !important;\\n    }\\n\\n    .text_slide_container {\\n      padding-top: 5px;\\n      padding-left: 25px;\\n    }\\n\\n    .text_title {\\n      padding-top: 5px;\\n      font-size: 18px;\\n      margin-top: 0;\\n    }\\n\\n    .image-logo {\\n      width: 117px;\\n      top: 10px;\\n      left: 25px;\\n    }\\n  }\\n\\n  @media screen and (max-width: 1200px) and (max-height: 499px) {\\n    /* For mobile-size but acts on short height desktop as well */\\n    .slide {\\n      background-position: unset !important;\\n    }\\n\\n    .slider-title {\\n      width: 100%;\\n      padding: 30px 55px;\\n      align-items: center;\\n    }\\n\\n    .slider-title h2 {\\n      font-size: 1.5rem;\\n    }\\n\\n    .slider-title .paginator h4 {\\n      font-size: 1.5rem;\\n      margin-bottom: 0;\\n    }\\n    .slide-video-extra-padding video {\\n      width: 70vw;\\n      height: 70vh;\\n      margin-left: 0;\\n      margin-right: 0;\\n    }\\n\\n    .image-logo {\\n      position: absolute;\\n      left: 55px;\\n      top: 15px;\\n      width: 100px;\\n      height: 4.75rem;\\n      z-index: 1;\\n      cursor: url(/images/home-cursor.png), auto;\\n    }\\n  }\\n  /* Mobile text slides */\\n  .text_slide_mobile {\\n    /* min-height: 375px; */\\n    padding: 30px 70px;\\n    padding-bottom: 30px;\\n    box-sizing: border-box;\\n  }\\n\\n  .text_title_mobile {\\n    font-size: 12px;\\n    line-height: 1.3;\\n    margin: 0;\\n    padding: 0;\\n    padding-bottom: 1.5rem;\\n  }\\n\\n  .text_mobile {\\n    font-size: 20px;\\n    line-height: 1.3;\\n    margin: 0;\\n  }\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAiSA,mBAAmB,8BAAC,CAAC,AACjB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,mCAAK,0CAA0C,CAC/C,mCAAK,oCAAoC,CACzC,mCAAK,oCAAoC,AAAC,CAAC,AACzC,OAAO,CAAE,IAAI,AACf,CAAC,AAED,gBAAgB,8BAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,CAAC,CACd,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,AAClC,CAAC,AAED,WAAW,OAAO,8BAAC,CAAC,AAClB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,yCAA0B,CAAC,KAAK,eAAC,CAAC,AAChC,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAAI,CAClB,UAAU,CAAE,OAAO,CACnB,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,0BAA0B,8BAAC,CAAC,AAC1B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,aAAa,8BAAC,CAAC,AACb,WAAW,CAAE,CAAC,CACd,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,mBAAmB,8BAAC,CAAC,AACnB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,kBAAkB,8BAAC,CAAC,AAClB,YAAY,CAAE,IAAI,AACpB,CAAC,AAED,iCAAkB,CAAC,KAAK,eAAC,CAAC,AACxB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AAED,kCAAmB,CAAC,GAAG,eAAC,CAAC,AACvB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AAED,kBAAkB,8BAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,gBAAgB,CAAE,OAAO,CACzB,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,MAAM,CACjB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,OAAO,AACxB,CAAC,AACD,qBAAqB,8BAAC,CAAC,AACrB,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,4BAA4B,8BAAC,CAAC,AAC5B,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,AACf,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,IAAI,CACpB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,gBAAgB,CAC7B,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,OAAO,AACtB,CAAC,AAED,OAAO,8BAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CACjB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,MAAM,CAAC,EAAE,CAC/B,UAAU,CAAE,OAAO,AACrB,CAAC,AAED,MAAM,8BAAC,CAAC,AACN,MAAM,CAAE,KAAK,CACb,eAAe,CAAE,KAAK,CACtB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,QAAQ,CAAC,EAAE,AACnC,CAAC,AAED,eAAe,8BAAC,CAAC,AACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,IAAI,CAAC,GAAG,CACpB,UAAU,CAAE,OAAO,AACrB,CAAC,AAED,MAAM,8BAAC,CAAC,AACN,WAAW,CAAE,UAAU,CACvB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OAAO,CACf,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,KAAK,8BAAC,CAAC,AACL,IAAI,CAAE,CAAC,AACT,CAAC,AAED,MAAM,8BAAC,CAAC,AACN,KAAK,CAAE,CAAC,AACV,CAAC,AAED,aAAa,8BAAC,CAAC,AACb,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,YAAY,CAAE,IAAI,CAClB,cAAc,CAAE,IAAI,CACpB,aAAa,CAAE,IAAI,CACnB,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,OAAO,CACpB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAChC,CAAC,AAED,4BAAa,CAAC,EAAE,eAAC,CAAC,AAChB,WAAW,CAAE,aAAa,CAAC,CAAC,UAAU,CACtC,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,CAAC,AACX,CAAC,AAED,yBAAU,CAAC,EAAE,eAAC,CAAC,AACb,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,CAAC,AACX,CAAC,AACD,KAAK,8BAAC,CAAC,AACL,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,KAAK,AACnB,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,QAAQ,CAAE,KAAK,CACf,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,uBAAuB,CAAC,CAAC,CAAC,IAAI,AAC5C,CAAC,AAED,aAAa,8BAAC,CAAC,AACb,MAAM,CAAE,IAAI,wBAAwB,CAAC,CAAC,CAAC,IAAI,AAC7C,CAAC,AACD,YAAY,8BAAC,CAAC,AACZ,MAAM,CAAE,IAAI,uBAAuB,CAAC,CAAC,CAAC,IAAI,AAC5C,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,mBAAmB,8BAAC,CAAC,AACnB,WAAW,CAAE,gBAAgB,CAC7B,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,MAAM,CACxB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,aAAa,8BAAC,CAAC,AACb,aAAa,CAAE,KAAK,CACpB,SAAS,CAAE,OAAO,AACpB,CAAC,AACD,UAAU,8BAAC,CAAC,AACV,SAAS,CAAE,OAAO,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,CAAC,CACT,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,MAAM,8BAAC,CAAC,AACN,qBAAqB,CAAE,MAAM,CAC7B,mBAAmB,CAAE,MAAM,CAAC,UAAU,AACxC,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,KAAK,AACd,CAAC,AACH,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,KAAK,8BAAC,CAAC,AACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,AACnB,CAAC,AAED,mBAAmB,8BAAC,CAAC,AACnB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,kBAAkB,8BAAC,CAAC,AAClB,YAAY,CAAE,IAAI,AACpB,CAAC,AACD,yCAA0B,CAAC,KAAK,eAAC,CAAC,AAChC,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CAAC,IAAI,AACnB,CAAC,AAED,WAAW,OAAO,8BAAC,CAAC,AAClB,OAAO,CAAE,KAAK,AAChB,CAAC,AAED,aAAa,8BAAC,CAAC,AACb,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,QAAQ,AACvB,CAAC,AAED,4BAAa,CAAC,EAAE,eAAC,CAAC,AAChB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,4BAAa,CAAC,UAAU,CAAC,EAAE,eAAC,CAAC,AAC3B,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,GAAG,CACV,YAAY,CAAE,IAAI,AACpB,CAAC,AAED,MAAM,8BAAC,CAAC,AACN,MAAM,CAAE,IAAI,AACd,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CAAC,UAAU,AAC5B,CAAC,AAED,qBAAqB,8BAAC,CAAC,AACrB,WAAW,CAAE,GAAG,CAChB,YAAY,CAAE,IAAI,AACpB,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,CAAC,AACf,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,KAAK,CACZ,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,IAAI,AACZ,CAAC,AACH,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,GAAG,CAAC,aAAa,KAAK,CAAC,AAAC,CAAC,AAE7D,MAAM,8BAAC,CAAC,AACN,mBAAmB,CAAE,KAAK,CAAC,UAAU,AACvC,CAAC,AAED,aAAa,8BAAC,CAAC,AACb,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,4BAAa,CAAC,EAAE,eAAC,CAAC,AAChB,SAAS,CAAE,MAAM,AACnB,CAAC,AAED,4BAAa,CAAC,UAAU,CAAC,EAAE,eAAC,CAAC,AAC3B,SAAS,CAAE,MAAM,CACjB,aAAa,CAAE,CAAC,AAClB,CAAC,AACD,yCAA0B,CAAC,KAAK,eAAC,CAAC,AAChC,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,CAAC,CACd,YAAY,CAAE,CAAC,AACjB,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,uBAAuB,CAAC,CAAC,CAAC,IAAI,AAC5C,CAAC,AACH,CAAC,AAED,kBAAkB,8BAAC,CAAC,AAElB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,UAAU,AACxB,CAAC,AAED,kBAAkB,8BAAC,CAAC,AAClB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,MAAM,AACxB,CAAC,AAED,YAAY,8BAAC,CAAC,AACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,AACX,CAAC\"}"
};
var cdnImageUrl = "https://res.cloudinary.com/dzzdoq1bq/image/upload/v1638569218/static/";
var cdnVideoUrl = "https://res.cloudinary.com/dzzdoq1bq/video/upload/v1638569211/static/";
var ParallaxSlider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slides;
  let text_slide_index;
  let slide_els;
  let active_index;
  let mobile_width;
  let textSlides;
  let { slidesData } = $$props;
  let { title } = $$props;
  let { title2 } = $$props;
  let { titleFont } = $$props;
  let { title2Font } = $$props;
  let { isMobile = false } = $$props;
  let { innerWidth } = $$props;
  let { innerHeight } = $$props;
  let sliderEl;
  let sliderCursor = "cursor";
  let aspectRatio = { mobile: 8 / 5 };
  let { updateProjectIndex } = $$props;
  let { id } = $$props;
  if ($$props.slidesData === void 0 && $$bindings.slidesData && slidesData !== void 0)
    $$bindings.slidesData(slidesData);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.title2 === void 0 && $$bindings.title2 && title2 !== void 0)
    $$bindings.title2(title2);
  if ($$props.titleFont === void 0 && $$bindings.titleFont && titleFont !== void 0)
    $$bindings.titleFont(titleFont);
  if ($$props.title2Font === void 0 && $$bindings.title2Font && title2Font !== void 0)
    $$bindings.title2Font(title2Font);
  if ($$props.isMobile === void 0 && $$bindings.isMobile && isMobile !== void 0)
    $$bindings.isMobile(isMobile);
  if ($$props.innerWidth === void 0 && $$bindings.innerWidth && innerWidth !== void 0)
    $$bindings.innerWidth(innerWidth);
  if ($$props.innerHeight === void 0 && $$bindings.innerHeight && innerHeight !== void 0)
    $$bindings.innerHeight(innerHeight);
  if ($$props.updateProjectIndex === void 0 && $$bindings.updateProjectIndex && updateProjectIndex !== void 0)
    $$bindings.updateProjectIndex(updateProjectIndex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$3);
  slides = slidesData;
  text_slide_index = slidesData.findIndex((s2) => s2.type === "text");
  slides = isMobile && slidesData ? slidesData.slice(0, text_slide_index + 1) : slidesData;
  slide_els = [];
  active_index = 0;
  mobile_width = Math.round(innerHeight * aspectRatio.mobile);
  textSlides = slidesData.slice(text_slide_index, slidesData.length);
  return `

<div class="${"slider-wrapper svelte-165g3t7"}"${add_attribute("style", isMobile ? `width:${innerWidth}px; height:${innerHeight}px;` : "", 0)}><img class="${"image-logo svelte-165g3t7"}" src="${"images/LOGO-Ai small_Super Bonjour smaller.svg"}" alt="${"Logo"}">
  <div class="${"mobile-tap-caption svelte-165g3t7"}">Tap!</div>
  
  
  <div class="${escape(null_to_empty("slider-title")) + " svelte-165g3t7"}"><h2 class="${"svelte-165g3t7"}"><span${add_attribute("style", `font-family: ${titleFont || "roc-grotesk"};`, 0)}>${escape(title)}</span>
      <span${add_attribute("style", `font-family: ${title2Font || "moret"};`, 0)}>${escape(title2)}</span></h2>
    <div class="${"paginator svelte-165g3t7"}"><h4 class="${"svelte-165g3t7"}">${escape(active_index + 1)} / ${escape(slides.length)}</h4></div></div>
  <div class="${escape(null_to_empty(`slider ${sliderCursor}`)) + " svelte-165g3t7"}"${add_attribute("style", `${isMobile ? `width: ${mobile_width * slides.length}px; height:100%;` : `width: ${slides.length * 100}vw;`}`, 0)}${add_attribute("this", sliderEl, 0)}>${each(slides, (slide, i2) => `<div class="${"slider-slide"}"${add_attribute("type", slide.type, 0)}${add_attribute("style", `${isMobile ? `width: ${Math.round(innerHeight * aspectRatio.mobile)}px; height:100%;` : "width: 100vw"}; `, 0)}${add_attribute("this", slide_els[i2], 0)}>${slide.type === "image" ? `${validate_component(Src, "Lazy").$$render($$result, { height: 300 }, {}, {
    default: () => `<div${add_attribute("id", i2, 0)} class="${escape(null_to_empty(`slide ${sliderCursor};`)) + " svelte-165g3t7"}"${add_attribute("style", `background-position: ${i2}00vw center; background-image: url(${cdnImageUrl}${slide.src});
              ${isMobile ? `height:${innerHeight}px;` : ""}; `, 0)}></div>
          `
  })}` : `${slide.type === "video" ? `<div${add_attribute("id", i2, 0)} class="${escape(null_to_empty(`slide slide-video ${sliderCursor} ${slide.addPadding ? "slide-video-extra-padding" : ""}`)) + " svelte-165g3t7"}"${add_attribute("style", `background-position: ${i2}00vw center; position: relative;${isMobile ? "" : "width:100vw"}
            ${isMobile ? `height:${innerHeight}px;` : ""}; background-color: ${slide.backgroundColor || ""};`, 0)}><div class="${escape(null_to_empty(`${slide.addPadding ? "video-container" : ""}`)) + " svelte-165g3t7"}"${add_attribute("style", `width: ${isMobile ? "100%" : ""}`, 0)}>
              ${validate_component(Src, "Lazy").$$render($$result, { height: 300 }, {}, {
    default: () => `<video${add_attribute("style", `width: ${isMobile ? "100%" : "100vw"}`, 0)}${add_attribute("src", `${cdnVideoUrl}${slide.src}`, 0)} autoplay="${"true"}" loop muted playsinline class="${"svelte-165g3t7"}"></video>
              `
  })}</div>
          </div>` : `${slide.type === "two-columns" ? `<div class="${"slide two-columns-slide svelte-165g3t7"}"${add_attribute("style", isMobile ? `height:${innerHeight}px;` : "", 0)}><div class="${"slide-column slide-left-column svelte-165g3t7"}"><video${add_attribute("src", slide.videoSrc, 0)} autoplay="${"true"}" loop muted playsinline class="${"svelte-165g3t7"}"></video></div>
            <div class="${"slide-column slide-right-column svelte-165g3t7"}">
              ${validate_component(Src, "Lazy").$$render($$result, { height: 300 }, {}, {
    default: () => `<img${add_attribute("src", slide.imageSrc, 0)} alt="${"left column image"}" class="${"svelte-165g3t7"}">
              `
  })}</div>
          </div>` : `<div class="${"slide text_slide svelte-165g3t7"}"${add_attribute("style", `
            background-color: ${slide.backgroundColor}; color:${slide.color};
            font-family: ${slide.font || "moret"};
            font-size: ${slide.fontSize};
            overflow-y:${isMobile ? "scroll" : "auto"};
            width:100%;
            ${isMobile ? `height:${innerHeight}px;` : ""}; 
            `, 0)}>${isMobile ? `
              ${each(textSlides, (textSlide, i3) => `<div class="${"text_slide_mobile svelte-165g3t7"}"${add_attribute("style", `
                  padding-top: ${i3 == 0 ? "70px" : "30px"};
                  padding-bottom: ${i3 == textSlides.length - 1 ? "100px" : "30px"}
                  `, 0)}><h5 class="${"text_title text_title_mobile svelte-165g3t7"}">${escape(textSlide.title)}</h5>
                  <p class="${"text_mobile svelte-165g3t7"}"${add_attribute("style", `
                    font-size: ${i3 > 0 ? "16px" : "20px"};
                    font-family: ${textSlide.font || "moret"};
                    color: ${textSlide.color};
                    `, 0)}><!-- HTML_TAG_START -->${textSlide.src}<!-- HTML_TAG_END --></p>
                </div>`)}` : `<div class="${"text_slide_container svelte-165g3t7"}"><h5 class="${"text_title svelte-165g3t7"}">${escape(slide.title)}</h5>
                <!-- HTML_TAG_START -->${slide.src}<!-- HTML_TAG_END -->
              </div>`}
          </div>`}`}`}
      </div>`)}</div>
</div>`;
});
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i2) => subscribe(store, (value) => {
      values[i2] = value;
      pending &= ~(1 << i2);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i2;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
var isMergeableObject = function isMergeableObject2(value) {
  return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options2) {
  return options2.clone !== false && options2.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options2) : value;
}
function defaultArrayMerge(target, source, options2) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options2);
  });
}
function getMergeFunction(key, options2) {
  if (!options2.customMerge) {
    return deepmerge;
  }
  var customMerge = options2.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}
function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_2) {
    return false;
  }
}
function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
}
function mergeObject(target, source, options2) {
  var destination = {};
  if (options2.isMergeableObject(target)) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options2);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }
    if (propertyIsOnObject(target, key) && options2.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options2)(target[key], source[key], options2);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options2);
    }
  });
  return destination;
}
function deepmerge(target, source, options2) {
  options2 = options2 || {};
  options2.arrayMerge = options2.arrayMerge || defaultArrayMerge;
  options2.isMergeableObject = options2.isMergeableObject || isMergeableObject;
  options2.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options2);
  } else if (sourceIsArray) {
    return options2.arrayMerge(target, source, options2);
  } else {
    return mergeObject(target, source, options2);
  }
}
deepmerge.all = function deepmergeAll(array, options2) {
  if (!Array.isArray(array)) {
    throw new Error("first argument should be an array");
  }
  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options2);
  }, {});
};
var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p2 in b3)
      if (Object.prototype.hasOwnProperty.call(b3, p2))
        d3[p2] = b3[p2];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s2, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s2 = arguments[i2];
      for (var p2 in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p2))
          t[p2] = s2[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
      if (ar || !(i2 in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i2);
        ar[i2] = from[i2];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var ErrorKind;
(function(ErrorKind2) {
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
  ErrorKind2[ErrorKind2["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
  ErrorKind2[ErrorKind2["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
  ErrorKind2[ErrorKind2["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
  ErrorKind2[ErrorKind2["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
  ErrorKind2[ErrorKind2["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
  ErrorKind2[ErrorKind2["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
  ErrorKind2[ErrorKind2["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
  ErrorKind2[ErrorKind2["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
  ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
  ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
  ErrorKind2[ErrorKind2["INVALID_TAG"] = 23] = "INVALID_TAG";
  ErrorKind2[ErrorKind2["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
  ErrorKind2[ErrorKind2["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
  ErrorKind2[ErrorKind2["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
})(ErrorKind || (ErrorKind = {}));
var TYPE;
(function(TYPE2) {
  TYPE2[TYPE2["literal"] = 0] = "literal";
  TYPE2[TYPE2["argument"] = 1] = "argument";
  TYPE2[TYPE2["number"] = 2] = "number";
  TYPE2[TYPE2["date"] = 3] = "date";
  TYPE2[TYPE2["time"] = 4] = "time";
  TYPE2[TYPE2["select"] = 5] = "select";
  TYPE2[TYPE2["plural"] = 6] = "plural";
  TYPE2[TYPE2["pound"] = 7] = "pound";
  TYPE2[TYPE2["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function(SKELETON_TYPE2) {
  SKELETON_TYPE2[SKELETON_TYPE2["number"] = 0] = "number";
  SKELETON_TYPE2[SKELETON_TYPE2["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
function isLiteralElement(el) {
  return el.type === TYPE.literal;
}
function isArgumentElement(el) {
  return el.type === TYPE.argument;
}
function isNumberElement(el) {
  return el.type === TYPE.number;
}
function isDateElement(el) {
  return el.type === TYPE.date;
}
function isTimeElement(el) {
  return el.type === TYPE.time;
}
function isSelectElement(el) {
  return el.type === TYPE.select;
}
function isPluralElement(el) {
  return el.type === TYPE.plural;
}
function isPoundElement(el) {
  return el.type === TYPE.pound;
}
function isTagElement(el) {
  return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
  return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
  return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
}
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function parseDateTimeSkeleton(skeleton) {
  var result = {};
  skeleton.replace(DATE_TIME_REGEX, function(match) {
    var len = match.length;
    switch (match[0]) {
      case "G":
        result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
        break;
      case "y":
        result.year = len === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        result.month = ["numeric", "2-digit", "short", "long", "narrow"][len - 1];
        break;
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        result.day = ["numeric", "2-digit"][len - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      case "E":
        result.weekday = len === 4 ? "short" : len === 5 ? "narrow" : "short";
        break;
      case "e":
        if (len < 4) {
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        }
        result.weekday = ["short", "long", "narrow", "short"][len - 4];
        break;
      case "c":
        if (len < 4) {
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        }
        result.weekday = ["short", "long", "narrow", "short"][len - 4];
        break;
      case "a":
        result.hour12 = true;
        break;
      case "b":
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      case "h":
        result.hourCycle = "h12";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "H":
        result.hourCycle = "h23";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "K":
        result.hourCycle = "h11";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "k":
        result.hourCycle = "h24";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        result.minute = ["numeric", "2-digit"][len - 1];
        break;
      case "s":
        result.second = ["numeric", "2-digit"][len - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      case "z":
        result.timeZoneName = len < 4 ? "short" : "long";
        break;
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  });
  return result;
}
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function parseNumberSkeletonFromString(skeleton) {
  if (skeleton.length === 0) {
    throw new Error("Number skeleton cannot be empty");
  }
  var stringTokens = skeleton.split(WHITE_SPACE_REGEX).filter(function(x2) {
    return x2.length > 0;
  });
  var tokens = [];
  for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
    var stringToken = stringTokens_1[_i];
    var stemAndOptions = stringToken.split("/");
    if (stemAndOptions.length === 0) {
      throw new Error("Invalid number skeleton");
    }
    var stem = stemAndOptions[0], options2 = stemAndOptions.slice(1);
    for (var _a2 = 0, options_1 = options2; _a2 < options_1.length; _a2++) {
      var option = options_1[_a2];
      if (option.length === 0) {
        throw new Error("Invalid number skeleton");
      }
    }
    tokens.push({ stem, options: options2 });
  }
  return tokens;
}
function icuUnitToEcma(unit) {
  return unit.replace(/^(.*?)-/, "");
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
  var result = {};
  str.replace(SIGNIFICANT_PRECISION_REGEX, function(_2, g1, g2) {
    if (typeof g2 !== "string") {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length;
    } else if (g2 === "+") {
      result.minimumSignificantDigits = g1.length;
    } else if (g1[0] === "#") {
      result.maximumSignificantDigits = g1.length;
    } else {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
    }
    return "";
  });
  return result;
}
function parseSign(str) {
  switch (str) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function parseConciseScientificAndEngineeringStem(stem) {
  var result;
  if (stem[0] === "E" && stem[1] === "E") {
    result = {
      notation: "engineering"
    };
    stem = stem.slice(2);
  } else if (stem[0] === "E") {
    result = {
      notation: "scientific"
    };
    stem = stem.slice(1);
  }
  if (result) {
    var signDisplay = stem.slice(0, 2);
    if (signDisplay === "+!") {
      result.signDisplay = "always";
      stem = stem.slice(2);
    } else if (signDisplay === "+?") {
      result.signDisplay = "exceptZero";
      stem = stem.slice(2);
    }
    if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
      throw new Error("Malformed concise eng/scientific notation");
    }
    result.minimumIntegerDigits = stem.length;
  }
  return result;
}
function parseNotationOptions(opt) {
  var result = {};
  var signOpts = parseSign(opt);
  if (signOpts) {
    return signOpts;
  }
  return result;
}
function parseNumberSkeleton(tokens) {
  var result = {};
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    switch (token.stem) {
      case "percent":
      case "%":
        result.style = "percent";
        continue;
      case "%x100":
        result.style = "percent";
        result.scale = 100;
        continue;
      case "currency":
        result.style = "currency";
        result.currency = token.options[0];
        continue;
      case "group-off":
      case ",_":
        result.useGrouping = false;
        continue;
      case "precision-integer":
      case ".":
        result.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        result.style = "unit";
        result.unit = icuUnitToEcma(token.options[0]);
        continue;
      case "compact-short":
      case "K":
        result.notation = "compact";
        result.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        result.notation = "compact";
        result.compactDisplay = "long";
        continue;
      case "scientific":
        result = __assign(__assign(__assign({}, result), { notation: "scientific" }), token.options.reduce(function(all, opt) {
          return __assign(__assign({}, all), parseNotationOptions(opt));
        }, {}));
        continue;
      case "engineering":
        result = __assign(__assign(__assign({}, result), { notation: "engineering" }), token.options.reduce(function(all, opt) {
          return __assign(__assign({}, all), parseNotationOptions(opt));
        }, {}));
        continue;
      case "notation-simple":
        result.notation = "standard";
        continue;
      case "unit-width-narrow":
        result.currencyDisplay = "narrowSymbol";
        result.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        result.currencyDisplay = "code";
        result.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        result.currencyDisplay = "name";
        result.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        result.currencyDisplay = "symbol";
        continue;
      case "scale":
        result.scale = parseFloat(token.options[0]);
        continue;
      case "integer-width":
        if (token.options.length > 1) {
          throw new RangeError("integer-width stems only accept a single optional option");
        }
        token.options[0].replace(INTEGER_WIDTH_REGEX, function(_2, g1, g2, g3, g4, g5) {
          if (g1) {
            result.minimumIntegerDigits = g2.length;
          } else if (g3 && g4) {
            throw new Error("We currently do not support maximum integer digits");
          } else if (g5) {
            throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
      result.minimumIntegerDigits = token.stem.length;
      continue;
    }
    if (FRACTION_PRECISION_REGEX.test(token.stem)) {
      if (token.options.length > 1) {
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      }
      token.stem.replace(FRACTION_PRECISION_REGEX, function(_2, g1, g2, g3, g4, g5) {
        if (g2 === "*") {
          result.minimumFractionDigits = g1.length;
        } else if (g3 && g3[0] === "#") {
          result.maximumFractionDigits = g3.length;
        } else if (g4 && g5) {
          result.minimumFractionDigits = g4.length;
          result.maximumFractionDigits = g4.length + g5.length;
        } else {
          result.minimumFractionDigits = g1.length;
          result.maximumFractionDigits = g1.length;
        }
        return "";
      });
      if (token.options.length) {
        result = __assign(__assign({}, result), parseSignificantPrecision(token.options[0]));
      }
      continue;
    }
    if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
      result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
      continue;
    }
    var signOpts = parseSign(token.stem);
    if (signOpts) {
      result = __assign(__assign({}, result), signOpts);
    }
    var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
    if (conciseScientificAndEngineeringOpts) {
      result = __assign(__assign({}, result), conciseScientificAndEngineeringOpts);
    }
  }
  return result;
}
var _a;
var SPACE_SEPARATOR_START_REGEX = new RegExp("^" + SPACE_SEPARATOR_REGEX.source + "*");
var SPACE_SEPARATOR_END_REGEX = new RegExp(SPACE_SEPARATOR_REGEX.source + "*$");
function createLocation(start, end) {
  return { start, end };
}
var hasNativeStartsWith = !!String.prototype.startsWith;
var hasNativeFromCodePoint = !!String.fromCodePoint;
var hasNativeFromEntries = !!Object.fromEntries;
var hasNativeCodePointAt = !!String.prototype.codePointAt;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var hasNativeIsSafeInteger = !!Number.isSafeInteger;
var isSafeInteger = hasNativeIsSafeInteger ? Number.isSafeInteger : function(n) {
  return typeof n === "number" && isFinite(n) && Math.floor(n) === n && Math.abs(n) <= 9007199254740991;
};
var REGEX_SUPPORTS_U_AND_Y = true;
try {
  re = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec("a")) === null || _a === void 0 ? void 0 : _a[0]) === "a";
} catch (_2) {
  REGEX_SUPPORTS_U_AND_Y = false;
}
var re;
var startsWith = hasNativeStartsWith ? function startsWith2(s2, search, position) {
  return s2.startsWith(search, position);
} : function startsWith3(s2, search, position) {
  return s2.slice(position, position + search.length) === search;
};
var fromCodePoint = hasNativeFromCodePoint ? String.fromCodePoint : function fromCodePoint2() {
  var codePoints = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    codePoints[_i] = arguments[_i];
  }
  var elements = "";
  var length = codePoints.length;
  var i2 = 0;
  var code;
  while (length > i2) {
    code = codePoints[i2++];
    if (code > 1114111)
      throw RangeError(code + " is not a valid code point");
    elements += code < 65536 ? String.fromCharCode(code) : String.fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
  }
  return elements;
};
var fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries2(entries) {
  var obj = {};
  for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
    var _a2 = entries_1[_i], k2 = _a2[0], v2 = _a2[1];
    obj[k2] = v2;
  }
  return obj;
};
var codePointAt = hasNativeCodePointAt ? function codePointAt2(s2, index2) {
  return s2.codePointAt(index2);
} : function codePointAt3(s2, index2) {
  var size = s2.length;
  if (index2 < 0 || index2 >= size) {
    return void 0;
  }
  var first = s2.charCodeAt(index2);
  var second;
  return first < 55296 || first > 56319 || index2 + 1 === size || (second = s2.charCodeAt(index2 + 1)) < 56320 || second > 57343 ? first : (first - 55296 << 10) + (second - 56320) + 65536;
};
var trimStart = hasTrimStart ? function trimStart2(s2) {
  return s2.trimStart();
} : function trimStart3(s2) {
  return s2.replace(SPACE_SEPARATOR_START_REGEX, "");
};
var trimEnd = hasTrimEnd ? function trimEnd2(s2) {
  return s2.trimEnd();
} : function trimEnd3(s2) {
  return s2.replace(SPACE_SEPARATOR_END_REGEX, "");
};
function RE(s2, flag) {
  return new RegExp(s2, flag);
}
var matchIdentifierAtIndex;
if (REGEX_SUPPORTS_U_AND_Y) {
  IDENTIFIER_PREFIX_RE_1 = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  matchIdentifierAtIndex = function matchIdentifierAtIndex2(s2, index2) {
    var _a2;
    IDENTIFIER_PREFIX_RE_1.lastIndex = index2;
    var match = IDENTIFIER_PREFIX_RE_1.exec(s2);
    return (_a2 = match[1]) !== null && _a2 !== void 0 ? _a2 : "";
  };
} else {
  matchIdentifierAtIndex = function matchIdentifierAtIndex2(s2, index2) {
    var match = [];
    while (true) {
      var c2 = codePointAt(s2, index2);
      if (c2 === void 0 || _isWhiteSpace(c2) || _isPatternSyntax(c2)) {
        break;
      }
      match.push(c2);
      index2 += c2 >= 65536 ? 2 : 1;
    }
    return fromCodePoint.apply(void 0, match);
  };
}
var IDENTIFIER_PREFIX_RE_1;
var Parser = function() {
  function Parser2(message, options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    this.message = message;
    this.position = { offset: 0, line: 1, column: 1 };
    this.ignoreTag = !!options2.ignoreTag;
    this.requiresOtherClause = !!options2.requiresOtherClause;
    this.shouldParseSkeletons = !!options2.shouldParseSkeletons;
  }
  Parser2.prototype.parse = function() {
    if (this.offset() !== 0) {
      throw Error("parser can only be used once");
    }
    return this.parseMessage(0, "", false);
  };
  Parser2.prototype.parseMessage = function(nestingLevel, parentArgType, expectingCloseTag) {
    var elements = [];
    while (!this.isEOF()) {
      var char = this.char();
      if (char === 123) {
        var result = this.parseArgument(nestingLevel, expectingCloseTag);
        if (result.err) {
          return result;
        }
        elements.push(result.val);
      } else if (char === 125 && nestingLevel > 0) {
        break;
      } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
        var position = this.clonePosition();
        this.bump();
        elements.push({
          type: TYPE.pound,
          location: createLocation(position, this.clonePosition())
        });
      } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
        if (expectingCloseTag) {
          break;
        } else {
          return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
        }
      } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
        var result = this.parseTag(nestingLevel, parentArgType);
        if (result.err) {
          return result;
        }
        elements.push(result.val);
      } else {
        var result = this.parseLiteral(nestingLevel, parentArgType);
        if (result.err) {
          return result;
        }
        elements.push(result.val);
      }
    }
    return { val: elements, err: null };
  };
  Parser2.prototype.parseTag = function(nestingLevel, parentArgType) {
    var startPosition = this.clonePosition();
    this.bump();
    var tagName = this.parseTagName();
    this.bumpSpace();
    if (this.bumpIf("/>")) {
      return {
        val: {
          type: TYPE.literal,
          value: "<" + tagName + "/>",
          location: createLocation(startPosition, this.clonePosition())
        },
        err: null
      };
    } else if (this.bumpIf(">")) {
      var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
      if (childrenResult.err) {
        return childrenResult;
      }
      var children = childrenResult.val;
      var endTagStartPosition = this.clonePosition();
      if (this.bumpIf("</")) {
        if (this.isEOF() || !_isAlpha(this.char())) {
          return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
        }
        var closingTagNameStartPosition = this.clonePosition();
        var closingTagName = this.parseTagName();
        if (tagName !== closingTagName) {
          return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (!this.bumpIf(">")) {
          return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
        }
        return {
          val: {
            type: TYPE.tag,
            value: tagName,
            children,
            location: createLocation(startPosition, this.clonePosition())
          },
          err: null
        };
      } else {
        return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
      }
    } else {
      return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
    }
  };
  Parser2.prototype.parseTagName = function() {
    var startOffset = this.offset();
    this.bump();
    while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
      this.bump();
    }
    return this.message.slice(startOffset, this.offset());
  };
  Parser2.prototype.parseLiteral = function(nestingLevel, parentArgType) {
    var start = this.clonePosition();
    var value = "";
    while (true) {
      var parseQuoteResult = this.tryParseQuote(parentArgType);
      if (parseQuoteResult) {
        value += parseQuoteResult;
        continue;
      }
      var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
      if (parseUnquotedResult) {
        value += parseUnquotedResult;
        continue;
      }
      var parseLeftAngleResult = this.tryParseLeftAngleBracket();
      if (parseLeftAngleResult) {
        value += parseLeftAngleResult;
        continue;
      }
      break;
    }
    var location = createLocation(start, this.clonePosition());
    return {
      val: { type: TYPE.literal, value, location },
      err: null
    };
  };
  Parser2.prototype.tryParseLeftAngleBracket = function() {
    if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
      this.bump();
      return "<";
    }
    return null;
  };
  Parser2.prototype.tryParseQuote = function(parentArgType) {
    if (this.isEOF() || this.char() !== 39) {
      return null;
    }
    switch (this.peek()) {
      case 39:
        this.bump();
        this.bump();
        return "'";
      case 123:
      case 60:
      case 62:
      case 125:
        break;
      case 35:
        if (parentArgType === "plural" || parentArgType === "selectordinal") {
          break;
        }
        return null;
      default:
        return null;
    }
    this.bump();
    var codePoints = [this.char()];
    this.bump();
    while (!this.isEOF()) {
      var ch = this.char();
      if (ch === 39) {
        if (this.peek() === 39) {
          codePoints.push(39);
          this.bump();
        } else {
          this.bump();
          break;
        }
      } else {
        codePoints.push(ch);
      }
      this.bump();
    }
    return fromCodePoint.apply(void 0, codePoints);
  };
  Parser2.prototype.tryParseUnquoted = function(nestingLevel, parentArgType) {
    if (this.isEOF()) {
      return null;
    }
    var ch = this.char();
    if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
      return null;
    } else {
      this.bump();
      return fromCodePoint(ch);
    }
  };
  Parser2.prototype.parseArgument = function(nestingLevel, expectingCloseTag) {
    var openingBracePosition = this.clonePosition();
    this.bump();
    this.bumpSpace();
    if (this.isEOF()) {
      return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
    }
    if (this.char() === 125) {
      this.bump();
      return this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
    }
    var value = this.parseIdentifierIfPossible().value;
    if (!value) {
      return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
    }
    this.bumpSpace();
    if (this.isEOF()) {
      return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
    }
    switch (this.char()) {
      case 125: {
        this.bump();
        return {
          val: {
            type: TYPE.argument,
            value,
            location: createLocation(openingBracePosition, this.clonePosition())
          },
          err: null
        };
      }
      case 44: {
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
      }
      default:
        return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
    }
  };
  Parser2.prototype.parseIdentifierIfPossible = function() {
    var startingPosition = this.clonePosition();
    var startOffset = this.offset();
    var value = matchIdentifierAtIndex(this.message, startOffset);
    var endOffset = startOffset + value.length;
    this.bumpTo(endOffset);
    var endPosition = this.clonePosition();
    var location = createLocation(startingPosition, endPosition);
    return { value, location };
  };
  Parser2.prototype.parseArgumentOptions = function(nestingLevel, expectingCloseTag, value, openingBracePosition) {
    var _a2;
    var typeStartPosition = this.clonePosition();
    var argType = this.parseIdentifierIfPossible().value;
    var typeEndPosition = this.clonePosition();
    switch (argType) {
      case "":
        return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
      case "number":
      case "date":
      case "time": {
        this.bumpSpace();
        var styleAndLocation = null;
        if (this.bumpIf(",")) {
          this.bumpSpace();
          var styleStartPosition = this.clonePosition();
          var result = this.parseSimpleArgStyleIfPossible();
          if (result.err) {
            return result;
          }
          var style = trimEnd(result.val);
          if (style.length === 0) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
          }
          var styleLocation = createLocation(styleStartPosition, this.clonePosition());
          styleAndLocation = { style, styleLocation };
        }
        var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
        if (argCloseResult.err) {
          return argCloseResult;
        }
        var location_1 = createLocation(openingBracePosition, this.clonePosition());
        if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, "::", 0)) {
          var skeleton = trimStart(styleAndLocation.style.slice(2));
          if (argType === "number") {
            var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
            if (result.err) {
              return result;
            }
            return {
              val: { type: TYPE.number, value, location: location_1, style: result.val },
              err: null
            };
          } else {
            if (skeleton.length === 0) {
              return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
            }
            var style = {
              type: SKELETON_TYPE.dateTime,
              pattern: skeleton,
              location: styleAndLocation.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? parseDateTimeSkeleton(skeleton) : {}
            };
            var type = argType === "date" ? TYPE.date : TYPE.time;
            return {
              val: { type, value, location: location_1, style },
              err: null
            };
          }
        }
        return {
          val: {
            type: argType === "number" ? TYPE.number : argType === "date" ? TYPE.date : TYPE.time,
            value,
            location: location_1,
            style: (_a2 = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a2 !== void 0 ? _a2 : null
          },
          err: null
        };
      }
      case "plural":
      case "selectordinal":
      case "select": {
        var typeEndPosition_1 = this.clonePosition();
        this.bumpSpace();
        if (!this.bumpIf(",")) {
          return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, __assign({}, typeEndPosition_1)));
        }
        this.bumpSpace();
        var identifierAndLocation = this.parseIdentifierIfPossible();
        var pluralOffset = 0;
        if (argType !== "select" && identifierAndLocation.value === "offset") {
          if (!this.bumpIf(":")) {
            return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
          }
          this.bumpSpace();
          var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
          if (result.err) {
            return result;
          }
          this.bumpSpace();
          identifierAndLocation = this.parseIdentifierIfPossible();
          pluralOffset = result.val;
        }
        var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
        if (optionsResult.err) {
          return optionsResult;
        }
        var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
        if (argCloseResult.err) {
          return argCloseResult;
        }
        var location_2 = createLocation(openingBracePosition, this.clonePosition());
        if (argType === "select") {
          return {
            val: {
              type: TYPE.select,
              value,
              options: fromEntries(optionsResult.val),
              location: location_2
            },
            err: null
          };
        } else {
          return {
            val: {
              type: TYPE.plural,
              value,
              options: fromEntries(optionsResult.val),
              offset: pluralOffset,
              pluralType: argType === "plural" ? "cardinal" : "ordinal",
              location: location_2
            },
            err: null
          };
        }
      }
      default:
        return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
    }
  };
  Parser2.prototype.tryParseArgumentClose = function(openingBracePosition) {
    if (this.isEOF() || this.char() !== 125) {
      return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
    }
    this.bump();
    return { val: true, err: null };
  };
  Parser2.prototype.parseSimpleArgStyleIfPossible = function() {
    var nestedBraces = 0;
    var startPosition = this.clonePosition();
    while (!this.isEOF()) {
      var ch = this.char();
      switch (ch) {
        case 39: {
          this.bump();
          var apostrophePosition = this.clonePosition();
          if (!this.bumpUntil("'")) {
            return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
          }
          this.bump();
          break;
        }
        case 123: {
          nestedBraces += 1;
          this.bump();
          break;
        }
        case 125: {
          if (nestedBraces > 0) {
            nestedBraces -= 1;
          } else {
            return {
              val: this.message.slice(startPosition.offset, this.offset()),
              err: null
            };
          }
          break;
        }
        default:
          this.bump();
          break;
      }
    }
    return {
      val: this.message.slice(startPosition.offset, this.offset()),
      err: null
    };
  };
  Parser2.prototype.parseNumberSkeletonFromString = function(skeleton, location) {
    var tokens = [];
    try {
      tokens = parseNumberSkeletonFromString(skeleton);
    } catch (e) {
      return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location);
    }
    return {
      val: {
        type: SKELETON_TYPE.number,
        tokens,
        location,
        parsedOptions: this.shouldParseSkeletons ? parseNumberSkeleton(tokens) : {}
      },
      err: null
    };
  };
  Parser2.prototype.tryParsePluralOrSelectOptions = function(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
    var _a2;
    var hasOtherClause = false;
    var options2 = [];
    var parsedSelectors = new Set();
    var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
    while (true) {
      if (selector.length === 0) {
        var startPosition = this.clonePosition();
        if (parentArgType !== "select" && this.bumpIf("=")) {
          var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
          if (result.err) {
            return result;
          }
          selectorLocation = createLocation(startPosition, this.clonePosition());
          selector = this.message.slice(startPosition.offset, this.offset());
        } else {
          break;
        }
      }
      if (parsedSelectors.has(selector)) {
        return this.error(parentArgType === "select" ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
      }
      if (selector === "other") {
        hasOtherClause = true;
      }
      this.bumpSpace();
      var openingBracePosition = this.clonePosition();
      if (!this.bumpIf("{")) {
        return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
      }
      var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
      if (fragmentResult.err) {
        return fragmentResult;
      }
      var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
      if (argCloseResult.err) {
        return argCloseResult;
      }
      options2.push([
        selector,
        {
          value: fragmentResult.val,
          location: createLocation(openingBracePosition, this.clonePosition())
        }
      ]);
      parsedSelectors.add(selector);
      this.bumpSpace();
      _a2 = this.parseIdentifierIfPossible(), selector = _a2.value, selectorLocation = _a2.location;
    }
    if (options2.length === 0) {
      return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
    }
    if (this.requiresOtherClause && !hasOtherClause) {
      return this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
    }
    return { val: options2, err: null };
  };
  Parser2.prototype.tryParseDecimalInteger = function(expectNumberError, invalidNumberError) {
    var sign = 1;
    var startingPosition = this.clonePosition();
    if (this.bumpIf("+"))
      ;
    else if (this.bumpIf("-")) {
      sign = -1;
    }
    var hasDigits = false;
    var decimal = 0;
    while (!this.isEOF()) {
      var ch = this.char();
      if (ch >= 48 && ch <= 57) {
        hasDigits = true;
        decimal = decimal * 10 + (ch - 48);
        this.bump();
      } else {
        break;
      }
    }
    var location = createLocation(startingPosition, this.clonePosition());
    if (!hasDigits) {
      return this.error(expectNumberError, location);
    }
    decimal *= sign;
    if (!isSafeInteger(decimal)) {
      return this.error(invalidNumberError, location);
    }
    return { val: decimal, err: null };
  };
  Parser2.prototype.offset = function() {
    return this.position.offset;
  };
  Parser2.prototype.isEOF = function() {
    return this.offset() === this.message.length;
  };
  Parser2.prototype.clonePosition = function() {
    return {
      offset: this.position.offset,
      line: this.position.line,
      column: this.position.column
    };
  };
  Parser2.prototype.char = function() {
    var offset = this.position.offset;
    if (offset >= this.message.length) {
      throw Error("out of bound");
    }
    var code = codePointAt(this.message, offset);
    if (code === void 0) {
      throw Error("Offset " + offset + " is at invalid UTF-16 code unit boundary");
    }
    return code;
  };
  Parser2.prototype.error = function(kind, location) {
    return {
      val: null,
      err: {
        kind,
        message: this.message,
        location
      }
    };
  };
  Parser2.prototype.bump = function() {
    if (this.isEOF()) {
      return;
    }
    var code = this.char();
    if (code === 10) {
      this.position.line += 1;
      this.position.column = 1;
      this.position.offset += 1;
    } else {
      this.position.column += 1;
      this.position.offset += code < 65536 ? 1 : 2;
    }
  };
  Parser2.prototype.bumpIf = function(prefix) {
    if (startsWith(this.message, prefix, this.offset())) {
      for (var i2 = 0; i2 < prefix.length; i2++) {
        this.bump();
      }
      return true;
    }
    return false;
  };
  Parser2.prototype.bumpUntil = function(pattern) {
    var currentOffset = this.offset();
    var index2 = this.message.indexOf(pattern, currentOffset);
    if (index2 >= 0) {
      this.bumpTo(index2);
      return true;
    } else {
      this.bumpTo(this.message.length);
      return false;
    }
  };
  Parser2.prototype.bumpTo = function(targetOffset) {
    if (this.offset() > targetOffset) {
      throw Error("targetOffset " + targetOffset + " must be greater than or equal to the current offset " + this.offset());
    }
    targetOffset = Math.min(targetOffset, this.message.length);
    while (true) {
      var offset = this.offset();
      if (offset === targetOffset) {
        break;
      }
      if (offset > targetOffset) {
        throw Error("targetOffset " + targetOffset + " is at invalid UTF-16 code unit boundary");
      }
      this.bump();
      if (this.isEOF()) {
        break;
      }
    }
  };
  Parser2.prototype.bumpSpace = function() {
    while (!this.isEOF() && _isWhiteSpace(this.char())) {
      this.bump();
    }
  };
  Parser2.prototype.peek = function() {
    if (this.isEOF()) {
      return null;
    }
    var code = this.char();
    var offset = this.offset();
    var nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
    return nextCode !== null && nextCode !== void 0 ? nextCode : null;
  };
  return Parser2;
}();
function _isAlpha(codepoint) {
  return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
  return _isAlpha(codepoint) || codepoint === 47;
}
function _isPotentialElementNameChar(c2) {
  return c2 === 45 || c2 === 46 || c2 >= 48 && c2 <= 57 || c2 === 95 || c2 >= 97 && c2 <= 122 || c2 >= 65 && c2 <= 90 || c2 == 183 || c2 >= 192 && c2 <= 214 || c2 >= 216 && c2 <= 246 || c2 >= 248 && c2 <= 893 || c2 >= 895 && c2 <= 8191 || c2 >= 8204 && c2 <= 8205 || c2 >= 8255 && c2 <= 8256 || c2 >= 8304 && c2 <= 8591 || c2 >= 11264 && c2 <= 12271 || c2 >= 12289 && c2 <= 55295 || c2 >= 63744 && c2 <= 64975 || c2 >= 65008 && c2 <= 65533 || c2 >= 65536 && c2 <= 983039;
}
function _isWhiteSpace(c2) {
  return c2 >= 9 && c2 <= 13 || c2 === 32 || c2 === 133 || c2 >= 8206 && c2 <= 8207 || c2 === 8232 || c2 === 8233;
}
function _isPatternSyntax(c2) {
  return c2 >= 33 && c2 <= 35 || c2 === 36 || c2 >= 37 && c2 <= 39 || c2 === 40 || c2 === 41 || c2 === 42 || c2 === 43 || c2 === 44 || c2 === 45 || c2 >= 46 && c2 <= 47 || c2 >= 58 && c2 <= 59 || c2 >= 60 && c2 <= 62 || c2 >= 63 && c2 <= 64 || c2 === 91 || c2 === 92 || c2 === 93 || c2 === 94 || c2 === 96 || c2 === 123 || c2 === 124 || c2 === 125 || c2 === 126 || c2 === 161 || c2 >= 162 && c2 <= 165 || c2 === 166 || c2 === 167 || c2 === 169 || c2 === 171 || c2 === 172 || c2 === 174 || c2 === 176 || c2 === 177 || c2 === 182 || c2 === 187 || c2 === 191 || c2 === 215 || c2 === 247 || c2 >= 8208 && c2 <= 8213 || c2 >= 8214 && c2 <= 8215 || c2 === 8216 || c2 === 8217 || c2 === 8218 || c2 >= 8219 && c2 <= 8220 || c2 === 8221 || c2 === 8222 || c2 === 8223 || c2 >= 8224 && c2 <= 8231 || c2 >= 8240 && c2 <= 8248 || c2 === 8249 || c2 === 8250 || c2 >= 8251 && c2 <= 8254 || c2 >= 8257 && c2 <= 8259 || c2 === 8260 || c2 === 8261 || c2 === 8262 || c2 >= 8263 && c2 <= 8273 || c2 === 8274 || c2 === 8275 || c2 >= 8277 && c2 <= 8286 || c2 >= 8592 && c2 <= 8596 || c2 >= 8597 && c2 <= 8601 || c2 >= 8602 && c2 <= 8603 || c2 >= 8604 && c2 <= 8607 || c2 === 8608 || c2 >= 8609 && c2 <= 8610 || c2 === 8611 || c2 >= 8612 && c2 <= 8613 || c2 === 8614 || c2 >= 8615 && c2 <= 8621 || c2 === 8622 || c2 >= 8623 && c2 <= 8653 || c2 >= 8654 && c2 <= 8655 || c2 >= 8656 && c2 <= 8657 || c2 === 8658 || c2 === 8659 || c2 === 8660 || c2 >= 8661 && c2 <= 8691 || c2 >= 8692 && c2 <= 8959 || c2 >= 8960 && c2 <= 8967 || c2 === 8968 || c2 === 8969 || c2 === 8970 || c2 === 8971 || c2 >= 8972 && c2 <= 8991 || c2 >= 8992 && c2 <= 8993 || c2 >= 8994 && c2 <= 9e3 || c2 === 9001 || c2 === 9002 || c2 >= 9003 && c2 <= 9083 || c2 === 9084 || c2 >= 9085 && c2 <= 9114 || c2 >= 9115 && c2 <= 9139 || c2 >= 9140 && c2 <= 9179 || c2 >= 9180 && c2 <= 9185 || c2 >= 9186 && c2 <= 9254 || c2 >= 9255 && c2 <= 9279 || c2 >= 9280 && c2 <= 9290 || c2 >= 9291 && c2 <= 9311 || c2 >= 9472 && c2 <= 9654 || c2 === 9655 || c2 >= 9656 && c2 <= 9664 || c2 === 9665 || c2 >= 9666 && c2 <= 9719 || c2 >= 9720 && c2 <= 9727 || c2 >= 9728 && c2 <= 9838 || c2 === 9839 || c2 >= 9840 && c2 <= 10087 || c2 === 10088 || c2 === 10089 || c2 === 10090 || c2 === 10091 || c2 === 10092 || c2 === 10093 || c2 === 10094 || c2 === 10095 || c2 === 10096 || c2 === 10097 || c2 === 10098 || c2 === 10099 || c2 === 10100 || c2 === 10101 || c2 >= 10132 && c2 <= 10175 || c2 >= 10176 && c2 <= 10180 || c2 === 10181 || c2 === 10182 || c2 >= 10183 && c2 <= 10213 || c2 === 10214 || c2 === 10215 || c2 === 10216 || c2 === 10217 || c2 === 10218 || c2 === 10219 || c2 === 10220 || c2 === 10221 || c2 === 10222 || c2 === 10223 || c2 >= 10224 && c2 <= 10239 || c2 >= 10240 && c2 <= 10495 || c2 >= 10496 && c2 <= 10626 || c2 === 10627 || c2 === 10628 || c2 === 10629 || c2 === 10630 || c2 === 10631 || c2 === 10632 || c2 === 10633 || c2 === 10634 || c2 === 10635 || c2 === 10636 || c2 === 10637 || c2 === 10638 || c2 === 10639 || c2 === 10640 || c2 === 10641 || c2 === 10642 || c2 === 10643 || c2 === 10644 || c2 === 10645 || c2 === 10646 || c2 === 10647 || c2 === 10648 || c2 >= 10649 && c2 <= 10711 || c2 === 10712 || c2 === 10713 || c2 === 10714 || c2 === 10715 || c2 >= 10716 && c2 <= 10747 || c2 === 10748 || c2 === 10749 || c2 >= 10750 && c2 <= 11007 || c2 >= 11008 && c2 <= 11055 || c2 >= 11056 && c2 <= 11076 || c2 >= 11077 && c2 <= 11078 || c2 >= 11079 && c2 <= 11084 || c2 >= 11085 && c2 <= 11123 || c2 >= 11124 && c2 <= 11125 || c2 >= 11126 && c2 <= 11157 || c2 === 11158 || c2 >= 11159 && c2 <= 11263 || c2 >= 11776 && c2 <= 11777 || c2 === 11778 || c2 === 11779 || c2 === 11780 || c2 === 11781 || c2 >= 11782 && c2 <= 11784 || c2 === 11785 || c2 === 11786 || c2 === 11787 || c2 === 11788 || c2 === 11789 || c2 >= 11790 && c2 <= 11798 || c2 === 11799 || c2 >= 11800 && c2 <= 11801 || c2 === 11802 || c2 === 11803 || c2 === 11804 || c2 === 11805 || c2 >= 11806 && c2 <= 11807 || c2 === 11808 || c2 === 11809 || c2 === 11810 || c2 === 11811 || c2 === 11812 || c2 === 11813 || c2 === 11814 || c2 === 11815 || c2 === 11816 || c2 === 11817 || c2 >= 11818 && c2 <= 11822 || c2 === 11823 || c2 >= 11824 && c2 <= 11833 || c2 >= 11834 && c2 <= 11835 || c2 >= 11836 && c2 <= 11839 || c2 === 11840 || c2 === 11841 || c2 === 11842 || c2 >= 11843 && c2 <= 11855 || c2 >= 11856 && c2 <= 11857 || c2 === 11858 || c2 >= 11859 && c2 <= 11903 || c2 >= 12289 && c2 <= 12291 || c2 === 12296 || c2 === 12297 || c2 === 12298 || c2 === 12299 || c2 === 12300 || c2 === 12301 || c2 === 12302 || c2 === 12303 || c2 === 12304 || c2 === 12305 || c2 >= 12306 && c2 <= 12307 || c2 === 12308 || c2 === 12309 || c2 === 12310 || c2 === 12311 || c2 === 12312 || c2 === 12313 || c2 === 12314 || c2 === 12315 || c2 === 12316 || c2 === 12317 || c2 >= 12318 && c2 <= 12319 || c2 === 12320 || c2 === 12336 || c2 === 64830 || c2 === 64831 || c2 >= 65093 && c2 <= 65094;
}
function pruneLocation(els) {
  els.forEach(function(el) {
    delete el.location;
    if (isSelectElement(el) || isPluralElement(el)) {
      for (var k2 in el.options) {
        delete el.options[k2].location;
        pruneLocation(el.options[k2].value);
      }
    } else if (isNumberElement(el) && isNumberSkeleton(el.style)) {
      delete el.style.location;
    } else if ((isDateElement(el) || isTimeElement(el)) && isDateTimeSkeleton(el.style)) {
      delete el.style.location;
    } else if (isTagElement(el)) {
      pruneLocation(el.children);
    }
  });
}
function parse(message, opts) {
  if (opts === void 0) {
    opts = {};
  }
  opts = __assign({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
  var result = new Parser(message, opts).parse();
  if (result.err) {
    var error2 = SyntaxError(ErrorKind[result.err.kind]);
    error2.location = result.err.location;
    error2.originalMessage = result.err.message;
    throw error2;
  }
  if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
    pruneLocation(result.val);
  }
  return result.val;
}
function memoize(fn, options2) {
  var cache = options2 && options2.cache ? options2.cache : cacheDefault;
  var serializer = options2 && options2.serializer ? options2.serializer : serializerDefault;
  var strategy = options2 && options2.strategy ? options2.strategy : strategyDefault;
  return strategy(fn, {
    cache,
    serializer
  });
}
function isPrimitive(value) {
  return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options2) {
  var strategy = fn.length === 1 ? monadic : variadic;
  return assemble(fn, this, strategy, options2.cache.create(), options2.serializer);
}
function strategyVariadic(fn, options2) {
  return assemble(fn, this, variadic, options2.cache.create(), options2.serializer);
}
function strategyMonadic(fn, options2) {
  return assemble(fn, this, monadic, options2.cache.create(), options2.serializer);
}
var serializerDefault = function() {
  return JSON.stringify(arguments);
};
function ObjectWithoutPrototypeCache() {
  this.cache = Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.get = function(key) {
  return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
  this.cache[key] = value;
};
var cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  }
};
var strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
};
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["MISSING_VALUE"] = "MISSING_VALUE";
  ErrorCode2["INVALID_VALUE"] = "INVALID_VALUE";
  ErrorCode2["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = function(_super) {
  __extends(FormatError2, _super);
  function FormatError2(msg, code, originalMessage) {
    var _this = _super.call(this, msg) || this;
    _this.code = code;
    _this.originalMessage = originalMessage;
    return _this;
  }
  FormatError2.prototype.toString = function() {
    return "[formatjs Error: " + this.code + "] " + this.message;
  };
  return FormatError2;
}(Error);
var InvalidValueError = function(_super) {
  __extends(InvalidValueError2, _super);
  function InvalidValueError2(variableId, value, options2, originalMessage) {
    return _super.call(this, 'Invalid values for "' + variableId + '": "' + value + '". Options are "' + Object.keys(options2).join('", "') + '"', ErrorCode.INVALID_VALUE, originalMessage) || this;
  }
  return InvalidValueError2;
}(FormatError);
var InvalidValueTypeError = function(_super) {
  __extends(InvalidValueTypeError2, _super);
  function InvalidValueTypeError2(value, type, originalMessage) {
    return _super.call(this, 'Value for "' + value + '" must be of type ' + type, ErrorCode.INVALID_VALUE, originalMessage) || this;
  }
  return InvalidValueTypeError2;
}(FormatError);
var MissingValueError = function(_super) {
  __extends(MissingValueError2, _super);
  function MissingValueError2(variableId, originalMessage) {
    return _super.call(this, 'The intl string context variable "' + variableId + '" was not provided to the string "' + originalMessage + '"', ErrorCode.MISSING_VALUE, originalMessage) || this;
  }
  return MissingValueError2;
}(FormatError);
var PART_TYPE;
(function(PART_TYPE2) {
  PART_TYPE2[PART_TYPE2["literal"] = 0] = "literal";
  PART_TYPE2[PART_TYPE2["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
  if (parts.length < 2) {
    return parts;
  }
  return parts.reduce(function(all, part) {
    var lastPart = all[all.length - 1];
    if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
      all.push(part);
    } else {
      lastPart.value += part.value;
    }
    return all;
  }, []);
}
function isFormatXMLElementFn(el) {
  return typeof el === "function";
}
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
  if (els.length === 1 && isLiteralElement(els[0])) {
    return [
      {
        type: PART_TYPE.literal,
        value: els[0].value
      }
    ];
  }
  var result = [];
  for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
    var el = els_1[_i];
    if (isLiteralElement(el)) {
      result.push({
        type: PART_TYPE.literal,
        value: el.value
      });
      continue;
    }
    if (isPoundElement(el)) {
      if (typeof currentPluralValue === "number") {
        result.push({
          type: PART_TYPE.literal,
          value: formatters.getNumberFormat(locales).format(currentPluralValue)
        });
      }
      continue;
    }
    var varName = el.value;
    if (!(values && varName in values)) {
      throw new MissingValueError(varName, originalMessage);
    }
    var value = values[varName];
    if (isArgumentElement(el)) {
      if (!value || typeof value === "string" || typeof value === "number") {
        value = typeof value === "string" || typeof value === "number" ? String(value) : "";
      }
      result.push({
        type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
        value
      });
      continue;
    }
    if (isDateElement(el)) {
      var style = typeof el.style === "string" ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getDateTimeFormat(locales, style).format(value)
      });
      continue;
    }
    if (isTimeElement(el)) {
      var style = typeof el.style === "string" ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getDateTimeFormat(locales, style).format(value)
      });
      continue;
    }
    if (isNumberElement(el)) {
      var style = typeof el.style === "string" ? formats.number[el.style] : isNumberSkeleton(el.style) ? el.style.parsedOptions : void 0;
      if (style && style.scale) {
        value = value * (style.scale || 1);
      }
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getNumberFormat(locales, style).format(value)
      });
      continue;
    }
    if (isTagElement(el)) {
      var children = el.children, value_1 = el.value;
      var formatFn = values[value_1];
      if (!isFormatXMLElementFn(formatFn)) {
        throw new InvalidValueTypeError(value_1, "function", originalMessage);
      }
      var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
      var chunks = formatFn(parts.map(function(p2) {
        return p2.value;
      }));
      if (!Array.isArray(chunks)) {
        chunks = [chunks];
      }
      result.push.apply(result, chunks.map(function(c2) {
        return {
          type: typeof c2 === "string" ? PART_TYPE.literal : PART_TYPE.object,
          value: c2
        };
      }));
    }
    if (isSelectElement(el)) {
      var opt = el.options[value] || el.options.other;
      if (!opt) {
        throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
      }
      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
      continue;
    }
    if (isPluralElement(el)) {
      var opt = el.options["=" + value];
      if (!opt) {
        if (!Intl.PluralRules) {
          throw new FormatError('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', ErrorCode.MISSING_INTL_API, originalMessage);
        }
        var rule = formatters.getPluralRules(locales, { type: el.pluralType }).select(value - (el.offset || 0));
        opt = el.options[rule] || el.options.other;
      }
      if (!opt) {
        throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
      }
      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
      continue;
    }
  }
  return mergeLiteral(result);
}
function mergeConfig(c1, c2) {
  if (!c2) {
    return c1;
  }
  return __assign(__assign(__assign({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function(all, k2) {
    all[k2] = __assign(__assign({}, c1[k2]), c2[k2] || {});
    return all;
  }, {}));
}
function mergeConfigs(defaultConfig, configs) {
  if (!configs) {
    return defaultConfig;
  }
  return Object.keys(defaultConfig).reduce(function(all, k2) {
    all[k2] = mergeConfig(defaultConfig[k2], configs[k2]);
    return all;
  }, __assign({}, defaultConfig));
}
function createFastMemoizeCache(store) {
  return {
    create: function() {
      return {
        get: function(key) {
          return store[key];
        },
        set: function(key, value) {
          store[key] = value;
        }
      };
    }
  };
}
function createDefaultFormatters(cache) {
  if (cache === void 0) {
    cache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };
  }
  return {
    getNumberFormat: memoize(function() {
      var _a2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a2 = Intl.NumberFormat).bind.apply(_a2, __spreadArray([void 0], args)))();
    }, {
      cache: createFastMemoizeCache(cache.number),
      strategy: strategies.variadic
    }),
    getDateTimeFormat: memoize(function() {
      var _a2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a2 = Intl.DateTimeFormat).bind.apply(_a2, __spreadArray([void 0], args)))();
    }, {
      cache: createFastMemoizeCache(cache.dateTime),
      strategy: strategies.variadic
    }),
    getPluralRules: memoize(function() {
      var _a2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a2 = Intl.PluralRules).bind.apply(_a2, __spreadArray([void 0], args)))();
    }, {
      cache: createFastMemoizeCache(cache.pluralRules),
      strategy: strategies.variadic
    })
  };
}
var IntlMessageFormat = function() {
  function IntlMessageFormat2(message, locales, overrideFormats, opts) {
    var _this = this;
    if (locales === void 0) {
      locales = IntlMessageFormat2.defaultLocale;
    }
    this.formatterCache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };
    this.format = function(values) {
      var parts = _this.formatToParts(values);
      if (parts.length === 1) {
        return parts[0].value;
      }
      var result = parts.reduce(function(all, part) {
        if (!all.length || part.type !== PART_TYPE.literal || typeof all[all.length - 1] !== "string") {
          all.push(part.value);
        } else {
          all[all.length - 1] += part.value;
        }
        return all;
      }, []);
      if (result.length <= 1) {
        return result[0] || "";
      }
      return result;
    };
    this.formatToParts = function(values) {
      return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, void 0, _this.message);
    };
    this.resolvedOptions = function() {
      return {
        locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
      };
    };
    this.getAst = function() {
      return _this.ast;
    };
    if (typeof message === "string") {
      this.message = message;
      if (!IntlMessageFormat2.__parse) {
        throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
      }
      this.ast = IntlMessageFormat2.__parse(message, {
        ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag
      });
    } else {
      this.ast = message;
    }
    if (!Array.isArray(this.ast)) {
      throw new TypeError("A message must be provided as a String or AST.");
    }
    this.formats = mergeConfigs(IntlMessageFormat2.formats, overrideFormats);
    this.locales = locales;
    this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
  }
  Object.defineProperty(IntlMessageFormat2, "defaultLocale", {
    get: function() {
      if (!IntlMessageFormat2.memoizedDefaultLocale) {
        IntlMessageFormat2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
      }
      return IntlMessageFormat2.memoizedDefaultLocale;
    },
    enumerable: false,
    configurable: true
  });
  IntlMessageFormat2.memoizedDefaultLocale = null;
  IntlMessageFormat2.__parse = parse;
  IntlMessageFormat2.formats = {
    number: {
      integer: {
        maximumFractionDigits: 0
      },
      currency: {
        style: "currency"
      },
      percent: {
        style: "percent"
      }
    },
    date: {
      short: {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
      },
      medium: {
        month: "short",
        day: "numeric",
        year: "numeric"
      },
      long: {
        month: "long",
        day: "numeric",
        year: "numeric"
      },
      full: {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    },
    time: {
      short: {
        hour: "numeric",
        minute: "numeric"
      },
      medium: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      },
      long: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      },
      full: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      }
    }
  };
  return IntlMessageFormat2;
}();
var o = IntlMessageFormat;
var r = {};
var i = (e, n, t) => t ? (n in r || (r[n] = {}), e in r[n] || (r[n][e] = t), t) : t;
var l = (e, n) => {
  if (n == null)
    return;
  if (n in r && e in r[n])
    return r[n][e];
  const t = E(n);
  for (let o2 = 0; o2 < t.length; o2++) {
    const r2 = c(t[o2], e);
    if (r2)
      return i(e, n, r2);
  }
};
var a;
var s = writable({});
function u(e) {
  return e in a;
}
function c(e, n) {
  if (!u(e))
    return null;
  return function(e2, n2) {
    if (n2 == null)
      return;
    if (n2 in e2)
      return e2[n2];
    const t = n2.split(".");
    let o2 = e2;
    for (let e3 = 0; e3 < t.length; e3++)
      if (typeof o2 == "object") {
        if (e3 > 0) {
          const n3 = t.slice(e3, t.length).join(".");
          if (n3 in o2) {
            o2 = o2[n3];
            break;
          }
        }
        o2 = o2[t[e3]];
      } else
        o2 = void 0;
    return o2;
  }(function(e2) {
    return a[e2] || null;
  }(e), n);
}
function m(e, ...n) {
  delete r[e], s.update((o2) => (o2[e] = cjs.all([o2[e] || {}, ...n]), o2));
}
derived([s], ([e]) => Object.keys(e));
s.subscribe((e) => a = e);
var d = {};
function g(e) {
  return d[e];
}
function w(e) {
  return e != null && E(e).some((e2) => {
    var n;
    return (n = g(e2)) === null || n === void 0 ? void 0 : n.size;
  });
}
function h(e, n) {
  return Promise.all(n.map((n2) => (function(e2, n3) {
    d[e2].delete(n3), d[e2].size === 0 && delete d[e2];
  }(e, n2), n2().then((e2) => e2.default || e2)))).then((n2) => m(e, ...n2));
}
var p = {};
function b(e) {
  if (!w(e))
    return e in p ? p[e] : Promise.resolve();
  const n = function(e2) {
    return E(e2).map((e3) => {
      const n2 = g(e3);
      return [e3, n2 ? [...n2] : []];
    }).filter(([, e3]) => e3.length > 0);
  }(e);
  return p[e] = Promise.all(n.map(([e2, n2]) => h(e2, n2))).then(() => {
    if (w(e))
      return b(e);
    delete p[e];
  }), p[e];
}
function v(e, n) {
  var t = {};
  for (var o2 in e)
    Object.prototype.hasOwnProperty.call(e, o2) && n.indexOf(o2) < 0 && (t[o2] = e[o2]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function") {
    var r2 = 0;
    for (o2 = Object.getOwnPropertySymbols(e); r2 < o2.length; r2++)
      n.indexOf(o2[r2]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o2[r2]) && (t[o2[r2]] = e[o2[r2]]);
  }
  return t;
}
var O = { fallbackLocale: null, loadingDelay: 200, formats: { number: { scientific: { notation: "scientific" }, engineering: { notation: "engineering" }, compactLong: { notation: "compact", compactDisplay: "long" }, compactShort: { notation: "compact", compactDisplay: "short" } }, date: { short: { month: "numeric", day: "numeric", year: "2-digit" }, medium: { month: "short", day: "numeric", year: "numeric" }, long: { month: "long", day: "numeric", year: "numeric" }, full: { weekday: "long", month: "long", day: "numeric", year: "numeric" } }, time: { short: { hour: "numeric", minute: "numeric" }, medium: { hour: "numeric", minute: "numeric", second: "numeric" }, long: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" }, full: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" } } }, warnOnMissingMessages: true, ignoreTag: true };
function j() {
  return O;
}
function $(e) {
  const { formats: n } = e, t = v(e, ["formats"]), o2 = e.initialLocale || e.fallbackLocale;
  return Object.assign(O, t, { initialLocale: o2 }), n && ("number" in n && Object.assign(O.formats.number, n.number), "date" in n && Object.assign(O.formats.date, n.date), "time" in n && Object.assign(O.formats.time, n.time)), M.set(o2);
}
var k = writable(false);
var L;
var T = writable(null);
function x(e) {
  return e.split("-").map((e2, n, t) => t.slice(0, n + 1).join("-")).reverse();
}
function E(e, n = j().fallbackLocale) {
  const t = x(e);
  return n ? [...new Set([...t, ...x(n)])] : t;
}
function D() {
  return L != null ? L : void 0;
}
T.subscribe((e) => {
  L = e != null ? e : void 0, typeof window != "undefined" && e != null && document.documentElement.setAttribute("lang", e);
});
var M = Object.assign(Object.assign({}, T), { set: (e) => {
  if (e && function(e2) {
    if (e2 == null)
      return;
    const n = E(e2);
    for (let e3 = 0; e3 < n.length; e3++) {
      const t = n[e3];
      if (u(t))
        return t;
    }
  }(e) && w(e)) {
    const { loadingDelay: n } = j();
    let t;
    return typeof window != "undefined" && D() != null && n ? t = window.setTimeout(() => k.set(true), n) : k.set(true), b(e).then(() => {
      T.set(e);
    }).finally(() => {
      clearTimeout(t), k.set(false);
    });
  }
  return T.set(e);
} });
var I = () => typeof window == "undefined" ? null : window.navigator.language || window.navigator.languages[0];
var Z = (e) => {
  const n = Object.create(null);
  return (t) => {
    const o2 = JSON.stringify(t);
    return o2 in n ? n[o2] : n[o2] = e(t);
  };
};
var C = (e, n) => {
  const { formats: t } = j();
  if (e in t && n in t[e])
    return t[e][n];
  throw new Error(`[svelte-i18n] Unknown "${n}" ${e} format.`);
};
var G = Z((e) => {
  var { locale: n, format: t } = e, o2 = v(e, ["locale", "format"]);
  if (n == null)
    throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
  return t && (o2 = C("number", t)), new Intl.NumberFormat(n, o2);
});
var J = Z((e) => {
  var { locale: n, format: t } = e, o2 = v(e, ["locale", "format"]);
  if (n == null)
    throw new Error('[svelte-i18n] A "locale" must be set to format dates');
  return t ? o2 = C("date", t) : Object.keys(o2).length === 0 && (o2 = C("date", "short")), new Intl.DateTimeFormat(n, o2);
});
var U = Z((e) => {
  var { locale: n, format: t } = e, o2 = v(e, ["locale", "format"]);
  if (n == null)
    throw new Error('[svelte-i18n] A "locale" must be set to format time values');
  return t ? o2 = C("time", t) : Object.keys(o2).length === 0 && (o2 = C("time", "short")), new Intl.DateTimeFormat(n, o2);
});
var _ = (e = {}) => {
  var { locale: n = D() } = e, t = v(e, ["locale"]);
  return G(Object.assign({ locale: n }, t));
};
var q = (e = {}) => {
  var { locale: n = D() } = e, t = v(e, ["locale"]);
  return J(Object.assign({ locale: n }, t));
};
var B = (e = {}) => {
  var { locale: n = D() } = e, t = v(e, ["locale"]);
  return U(Object.assign({ locale: n }, t));
};
var H = Z((e, n = D()) => new o(e, n, j().formats, { ignoreTag: j().ignoreTag }));
var K = (e, n = {}) => {
  let t = n;
  typeof e == "object" && (t = e, e = t.id);
  const { values: o2, locale: r2 = D(), default: i2 } = t;
  if (r2 == null)
    throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");
  let a2 = l(e, r2);
  if (a2) {
    if (typeof a2 != "string")
      return console.warn(`[svelte-i18n] Message with id "${e}" must be of type "string", found: "${typeof a2}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`), a2;
  } else
    j().warnOnMissingMessages && console.warn(`[svelte-i18n] The message "${e}" was not found in "${E(r2).join('", "')}".${w(D()) ? "\n\nNote: there are at least one loader still registered to this locale that wasn't executed." : ""}`), a2 = i2 != null ? i2 : e;
  if (!o2)
    return a2;
  let s2 = a2;
  try {
    s2 = H(a2, r2).format(o2);
  } catch (n2) {
    console.warn(`[svelte-i18n] Message "${e}" has syntax error:`, n2.message);
  }
  return s2;
};
var Q = (e, n) => B(n).format(e);
var R = (e, n) => q(n).format(e);
var V = (e, n) => _(n).format(e);
var W = (e, n = D()) => l(e, n);
var X = derived([M, s], () => K);
derived([M], () => Q);
derived([M], () => R);
derived([M], () => V);
derived([M, s], () => W);
var css$2 = {
  code: ".bonjour-button.svelte-hwsv7h.svelte-hwsv7h{background-color:#E93E3E;writing-mode:vertical-rl;text-orientation:sideways;position:absolute;right:50px;top:400px;color:#1900ff;padding:10px;border-radius:14.33px;font-size:0.8rem;z-index:2;font-weight:400;font-family:'moret';cursor:pointer;width:8px;line-height:8px}.bonjour-dialog-container.svelte-hwsv7h.svelte-hwsv7h{position:relative;color:#1f0edf;overflow-y:auto;font-family:'roc-grotesk';font-size:.875rem;font-weight:400}.bonjour-dialog-container.svelte-hwsv7h h1.svelte-hwsv7h{font-weight:100;font-size:1rem;font-family:'Opposit-Medium';color:#fff}.bonjour-dialog-container.svelte-hwsv7h h4.svelte-hwsv7h{margin-bottom:0;margin-top:0;font-weight:700;font-size:.875rem;font-family:'roc-grotesk'}.bonjour-dialog-container.svelte-hwsv7h .p1.svelte-hwsv7h{font-size:0.875rem;font-weight:400;font-family:'roc-grotesk';width:80%;margin-top:5px}.bonjour-dialog-container.svelte-hwsv7h .footer.svelte-hwsv7h{color:#000;margin-top:35px;font-size:0.775rem;font-weight:200;font-family:'roc-grotesk'}.bonjour-dialog-container.svelte-hwsv7h .footer .social h3.svelte-hwsv7h{font-size:1rem;letter-spacing:.015rem;font-family:'moret';color:#e2ee75}.bonjour-dialog-container.svelte-hwsv7h .footer .social h3 span.svelte-hwsv7h{color:#f8d0fb}.bonjour-button.close.svelte-hwsv7h.svelte-hwsv7h{background-color:#1f0edf;color:#f86c01;top:245px;right:25px;text-transform:uppercase}@media screen and (max-width: 600px){.bonjour-button.svelte-hwsv7h.svelte-hwsv7h{top:120px;right:50px}.bonjour-button.close.svelte-hwsv7h.svelte-hwsv7h{top:5px;right:25px}}@media screen and (max-width: 1200px) and (max-height: 499px){.bonjour-dialog-container.svelte-hwsv7h.svelte-hwsv7h{display:flex}.bonjour-dialog-container.svelte-hwsv7h h1.svelte-hwsv7h{font-size:1rem}.bonjour-dialog-container.svelte-hwsv7h p.svelte-hwsv7h,.bonjour-dialog-container.svelte-hwsv7h .p1.svelte-hwsv7h{line-height:1.3;font-size:1rem}.bonjour-dialog-container.svelte-hwsv7h .footer p.svelte-hwsv7h{font-size:1rem}.bonjour-button.svelte-hwsv7h.svelte-hwsv7h{display:none}}",
  map: `{"version":3,"file":"SayBonjour.svelte","sources":["SayBonjour.svelte"],"sourcesContent":["<script>\\n  import { _ } from 'svelte-i18n';\\nimport { start_hydrating } from 'svelte/internal';\\n\\n  export let hideBonjourDialog;\\n  export let isMobile;\\n<\/script>\\n\\n<div class=\\"bonjour-dialog-container\\">\\n  <div>\\n    <h1>{$_('dialog.sayHi.title')}</h1>\\n    <p class=\\"p1\\">\\n      {$_('dialog.sayHi.p1.text1')}\\n      <!-- {$_('dialog.sayHi.p1.text2')} -->\\n      {#if isMobile}\\n        <br />\\n        <br />\\n      {/if}\\n      {@html $_('dialog.sayHi.p1.text3')}\\n      <br />\\n      <br />\\n      \\n      {#if !isMobile}\\n        {$_('dialog.sayHi.p1.text4')}\\n      {/if}\\n      <!-- {$_('dialog.sayHi.p1.text5')}\\n      {$_('dialog.sayHi.p1.text6')}\\n      {$_('dialog.sayHi.p1.text7')} -->\\n    </p>\\n  </div>\\n  <div>\\n    {#if isMobile}\\n      <h1 style=\\"opacity:0; visibility:hidden\\">{'Founded by'}</h1>\\n\\n      <p>\\n        {$_('dialog.sayHi.p1.text4')}\\n      </p>\\n    {/if}\\n    <div class=\\"address\\">\\n      <h4>{@html $_('dialog.sayHi.address1.title')}</h4>\\n      <span>{$_('dialog.sayHi.address1.text')}</span>\\n    </div>\\n    <div class=\\"address\\">\\n      <h4>{@html $_('dialog.sayHi.address2.title')}</h4>\\n      <span>{$_('dialog.sayHi.address2.text')}</span>\\n    </div>\\n\\n    <div class=\\"footer\\">\\n        <div class=\\"social\\">\\n          <h3>\\n            <a href=\\"mailto:salut@superbonjour.com\\" target=\\"__blank\\" class=\\"contact-link\\">GENERAL INQUIRIES\\n            </a> \\n            <a href=\\"https://www.instagram.com/super_bonjour/\\" target=\\"__blank\\" class=\\"contact-link\\">\\n              <span>\xB7</span>\\n              IG\\n            </a>\\n            <a href=\\"https://www.linkedin.com/company/super-bonjour/\\" target=\\"__blank\\" class=\\"contact-link\\">\\n              <span>\xB7</span>\\n              LINKEDIN\\n            </a>\\n          </h3>\\n        </div>\\n\\n      <p>{$_('dialog.sayHi.footer.text')}</p>\\n      <p>{$_('dialog.sayHi.disclaimer.text')}</p>\\n    </div>\\n    {#if !isMobile}\\n      <div class=\\"bonjour-button close\\" on:click={hideBonjourDialog}>\\n        {$_('dialog.sayBonjour')}\\n      </div>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n    \\n\\n    .bonjour-button {\\n    background-color: #E93E3E;\\n    writing-mode: vertical-rl;\\n    text-orientation: sideways;\\n    position: absolute;\\n    right: 50px;\\n    top: 400px;\\n    color: #1900ff;\\n    padding: 10px;\\n    border-radius: 14.33px;\\n    font-size: 0.8rem;\\n    z-index: 2;\\n    font-weight: 400;\\n    font-family: 'moret';\\n    cursor: pointer;\\n    width: 8px;\\n    line-height: 8px;\\n  }\\n\\n  .bonjour-dialog-container {\\n    position: relative;\\n    color: #1f0edf;\\n    overflow-y: auto;\\n    font-family: 'roc-grotesk';\\n    font-size: .875rem;\\n    font-weight: 400;\\n  }\\n  .bonjour-dialog-container h1 {\\n    font-weight: 100;\\n    font-size: 1rem;\\n    font-family: 'Opposit-Medium';\\n    color: #fff;\\n  }\\n  .bonjour-dialog-container h4 {\\n    margin-bottom: 0;\\n    margin-top: 0;\\n    font-weight: 700;\\n    font-size: .875rem;\\n    font-family: 'roc-grotesk';\\n  }\\n  .bonjour-dialog-container .p1 {\\n    font-size: 0.875rem;\\n    font-weight: 400;\\n    font-family: 'roc-grotesk';\\n    width: 80%;\\n    margin-top: 5px;\\n  }\\n  .bonjour-dialog-container .footer {\\n    color: #000;\\n    margin-top: 35px;\\n    font-size: 0.775rem;\\n    font-weight: 200;\\n    font-family: 'roc-grotesk';\\n  }\\n\\n  \\n\\n  .bonjour-dialog-container .footer .social h3 {\\n    font-size: 1rem;\\n    letter-spacing: .015rem;\\n    font-family: 'moret';\\n    color: #e2ee75;\\n  }\\n\\n  .bonjour-dialog-container .footer .social h3 span {\\n    color: #f8d0fb;\\n  }\\n  .bonjour-button.close {\\n    background-color: #1f0edf;\\n    color: #f86c01;\\n    top: 245px;\\n    right: 25px;\\n    text-transform: uppercase;\\n  }\\n\\n  @media screen and (max-width: 600px) {\\n    .bonjour-button {\\n      top: 120px;\\n      right: 50px;\\n    }\\n\\n    .bonjour-button.close {\\n      top: 5px;\\n      right: 25px;\\n    }\\n  }\\n\\n  /* Landscape Mobile*/\\n  @media screen and (max-width: 1200px) and (max-height: 499px) {\\n    .bonjour-dialog-container {\\n      display: flex;\\n    }\\n    .bonjour-dialog-container h1 {\\n      font-size: 1rem;\\n    }\\n    .bonjour-dialog-container p,\\n    .bonjour-dialog-container .p1 {\\n      line-height: 1.3;\\n      font-size: 1rem;\\n    }\\n\\n    .bonjour-dialog-container .footer p {\\n      font-size: 1rem;\\n    }\\n    .bonjour-button {\\n      display: none;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AA6EI,eAAe,4BAAC,CAAC,AACjB,gBAAgB,CAAE,OAAO,CACzB,YAAY,CAAE,WAAW,CACzB,gBAAgB,CAAE,QAAQ,CAC1B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,OAAO,CACtB,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,OAAO,CACpB,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,yBAAyB,4BAAC,CAAC,AACzB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,aAAa,CAC1B,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,uCAAyB,CAAC,EAAE,cAAC,CAAC,AAC5B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,gBAAgB,CAC7B,KAAK,CAAE,IAAI,AACb,CAAC,AACD,uCAAyB,CAAC,EAAE,cAAC,CAAC,AAC5B,aAAa,CAAE,CAAC,CAChB,UAAU,CAAE,CAAC,CACb,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,aAAa,AAC5B,CAAC,AACD,uCAAyB,CAAC,GAAG,cAAC,CAAC,AAC7B,SAAS,CAAE,QAAQ,CACnB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,aAAa,CAC1B,KAAK,CAAE,GAAG,CACV,UAAU,CAAE,GAAG,AACjB,CAAC,AACD,uCAAyB,CAAC,OAAO,cAAC,CAAC,AACjC,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,QAAQ,CACnB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,aAAa,AAC5B,CAAC,AAID,uCAAyB,CAAC,OAAO,CAAC,OAAO,CAAC,EAAE,cAAC,CAAC,AAC5C,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,OAAO,CACvB,WAAW,CAAE,OAAO,CACpB,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,uCAAyB,CAAC,OAAO,CAAC,OAAO,CAAC,EAAE,CAAC,IAAI,cAAC,CAAC,AACjD,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,eAAe,MAAM,4BAAC,CAAC,AACrB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,SAAS,AAC3B,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,eAAe,4BAAC,CAAC,AACf,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,IAAI,AACb,CAAC,AAED,eAAe,MAAM,4BAAC,CAAC,AACrB,GAAG,CAAE,GAAG,CACR,KAAK,CAAE,IAAI,AACb,CAAC,AACH,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,GAAG,CAAC,aAAa,KAAK,CAAC,AAAC,CAAC,AAC7D,yBAAyB,4BAAC,CAAC,AACzB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,uCAAyB,CAAC,EAAE,cAAC,CAAC,AAC5B,SAAS,CAAE,IAAI,AACjB,CAAC,AACD,uCAAyB,CAAC,eAAC,CAC3B,uCAAyB,CAAC,GAAG,cAAC,CAAC,AAC7B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,uCAAyB,CAAC,OAAO,CAAC,CAAC,cAAC,CAAC,AACnC,SAAS,CAAE,IAAI,AACjB,CAAC,AACD,eAAe,4BAAC,CAAC,AACf,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC"}`
};
var SayBonjour = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(X, (value) => $_ = value);
  let { hideBonjourDialog } = $$props;
  let { isMobile } = $$props;
  if ($$props.hideBonjourDialog === void 0 && $$bindings.hideBonjourDialog && hideBonjourDialog !== void 0)
    $$bindings.hideBonjourDialog(hideBonjourDialog);
  if ($$props.isMobile === void 0 && $$bindings.isMobile && isMobile !== void 0)
    $$bindings.isMobile(isMobile);
  $$result.css.add(css$2);
  $$unsubscribe__();
  return `<div class="${"bonjour-dialog-container svelte-hwsv7h"}"><div><h1 class="${"svelte-hwsv7h"}">${escape($_("dialog.sayHi.title"))}</h1>
    <p class="${"p1 svelte-hwsv7h"}">${escape($_("dialog.sayHi.p1.text1"))}
      
      ${isMobile ? `<br>
        <br>` : ``}
      <!-- HTML_TAG_START -->${$_("dialog.sayHi.p1.text3")}<!-- HTML_TAG_END -->
      <br>
      <br>
      
      ${!isMobile ? `${escape($_("dialog.sayHi.p1.text4"))}` : ``}
      </p></div>
  <div>${isMobile ? `<h1 style="${"opacity:0; visibility:hidden"}" class="${"svelte-hwsv7h"}">${escape("Founded by")}</h1>

      <p class="${"svelte-hwsv7h"}">${escape($_("dialog.sayHi.p1.text4"))}</p>` : ``}
    <div class="${"address"}"><h4 class="${"svelte-hwsv7h"}"><!-- HTML_TAG_START -->${$_("dialog.sayHi.address1.title")}<!-- HTML_TAG_END --></h4>
      <span class="${"svelte-hwsv7h"}">${escape($_("dialog.sayHi.address1.text"))}</span></div>
    <div class="${"address"}"><h4 class="${"svelte-hwsv7h"}"><!-- HTML_TAG_START -->${$_("dialog.sayHi.address2.title")}<!-- HTML_TAG_END --></h4>
      <span class="${"svelte-hwsv7h"}">${escape($_("dialog.sayHi.address2.text"))}</span></div>

    <div class="${"footer svelte-hwsv7h"}"><div class="${"social"}"><h3 class="${"svelte-hwsv7h"}"><a href="${"mailto:salut@superbonjour.com"}" target="${"__blank"}" class="${"contact-link"}">GENERAL INQUIRIES
            </a> 
            <a href="${"https://www.instagram.com/super_bonjour/"}" target="${"__blank"}" class="${"contact-link"}"><span class="${"svelte-hwsv7h"}">\xB7</span>
              IG
            </a>
            <a href="${"https://www.linkedin.com/company/super-bonjour/"}" target="${"__blank"}" class="${"contact-link"}"><span class="${"svelte-hwsv7h"}">\xB7</span>
              LINKEDIN
            </a></h3></div>

      <p class="${"svelte-hwsv7h"}">${escape($_("dialog.sayHi.footer.text"))}</p>
      <p class="${"svelte-hwsv7h"}">${escape($_("dialog.sayHi.disclaimer.text"))}</p></div>
    ${!isMobile ? `<div class="${"bonjour-button close svelte-hwsv7h"}">${escape($_("dialog.sayBonjour"))}</div>` : ``}</div>
</div>`;
});
var css$1 = {
  code: ".services.svelte-7oj6qs li.svelte-7oj6qs{margin-bottom:8px;line-height:130%}.popup.svelte-7oj6qs.svelte-7oj6qs{height:80vh;width:100vw;position:fixed;z-index:1500}.modal-container.svelte-7oj6qs.svelte-7oj6qs{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:stretch;align-content:stretch;height:80vh;width:100vw;font-family:'roc-grotesk';overflow-y:hide;position:relative}.modal-section.svelte-7oj6qs.svelte-7oj6qs{width:50%;min-width:300px;flex:1 1 auto}.left-side.svelte-7oj6qs.svelte-7oj6qs{background-color:#1900ff}.right-side.svelte-7oj6qs.svelte-7oj6qs{background-color:#e2ee75}.modal-section-content.svelte-7oj6qs.svelte-7oj6qs{padding:50px;padding-top:150px;position:relative;font-family:'moret';padding-bottom:0}.modal-section-content.svelte-7oj6qs p.svelte-7oj6qs{position:relative;left:0;z-index:1;margin-top:5px}.dialog-icon.svelte-7oj6qs.svelte-7oj6qs{position:absolute;right:-10px;width:64px;height:39px;padding:60px;cursor:pointer;z-index:4}.dialog-icon.mobile.svelte-7oj6qs.svelte-7oj6qs{display:none}.modal-container.svelte-7oj6qs.svelte-7oj6qs{color:#fff;overflow:auto}h5.title.svelte-7oj6qs.svelte-7oj6qs{font-family:'Opposit-Medium';font-weight:100;font-size:18px;color:#e2ee75;margin-bottom:2px;margin-left:5px}.dialog-center.svelte-7oj6qs.svelte-7oj6qs{position:absolute;top:120%;left:48%;width:350px}.left-text.svelte-7oj6qs.svelte-7oj6qs{font-size:54px;line-height:130%}.right.modal-section-content.svelte-7oj6qs.svelte-7oj6qs{display:flex;flex-direction:row;justify-content:space-around;font-family:'roc-grotesk';font-size:18px}.right.modal-section-content.svelte-7oj6qs h5.svelte-7oj6qs{color:#c84501;font-weight:200;margin-left:-20px}.right.modal-section-content.svelte-7oj6qs ul.svelte-7oj6qs{line-height:130%;margin-bottom:8px;list-style:none;margin:0;padding:0;color:#1900ff;margin-left:-20px}.dialog-center-mobile.svelte-7oj6qs.svelte-7oj6qs{display:none}.right.modal-section-content.svelte-7oj6qs h5.svelte-7oj6qs{color:#c84501;font-weight:200;margin-left:-20px}.right.modal-section-content.svelte-7oj6qs ul.svelte-7oj6qs{list-style:none;margin:0;padding:0;color:#1900ff;margin-left:-20px}.dialog-center-mobile.svelte-7oj6qs.svelte-7oj6qs{display:none}.image-logo.svelte-7oj6qs.svelte-7oj6qs{position:absolute;left:55px;top:30px;width:177px;height:76px;z-index:1}.bonjour-button.svelte-7oj6qs.svelte-7oj6qs{background-color:#E93E3E;writing-mode:vertical-rl;text-orientation:sideways;position:absolute;right:50px;top:375px;color:#1900ff;padding:10px;border-radius:14.33px;font-size:0.8rem;z-index:2;font-weight:400;font-family:'moret';cursor:pointer;width:8px;line-height:8px;text-transform:uppercase}.bonjour-dialog.svelte-7oj6qs.svelte-7oj6qs{width:485px;height:560px;position:absolute;z-index:3;background-color:#f86c01;border:solid 1px #f86c01;top:13vh;right:0;padding:25px}@media screen and (max-width: 600px){.image-logo.svelte-7oj6qs.svelte-7oj6qs{position:absolute;left:25px;top:20px;width:117px;height:4.75rem;z-index:1}.modal-section.svelte-7oj6qs.svelte-7oj6qs{width:100%;flex:1;overflow:initial;padding-bottom:0px}.dialog-center-mobile.svelte-7oj6qs.svelte-7oj6qs{display:block;width:100vw;height:auto;object-fit:cover}.dialog-center.svelte-7oj6qs.svelte-7oj6qs{display:none}.modal-container.svelte-7oj6qs.svelte-7oj6qs{flex-direction:column;flex-wrap:nowrap;justify-content:normal;overflow-y:auto;height:100vh;align-items:flex-start;align-content:flex-start}.modal-section-content.svelte-7oj6qs p.svelte-7oj6qs{position:relative;margin-left:-45px;padding-top:30px;margin-top:0;margin-bottom:0;left:25px}.bonjour-dialog.svelte-7oj6qs.svelte-7oj6qs{width:70vw;height:70vh;top:100px}.dialog-icon.svelte-7oj6qs.svelte-7oj6qs{display:none}.dialog-icon.mobile.svelte-7oj6qs.svelte-7oj6qs{width:37px;display:block;height:23px;padding-top:55px;padding-right:40px}.right.modal-section-content.svelte-7oj6qs.svelte-7oj6qs{padding-top:0}.left-text.svelte-7oj6qs.svelte-7oj6qs{font-size:30px;line-height:39px}h5.title.svelte-7oj6qs.svelte-7oj6qs{font-family:'Opposit-Medium';font-weight:100;font-size:18px;color:#e2ee75;margin-bottom:2px;margin-left:-20px}}@media screen and (max-width: 1200px) and (max-height: 499px){.bonjour-button.svelte-7oj6qs.svelte-7oj6qs{display:none}.dialog-icon.svelte-7oj6qs.svelte-7oj6qs{width:25px;height:unset;padding:20px;margin-top:20px;margin-right:25px}.image-logo.svelte-7oj6qs.svelte-7oj6qs{position:absolute;left:55px;top:15px;width:100px;height:4.75rem;z-index:1;cursor:url(/images/home-cursor.png), auto}.modal-container.svelte-7oj6qs.svelte-7oj6qs{background:#1900ff}.modal-section.svelte-7oj6qs.svelte-7oj6qs{padding-bottom:0px;height:unset;display:flex;flex-direction:column}.modal-section.svelte-7oj6qs .modal-section-content.svelte-7oj6qs{padding:35px;padding-right:10px}.modal-section.svelte-7oj6qs .modal-section-content .title.svelte-7oj6qs{font-size:12px;margin:50px 0px;margin-bottom:30px}.modal-section.svelte-7oj6qs .modal-section-content .left-text.svelte-7oj6qs{font-size:20px;line-height:1.3;left:0;margin:0}.modal-section.svelte-7oj6qs .right.svelte-7oj6qs{box-sizing:border-box;padding-left:10px;padding-right:35px;display:flex;font-size:12px;flex:1}.modal-section.svelte-7oj6qs .right .services li.svelte-7oj6qs{margin-bottom:0}.modal-section.svelte-7oj6qs .right .services.svelte-7oj6qs,.modal-section.svelte-7oj6qs .right .client-list.svelte-7oj6qs{flex:1;display:flex;flex-direction:column;box-sizing:border-box;line-height:1.3}.modal-section.svelte-7oj6qs .right .services ul.svelte-7oj6qs,.modal-section.svelte-7oj6qs .right .client-list ul.svelte-7oj6qs{margin-left:0}.bonjour-dialog.mobile.svelte-7oj6qs.svelte-7oj6qs{width:100%;height:unset;position:unset;border:0px;padding:0.5rem 10px;margin-left:25px}}",
  map: `{"version":3,"file":"PopUp.svelte","sources":["PopUp.svelte"],"sourcesContent":["<script>\\n  import { fly } from 'svelte/transition';\\n  import { _ } from 'svelte-i18n';\\n  import SayBonjour from '$lib/components/SayBonjour.svelte';\\n\\n  let scrollY;\\n  export let modalOpen = false;\\n  export let bonjourOpen = false;\\n  export let isMobile;\\n  function showModal() {\\n    modalOpen = true;\\n  }\\n  function hideModal() {\\n    modalOpen = false;\\n  }\\n\\n  function showBonjourDialog() {\\n    bonjourOpen = true;\\n  }\\n  function hideBonjourDialog() {\\n    bonjourOpen = false;\\n  }\\n<\/script>\\n\\n<svelte:window bind:scrollY />\\n\\n{#if modalOpen}\\n  <div\\n    class=\\"popup\\"\\n    transition:fly={{\\n      y: -window.innerHeight,\\n      duration: 1000\\n    }}\\n  >\\n    <img src=\\"images/dialog-icon.png\\" class=\\"dialog-icon\\" alt=\\"Dialog icon\\" on:click={hideModal} />\\n    <img\\n      src=\\"images/dialog-icon-mobile.png\\"\\n      class=\\"dialog-icon mobile\\"\\n      alt=\\"Dialog icon\\"\\n      on:click={hideModal}\\n    />\\n    <img\\n      src=\\"images/dialog-icon-mobile.png\\"\\n      class=\\"dialog-icon mobile\\"\\n      alt=\\"Dialog icon\\"\\n      on:click={hideModal}\\n    />\\n    {#if !isMobile}\\n      <div class=\\"bonjour-button\\" on:click={showBonjourDialog}>{$_('dialog.sayBonjour')}</div>\\n    {/if}\\n    {#if bonjourOpen && !isMobile}\\n      <div\\n        class=\\"bonjour-dialog\\"\\n        transition:fly={{\\n          x: window.innerWidth,\\n          duration: 1000\\n        }}\\n      >\\n        <SayBonjour {hideBonjourDialog} />\\n      </div>\\n    {/if}\\n    <div class=\\"modal-container\\">\\n      {#if !isMobile}\\n        <img src=\\"images/dialog-center.jpeg\\" class=\\"dialog-center\\" alt=\\"Dialog center\\" />\\n      {/if}\\n      <img class=\\"image-logo\\" src=\\"images/00-sb-logo-simple-white.svg\\" alt=\\"Logo\\" />\\n      <div class=\\"modal-section left-side\\">\\n        <div class=\\"modal-section-content\\">\\n          <h5 class=\\"title\\">{$_('dialog.title')}</h5>\\n          <p class=\\"left-text\\">\\n            {$_('dialog.leftText')}\\n          </p>\\n        </div>\\n      </div>\\n      <img\\n        src=\\"images/dialog-center-mobile.jpeg\\"\\n        class=\\"dialog-center-mobile\\"\\n        alt=\\"Dialog center\\"\\n      />\\n      <div class=\\"modal-section right-side\\">\\n        <div class=\\"right modal-section-content\\">\\n          <div class=\\"services\\">\\n            <h5 class=\\"title\\">{$_('dialog.services.title')}</h5>\\n            <ul>\\n              <li>{@html $_('dialog.services.strategy')}</li>\\n              <li>{@html $_('dialog.services.branding')}</li>\\n              <li>{@html $_('dialog.services.design')}</li>\\n              <li>{@html $_('dialog.services.creativeDirection')}</li>\\n              <li>{@html $_('dialog.services.artDirection')}</li>\\n              <li>{@html $_('dialog.services.motion')}</li>\\n              <li>{@html $_('dialog.services.production')}</li>\\n              <li>{@html $_('dialog.services.digital')}</li>\\n              <li>{@html $_('dialog.services.content1')}</li>\\n              <li>{@html $_('dialog.services.content2')}</li>\\n              <li>{@html $_('dialog.services.content3')}</li>\\n            </ul>\\n          </div>\\n          <div class=\\"client-list\\">\\n            <h5 class=\\"title\\">{$_('dialog.clientList.title')}</h5>\\n            <ul>\\n              <li>Nike</li>\\n              <li>Herschel Supply</li>\\n              <li>Kombi</li>\\n              <li>Altitude Sports</li>\\n              <li>Ground Sounds</li>\\n              <li>Saje Wellness</li>\\n              <li>Fable Home</li>\\n              <li>Nine Point Cannabis PR</li>\\n              <li>Frank Ghery, The Grand LA</li>\\n              <li>Osei Duro</li>\\n              <li>HIRRS Bodywear</li>\\n              <li>La Firme</li>\\n              <li>Alain Carle Architect</li>\\n              <li>Little Burgundy Shoes</li>\\n              <li>Call It Spring</li>\\n              <li>ALDO</li>\\n              <li>DAVIDs TEA</li>\\n              <li>Kit & Ace</li>\\n              <li>Eddie Bauer</li>\\n              <li>enRoute</li>\\n              <li>SAXX</li>\\n              <li>RISE Kombucha</li>\\n            </ul>\\n          </div>\\n        </div>\\n        {#if isMobile}\\n          <img src=\\"images/dialog-center.jpeg\\" alt=\\"Dialog center\\" style=\\"width:50%\\" />\\n        {/if}\\n      </div>\\n      {#if isMobile}\\n        <div class=\\"bonjour-dialog mobile\\">\\n          <SayBonjour isMobile={true} />\\n        </div>\\n      {/if}\\n    </div>\\n  </div>\\n{/if}\\n\\n<style>\\n  .services li {\\n    margin-bottom: 8px;\\n    line-height: 130%;\\n  }\\n\\n  .popup {\\n    height: 80vh;\\n    width: 100vw;\\n    position: fixed;\\n    z-index: 1500;\\n  }\\n  .modal-container {\\n    display: flex;\\n    flex-direction: row;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    align-items: stretch;\\n    align-content: stretch;\\n    height: 80vh;\\n    width: 100vw;\\n    font-family: 'roc-grotesk';\\n    overflow-y: hide;\\n    position: relative;\\n  }\\n  .modal-section {\\n    width: 50%;\\n    min-width: 300px;\\n    flex: 1 1 auto;\\n    /* overflow-y: auto; */\\n    /* padding-bottom: 530px; */\\n    /* height: 100%; */\\n  }\\n  .left-side {\\n    background-color: #1900ff;\\n  }\\n  .right-side {\\n    background-color: #e2ee75;\\n  }\\n  .modal-section-content {\\n    padding: 50px;\\n    padding-top: 150px;\\n    position: relative;\\n    font-family: 'moret';\\n    padding-bottom: 0;\\n  }\\n  .modal-section-content p {\\n    position: relative;\\n    left: 0;\\n    z-index: 1;\\n    margin-top: 5px;\\n  }\\n  .dialog-icon {\\n    position: absolute;\\n    right: -10px;\\n    width: 64px;\\n    height: 39px;\\n    padding: 60px;\\n    cursor: pointer;\\n    z-index: 4;\\n  }\\n  .dialog-icon.mobile {\\n    display: none;\\n  }\\n  .modal-container {\\n    color: #fff;\\n    overflow: auto;\\n  }\\n\\n  h5.title {\\n    font-family: 'Opposit-Medium';\\n    font-weight: 100;\\n    font-size: 18px;\\n    color: #e2ee75;\\n    margin-bottom: 2px;\\n    margin-left: 5px;\\n  }\\n\\n  .dialog-center {\\n    position: absolute;\\n    top: 120%;\\n    left: 48%;\\n    /* transform: translate(-50%, -50%); */\\n    width: 350px;\\n  }\\n\\n  .left-text {\\n    font-size: 54px;\\n    line-height: 130%;\\n  }\\n\\n  .right.modal-section-content {\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-around;\\n    font-family: 'roc-grotesk';\\n    font-size: 18px;\\n  }\\n\\n  .right.modal-section-content h5 {\\n    color: #c84501;\\n    font-weight: 200;\\n    margin-left: -20px;\\n  }\\n  .right.modal-section-content ul {\\n    line-height: 130%;\\n    margin-bottom: 8px;\\n    list-style: none;\\n    margin: 0;\\n    padding: 0;\\n    color: #1900ff;\\n    margin-left: -20px;\\n  }\\n  .dialog-center-mobile {\\n    display: none;\\n  }\\n\\n  .right.modal-section-content h5 {\\n    color: #c84501;\\n    font-weight: 200;\\n    margin-left: -20px;\\n  }\\n  .right.modal-section-content ul {\\n    list-style: none;\\n    margin: 0;\\n    padding: 0;\\n    color: #1900ff;\\n    margin-left: -20px;\\n  }\\n  .dialog-center-mobile {\\n    display: none;\\n  }\\n\\n  .image-logo {\\n    position: absolute;\\n    left: 55px;\\n    top: 30px;\\n    width: 177px;\\n    height: 76px;\\n    z-index: 1;\\n  }\\n  .bonjour-button {\\n    background-color: #E93E3E;\\n    writing-mode: vertical-rl;\\n    text-orientation: sideways;\\n    position: absolute;\\n    right: 50px;\\n    top: 375px;\\n    color: #1900ff;\\n    padding: 10px;\\n    border-radius: 14.33px;\\n    font-size: 0.8rem;\\n    z-index: 2;\\n    font-weight: 400;\\n    font-family: 'moret';\\n    cursor: pointer;\\n    width: 8px;\\n    line-height: 8px;\\n    text-transform: uppercase;\\n  }\\n  .bonjour-dialog {\\n    width: 485px;\\n    height: 560px;\\n    position: absolute;\\n    z-index: 3;\\n    background-color: #f86c01;\\n    border: solid 1px #f86c01;\\n    top: 13vh;\\n    right: 0;\\n    padding: 25px;\\n  }\\n\\n  @media screen and (max-width: 600px) {\\n    .image-logo {\\n      position: absolute;\\n      left: 25px;\\n      top: 20px;\\n      width: 117px;\\n      height: 4.75rem;\\n      z-index: 1;\\n    }\\n\\n    .modal-section {\\n      width: 100%;\\n      flex: 1;\\n      overflow: initial;\\n      padding-bottom: 0px;\\n    }\\n    .dialog-center-mobile {\\n      display: block;\\n      width: 100vw;\\n      height: auto;\\n      object-fit: cover;\\n    }\\n    .dialog-center {\\n      display: none;\\n    }\\n\\n    .modal-container {\\n      flex-direction: column;\\n      flex-wrap: nowrap;\\n      justify-content: normal;\\n      overflow-y: auto;\\n      height: 100vh;\\n      align-items: flex-start;\\n      align-content: flex-start;\\n    }\\n    .modal-section-content p {\\n      position: relative;\\n      margin-left: -45px;\\n      padding-top: 30px;\\n      margin-top: 0;\\n      margin-bottom: 0;\\n      left: 25px;\\n    }\\n    .bonjour-dialog {\\n      width: 70vw;\\n      height: 70vh;\\n      top: 100px;\\n    }\\n\\n    .dialog-icon {\\n      display: none;\\n    }\\n    .dialog-icon.mobile {\\n      width: 37px;\\n      display: block;\\n      height: 23px;\\n      padding-top: 55px;\\n      padding-right: 40px;\\n    }\\n\\n    .right.modal-section-content {\\n      padding-top: 0;\\n    }\\n    .left-text {\\n      font-size: 30px;\\n      line-height: 39px;\\n    }\\n\\n    h5.title {\\n      font-family: 'Opposit-Medium';\\n      font-weight: 100;\\n      font-size: 18px;\\n      color: #e2ee75;\\n      margin-bottom: 2px;\\n      margin-left: -20px;\\n    }\\n  }\\n\\n  /* Landscape Mobile*/\\n  @media screen and (max-width: 1200px) and (max-height: 499px) {\\n    .bonjour-button {\\n      display: none;\\n    }\\n    .dialog-icon {\\n      width: 25px;\\n      height: unset;\\n      padding: 20px;\\n      margin-top: 20px;\\n      margin-right: 25px;\\n    }\\n    .image-logo {\\n      position: absolute;\\n      left: 55px;\\n      top: 15px;\\n      width: 100px;\\n      height: 4.75rem;\\n      z-index: 1;\\n      cursor: url(/images/home-cursor.png), auto;\\n    }\\n\\n    .modal-container {\\n      background: #1900ff;\\n    }\\n\\n    .modal-section {\\n      padding-bottom: 0px;\\n      height: unset;\\n      display: flex;\\n      flex-direction: column;\\n    }\\n\\n    .modal-section .modal-section-content {\\n      padding: 35px;\\n      padding-right: 10px;\\n    }\\n\\n    .modal-section .modal-section-content .title {\\n      font-size: 12px;\\n      margin: 50px 0px;\\n      margin-bottom: 30px;\\n    }\\n    .modal-section .modal-section-content .left-text {\\n      font-size: 20px;\\n      line-height: 1.3;\\n      left: 0;\\n      margin: 0;\\n    }\\n\\n    .modal-section .right {\\n      box-sizing: border-box;\\n      padding-left: 10px;\\n      padding-right: 35px;\\n      display: flex;\\n      font-size: 12px;\\n      flex: 1;\\n    }\\n    .modal-section .right .services li {\\n      margin-bottom: 0;\\n    }\\n\\n    .modal-section .right .services,\\n    .modal-section .right .client-list {\\n      flex: 1;\\n      display: flex;\\n      flex-direction: column;\\n      box-sizing: border-box;\\n      line-height: 1.3;\\n    }\\n    .modal-section .right .services ul,\\n    .modal-section .right .client-list ul {\\n      margin-left: 0;\\n    }\\n\\n    .bonjour-dialog.mobile {\\n      width: 100%;\\n      height: unset;\\n      position: unset;\\n      border: 0px;\\n      padding: 0.5rem 10px;\\n      margin-left: 25px;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AA2IE,uBAAS,CAAC,EAAE,cAAC,CAAC,AACZ,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,IAAI,AACf,CAAC,AACD,gBAAgB,4BAAC,CAAC,AAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,OAAO,CACpB,aAAa,CAAE,OAAO,CACtB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,aAAa,CAC1B,UAAU,CAAE,IAAI,CAChB,QAAQ,CAAE,QAAQ,AACpB,CAAC,AACD,cAAc,4BAAC,CAAC,AACd,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,AAIhB,CAAC,AACD,UAAU,4BAAC,CAAC,AACV,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AACD,WAAW,4BAAC,CAAC,AACX,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AACD,sBAAsB,4BAAC,CAAC,AACtB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,KAAK,CAClB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,OAAO,CACpB,cAAc,CAAE,CAAC,AACnB,CAAC,AACD,oCAAsB,CAAC,CAAC,cAAC,CAAC,AACxB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,GAAG,AACjB,CAAC,AACD,YAAY,4BAAC,CAAC,AACZ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,YAAY,OAAO,4BAAC,CAAC,AACnB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,gBAAgB,4BAAC,CAAC,AAChB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,IAAI,AAChB,CAAC,AAED,EAAE,MAAM,4BAAC,CAAC,AACR,WAAW,CAAE,gBAAgB,CAC7B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,cAAc,4BAAC,CAAC,AACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,GAAG,CAET,KAAK,CAAE,KAAK,AACd,CAAC,AAED,UAAU,4BAAC,CAAC,AACV,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,MAAM,sBAAsB,4BAAC,CAAC,AAC5B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,YAAY,CAC7B,WAAW,CAAE,aAAa,CAC1B,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,MAAM,oCAAsB,CAAC,EAAE,cAAC,CAAC,AAC/B,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,KAAK,AACpB,CAAC,AACD,MAAM,oCAAsB,CAAC,EAAE,cAAC,CAAC,AAC/B,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,KAAK,AACpB,CAAC,AACD,qBAAqB,4BAAC,CAAC,AACrB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,MAAM,oCAAsB,CAAC,EAAE,cAAC,CAAC,AAC/B,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,KAAK,AACpB,CAAC,AACD,MAAM,oCAAsB,CAAC,EAAE,cAAC,CAAC,AAC/B,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,KAAK,AACpB,CAAC,AACD,qBAAqB,4BAAC,CAAC,AACrB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,WAAW,4BAAC,CAAC,AACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,eAAe,4BAAC,CAAC,AACf,gBAAgB,CAAE,OAAO,CACzB,YAAY,CAAE,WAAW,CACzB,gBAAgB,CAAE,QAAQ,CAC1B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,OAAO,CACtB,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,OAAO,CACpB,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,AAC3B,CAAC,AACD,eAAe,4BAAC,CAAC,AACf,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,KAAK,CAAC,GAAG,CAAC,OAAO,CACzB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,AACf,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,WAAW,4BAAC,CAAC,AACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,cAAc,4BAAC,CAAC,AACd,KAAK,CAAE,IAAI,CACX,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,OAAO,CACjB,cAAc,CAAE,GAAG,AACrB,CAAC,AACD,qBAAqB,4BAAC,CAAC,AACrB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,AACnB,CAAC,AACD,cAAc,4BAAC,CAAC,AACd,OAAO,CAAE,IAAI,AACf,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,cAAc,CAAE,MAAM,CACtB,SAAS,CAAE,MAAM,CACjB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,KAAK,CACb,WAAW,CAAE,UAAU,CACvB,aAAa,CAAE,UAAU,AAC3B,CAAC,AACD,oCAAsB,CAAC,CAAC,cAAC,CAAC,AACxB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,KAAK,CAClB,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,CAAC,CACb,aAAa,CAAE,CAAC,CAChB,IAAI,CAAE,IAAI,AACZ,CAAC,AACD,eAAe,4BAAC,CAAC,AACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,KAAK,AACZ,CAAC,AAED,YAAY,4BAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACD,YAAY,OAAO,4BAAC,CAAC,AACnB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,MAAM,sBAAsB,4BAAC,CAAC,AAC5B,WAAW,CAAE,CAAC,AAChB,CAAC,AACD,UAAU,4BAAC,CAAC,AACV,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,EAAE,MAAM,4BAAC,CAAC,AACR,WAAW,CAAE,gBAAgB,CAC7B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,KAAK,AACpB,CAAC,AACH,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,GAAG,CAAC,aAAa,KAAK,CAAC,AAAC,CAAC,AAC7D,eAAe,4BAAC,CAAC,AACf,OAAO,CAAE,IAAI,AACf,CAAC,AACD,YAAY,4BAAC,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,IAAI,AACpB,CAAC,AACD,WAAW,4BAAC,CAAC,AACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,uBAAuB,CAAC,CAAC,CAAC,IAAI,AAC5C,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,UAAU,CAAE,OAAO,AACrB,CAAC,AAED,cAAc,4BAAC,CAAC,AACd,cAAc,CAAE,GAAG,CACnB,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AACxB,CAAC,AAED,4BAAc,CAAC,sBAAsB,cAAC,CAAC,AACrC,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,4BAAc,CAAC,sBAAsB,CAAC,MAAM,cAAC,CAAC,AAC5C,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CAAC,GAAG,CAChB,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,4BAAc,CAAC,sBAAsB,CAAC,UAAU,cAAC,CAAC,AAChD,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,CAAC,AACX,CAAC,AAED,4BAAc,CAAC,MAAM,cAAC,CAAC,AACrB,UAAU,CAAE,UAAU,CACtB,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,IAAI,CAAE,CAAC,AACT,CAAC,AACD,4BAAc,CAAC,MAAM,CAAC,SAAS,CAAC,EAAE,cAAC,CAAC,AAClC,aAAa,CAAE,CAAC,AAClB,CAAC,AAED,4BAAc,CAAC,MAAM,CAAC,uBAAS,CAC/B,4BAAc,CAAC,MAAM,CAAC,YAAY,cAAC,CAAC,AAClC,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,UAAU,CACtB,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,4BAAc,CAAC,MAAM,CAAC,SAAS,CAAC,gBAAE,CAClC,4BAAc,CAAC,MAAM,CAAC,YAAY,CAAC,EAAE,cAAC,CAAC,AACrC,WAAW,CAAE,CAAC,AAChB,CAAC,AAED,eAAe,OAAO,4BAAC,CAAC,AACtB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,WAAW,CAAE,IAAI,AACnB,CAAC,AACH,CAAC"}`
};
var PopUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(X, (value) => $_ = value);
  let { modalOpen = false } = $$props;
  let { bonjourOpen = false } = $$props;
  let { isMobile } = $$props;
  function hideBonjourDialog() {
    bonjourOpen = false;
  }
  if ($$props.modalOpen === void 0 && $$bindings.modalOpen && modalOpen !== void 0)
    $$bindings.modalOpen(modalOpen);
  if ($$props.bonjourOpen === void 0 && $$bindings.bonjourOpen && bonjourOpen !== void 0)
    $$bindings.bonjourOpen(bonjourOpen);
  if ($$props.isMobile === void 0 && $$bindings.isMobile && isMobile !== void 0)
    $$bindings.isMobile(isMobile);
  $$result.css.add(css$1);
  $$unsubscribe__();
  return `

${modalOpen ? `<div class="${"popup svelte-7oj6qs"}"><img src="${"images/dialog-icon.png"}" class="${"dialog-icon svelte-7oj6qs"}" alt="${"Dialog icon"}">
    <img src="${"images/dialog-icon-mobile.png"}" class="${"dialog-icon mobile svelte-7oj6qs"}" alt="${"Dialog icon"}">
    <img src="${"images/dialog-icon-mobile.png"}" class="${"dialog-icon mobile svelte-7oj6qs"}" alt="${"Dialog icon"}">
    ${!isMobile ? `<div class="${"bonjour-button svelte-7oj6qs"}">${escape($_("dialog.sayBonjour"))}</div>` : ``}
    ${bonjourOpen && !isMobile ? `<div class="${"bonjour-dialog svelte-7oj6qs"}">${validate_component(SayBonjour, "SayBonjour").$$render($$result, { hideBonjourDialog }, {}, {})}</div>` : ``}
    <div class="${"modal-container svelte-7oj6qs"}">${!isMobile ? `<img src="${"images/dialog-center.jpeg"}" class="${"dialog-center svelte-7oj6qs"}" alt="${"Dialog center"}">` : ``}
      <img class="${"image-logo svelte-7oj6qs"}" src="${"images/00-sb-logo-simple-white.svg"}" alt="${"Logo"}">
      <div class="${"modal-section left-side svelte-7oj6qs"}"><div class="${"modal-section-content svelte-7oj6qs"}"><h5 class="${"title svelte-7oj6qs"}">${escape($_("dialog.title"))}</h5>
          <p class="${"left-text svelte-7oj6qs"}">${escape($_("dialog.leftText"))}</p></div></div>
      <img src="${"images/dialog-center-mobile.jpeg"}" class="${"dialog-center-mobile svelte-7oj6qs"}" alt="${"Dialog center"}">
      <div class="${"modal-section right-side svelte-7oj6qs"}"><div class="${"right modal-section-content svelte-7oj6qs"}"><div class="${"services svelte-7oj6qs"}"><h5 class="${"title svelte-7oj6qs"}">${escape($_("dialog.services.title"))}</h5>
            <ul class="${"svelte-7oj6qs"}"><li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.strategy")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.branding")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.design")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.creativeDirection")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.artDirection")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.motion")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.production")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.digital")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.content1")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.content2")}<!-- HTML_TAG_END --></li>
              <li class="${"svelte-7oj6qs"}"><!-- HTML_TAG_START -->${$_("dialog.services.content3")}<!-- HTML_TAG_END --></li></ul></div>
          <div class="${"client-list svelte-7oj6qs"}"><h5 class="${"title svelte-7oj6qs"}">${escape($_("dialog.clientList.title"))}</h5>
            <ul class="${"svelte-7oj6qs"}"><li class="${"svelte-7oj6qs"}">Nike</li>
              <li class="${"svelte-7oj6qs"}">Herschel Supply</li>
              <li class="${"svelte-7oj6qs"}">Kombi</li>
              <li class="${"svelte-7oj6qs"}">Altitude Sports</li>
              <li class="${"svelte-7oj6qs"}">Ground Sounds</li>
              <li class="${"svelte-7oj6qs"}">Saje Wellness</li>
              <li class="${"svelte-7oj6qs"}">Fable Home</li>
              <li class="${"svelte-7oj6qs"}">Nine Point Cannabis PR</li>
              <li class="${"svelte-7oj6qs"}">Frank Ghery, The Grand LA</li>
              <li class="${"svelte-7oj6qs"}">Osei Duro</li>
              <li class="${"svelte-7oj6qs"}">HIRRS Bodywear</li>
              <li class="${"svelte-7oj6qs"}">La Firme</li>
              <li class="${"svelte-7oj6qs"}">Alain Carle Architect</li>
              <li class="${"svelte-7oj6qs"}">Little Burgundy Shoes</li>
              <li class="${"svelte-7oj6qs"}">Call It Spring</li>
              <li class="${"svelte-7oj6qs"}">ALDO</li>
              <li class="${"svelte-7oj6qs"}">DAVIDs TEA</li>
              <li class="${"svelte-7oj6qs"}">Kit &amp; Ace</li>
              <li class="${"svelte-7oj6qs"}">Eddie Bauer</li>
              <li class="${"svelte-7oj6qs"}">enRoute</li>
              <li class="${"svelte-7oj6qs"}">SAXX</li>
              <li class="${"svelte-7oj6qs"}">RISE Kombucha</li></ul></div></div>
        ${isMobile ? `<img src="${"images/dialog-center.jpeg"}" alt="${"Dialog center"}" style="${"width:50%"}">` : ``}</div>
      ${isMobile ? `<div class="${"bonjour-dialog mobile svelte-7oj6qs"}">${validate_component(SayBonjour, "SayBonjour").$$render($$result, { isMobile: true }, {}, {})}</div>` : ``}</div></div>` : ``}`;
});
var en = {
  slider: {
    1: {
      title: "Herschel Magazine \u2014 ",
      title2: "2020"
    },
    2: {
      title: "Osei Duro \u2014 ",
      title2: "2019"
    },
    3: {
      title: "Fable Home \u2014 ",
      title2: "2020"
    },
    4: {
      title: "Herschel Supply \u2014 ",
      title2: "2019/20"
    },
    5: {
      title: "Nine Point PR Agency \u2014 ",
      title2: "2019/20"
    },
    6: {
      title: "Hirrs \u2014 ",
      title2: "2019"
    },
    7: {
      title: "Little Burgundy Shoes \u2014 ",
      title2: "2019/20"
    },
    8: {
      title: "Rise Kombucha \u2014 ",
      title2: "2019"
    },
    9: {
      title: "Kombi Canada \u2014 ",
      title2: "2021"
    },
    10: {
      title: "NIKE Air Max \u2014 ",
      title2: "2021"
    },
    11: {
      title: "Little Burgundy Shoes \u2014 ",
      title2: "2019/20"
    },
    12: {
      title: "Call It Spring \u2014 ",
      title2: "2019/20"
    },
    13: {
      title: "Louise Burns \u2014 ",
      title2: "2019"
    },
    14: {
      title: "Ghana \u2014 ",
      title2: "2019"
    },
    15: {
      title: "DAVIDs TEA \u2014 ",
      title2: "2019"
    },
    16: {
      title: "SAXX Fathers Day \u2014 ",
      title2: "2021"
    },
    17: {
      title: "Altitude Sports \u2014\xA0",
      title2: "2021"
    },
    18: {
      title: "DAVIDs TEA \u2014 ",
      title2: "2019/20"
    }
  },
  dialog: {
    title: "Hi there, Bonjour and Bienvenue.",
    leftText: `Super Bonjour is a creative studio specializing in strategy, branding & content. Empathy, awareness & exploration are at the heart of our practice. Our design solutions align purpose with output. Meaning we future proof you. We challenge your status quo. We reimagine systems, spaces & creative for a healthier future. Our studio culture champions low yield, high quality work and we\u2019ve developed a proprietary process (Brand Therapy\u2122) to get us there.  Plus, we\u2019ve got a tap that pours sweet, sweet secret sauce.`,
    services: {
      title: "Services",
      strategy: "Creative Direction",
      branding: "Brand Strategy,<br>Naming & Strategy",
      design: "Campaign Direction",
      creativeDirection: "Voice & Messaging",
      artDirection: "Content Strategy & <br>Creation",
      motion: "Digital Strategy & <br>Design",
      production: "Photography, Film & <br>Motion Direction",
      digital: "Art Direction",
      content1: "Editorial Design",
      content2: "Packaging Design",
      content3: "Experiential Activations"
    },
    clientList: {
      title: "Client List"
    },
    sayBonjour: "Say Bonjour",
    sayHi: {
      title: "Bonjour, Hi",
      p1: {
        text1: "We work with brands and businesses seeking strategy informed by cultural relevance and design that safeguards value and longevity. We advocate for progressive, sustainable lifestyles and we believe in accountability.",
        text3: 'We also believe in multiple time dimensions, but that\u2019s beside the point.<br><br>Contact us if any of that sounds right to you. You can get in touch \u273F <a href="mailto:salut@superbonjour.com" target="__blank" style="letter-spacing: 0.05em" class="contact-link">via email</a>. Or snail mail \u270E or slide into <a href="https://www.instagram.com/super_bonjour/" target="__blank" class="contact-link">our DMs</a> if that\u2019s your \u30C4 thing.',
        text4: "Super Bonjour is founded by Reanna Evoy (PST) & Vanda Daftari (EST). "
      },
      address1: {
        title: '<strong class="addressTitle">West Coast Offices</strong>',
        text: "478 Union street, Vancouver, BC CA \u2014 V6A 2B6"
      },
      address2: {
        title: '<strong class="addressTitle">East Coast Offices</strong>',
        text: "1747 Saint Patrick, Montr\xE9al, QC CA \u2014 H3K 3G9"
      },
      footer: {
        text: "We acknowledges that in Vancouver we operate on unceded Coast Salish territory of the s\u1E35wx\u0331w\xFA7mesh (Squamish), sel\u0313\xEDl\u0313witulh (Tsleil-Waututh), and x\u02B7m\u0259\u03B8k\u02B7\u0259y\u0313\u0259m (Musqueam) nations and that in Tiohti\xE1:ke (known as Montreal) we operate on the unceded traditional territory of the Kanien\u2019keh\xE1:ka Nation."
      },
      disclaimer: {
        text: "NB\u2014 La gang, on ne vous oublie pas. Le site sera bient\xF4t bilingue! \u270E\u270E\u270E 2022, inshallah!"
      }
    }
  }
};
var fr = {
  slider: {
    1: {
      title: "Good morning"
    },
    2: {
      title: "Good morning 2"
    },
    3: {
      title: "Good morning 3"
    },
    4: {
      title: "Good morning 4"
    },
    5: {
      title: "Good morning 5"
    },
    6: {
      title: "Good morning 6"
    }
  },
  dialog: {
    title: "Hi there, Bounjour and Bienvenue.",
    leftText: `We are a creative studio - based on two of Canada's three coasts. 
    With HQs in both Montr\xE9al and Vancouver, we make sure we work almost all the timezones (lolz).
    Got budget? Hit us up! we deliver sweet sweet creative, zappy copy or slick code. Wegotchu.
    What if we had more text and a few more sentences in here? Then we would need to scroll some more...
    A little more, still.`,
    services: {
      title: "Services",
      strategy: "Strategy",
      branding: "Branding",
      design: "Design",
      creativeDirection: "Creative Direction",
      artDirection: "Art Direction",
      motion: "Motion",
      production: "Production",
      digital: "Digital",
      content: "Content"
    },
    clientList: {
      title: "Client list"
    },
    sayBonjour: "Say Bonjour",
    sayHi: {
      title: "Bonjour, Hi",
      p1: {
        text1: "We love hearing from you",
        text2: " Get in touch in with us",
        text3: "via email.",
        text4: "Or snail mail",
        text5: "Or slide into",
        text6: "Our DMS.",
        text7: "If that's your thing"
      },
      address1: {
        title: "West Coast Offices",
        text: "478 Union street, Vancouver, BC CA - V6A2B6"
      },
      address2: {
        title: "East Coast Offices",
        text: "1747 Saint Patrick, Montr\xE9al, QC CA - H3K3G9"
      },
      footer: {
        text: "Super Bonjour is a bi-coastal studio."
      }
    }
  }
};
var initI18n = () => {
  m("en", en);
  m("fr", fr);
  $({
    fallbackLocale: "en",
    initialLocale: I()
  });
};
var css = {
  code: "body{padding:0}.container.svelte-92xov9{overflow:hidden;transition:transform 0.5s linear}.header.svelte-92xov9{position:fixed;top:0px;right:0px;z-index:1000;font-family:'Opposit-Medium'}.dialog-icon.svelte-92xov9{width:64px;height:39px;padding:33px;cursor:pointer;margin-top:28px;margin-right:25px}.mobile-portrait.svelte-92xov9{display:none}@media screen and (max-device-width: 480px) and (orientation: portrait){.mobile-portrait.svelte-92xov9{display:block;box-sizing:border-box;position:fixed;background:#0003fe;height:100vh;z-index:1000;padding:3rem;overflow:scroll}.mobile-portrait-message.svelte-92xov9{font-family:roc-grotesk;color:#e2ee75;font-size:24px;line-height:1.3;margin-top:1rem;margin-bottom:1rem}}@media screen and (max-width: 1200px) and (max-height: 499px){html{height:100%;width:100%;height:100vh;width:100vw;margin:0;padding:0;overflow:hidden;background-color:#0000ff}body{padding:0;height:100%;width:100%;height:100vh;width:100vw;margin:0;overflow:hidden;background-color:#0000ff}.container.svelte-92xov9{overflow:visible;transition:transform 0.5s linear;position:fixed;top:0;left:0;right:0;bottom:0;padding:0;margin:0}.dialog-icon.svelte-92xov9{width:25px;height:unset;padding:20px;margin-top:20px;margin-right:25px}}@media screen and (max-width: 600px){.dialog-icon.svelte-92xov9{width:37px;height:23px;padding:15px}}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\n  import ParallaxSlider from '$lib/components/ParallaxSlider.svelte';\\n  import PopUp from '$lib/components/PopUp.svelte';\\n  import { _ } from 'svelte-i18n';\\n  import { initI18n } from '$lib/components/i18n/i18n.js';\\n  import { onMount } from 'svelte';\\n  import { checkIsMobile } from '$lib/utils/helpers';\\n  import '../app.css';\\n\\n  initI18n();\\n\\n  let modalOpen = false;\\n  function showModal() {\\n    modalOpen = true;\\n  }\\n  function hideModal() {\\n    modalOpen = false;\\n  }\\n\\n  // We want the ui to be viewed in landscape on mobile devices.\\n  let isMobile = false;\\n  let viewport = null;\\n  let innerWidth = 0;\\n  let innerHeight = 0;\\n  $: isLandscapeView = false;\\n  // Check for mobile device.\\n  onMount(async () => {\\n    //for testing purpose on mobile\\n    let forceMobile = false;\\n    isMobile = checkIsMobile(forceMobile);\\n    if (isMobile) {\\n      document.body.scrollTop = 0;\\n      document.body.style.overflow = 'hidden';\\n    }\\n  });\\n\\n  // Check that the phone is in landscape.\\n  onMount(() => {\\n    (async () => {\\n      // Dynamic import because of ssr and window manipulation.\\n      const { default: viewport_library } = await import('svelte-viewport-info');\\n      viewport = viewport_library;\\n      innerWidth = viewport_library?.Width || 0;\\n      innerHeight = viewport_library?.Height || 0;\\n      isLandscapeView = viewport_library?.Orientation === 'landscape' || false;\\n    })();\\n  });\\n\\n  let containerEl;\\n  let MAX_NUM_PROJECTS = 17; // number of projects in html.\\n  // Keep track of the currently displayed project state.\\n  $: current_project_index = 10;\\n\\n  // Slide in the next project vertically, if it exists.\\n  const nextProject = (project_index) => {\\n    console.log(project_index);\\n    if (project_index < MAX_NUM_PROJECTS) {\\n      return (containerEl.style.transform = \`translate(0px, \${0 - project_index * innerHeight}px)\`);\\n    }\\n  };\\n\\n  // Slide in vertically previous project if it exists.\\n  const prevProject = (project_index) => {\\n    if (project_index >= 0 && project_index <= MAX_NUM_PROJECTS) {\\n      return (containerEl.style.transform = \`translate(0px, \${0 - project_index * innerHeight}px)\`);\\n    }\\n  };\\n\\n  // Handles project state.\\n  const handleProjectUpdate = (updated_project_index) => {\\n    updated_project_index > current_project_index\\n      ? nextProject(updated_project_index)\\n      : prevProject(updated_project_index);\\n    return (current_project_index = updated_project_index);\\n  };\\n<\/script>\\n\\n<svelte:head>\\n  <title>Super Bonjour</title>\\n  <meta name=\\"title\\" content=\\"Creative Studio\\" />\\n  <meta\\n    name=\\"description\\"\\n    content=\\"We specialize in strategy, branding & content. We work with brands seeking cultural relevance. We advocate for progressive & sustainable values.\\"\\n  />\\n  <meta\\n    name=\\"viewport\\"\\n    content=\\"height=device-height, initial-scale=1, width=device-width, initial-scale=1\\"\\n  />\\n  <meta property=\\"og:url\\" content=\\"https://www.superbonjour.com/\\" />\\n</svelte:head>\\n<svelte:body\\n  on:viewportchanged={() => {\\n    innerWidth = viewport.Width;\\n    innerHeight = viewport.Height;\\n    debugger;\\n    handleProjectUpdate(current_project_index);\\n  }}\\n  on:resize={() => {\\n    innerWidth = viewport.Width;\\n    innerHeight = viewport.Height;\\n  }}\\n  on:orientationchangeend={() => {\\n    innerWidth = viewport.Width;\\n    innerHeight = viewport.Height;\\n    isLandscapeView = viewport.Orientation === 'landscape';\\n  }} />\\n\\n<div class=\\"header\\">\\n  <img src=\\"images/dialog-icon.png\\" class=\\"dialog-icon\\" alt=\\"Dialog icon\\" on:click={showModal} />\\n</div>\\n<!-- Show a warning in portrait mode to rotate your phone. -->\\n<div class=\\"mobile-portrait\\" style={\`width:\${innerWidth ? innerWidth + 'px' : '100vw'}\`}>\\n  <div style=\\"position:relative\\">\\n    <img class=\\"image-logo mobile\\" src=\\"images/mobile_super_bonjour.svg\\" alt=\\"Logo\\" />\\n\\n    <p class=\\"mobile-portrait-message\\">\\n      Bonjour! <span style=\\"color:#f86c00\\">\u273F</span>\\n      Our work looks best, viewed on desktop. We love a big screen with lots of pixels, but if\\n      <span style=\\"color:#F8D0FB\\">\u260F</span>\\n      mobile's your thing <span style=\\"color:#E0A239\\">\u2799</span>\\n      <span style=\\"color:#f86c00\\">rotate your device</span>, that would be Super\\n      <span style=\\"color:#F8D0FB\\">\u275B\u203F\u275B</span>\\n    </p>\\n  </div>\\n  <div style=\\"display:flex; justify-content:space-between; margin-top:2rem;\\">\\n    <iframe\\n      title=\\"dog on phone gif\\"\\n      src=\\"https://giphy.com/embed/vM07ENm3Ue8xO\\"\\n      width={\`\${innerWidth / 4}\`}\\n      height={\`\${innerWidth / 4}\`}\\n      frameBorder=\\"0\\"\\n      class=\\"giphy-embed\\"\\n      allowFullScreen\\n    />\\n    <img style=\\"transform:translate(0%,-35%)\\" src=\\"images/peace_hand.svg\\" alt=\\"peace hand\\" />\\n  </div>\\n</div>\\n<PopUp bind:modalOpen isMobile={isMobile && isLandscapeView} />\\n\\n<main>\\n  <div class=\\"container\\" bind:this={containerEl}>\\n    <ParallaxSlider\\n      id={0}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.1.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.1.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/HSCo_Mag_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_Mag_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_Mag_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_Mag_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_Mag_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_Mag_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'Super Bonjour guided Herschel away from their regionalist identity, and placed them in a global community. We used the magazine to reposition the brand, while working with our network to generate lasting ties with creatives and travelers.  Vol 1: Islands \u2014 a theme explored geographically and metaphorically.',\\n          type: 'text',\\n          title: 'Creating a Travel Magazine',\\n          fontSize: '54px',\\n          color: '#4E151D',\\n          backgroundColor: '#C3862C'\\n        },\\n        {\\n          src: '360 Content Strategy \u2014<br>We took on the full scope of the project from editorial lineups, commissioning original content, social media meta accounts and branded Google Docs. We planned a launch event, during the LA Art Book Fair, on Echo Park\u2019s island and a 1-800 number connecting callers to the sounds of island life.<br><br>Brand Positioning, Creative Direction <br>Production, Theme Development, Contributor Outreach <br>Pagination & Flatplan, Art Direction, Editorial Design<br>Print Management & Distribution Strategy <br>Event & Activation',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C3862C'\\n        },\\n        {\\n          src: 'Imogene Barron, Ryan Daniel Browne, Eva Cremers, Natasha & Dino Forte, Michelle Maguire, Meaghan Way, Kelsey McClellan, Ashley Oliveri, Catherine Potvin, Marie H. Rainville, Houmi Sakata, Victoria Sieczka, Aileen Son, Oumayma Ben Tanfous, Stephanie Mercier Voyer, Stephen Wilde, \u200B\u200BNico Young<br>Sacha Jackson, Editor<br><br>Featuring Hana Vu, Danny Smiles, Bradley Sheppard, Am\xE9lie Rousseaux, Apolla Echino, Maxime Bayol, Marc Cefalu<br><br>Awards<br> Editorial, Entire Publication \u2014 Applied Arts 2021<br>Design, \xC9ditorial \u2014 Concours Id\xE9a 2021',\\n          type: 'text',\\n          title: 'Contributors',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C3862C'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={1}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.2.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.2.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/OD_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/OD_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/OD_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/OD_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/OD_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/OD_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/OD_7.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'Establishing the brand\u2019s storytelling style meant immersing ourselves in Osei Duro\u2019s process and day-to-day out of the Accra studio in Ghana.  We dove deep, via workshops and collecting insights, to inform the brand\u2019s expressions in photography, casting, styling, tone and content. These images are from their 2019 campaign, shot on location with emerging local talent.',\\n          type: 'text',\\n          title: 'Brand Platform & Campaign Strategy',\\n          fontSize: '54px',\\n          color: '#E1D8CA',\\n          backgroundColor: '#111E0C'\\n        },\\n        {\\n          src: 'Deep Dive & Immersion \u2014 <br>Factory and textile print shop visits and day-to-day operations<br><br>Brand Audit & Strategy \u2014 <br>Review of all the content to help establish a new strategy,<br> workshops and brand platform<br><br>2019 Campaign Shoots \u2014<br>Creative Direction<br>Pre-production & On-set Direction<br>Campaign Shoots, on location<br>Lookbook Direction',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#111E0C'\\n        },\\n        {\\n          src: 'Campaign Photography Kay Kwabia<br>Film Photography Super Bonjour<br>Sets & Props Osei Duro, Super Bonjour<br>Styling Osei Duro, footwear and accessories sourced from Kantamanto Market<br>Models Eyiwaa, Amisum, Julee, David<br>Shot in Accra, Ghana',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#111E0C'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={2}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.3.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.3.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/Fable_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Fable_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Fable_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Fable_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Fable_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'videos/Fable_6.mp4',\\n          type: 'video'\\n        },\\n        {\\n          src: 'Capturing the often overlooked in-between moments at home, our creative strategy positioned Fable\u2019s  identity as slow, artisanal luxury. We defined codes that felt unique to Fable for a proprietary sense of refinement and emotionally engaging storytelling \u2014 while steering them away from a generic DTC look.',\\n          type: 'text',\\n          title: 'Brand Campaign Strategy',\\n          fontSize: '54px',\\n          color: '#CBD0BA',\\n          backgroundColor: '##290B15'\\n        },\\n        {\\n          src: 'Brand Audit & Campaign Strategy \u2014<br>Review of the photo content on digital channels to establish a new strategy<br><br>2020 Campaign Shoot \u2014<br> Creative Direction<br>Pre-production & On-set Direction<br>Ecomm Direction ',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '##290B15'\\n        },\\n        {\\n          src: 'Campaign Photography Mathieu Fortin<br>Campaign Videography Gerardo Alcaine<br>Sets & Props Audrey St-Laurent<br>Retouching & E-commerce Photography Bonesso Dumas<br>Copy Sacha Jackson<br>Produced & Shot at Studio L\u2019\xC9loi, Montr\xE9al',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '##290B15'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={3}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.4.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.4.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/HSCo_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HSCo_7.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'A fresh take on everyone\u2019s favourite backpack, we repositioned Herschel\u2019s PNW roots: moving them out of the forest and into the world. Tapping into transformative travel, we explored the trip itself. How? Each season we discovered a new city with soul and a neighbourhood with community to tell stories about stepping outside and connecting to culture. ',\\n          type: 'text',\\n          title: 'Positioning & Seasonal Campaign Direction',\\n          fontSize: '54px',\\n          color: '#CABADF',\\n          backgroundColor: '#384163'\\n        },\\n        {\\n          src: 'In a creative partnership with their internal team, we supported their brand strategy by developing a distinct approach to seasonal versus product campaigns and a go-to-market strategy (drops and partnerships). <br><br>Creative Direction<br>Campaign Strategy<br>On-set Direction',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#384163'\\n        },\\n        {\\n          src: 'This edit includes images from various seasons<br>Photography Stephen Wilde<br>Styling Mila Franovic, Tiana Franks<br>Sets & Props Oliver Stenberg<br>HMU Maxine Munson, Becca Randle, Maria Walton<br>Production Marta Sanderson, Pip Groom, Robyn Farnham<br>Shot in LA, London & Vancouver',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#384163'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={4}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.5.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.5.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/NP_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/NP_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'videos/NP_3.mp4',\\n          type: 'video'\\n        },\\n        {\\n          src: 'videos/NP_4.mp4',\\n          type: 'video'\\n        },\\n        {\\n          src: 'videos/NP_5.mp4',\\n          type: 'video'\\n        },\\n        {\\n          src: 'images/NP_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          addPadding: true,\\n          src: 'videos/NP_7.mov',\\n          type: 'video',\\n          backgroundColor: '#231F20'\\n        },\\n        {\\n          src: 'videos/NP_8.mp4',\\n          type: 'video'\\n        },\\n        {\\n          src: 'We had deep and honest conversations as we took the founders through Brand Therapy\u2122. We busted the myths of a dated industry culture and uncovered their unique positioning. It informed a comprehensive ecosystem for Nine Point\u2019s identity \u2014 elevated branding, a bold website and engaging social content for the future of progressive lifestyle and cannabis brands.',\\n          type: 'text',\\n          title: '(Re)Brand & Identity System',\\n          fontSize: '54px',\\n          color: '#4E151D',\\n          backgroundColor: '#C3862C'\\n        },\\n        {\\n          src: 'Our strategy evolved Nine Point\u2019s brand identity into a complete ecosystem,including branding, design, direction, tone and photography.<br><br>Brand Strategy<br>Creative Direction<br>Identity & Digital Design<br>Voice & Messaging<br>Art Direction<br>Off-figure Sets & Props',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C3862C'\\n        },\\n        {\\n          src: 'Voice & Copy Sacha Jackson<br>Photography Jennifer Latour<br>Styling Leila Bani<br>HMU Karin Shoji',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C3862C'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={5}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.6.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.6.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/HIRRS_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HIRRS_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HIRRS_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HIRRS_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/HIRRS_5.jpg',\\n          type: 'image'\\n        },\\n\\n        {\\n          src: 'images/HIRRS_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: \\"The body says what words cannot. Focusing on women's movement, the HIRRS launch campaign aimed to express a vulnerable, artful and quietly powerful voice that needs to be heard. Our direction countered traditional beauty ideals and challenged the male gaze. Bringing together an all woman crew, our approach updated the representation of women\u2019s bodies.\\",\\n          type: 'text',\\n          title: 'Launch & Brand Campaign ',\\n          fontSize: '54px',\\n          color: '#FFFFFF',\\n          backgroundColor: '#290B15'\\n        },\\n        {\\n          src: 'Supporting their slow fashion ethos, we worked with the founders to establish a creative direction designed to last.<br><br>Creative Direction<br>Art Buying<br>Casting<br>On-set Direction',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#290B15'\\n        },\\n        {\\n          src: 'Photography Jennifer Latour<br>Assist. Emilia Kalka<br>Styling Lelia Bani<br>HMU Maxine Munson<br>Models Iman, Kiko & Rhi',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#290B15'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={6}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.7.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.7.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/LB_1_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_1_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_1_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_1_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_1_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'Operating on a foundation of trust means we can experiment and take risks. The conceptual directions we define each seasonal are self-aware and researched. We pull from cultural events, behavioral trends and the ever shifting collective understanding of the world we live in. We invite new talent to the set, making sure we tell the story from a place of relevance and inclusivity.',\\n          type: 'text',\\n          title: 'Scope',\\n          color: '#4E151D',\\n          backgroundColor: '#C84600'\\n        },\\n        {\\n          src: 'Having history with the brand and team, SB x LB share a lot of trust and respect. As their campaign partners, we have had the pleasure to support their brand leaders and creative team.<br><br>Creative Direction<br>Campaign Strategy<br>Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C84600'\\n        },\\n        {\\n          src: 'Photography Melissa Gamache, Pegah Farahmand, Carlo Calope<br>Assist. Renaud Lafreni\xE8re, Patrick Custo-Blanch, William Cole, Jeremy Bobrow, Aljosa Alijagic, Don Loga<br>Styling Frederique Gauthier, Tinashe Musara, Assist. Leah Grantham, Haji Maa<br>HMU Cynthia-Christina Cadieux, Marianne Caron, L\xE9onie L\xE9vesque, <br>Assist. Ana-Maria Cimpoia, Claudine Jourdain<br>Models Jefferson, Sophie, Jade, Celeste, Mustapha, Sheida, Damian, Miranda, Megane, Chelsea, Miles, Soukayna<br>Sets & Props Micha\xEBl Ho, Marie H\xE9l\xE8ne Lavoie<br>Production Kristia Louis-Seize, Studio L\u2019\xC9loi, Little Burgundy Shoes',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C84600'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={7}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.8.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.8.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/Rise_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Rise_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Rise_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Rise_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Rise_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Rise_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'videos/Rise_7.mp4',\\n          type: 'video'\\n        },\\n        {\\n          src: 'When concepting for this launch, we landed on a strategy to revive RISE\u2019s cultural relevance. Defining their creative pillars as emotion, vibrancy and wonder, we invited the audience to feel intellectually stimulated, and walk away with a story. Anchored in playful escapism, the campaign spoke to the perennially curious as a physical manifestation of indulgence.',\\n          type: 'text',\\n          title: 'New Product Launch OOH Campaign',\\n          fontSize: '54px',\\n          color: '#84402A',\\n          backgroundColor: '#C374F6'\\n        },\\n        {\\n          src: 'We built a creative strategy which recognized that the brand is larger than the product. Working in tandem with the brand strategist we developed an integrated campaign (photography, video, microsite direction, OOH design, event programming including guests and speakers, invitation design, and social media assets).<br><br>Creative Direction<br>On-set Direction<br>Design<br>Event & Activation ',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C374F6'\\n        },\\n        {\\n          src: 'Photography Mathieu Fortin, Nik Mirus<br>Assist. Alexis Belhumeur, Aljosa Alijagic, Jeremy Bobrow<br>Styling Marianne Dubreuil<br>HMU Nicolas Blanchet<br> Sets & Props Audrey St-Laurent<br>Brand Strategy Marissa De Miguel<br>Models Nicholas, Hawa, Yvan, Lina<br>Produced & Shot st Studio L\u2019\xC9loi, Montr\xE9al<br>Graphic Design Assist. Vanessa Bourgault',\\n          type: 'text',\\n          title: 'Rise Kombucha',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C374F6'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={8}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.9.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.9.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/KOMBI_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/KOMBI_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/KOMBI_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/KOMBI_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/KOMBI_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/KOMBI_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'We translated Kombi\u2019s 60+ years of family history into vibrant, engaging images that invite all to join the fun. Partnering with them to myth bust performance and elitism in the outdoor space, we built a positioning around participation, play and inclusion. With Kombi, it\u2019s a family thing.',\\n          type: 'text',\\n          title: 'Campaign Strategy',\\n          fontSize: '54px',\\n          color: '#FFFFFF',\\n          backgroundColor: '#3851BA'\\n        },\\n        {\\n          src: 'As Kombi\u2019s strategic and creative partner we supported their internal team throughout campaign development from concept to production. Additionally, we supported the brand to shape their customer facing personality.<br><br>Creative Direction<br>Campaign Strategy<br>Concept<br>Voice & Messaging<br> Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction<br>Production',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#3851BA'\\n        },\\n        {\\n          src: 'Photography Kelly Jacob, Assist. Renaud Robert, Tom Berthelot<br>  Videography  Matt Charland, Oli Chapo<br>Styling Izabel Soucy, Assist. Samuel Joubert<br>HMU Valeria Amirova<br>Models Sam, Juliette, Jade, Cole, Rokko Riders<br>Catherine Perrault, Antoine St-Hilaire, Julien Gauthier, Jacob Gagnon<br>Producer Jade Fortin C\xF4t\xE9, Assist. Alexis Gauvin B.',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#3851BA'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={9}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.10.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.10.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/NIKE_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/NIKE_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/NIKE_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/NIKE_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/NIKE_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          addPadding: true,\\n          src: 'videos/NIKE_6.mp4',\\n          type: 'video',\\n          backgroundColor: '#222232'\\n        },\\n        {\\n          src: 'As part of the North American Nike campaign to revive the cultural cach\xE9 of Air Max, we were brought on as the Canadian team. The images, featuring multimedia artist Will Selviz were rolled out at Nike and Foot Locker, in-store and online,  and to launch Air Max Day.',\\n          type: 'text',\\n          title: 'Air Max Will Selviz',\\n          fontSize: '54px',\\n          color: '#FFFFFF',\\n          backgroundColor: '#222232'\\n        },\\n        {\\n          src: 'Working closely with the in-house leads, we were on set in Vancouver to art direct and liaise with the Portland and NYC teams.',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#222232'\\n        },\\n        {\\n          src: 'Vancouver Team \u2014 <br>Talent Will Selviz <br>Photography Conor Cunningham <br>Assist. Rob Seebacher, Mats Schram, Donnel Barroso <br>Styling Leila Bani, Assist. Masha Pazhouh, Deo Cruz <br>HMU Christopher Deagle <br>DOP The Pool Service <br>Production Design Hank Mann <br>Sets & Props Freddy Harder, Lauren Barrufa <br>1st AD Richard Amies<br>Production Blue Amber, Vancouver',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#222232'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={10}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.11.title')}\\n      title2={$_('slider.11.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/LB_2_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          imageSrc: 'images/LB_2_2.jpg',\\n          videoSrc: 'videos/LB_2_2v.mp4',\\n          type: 'two-columns'\\n        },\\n        {\\n          src: 'images/LB_2_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_2_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_2_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_2_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_2_7.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LB_2_8.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'Photography Kelly Jacob, Akina Chan, Briggs Ogloff, William Arcand, Marie H. Rainville, Assist. Don Loga, Emily Velasquez Gilbert, Kyle Gibson, Alex Guiry, Axel & Jacques Palomares, Greg Beck <br>Videography Gerardo Alcaine <br>Styling Tinashe Musara, Leila Bani, Tiana Franks, Fr\xE9d\xE9rique Gauthier, Izabel Soucy, Assist. Eunice Huot, Alyson Holler <br>Sets & Props Evelyne Morin <br>HMU Ashley Diabo, Maxine Munsun, Maria Walton, Alana & Maddie Alper, L\xE9onie L\xE9vesque, Claudine Jourdain <br>Models Ivy, Jamil, Ludovie, Kevin, Simone, Zacc, Anastasia, Tatenda, Shade, Whitney, Ciana Yekta, Chanel, No\xE9mie J\xE9r\xF4me, Naomy, Adams, <br>Production Aaron Van Dyck (Vancouver),  Kristia Louis-Seize (Montr\xE9al)',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#A3232E'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={11}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.12.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.12.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/CIS_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/CIS_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/CIS_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/CIS_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/CIS_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/CIS_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/CIS_7.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/CIS_8.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'We updated the brand strategy to support the client\u2019s shift from trend retailer to a purpose-driven brand. We brought significant changes to the DNA, resetting them on a foundation of inclusion, a community-first approach that is still true to the brand today. Extending these values behind the lens with the crew and talent allowed us to prove the Call It Spring family is real.',\\n          type: 'text',\\n          title: 'Creative Direction & Brand DNA',\\n          fontSize: '54px',\\n          color: '#C34C25',\\n          backgroundColor: '#CABADF'\\n        },\\n        {\\n          src: 'As the once-upon-a-time in house, we go way back. Our history, trust and deep understanding of their business reality positioned us as long-term partners.<br><br>Creative Direction<br>Brand Strategy<br>Messaging Casting<br>On-set Direction<br>SB Secret Sauce Shot List<br>Shoe Face Ratio\u2122',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#CABADF'\\n        },\\n        {\\n          src: 'This edit includes images from various seasons.<br>Photography Tim Barber Styling Imogene Barron<br>Sets & Props Sean Daly<br>HMU Nikki Providence, Sandy Ganzer, Danielle & Nicole Kahlani<br>Models KC, Dronme, Sandrine, Shaheem, Barbie, Julian, Christie, Alexis, Bella,Sahra, Josiah<br>Production The Production Club, Jade Jean-Marie, Natasha Forte, Camp Productions <br>Shot on location in LA & London',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#CABADF'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={12}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.13.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.13.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/LOUISE_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LOUISE_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LOUISE_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/LOUISE_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'How do you begin with a sound and create imagery that speaks to the emotion and personal message of a song?<br>With Louise Burns, coming to terms with teen stardom led her towards heartbreaking introspection and her fourth album, Portraits. Our creative direction recognized her growth and spoke to the strength of being a grown ass woman.',\\n          type: 'text',\\n          title: 'Creative Direction & Design',\\n          fontSize: '54px',\\n          color: '#FFFFFF',\\n          backgroundColor: '#1D1D1D'\\n        },\\n        {\\n          src: 'We worked collaboratively  with Louise to define her new look and build the team to help create it.<br><br>Creative Direction<br>On-set Direction<br>Graphic Design',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#1D1D1D'\\n        },\\n        {\\n          src: 'Photography Jennifer Latour<br>Styling Redia Soltis<br>HMU Taylor Smits, Harriet Sales',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#1D1D1D'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={13}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.14.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.14.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/GHANA_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_7.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_8.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_9.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_10.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/GHANA_11.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'Through our relationship with Osei Duro, we<br>experienced something beyond a typical partnership.<br>We collaborated with creatives in many cities, travelled and immersed ourselves in different realities, and challenged our understanding of (slow) fashion. It fundamentally changed our understanding of the industry, our practice and our impact.',\\n          type: 'text',\\n          title: 'A Photo Essay on Slow Fashion',\\n          fontSize: '54px',\\n          color: '#E1D8CA',\\n          backgroundColor: '#111E'\\n        },\\n        {\\n          src: 'Campaign Photography Jessica Sarkodie, Mathieu Fortin <br>Film & Travel Photography Super Bonjour<br>Sets & Props Osei Duro, Super Bonjour <br>Styling Osei Duro, Jay Forest<br>HMU by Alana & Maddie Alper<br>Models Nuerki, Penny<br>Shot in Montr\xE9al and in various locations around Accra, Ghana',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#111E'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={14}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.15.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.15.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/DT1_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT1_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT1_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT1_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT1_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT1_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT1_7.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'As their creative partners, we worked with the in-house team to course correct their positioning vis-a-vis a booming wellness industry. We refined a proprietary take on self-care and rituals, updated their overall design codes to inform their campaigns, packaging, tone and OOH messaging.',\\n          type: 'text',\\n          title: 'Brand Positioning & Campaign Strategy',\\n          fontSize: '54px',\\n          color: '#FFFFFF',\\n          backgroundColor: '#290B15'\\n        },\\n        {\\n          src: 'Creative Direction, Campaign Strategy, Art Buying & On-set Direction<br>Video Storyboarding & Direction<br>Packaging Design ',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#290B15'\\n        },\\n        {\\n          src: 'This edit includes images from various seasons<br>Photography by Mathieu Fortin<br>Assist. Martin Lacroix, Marc-Andr\xE9 Dumas, Carlo Calope,<br>Gerardo Alcaine Sets & Props Evelyne Morin, Audrey St-Laurent<br>Production Studio L\u2019\xC9loi, Montr\xE9al',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#290B15'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={15}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.16.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.16.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/Saxx_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Saxx_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Saxx_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Saxx_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Saxx_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/Saxx_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'For the love of dad \u2014 a feminist take on Father\u2019s Day, updating how men are portrayed. Inspired by Linda McCartney\u2019s family photos, our concept was anchored in the compassionate and tender gaze of a partner. Challenging the outdated codes of masculinity, we analyzed what it means to be a father (figure) today and crafted a love letter to the true spirit of fatherhood.',\\n          type: 'text',\\n          title: 'Campaign Concept & Storytelling',\\n          fontSize: '54px',\\n          color: '#C84600',\\n          backgroundColor: '#CABADF'\\n        },\\n        {\\n          src: 'Sometimes, casting needs to happen on both sides of the lens. We reached out to our community to find the right pairing of family and photographer. <br>Partnering with our favorite London-based photographer, Imogene Barron, we captured sweet father-daughter moments at the Jean-Marie home.<br><br>Creative Direction<br>Messaging<br>Casting<br>Art Buying<br>Virtual Art Direction',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#CABADF'\\n        },\\n        {\\n          src: 'Photography Imogene Barron, Assist James Giffiths<br>Styling Imogene Barron, Assist. Alicia Ellis<br>London Production Jade Jean-Marie<br>Vancouver Production Aaron Van Dyck<br>Featuring The Jean-Marie Family \u2014 Leon, Iggy & Milou<br>Shot on location in London',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#CABADF'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={16}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.17.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.17.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/ALTI_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/ALTI_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/ALTI_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/ALTI_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/ALTI_5.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/ALTI_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'Starting from a copy brief, we rooted this concept in emotional insights, designed to unite. Capturing that very moment of transformation \u2014 the feeling of achieving a new personal best \u2014 we called in a community of lunchtime athletes and introducing them to their new favorite retailer.',\\n          type: 'text',\\n          title: 'OOH Campaign Direction',\\n          fontSize: '54px',\\n          color: '#F8D0FB',\\n          backgroundColor: '#C34C25'\\n        },\\n        {\\n          src: 'We joined the in-house team to develop an awareness campaign for multiple cities and new markets.<br><br>Campaign Strategy & Qualitative Insights<br>Storyboarding, Casting & On-set Direction<br>SB Secret Sauce Shot List',\\n          type: 'text',\\n          title: 'Scope',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C34C25'\\n        },\\n        {\\n          src: 'Photography by Mathieu Fortin, Assist. Aljosa Alijagic, William Cole<br> Styling by Farah Benosman, Assist. Marianne Blais & Pascale Tessier<br>Sets & Props Mathilde Beaudoin-Tessier, Jean-Philippe Pelletier<br>HMU Valeria Amirova, Assist. Marie-Pier Tardif<br>Models Sheida, No\xE9mie, Diizon, Am\xE9lie<br> Production Jordan R. Bruneau, Madame Brown<br>Shot at the Olympic Stadium, Montr\xE9al ',\\n          type: 'text',\\n          title: 'Credits',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#C34C25'\\n        }\\n      ]}\\n    />\\n    <ParallaxSlider\\n      id={17}\\n      updateProjectIndex={(id) => handleProjectUpdate(id)}\\n      title={$_('slider.18.title')}\\n      titleFont=\\"roc-grotesk\\"\\n      title2={$_('slider.18.title2')}\\n      isMobile={isMobile && isLandscapeView}\\n      {innerWidth}\\n      {innerHeight}\\n      slidesData={[\\n        {\\n          src: 'images/DT_2_1.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT_2_2.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT_2_3.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT_2_4.jpg',\\n          type: 'image'\\n        },\\n        {\\n          addPadding: true,\\n          backgroundColor: '#9A7429',\\n          src: 'videos/DT_2.mp4',\\n          type: 'video'\\n        },\\n        {\\n          src: 'images/DT_2_6.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'images/DT_2_7.jpg',\\n          type: 'image'\\n        },\\n        {\\n          src: 'Creative Direction, Campaign Strategy & On-set Direction Super Bonjour<br>This edit includes images from various seasons.<br>Photography Nik Mirus, Mathieu Fortin<br>Assist. Jeremy Bobrow, Marc-Andr\xE9 Dumas<br>DOP Nik Mirus Assist. Gerardo Alcaine, Gaffer Bastien Mayer, Grip St\xE9phane Klopp<br>Copy & Script Sacha Jackson<br>Sets & Props Evelyne Morin, Audrey St-Laurent, Micha\xEBl Ho<br>Styling Rima Chahine<br>Produced & Shot at Studio L\u2019\xC9loi, Montr\xE9al',\\n          type: 'text',\\n          title: 'Fable Home',\\n          font: 'roc-grotesk, sans-serif',\\n          fontSize: '30px',\\n          color: '#E2EE75',\\n          backgroundColor: '#9A7429'\\n        }\\n      ]}\\n    />\\n  </div>\\n</main>\\n\\n<style>\\n  :global(body) {\\n    padding: 0;\\n  }\\n  .container {\\n    overflow: hidden;\\n    transition: transform 0.5s linear;\\n  }\\n  .header {\\n    position: fixed;\\n    top: 0px;\\n    right: 0px;\\n    z-index: 1000;\\n    font-family: 'Opposit-Medium';\\n  }\\n\\n  .dialog-icon {\\n    width: 64px;\\n    height: 39px;\\n    padding: 33px;\\n    cursor: pointer;\\n    margin-top: 28px;\\n    margin-right: 25px;\\n  }\\n  .mobile-portrait {\\n    display: none;\\n  }\\n\\n  /* Portrait Mobile*/\\n  @media screen and (max-device-width: 480px) and (orientation: portrait) {\\n    .mobile-portrait {\\n      display: block;\\n      box-sizing: border-box;\\n      position: fixed;\\n      background: #0003fe;\\n      height: 100vh;\\n      z-index: 1000;\\n      padding: 3rem;\\n      overflow: scroll;\\n    }\\n\\n    .mobile-portrait-message {\\n      font-family: roc-grotesk;\\n      color: #e2ee75;\\n      font-size: 24px;\\n      line-height: 1.3;\\n      margin-top: 1rem;\\n      margin-bottom: 1rem;\\n    }\\n  }\\n  /* Landscape Mobile*/\\n  @media screen and (max-width: 1200px) and (max-height: 499px) {\\n    :global(html) {\\n      height: 100%;\\n      width: 100%;\\n      height: 100vh;\\n      width: 100vw;\\n      margin: 0;\\n      padding: 0;\\n      overflow: hidden;\\n      background-color: #0000ff;\\n    }\\n    :global(body) {\\n      padding: 0;\\n      height: 100%;\\n      width: 100%;\\n      height: 100vh;\\n      width: 100vw;\\n      margin: 0;\\n      overflow: hidden;\\n      background-color: #0000ff;\\n    }\\n\\n    .container {\\n      overflow: visible;\\n      transition: transform 0.5s linear;\\n      position: fixed;\\n      top: 0;\\n      left: 0;\\n      right: 0;\\n      bottom: 0;\\n      padding: 0;\\n      margin: 0;\\n    }\\n    .dialog-icon {\\n      width: 25px;\\n      height: unset;\\n      padding: 20px;\\n      margin-top: 20px;\\n      margin-right: 25px;\\n    }\\n  }\\n\\n  @media screen and (max-width: 600px) {\\n    .dialog-icon {\\n      width: 37px;\\n      height: 23px;\\n      padding: 15px;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AA4vCU,IAAI,AAAE,CAAC,AACb,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,UAAU,cAAC,CAAC,AACV,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,MAAM,AACnC,CAAC,AACD,OAAO,cAAC,CAAC,AACP,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,GAAG,CACR,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,gBAAgB,AAC/B,CAAC,AAED,YAAY,cAAC,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,IAAI,AACpB,CAAC,AACD,gBAAgB,cAAC,CAAC,AAChB,OAAO,CAAE,IAAI,AACf,CAAC,AAGD,OAAO,MAAM,CAAC,GAAG,CAAC,mBAAmB,KAAK,CAAC,CAAC,GAAG,CAAC,cAAc,QAAQ,CAAC,AAAC,CAAC,AACvE,gBAAgB,cAAC,CAAC,AAChB,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,UAAU,CACtB,QAAQ,CAAE,KAAK,CACf,UAAU,CAAE,OAAO,CACnB,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,MAAM,AAClB,CAAC,AAED,wBAAwB,cAAC,CAAC,AACxB,WAAW,CAAE,WAAW,CACxB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,AACrB,CAAC,AACH,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,CAAC,GAAG,CAAC,aAAa,KAAK,CAAC,AAAC,CAAC,AACrD,IAAI,AAAE,CAAC,AACb,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,MAAM,CAChB,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AACO,IAAI,AAAE,CAAC,AACb,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,MAAM,CAChB,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,UAAU,cAAC,CAAC,AACV,QAAQ,CAAE,OAAO,CACjB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,MAAM,CACjC,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,AACX,CAAC,AACD,YAAY,cAAC,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,IAAI,AACpB,CAAC,AACH,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,YAAY,cAAC,CAAC,AACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC"}`
};
var MAX_NUM_PROJECTS = 17;
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let current_project_index;
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe(X, (value) => $_ = value);
  initI18n();
  let modalOpen = false;
  let isMobile = false;
  let innerWidth = 0;
  let innerHeight = 0;
  let containerEl;
  const nextProject = (project_index) => {
    console.log(project_index);
    if (project_index < MAX_NUM_PROJECTS) {
      return containerEl.style.transform = `translate(0px, ${0 - project_index * innerHeight}px)`;
    }
  };
  const prevProject = (project_index) => {
    if (project_index >= 0 && project_index <= MAX_NUM_PROJECTS) {
      return containerEl.style.transform = `translate(0px, ${0 - project_index * innerHeight}px)`;
    }
  };
  const handleProjectUpdate = (updated_project_index) => {
    updated_project_index > current_project_index ? nextProject(updated_project_index) : prevProject(updated_project_index);
    return current_project_index = updated_project_index;
  };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    current_project_index = 10;
    $$rendered = `${$$result.head += `${$$result.title = `<title>Super Bonjour</title>`, ""}<meta name="${"title"}" content="${"Creative Studio"}" data-svelte="svelte-1vi10ok"><meta name="${"description"}" content="${"We specialize in strategy, branding & content. We work with brands seeking cultural relevance. We advocate for progressive & sustainable values."}" data-svelte="svelte-1vi10ok"><meta name="${"viewport"}" content="${"height=device-height, initial-scale=1, width=device-width, initial-scale=1"}" data-svelte="svelte-1vi10ok"><meta property="${"og:url"}" content="${"https://www.superbonjour.com/"}" data-svelte="svelte-1vi10ok">`, ""}


<div class="${"header svelte-92xov9"}"><img src="${"images/dialog-icon.png"}" class="${"dialog-icon svelte-92xov9"}" alt="${"Dialog icon"}"></div>

<div class="${"mobile-portrait svelte-92xov9"}"${add_attribute("style", `width:${"100vw"}`, 0)}><div style="${"position:relative"}"><img class="${"image-logo mobile"}" src="${"images/mobile_super_bonjour.svg"}" alt="${"Logo"}">

    <p class="${"mobile-portrait-message svelte-92xov9"}">Bonjour! <span style="${"color:#f86c00"}">\u273F</span>
      Our work looks best, viewed on desktop. We love a big screen with lots of pixels, but if
      <span style="${"color:#F8D0FB"}">\u260F</span>
      mobile&#39;s your thing <span style="${"color:#E0A239"}">\u2799</span>
      <span style="${"color:#f86c00"}">rotate your device</span>, that would be Super
      <span style="${"color:#F8D0FB"}">\u275B\u203F\u275B</span></p></div>
  <div style="${"display:flex; justify-content:space-between; margin-top:2rem;"}"><iframe title="${"dog on phone gif"}" src="${"https://giphy.com/embed/vM07ENm3Ue8xO"}"${add_attribute("width", `${innerWidth / 4}`, 0)}${add_attribute("height", `${innerWidth / 4}`, 0)} frameborder="${"0"}" class="${"giphy-embed"}" allowfullscreen></iframe>
    <img style="${"transform:translate(0%,-35%)"}" src="${"images/peace_hand.svg"}" alt="${"peace hand"}"></div></div>
${validate_component(PopUp, "PopUp").$$render($$result, {
      isMobile,
      modalOpen
    }, {
      modalOpen: ($$value) => {
        modalOpen = $$value;
        $$settled = false;
      }
    }, {})}

<main><div class="${"container svelte-92xov9"}"${add_attribute("this", containerEl, 0)}>${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 0,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.1.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.1.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        {
          src: "images/HSCo_Mag_1.jpg",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_2.jpg",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_3.jpg",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_4.jpg",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_5.jpg",
          type: "image"
        },
        {
          src: "images/HSCo_Mag_6.jpg",
          type: "image"
        },
        {
          src: "Super Bonjour guided Herschel away from their regionalist identity, and placed them in a global community. We used the magazine to reposition the brand, while working with our network to generate lasting ties with creatives and travelers.  Vol 1: Islands \u2014 a theme explored geographically and metaphorically.",
          type: "text",
          title: "Creating a Travel Magazine",
          fontSize: "54px",
          color: "#4E151D",
          backgroundColor: "#C3862C"
        },
        {
          src: "360 Content Strategy \u2014<br>We took on the full scope of the project from editorial lineups, commissioning original content, social media meta accounts and branded Google Docs. We planned a launch event, during the LA Art Book Fair, on Echo Park\u2019s island and a 1-800 number connecting callers to the sounds of island life.<br><br>Brand Positioning, Creative Direction <br>Production, Theme Development, Contributor Outreach <br>Pagination & Flatplan, Art Direction, Editorial Design<br>Print Management & Distribution Strategy <br>Event & Activation",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        },
        {
          src: "Imogene Barron, Ryan Daniel Browne, Eva Cremers, Natasha & Dino Forte, Michelle Maguire, Meaghan Way, Kelsey McClellan, Ashley Oliveri, Catherine Potvin, Marie H. Rainville, Houmi Sakata, Victoria Sieczka, Aileen Son, Oumayma Ben Tanfous, Stephanie Mercier Voyer, Stephen Wilde, \u200B\u200BNico Young<br>Sacha Jackson, Editor<br><br>Featuring Hana Vu, Danny Smiles, Bradley Sheppard, Am\xE9lie Rousseaux, Apolla Echino, Maxime Bayol, Marc Cefalu<br><br>Awards<br> Editorial, Entire Publication \u2014 Applied Arts 2021<br>Design, \xC9ditorial \u2014 Concours Id\xE9a 2021",
          type: "text",
          title: "Contributors",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 1,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.2.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.2.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/OD_1.jpg", type: "image" },
        { src: "images/OD_2.jpg", type: "image" },
        { src: "images/OD_3.jpg", type: "image" },
        { src: "images/OD_4.jpg", type: "image" },
        { src: "images/OD_5.jpg", type: "image" },
        { src: "images/OD_6.jpg", type: "image" },
        { src: "images/OD_7.jpg", type: "image" },
        {
          src: "Establishing the brand\u2019s storytelling style meant immersing ourselves in Osei Duro\u2019s process and day-to-day out of the Accra studio in Ghana.  We dove deep, via workshops and collecting insights, to inform the brand\u2019s expressions in photography, casting, styling, tone and content. These images are from their 2019 campaign, shot on location with emerging local talent.",
          type: "text",
          title: "Brand Platform & Campaign Strategy",
          fontSize: "54px",
          color: "#E1D8CA",
          backgroundColor: "#111E0C"
        },
        {
          src: "Deep Dive & Immersion \u2014 <br>Factory and textile print shop visits and day-to-day operations<br><br>Brand Audit & Strategy \u2014 <br>Review of all the content to help establish a new strategy,<br> workshops and brand platform<br><br>2019 Campaign Shoots \u2014<br>Creative Direction<br>Pre-production & On-set Direction<br>Campaign Shoots, on location<br>Lookbook Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#111E0C"
        },
        {
          src: "Campaign Photography Kay Kwabia<br>Film Photography Super Bonjour<br>Sets & Props Osei Duro, Super Bonjour<br>Styling Osei Duro, footwear and accessories sourced from Kantamanto Market<br>Models Eyiwaa, Amisum, Julee, David<br>Shot in Accra, Ghana",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#111E0C"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 2,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.3.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.3.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/Fable_1.jpg", type: "image" },
        { src: "images/Fable_2.jpg", type: "image" },
        { src: "images/Fable_3.jpg", type: "image" },
        { src: "images/Fable_4.jpg", type: "image" },
        { src: "images/Fable_5.jpg", type: "image" },
        { src: "videos/Fable_6.mp4", type: "video" },
        {
          src: "Capturing the often overlooked in-between moments at home, our creative strategy positioned Fable\u2019s  identity as slow, artisanal luxury. We defined codes that felt unique to Fable for a proprietary sense of refinement and emotionally engaging storytelling \u2014 while steering them away from a generic DTC look.",
          type: "text",
          title: "Brand Campaign Strategy",
          fontSize: "54px",
          color: "#CBD0BA",
          backgroundColor: "##290B15"
        },
        {
          src: "Brand Audit & Campaign Strategy \u2014<br>Review of the photo content on digital channels to establish a new strategy<br><br>2020 Campaign Shoot \u2014<br> Creative Direction<br>Pre-production & On-set Direction<br>Ecomm Direction ",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "##290B15"
        },
        {
          src: "Campaign Photography Mathieu Fortin<br>Campaign Videography Gerardo Alcaine<br>Sets & Props Audrey St-Laurent<br>Retouching & E-commerce Photography Bonesso Dumas<br>Copy Sacha Jackson<br>Produced & Shot at Studio L\u2019\xC9loi, Montr\xE9al",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "##290B15"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 3,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.4.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.4.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/HSCo_1.jpg", type: "image" },
        { src: "images/HSCo_2.jpg", type: "image" },
        { src: "images/HSCo_3.jpg", type: "image" },
        { src: "images/HSCo_4.jpg", type: "image" },
        { src: "images/HSCo_5.jpg", type: "image" },
        { src: "images/HSCo_6.jpg", type: "image" },
        { src: "images/HSCo_7.jpg", type: "image" },
        {
          src: "A fresh take on everyone\u2019s favourite backpack, we repositioned Herschel\u2019s PNW roots: moving them out of the forest and into the world. Tapping into transformative travel, we explored the trip itself. How? Each season we discovered a new city with soul and a neighbourhood with community to tell stories about stepping outside and connecting to culture. ",
          type: "text",
          title: "Positioning & Seasonal Campaign Direction",
          fontSize: "54px",
          color: "#CABADF",
          backgroundColor: "#384163"
        },
        {
          src: "In a creative partnership with their internal team, we supported their brand strategy by developing a distinct approach to seasonal versus product campaigns and a go-to-market strategy (drops and partnerships). <br><br>Creative Direction<br>Campaign Strategy<br>On-set Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#384163"
        },
        {
          src: "This edit includes images from various seasons<br>Photography Stephen Wilde<br>Styling Mila Franovic, Tiana Franks<br>Sets & Props Oliver Stenberg<br>HMU Maxine Munson, Becca Randle, Maria Walton<br>Production Marta Sanderson, Pip Groom, Robyn Farnham<br>Shot in LA, London & Vancouver",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#384163"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 4,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.5.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.5.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/NP_1.jpg", type: "image" },
        { src: "images/NP_2.jpg", type: "image" },
        { src: "videos/NP_3.mp4", type: "video" },
        { src: "videos/NP_4.mp4", type: "video" },
        { src: "videos/NP_5.mp4", type: "video" },
        { src: "images/NP_6.jpg", type: "image" },
        {
          addPadding: true,
          src: "videos/NP_7.mov",
          type: "video",
          backgroundColor: "#231F20"
        },
        { src: "videos/NP_8.mp4", type: "video" },
        {
          src: "We had deep and honest conversations as we took the founders through Brand Therapy\u2122. We busted the myths of a dated industry culture and uncovered their unique positioning. It informed a comprehensive ecosystem for Nine Point\u2019s identity \u2014 elevated branding, a bold website and engaging social content for the future of progressive lifestyle and cannabis brands.",
          type: "text",
          title: "(Re)Brand & Identity System",
          fontSize: "54px",
          color: "#4E151D",
          backgroundColor: "#C3862C"
        },
        {
          src: "Our strategy evolved Nine Point\u2019s brand identity into a complete ecosystem,including branding, design, direction, tone and photography.<br><br>Brand Strategy<br>Creative Direction<br>Identity & Digital Design<br>Voice & Messaging<br>Art Direction<br>Off-figure Sets & Props",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        },
        {
          src: "Voice & Copy Sacha Jackson<br>Photography Jennifer Latour<br>Styling Leila Bani<br>HMU Karin Shoji",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C3862C"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 5,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.6.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.6.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/HIRRS_1.jpg", type: "image" },
        { src: "images/HIRRS_2.jpg", type: "image" },
        { src: "images/HIRRS_3.jpg", type: "image" },
        { src: "images/HIRRS_4.jpg", type: "image" },
        { src: "images/HIRRS_5.jpg", type: "image" },
        { src: "images/HIRRS_6.jpg", type: "image" },
        {
          src: "The body says what words cannot. Focusing on women's movement, the HIRRS launch campaign aimed to express a vulnerable, artful and quietly powerful voice that needs to be heard. Our direction countered traditional beauty ideals and challenged the male gaze. Bringing together an all woman crew, our approach updated the representation of women\u2019s bodies.",
          type: "text",
          title: "Launch & Brand Campaign ",
          fontSize: "54px",
          color: "#FFFFFF",
          backgroundColor: "#290B15"
        },
        {
          src: "Supporting their slow fashion ethos, we worked with the founders to establish a creative direction designed to last.<br><br>Creative Direction<br>Art Buying<br>Casting<br>On-set Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#290B15"
        },
        {
          src: "Photography Jennifer Latour<br>Assist. Emilia Kalka<br>Styling Lelia Bani<br>HMU Maxine Munson<br>Models Iman, Kiko & Rhi",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#290B15"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 6,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.7.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.7.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/LB_1_1.jpg", type: "image" },
        { src: "images/LB_1_2.jpg", type: "image" },
        { src: "images/LB_1_3.jpg", type: "image" },
        { src: "images/LB_1_5.jpg", type: "image" },
        { src: "images/LB_1_6.jpg", type: "image" },
        {
          src: "Operating on a foundation of trust means we can experiment and take risks. The conceptual directions we define each seasonal are self-aware and researched. We pull from cultural events, behavioral trends and the ever shifting collective understanding of the world we live in. We invite new talent to the set, making sure we tell the story from a place of relevance and inclusivity.",
          type: "text",
          title: "Scope",
          color: "#4E151D",
          backgroundColor: "#C84600"
        },
        {
          src: "Having history with the brand and team, SB x LB share a lot of trust and respect. As their campaign partners, we have had the pleasure to support their brand leaders and creative team.<br><br>Creative Direction<br>Campaign Strategy<br>Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C84600"
        },
        {
          src: "Photography Melissa Gamache, Pegah Farahmand, Carlo Calope<br>Assist. Renaud Lafreni\xE8re, Patrick Custo-Blanch, William Cole, Jeremy Bobrow, Aljosa Alijagic, Don Loga<br>Styling Frederique Gauthier, Tinashe Musara, Assist. Leah Grantham, Haji Maa<br>HMU Cynthia-Christina Cadieux, Marianne Caron, L\xE9onie L\xE9vesque, <br>Assist. Ana-Maria Cimpoia, Claudine Jourdain<br>Models Jefferson, Sophie, Jade, Celeste, Mustapha, Sheida, Damian, Miranda, Megane, Chelsea, Miles, Soukayna<br>Sets & Props Micha\xEBl Ho, Marie H\xE9l\xE8ne Lavoie<br>Production Kristia Louis-Seize, Studio L\u2019\xC9loi, Little Burgundy Shoes",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C84600"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 7,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.8.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.8.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/Rise_1.jpg", type: "image" },
        { src: "images/Rise_2.jpg", type: "image" },
        { src: "images/Rise_3.jpg", type: "image" },
        { src: "images/Rise_4.jpg", type: "image" },
        { src: "images/Rise_5.jpg", type: "image" },
        { src: "images/Rise_6.jpg", type: "image" },
        { src: "videos/Rise_7.mp4", type: "video" },
        {
          src: "When concepting for this launch, we landed on a strategy to revive RISE\u2019s cultural relevance. Defining their creative pillars as emotion, vibrancy and wonder, we invited the audience to feel intellectually stimulated, and walk away with a story. Anchored in playful escapism, the campaign spoke to the perennially curious as a physical manifestation of indulgence.",
          type: "text",
          title: "New Product Launch OOH Campaign",
          fontSize: "54px",
          color: "#84402A",
          backgroundColor: "#C374F6"
        },
        {
          src: "We built a creative strategy which recognized that the brand is larger than the product. Working in tandem with the brand strategist we developed an integrated campaign (photography, video, microsite direction, OOH design, event programming including guests and speakers, invitation design, and social media assets).<br><br>Creative Direction<br>On-set Direction<br>Design<br>Event & Activation ",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C374F6"
        },
        {
          src: "Photography Mathieu Fortin, Nik Mirus<br>Assist. Alexis Belhumeur, Aljosa Alijagic, Jeremy Bobrow<br>Styling Marianne Dubreuil<br>HMU Nicolas Blanchet<br> Sets & Props Audrey St-Laurent<br>Brand Strategy Marissa De Miguel<br>Models Nicholas, Hawa, Yvan, Lina<br>Produced & Shot st Studio L\u2019\xC9loi, Montr\xE9al<br>Graphic Design Assist. Vanessa Bourgault",
          type: "text",
          title: "Rise Kombucha",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C374F6"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 8,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.9.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.9.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/KOMBI_1.jpg", type: "image" },
        { src: "images/KOMBI_2.jpg", type: "image" },
        { src: "images/KOMBI_3.jpg", type: "image" },
        { src: "images/KOMBI_4.jpg", type: "image" },
        { src: "images/KOMBI_5.jpg", type: "image" },
        { src: "images/KOMBI_6.jpg", type: "image" },
        {
          src: "We translated Kombi\u2019s 60+ years of family history into vibrant, engaging images that invite all to join the fun. Partnering with them to myth bust performance and elitism in the outdoor space, we built a positioning around participation, play and inclusion. With Kombi, it\u2019s a family thing.",
          type: "text",
          title: "Campaign Strategy",
          fontSize: "54px",
          color: "#FFFFFF",
          backgroundColor: "#3851BA"
        },
        {
          src: "As Kombi\u2019s strategic and creative partner we supported their internal team throughout campaign development from concept to production. Additionally, we supported the brand to shape their customer facing personality.<br><br>Creative Direction<br>Campaign Strategy<br>Concept<br>Voice & Messaging<br> Casting<br>Art Buying<br>On-set Direction<br>Seasonal Design Direction<br>Production",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#3851BA"
        },
        {
          src: "Photography Kelly Jacob, Assist. Renaud Robert, Tom Berthelot<br>  Videography  Matt Charland, Oli Chapo<br>Styling Izabel Soucy, Assist. Samuel Joubert<br>HMU Valeria Amirova<br>Models Sam, Juliette, Jade, Cole, Rokko Riders<br>Catherine Perrault, Antoine St-Hilaire, Julien Gauthier, Jacob Gagnon<br>Producer Jade Fortin C\xF4t\xE9, Assist. Alexis Gauvin B.",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#3851BA"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 9,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.10.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.10.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/NIKE_1.jpg", type: "image" },
        { src: "images/NIKE_2.jpg", type: "image" },
        { src: "images/NIKE_3.jpg", type: "image" },
        { src: "images/NIKE_4.jpg", type: "image" },
        { src: "images/NIKE_5.jpg", type: "image" },
        {
          addPadding: true,
          src: "videos/NIKE_6.mp4",
          type: "video",
          backgroundColor: "#222232"
        },
        {
          src: "As part of the North American Nike campaign to revive the cultural cach\xE9 of Air Max, we were brought on as the Canadian team. The images, featuring multimedia artist Will Selviz were rolled out at Nike and Foot Locker, in-store and online,  and to launch Air Max Day.",
          type: "text",
          title: "Air Max Will Selviz",
          fontSize: "54px",
          color: "#FFFFFF",
          backgroundColor: "#222232"
        },
        {
          src: "Working closely with the in-house leads, we were on set in Vancouver to art direct and liaise with the Portland and NYC teams.",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#222232"
        },
        {
          src: "Vancouver Team \u2014 <br>Talent Will Selviz <br>Photography Conor Cunningham <br>Assist. Rob Seebacher, Mats Schram, Donnel Barroso <br>Styling Leila Bani, Assist. Masha Pazhouh, Deo Cruz <br>HMU Christopher Deagle <br>DOP The Pool Service <br>Production Design Hank Mann <br>Sets & Props Freddy Harder, Lauren Barrufa <br>1st AD Richard Amies<br>Production Blue Amber, Vancouver",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#222232"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 10,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.11.title"),
      title2: $_("slider.11.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/LB_2_1.jpg", type: "image" },
        {
          imageSrc: "images/LB_2_2.jpg",
          videoSrc: "videos/LB_2_2v.mp4",
          type: "two-columns"
        },
        { src: "images/LB_2_3.jpg", type: "image" },
        { src: "images/LB_2_4.jpg", type: "image" },
        { src: "images/LB_2_5.jpg", type: "image" },
        { src: "images/LB_2_6.jpg", type: "image" },
        { src: "images/LB_2_7.jpg", type: "image" },
        { src: "images/LB_2_8.jpg", type: "image" },
        {
          src: "Photography Kelly Jacob, Akina Chan, Briggs Ogloff, William Arcand, Marie H. Rainville, Assist. Don Loga, Emily Velasquez Gilbert, Kyle Gibson, Alex Guiry, Axel & Jacques Palomares, Greg Beck <br>Videography Gerardo Alcaine <br>Styling Tinashe Musara, Leila Bani, Tiana Franks, Fr\xE9d\xE9rique Gauthier, Izabel Soucy, Assist. Eunice Huot, Alyson Holler <br>Sets & Props Evelyne Morin <br>HMU Ashley Diabo, Maxine Munsun, Maria Walton, Alana & Maddie Alper, L\xE9onie L\xE9vesque, Claudine Jourdain <br>Models Ivy, Jamil, Ludovie, Kevin, Simone, Zacc, Anastasia, Tatenda, Shade, Whitney, Ciana Yekta, Chanel, No\xE9mie J\xE9r\xF4me, Naomy, Adams, <br>Production Aaron Van Dyck (Vancouver),  Kristia Louis-Seize (Montr\xE9al)",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#A3232E"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 11,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.12.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.12.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/CIS_1.jpg", type: "image" },
        { src: "images/CIS_2.jpg", type: "image" },
        { src: "images/CIS_3.jpg", type: "image" },
        { src: "images/CIS_4.jpg", type: "image" },
        { src: "images/CIS_5.jpg", type: "image" },
        { src: "images/CIS_6.jpg", type: "image" },
        { src: "images/CIS_7.jpg", type: "image" },
        { src: "images/CIS_8.jpg", type: "image" },
        {
          src: "We updated the brand strategy to support the client\u2019s shift from trend retailer to a purpose-driven brand. We brought significant changes to the DNA, resetting them on a foundation of inclusion, a community-first approach that is still true to the brand today. Extending these values behind the lens with the crew and talent allowed us to prove the Call It Spring family is real.",
          type: "text",
          title: "Creative Direction & Brand DNA",
          fontSize: "54px",
          color: "#C34C25",
          backgroundColor: "#CABADF"
        },
        {
          src: "As the once-upon-a-time in house, we go way back. Our history, trust and deep understanding of their business reality positioned us as long-term partners.<br><br>Creative Direction<br>Brand Strategy<br>Messaging Casting<br>On-set Direction<br>SB Secret Sauce Shot List<br>Shoe Face Ratio\u2122",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#CABADF"
        },
        {
          src: "This edit includes images from various seasons.<br>Photography Tim Barber Styling Imogene Barron<br>Sets & Props Sean Daly<br>HMU Nikki Providence, Sandy Ganzer, Danielle & Nicole Kahlani<br>Models KC, Dronme, Sandrine, Shaheem, Barbie, Julian, Christie, Alexis, Bella,Sahra, Josiah<br>Production The Production Club, Jade Jean-Marie, Natasha Forte, Camp Productions <br>Shot on location in LA & London",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#CABADF"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 12,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.13.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.13.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        {
          src: "images/LOUISE_1.jpg",
          type: "image"
        },
        {
          src: "images/LOUISE_2.jpg",
          type: "image"
        },
        {
          src: "images/LOUISE_3.jpg",
          type: "image"
        },
        {
          src: "images/LOUISE_4.jpg",
          type: "image"
        },
        {
          src: "How do you begin with a sound and create imagery that speaks to the emotion and personal message of a song?<br>With Louise Burns, coming to terms with teen stardom led her towards heartbreaking introspection and her fourth album, Portraits. Our creative direction recognized her growth and spoke to the strength of being a grown ass woman.",
          type: "text",
          title: "Creative Direction & Design",
          fontSize: "54px",
          color: "#FFFFFF",
          backgroundColor: "#1D1D1D"
        },
        {
          src: "We worked collaboratively  with Louise to define her new look and build the team to help create it.<br><br>Creative Direction<br>On-set Direction<br>Graphic Design",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#1D1D1D"
        },
        {
          src: "Photography Jennifer Latour<br>Styling Redia Soltis<br>HMU Taylor Smits, Harriet Sales",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#1D1D1D"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 13,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.14.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.14.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/GHANA_1.jpg", type: "image" },
        { src: "images/GHANA_2.jpg", type: "image" },
        { src: "images/GHANA_3.jpg", type: "image" },
        { src: "images/GHANA_4.jpg", type: "image" },
        { src: "images/GHANA_5.jpg", type: "image" },
        { src: "images/GHANA_6.jpg", type: "image" },
        { src: "images/GHANA_7.jpg", type: "image" },
        { src: "images/GHANA_8.jpg", type: "image" },
        { src: "images/GHANA_9.jpg", type: "image" },
        {
          src: "images/GHANA_10.jpg",
          type: "image"
        },
        {
          src: "images/GHANA_11.jpg",
          type: "image"
        },
        {
          src: "Through our relationship with Osei Duro, we<br>experienced something beyond a typical partnership.<br>We collaborated with creatives in many cities, travelled and immersed ourselves in different realities, and challenged our understanding of (slow) fashion. It fundamentally changed our understanding of the industry, our practice and our impact.",
          type: "text",
          title: "A Photo Essay on Slow Fashion",
          fontSize: "54px",
          color: "#E1D8CA",
          backgroundColor: "#111E"
        },
        {
          src: "Campaign Photography Jessica Sarkodie, Mathieu Fortin <br>Film & Travel Photography Super Bonjour<br>Sets & Props Osei Duro, Super Bonjour <br>Styling Osei Duro, Jay Forest<br>HMU by Alana & Maddie Alper<br>Models Nuerki, Penny<br>Shot in Montr\xE9al and in various locations around Accra, Ghana",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#111E"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 14,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.15.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.15.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/DT1_1.jpg", type: "image" },
        { src: "images/DT1_2.jpg", type: "image" },
        { src: "images/DT1_3.jpg", type: "image" },
        { src: "images/DT1_4.jpg", type: "image" },
        { src: "images/DT1_5.jpg", type: "image" },
        { src: "images/DT1_6.jpg", type: "image" },
        { src: "images/DT1_7.jpg", type: "image" },
        {
          src: "As their creative partners, we worked with the in-house team to course correct their positioning vis-a-vis a booming wellness industry. We refined a proprietary take on self-care and rituals, updated their overall design codes to inform their campaigns, packaging, tone and OOH messaging.",
          type: "text",
          title: "Brand Positioning & Campaign Strategy",
          fontSize: "54px",
          color: "#FFFFFF",
          backgroundColor: "#290B15"
        },
        {
          src: "Creative Direction, Campaign Strategy, Art Buying & On-set Direction<br>Video Storyboarding & Direction<br>Packaging Design ",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#290B15"
        },
        {
          src: "This edit includes images from various seasons<br>Photography by Mathieu Fortin<br>Assist. Martin Lacroix, Marc-Andr\xE9 Dumas, Carlo Calope,<br>Gerardo Alcaine Sets & Props Evelyne Morin, Audrey St-Laurent<br>Production Studio L\u2019\xC9loi, Montr\xE9al",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#290B15"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 15,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.16.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.16.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/Saxx_1.jpg", type: "image" },
        { src: "images/Saxx_2.jpg", type: "image" },
        { src: "images/Saxx_3.jpg", type: "image" },
        { src: "images/Saxx_4.jpg", type: "image" },
        { src: "images/Saxx_5.jpg", type: "image" },
        { src: "images/Saxx_6.jpg", type: "image" },
        {
          src: "For the love of dad \u2014 a feminist take on Father\u2019s Day, updating how men are portrayed. Inspired by Linda McCartney\u2019s family photos, our concept was anchored in the compassionate and tender gaze of a partner. Challenging the outdated codes of masculinity, we analyzed what it means to be a father (figure) today and crafted a love letter to the true spirit of fatherhood.",
          type: "text",
          title: "Campaign Concept & Storytelling",
          fontSize: "54px",
          color: "#C84600",
          backgroundColor: "#CABADF"
        },
        {
          src: "Sometimes, casting needs to happen on both sides of the lens. We reached out to our community to find the right pairing of family and photographer. <br>Partnering with our favorite London-based photographer, Imogene Barron, we captured sweet father-daughter moments at the Jean-Marie home.<br><br>Creative Direction<br>Messaging<br>Casting<br>Art Buying<br>Virtual Art Direction",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#CABADF"
        },
        {
          src: "Photography Imogene Barron, Assist James Giffiths<br>Styling Imogene Barron, Assist. Alicia Ellis<br>London Production Jade Jean-Marie<br>Vancouver Production Aaron Van Dyck<br>Featuring The Jean-Marie Family \u2014 Leon, Iggy & Milou<br>Shot on location in London",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#CABADF"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 16,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.17.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.17.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/ALTI_1.jpg", type: "image" },
        { src: "images/ALTI_2.jpg", type: "image" },
        { src: "images/ALTI_3.jpg", type: "image" },
        { src: "images/ALTI_4.jpg", type: "image" },
        { src: "images/ALTI_5.jpg", type: "image" },
        { src: "images/ALTI_6.jpg", type: "image" },
        {
          src: "Starting from a copy brief, we rooted this concept in emotional insights, designed to unite. Capturing that very moment of transformation \u2014 the feeling of achieving a new personal best \u2014 we called in a community of lunchtime athletes and introducing them to their new favorite retailer.",
          type: "text",
          title: "OOH Campaign Direction",
          fontSize: "54px",
          color: "#F8D0FB",
          backgroundColor: "#C34C25"
        },
        {
          src: "We joined the in-house team to develop an awareness campaign for multiple cities and new markets.<br><br>Campaign Strategy & Qualitative Insights<br>Storyboarding, Casting & On-set Direction<br>SB Secret Sauce Shot List",
          type: "text",
          title: "Scope",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C34C25"
        },
        {
          src: "Photography by Mathieu Fortin, Assist. Aljosa Alijagic, William Cole<br> Styling by Farah Benosman, Assist. Marianne Blais & Pascale Tessier<br>Sets & Props Mathilde Beaudoin-Tessier, Jean-Philippe Pelletier<br>HMU Valeria Amirova, Assist. Marie-Pier Tardif<br>Models Sheida, No\xE9mie, Diizon, Am\xE9lie<br> Production Jordan R. Bruneau, Madame Brown<br>Shot at the Olympic Stadium, Montr\xE9al ",
          type: "text",
          title: "Credits",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#C34C25"
        }
      ]
    }, {}, {})}
    ${validate_component(ParallaxSlider, "ParallaxSlider").$$render($$result, {
      id: 17,
      updateProjectIndex: (id) => handleProjectUpdate(id),
      title: $_("slider.18.title"),
      titleFont: "roc-grotesk",
      title2: $_("slider.18.title2"),
      isMobile,
      innerWidth,
      innerHeight,
      slidesData: [
        { src: "images/DT_2_1.jpg", type: "image" },
        { src: "images/DT_2_2.jpg", type: "image" },
        { src: "images/DT_2_3.jpg", type: "image" },
        { src: "images/DT_2_4.jpg", type: "image" },
        {
          addPadding: true,
          backgroundColor: "#9A7429",
          src: "videos/DT_2.mp4",
          type: "video"
        },
        { src: "images/DT_2_6.jpg", type: "image" },
        { src: "images/DT_2_7.jpg", type: "image" },
        {
          src: "Creative Direction, Campaign Strategy & On-set Direction Super Bonjour<br>This edit includes images from various seasons.<br>Photography Nik Mirus, Mathieu Fortin<br>Assist. Jeremy Bobrow, Marc-Andr\xE9 Dumas<br>DOP Nik Mirus Assist. Gerardo Alcaine, Gaffer Bastien Mayer, Grip St\xE9phane Klopp<br>Copy & Script Sacha Jackson<br>Sets & Props Evelyne Morin, Audrey St-Laurent, Micha\xEBl Ho<br>Styling Rima Chahine<br>Produced & Shot at Studio L\u2019\xC9loi, Montr\xE9al",
          type: "text",
          title: "Fable Home",
          font: "roc-grotesk, sans-serif",
          fontSize: "30px",
          color: "#E2EE75",
          backgroundColor: "#9A7429"
        }
      ]
    }, {}, {})}</div>
</main>`;
  } while (!$$settled);
  $$unsubscribe__();
  return $$rendered;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});

// .svelte-kit/vercel/entry.js
init();
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
