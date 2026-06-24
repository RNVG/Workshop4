<template>
  <div class="albums-page animate-fade-in">
    <div class="page-header">
      <div>
        <h1 class="page-title">Álbumes de Fotos</h1>
        <p class="page-subtitle">Organiza y visualiza galerías fotográficas.</p>
      </div>

      <button 
        v-if="currentUser" 
        @click="showCreateModal = true" 
        class="btn btn--primary"
      >
        ➕ Crear Álbum
      </button>
      <NuxtLink v-else to="/login" class="btn btn--secondary">
        🔑 Inicia sesión para crear álbumes
      </NuxtLink>
    </div>

    <!-- Search & Indicators Panel -->
    <div class="filter-panel">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar álbum por título..." 
          class="search-input"
        />
      </div>
      <div class="indicators">
        <span class="badge badge--info">Total: {{ albums.length }}</span>
        <span class="badge badge--success">Visibles: {{ filteredAlbums.length }}</span>
      </div>
    </div>

    <!-- Status State -->
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="albums.length === 0" 
      @refetch="fetchAlbums"
    >
      <StatusState :loading="false" :error="''" :isEmpty="filteredAlbums.length === 0">
        <div class="albums-grid">
          <div v-for="album in filteredAlbums" :key="album.id" class="album-card">
            <div class="album-card__cover">
              <span class="cover-icon">🖼️</span>
            </div>
            <div class="album-card__body">
              <h3 class="album-card__title">{{ album.title }}</h3>
              <p class="album-card__owner">Propietario ID: {{ album.userId }}</p>
              
              <NuxtLink :to="`/albums/${album.id}/photos`" class="btn-view-photos">
                Ver Fotos ➔
              </NuxtLink>
            </div>
          </div>
        </div>
      </StatusState>
    </StatusState>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal-card">
        <h2 class="modal-title">Nuevo Álbum</h2>
        <form @submit.prevent="handleCreate">
          <div class="form-group">
            <label for="album-title">Título del Álbum</label>
            <input 
              v-model="newAlbumTitle" 
              id="album-title" 
              type="text" 
              placeholder="Escribe el nombre del álbum..." 
              required
            />
          </div>
          <div class="modal-buttons">
            <button type="button" @click="showCreateModal = false" class="btn btn--secondary-outline">Cancelar</button>
            <button type="submit" class="btn btn--primary" :disabled="submitting">
              {{ submitting ? 'Creando...' : 'Crear Álbum' }}
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

useHead({
  title: 'Álbumes | Firebase + Nuxt Workshop',
  meta: [
    { name: 'description', content: 'Explora y crea álbumes de fotos.' }
  ]
})

const { getCollection, createDocument } = useFirestore()
const { currentUser } = useAuth()

const albums = ref([])
const loading = ref(false)
const error = ref('')

const searchQuery = ref('')
const showCreateModal = ref(false)
const submitting = ref(false)
const newAlbumTitle = ref('')

const fetchAlbums = async () => {
  loading.value = true
  error.value = ''
  try {
    const rawAlbums = await getCollection('albums')
    albums.value = rawAlbums.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0
      const dateB = b.createdAt?.seconds || 0
      return dateB - dateA
    })
  } catch (err) {
    console.error('Error fetching albums:', err)
    error.value = 'No se pudieron recuperar los álbumes de Firestore.'
  } finally {
    loading.value = false
  }
}

const filteredAlbums = computed(() => {
  if (!searchQuery.value) return albums.value
  const queryText = searchQuery.value.toLowerCase()
  return albums.value.filter(album => 
    album.title?.toLowerCase().includes(queryText)
  )
})

const handleCreate = async () => {
  if (!currentUser.value) return
  submitting.value = true
  try {
    const albumData = {
      title: newAlbumTitle.value,
      userId: currentUser.value.uid
    }
    const created = await createDocument('albums', albumData)
    albums.value.unshift(created)
    
    newAlbumTitle.value = ''
    showCreateModal.value = false
  } catch (err) {
    console.error('Error creating album:', err)
    alert('Error al crear el álbum.')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchAlbums()
})
</script>

<style scoped lang="scss">
.albums-page {
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
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  margin: 0.25rem 0 0 0;
  color: var(--text-secondary);
}

/* Filter Panel */
.filter-panel {
  background: #111827;
  border: 1px solid var(--border-color);
  padding: 1rem 1.5rem;
  border-radius: 16px;
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
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
  }

  .search-input {
    width: 100%;
    background: #0f172a;
    border: 1.5px solid var(--border-color);
    border-radius: 999px;
    padding: 0.6rem 1rem 0.6rem 2.5rem;
    color: white;
    font-size: 0.9rem;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:focus {
      border-color: #42b883;
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
    }
  }
}

.indicators {
  display: flex;
  gap: 0.75rem;
}

.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;

  &--info {
    background: rgba(33, 130, 165, 0.1);
    color: #2182a5;
    border: 1px solid rgba(33, 130, 165, 0.2);
  }

  &--success {
    background: rgba(66, 184, 131, 0.1);
    color: #42b883;
    border: 1px solid rgba(66, 184, 131, 0.2);
  }
}

/* Albums Grid */
.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.album-card {
  background: #111827;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #2182a5;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &__cover {
    background: linear-gradient(135deg, rgba(33, 130, 165, 0.2) 0%, rgba(66, 184, 131, 0.1) 100%);
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border-color);

    .cover-icon {
      font-size: 2.5rem;
    }
  }

  &__body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.4;
  }

  &__owner {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
}

.btn-view-photos {
  margin-top: 0.5rem;
  align-self: flex-start;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  color: #2182a5;
  transition: color 0.2s ease;

  &:hover {
    color: #42b883;
  }
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal-card {
  background: #111827;
  border: 1px solid var(--border-color);
  width: min(420px, 90%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  border-left: 4px solid #42b883;
  padding-left: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  input {
    background: #0f172a;
    border: 1.5px solid var(--border-color);
    border-radius: 8px;
    padding: 0.75rem;
    color: white;
    font-size: 0.95rem;

    &:focus {
      border-color: #42b883;
      outline: none;
    }
  }
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: all 0.25s ease;

  &--primary {
    background: #42b883;
    color: #0f172a;
    &:hover { background: #369870; }
  }

  &--secondary {
    background: #1f2937;
    color: var(--text-primary);
    text-decoration: none;
    &:hover { background: #374151; }
  }

  &--secondary-outline {
    background: transparent;
    border: 1.5px solid var(--border-color);
    color: var(--text-secondary);
    &:hover { border-color: #64748b; }
  }
}
</style>
