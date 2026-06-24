import { ssrRenderAttrs } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(_attrs)} data-v-1fb03e8c><h2 data-v-1fb03e8c>About</h2><p data-v-1fb03e8c> Este proyecto es la base para ense\xF1ar Vue 3 con Nuxt en la universidad. Explora el c\xF3digo en las carpetas <code data-v-1fb03e8c>pages/</code>, <code data-v-1fb03e8c>components/</code>, <code data-v-1fb03e8c>layouts/</code> y <code data-v-1fb03e8c>composables/</code>. </p><h3 data-v-1fb03e8c>Estructura del proyecto</h3><ul data-v-1fb03e8c><li data-v-1fb03e8c><strong data-v-1fb03e8c>pages/</strong> \u2014 Una archivo por ruta</li><li data-v-1fb03e8c><strong data-v-1fb03e8c>components/</strong> \u2014 Piezas reutilizables</li><li data-v-1fb03e8c><strong data-v-1fb03e8c>layouts/</strong> \u2014 Estructura com\xFAn (header, footer)</li><li data-v-1fb03e8c><strong data-v-1fb03e8c>composables/</strong> \u2014 L\xF3gica compartida</li></ul><p data-v-1fb03e8c> Consulta <code data-v-1fb03e8c>GUIA-VUE3-NUXT.md</code> en la ra\xEDz del proyecto para el material completo. </p></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1fb03e8c"]]);

export { about as default };
//# sourceMappingURL=about-DYL94KmB.mjs.map
