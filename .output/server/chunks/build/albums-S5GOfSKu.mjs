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
  __name: "albums",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { getCollection } = useFirestore();
    const userId = route.params.id;
    const albums2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const fetchUserAlbums = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getCollection("albums", [
          where("userId", "==", userId)
        ]);
        albums2.value = data;
      } catch (err) {
        console.error("Error fetching user albums:", err);
        error.value = "No se pudieron recuperar los \xE1lbumes del usuario.";
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "user-albums-nested animate-slide-down" }, _attrs))} data-v-9e1d2b95>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: albums2.value.length === 0,
        onRefetch: fetchUserAlbums
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="nested-albums-list" data-v-9e1d2b95${_scopeId}><!--[-->`);
            ssrRenderList(albums2.value, (album) => {
              _push2(`<div class="nested-album-card" data-v-9e1d2b95${_scopeId}><div class="album-icon" data-v-9e1d2b95${_scopeId}>\u{1F3A8}</div><div class="album-details" data-v-9e1d2b95${_scopeId}><h3 class="album-title" data-v-9e1d2b95${_scopeId}>${ssrInterpolate(album.title)}</h3>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/albums/${album.id}/photos`,
                class: "btn-link"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Ver fotos de este \xE1lbum \u2794 `);
                  } else {
                    return [
                      createTextVNode(" Ver fotos de este \xE1lbum \u2794 ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "nested-albums-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(albums2.value, (album) => {
                  return openBlock(), createBlock("div", {
                    key: album.id,
                    class: "nested-album-card"
                  }, [
                    createVNode("div", { class: "album-icon" }, "\u{1F3A8}"),
                    createVNode("div", { class: "album-details" }, [
                      createVNode("h3", { class: "album-title" }, toDisplayString(album.title), 1),
                      createVNode(_component_NuxtLink, {
                        to: `/albums/${album.id}/photos`,
                        class: "btn-link"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Ver fotos de este \xE1lbum \u2794 ")
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
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/[id]/albums.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const albums = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9e1d2b95"]]);

export { albums as default };
//# sourceMappingURL=albums-S5GOfSKu.mjs.map
