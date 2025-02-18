const beautify = require("js-beautify/js").js,
  fs = require("fs/promises");
const format = (scriptText) =>
  scriptText
    .replace(
      /([$a-zA-Z_]+[$a-zA-Z0-9_]*)\s*=\s*function\s*\(/g,
      "$1 = function $1(",
    )
    .replace(
      /([$a-zA-Z_]+[$a-zA-Z0-9_]*)\s*:\s*function\s*\(/g,
      "$1 : function $1(",
    );

(async () => {
  await import("./index.mjs");

  const pretty = function pretty(txt) {
    return beautify(txt, { indent_size: 2, space_in_empty_paren: true });
  };
  let file = await fs.readFile("./dist/superjson.js", "utf8");
  if (!file.includes("$defineProperty")) {
    const inject = `
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
  ${pretty(file)};/**/;
  Object.defineProperty = Object[$defineProperty];
  delete Object[$defineProperty];
  `;
    await fs.writeFile("./dist/superjson.js", inject, "utf8");
  }
  console.log(await fs.readFile("./dist/superjson.js", "utf8"));
})();
