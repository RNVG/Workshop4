import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useFirestore, S as StatusState } from './StatusState-CW3PuAZY.mjs';
import { _ as _export_sfc, u as useAuth } from './server.mjs';
import { where } from 'firebase/firestore';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'firebase/auth';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "comments",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { getCollection } = useFirestore();
    const { currentUser } = useAuth();
    const postId = route.params.id;
    const comments2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const submitting = ref(false);
    const newComment = ref({
      name: "",
      body: ""
    });
    const fetchComments = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getCollection("comments", [
          where("postId", "==", postId)
        ]);
        comments2.value = data.sort((a, b) => {
          var _a, _b;
          const dateA = ((_a = a.createdAt) == null ? void 0 : _a.seconds) || 0;
          const dateB = ((_b = b.createdAt) == null ? void 0 : _b.seconds) || 0;
          return dateB - dateA;
        });
      } catch (err) {
        console.error("Error fetching comments:", err);
        error.value = "No se pudieron cargar los comentarios.";
      } finally {
        loading.value = false;
      }
    };
    const filteredComments = computed(() => {
      if (!searchQuery.value) return comments2.value;
      const queryText = searchQuery.value.toLowerCase();
      return comments2.value.filter(
        (comment) => {
          var _a, _b;
          return ((_a = comment.body) == null ? void 0 : _a.toLowerCase().includes(queryText)) || ((_b = comment.name) == null ? void 0 : _b.toLowerCase().includes(queryText));
        }
      );
    });
    const formatDate = (timestamp) => {
      if (!timestamp) return "";
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comments-nested-view animate-slide-down" }, _attrs))} data-v-4b5be49a><div class="comments-controls" data-v-4b5be49a><div class="search-box" data-v-4b5be49a><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Buscar comentario por contenido..." class="search-input" data-v-4b5be49a></div><div class="stats-badge" data-v-4b5be49a><span data-v-4b5be49a>Total: <strong data-v-4b5be49a>${ssrInterpolate(comments2.value.length)}</strong></span><span class="divider" data-v-4b5be49a>|</span><span data-v-4b5be49a>Visibles: <strong data-v-4b5be49a>${ssrInterpolate(filteredComments.value.length)}</strong></span></div></div><div class="add-comment-form" data-v-4b5be49a><h3 data-v-4b5be49a>Deja tu comentario</h3>`);
      if (unref(currentUser)) {
        _push(`<form class="comment-input-group" data-v-4b5be49a><input${ssrRenderAttr("value", newComment.value.name)} type="text" placeholder="Asunto / Tu Nombre..." required class="form-input" data-v-4b5be49a><textarea placeholder="Escribe tu comentario aqu\xED..." required rows="3" class="form-textarea" data-v-4b5be49a>${ssrInterpolate(newComment.value.body)}</textarea><button type="submit" class="btn btn--primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-4b5be49a>${ssrInterpolate(submitting.value ? "Enviando..." : "Comentar \u{1F680}")}</button></form>`);
      } else {
        _push(`<div class="login-prompt" data-v-4b5be49a><p data-v-4b5be49a>Debes iniciar sesi\xF3n para comentar en este post.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "btn btn--secondary-outline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u{1F511} Iniciar Sesi\xF3n`);
            } else {
              return [
                createTextVNode("\u{1F511} Iniciar Sesi\xF3n")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: comments2.value.length === 0,
        onRefetch: fetchComments
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(StatusState, {
              loading: false,
              error: "",
              isEmpty: filteredComments.value.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="comments-list" data-v-4b5be49a${_scopeId2}><!--[-->`);
                  ssrRenderList(filteredComments.value, (comment) => {
                    var _a;
                    _push3(`<div class="comment-item" data-v-4b5be49a${_scopeId2}><div class="comment-avatar" data-v-4b5be49a${_scopeId2}>${ssrInterpolate(((_a = comment.name) == null ? void 0 : _a.charAt(0).toUpperCase()) || "\u{1F464}")}</div><div class="comment-content" data-v-4b5be49a${_scopeId2}><h4 class="comment-author" data-v-4b5be49a${_scopeId2}>${ssrInterpolate(comment.name)}</h4><p class="comment-text" data-v-4b5be49a${_scopeId2}>${ssrInterpolate(comment.body)}</p>`);
                    if (comment.createdAt) {
                      _push3(`<span class="comment-date" data-v-4b5be49a${_scopeId2}>${ssrInterpolate(formatDate(comment.createdAt))}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "comments-list" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredComments.value, (comment) => {
                        var _a;
                        return openBlock(), createBlock("div", {
                          key: comment.id,
                          class: "comment-item"
                        }, [
                          createVNode("div", { class: "comment-avatar" }, toDisplayString(((_a = comment.name) == null ? void 0 : _a.charAt(0).toUpperCase()) || "\u{1F464}"), 1),
                          createVNode("div", { class: "comment-content" }, [
                            createVNode("h4", { class: "comment-author" }, toDisplayString(comment.name), 1),
                            createVNode("p", { class: "comment-text" }, toDisplayString(comment.body), 1),
                            comment.createdAt ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "comment-date"
                            }, toDisplayString(formatDate(comment.createdAt)), 1)) : createCommentVNode("", true)
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
                isEmpty: filteredComments.value.length === 0
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "comments-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredComments.value, (comment) => {
                      var _a;
                      return openBlock(), createBlock("div", {
                        key: comment.id,
                        class: "comment-item"
                      }, [
                        createVNode("div", { class: "comment-avatar" }, toDisplayString(((_a = comment.name) == null ? void 0 : _a.charAt(0).toUpperCase()) || "\u{1F464}"), 1),
                        createVNode("div", { class: "comment-content" }, [
                          createVNode("h4", { class: "comment-author" }, toDisplayString(comment.name), 1),
                          createVNode("p", { class: "comment-text" }, toDisplayString(comment.body), 1),
                          comment.createdAt ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "comment-date"
                          }, toDisplayString(formatDate(comment.createdAt)), 1)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/[id]/comments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comments = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4b5be49a"]]);

export { comments as default };
//# sourceMappingURL=comments-DvuDPycv.mjs.map
