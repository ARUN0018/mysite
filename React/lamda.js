var u = Object.create;
var a = Object.defineProperty;
var g = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var l = Object.getPrototypeOf,
  R = Object.prototype.hasOwnProperty;
var c = (e) => a(e, "__esModule", { value: !0 });
var y = (e, r) => {
    for (var t in r) a(e, t, { get: r[t], enumerable: !0 });
  },
  n = (e, r, t, o) => {
    if ((r && typeof r == "object") || typeof r == "function")
      for (let s of d(r))
        !R.call(e, s) &&
          (t || s !== "default") &&
          a(e, s, {
            get: () => r[s],
            enumerable: !(o = g(r, s)) || o.enumerable,
          });
    return e;
  },
  f = (e, r) =>
    n(
      c(
        a(
          e != null ? u(l(e)) : {},
          "default",
          !r && e && e.__esModule
            ? { get: () => e.default, enumerable: !0 }
            : { value: e, enumerable: !0 }
        )
      ),
      e
    ),
  b = (
    (e) => (r, t) =>
      (e && e.get(r)) || ((t = n(c({}), r, 1)), e && e.set(r, t), t)
  )(typeof WeakMap != "undefined" ? new WeakMap() : 0);
var C = {};
y(C, { default: () => h });
var i = f(require("@solib/lambda-event-cfn-custom-resource"));
var p = "Custom::ParameterSpace";
var m = new i.default(),
  S = (e) => {
    let r = {};
    return (
      Object.keys(e).forEach((t) => {
        r[t] = typeof e[t] == "string" ? e[t] : JSON.stringify(e[t]);
      }),
      r
    );
  };
m.register(p, {
  schema: {
    type: "object",
    additionalProperties: !1,
    required: ["parameters"],
    properties: { parameters: { type: "string" } },
  },
  create: async (e) => ({
    physicalResourceId: "param-space" + Date.now(),
    attributes: S(JSON.parse(e.parameters.replaceAll('\\\\"', '\\"'))),
  }),
  update: async (e) => ({ physicalResourceId: e, attributes: {} }),
  delete: async (e) => ({ physicalResourceId: e, attributes: {} }),
  triggersReplacement: ["parameters"],
  noEcho: !0,
});
var h = m.getHandler();
module.exports = b(C);
0 && (module.exports = {});
