import { getFirestore, doc, deleteDoc, updateDoc, setDoc, collection, addDoc, getDoc, query, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

function getFirebaseApp() {
  {
    return null;
  }
}
function useFirebase() {
  const app = getFirebaseApp();
  return {
    app,
    auth: app ? getAuth(app) : null,
    firestore: app ? getFirestore(app) : null
  };
}
function useFirestore() {
  const { firestore } = useFirebase();
  const getCollection = async (name, constraints = []) => {
    if (!firestore) return [];
    const collectionRef = collection(firestore, name);
    const q = query(collectionRef, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
  };
  const getDocument = async (name, id) => {
    if (!firestore) return null;
    const documentRef = doc(firestore, name, id);
    const snapshot = await getDoc(documentRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  };
  const createDocument = async (name, data, customId) => {
    if (!firestore) throw new Error("Firestore no disponible");
    if (customId) {
      const documentRef = doc(firestore, name, customId);
      await setDoc(documentRef, { ...data, createdAt: /* @__PURE__ */ new Date() });
      return { id: customId, ...data };
    } else {
      const collectionRef = collection(firestore, name);
      const docRef = await addDoc(collectionRef, { ...data, createdAt: /* @__PURE__ */ new Date() });
      return { id: docRef.id, ...data };
    }
  };
  const updateDocument = async (name, id, data) => {
    if (!firestore) throw new Error("Firestore no disponible");
    const documentRef = doc(firestore, name, id);
    await updateDoc(documentRef, data);
    return { id, ...data };
  };
  const deleteDocument = async (name, id) => {
    if (!firestore) throw new Error("Firestore no disponible");
    const documentRef = doc(firestore, name, id);
    await deleteDoc(documentRef);
    return id;
  };
  return {
    getCollection,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument
  };
}
const _sfc_main = {
  __name: "StatusState",
  __ssrInlineRender: true,
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    },
    isEmpty: {
      type: Boolean,
      default: false
    }
  },
  emits: ["refetch"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "status-wrapper" }, _attrs))} data-v-cfd85ec3>`);
      if (__props.loading) {
        _push(`<div class="status-state loading-state" data-v-cfd85ec3><div class="spinner" data-v-cfd85ec3></div><p class="status-text" data-v-cfd85ec3>Cargando informaci\xF3n...</p></div>`);
      } else if (__props.error) {
        _push(`<div class="status-state error-state animate-fade-in" data-v-cfd85ec3><div class="error-icon" data-v-cfd85ec3>\u26A0\uFE0F</div><h3 class="status-title" data-v-cfd85ec3>Ha ocurrido un error</h3><p class="status-text" data-v-cfd85ec3>${ssrInterpolate(__props.error)}</p><button class="btn btn--danger-outline" data-v-cfd85ec3> \u{1F504} Reintentar </button></div>`);
      } else if (__props.isEmpty) {
        _push(`<div class="status-state empty-state animate-fade-in" data-v-cfd85ec3><div class="empty-icon" data-v-cfd85ec3>\u{1F4C1}</div><h3 class="status-title" data-v-cfd85ec3>Sin resultados</h3><p class="status-text" data-v-cfd85ec3>No hay datos disponibles en esta secci\xF3n.</p><button class="btn btn--primary-outline" data-v-cfd85ec3> \u{1F504} Actualizar </button></div>`);
      } else {
        _push(`<div class="content-wrapper" data-v-cfd85ec3>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatusState.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StatusState = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cfd85ec3"]]);

export { StatusState as S, useFirebase as a, useFirestore as u };
//# sourceMappingURL=StatusState-CW3PuAZY.mjs.map
