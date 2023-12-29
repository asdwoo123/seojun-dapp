<template>
  <div v-if="project">
    <div class="flex">
        <div class="project-title">
            {{ project['name'] }}
        </div>
    </div>
    <a-row type="flex" :gutter="16">
        <a-col :xs="24" :sm="24" :md="12" :lg="6" style="padding-bottom: 16px;" :key="index" v-for="(stationData, index) in stationsData">
            <a-card class="con-box" :title="stationsData['stationName']">
                <template #extra>
                    <div class="flex center-v">
                        <a-button @click="showHistory(stationsData['stationName'])">
                        History
                    </a-button>
                    <div :class="(stationsData['state']) ? 'led-green' : 'led-red'" />
                    </div>
                </template>
                <p class="flex between">
                    <span class="key-box">Barcode</span>
                    <span class="val-box">{{ stationsData['barcode'] }}</span>
                </p>
                <p class="flex between">
                    <span class="key-box">Update date</span>
                    <span class="val-box">{{ stationsData['updateAt'] }}</span>
                </p>
                <p class="flex between" :key="i" v-for="(n, i) in stationsData['node']">
                    <span class="key-box">{{ n['name'] }}</span>
                    <span class="val-box">{{ n['value'] }}</span>
                </p>
            </a-card>
        </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const project = defineProps(['project'])
const stationsData = defineProps(['stationsData'])

function showHistory(stationName) {
    
}
</script>

<style>
.key-box {
  font-weight: 600;
}

.val-box {
  font-weight: 400;
  color: #000000;
}

p {
    padding-bottom: 8px;
}
</style>