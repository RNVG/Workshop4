<template>
  <div class="comments-nested-view animate-slide-down">
    <!-- Filter & Indicators -->
    <div class="comments-controls">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar comentario por contenido..." 
          class="search-input"
        />
      </div>
      <div class="stats-badge">
        <span>Total: <strong>{{ comments.length }}</strong></span>
        <span class="divider">|</span>
        <span>Visibles: <strong>{{ filteredComments.length }}</strong></span>
      </div>
    </div>

    <!-- Add Comment Form (Only for logged in users) -->
    <div class="add-comment-form">
      <h3>Deja tu comentario</h3>
      <form v-if="currentUser" @submit.prevent="handleCreateComment" class="comment-input-group">
        <input 
          v-model="newComment.name" 
          type="text" 
          placeholder="Asunto / Tu Nombre..." 
          required 
          class="form-input"
        />
        <textarea 
          v-model="newComment.body" 
          placeholder="Escribe tu comentario aquí..." 
          required 
          rows="3" 
          class="form-textarea"
        ></textarea>
        <button type="submit" class="btn btn--primary" :disabled="submitting">
          {{ submitting ? 'Enviando...' : 'Comentar 🚀' }}
        </button>
      </form>
      <div v-else class="login-prompt">
        <p>Debes iniciar sesión para comentar en este post.</p>
        <NuxtLink to="/login" class="btn btn--secondary-outline">🔑 Iniciar Sesión</NuxtLink>
      </div>
    </div>

    <!-- Status State for comments load -->
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="comments.length === 0" 
      @refetch="fetchComments"
    >
      <StatusState :loading="false" :error="''" :isEmpty="filteredComments.length === 0">
        <div class="comments-list">
          <div v-for="comment in filteredComments" :key="comment.id" class="comment-item">
            <div class="comment-avatar">
              {{ comment.name?.charAt(0).toUpperCase() || '👤' }}
            </div>
            <div class="comment-content">
              <h4 class="comment-author">{{ comment.name }}</h4>
              <p class="comment-text">{{ comment.body }}</p>
              <span v-if="comment.createdAt" class="comment-date">
                {{ formatDate(comment.createdAt) }}
              </span>
            </div>
          </div>
        </div>
      </StatusState>
    </StatusState>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFirestore } from '~/composables/useFirestore'
import { useAuth } from '~/composables/useAuth'
import { where, orderBy } from 'firebase/firestore'
import StatusState from '~/components/StatusState.vue'

const route = useRoute()
const { getCollection, createDocument } = useFirestore()
const { currentUser } = useAuth()

const postId = route.params.id
const comments = ref([])
const loading = ref(false)
const error = ref('')

const searchQuery = ref('')
const submitting = ref(false)
const newComment = ref({
  name: '',
  body: ''
})

const fetchComments = async () => {
  loading.value = true
  error.value = ''
  try {
    // Query comments associated with the post using the specified condition
    const data = await getCollection('comments', [
      where('postId', '==', postId)
    ])
    
    // Sort comments locally by createdAt
    comments.value = data.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0
      const dateB = b.createdAt?.seconds || 0
      return dateB - dateA
    })
  } catch (err) {
    console.error('Error fetching comments:', err)
    error.value = 'No se pudieron cargar los comentarios.'
  } finally {
    loading.value = false
  }
}

const filteredComments = computed(() => {
  if (!searchQuery.value) return comments.value
  const queryText = searchQuery.value.toLowerCase()
  return comments.value.filter(comment => 
    comment.body?.toLowerCase().includes(queryText) || 
    comment.name?.toLowerCase().includes(queryText)
  )
})

const handleCreateComment = async () => {
  if (!currentUser.value) return
  submitting.value = true
  try {
    const commentData = {
      postId,
      name: newComment.value.name,
      body: newComment.value.body,
      userUid: currentUser.value.uid
    }
    
    const created = await createDocument('comments', commentData)
    comments.value.unshift(created)
    
    // Reset Form
    newComment.value = {
      name: currentUser.value.name,
      body: ''
    }
  } catch (err) {
    console.error('Error adding comment:', err)
    alert('No se pudo publicar tu comentario.')
  } finally {
    submitting.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  if (currentUser.value) {
    newComment.value.name = currentUser.value.name
  }
  fetchComments()
})
</script>

<style scoped lang="scss">
.comments-nested-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Controls */
.comments-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #ececec;
}

.search-box {
  flex-grow: 1;
  max-width: 320px;

  .search-input {
    width: 100%;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0.4rem 0.6rem;
    color: #333333;
    font-size: 0.85rem;

    &:focus {
      border-color: #42b883;
      outline: none;
    }
  }
}

.stats-badge {
  font-size: 0.8rem;
  color: #666666;
  background: #f5f5f5;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  display: flex;
  gap: 0.4rem;

  .divider {
    color: #cccccc;
  }
}

/* Add Comment Form */
.add-comment-form {
  background: #f9f9f9;
  border: 1px solid #ececec;
  padding: 1rem;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    color: #1a1a2e;
  }
}

.comment-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .form-input {
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0.4rem 0.6rem;
    color: #333333;
    font-size: 0.85rem;

    &:focus {
      border-color: #42b883;
      outline: none;
    }
  }

  .form-textarea {
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0.5rem 0.6rem;
    color: #333333;
    font-size: 0.85rem;
    font-family: inherit;
    resize: vertical;

    &:focus {
      border-color: #42b883;
      outline: none;
    }
  }

  .btn {
    align-self: flex-end;
  }
}

.login-prompt {
  text-align: center;
  padding: 0.75rem;
  color: #666666;
  font-size: 0.85rem;

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
}

/* Comments List */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
  background: #ffffff;
  border: 1px solid #ececec;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  align-items: flex-start;
}

.comment-avatar {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.comment-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.comment-author {
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
  color: #1a1a2e;
}

.comment-text {
  margin: 0;
  font-size: 0.85rem;
  color: #333333;
  line-height: 1.4;
  white-space: pre-wrap;
}

.comment-date {
  font-size: 0.7rem;
  color: #777777;
  margin-top: 0.2rem;
}

.btn {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;

  &--primary {
    background: #42b883;
    color: white;
    &:hover { background: #369870; }
  }

  &--secondary-outline {
    background: transparent;
    border: 1px solid #cccccc;
    color: #666666;
    text-decoration: none;
    display: inline-block;
    &:hover { border-color: #42b883; color: #42b883; }
  }
}
</style>
