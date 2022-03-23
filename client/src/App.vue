<template>
  <div>
    <Header />
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  mounted() {
    this.$store.dispatch('fetchUser')
  }
}
</script>

