<template>
  <a-layout style="height: 100%;">
    <a-layout-sider style="width: 200px;">
        <a-menu v-model="projectIndex">
            <a-menu-item :key="index" v-for="(name, index) in projectsName">
                <span>{{ name }}</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>    
    <a-layout-content style="padding: 28px;">
        <MonitorDetail :project="project" :stationsData="stationsData" />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getProjects } from '@/utils/settingDB';
import { useStore } from 'vuex'
import MonitorDetail from '@/components/MonitorDetail.vue';

const store = useStore()

const projectsData = getProjects();

const projects = ref(projectsData)
const projectsName = ref(projectsData.map(p => p.name));
const projectIndex = ref([0])
const project = computed(() => projects.value[projectIndex.value[0]])
const stationsData = computed(() => store.commit.state.stationsData.filter(sd => sd.stationName === projectsName.value[projectIndex.value]))
</script>

<style>

</style>