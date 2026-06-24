<template>
  <section class="profile-page">
    <div class="profile-card" v-if="user">
      <div class="profile-header">
        <img v-if="user.photoURL" :src="user.photoURL" alt="Avatar" />
        <div>
          <h1>{{ user.name }}</h1>
          <p>{{ user.email }}</p>
        </div>
      </div>

      <div class="profile-actions">
        <button class="btn btn--secondary" @click="logout">Cerrar sesión</button>
      </div>
    </div>

    <div v-else class="loading-state">
      <p>Verificando sesión...</p>
    </div>
  </section>
</template>

<script setup>
import { watch } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { currentUser, logout, initializing } = useAuth()
const user = currentUser

watch([
  initializing,
  user
], ([ready, current]) => {
  if (ready && !current) {
    navigateTo('/login')
  }
})
</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2rem;
}

.profile-card {
  width: min(520px, 100%);
  background: #ffffff;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.profile-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.profile-header img {
  width: 84px;
  height: 84px;
  border-radius: 999px;
  object-fit: cover;
}

.profile-header h1 {
  margin: 0 0 0.25rem;
  color: #1a1a2e;
}

.profile-header p {
  margin: 0;
  color: #555;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  &--secondary {
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #1a1a2e;
    padding: 0.85rem 1.25rem;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  &--secondary:hover {
    background: #e8f0f3;
  }
}

.loading-state {
  color: #555;
  font-size: 1rem;
}
</style>
