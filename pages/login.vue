<template>
  <section class="auth-page">
    <h1>Iniciar sesión</h1>

    <div class="auth-card">
      <p>Accede con Google para continuar en el workshop.</p>
      <button @click="login" class="btn btn--primary" :disabled="loading">
        {{ loading ? 'Iniciando...' : 'Iniciar con Google' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </section>
</template>

<script setup>
import { watch, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { currentUser, loginWithGoogle, loading, error, initializing } = useAuth()

const isReady = computed(() => !initializing.value)

const login = async () => {
  await loginWithGoogle()
}

watch([
  currentUser,
  isReady
], ([user, ready]) => {
  if (ready && user) {
    navigateTo('/profile')
  }
})
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2rem;
}

.auth-card {
  width: min(420px, 100%);
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.auth-card h1 {
  margin-bottom: 1rem;
  color: #1a1a2e;
}

.auth-card p {
  color: #555;
  margin-bottom: 1.5rem;
}

.btn {
  &--primary {
    width: 100%;
    background: #42b883;
    color: white;
    border: none;
    padding: 0.9rem 1.25rem;
    border-radius: 999px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  &--primary:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
}

.error-message {
  margin-top: 1rem;
  color: #c62828;
}
</style>
