<template>
  <header class="app-header">
    <div class="header-container">
      <NuxtLink to="/" class="app-header__logo">
        <span class="logo-accent">Nuxt</span>Firebase
      </NuxtLink>

      <nav class="app-header__nav">
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/posts">Posts</NuxtLink>
        <NuxtLink to="/albums">Álbumes</NuxtLink>
        <NuxtLink to="/users">Usuarios</NuxtLink>
        <NuxtLink v-if="currentUser" to="/todos">Mis Tareas</NuxtLink>
      </nav>

      <div class="app-header__auth">
        <template v-if="currentUser">
          <NuxtLink to="/profile" class="user-profile-btn">
            <img :src="currentUser.photoURL || '/placeholder-avatar.png'" alt="Avatar" class="user-avatar" />
            <span class="user-name">{{ currentUser.name.split(' ')[0] }}</span>
          </NuxtLink>
          <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
        </template>
        <template v-else-if="!initializing">
          <NuxtLink to="/login" class="btn-login">Iniciar Sesión</NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const { currentUser, logout, initializing } = useAuth()

const handleLogout = async () => {
  await logout()
  navigateTo('/login')
}
</script>

<style lang="scss">
.app-header {
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }

  &__logo {
    font-size: 1.4rem;
    font-weight: 800;
    color: #ffffff;
    text-decoration: none;
    letter-spacing: -0.5px;

    .logo-accent {
      color: #42b883;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      color: #94a3b8;
      padding: 0.5rem 1rem;
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.25s ease;

      &:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.05);
      }

      &.router-link-active {
        color: #42b883;
        background: rgba(66, 184, 131, 0.08);
      }
    }
  }

  &__auth {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.user-profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #f8fafc;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    border: 1.5px solid #42b883;
  }

  .user-name {
    font-size: 0.85rem;
    font-weight: 600;
  }
}

.btn-logout {
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: #ef4444;
  }
}

.btn-login {
  background: #42b883;
  color: #0f172a;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(66, 184, 131, 0.2);

  &:hover {
    background: #369870;
    transform: translateY(-1px);
  }
}
</style>

