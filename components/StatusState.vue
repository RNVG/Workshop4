<template>
  <div class="status-wrapper">
    <!-- Loading State -->
    <div v-if="loading" class="status-state loading-state">
      <div class="spinner"></div>
      <p class="status-text">Cargando información...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="status-state error-state animate-fade-in">
      <div class="error-icon">⚠️</div>
      <h3 class="status-title">Ha ocurrido un error</h3>
      <p class="status-text">{{ error }}</p>
      <button @click="$emit('refetch')" class="btn btn--danger-outline">
        🔄 Reintentar
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="isEmpty" class="status-state empty-state animate-fade-in">
      <div class="empty-icon">📁</div>
      <h3 class="status-title">Sin resultados</h3>
      <p class="status-text">No hay datos disponibles en esta sección.</p>
      <button @click="$emit('refetch')" class="btn btn--primary-outline">
        🔄 Actualizar
      </button>
    </div>

    <!-- Main Content Slot -->
    <div v-else class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  isEmpty: {
    type: Boolean,
    default: false
  }
})

defineEmits(['refetch'])
</script>

<style scoped lang="scss">
.status-wrapper {
  width: 100%;
}

.status-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 1rem 0;
}

.status-title {
  margin: 0.5rem 0;
  font-size: 1.15rem;
  font-weight: bold;
  color: #333333;
}

.status-text {
  color: #666666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

/* Spinner Animation */
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top-color: #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Icons styling */
.error-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.empty-icon {
  font-size: 2rem;
  color: #999999;
  margin-bottom: 0.5rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;

  &--danger-outline {
    border: 1px solid #d32f2f;
    color: #d32f2f;

    &:hover {
      background: #ffebee;
    }
  }

  &--primary-outline {
    border: 1px solid #42b883;
    color: #42b883;

    &:hover {
      background: #e8f5e9;
    }
  }
}

</style>
