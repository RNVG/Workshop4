import { _ as __nuxt_component_0 } from "./nuxt-link-AZIIwCjv.js";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "/home/ryan/async-await/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/ryan/async-await/node_modules/hookable/dist/index.mjs";
import "/home/ryan/async-await/node_modules/unctx/dist/index.mjs";
import "/home/ryan/async-await/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/ryan/async-await/node_modules/radix3/dist/index.mjs";
import "/home/ryan/async-await/node_modules/defu/dist/defu.mjs";
import "firebase/auth";
import "firebase/firestore";
import "firebase/app";
const _sfc_main = {
  __name: "[...slugs]",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "not-found" }, _attrs))} data-v-8118b37d><div class="not-found__content" data-v-8118b37d><h1 class="not-found__titulo" data-v-8118b37d>404</h1><h2 class="not-found__subtitulo" data-v-8118b37d>Página no encontrada</h2><p class="not-found__mensaje" data-v-8118b37d> Lo siento, la página que buscas no existe o ha sido movida. </p><div class="not-found__navegacion" data-v-8118b37d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn btn--primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 🏠 Ir al inicio `);
          } else {
            return [
              createTextVNode(" 🏠 Ir al inicio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cursos",
        class: "btn btn--secundario"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 📚 Ver cursos `);
          } else {
            return [
              createTextVNode(" 📚 Ver cursos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/favoritos",
        class: "btn btn--secundario"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ❤️ Mis favoritos `);
          } else {
            return [
              createTextVNode(" ❤️ Mis favoritos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slugs].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slugs_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8118b37d"]]);
export {
  ____slugs_ as default
};
//# sourceMappingURL=_...slugs_-12RJbXPu.js.map
