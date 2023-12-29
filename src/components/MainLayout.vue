<template>
  <a-layout style="min-height: 100%">
    <a-layout-header>
      <div class="logo-wrapper">
        <img src="@/assets/seojuneng-logo.png" alt="" />
      </div>
      <a-menu class="nav-menu" v-model="currentRoute" mode="horizontal" @click="routeChange">
        <a-menu-item :key="rn" v-for="rn in routeList">
          {{ rn }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <router-view />
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { routes } from '@/router'

const route = useRoute()
const router = useRouter()
const routeNames = routes.slice(1).map((r) => r.name);

const currentRoute = ref([routeNames[0]])
const routeList = ref(routeNames)

function routeChange({ key }) {
  if (route.path === `/${key.toLowerCase()}`) return;
      router.push(`/${key.toLowerCase()}`);
}
</script>

<style>
.nav-menu {
  display: inline-block;
  line-height: 64px;
}
.logo-wrapper {
  float: left;
  text-align: start;
  width: 240px;
}
.logo-wrapper img {
  width: 100px;
}
</style>
