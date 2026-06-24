<template>
  <NuxtLayout>
    <div class="firebase-status-banner" v-if="isClient">
      <div class="status-container">
        <!-- Auth Status -->
        <div class="status-item">
          <span class="status-dot" :class="{ 'dot-active': !initializing, 'dot-pending': initializing }"></span>
          <span class="status-label">Auth:</span>
          <span class="status-value" v-if="initializing">Conectando...</span>
          <span class="status-value" v-else-if="currentUser">Conectado como <strong>{{ currentUser.name }}</strong></span>
          <span class="status-value" v-else>Listo (Sin sesión)</span>
        </div>

        <!-- Divider -->
        <span class="status-divider">|</span>

        <!-- Firestore Status -->
        <div class="status-item">
          <span class="status-dot" :class="{ 'dot-active': firestoreConnected === true, 'dot-error': firestoreConnected === false, 'dot-pending': firestoreConnected === null }"></span>
          <span class="status-label">Firestore:</span>
          <span class="status-value">{{ firestoreStatus }}</span>
        </div>
      </div>
    </div>

    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useFirebase } from '~/composables/useFirebase'
import { collection, getDocs, limit, query } from 'firebase/firestore'

const { currentUser, initializing } = useAuth()
const isClient = ref(false)

const firestoreConnected = ref(null) // null = pending, true = success, false = error
const firestoreStatus = ref('Conectando...')

onMounted(async () => {
  isClient.value = true

  // Verificación de conexión a Firebase y Firestore
  try {
    const { firestore } = useFirebase()
    if (!firestore) {
      firestoreConnected.value = false
      firestoreStatus.value = 'Firestore no disponible'
      return
    }

    // Intentamos hacer un llamado a la colección 'posts' configurada en el workshop
    const postsRef = collection(firestore, 'posts')
    const q = query(postsRef, limit(1))
    await getDocs(q)

    firestoreConnected.value = true
    firestoreStatus.value = 'Conectado exitosamente'
  } catch (error) {
    console.error('Error al conectar con Firestore:', error)
    firestoreConnected.value = false
    firestoreStatus.value = `Error de conexión: ${error.message || error}`
  }
})
</script>

<style scoped>
.firebase-status-banner {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-bottom: 2px solid #334155;
  color: #f8fafc;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.status-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-label {
  color: #94a3b8;
  font-weight: 500;
}

.status-value {
  color: #e2e8f0;
}

.status-divider {
  color: #475569;
  user-select: none;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}

.dot-active {
  background-color: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.dot-pending {
  background-color: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot-error {
  background-color: #ef4444;
  box-shadow: 0 0 8px #ef4444;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}
</style>

