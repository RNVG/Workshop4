<template>
  <div class="user-posts-nested animate-slide-down">
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="posts.length === 0" 
      @refetch="fetchUserPosts"
    >
      <div class="nested-posts-list">
        <div v-for="post in posts" :key="post.id" class="nested-post-card">
          <h3 class="nested-post-card__title">{{ post.title }}</h3>
          <p class="nested-post-card__body">{{ post.body }}</p>
          <NuxtLink :to="`/posts/${post.id}`" class="btn-read-more">
            Leer más ➔
          </NuxtLink>
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

const posts = ref([])
const loading = ref(false)
const error = ref('')

const fetchUserPosts = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getCollection('posts', [
      where('userId', '==', userId)
    ])
    posts.value = data.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0
      const dateB = b.createdAt?.seconds || 0
      return dateB - dateA
    })
  } catch (err) {
    console.error('Error fetching user posts:', err)
    error.value = 'No se pudieron recuperar las publicaciones del usuario.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserPosts()
})
</script>

<style scoped lang="scss">
.user-posts-nested {
  width: 100%;
}

.nested-posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.nested-post-card {
  background: #111827;
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(66, 184, 131, 0.3);
    transform: translateY(-2px);
  }

  &__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.4;
  }

  &__body {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }
}

.btn-read-more {
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  color: #42b883;
  align-self: flex-start;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
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
