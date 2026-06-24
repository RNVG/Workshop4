import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { _ as _export_sfc, e as __nuxt_component_1 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
    useRouter();
    const { getDocument } = useFirestore();
    const userId = route.params.id;
    const user = ref(null);
    const loading = ref(false);
    const error = ref("");
    useHead({
      title: "Perfil de Usuario | Firebase Workshop",
      meta: [
        { name: "description", content: "Detalle de posts, \xE1lbumes y tareas de un usuario en Firestore." }
      ]
    });
    const fetchUser = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await getDocument("users", userId);
        if (!data) {
          error.value = "El usuario solicitado no existe.";
        } else {
          user.value = data;
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        error.value = "Error al cargar el perfil del usuario.";
      } finally {
        loading.value = false;
      }
    };
    const handleAvatarError = (event) => {
      event.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "user-profile-page animate-fade-in" }, _attrs))} data-v-a330f505><div class="back-nav" data-v-a330f505>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/users",
        class: "btn-back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u2B05\uFE0F Volver a Usuarios`);
          } else {
            return [
              createTextVNode("\u2B05\uFE0F Volver a Usuarios")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loading.value,
        error: error.value,
        isEmpty: !user.value,
        onRefetch: fetchUser
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (user.value) {
              _push2(`<div class="profile-layout" data-v-a330f505${_scopeId}><div class="profile-card" data-v-a330f505${_scopeId}><img${ssrRenderAttr("src", user.value.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150")} alt="Avatar" class="profile-card__avatar" data-v-a330f505${_scopeId}><div class="profile-card__info" data-v-a330f505${_scopeId}><h1 class="profile-card__name" data-v-a330f505${_scopeId}>${ssrInterpolate(user.value.name)}</h1><p class="profile-card__email" data-v-a330f505${_scopeId}>\u2709\uFE0F ${ssrInterpolate(user.value.email)}</p><span class="user-badge" data-v-a330f505${_scopeId}>ID: ${ssrInterpolate(user.value.uid || user.value.id)}</span></div></div><nav class="profile-tabs" data-v-a330f505${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/users/${unref(userId)}/posts`,
                class: "tab-link",
                "active-class": "tab-link--active"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u{1F4DD} Posts del Usuario `);
                  } else {
                    return [
                      createTextVNode(" \u{1F4DD} Posts del Usuario ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/users/${unref(userId)}/albums`,
                class: "tab-link",
                "active-class": "tab-link--active"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u{1F3A8} \xC1lbumes `);
                  } else {
                    return [
                      createTextVNode(" \u{1F3A8} \xC1lbumes ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/users/${unref(userId)}/todos`,
                class: "tab-link",
                "active-class": "tab-link--active"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u2705 Tareas (Todos) `);
                  } else {
                    return [
                      createTextVNode(" \u2705 Tareas (Todos) ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</nav><div class="profile-tab-content" data-v-a330f505${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              user.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "profile-layout"
              }, [
                createVNode("div", { class: "profile-card" }, [
                  createVNode("img", {
                    src: user.value.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
                    alt: "Avatar",
                    class: "profile-card__avatar",
                    onError: handleAvatarError
                  }, null, 40, ["src"]),
                  createVNode("div", { class: "profile-card__info" }, [
                    createVNode("h1", { class: "profile-card__name" }, toDisplayString(user.value.name), 1),
                    createVNode("p", { class: "profile-card__email" }, "\u2709\uFE0F " + toDisplayString(user.value.email), 1),
                    createVNode("span", { class: "user-badge" }, "ID: " + toDisplayString(user.value.uid || user.value.id), 1)
                  ])
                ]),
                createVNode("nav", { class: "profile-tabs" }, [
                  createVNode(_component_NuxtLink, {
                    to: `/users/${unref(userId)}/posts`,
                    class: "tab-link",
                    "active-class": "tab-link--active"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u{1F4DD} Posts del Usuario ")
                    ]),
                    _: 1
                  }, 8, ["to"]),
                  createVNode(_component_NuxtLink, {
                    to: `/users/${unref(userId)}/albums`,
                    class: "tab-link",
                    "active-class": "tab-link--active"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u{1F3A8} \xC1lbumes ")
                    ]),
                    _: 1
                  }, 8, ["to"]),
                  createVNode(_component_NuxtLink, {
                    to: `/users/${unref(userId)}/todos`,
                    class: "tab-link",
                    "active-class": "tab-link--active"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u2705 Tareas (Todos) ")
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                createVNode("div", { class: "profile-tab-content" }, [
                  createVNode(_component_NuxtPage)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a330f505"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Xt2OrbFY.mjs.map
