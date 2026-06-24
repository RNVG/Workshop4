<template>
  <div class="user-profile-page animate-fade-in">
    <div class="back-nav">
      <NuxtLink to="/users" class="btn-back">⬅️ Volver a Usuarios</NuxtLink>
    </div>

    <!-- Status State for User Data -->
    <StatusState :loading="loading" :error="error" :isEmpty="!user" @refetch="fetchUser">
      <div v-if="user" class="profile-layout">
        <!-- Profile Header -->
        <div class="profile-card">
          <img 
            :src="user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'" 
            alt="Avatar" 
            class="profile-card__avatar"
            @error="handleAvatarError"
          />
          <div class="profile-card__info">
            <h1 class="profile-card__name">{{ user.name }}</h1>
            <p class="profile-card__email">✉️ {{ user.email }}</p>
            <span class="user-badge">ID: {{ user.uid || user.id }}</span>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="profile-tabs">
          <NuxtLink 
            :to="`/users/${userId}/posts`" 
            class="tab-link"
            active-class="tab-link--active"
          >
            📝 Posts del Usuario
          </NuxtLink>
          <NuxtLink 
            :to="`/users/${userId}/albums`" 
            class="tab-link"
            active-class="tab-link--active"
          >
            🎨 Álbumes
          </NuxtLink>
          <NuxtLink 
            :to="`/users/${userId}/todos`" 
            class="tab-link"
            active-class="tab-link--active"
          >
            ✅ Tareas (Todos)
          </NuxtLink>
        </nav>

        <!-- Nested View Target -->
        <div class="profile-tab-content">
          <NuxtPage />
        </div>
      </div>
    </StatusState>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirestore } from '~/composables/useFirestore'
import StatusState from '~/components/StatusState.vue'

const route = useRoute()
const router = useRouter()
const { getDocument } = useFirestore()

const userId = route.params.id
const user = ref(null)
const loading = ref(false)
const error = ref('')

useHead({
  title: 'Perfil de Usuario | Firebase Workshop',
  meta: [
    { name: 'description', content: 'Detalle de posts, álbumes y tareas de un usuario en Firestore.' }
  ]
})

const fetchUser = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getDocument('users', userId)
    if (!data) {
      error.value = 'El usuario solicitado no existe.'
    } else {
      user.value = data
    }
  } catch (err) {
    console.error('Error fetching user:', err)
    error.value = 'Error al cargar el perfil del usuario.'
  } finally {
    loading.value = false
  }
}

const handleAvatarError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
}

onMounted(async () => {
  await fetchUser()
  // Redirect to posts sub-route if exactly on base /users/[id]
  if (route.path === `/users/${userId}` || route.path === `/users/${userId}/`) {
    router.replace(`/users/${userId}/posts`)
  }
})
</script>

<style scoped lang="scss">
.user-profile-page {
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

.profile-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Profile Card */
.profile-card {
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  border: 1px solid var(--border-color);
  padding: 2.5rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);

  &__avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #42b883;
    box-shadow: 0 0 15px rgba(66, 184, 131, 0.25);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: flex-start;
  }

  &__name {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 800;
    color: #ffffff;
  }

  &__email {
    margin: 0;
    font-size: 0.95rem;
    color: var(--text-secondary);
  }

  .user-badge {
    background: rgba(66, 184, 131, 0.1);
    color: #42b883;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: monospace;
    border: 1px solid rgba(66, 184, 131, 0.2);
  }
}

/* Tabs */
.profile-tabs {
  display: flex;
  border-bottom: 2px solid var(--border-color);
  gap: 1rem;
  flex-wrap: wrap;
}

.tab-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.25rem;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  &--active {
    color: #42b883;
    border-bottom-color: #42b883;
  }
}

.profile-tab-content {
  background: rgba(17, 24, 39, 0.4);
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 20px;
}
</style>
