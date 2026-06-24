import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useFirestore, S as StatusState } from './StatusState-CW3PuAZY.mjs';
import { _ as _export_sfc, u as useAuth } from './server.mjs';
import { u as useHead } from './v3-oCCdC-ym.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'firebase/firestore';
import 'firebase/auth';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Posts | Firebase + Nuxt Workshop",
      meta: [
        { name: "description", content: "Manejo de posts en Firestore, operaciones CRUD y b\xFAsquedas." }
      ]
    });
    const { getCollection, deleteDocument } = useFirestore();
    const { currentUser } = useAuth();
    const posts = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const submitting = ref(false);
    const newPost = ref({
      title: "",
      body: ""
    });
    const editingPost = ref({
      id: "",
      title: "",
      body: "",
      userId: ""
    });
    const truncate = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    const fetchPosts = async () => {
      loading.value = true;
      error.value = "";
      try {
        const rawPosts = await getCollection("posts");
        posts.value = rawPosts.sort((a, b) => {
          var _a, _b;
          const dateA = ((_a = a.createdAt) == null ? void 0 : _a.seconds) || 0;
          const dateB = ((_b = b.createdAt) == null ? void 0 : _b.seconds) || 0;
          return dateB - dateA;
        });
      } catch (err) {
        console.error("Error fetching posts:", err);
        error.value = "No se pudieron recuperar las publicaciones de Firestore.";
      } finally {
        loading.value = false;
      }
    };
    const filteredPosts = computed(() => {
      if (!searchQuery.value) return posts.value;
      const queryText = searchQuery.value.toLowerCase();
      return posts.value.filter(
        (post) => {
          var _a;
          return (_a = post.title) == null ? void 0 : _a.toLowerCase().includes(queryText);
        }
      );
    });
    const openEditModal = (post) => {
      editingPost.value = { ...post };
      showEditModal.value = true;
    };
    const handleDelete = async (id) => {
      if (!confirm("\xBFEst\xE1s seguro de que deseas eliminar esta publicaci\xF3n?")) return;
      try {
        await deleteDocument("posts", id);
        posts.value = posts.value.filter((p) => p.id !== id);
      } catch (err) {
        console.error("Error deleting post:", err);
        alert("Error al eliminar la publicaci\xF3n.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "posts-page animate-fade-in" }, _attrs))} data-v-f5fecf1a><div class="page-header" data-v-f5fecf1a><div data-v-f5fecf1a><h1 class="page-title" data-v-f5fecf1a>Publicaciones</h1><p class="page-subtitle" data-v-f5fecf1a>Explora lo que la comunidad ha compartido.</p></div>`);
      if (unref(currentUser)) {
        _push(`<button class="btn btn--primary" data-v-f5fecf1a> \u2795 Crear Publicaci\xF3n </button>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "btn btn--secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F511} Inicia sesi\xF3n para publicar `);
            } else {
              return [
                createTextVNode(" \u{1F511} Inicia sesi\xF3n para publicar ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div><div class="filter-panel" data-v-f5fecf1a><div class="search-input-wrapper" data-v-f5fecf1a><span class="search-icon" data-v-f5fecf1a>\u{1F50D}</span><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Buscar post por t\xEDtulo..." class="search-input" data-v-f5fecf1a></div><div class="indicators" data-v-f5fecf1a><span class="badge badge--info" data-v-f5fecf1a>Total: ${ssrInterpolate(posts.value.length)}</span><span class="badge badge--success" data-v-f5fecf1a>Visibles: ${ssrInterpolate(filteredPosts.value.length)}</span></div></div>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: posts.value.length === 0,
        onRefetch: fetchPosts
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(StatusState, {
              loading: false,
              error: "",
              isEmpty: filteredPosts.value.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="posts-grid" data-v-f5fecf1a${_scopeId2}><!--[-->`);
                  ssrRenderList(filteredPosts.value, (post) => {
                    _push3(`<div class="post-card" data-v-f5fecf1a${_scopeId2}><div class="post-card__content" data-v-f5fecf1a${_scopeId2}><h3 class="post-card__title" data-v-f5fecf1a${_scopeId2}>${ssrInterpolate(post.title)}</h3><p class="post-card__body" data-v-f5fecf1a${_scopeId2}>${ssrInterpolate(truncate(post.body, 120))}</p><div class="post-card__author" data-v-f5fecf1a${_scopeId2}><span class="author-icon" data-v-f5fecf1a${_scopeId2}>\u{1F464}</span><span class="author-name" data-v-f5fecf1a${_scopeId2}>ID Usuario: ${ssrInterpolate(post.userId)}</span></div></div><div class="post-card__actions" data-v-f5fecf1a${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: `/posts/${post.id}`,
                      class: "btn-action btn-action--view"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` \u{1F441}\uFE0F Ver Detalle `);
                        } else {
                          return [
                            createTextVNode(" \u{1F441}\uFE0F Ver Detalle ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (unref(currentUser) && (unref(currentUser).uid === post.userId || post.userId.startsWith("user_"))) {
                      _push3(`<!--[--><button class="btn-action btn-action--edit" data-v-f5fecf1a${_scopeId2}> \u270F\uFE0F Editar </button><button class="btn-action btn-action--delete" data-v-f5fecf1a${_scopeId2}> \u{1F5D1}\uFE0F Borrar </button><!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "posts-grid" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredPosts.value, (post) => {
                        return openBlock(), createBlock("div", {
                          key: post.id,
                          class: "post-card"
                        }, [
                          createVNode("div", { class: "post-card__content" }, [
                            createVNode("h3", { class: "post-card__title" }, toDisplayString(post.title), 1),
                            createVNode("p", { class: "post-card__body" }, toDisplayString(truncate(post.body, 120)), 1),
                            createVNode("div", { class: "post-card__author" }, [
                              createVNode("span", { class: "author-icon" }, "\u{1F464}"),
                              createVNode("span", { class: "author-name" }, "ID Usuario: " + toDisplayString(post.userId), 1)
                            ])
                          ]),
                          createVNode("div", { class: "post-card__actions" }, [
                            createVNode(_component_NuxtLink, {
                              to: `/posts/${post.id}`,
                              class: "btn-action btn-action--view"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" \u{1F441}\uFE0F Ver Detalle ")
                              ]),
                              _: 1
                            }, 8, ["to"]),
                            unref(currentUser) && (unref(currentUser).uid === post.userId || post.userId.startsWith("user_")) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createVNode("button", {
                                onClick: ($event) => openEditModal(post),
                                class: "btn-action btn-action--edit"
                              }, " \u270F\uFE0F Editar ", 8, ["onClick"]),
                              createVNode("button", {
                                onClick: ($event) => handleDelete(post.id),
                                class: "btn-action btn-action--delete"
                              }, " \u{1F5D1}\uFE0F Borrar ", 8, ["onClick"])
                            ], 64)) : createCommentVNode("", true)
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
                isEmpty: filteredPosts.value.length === 0
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "posts-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredPosts.value, (post) => {
                      return openBlock(), createBlock("div", {
                        key: post.id,
                        class: "post-card"
                      }, [
                        createVNode("div", { class: "post-card__content" }, [
                          createVNode("h3", { class: "post-card__title" }, toDisplayString(post.title), 1),
                          createVNode("p", { class: "post-card__body" }, toDisplayString(truncate(post.body, 120)), 1),
                          createVNode("div", { class: "post-card__author" }, [
                            createVNode("span", { class: "author-icon" }, "\u{1F464}"),
                            createVNode("span", { class: "author-name" }, "ID Usuario: " + toDisplayString(post.userId), 1)
                          ])
                        ]),
                        createVNode("div", { class: "post-card__actions" }, [
                          createVNode(_component_NuxtLink, {
                            to: `/posts/${post.id}`,
                            class: "btn-action btn-action--view"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" \u{1F441}\uFE0F Ver Detalle ")
                            ]),
                            _: 1
                          }, 8, ["to"]),
                          unref(currentUser) && (unref(currentUser).uid === post.userId || post.userId.startsWith("user_")) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode("button", {
                              onClick: ($event) => openEditModal(post),
                              class: "btn-action btn-action--edit"
                            }, " \u270F\uFE0F Editar ", 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => handleDelete(post.id),
                              class: "btn-action btn-action--delete"
                            }, " \u{1F5D1}\uFE0F Borrar ", 8, ["onClick"])
                          ], 64)) : createCommentVNode("", true)
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
      if (showCreateModal.value) {
        _push(`<div class="modal-overlay" data-v-f5fecf1a><div class="modal-card" data-v-f5fecf1a><h2 class="modal-title" data-v-f5fecf1a>Nueva Publicaci\xF3n</h2><form data-v-f5fecf1a><div class="form-group" data-v-f5fecf1a><label for="new-title" data-v-f5fecf1a>T\xEDtulo</label><input${ssrRenderAttr("value", newPost.value.title)} id="new-title" type="text" placeholder="Escribe un t\xEDtulo llamativo..." required data-v-f5fecf1a></div><div class="form-group" data-v-f5fecf1a><label for="new-body" data-v-f5fecf1a>Contenido</label><textarea id="new-body" rows="5" placeholder="Escribe el contenido del post..." required data-v-f5fecf1a>${ssrInterpolate(newPost.value.body)}</textarea></div><div class="modal-buttons" data-v-f5fecf1a><button type="button" class="btn btn--secondary-outline" data-v-f5fecf1a>Cancelar</button><button type="submit" class="btn btn--primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-f5fecf1a>${ssrInterpolate(submitting.value ? "Guardando..." : "Publicar")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showEditModal.value) {
        _push(`<div class="modal-overlay" data-v-f5fecf1a><div class="modal-card" data-v-f5fecf1a><h2 class="modal-title" data-v-f5fecf1a>Editar Publicaci\xF3n</h2><form data-v-f5fecf1a><div class="form-group" data-v-f5fecf1a><label for="edit-title" data-v-f5fecf1a>T\xEDtulo</label><input${ssrRenderAttr("value", editingPost.value.title)} id="edit-title" type="text" required data-v-f5fecf1a></div><div class="form-group" data-v-f5fecf1a><label for="edit-body" data-v-f5fecf1a>Contenido</label><textarea id="edit-body" rows="5" required data-v-f5fecf1a>${ssrInterpolate(editingPost.value.body)}</textarea></div><div class="modal-buttons" data-v-f5fecf1a><button type="button" class="btn btn--secondary-outline" data-v-f5fecf1a>Cancelar</button><button type="submit" class="btn btn--primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-f5fecf1a>${ssrInterpolate(submitting.value ? "Guardando..." : "Guardar Cambios")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5fecf1a"]]);

export { index as default };
//# sourceMappingURL=index-CwBBiECl.mjs.map
