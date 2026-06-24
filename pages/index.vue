<template>
  <div class="dashboard-page animate-fade-in">
    <!-- Hero Section -->
    <header class="dashboard-hero">
      <h1 class="hero-title">Workshop Firebase + Firestore</h1>
      <p class="hero-subtitle">
        Una migración completa desde APIs REST hacia un backend en tiempo real con Nuxt 3.
      </p>

    </header>

    <!-- Stats Grid -->
    <section class="stats-section">
      <h2 class="section-title">Estadísticas del Servidor (Firestore)</h2>
      
      <StatusState :loading="loadingStats" :error="errorStats" :isEmpty="false" @refetch="fetchStats">
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-icon">📝</span>
            <div class="stat-info">
              <span class="stat-value">{{ stats.posts }}</span>
              <span class="stat-label">Posts Creados</span>
            </div>
          </div>

          <div class="stat-card">
            <span class="stat-icon">🎨</span>
            <div class="stat-info">
              <span class="stat-value">{{ stats.albums }}</span>
              <span class="stat-label">Álbumes</span>
            </div>
          </div>

          <div class="stat-card">
            <span class="stat-icon">💬</span>
            <div class="stat-info">
              <span class="stat-value">{{ stats.comments }}</span>
              <span class="stat-label">Comentarios</span>
            </div>
          </div>

          <div class="stat-card">
            <span class="stat-icon">✅</span>
            <div class="stat-info">
              <span class="stat-value">{{ stats.todos }}</span>
              <span class="stat-label">Tareas Listas</span>
            </div>
          </div>
        </div>
      </StatusState>
    </section>

    <!-- Navigation Section -->
    <section class="navigation-section">
      <h2 class="section-title">Explorar Módulos</h2>
      <div class="nav-grid">
        <NuxtLink to="/posts" class="nav-card">
          <div class="nav-card__icon">posts</div>
          <h3>Publicaciones</h3>
          <p>Mira los posts de la comunidad, crea contenido nuevo, edita o elimina.</p>
          <span class="nav-card__arrow">Ir a Posts →</span>
        </NuxtLink>

        <NuxtLink to="/albums" class="nav-card">
          <div class="nav-card__icon">albums</div>
          <h3>Álbumes de Fotos</h3>
          <p>Organiza álbumes y fotos mediante relaciones dinámicas.</p>
          <span class="nav-card__arrow">Ir a Álbumes →</span>
        </NuxtLink>

        <NuxtLink to="/users" class="nav-card">
          <div class="nav-card__icon">users</div>
          <h3>Usuarios</h3>
          <p>Explora perfiles y haz seguimiento de sus aportes en la plataforma.</p>
          <span class="nav-card__arrow">Ver Usuarios →</span>
        </NuxtLink>

        <NuxtLink to="/todos" class="nav-card">
          <div class="nav-card__icon">todos</div>
          <h3>Gestor de Tareas</h3>
          <p>Crea check-lists, marca completados y adminístralos en tiempo real.</p>
          <span class="nav-card__arrow">Ver Tareas →</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFirestore } from '~/composables/useFirestore'

import { query, where } from 'firebase/firestore'
import StatusState from '~/components/StatusState.vue'

// SEO Meta Tags
useHead({
  title: 'Dashboard | Firebase + Nuxt Workshop',
  meta: [
    { name: 'description', content: 'Dashboard interactivo de estadísticas de Firebase y Firestore.' }
  ]
})

const { getCollection } = useFirestore()


const stats = ref({
  posts: 0,
  albums: 0,
  comments: 0,
  todos: 0
})

const loadingStats = ref(false)
const errorStats = ref('')

const fetchStats = async () => {
  loadingStats.value = true
  errorStats.value = ''
  try {
    const [posts, albums, comments, todos] = await Promise.all([
      getCollection('posts'),
      getCollection('albums'),
      getCollection('comments'),
      getCollection('todos')
    ])

    // Calcular completados de todos
    const completedTodos = todos.filter(t => t.completed === true)

    stats.value = {
      posts: posts.length,
      albums: albums.length,
      comments: comments.length,
      todos: completedTodos.length
    }
  } catch (error) {
    console.error('Error al cargar estadísticas:', error)
    errorStats.value = 'Error al consultar las colecciones de Firestore.'
  } finally {
    loadingStats.value = false
  }
}



onMounted(() => {
  fetchStats()
})
</script>

<style scoped lang="scss">
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Hero Section */
.dashboard-hero {
  padding: 2rem 1.5rem;
  background: #f9f9f9;
  border: 1px solid #ececec;
  border-radius: 8px;
  text-align: center;
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a2e;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  color: #666666;
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto 1.5rem;
  line-height: 1.5;
}



/* Section Common */
.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a1a2e;
  border-left: 4px solid #42b883;
  padding-left: 0.5rem;
}

/* Stats Section */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #f9f9f9;
  border: 1px solid #ececec;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;

  .stat-icon {
    font-size: 1.8rem;
    background: #ffffff;
    width: 44px;
    height: 44px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ececec;
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1a1a2e;
  }

  .stat-label {
    font-size: 0.8rem;
    color: #666666;
  }
}

/* Navigation Grid */
.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.nav-card {
  background: #f9f9f9;
  border: 1px solid #ececec;
  padding: 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  color: #333333;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #42b883;
  }

  &__icon {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #42b883;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #1a1a2e;
  }

  p {
    color: #666666;
    font-size: 0.85rem;
    line-height: 1.4;
    margin: 0 0 1rem 0;
    flex-grow: 1;
  }

  &__arrow {
    font-size: 0.8rem;
    font-weight: bold;
    color: #42b883;
  }
}
</style>
