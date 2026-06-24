<template>
  <div class="user-albums-nested animate-slide-down">
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="albums.length === 0" 
      @refetch="fetchUserAlbums"
    >
      <div class="nested-albums-list">
        <div v-for="album in albums" :key="album.id" class="nested-album-card">
          <div class="album-icon">🎨</div>
          <div class="album-details">
            <h3 class="album-title">{{ album.title }}</h3>
            <NuxtLink :to="`/albums/${album.id}/photos`" class="btn-link">
              Ver fotos de este álbum ➔
            </NuxtLink>
          </div>
        </div>
      </div>
    </StatusState>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFirestore } from '~/composables/useFirestore'
import { where } from 'firebase/firestore'
import StatusState from '~/components/StatusState.vue'

const route = useRoute()
const { getCollection } = useFirestore()
const userId = route.params.id

const albums = ref([])
const loading = ref(false)
const error = ref('')

const fetchUserAlbums = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getCollection('albums', [
      where('userId', '==', userId)
    ])
    albums.value = data
  } catch (err) {
    console.error('Error fetching user albums:', err)
    error.value = 'No se pudieron recuperar los álbumes del usuario.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserAlbums()
})
</script>

<style scoped lang="scss">
.user-albums-nested {
  width: 100%;
}

.nested-albums-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.nested-album-card {
  background: #111827;
  border: 1px solid var(--border-color);
  padding: 1.25rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(33, 130, 165, 0.4);
    transform: translateY(-2px);
  }

  .album-icon {
    font-size: 2rem;
    background: rgba(33, 130, 165, 0.1);
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .album-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
  }

  .album-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #ffffff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .btn-link {
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 600;
    color: #2182a5;
    transition: color 0.2s ease;

    &:hover {
      color: #42b883;
    }
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
