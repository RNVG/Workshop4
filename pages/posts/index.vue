<template>
  <div class="posts-page animate-fade-in">
    <div class="page-header">
      <div>
        <h1 class="page-title">Publicaciones</h1>
        <p class="page-subtitle">Explora lo que la comunidad ha compartido.</p>
      </div>

      <!-- Action: New Post Trigger -->
      <button 
        v-if="currentUser" 
        @click="showCreateModal = true" 
        class="btn btn--primary"
      >
        ➕ Crear Publicación
      </button>
      <NuxtLink v-else to="/login" class="btn btn--secondary">
        🔑 Inicia sesión para publicar
      </NuxtLink>
    </div>

    <!-- Search & Indicators Panel -->
    <div class="filter-panel">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar post por título..." 
          class="search-input"
        />
      </div>
      <div class="indicators">
        <span class="badge badge--info">Total: {{ posts.length }}</span>
        <span class="badge badge--success">Visibles: {{ filteredPosts.length }}</span>
      </div>
    </div>

    <!-- Firestore List with StatusState -->
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="posts.length === 0" 
      @refetch="fetchPosts"
    >
      <StatusState :loading="false" :error="''" :isEmpty="filteredPosts.length === 0">
        <div class="posts-grid">
          <div v-for="post in filteredPosts" :key="post.id" class="post-card">
            <div class="post-card__content">
              <h3 class="post-card__title">{{ post.title }}</h3>
              <p class="post-card__body">{{ truncate(post.body, 120) }}</p>
              
              <div class="post-card__author">
                <span class="author-icon">👤</span>
                <span class="author-name">ID Usuario: {{ post.userId }}</span>
              </div>
            </div>

            <div class="post-card__actions">
              <NuxtLink :to="`/posts/${post.id}`" class="btn-action btn-action--view">
                👁️ Ver Detalle
              </NuxtLink>
              
              <!-- Owner/Auth Actions -->
              <template v-if="currentUser && (currentUser.uid === post.userId || post.userId.startsWith('user_'))">
                <button @click="openEditModal(post)" class="btn-action btn-action--edit">
                  ✏️ Editar
                </button>
                <button @click="handleDelete(post.id)" class="btn-action btn-action--delete">
                  🗑️ Borrar
                </button>
              </template>
            </div>
          </div>
        </div>
      </StatusState>
    </StatusState>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal-card">
        <h2 class="modal-title">Nueva Publicación</h2>
        <form @submit.prevent="handleCreate">
          <div class="form-group">
            <label for="new-title">Título</label>
            <input 
              v-model="newPost.title" 
              id="new-title" 
              type="text" 
              placeholder="Escribe un título llamativo..." 
              required
            />
          </div>
          <div class="form-group">
            <label for="new-body">Contenido</label>
            <textarea 
              v-model="newPost.body" 
              id="new-body" 
              rows="5" 
              placeholder="Escribe el contenido del post..." 
              required
            ></textarea>
          </div>
          <div class="modal-buttons">
            <button type="button" @click="showCreateModal = false" class="btn btn--secondary-outline">Cancelar</button>
            <button type="submit" class="btn btn--primary" :disabled="submitting">
              {{ submitting ? 'Guardando...' : 'Publicar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay">
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
              rows="5" 
              required
            ></textarea>
          </div>
          <div class="modal-buttons">
            <button type="button" @click="showEditModal = false" class="btn btn--secondary-outline">Cancelar</button>
            <button type="submit" class="btn btn--primary" :disabled="submitting">
              {{ submitting ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFirestore } from '~/composables/useFirestore'
import { useAuth } from '~/composables/useAuth'
import StatusState from '~/components/StatusState.vue'

// SEO Tags
useHead({
  title: 'Posts | Firebase + Nuxt Workshop',
  meta: [
    { name: 'description', content: 'Manejo de posts en Firestore, operaciones CRUD y búsquedas.' }
  ]
})

const { getCollection, createDocument, updateDocument, deleteDocument } = useFirestore()
const { currentUser } = useAuth()

const posts = ref([])
const loading = ref(false)
const error = ref('')

const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const submitting = ref(false)

const newPost = ref({
  title: '',
  body: ''
})

const editingPost = ref({
  id: '',
  title: '',
  body: '',
  userId: ''
})

// Truncate string for card body
const truncate = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const fetchPosts = async () => {
  loading.value = true
  error.value = ''
  try {
    const rawPosts = await getCollection('posts')
    // Ordenar por fecha o ID de manera inversa
    posts.value = rawPosts.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0
      const dateB = b.createdAt?.seconds || 0
      return dateB - dateA
    })
  } catch (err) {
    console.error('Error fetching posts:', err)
    error.value = 'No se pudieron recuperar las publicaciones de Firestore.'
  } finally {
    loading.value = false
  }
}

const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value
  const queryText = searchQuery.value.toLowerCase()
  return posts.value.filter(post => 
    post.title?.toLowerCase().includes(queryText)
  )
})

const handleCreate = async () => {
  if (!currentUser.value) return
  submitting.value = true
  try {
    const postData = {
      title: newPost.value.title,
      body: newPost.value.body,
      userId: currentUser.value.uid
    }
    const created = await createDocument('posts', postData)
    posts.value.unshift(created)
    
    // Reset Form
    newPost.value = { title: '', body: '' }
    showCreateModal.value = false
  } catch (err) {
    console.error('Error creating post:', err)
    alert('Error al crear la publicación.')
  } finally {
    submitting.value = false
  }
}

const openEditModal = (post) => {
  editingPost.value = { ...post }
  showEditModal.value = true
}

const handleEdit = async () => {
  submitting.value = true
  try {
    const updateData = {
      title: editingPost.value.title,
      body: editingPost.value.body
    }
    await updateDocument('posts', editingPost.value.id, updateData)
    
    // Update local state
    const index = posts.value.findIndex(p => p.id === editingPost.value.id)
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...updateData }
    }
    showEditModal.value = false
  } catch (err) {
    console.error('Error editing post:', err)
    alert('Error al guardar cambios.')
  } finally {
    submitting.value = false
  }
}

const handleDelete = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta publicación?')) return
  try {
    await deleteDocument('posts', id)
    posts.value = posts.value.filter(p => p.id !== id)
  } catch (err) {
    console.error('Error deleting post:', err)
    alert('Error al eliminar la publicación.')
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped lang="scss">
.posts-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a1a2e;
}

.page-subtitle {
  margin: 0.25rem 0 0 0;
  color: #666666;
}

/* Filter Panel */
.filter-panel {
  background: #f9f9f9;
  border: 1px solid #ececec;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-input-wrapper {
  position: relative;
  flex-grow: 1;
  max-width: 400px;

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #888888;
  }

  .search-input {
    width: 100%;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0.5rem 0.75rem 0.5rem 2rem;
    color: #333333;
    font-size: 0.85rem;
    box-sizing: border-box;

    &:focus {
      border-color: #42b883;
      outline: none;
    }
  }
}

.indicators {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;

  &--info {
    background: #e8f0fe;
    color: #1a73e8;
    border: 1px solid #d2e3fc;
  }

  &--success {
    background: #e6f4ea;
    color: #137333;
    border: 1px solid #ceead6;
  }
}

/* Posts Grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.post-card {
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #42b883;
  }

  &__content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
    color: #1a1a2e;
    line-height: 1.3;
  }

  &__body {
    margin: 0;
    font-size: 0.85rem;
    color: #555555;
    line-height: 1.4;
    flex-grow: 1;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.75rem;
    color: #777777;
    margin-top: 0.25rem;
  }

  &__actions {
    padding: 0.75rem 1rem;
    background: #f9f9f9;
    border-top: 1px solid #ececec;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }
}

/* Action Buttons */
.btn-action {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid transparent;

  &--view {
    background: #f5f5f5;
    color: #333333;
    border-color: #cccccc;

    &:hover {
      background: #e5e5e5;
    }
  }

  &--edit {
    background: #fff3e0;
    color: #e65100;
    border-color: #ffe0b2;

    &:hover {
      background: #ffe0b2;
    }
  }

  &--delete {
    background: #ffebee;
    color: #c62828;
    border-color: #ffcdd2;

    &:hover {
      background: #ffcdd2;
    }
  }
}

/* Modals */
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

/* General Buttons */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;

  &--primary {
    background: #42b883;
    color: white;

    &:hover {
      background: #369870;
    }
  }

  &--secondary {
    background: #e0e0e0;
    color: #333333;
    text-decoration: none;

    &:hover {
      background: #d5d5d5;
    }
  }

  &--secondary-outline {
    background: transparent;
    border: 1px solid #cccccc;
    color: #666666;

    &:hover {
      background: #f5f5f5;
    }
  }
}
</style>
