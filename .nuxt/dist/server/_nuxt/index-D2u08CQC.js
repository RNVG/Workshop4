import { _ as __nuxt_component_0 } from "./nuxt-link-AZIIwCjv.js";
import { ref, computed, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { a as useFirestore, S as StatusState } from "./StatusState-CW3PuAZY.js";
import { u as useHead } from "./v3-oCCdC-ym.js";
import { _ as _export_sfc } from "../server.mjs";
import "/home/ryan/async-await/node_modules/ufo/dist/index.mjs";
import "firebase/firestore";
import "firebase/app";
import "firebase/auth";
import "/home/ryan/async-await/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/ryan/async-await/node_modules/hookable/dist/index.mjs";
import "/home/ryan/async-await/node_modules/unctx/dist/index.mjs";
import "/home/ryan/async-await/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/ryan/async-await/node_modules/radix3/dist/index.mjs";
import "/home/ryan/async-await/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Usuarios | Firebase + Nuxt Workshop",
      meta: [
        { name: "description", content: "Directorio de usuarios registrados en el sistema." }
      ]
    });
    const { getCollection } = useFirestore();
    const users = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const fetchUsers = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getCollection("users");
        users.value = data;
      } catch (err) {
        console.error("Error fetching users:", err);
        error.value = "Error al cargar los usuarios de Firestore.";
      } finally {
        loading.value = false;
      }
    };
    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value;
      const queryText = searchQuery.value.toLowerCase();
      return users.value.filter(
        (user) => {
          var _a;
          return (_a = user.name) == null ? void 0 : _a.toLowerCase().includes(queryText);
        }
      );
    });
    const handleAvatarError = (event) => {
      event.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "users-page animate-fade-in" }, _attrs))} data-v-0f4213ea><div class="page-header" data-v-0f4213ea><div data-v-0f4213ea><h1 class="page-title" data-v-0f4213ea>Directorio de Usuarios</h1><p class="page-subtitle" data-v-0f4213ea>Explora perfiles y haz seguimiento a los aportes de los estudiantes.</p></div></div><div class="filter-panel" data-v-0f4213ea><div class="search-input-wrapper" data-v-0f4213ea><span class="search-icon" data-v-0f4213ea>🔍</span><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Buscar usuario por nombre..." class="search-input" data-v-0f4213ea></div><div class="indicators" data-v-0f4213ea><span class="badge badge--info" data-v-0f4213ea>Total: ${ssrInterpolate(users.value.length)}</span><span class="badge badge--success" data-v-0f4213ea>Visibles: ${ssrInterpolate(filteredUsers.value.length)}</span></div></div>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: users.value.length === 0,
        onRefetch: fetchUsers
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(StatusState, {
              loading: false,
              error: "",
              isEmpty: filteredUsers.value.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="users-grid" data-v-0f4213ea${_scopeId2}><!--[-->`);
                  ssrRenderList(filteredUsers.value, (user) => {
                    _push3(`<div class="user-card" data-v-0f4213ea${_scopeId2}><img${ssrRenderAttr("src", user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150")} alt="Avatar" class="user-card__avatar" data-v-0f4213ea${_scopeId2}><div class="user-card__body" data-v-0f4213ea${_scopeId2}><h3 class="user-card__name" data-v-0f4213ea${_scopeId2}>${ssrInterpolate(user.name)}</h3><p class="user-card__email" data-v-0f4213ea${_scopeId2}>${ssrInterpolate(user.email)}</p>`);
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: `/users/${user.uid || user.id}`,
                      class: "btn-profile"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Ver Perfil Completo ➔ `);
                        } else {
                          return [
                            createTextVNode(" Ver Perfil Completo ➔ ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "users-grid" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredUsers.value, (user) => {
                        return openBlock(), createBlock("div", {
                          key: user.uid || user.id,
                          class: "user-card"
                        }, [
                          createVNode("img", {
                            src: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
                            alt: "Avatar",
                            class: "user-card__avatar",
                            onError: handleAvatarError
                          }, null, 40, ["src"]),
                          createVNode("div", { class: "user-card__body" }, [
                            createVNode("h3", { class: "user-card__name" }, toDisplayString(user.name), 1),
                            createVNode("p", { class: "user-card__email" }, toDisplayString(user.email), 1),
                            createVNode(_component_NuxtLink, {
                              to: `/users/${user.uid || user.id}`,
                              class: "btn-profile"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ver Perfil Completo ➔ ")
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ])
                        ]);
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
                isEmpty: filteredUsers.value.length === 0
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "users-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredUsers.value, (user) => {
                      return openBlock(), createBlock("div", {
                        key: user.uid || user.id,
                        class: "user-card"
                      }, [
                        createVNode("img", {
                          src: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
                          alt: "Avatar",
                          class: "user-card__avatar",
                          onError: handleAvatarError
                        }, null, 40, ["src"]),
                        createVNode("div", { class: "user-card__body" }, [
                          createVNode("h3", { class: "user-card__name" }, toDisplayString(user.name), 1),
                          createVNode("p", { class: "user-card__email" }, toDisplayString(user.email), 1),
                          createVNode(_component_NuxtLink, {
                            to: `/users/${user.uid || user.id}`,
                            class: "btn-profile"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ver Perfil Completo ➔ ")
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ])
                      ]);
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f4213ea"]]);
export {
  index as default
};
//# sourceMappingURL=index-D2u08CQC.js.map
