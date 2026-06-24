import { ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { a as useFirestore, S as StatusState } from "./StatusState-CW3PuAZY.js";
import { _ as _export_sfc, u as useAuth } from "../server.mjs";
import { where } from "firebase/firestore";
import "firebase/app";
import "firebase/auth";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/ryan/async-await/node_modules/hookable/dist/index.mjs";
import "/home/ryan/async-await/node_modules/unctx/dist/index.mjs";
import "/home/ryan/async-await/node_modules/h3/dist/index.mjs";
import "/home/ryan/async-await/node_modules/radix3/dist/index.mjs";
import "/home/ryan/async-await/node_modules/defu/dist/defu.mjs";
import "/home/ryan/async-await/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "photos",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { getCollection } = useFirestore();
    const { currentUser } = useAuth();
    const albumId = route.params.id;
    const photos2 = ref([]);
    const loading = ref(false);
    const error = ref("");
    const searchQuery = ref("");
    const showAddPhotoModal = ref(false);
    const submitting = ref(false);
    const newPhoto = ref({
      title: "",
      url: ""
    });
    const fetchPhotos = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getCollection("photos", [
          where("albumId", "==", albumId)
        ]);
        photos2.value = data.sort((a, b) => {
          var _a, _b;
          const dateA = ((_a = a.createdAt) == null ? void 0 : _a.seconds) || 0;
          const dateB = ((_b = b.createdAt) == null ? void 0 : _b.seconds) || 0;
          return dateB - dateA;
        });
      } catch (err) {
        console.error("Error fetching photos:", err);
        error.value = "Error al recuperar las fotos del álbum.";
      } finally {
        loading.value = false;
      }
    };
    const filteredPhotos = computed(() => {
      if (!searchQuery.value) return photos2.value;
      const queryText = searchQuery.value.toLowerCase();
      return photos2.value.filter(
        (photo) => {
          var _a;
          return (_a = photo.title) == null ? void 0 : _a.toLowerCase().includes(queryText);
        }
      );
    });
    const handleImgError = (event) => {
      event.target.src = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "photos-nested-view animate-slide-down" }, _attrs))} data-v-ece4f281><div class="photos-controls-row" data-v-ece4f281><h2 class="sub-section-title" data-v-ece4f281>Galería de Fotos</h2>`);
      if (unref(currentUser)) {
        _push(`<button class="btn btn--primary btn--sm" data-v-ece4f281> 📸 Añadir Foto </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="photos-filters" data-v-ece4f281><div class="search-box" data-v-ece4f281><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Buscar foto por título..." class="search-input" data-v-ece4f281></div><div class="stats-badge" data-v-ece4f281><span data-v-ece4f281>Total: <strong data-v-ece4f281>${ssrInterpolate(photos2.value.length)}</strong></span><span class="divider" data-v-ece4f281>|</span><span data-v-ece4f281>Visibles: <strong data-v-ece4f281>${ssrInterpolate(filteredPhotos.value.length)}</strong></span></div></div>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: photos2.value.length === 0,
        onRefetch: fetchPhotos
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(StatusState, {
              loading: false,
              error: "",
              isEmpty: filteredPhotos.value.length === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="photos-grid" data-v-ece4f281${_scopeId2}><!--[-->`);
                  ssrRenderList(filteredPhotos.value, (photo) => {
                    _push3(`<div class="photo-card" data-v-ece4f281${_scopeId2}><div class="photo-img-wrapper" data-v-ece4f281${_scopeId2}><img${ssrRenderAttr("src", photo.url)}${ssrRenderAttr("alt", photo.title)} class="photo-img" data-v-ece4f281${_scopeId2}></div><div class="photo-title-box" data-v-ece4f281${_scopeId2}><p class="photo-title" data-v-ece4f281${_scopeId2}>${ssrInterpolate(photo.title)}</p></div></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "photos-grid" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredPhotos.value, (photo) => {
                        return openBlock(), createBlock("div", {
                          key: photo.id,
                          class: "photo-card"
                        }, [
                          createVNode("div", { class: "photo-img-wrapper" }, [
                            createVNode("img", {
                              src: photo.url,
                              alt: photo.title,
                              class: "photo-img",
                              onError: handleImgError
                            }, null, 40, ["src", "alt"])
                          ]),
                          createVNode("div", { class: "photo-title-box" }, [
                            createVNode("p", { class: "photo-title" }, toDisplayString(photo.title), 1)
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
                isEmpty: filteredPhotos.value.length === 0
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "photos-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredPhotos.value, (photo) => {
                      return openBlock(), createBlock("div", {
                        key: photo.id,
                        class: "photo-card"
                      }, [
                        createVNode("div", { class: "photo-img-wrapper" }, [
                          createVNode("img", {
                            src: photo.url,
                            alt: photo.title,
                            class: "photo-img",
                            onError: handleImgError
                          }, null, 40, ["src", "alt"])
                        ]),
                        createVNode("div", { class: "photo-title-box" }, [
                          createVNode("p", { class: "photo-title" }, toDisplayString(photo.title), 1)
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
      if (showAddPhotoModal.value) {
        _push(`<div class="modal-overlay" data-v-ece4f281><div class="modal-card" data-v-ece4f281><h2 class="modal-title" data-v-ece4f281>Añadir Foto al Álbum</h2><form data-v-ece4f281><div class="form-group" data-v-ece4f281><label for="photo-title-input" data-v-ece4f281>Título de la Foto</label><input${ssrRenderAttr("value", newPhoto.value.title)} id="photo-title-input" type="text" placeholder="Escribe el título descriptivo..." required data-v-ece4f281></div><div class="form-group" data-v-ece4f281><label for="photo-url-input" data-v-ece4f281>URL de la Imagen (Opcional)</label><input${ssrRenderAttr("value", newPhoto.value.url)} id="photo-url-input" type="url" placeholder="https://ejemplo.com/imagen.jpg (En blanco para aleatoria)" data-v-ece4f281></div><div class="modal-buttons" data-v-ece4f281><button type="button" class="btn btn--secondary-outline" data-v-ece4f281>Cancelar</button><button type="submit" class="btn btn--primary"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-ece4f281>${ssrInterpolate(submitting.value ? "Añadiendo..." : "Añadir Foto")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/albums/[id]/photos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const photos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ece4f281"]]);
export {
  photos as default
};
//# sourceMappingURL=photos-DnNKO1Y1.js.map
