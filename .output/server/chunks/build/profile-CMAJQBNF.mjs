import { watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useAuth, n as navigateTo } from './server.mjs';
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentUser, initializing } = useAuth();
    const user = currentUser;
    watch([
      initializing,
      user
    ], ([ready, current]) => {
      if (ready && !current) {
        navigateTo("/login");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-53118a07>`);
      if (unref(user)) {
        _push(`<div class="profile-card" data-v-53118a07><div class="profile-header" data-v-53118a07>`);
        if (unref(user).photoURL) {
          _push(`<img${ssrRenderAttr("src", unref(user).photoURL)} alt="Avatar" data-v-53118a07>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-53118a07><h1 data-v-53118a07>${ssrInterpolate(unref(user).name)}</h1><p data-v-53118a07>${ssrInterpolate(unref(user).email)}</p></div></div><div class="profile-actions" data-v-53118a07><button class="btn btn--secondary" data-v-53118a07>Cerrar sesi\xF3n</button></div></div>`);
      } else {
        _push(`<div class="loading-state" data-v-53118a07><p data-v-53118a07>Verificando sesi\xF3n...</p></div>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53118a07"]]);

export { profile as default };
//# sourceMappingURL=profile-CMAJQBNF.mjs.map
