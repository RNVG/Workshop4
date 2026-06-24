import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { ref, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useFirestore, S as StatusState } from './StatusState-CW3PuAZY.mjs';
import { where } from 'firebase/firestore';
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
import 'firebase/auth';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "posts",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { getCollection } = useFirestore();
    const userId = route.params.id;
    const posts2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const fetchUserPosts = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getCollection("posts", [
          where("userId", "==", userId)
        ]);
        posts2.value = data.sort((a, b) => {
          var _a, _b;
          const dateA = ((_a = a.createdAt) == null ? void 0 : _a.seconds) || 0;
          const dateB = ((_b = b.createdAt) == null ? void 0 : _b.seconds) || 0;
          return dateB - dateA;
        });
      } catch (err) {
        console.error("Error fetching user posts:", err);
        error.value = "No se pudieron recuperar las publicaciones del usuario.";
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "user-posts-nested animate-slide-down" }, _attrs))} data-v-e6470c67>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: posts2.value.length === 0,
        onRefetch: fetchUserPosts
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="nested-posts-list" data-v-e6470c67${_scopeId}><!--[-->`);
            ssrRenderList(posts2.value, (post) => {
              _push2(`<div class="nested-post-card" data-v-e6470c67${_scopeId}><h3 class="nested-post-card__title" data-v-e6470c67${_scopeId}>${ssrInterpolate(post.title)}</h3><p class="nested-post-card__body" data-v-e6470c67${_scopeId}>${ssrInterpolate(post.body)}</p>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/posts/${post.id}`,
                class: "btn-read-more"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Leer m\xE1s \u2794 `);
                  } else {
                    return [
                      createTextVNode(" Leer m\xE1s \u2794 ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "nested-posts-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(posts2.value, (post) => {
                  return openBlock(), createBlock("div", {
                    key: post.id,
                    class: "nested-post-card"
                  }, [
                    createVNode("h3", { class: "nested-post-card__title" }, toDisplayString(post.title), 1),
                    createVNode("p", { class: "nested-post-card__body" }, toDisplayString(post.body), 1),
                    createVNode(_component_NuxtLink, {
                      to: `/posts/${post.id}`,
                      class: "btn-read-more"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Leer m\xE1s \u2794 ")
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/[id]/posts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const posts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e6470c67"]]);

export { posts as default };
//# sourceMappingURL=posts-BR66plfw.mjs.map
