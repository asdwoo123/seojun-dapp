<template>
  <MainLayout :class="darkMode ? 'dark-mode' : null" />
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import MainLayout from '@/components/MainLayout.vue';
import { connectOPC } from '@/utils/opcua'

const store = useStore()
const darkMode = computed(() => store.state.darkMode)
onMounted(() => {
  connectOPC()
})

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #353c4e;
  height: 100%;
}
</style>
