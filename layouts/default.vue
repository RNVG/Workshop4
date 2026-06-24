<template>
  <div class="app">
    <AppHeader />
    <ToastNotification />
    <main class="app__container">
      <slot />
    </main>
    <footer class="app__footer">
      <p>&copy; 2026 Nuxt + Firebase Workshop. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup></script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #ffffff;
  color: #333333;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;

  &__container {
    margin: 0 auto;
    padding: 2rem 1rem;
    max-width: 800px;
    width: 100%;
    box-sizing: border-box;
  }

  &__footer {
    text-align: center;
    padding: 1.5rem;
    background: #f5f5f5;
    color: #666;
    font-size: 0.875rem;
    border-top: 1px solid #e5e5e5;
  }
}
</style>


