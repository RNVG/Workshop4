import { _ as __nuxt_component_0 } from "./nuxt-link-AZIIwCjv.js";
import { mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext, readonly, ref } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { u as useAuth, _ as _export_sfc } from "../server.mjs";
import "/home/ryan/async-await/node_modules/hookable/dist/index.mjs";
import "/home/ryan/async-await/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/ryan/async-await/node_modules/unctx/dist/index.mjs";
import "/home/ryan/async-await/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/ryan/async-await/node_modules/radix3/dist/index.mjs";
import "/home/ryan/async-await/node_modules/defu/dist/defu.mjs";
import "firebase/auth";
import "firebase/firestore";
import "firebase/app";
const _sfc_main$2 = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentUser, initializing } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "app-header" }, _attrs))}><div class="header-container">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "app-header__logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="logo-accent"${_scopeId}>Nuxt</span>Firebase `);
          } else {
            return [
              createVNode("span", { class: "logo-accent" }, "Nuxt"),
              createTextVNode("Firebase ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="app-header__nav">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Inicio`);
          } else {
            return [
              createTextVNode("Inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/posts" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Posts`);
          } else {
            return [
              createTextVNode("Posts")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/albums" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Álbumes`);
          } else {
            return [
              createTextVNode("Álbumes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/users" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Usuarios`);
          } else {
            return [
              createTextVNode("Usuarios")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(currentUser)) {
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/todos" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Mis Tareas`);
            } else {
              return [
                createTextVNode("Mis Tareas")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="app-header__auth">`);
      if (unref(currentUser)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "user-profile-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", unref(currentUser).photoURL || "/placeholder-avatar.png")} alt="Avatar" class="user-avatar"${_scopeId}><span class="user-name"${_scopeId}>${ssrInterpolate(unref(currentUser).name.split(" ")[0])}</span>`);
            } else {
              return [
                createVNode("img", {
                  src: unref(currentUser).photoURL || "/placeholder-avatar.png",
                  alt: "Avatar",
                  class: "user-avatar"
                }, null, 8, ["src"]),
                createVNode("span", { class: "user-name" }, toDisplayString(unref(currentUser).name.split(" ")[0]), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="btn-logout">Cerrar Sesión</button><!--]-->`);
      } else if (!unref(initializing)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "btn-login"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Iniciar Sesión`);
            } else {
              return [
                createTextVNode("Iniciar Sesión")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></header>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const toasts = ref([]);
function useToast() {
  const mostrarToast = (mensaje, tipo = "info", duracion = 3e3) => {
    const id = Date.now();
    const toast = {
      id,
      mensaje,
      tipo,
      // 'success', 'error', 'info'
      duracion
    };
    toasts.value.push(toast);
    if (duracion > 0) {
      setTimeout(() => {
        eliminarToast(id);
      }, duracion);
    }
    return id;
  };
  const eliminarToast = (id) => {
    const indice = toasts.value.findIndex((t) => t.id === id);
    if (indice !== -1) {
      toasts.value.splice(indice, 1);
    }
  };
  return {
    toasts: readonly(toasts),
    mostrarToast,
    eliminarToast
  };
}
const _sfc_main$1 = {
  __name: "ToastNotification",
  __ssrInlineRender: true,
  setup(__props) {
    const { toasts: toasts2 } = useToast();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(toasts2).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "toast-container" }, _attrs))} data-v-42f34e0c><!--[-->`);
        ssrRenderList(unref(toasts2), (toast) => {
          _push(`<div class="${ssrRenderClass(["toast", `toast--${toast.tipo}`])}" data-v-42f34e0c><span data-v-42f34e0c>${ssrInterpolate(toast.mensaje)}</span><button class="toast__close" aria-label="Cerrar notificación" data-v-42f34e0c> ✕ </button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ToastNotification.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-42f34e0c"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = _sfc_main$2;
  const _component_ToastNotification = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_ToastNotification, null, null, _parent));
  _push(`<main class="app__container">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main><footer class="app__footer"><p>© 2026 Nuxt + Firebase Workshop. Todos los derechos reservados.</p></footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-Bca1HXA8.js.map
