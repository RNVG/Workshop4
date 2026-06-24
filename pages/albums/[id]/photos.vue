<template>
  <div class="photos-nested-view animate-slide-down">
    <div class="photos-controls-row">
      <h2 class="sub-section-title">Galería de Fotos</h2>
      <button 
        v-if="currentUser" 
        @click="showAddPhotoModal = true" 
        class="btn btn--primary btn--sm"
      >
        📸 Añadir Foto
      </button>
    </div>

    <!-- Filter & Indicators -->
    <div class="photos-filters">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar foto por título..." 
          class="search-input"
        />
      </div>
      <div class="stats-badge">
        <span>Total: <strong>{{ photos.length }}</strong></span>
        <span class="divider">|</span>
        <span>Visibles: <strong>{{ filteredPhotos.length }}</strong></span>
      </div>
    </div>

    <!-- Status State for Photos Fetch -->
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="photos.length === 0" 
      @refetch="fetchPhotos"
    >
      <StatusState :loading="false" :error="''" :isEmpty="filteredPhotos.length === 0">
        <div class="photos-grid">
          <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-card">
            <div class="photo-img-wrapper">
              <img :src="photo.url" :alt="photo.title" class="photo-img" @error="handleImgError" />
            </div>
            <div class="photo-title-box">
              <p class="photo-title">{{ photo.title }}</p>
            </div>
          </div>
        </div>
      </StatusState>
    </StatusState>

    <!-- Add Photo Modal -->
    <div v-if="showAddPhotoModal" class="modal-overlay">
      <div class="modal-card">
        <h2 class="modal-title">Añadir Foto al Álbum</h2>
        <form @submit.prevent="handleCreatePhoto">
          <div class="form-group">
            <label for="photo-title-input">Título de la Foto</label>
            <input 
              v-model="newPhoto.title" 
              id="photo-title-input" 
              type="text" 
              placeholder="Escribe el título descriptivo..." 
              required
            />
          </div>
          <div class="form-group">
            <label for="photo-url-input">URL de la Imagen (Opcional)</label>
            <input 
              v-model="newPhoto.url" 
              id="photo-url-input" 
              type="url" 
              placeholder="https://ejemplo.com/imagen.jpg (En blanco para aleatoria)"
            />
          </div>
          <div class="modal-buttons">
            <button type="button" @click="showAddPhotoModal = false" class="btn btn--secondary-outline">Cancelar</button>
            <button type="submit" class="btn btn--primary" :disabled="submitting">
              {{ submitting ? 'Añadiendo...' : 'Añadir Foto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFirestore } from '~/composables/useFirestore'
import { useAuth } from '~/composables/useAuth'
import { where } from 'firebase/firestore'
import StatusState from '~/components/StatusState.vue'

const route = useRoute()
const { getCollection, createDocument } = useFirestore()
const { currentUser } = useAuth()

const albumId = route.params.id
const photos = ref([])
const loading = ref(false)
const error = ref('')

const searchQuery = ref('')
const showAddPhotoModal = ref(false)
const submitting = ref(false)

const newPhoto = ref({
  title: '',
  url: ''
})

const fetchPhotos = async () => {
  loading.value = true
  error.value = ''
  try {
    // Relationship query: photos belonging to this album
    const data = await getCollection('photos', [
      where('albumId', '==', albumId)
    ])
    
    // Sort photos locally
    photos.value = data.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0
      const dateB = b.createdAt?.seconds || 0
      return dateB - dateA
    })
  } catch (err) {
    console.error('Error fetching photos:', err)
    error.value = 'Error al recuperar las fotos del álbum.'
  } finally {
    loading.value = false
  }
}

const filteredPhotos = computed(() => {
  if (!searchQuery.value) return photos.value
  const queryText = searchQuery.value.toLowerCase()
  return photos.value.filter(photo => 
    photo.title?.toLowerCase().includes(queryText)
  )
})

const handleCreatePhoto = async () => {
  if (!currentUser.value) return
  submitting.value = true
  try {
    // Generar URL aleatoria de Unsplash si el usuario no proporciona una
    const finalUrl = newPhoto.value.url.trim() || 
      `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 90000000)}?w=600&q=80`

    const photoData = {
      albumId,
      title: newPhoto.value.title,
      url: finalUrl
    }
    
    const created = await createDocument('photos', photoData)
    photos.value.unshift(created)
    
    newPhoto.value = { title: '', url: '' }
    showAddPhotoModal.value = false
  } catch (err) {
    console.error('Error adding photo:', err)
    alert('No se pudo guardar la foto.')
  } finally {
    submitting.value = false
  }
}

const handleImgError = (event) => {
  // En caso de que la imagen falle al cargar, colocamos un fallback
  event.target.src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600'
}

onMounted(() => {
  fetchPhotos()
})
</script>

<style scoped lang="scss">
.photos-nested-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.photos-controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sub-section-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
}

/* Filters */
.photos-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.search-box {
  flex-grow: 1;
  max-width: 320px;

  .search-input {
    width: 100%;
    background: #0f172a;
    border: 1.5px solid var(--border-color);
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    color: white;
    font-size: 0.85rem;

    &:focus {
      border-color: #42b883;
      outline: none;
    }
  }
}

.stats-badge {
  font-size: 0.85rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  display: flex;
  gap: 0.5rem;

  .divider {
    color: #475569;
  }
}

/* Photos Grid */
.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
}

.photo-card {
  background: #111827;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.02);
    border-color: #42b883;
  }
}

.photo-img-wrapper {
  height: 150px;
  background: #0f172a;
  overflow: hidden;

  .photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.photo-title-box {
  padding: 0.75rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.photo-title {
  margin: 0;
  font-size: 0.85rem;
  color: #e2e8f0;
  line-height: 1.4;
  font-weight: 500;
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
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;
  transition: all 0.25s ease;

  &--primary {
    background: #42b883;
    color: #0f172a;
    &:hover { background: #369870; }
  }

  &--secondary-outline {
    background: transparent;
    border: 1.5px solid var(--border-color);
    color: var(--text-secondary);
    &:hover { border-color: #64748b; }
  }
}

/* Animations */
.animate-slide-down {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
