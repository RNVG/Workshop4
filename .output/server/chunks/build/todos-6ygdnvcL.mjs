import { ref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useFirestore, S as StatusState } from './StatusState-CW3PuAZY.mjs';
import { where } from 'firebase/firestore';
import { _ as _export_sfc } from './server.mjs';
import 'firebase/auth';
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

const _sfc_main = {
  __name: "todos",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { getCollection } = useFirestore();
    const userId = route.params.id;
    const todos2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const fetchUserTodos = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getCollection("todos", [
          where("userId", "==", userId)
        ]);
        todos2.value = data.sort((a, b) => {
          var _a, _b;
          const dateA = ((_a = a.createdAt) == null ? void 0 : _a.seconds) || 0;
          const dateB = ((_b = b.createdAt) == null ? void 0 : _b.seconds) || 0;
          return dateB - dateA;
        });
      } catch (err) {
        console.error("Error fetching user todos:", err);
        error.value = "No se pudieron recuperar las tareas del usuario.";
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "user-todos-nested animate-slide-down" }, _attrs))} data-v-2739b799>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: todos2.value.length === 0,
        onRefetch: fetchUserTodos
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="nested-todos-list" data-v-2739b799${_scopeId}><!--[-->`);
            ssrRenderList(todos2.value, (todo) => {
              _push2(`<div class="${ssrRenderClass([{ "nested-todo-item--completed": todo.completed }, "nested-todo-item"])}" data-v-2739b799${_scopeId}><span class="status-marker" data-v-2739b799${_scopeId}>${ssrInterpolate(todo.completed ? "\u2705" : "\u23F3")}</span><div class="todo-info" data-v-2739b799${_scopeId}><span class="todo-title" data-v-2739b799${_scopeId}>${ssrInterpolate(todo.title)}</span><span class="todo-label" data-v-2739b799${_scopeId}>${ssrInterpolate(todo.completed ? "Completada" : "Pendiente")}</span></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "nested-todos-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(todos2.value, (todo) => {
                  return openBlock(), createBlock("div", {
                    key: todo.id,
                    class: ["nested-todo-item", { "nested-todo-item--completed": todo.completed }]
                  }, [
                    createVNode("span", { class: "status-marker" }, toDisplayString(todo.completed ? "\u2705" : "\u23F3"), 1),
                    createVNode("div", { class: "todo-info" }, [
                      createVNode("span", { class: "todo-title" }, toDisplayString(todo.title), 1),
                      createVNode("span", { class: "todo-label" }, toDisplayString(todo.completed ? "Completada" : "Pendiente"), 1)
                    ])
                  ], 2);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/[id]/todos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const todos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2739b799"]]);

export { todos as default };
//# sourceMappingURL=todos-6ygdnvcL.mjs.map
