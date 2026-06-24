<template>
  <div class="users-page animate-fade-in">
    <div class="page-header">
      <div>
        <h1 class="page-title">Directorio de Usuarios</h1>
        <p class="page-subtitle">Explora perfiles y haz seguimiento a los aportes de los estudiantes.</p>
      </div>
    </div>

    <!-- Search & Indicators Panel -->
    <div class="filter-panel">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar usuario por nombre..." 
          class="search-input"
        />
      </div>
      <div class="indicators">
        <span class="badge badge--info">Total: {{ users.length }}</span>
        <span class="badge badge--success">Visibles: {{ filteredUsers.length }}</span>
      </div>
    </div>

    <!-- Status State -->
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="users.length === 0" 
      @refetch="fetchUsers"
    >
      <StatusState :loading="false" :error="''" :isEmpty="filteredUsers.length === 0">
        <div class="users-grid">
          <div v-for="user in filteredUsers" :key="user.uid || user.id" class="user-card">
            <img 
              :src="user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'" 
              alt="Avatar" 
              class="user-card__avatar"
              @error="handleAvatarError"
            />
            <div class="user-card__body">
              <h3 class="user-card__name">{{ user.name }}</h3>
              <p class="user-card__email">{{ user.email }}</p>
              
              <NuxtLink :to="`/users/${user.uid || user.id}`" class="btn-profile">
                Ver Perfil Completo ➔
              </NuxtLink>
            </div>
          </div>
        </div>
      </StatusState>
    </StatusState>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFirestore } from '~/composables/useFirestore'
import StatusState from '~/components/StatusState.vue'

useHead({
  title: 'Usuarios | Firebase + Nuxt Workshop',
  meta: [
    { name: 'description', content: 'Directorio de usuarios registrados en el sistema.' }
  ]
})

const { getCollection } = useFirestore()

const users = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')

const fetchUsers = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getCollection('users')
    users.value = data
  } catch (err) {
    console.error('Error fetching users:', err)
    error.value = 'Error al cargar los usuarios de Firestore.'
  } finally {
    loading.value = false
  }
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const queryText = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.name?.toLowerCase().includes(queryText)
  )
})

const handleAvatarError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped lang="scss">
.users-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* Users Grid */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.user-card {
  background: #111827;
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 20px;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(66, 184, 131, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #2182a5;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
  }

  &__name {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__email {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-secondary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
}

.btn-profile {
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  color: #2182a5;
  transition: color 0.2s ease;
  align-self: flex-start;

  &:hover {
    color: #42b883;
  }
}
</style>
