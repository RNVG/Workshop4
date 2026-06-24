<template>
  <div class="todos-page animate-fade-in" v-if="currentUser">
    <div class="page-header">
      <div>
        <h1 class="page-title">Gestor de Tareas</h1>
        <p class="page-subtitle">Administra tus pendientes en tiempo real con Firestore.</p>
      </div>
    </div>

    <!-- Create Todo Inline -->
    <div class="todo-create-card">
      <form @submit.prevent="handleCreateTodo" class="todo-form">
        <input 
          v-model="newTodoTitle" 
          type="text" 
          placeholder="¿Qué tienes planeado hacer hoy?..." 
          required 
          class="todo-input"
        />
        <button type="submit" class="btn btn--primary" :disabled="submitting">
          {{ submitting ? 'Añadiendo...' : '➕ Añadir' }}
        </button>
      </form>
    </div>

    <!-- Search & Indicators Panel -->
    <div class="filter-panel">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Filtrar tareas por título..." 
          class="search-input"
        />
      </div>
      <div class="indicators">
        <span class="badge badge--info">Total: {{ todos.length }}</span>
        <span class="badge badge--success">Visibles: {{ filteredTodos.length }}</span>
      </div>
    </div>

    <!-- Status State for Todos Fetch -->
    <StatusState 
      :loading="loading" 
      :error="error" 
      :isEmpty="todos.length === 0" 
      @refetch="fetchTodos"
    >
      <StatusState :loading="false" :error="''" :isEmpty="filteredTodos.length === 0">
        <div class="todos-list">
          <div 
            v-for="todo in filteredTodos" 
            :key="todo.id" 
            class="todo-item" 
            :class="{ 'todo-item--completed': todo.completed }"
          >
            <div class="todo-item__checkbox" @click="handleToggleTodo(todo)">
              <span class="checkbox-box">
                <span v-if="todo.completed" class="checkmark">✓</span>
              </span>
            </div>
            
            <div class="todo-item__content" @click="handleToggleTodo(todo)">
              <p class="todo-title">{{ todo.title }}</p>
              <span class="todo-status">
                {{ todo.completed ? 'Completado' : 'Pendiente' }}
              </span>
            </div>

            <button 
              @click="handleDeleteTodo(todo.id)" 
              class="btn-delete"
              title="Eliminar tarea"
            >
              🗑️
            </button>
          </div>
        </div>
      </StatusState>
    </StatusState>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFirestore } from '~/composables/useFirestore'
import { useAuth } from '~/composables/useAuth'
import { where } from 'firebase/firestore'
import StatusState from '~/components/StatusState.vue'

// Protect this route with auth middleware
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Mis Tareas | Firebase + Nuxt Workshop',
  meta: [
    { name: 'description', content: 'Administra tus tareas pendientes en Firestore.' }
  ]
})

const { getCollection, createDocument, updateDocument, deleteDocument } = useFirestore()
const { currentUser } = useAuth()

const todos = ref([])
const loading = ref(false)
const error = ref('')

const searchQuery = ref('')
const newTodoTitle = ref('')
const submitting = ref(false)

const fetchTodos = async () => {
  if (!currentUser.value) return
  loading.value = true
  error.value = ''
  try {
    // Only query todos belonging to the authenticated user
    const data = await getCollection('todos', [
      where('userId', '==', currentUser.value.uid)
    ])
    // Sort todos by creation date descending
    todos.value = data.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0
      const dateB = b.createdAt?.seconds || 0
      return dateB - dateA
    })
  } catch (err) {
    console.error('Error fetching todos:', err)
    error.value = 'No se pudieron recuperar las tareas.'
  } finally {
    loading.value = false
  }
}

const filteredTodos = computed(() => {
  if (!searchQuery.value) return todos.value
  const queryText = searchQuery.value.toLowerCase()
  return todos.value.filter(todo => 
    todo.title?.toLowerCase().includes(queryText)
  )
})

const handleCreateTodo = async () => {
  if (!currentUser.value) return
  submitting.value = true
  try {
    const todoData = {
      userId: currentUser.value.uid,
      title: newTodoTitle.value,
      completed: false
    }
    const created = await createDocument('todos', todoData)
    todos.value.unshift(created)
    
    newTodoTitle.value = ''
  } catch (err) {
    console.error('Error creating todo:', err)
    alert('No se pudo guardar la tarea.')
  } finally {
    submitting.value = false
  }
}

const handleToggleTodo = async (todo) => {
  try {
    const targetStatus = !todo.completed
    await updateDocument('todos', todo.id, { completed: targetStatus })
    todo.completed = targetStatus
  } catch (err) {
    console.error('Error updating todo:', err)
    alert('No se pudo actualizar el estado de la tarea.')
  }
}

const handleDeleteTodo = async (id) => {
  try {
    await deleteDocument('todos', id)
    todos.value = todos.value.filter(t => t.id !== id)
  } catch (err) {
    console.error('Error deleting todo:', err)
    alert('No se pudo eliminar la tarea.')
  }
}

onMounted(() => {
  fetchTodos()
})
</script>

<style scoped lang="scss">
.todos-page {
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
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a1a2e;
}

.page-subtitle {
  margin: 0.25rem 0 0 0;
  color: #666666;
}

/* Create Todo Inline Card */
.todo-create-card {
  background: #f9f9f9;
  border: 1px solid #ececec;
  padding: 1rem;
  border-radius: 8px;
}

.todo-form {
  display: flex;
  gap: 1rem;
}

.todo-input {
  flex-grow: 1;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  color: #333333;
  font-size: 0.95rem;
  box-sizing: border-box;

  &:focus {
    border-color: #42b883;
    outline: none;
  }
}

/* Filter Panel */
.filter-panel {
  background: #f9f9f9;
  border: 1px solid #ececec;
  padding: 0.75rem 1rem;
  border-radius: 8px;
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
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #888888;
  }

  .search-input {
    width: 100%;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0.5rem 0.75rem 0.5rem 2rem;
    color: #333333;
    font-size: 0.85rem;
    box-sizing: border-box;

    &:focus {
      border-color: #42b883;
      outline: none;
    }
  }
}

.indicators {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;

  &--info {
    background: #e8f0fe;
    color: #1a73e8;
    border: 1px solid #d2e3fc;
  }

  &--success {
    background: #e6f4ea;
    color: #137333;
    border: 1px solid #ceead6;
  }
}

/* Todos List */
.todos-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todo-item {
  background: #f9f9f9;
  border: 1px solid #ececec;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #42b883;
  }

  &--completed {
    opacity: 0.7;

    .todo-title {
      text-decoration: line-through;
      color: #888888;
    }

    .todo-status {
      color: #137333;
    }
  }

  &__checkbox {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .checkbox-box {
      width: 18px;
      height: 18px;
      border: 1.5px solid #cccccc;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      transition: all 0.2s;
    }

    &:hover .checkbox-box {
      border-color: #42b883;
    }
  }

  &--completed &__checkbox .checkbox-box {
    background: #42b883;
    border-color: #42b883;
  }

  .checkmark {
    color: #ffffff;
    font-weight: bold;
    font-size: 0.75rem;
  }

  &__content {
    flex-grow: 1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .todo-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #333333;
  }

  .todo-status {
    font-size: 0.7rem;
    color: #b06000;
    font-weight: bold;
  }

  .btn-delete {
    background: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;

    &:hover {
      background: #fee8e8;
    }
  }
}

.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;

  &--primary {
    background: #42b883;
    color: white;
    &:hover { background: #369870; }
  }
}
</style>
