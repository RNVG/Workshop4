<template>
  <div class="post-detail-page animate-fade-in">
    <div class="back-nav">
      <NuxtLink to="/posts" class="btn-back">⬅️ Volver a Publicaciones</NuxtLink>
    </div>

    <!-- Status State for loading/error on post fetch -->
    <StatusState :loading="loading" :error="error" :isEmpty="!post" @refetch="fetchPost">
      <div v-if="post" class="post-detail">
        <article class="post-main">
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-body">{{ post.body }}</p>

          <div class="post-meta">
            <span class="meta-item">👤 Autor ID: {{ post.userId }}</span>
            <span v-if="post.createdAt" class="meta-item">
              📅 {{ formatDate(post.createdAt) }}
            </span>
          </div>

          <div class="post-actions" v-if="currentUser && (currentUser.uid === post.userId || post.userId.startsWith('user_'))">
            <button @click="showEditModal = true" class="btn btn--warning-outline">✏️ Editar Post</button>
            <button @click="handleDelete" class="btn btn--danger-outline">🗑️ Eliminar Post</button>
          </div>
        </article>

        <!-- Nested Comments Section -->
        <section class="comments-section">
          <div class="comments-header">
            <h2>Comentarios de la Comunidad</h2>
            <NuxtLink 
              v-if="!isShowingComments" 
              :to="`/posts/${post.id}/comments`" 
              class="btn btn--primary"
            >
              💬 Cargar Comentarios
            </NuxtLink>
            <NuxtLink 
              v-else 
              :to="`/posts/${post.id}`" 
              class="btn btn--secondary"
            >
              🙈 Ocultar Comentarios
            </NuxtLink>
          </div>

          <!-- Nested Router Target -->
          <div class="nested-comments-container">
            <NuxtPage />
            <div v-if="!isShowingComments" class="comments-placeholder">
              <p>Presiona "Cargar Comentarios" para ver la discusión.</p>
            </div>
          </div>
        </section>
      </div>
    </StatusState>

    <!-- Edit Modal (same as index, for convenience) -->
    <div v-if="showEditModal && post" class="modal-overlay">
      <div class="modal-card">
        <h2 class="modal-title">Editar Publicación</h2>
        <form @submit.prevent="handleEdit">
          <div class="form-group">
            <label for="edit-title">Título</label>
            <input 
              v-model="editingPost.title" 
              id="edit-title" 
              type="text" 
              required
            />
          </div>
          <div class="form-group">
            <label for="edit-body">Contenido</label>
            <textarea 
              v-model="editingPost.body" 
              id="edit-body" 
              rows="6" 
              required
            ></textarea>
          </div>
          <div class="modal-buttons">
            <button type="button" @click="showEditModal = false" class="btn btn--secondary-outline">Cancelar</button>
            <button type="submit" class="btn btn--primary" :disabled="submitting">
              {{ submitting ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirestore } from '~/composables/useFirestore'
import { useAuth } from '~/composables/useAuth'
import StatusState from '~/components/StatusState.vue'

const route = useRoute()
const router = useRouter()
const { getDocument, updateDocument, deleteDocument } = useFirestore()
const { currentUser } = useAuth()

const postId = route.params.id
const post = ref(null)
const loading = ref(false)
const error = ref('')

const showEditModal = ref(false)
const submitting = ref(false)
const editingPost = ref({ title: '', body: '' })

// Set head title based on post
useHead({
  title: computed(() => post.value ? `${post.value.title} | Post` : 'Detalle del Post'),
  meta: [
    { name: 'description', content: 'Detalle de la publicación y comentarios.' }
  ]
})

// Check if comments child route is active
const isShowingComments = computed(() => {
  return route.path.endsWith('/comments')
})

const fetchPost = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getDocument('posts', postId)
    if (!data) {
      error.value = 'El post solicitado no existe.'
    } else {
      post.value = data
      editingPost.value = { ...data }
    }
  } catch (err) {
    console.error('Error fetching post:', err)
    error.value = 'Error al cargar la publicación desde Firestore.'
  } finally {
    loading.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleEdit = async () => {
  submitting.value = true
  try {
    const updateData = {
      title: editingPost.value.title,
      body: editingPost.value.body
    }
    await updateDocument('posts', postId, updateData)
    post.value = { ...post.value, ...updateData }
    showEditModal.value = false
  } catch (err) {
    console.error('Error saving post:', err)
    alert('Error al guardar cambios.')
  } finally {
    submitting.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta publicación?')) return
  try {
    await deleteDocument('posts', postId)
    router.push('/posts')
  } catch (err) {
    console.error('Error deleting post:', err)
    alert('Error al borrar la publicación.')
  }
}

onMounted(() => {
  fetchPost()
})
</script>

<style scoped lang="scss">
.post-detail-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.back-nav {
  margin-bottom: 0.5rem;
}

.btn-back {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;

  &:hover {
    opacity: 0.8;
  }
}

.post-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Post Main */
.post-main {
  background: #ffffff;
  border: 1px solid #ececec;
  padding: 1.5rem;
  border-radius: 8px;
}

.post-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: #1a1a2e;
}

.post-body {
  font-size: 1rem;
  color: #333333;
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #666666;
  border-top: 1px solid #ececec;
  padding-top: 1rem;
  margin-bottom: 1rem;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
}

/* Comments Section */
.comments-section {
  border-top: 1px solid #ececec;
  padding-top: 1.5rem;
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: bold;
    color: #1a1a2e;
  }
}

.nested-comments-container {
  background: #f9f9f9;
  border: 1px solid #ececec;
  border-radius: 8px;
  padding: 1rem;
}

.comments-placeholder {
  padding: 2rem 1rem;
  text-align: center;
  color: #666666;
  font-size: 0.95rem;
}

/* Modals & Buttons */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal-card {
  background: #ffffff;
  border: 1px solid #cccccc;
  width: min(500px, 90%);
  border-radius: 8px;
  padding: 1.5rem;
}

.modal-title {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #1a1a2e;
  border-left: 4px solid #42b883;
  padding-left: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;

  label {
    font-size: 0.8rem;
    font-weight: bold;
    color: #555555;
  }

  input, textarea {
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0.5rem;
    color: #333333;
    font-family: inherit;
    font-size: 0.9rem;

    &:focus {
      border-color: #42b883;
      outline: none;
    }
  }
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: 1px solid transparent;

  &--primary {
    background: #42b883;
    color: white;
    &:hover { background: #369870; }
  }

  &--secondary {
    background: #e0e0e0;
    color: #333333;
    &:hover { background: #d5d5d5; }
  }

  &--warning-outline {
    background: transparent;
    border-color: #ff9800;
    color: #e65100;
    &:hover { background: #fff3e0; }
  }

  &--danger-outline {
    background: transparent;
    border-color: #f44336;
    color: #c62828;
    &:hover { background: #ffebee; }
  }

  &--secondary-outline {
    background: transparent;
    border-color: #cccccc;
    color: #666666;
    &:hover { background: #f5f5f5; }
  }
}
</style>
