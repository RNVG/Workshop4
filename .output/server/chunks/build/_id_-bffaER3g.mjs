import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { _ as _export_sfc, u as useAuth, e as __nuxt_component_1 } from './server.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, unref, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useFirestore, S as StatusState } from './StatusState-CW3PuAZY.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'firebase/firestore';
import 'firebase/auth';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { getDocument, deleteDocument } = useFirestore();
    const { currentUser } = useAuth();
    const postId = route.params.id;
    const post = ref(null);
    const loading = ref(false);
    const error = ref("");
    const showEditModal = ref(false);
    const submitting = ref(false);
    const editingPost = ref({ title: "", body: "" });
    useHead({
      title: computed(() => post.value ? `${post.value.title} | Post` : "Detalle del Post"),
      meta: [
        { name: "description", content: "Detalle de la publicaci\xF3n y comentarios." }
      ]
    });
    const isShowingComments = computed(() => {
      return route.path.endsWith("/comments");
    });
    const fetchPost = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getDocument("posts", postId);
        if (!data) {
          error.value = "El post solicitado no existe.";
        } else {
          post.value = data;
          editingPost.value = { ...data };
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        error.value = "Error al cargar la publicaci\xF3n desde Firestore.";
      } finally {
        loading.value = false;
      }
    };
    const formatDate = (timestamp) => {
      if (!timestamp) return "";
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const handleDelete = async () => {
      if (!confirm("\xBFEst\xE1s seguro de que deseas eliminar esta publicaci\xF3n?")) return;
      try {
        await deleteDocument("posts", postId);
        router.push("/posts");
      } catch (err) {
        console.error("Error deleting post:", err);
        alert("Error al borrar la publicaci\xF3n.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "post-detail-page animate-fade-in" }, _attrs))} data-v-ccc9d141><div class="back-nav" data-v-ccc9d141>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/posts",
        class: "btn-back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u2B05\uFE0F Volver a Publicaciones`);
          } else {
            return [
              createTextVNode("\u2B05\uFE0F Volver a Publicaciones")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: !post.value,
        onRefetch: fetchPost
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (post.value) {
              _push2(`<div class="post-detail" data-v-ccc9d141${_scopeId}><article class="post-main" data-v-ccc9d141${_scopeId}><h1 class="post-title" data-v-ccc9d141${_scopeId}>${ssrInterpolate(post.value.title)}</h1><p class="post-body" data-v-ccc9d141${_scopeId}>${ssrInterpolate(post.value.body)}</p><div class="post-meta" data-v-ccc9d141${_scopeId}><span class="meta-item" data-v-ccc9d141${_scopeId}>\u{1F464} Autor ID: ${ssrInterpolate(post.value.userId)}</span>`);
              if (post.value.createdAt) {
                _push2(`<span class="meta-item" data-v-ccc9d141${_scopeId}> \u{1F4C5} ${ssrInterpolate(formatDate(post.value.createdAt))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(currentUser) && (unref(currentUser).uid === post.value.userId || post.value.userId.startsWith("user_"))) {
                _push2(`<div class="post-actions" data-v-ccc9d141${_scopeId}><button class="btn btn--warning-outline" data-v-ccc9d141${_scopeId}>\u270F\uFE0F Editar Post</button><button class="btn btn--danger-outline" data-v-ccc9d141${_scopeId}>\u{1F5D1}\uFE0F Eliminar Post</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</article><section class="comments-section" data-v-ccc9d141${_scopeId}><div class="comments-header" data-v-ccc9d141${_scopeId}><h2 data-v-ccc9d141${_scopeId}>Comentarios de la Comunidad</h2>`);
              if (!isShowingComments.value) {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/posts/${post.value.id}/comments`,
                  class: "btn btn--primary"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u{1F4AC} Cargar Comentarios `);
                    } else {
                      return [
                        createTextVNode(" \u{1F4AC} Cargar Comentarios ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/posts/${post.value.id}`,
                  class: "btn btn--secondary"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u{1F648} Ocultar Comentarios `);
                    } else {
                      return [
                        createTextVNode(" \u{1F648} Ocultar Comentarios ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
              _push2(`</div><div class="nested-comments-container" data-v-ccc9d141${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
              if (!isShowingComments.value) {
                _push2(`<div class="comments-placeholder" data-v-ccc9d141${_scopeId}><p data-v-ccc9d141${_scopeId}>Presiona &quot;Cargar Comentarios&quot; para ver la discusi\xF3n.</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></section></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              post.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "post-detail"
              }, [
                createVNode("article", { class: "post-main" }, [
                  createVNode("h1", { class: "post-title" }, toDisplayString(post.value.title), 1),
                  createVNode("p", { class: "post-body" }, toDisplayString(post.value.body), 1),
                  createVNode("div", { class: "post-meta" }, [
                    createVNode("span", { class: "meta-item" }, "\u{1F464} Autor ID: " + toDisplayString(post.value.userId), 1),
                    post.value.createdAt ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "meta-item"
                    }, " \u{1F4C5} " + toDisplayString(formatDate(post.value.createdAt)), 1)) : createCommentVNode("", true)
                  ]),
                  unref(currentUser) && (unref(currentUser).uid === post.value.userId || post.value.userId.startsWith("user_")) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "post-actions"
                  }, [
                    createVNode("button", {
                      onClick: ($event) => showEditModal.value = true,
                      class: "btn btn--warning-outline"
                    }, "\u270F\uFE0F Editar Post", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: handleDelete,
                      class: "btn btn--danger-outline"
                    }, "\u{1F5D1}\uFE0F Eliminar Post")
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("section", { class: "comments-section" }, [
                  createVNode("div", { class: "comments-header" }, [
                    createVNode("h2", null, "Comentarios de la Comunidad"),
                    !isShowingComments.value ? (openBlock(), createBlock(_component_NuxtLink, {
                      key: 0,
                      to: `/posts/${post.value.id}/comments`,
                      class: "btn btn--primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F4AC} Cargar Comentarios ")
                      ]),
                      _: 1
                    }, 8, ["to"])) : (openBlock(), createBlock(_component_NuxtLink, {
                      key: 1,
                      to: `/posts/${post.value.id}`,
                      class: "btn btn--secondary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u{1F648} Ocultar Comentarios ")
                      ]),
                      _: 1
                    }, 8, ["to"]))
                  ]),
                  createVNode("div", { class: "nested-comments-container" }, [
                    createVNode(_component_NuxtPage),
                    !isShowingComments.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "comments-placeholder"
                    }, [
                      createVNode("p", null, 'Presiona "Cargar Comentarios" para ver la discusi\xF3n.')
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (showEditModal.value && post.value) {
        _push(`<div class="modal-overlay" data-v-ccc9d141><div class="modal-card" data-v-ccc9d141><h2 class="modal-title" data-v-ccc9d141>Editar Publicaci\xF3n</h2><form data-v-ccc9d141><div class="form-group" data-v-ccc9d141><label for="edit-title" data-v-ccc9d141>T\xEDtulo</label><input${ssrRenderAttr("value", editingPost.value.title)} id="edit-title" type="text" required data-v-ccc9d141></div><div class="form-group" data-v-ccc9d141><label for="edit-body" data-v-ccc9d141>Contenido</label><textarea id="edit-body" rows="6" required data-v-ccc9d141>${ssrInterpolate(editingPost.value.body)}</textarea></div><div class="modal-buttons" data-v-ccc9d141><button type="button" class="btn btn--secondary-outline" data-v-ccc9d141>Cancelar</button><button type="submit" class="btn btn--primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-ccc9d141>${ssrInterpolate(submitting.value ? "Guardando..." : "Guardar")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ccc9d141"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-bffaER3g.mjs.map
