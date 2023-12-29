<template>
  <div
    v-if="dbConnect"
    class="con-box"
    style="padding: 24px 16px; background-color: white; overflow-x: scroll"
  >
    <a-table :bordered="true" :pagination="false" :data-source="dataSource">
      <template :key="cIndex" v-for="(column, cIndex) in columns">
        <a-table-column v-if="cIndex < 3" :key="column['dataIndex']" :title="column['title']" :data-index="column['dataIndex']">
            <template #tittle>
                <div>{{ column['title'] }}</div>
            </template>
        </a-table-column>
        <a-table-column-group v-else >
            <template #title>
                <span style="white-space: nowrap;">
                    {{ column['title'] }}
                </span>
            </template>
            <a-table-column :data-index="d['dataIndex']" :key="d['key']" v-for="(d) in column['children']">
                <template #title>
                    <span>{{ d['title'] }}</span>
                </template>
                <template #bodyCell="{ record }">
                    <div>{{ record }}</div>
                </template>
            </a-table-column>
        </a-table-column-group>
      </template>
    </a-table>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "DataTable",
  props: ["columns", "dataSource", "loading"],
};
</script>

<style>
</style>
