import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { _ as _export_sfc, e as __nuxt_component_1 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
    const { getDocument } = useFirestore();
    const albumId = route.params.id;
    const album = ref(null);
    const loading = ref(false);
    const error = ref("");
    useHead({
      title: "Detalle del \xC1lbum | Firebase Workshop",
      meta: [
        { name: "description", content: "Explora fotos asociadas con este \xE1lbum." }
      ]
    });
    const fetchAlbum = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getDocument("albums", albumId);
        if (!data) {
          error.value = "El \xE1lbum solicitado no existe.";
        } else {
          album.value = data;
        }
      } catch (err) {
        console.error("Error fetching album:", err);
        error.value = "Error al cargar la informaci\xF3n del \xE1lbum de Firestore.";
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "album-detail-page animate-fade-in" }, _attrs))} data-v-225f71f9><div class="back-nav" data-v-225f71f9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/albums",
        class: "btn-back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u2B05\uFE0F Volver a \xC1lbumes`);
          } else {
            return [
              createTextVNode("\u2B05\uFE0F Volver a \xC1lbumes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: !album.value,
        onRefetch: fetchAlbum
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (album.value) {
              _push2(`<div class="album-container" data-v-225f71f9${_scopeId}><header class="album-header" data-v-225f71f9${_scopeId}><div class="album-header-icon" data-v-225f71f9${_scopeId}>\u{1F4C1}</div><div class="album-header-info" data-v-225f71f9${_scopeId}><h1 class="album-title" data-v-225f71f9${_scopeId}>${ssrInterpolate(album.value.title)}</h1><p class="album-meta" data-v-225f71f9${_scopeId}>Creado por Usuario ID: <strong data-v-225f71f9${_scopeId}>${ssrInterpolate(album.value.userId)}</strong></p></div></header>`);
              _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              album.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "album-container"
              }, [
                createVNode("header", { class: "album-header" }, [
                  createVNode("div", { class: "album-header-icon" }, "\u{1F4C1}"),
                  createVNode("div", { class: "album-header-info" }, [
                    createVNode("h1", { class: "album-title" }, toDisplayString(album.value.title), 1),
                    createVNode("p", { class: "album-meta" }, [
                      createTextVNode("Creado por Usuario ID: "),
                      createVNode("strong", null, toDisplayString(album.value.userId), 1)
                    ])
                  ])
                ]),
                createVNode(_component_NuxtPage)
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/albums/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-225f71f9"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-ngA-e5Mu.mjs.map
