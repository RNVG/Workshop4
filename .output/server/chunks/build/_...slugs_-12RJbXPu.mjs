import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  __name: "[...slugs]",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "not-found" }, _attrs))} data-v-8118b37d><div class="not-found__content" data-v-8118b37d><h1 class="not-found__titulo" data-v-8118b37d>404</h1><h2 class="not-found__subtitulo" data-v-8118b37d>P\xE1gina no encontrada</h2><p class="not-found__mensaje" data-v-8118b37d> Lo siento, la p\xE1gina que buscas no existe o ha sido movida. </p><div class="not-found__navegacion" data-v-8118b37d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn btn--primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u{1F3E0} Ir al inicio `);
          } else {
            return [
              createTextVNode(" \u{1F3E0} Ir al inicio ")
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
            _push2(` \u{1F4DA} Ver cursos `);
          } else {
            return [
              createTextVNode(" \u{1F4DA} Ver cursos ")
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
            _push2(` \u2764\uFE0F Mis favoritos `);
          } else {
            return [
              createTextVNode(" \u2764\uFE0F Mis favoritos ")
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

export { ____slugs_ as default };
//# sourceMappingURL=_...slugs_-12RJbXPu.mjs.map
