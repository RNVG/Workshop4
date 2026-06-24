import { computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentUser, loading, error, initializing } = useAuth();
    const isReady = computed(() => !initializing.value);
    watch([
      currentUser,
      isReady
    ], ([user, ready]) => {
      if (ready && user) {
        navigateTo("/profile");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "auth-page" }, _attrs))} data-v-eb35c961><h1 data-v-eb35c961>Iniciar sesi\xF3n</h1><div class="auth-card" data-v-eb35c961><p data-v-eb35c961>Accede con Google para continuar en el workshop.</p><button class="btn btn--primary"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-eb35c961>${ssrInterpolate(unref(loading) ? "Iniciando..." : "Iniciar con Google")}</button>`);
      if (unref(error)) {
        _push(`<p class="error-message" data-v-eb35c961>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb35c961"]]);

export { login as default };
//# sourceMappingURL=login-D8QSPyv-.mjs.map
