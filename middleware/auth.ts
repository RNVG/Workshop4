import { useAuth } from '~/composables/useAuth'
import { watch } from 'vue'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo ejecutar en el cliente
  if (process.client) {
    const { currentUser, initializing } = useAuth()

    // Si aún se está inicializando el estado de Firebase Auth, esperamos
    if (initializing.value) {
      await new Promise<void>((resolve) => {
        const stopWatch = watch(
          () => initializing.value,
          (isInit) => {
            if (!isInit) {
              stopWatch()
              resolve()
            }
          },
          { immediate: true }
        )
      })
    }

    // Si después de inicializar no hay usuario, redirigir a /login
    if (!currentUser.value) {
      return navigateTo('/login')
    }
  }
})
