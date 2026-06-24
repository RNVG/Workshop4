<template>
  <div class="album-detail-page animate-fade-in">
    <div class="back-nav">
      <NuxtLink to="/albums" class="btn-back">⬅️ Volver a Álbumes</NuxtLink>
    </div>

    <!-- Status State for Album Info -->
    <StatusState :loading="loading" :error="error" :isEmpty="!album" @refetch="fetchAlbum">
      <div v-if="album" class="album-container">
        <header class="album-header">
          <div class="album-header-icon">📁</div>
          <div class="album-header-info">
            <h1 class="album-title">{{ album.title }}</h1>
            <p class="album-meta">Creado por Usuario ID: <strong>{{ album.userId }}</strong></p>
          </div>
        </header>

        <!-- Nested Router Page (Photos) -->
        <NuxtPage />
      </div>
    </StatusState>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFirestore } from '~/composables/useFirestore'
import StatusState from '~/components/StatusState.vue'

const route = useRoute()
const { getDocument } = useFirestore()

const albumId = route.params.id
const album = ref(null)
const loading = ref(false)
const error = ref('')

useHead({
  title: 'Detalle del Álbum | Firebase Workshop',
  meta: [
    { name: 'description', content: 'Explora fotos asociadas con este álbum.' }
  ]
})

const fetchAlbum = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getDocument('albums', albumId)
    if (!data) {
      error.value = 'El álbum solicitado no existe.'
    } else {
      album.value = data
    }
  } catch (err) {
    console.error('Error fetching album:', err)
    error.value = 'Error al cargar la información del álbum de Firestore.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAlbum()
})
</script>

<style scoped lang="scss">
.album-detail-page {
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
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.album-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Album Header */
.album-header {
  background: #111827;
  border: 1px solid var(--border-color);
  padding: 1.75rem 2rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.album-header-icon {
  font-size: 3rem;
  background: rgba(33, 130, 165, 0.1);
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.album-header-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.album-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffffff;
}

.album-meta {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}
</style>
