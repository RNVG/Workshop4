import { ref, computed, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { a as useFirestore, S as StatusState } from "./StatusState-CW3PuAZY.js";
import { _ as _export_sfc, u as useAuth } from "../server.mjs";
import { where } from "firebase/firestore";
import "/home/ryan/async-await/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-oCCdC-ym.js";
import "firebase/app";
import "firebase/auth";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/ryan/async-await/node_modules/unctx/dist/index.mjs";
import "/home/ryan/async-await/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/ryan/async-await/node_modules/radix3/dist/index.mjs";
import "/home/ryan/async-await/node_modules/defu/dist/defu.mjs";
import "/home/ryan/async-await/node_modules/ufo/dist/index.mjs";
import "/home/ryan/async-await/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "todos",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Mis Tareas | Firebase + Nuxt Workshop",
      meta: [
        { name: "description", content: "Administra tus tareas pendientes en Firestore." }
      ]
    });
    const { getCollection, updateDocument, deleteDocument } = useFirestore();
    const { currentUser } = useAuth();
    const todos2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const newTodoTitle = ref("");
    const submitting = ref(false);
    const fetchTodos = async () => {
      if (!currentUser.value) return;
      loading.value = true;
      error.value = "";
      try {
        const data = await getCollection("todos", [
          where("userId", "==", currentUser.value.uid)
        ]);
        todos2.value = data.sort((a, b) => {
          var _a, _b;
          const dateA = ((_a = a.createdAt) == null ? void 0 : _a.seconds) || 0;
          const dateB = ((_b = b.createdAt) == null ? void 0 : _b.seconds) || 0;
          return dateB - dateA;
        });
      } catch (err) {
        console.error("Error fetching todos:", err);
        error.value = "No se pudieron recuperar las tareas.";
      } finally {
        loading.value = false;
      }
    };
    const filteredTodos = computed(() => {
      if (!searchQuery.value) return todos2.value;
      const queryText = searchQuery.value.toLowerCase();
      return todos2.value.filter(
        (todo) => {
          var _a;
          return (_a = todo.title) == null ? void 0 : _a.toLowerCase().includes(queryText);
        }
      );
    });
    const handleToggleTodo = async (todo) => {
      try {
        const targetStatus = !todo.completed;
        await updateDocument("todos", todo.id, { completed: targetStatus });
        todo.completed = targetStatus;
      } catch (err) {
        console.error("Error updating todo:", err);
        alert("No se pudo actualizar el estado de la tarea.");
      }
    };
    const handleDeleteTodo = async (id) => {
      try {
        await deleteDocument("todos", id);
        todos2.value = todos2.value.filter((t) => t.id !== id);
      } catch (err) {
        console.error("Error deleting todo:", err);
        alert("No se pudo eliminar la tarea.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(currentUser)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "todos-page animate-fade-in" }, _attrs))} data-v-1c9e9619><div class="page-header" data-v-1c9e9619><div data-v-1c9e9619><h1 class="page-title" data-v-1c9e9619>Gestor de Tareas</h1><p class="page-subtitle" data-v-1c9e9619>Administra tus pendientes en tiempo real con Firestore.</p></div></div><div class="todo-create-card" data-v-1c9e9619><form class="todo-form" data-v-1c9e9619><input${ssrRenderAttr("value", newTodoTitle.value)} type="text" placeholder="¿Qué tienes planeado hacer hoy?..." required class="todo-input" data-v-1c9e9619><button type="submit" class="btn btn--primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-1c9e9619>${ssrInterpolate(submitting.value ? "Añadiendo..." : "➕ Añadir")}</button></form></div><div class="filter-panel" data-v-1c9e9619><div class="search-input-wrapper" data-v-1c9e9619><span class="search-icon" data-v-1c9e9619>🔍</span><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Filtrar tareas por título..." class="search-input" data-v-1c9e9619></div><div class="indicators" data-v-1c9e9619><span class="badge badge--info" data-v-1c9e9619>Total: ${ssrInterpolate(todos2.value.length)}</span><span class="badge badge--success" data-v-1c9e9619>Visibles: ${ssrInterpolate(filteredTodos.value.length)}</span></div></div>`);
        _push(ssrRenderComponent(StatusState, {
          loading: loading.value,
          error: error.value,
          isEmpty: todos2.value.length === 0,
          onRefetch: fetchTodos
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(StatusState, {
                loading: false,
                error: "",
                isEmpty: filteredTodos.value.length === 0
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="todos-list" data-v-1c9e9619${_scopeId2}><!--[-->`);
                    ssrRenderList(filteredTodos.value, (todo) => {
                      _push3(`<div class="${ssrRenderClass([{ "todo-item--completed": todo.completed }, "todo-item"])}" data-v-1c9e9619${_scopeId2}><div class="todo-item__checkbox" data-v-1c9e9619${_scopeId2}><span class="checkbox-box" data-v-1c9e9619${_scopeId2}>`);
                      if (todo.completed) {
                        _push3(`<span class="checkmark" data-v-1c9e9619${_scopeId2}>✓</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</span></div><div class="todo-item__content" data-v-1c9e9619${_scopeId2}><p class="todo-title" data-v-1c9e9619${_scopeId2}>${ssrInterpolate(todo.title)}</p><span class="todo-status" data-v-1c9e9619${_scopeId2}>${ssrInterpolate(todo.completed ? "Completado" : "Pendiente")}</span></div><button class="btn-delete" title="Eliminar tarea" data-v-1c9e9619${_scopeId2}> 🗑️ </button></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "todos-list" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredTodos.value, (todo) => {
                          return openBlock(), createBlock("div", {
                            key: todo.id,
                            class: ["todo-item", { "todo-item--completed": todo.completed }]
                          }, [
                            createVNode("div", {
                              class: "todo-item__checkbox",
                              onClick: ($event) => handleToggleTodo(todo)
                            }, [
                              createVNode("span", { class: "checkbox-box" }, [
                                todo.completed ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "checkmark"
                                }, "✓")) : createCommentVNode("", true)
                              ])
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              class: "todo-item__content",
                              onClick: ($event) => handleToggleTodo(todo)
                            }, [
                              createVNode("p", { class: "todo-title" }, toDisplayString(todo.title), 1),
                              createVNode("span", { class: "todo-status" }, toDisplayString(todo.completed ? "Completado" : "Pendiente"), 1)
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => handleDeleteTodo(todo.id),
                              class: "btn-delete",
                              title: "Eliminar tarea"
                            }, " 🗑️ ", 8, ["onClick"])
                          ], 2);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(StatusState, {
                  loading: false,
                  error: "",
                  isEmpty: filteredTodos.value.length === 0
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "todos-list" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredTodos.value, (todo) => {
                        return openBlock(), createBlock("div", {
                          key: todo.id,
                          class: ["todo-item", { "todo-item--completed": todo.completed }]
                        }, [
                          createVNode("div", {
                            class: "todo-item__checkbox",
                            onClick: ($event) => handleToggleTodo(todo)
                          }, [
                            createVNode("span", { class: "checkbox-box" }, [
                              todo.completed ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "checkmark"
                              }, "✓")) : createCommentVNode("", true)
                            ])
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            class: "todo-item__content",
                            onClick: ($event) => handleToggleTodo(todo)
                          }, [
                            createVNode("p", { class: "todo-title" }, toDisplayString(todo.title), 1),
                            createVNode("span", { class: "todo-status" }, toDisplayString(todo.completed ? "Completado" : "Pendiente"), 1)
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => handleDeleteTodo(todo.id),
                            class: "btn-delete",
                            title: "Eliminar tarea"
                          }, " 🗑️ ", 8, ["onClick"])
                        ], 2);
                      }), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["isEmpty"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/todos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const todos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c9e9619"]]);
export {
  todos as default
};
//# sourceMappingURL=todos-CF2-ppr-.js.map
