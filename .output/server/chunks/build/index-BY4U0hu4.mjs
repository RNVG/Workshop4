import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
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
      title: "\xC1lbumes | Firebase + Nuxt Workshop",
      meta: [
        { name: "description", content: "Explora y crea \xE1lbumes de fotos." }
      ]
    });
    const { getCollection } = useFirestore();
    const { currentUser } = useAuth();
    const albums = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const showCreateModal = ref(false);
    const submitting = ref(false);
    const newAlbumTitle = ref("");
    const fetchAlbums = async () => {
      loading.value = true;
      error.value = "";
      try {
        const rawAlbums = await getCollection("albums");
        albums.value = rawAlbums.sort((a, b) => {
          var _a, _b;
          const dateA = ((_a = a.createdAt) == null ? void 0 : _a.seconds) || 0;
          const dateB = ((_b = b.createdAt) == null ? void 0 : _b.seconds) || 0;
          return dateB - dateA;
        });
      } catch (err) {
        console.error("Error fetching albums:", err);
        error.value = "No se pudieron recuperar los \xE1lbumes de Firestore.";
      } finally {
        loading.value = false;
      }
    };
    const filteredAlbums = computed(() => {
      if (!searchQuery.value) return albums.value;
      const queryText = searchQuery.value.toLowerCase();
      return albums.value.filter(
        (album) => {
          var _a;
          return (_a = album.title) == null ? void 0 : _a.toLowerCase().includes(queryText);
        }
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "albums-page animate-fade-in" }, _attrs))} data-v-73cac4e0><div class="page-header" data-v-73cac4e0><div data-v-73cac4e0><h1 class="page-title" data-v-73cac4e0>\xC1lbumes de Fotos</h1><p class="page-subtitle" data-v-73cac4e0>Organiza y visualiza galer\xEDas fotogr\xE1ficas.</p></div>`);
      if (unref(currentUser)) {
        _push(`<button class="btn btn--primary" data-v-73cac4e0> \u2795 Crear \xC1lbum </button>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "btn btn--secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F511} Inicia sesi\xF3n para crear \xE1lbumes `);
            } else {
              return [
                createTextVNode(" \u{1F511} Inicia sesi\xF3n para crear \xE1lbumes ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div><div class="filter-panel" data-v-73cac4e0><div class="search-input-wrapper" data-v-73cac4e0><span class="search-icon" data-v-73cac4e0>\u{1F50D}</span><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Buscar \xE1lbum por t\xEDtulo..." class="search-input" data-v-73cac4e0></div><div class="indicators" data-v-73cac4e0><span class="badge badge--info" data-v-73cac4e0>Total: ${ssrInterpolate(albums.value.length)}</span><span class="badge badge--success" data-v-73cac4e0>Visibles: ${ssrInterpolate(filteredAlbums.value.length)}</span></div></div>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: albums.value.length === 0,
        onRefetch: fetchAlbums
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(StatusState, {
              loading: false,
              error: "",
              isEmpty: filteredAlbums.value.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="albums-grid" data-v-73cac4e0${_scopeId2}><!--[-->`);
                  ssrRenderList(filteredAlbums.value, (album) => {
                    _push3(`<div class="album-card" data-v-73cac4e0${_scopeId2}><div class="album-card__cover" data-v-73cac4e0${_scopeId2}><span class="cover-icon" data-v-73cac4e0${_scopeId2}>\u{1F5BC}\uFE0F</span></div><div class="album-card__body" data-v-73cac4e0${_scopeId2}><h3 class="album-card__title" data-v-73cac4e0${_scopeId2}>${ssrInterpolate(album.title)}</h3><p class="album-card__owner" data-v-73cac4e0${_scopeId2}>Propietario ID: ${ssrInterpolate(album.userId)}</p>`);
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: `/albums/${album.id}/photos`,
                      class: "btn-view-photos"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Ver Fotos \u2794 `);
                        } else {
                          return [
                            createTextVNode(" Ver Fotos \u2794 ")
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
                    createVNode("div", { class: "albums-grid" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredAlbums.value, (album) => {
                        return openBlock(), createBlock("div", {
                          key: album.id,
                          class: "album-card"
                        }, [
                          createVNode("div", { class: "album-card__cover" }, [
                            createVNode("span", { class: "cover-icon" }, "\u{1F5BC}\uFE0F")
                          ]),
                          createVNode("div", { class: "album-card__body" }, [
                            createVNode("h3", { class: "album-card__title" }, toDisplayString(album.title), 1),
                            createVNode("p", { class: "album-card__owner" }, "Propietario ID: " + toDisplayString(album.userId), 1),
                            createVNode(_component_NuxtLink, {
                              to: `/albums/${album.id}/photos`,
                              class: "btn-view-photos"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ver Fotos \u2794 ")
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
                isEmpty: filteredAlbums.value.length === 0
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "albums-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredAlbums.value, (album) => {
                      return openBlock(), createBlock("div", {
                        key: album.id,
                        class: "album-card"
                      }, [
                        createVNode("div", { class: "album-card__cover" }, [
                          createVNode("span", { class: "cover-icon" }, "\u{1F5BC}\uFE0F")
                        ]),
                        createVNode("div", { class: "album-card__body" }, [
                          createVNode("h3", { class: "album-card__title" }, toDisplayString(album.title), 1),
                          createVNode("p", { class: "album-card__owner" }, "Propietario ID: " + toDisplayString(album.userId), 1),
                          createVNode(_component_NuxtLink, {
                            to: `/albums/${album.id}/photos`,
                            class: "btn-view-photos"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ver Fotos \u2794 ")
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
      if (showCreateModal.value) {
        _push(`<div class="modal-overlay" data-v-73cac4e0><div class="modal-card" data-v-73cac4e0><h2 class="modal-title" data-v-73cac4e0>Nuevo \xC1lbum</h2><form data-v-73cac4e0><div class="form-group" data-v-73cac4e0><label for="album-title" data-v-73cac4e0>T\xEDtulo del \xC1lbum</label><input${ssrRenderAttr("value", newAlbumTitle.value)} id="album-title" type="text" placeholder="Escribe el nombre del \xE1lbum..." required data-v-73cac4e0></div><div class="modal-buttons" data-v-73cac4e0><button type="button" class="btn btn--secondary-outline" data-v-73cac4e0>Cancelar</button><button type="submit" class="btn btn--primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-73cac4e0>${ssrInterpolate(submitting.value ? "Creando..." : "Crear \xC1lbum")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/albums/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-73cac4e0"]]);

export { index as default };
//# sourceMappingURL=index-BY4U0hu4.mjs.map
