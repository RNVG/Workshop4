<template>
  <div class="user-todos-nested animate-slide-down">
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="todos.length === 0" 
      @refetch="fetchUserTodos"
    >
      <div class="nested-todos-list">
        <div 
          v-for="todo in todos" 
          :key="todo.id" 
          class="nested-todo-item"
          :class="{ 'nested-todo-item--completed': todo.completed }"
        >
          <span class="status-marker">
            {{ todo.completed ? '✅' : '⏳' }}
          </span>
          <div class="todo-info">
            <span class="todo-title">{{ todo.title }}</span>
            <span class="todo-label">{{ todo.completed ? 'Completada' : 'Pendiente' }}</span>
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

const todos = ref([])
const loading = ref(false)
const error = ref('')

const fetchUserTodos = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await getCollection('todos', [
      where('userId', '==', userId)
    ])
    todos.value = data.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0
      const dateB = b.createdAt?.seconds || 0
      return dateB - dateA
    })
  } catch (err) {
    console.error('Error fetching user todos:', err)
    error.value = 'No se pudieron recuperar las tareas del usuario.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserTodos()
})
</script>

<style scoped lang="scss">
.user-todos-nested {
  width: 100%;
}

.nested-todos-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nested-todo-item {
  background: #111827;
  border: 1px solid var(--border-color);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;

  &--completed {
    opacity: 0.7;

    .todo-title {
      text-decoration: line-through;
      color: var(--text-secondary);
    }

    .todo-label {
      color: #42b883;
    }
  }

  .status-marker {
    font-size: 1.2rem;
  }

  .todo-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .todo-title {
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .todo-label {
    font-size: 0.75rem;
    color: #f59e0b;
    font-weight: 700;
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
