import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "fetch",
  __ssrInlineRender: true,
  setup(__props) {
    const todos = ref([]);
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "fetch-page" }, _attrs))} data-v-4a87b794><h2 data-v-4a87b794>Ejemplo async/await con API</h2><p data-v-4a87b794>Endpoint: https://jsonplaceholder.typicode.com/todos</p><div class="actions" data-v-4a87b794><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-4a87b794>${ssrInterpolate(unref(loading) ? "Cargando..." : "Volver a cargar")}</button></div>`);
      if (unref(loading)) {
        _push(`<p class="estado" data-v-4a87b794>Cargando datos...</p>`);
      } else if (unref(error)) {
        _push(`<p class="estado estado--error" data-v-4a87b794>${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<ul class="todos-list" data-v-4a87b794><!--[-->`);
        ssrRenderList(unref(todos), (todo) => {
          _push(`<li class="todo-item" data-v-4a87b794><span class="${ssrRenderClass(["badge", todo.completed ? "ok" : "pending"])}" data-v-4a87b794>${ssrInterpolate(todo.completed ? "Completado" : "Pendiente")}</span><span data-v-4a87b794>${ssrInterpolate(todo.id)}. ${ssrInterpolate(todo.title)}</span></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fetch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const fetch = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4a87b794"]]);

export { fetch as default };
//# sourceMappingURL=fetch-DqItvQ-4.mjs.map
