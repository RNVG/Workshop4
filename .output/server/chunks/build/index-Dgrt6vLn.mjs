import { _ as __nuxt_component_0 } from './nuxt-link-AZIIwCjv.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useFirestore, S as StatusState, a as useFirebase } from './StatusState-CW3PuAZY.mjs';
import { writeBatch, doc, collection, query, limit, getDocs } from 'firebase/firestore';
import { u as useHead } from './v3-oCCdC-ym.mjs';
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
import 'vue-router';

const seeding = ref(false);
const seedMessage = ref("");
function useSeed() {
  const { firestore } = useFirebase();
  const isCollectionEmpty = async (name) => {
    if (!firestore) return true;
    const colRef = collection(firestore, name);
    const q = query(colRef, limit(1));
    const snapshot = await getDocs(q);
    return snapshot.empty;
  };
  const seedDatabase = async () => {
    if (!firestore || seeding.value) return;
    seeding.value = true;
    seedMessage.value = "Verificando colecciones...";
    try {
      const mockUsers = [
        { uid: "user_1", name: "Leanne Graham", email: "Sincere@april.biz", photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
        { uid: "user_2", name: "Ervin Howell", email: "Shanna@melissa.tv", photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
        { uid: "user_3", name: "Clementine Bauch", email: "Nathan@yesenia.net", photoURL: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150" }
      ];
      const mockPosts = [
        { id: "post_1", userId: "user_1", title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" },
        { id: "post_2", userId: "user_1", title: "qui est esse", body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla" },
        { id: "post_3", userId: "user_2", title: "ea molestias quasi exercitationem repellat qui ipsa sit aut", body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut" },
        { id: "post_4", userId: "user_2", title: "eum et est occaecati", body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit" },
        { id: "post_5", userId: "user_3", title: "nesciunt quas odio", body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque" }
      ];
      const mockComments = [
        { id: "comment_1", postId: "post_1", name: "id labore ex et quam laborum", body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium" },
        { id: "comment_2", postId: "post_1", name: "quo vero reiciendis velit similique earum", body: "est natus enim nihil est dolore omnis avoluptas assumenda\naestique expedita quas enim ipsam\nut architecto provident quas ut" },
        { id: "comment_3", postId: "post_2", name: "odio adipisci rerum aut animi", body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione" },
        { id: "comment_4", postId: "post_3", name: "alias odio sit", body: "non et expedita molestiae sint sed\nsoluta temporibus porro a\nest qui qui omnis a qui ut\nerrores dolores animi quis" }
      ];
      const mockAlbums = [
        { id: "album_1", userId: "user_1", title: "quidem molestiae enim" },
        { id: "album_2", userId: "user_2", title: "sunt qui ipsam debitis sequi" },
        { id: "album_3", userId: "user_3", title: "omnis laborum odio" }
      ];
      const mockPhotos = [
        { id: "photo_1", albumId: "album_1", title: "accusamus beatae ad facilis cum similique qui sunt", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600" },
        { id: "photo_2", albumId: "album_1", title: "reprehenderit est deserunt velit ipsam", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600" },
        { id: "photo_3", albumId: "album_2", title: "officia porro iure quia iusto qui ipsa ut modi", url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600" },
        { id: "photo_4", albumId: "album_3", title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600" }
      ];
      const mockTodos = [
        { id: "todo_1", userId: "user_1", title: "delectus aut autem", completed: false },
        { id: "todo_2", userId: "user_1", title: "quis ut nam facilis et officia qui", completed: true },
        { id: "todo_3", userId: "user_2", title: "fugiat veniam minus", completed: false },
        { id: "todo_4", userId: "user_2", title: "et porro tempora", completed: true },
        { id: "todo_5", userId: "user_3", title: "laboriosam mollitia et enim quasi adipisci quia provident illum", completed: false }
      ];
      if (await isCollectionEmpty("users")) {
        seedMessage.value = "Sembrando usuarios...";
        const batch = writeBatch(firestore);
        mockUsers.forEach((user) => {
          const userRef = doc(firestore, "users", user.uid);
          batch.set(userRef, user);
        });
        await batch.commit();
      }
      if (await isCollectionEmpty("posts")) {
        seedMessage.value = "Sembrando posts...";
        const batch = writeBatch(firestore);
        mockPosts.forEach((post) => {
          const postRef = doc(firestore, "posts", post.id);
          batch.set(postRef, {
            userId: post.userId,
            title: post.title,
            body: post.body,
            createdAt: /* @__PURE__ */ new Date()
          });
        });
        await batch.commit();
      }
      if (await isCollectionEmpty("comments")) {
        seedMessage.value = "Sembrando comentarios...";
        const batch = writeBatch(firestore);
        mockComments.forEach((comment) => {
          const commentRef = doc(firestore, "comments", comment.id);
          batch.set(commentRef, {
            postId: comment.postId,
            name: comment.name,
            body: comment.body,
            createdAt: /* @__PURE__ */ new Date()
          });
        });
        await batch.commit();
      }
      if (await isCollectionEmpty("albums")) {
        seedMessage.value = "Sembrando \xE1lbumes...";
        const batch = writeBatch(firestore);
        mockAlbums.forEach((album) => {
          const albumRef = doc(firestore, "albums", album.id);
          batch.set(albumRef, {
            userId: album.userId,
            title: album.title,
            createdAt: /* @__PURE__ */ new Date()
          });
        });
        await batch.commit();
      }
      if (await isCollectionEmpty("photos")) {
        seedMessage.value = "Sembrando fotos...";
        const batch = writeBatch(firestore);
        mockPhotos.forEach((photo) => {
          const photoRef = doc(firestore, "photos", photo.id);
          batch.set(photoRef, {
            albumId: photo.albumId,
            title: photo.title,
            url: photo.url,
            createdAt: /* @__PURE__ */ new Date()
          });
        });
        await batch.commit();
      }
      if (await isCollectionEmpty("todos")) {
        seedMessage.value = "Sembrando tareas (todos)...";
        const batch = writeBatch(firestore);
        mockTodos.forEach((todo) => {
          const todoRef = doc(firestore, "todos", todo.id);
          batch.set(todoRef, {
            userId: todo.userId,
            title: todo.title,
            completed: todo.completed,
            createdAt: /* @__PURE__ */ new Date()
          });
        });
        await batch.commit();
      }
      seedMessage.value = "Sembrado completado con \xE9xito.";
    } catch (err) {
      console.error("Error al sembrar base de datos:", err);
      seedMessage.value = `Error al sembrar: ${err.message || err}`;
    } finally {
      seeding.value = false;
    }
  };
  return {
    seeding,
    seedMessage,
    seedDatabase
  };
}
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Dashboard | Firebase + Nuxt Workshop",
      meta: [
        { name: "description", content: "Dashboard interactivo de estad\xEDsticas de Firebase y Firestore." }
      ]
    });
    const { getCollection } = useFirestore();
    const { seeding: seeding2, seedMessage: seedMessage2 } = useSeed();
    const stats = ref({
      posts: 0,
      albums: 0,
      comments: 0,
      todos: 0
    });
    const loadingStats = ref(false);
    const errorStats = ref("");
    const fetchStats = async () => {
      loadingStats.value = true;
      errorStats.value = "";
      try {
        const [posts, albums, comments, todos] = await Promise.all([
          getCollection("posts"),
          getCollection("albums"),
          getCollection("comments"),
          getCollection("todos")
        ]);
        const completedTodos = todos.filter((t) => t.completed === true);
        stats.value = {
          posts: posts.length,
          albums: albums.length,
          comments: comments.length,
          todos: completedTodos.length
        };
      } catch (error) {
        console.error("Error al cargar estad\xEDsticas:", error);
        errorStats.value = "Error al consultar las colecciones de Firestore.";
      } finally {
        loadingStats.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-page animate-fade-in" }, _attrs))} data-v-28aba1a3><header class="dashboard-hero" data-v-28aba1a3><h1 class="hero-title" data-v-28aba1a3>Workshop Firebase + Firestore</h1><p class="hero-subtitle" data-v-28aba1a3> Una migraci\xF3n completa desde APIs REST hacia un backend en tiempo real con Nuxt 3. </p><div class="seeder-box" data-v-28aba1a3><p class="seeder-text" data-v-28aba1a3> \xBFLa base de datos est\xE1 vac\xEDa? Siembra datos de prueba en Firestore para empezar. </p><button class="btn btn--primary"${ssrIncludeBooleanAttr(unref(seeding2)) ? " disabled" : ""} data-v-28aba1a3>${ssrInterpolate(unref(seeding2) ? "Sembrando..." : "\u2699\uFE0F Sembrar Datos de Prueba")}</button>`);
      if (unref(seedMessage2)) {
        _push(`<p class="seed-message" data-v-28aba1a3>${ssrInterpolate(unref(seedMessage2))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><section class="stats-section" data-v-28aba1a3><h2 class="section-title" data-v-28aba1a3>Estad\xEDsticas del Servidor (Firestore)</h2>`);
      _push(ssrRenderComponent(StatusState, {
        loading: loadingStats.value,
        error: errorStats.value,
        isEmpty: false,
        onRefetch: fetchStats
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="stats-grid" data-v-28aba1a3${_scopeId}><div class="stat-card" data-v-28aba1a3${_scopeId}><span class="stat-icon" data-v-28aba1a3${_scopeId}>\u{1F4DD}</span><div class="stat-info" data-v-28aba1a3${_scopeId}><span class="stat-value" data-v-28aba1a3${_scopeId}>${ssrInterpolate(stats.value.posts)}</span><span class="stat-label" data-v-28aba1a3${_scopeId}>Posts Creados</span></div></div><div class="stat-card" data-v-28aba1a3${_scopeId}><span class="stat-icon" data-v-28aba1a3${_scopeId}>\u{1F3A8}</span><div class="stat-info" data-v-28aba1a3${_scopeId}><span class="stat-value" data-v-28aba1a3${_scopeId}>${ssrInterpolate(stats.value.albums)}</span><span class="stat-label" data-v-28aba1a3${_scopeId}>\xC1lbumes</span></div></div><div class="stat-card" data-v-28aba1a3${_scopeId}><span class="stat-icon" data-v-28aba1a3${_scopeId}>\u{1F4AC}</span><div class="stat-info" data-v-28aba1a3${_scopeId}><span class="stat-value" data-v-28aba1a3${_scopeId}>${ssrInterpolate(stats.value.comments)}</span><span class="stat-label" data-v-28aba1a3${_scopeId}>Comentarios</span></div></div><div class="stat-card" data-v-28aba1a3${_scopeId}><span class="stat-icon" data-v-28aba1a3${_scopeId}>\u2705</span><div class="stat-info" data-v-28aba1a3${_scopeId}><span class="stat-value" data-v-28aba1a3${_scopeId}>${ssrInterpolate(stats.value.todos)}</span><span class="stat-label" data-v-28aba1a3${_scopeId}>Tareas Listas</span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "stats-grid" }, [
                createVNode("div", { class: "stat-card" }, [
                  createVNode("span", { class: "stat-icon" }, "\u{1F4DD}"),
                  createVNode("div", { class: "stat-info" }, [
                    createVNode("span", { class: "stat-value" }, toDisplayString(stats.value.posts), 1),
                    createVNode("span", { class: "stat-label" }, "Posts Creados")
                  ])
                ]),
                createVNode("div", { class: "stat-card" }, [
                  createVNode("span", { class: "stat-icon" }, "\u{1F3A8}"),
                  createVNode("div", { class: "stat-info" }, [
                    createVNode("span", { class: "stat-value" }, toDisplayString(stats.value.albums), 1),
                    createVNode("span", { class: "stat-label" }, "\xC1lbumes")
                  ])
                ]),
                createVNode("div", { class: "stat-card" }, [
                  createVNode("span", { class: "stat-icon" }, "\u{1F4AC}"),
                  createVNode("div", { class: "stat-info" }, [
                    createVNode("span", { class: "stat-value" }, toDisplayString(stats.value.comments), 1),
                    createVNode("span", { class: "stat-label" }, "Comentarios")
                  ])
                ]),
                createVNode("div", { class: "stat-card" }, [
                  createVNode("span", { class: "stat-icon" }, "\u2705"),
                  createVNode("div", { class: "stat-info" }, [
                    createVNode("span", { class: "stat-value" }, toDisplayString(stats.value.todos), 1),
                    createVNode("span", { class: "stat-label" }, "Tareas Listas")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="navigation-section" data-v-28aba1a3><h2 class="section-title" data-v-28aba1a3>Explorar M\xF3dulos</h2><div class="nav-grid" data-v-28aba1a3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/posts",
        class: "nav-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="nav-card__icon" data-v-28aba1a3${_scopeId}>posts</div><h3 data-v-28aba1a3${_scopeId}>Publicaciones</h3><p data-v-28aba1a3${_scopeId}>Mira los posts de la comunidad, crea contenido nuevo, edita o elimina.</p><span class="nav-card__arrow" data-v-28aba1a3${_scopeId}>Ir a Posts \u2192</span>`);
          } else {
            return [
              createVNode("div", { class: "nav-card__icon" }, "posts"),
              createVNode("h3", null, "Publicaciones"),
              createVNode("p", null, "Mira los posts de la comunidad, crea contenido nuevo, edita o elimina."),
              createVNode("span", { class: "nav-card__arrow" }, "Ir a Posts \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/albums",
        class: "nav-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="nav-card__icon" data-v-28aba1a3${_scopeId}>albums</div><h3 data-v-28aba1a3${_scopeId}>\xC1lbumes de Fotos</h3><p data-v-28aba1a3${_scopeId}>Organiza \xE1lbumes y fotos mediante relaciones din\xE1micas.</p><span class="nav-card__arrow" data-v-28aba1a3${_scopeId}>Ir a \xC1lbumes \u2192</span>`);
          } else {
            return [
              createVNode("div", { class: "nav-card__icon" }, "albums"),
              createVNode("h3", null, "\xC1lbumes de Fotos"),
              createVNode("p", null, "Organiza \xE1lbumes y fotos mediante relaciones din\xE1micas."),
              createVNode("span", { class: "nav-card__arrow" }, "Ir a \xC1lbumes \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/users",
        class: "nav-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="nav-card__icon" data-v-28aba1a3${_scopeId}>users</div><h3 data-v-28aba1a3${_scopeId}>Usuarios</h3><p data-v-28aba1a3${_scopeId}>Explora perfiles y haz seguimiento de sus aportes en la plataforma.</p><span class="nav-card__arrow" data-v-28aba1a3${_scopeId}>Ver Usuarios \u2192</span>`);
          } else {
            return [
              createVNode("div", { class: "nav-card__icon" }, "users"),
              createVNode("h3", null, "Usuarios"),
              createVNode("p", null, "Explora perfiles y haz seguimiento de sus aportes en la plataforma."),
              createVNode("span", { class: "nav-card__arrow" }, "Ver Usuarios \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/todos",
        class: "nav-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="nav-card__icon" data-v-28aba1a3${_scopeId}>todos</div><h3 data-v-28aba1a3${_scopeId}>Gestor de Tareas</h3><p data-v-28aba1a3${_scopeId}>Crea check-lists, marca completados y admin\xEDstralos en tiempo real.</p><span class="nav-card__arrow" data-v-28aba1a3${_scopeId}>Ver Tareas \u2192</span>`);
          } else {
            return [
              createVNode("div", { class: "nav-card__icon" }, "todos"),
              createVNode("h3", null, "Gestor de Tareas"),
              createVNode("p", null, "Crea check-lists, marca completados y admin\xEDstralos en tiempo real."),
              createVNode("span", { class: "nav-card__arrow" }, "Ver Tareas \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-28aba1a3"]]);

export { index as default };
//# sourceMappingURL=index-Dgrt6vLn.mjs.map
