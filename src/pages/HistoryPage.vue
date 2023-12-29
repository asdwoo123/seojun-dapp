<template>
  <a-layout-content style="padding: 28px">
    <div class="flex between" style="margin-bottom: 20px">
      <div class="row">
        <a-select :v-model="option" style="width: 120px; margin-right: 10px">
          <a-select-option
            :value="index"
            :key="index"
            v-for="({ name }, index) in project"
          >
            {{ name }}
          </a-select-option>
        </a-select>
        <a-input
          class="search-input"
          placeholder="barcode search"
          @change="searchInput"
        />
      </div>
    </div>
    <DataTable
      ref="dataTable"
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
    >
      <div class="paging-wrapper" v-if="pageCount !== 0">
        <a-pagination
          showQuickJumper
          :current="pageNumber"
          :defaultCurrent="1"
          :total="pageCount"
          @change="pageChange"
        />
      </div>
    </DataTable>
  </a-layout-content>
</template>

<script>
import { dialog } from "@electron/remote";
import { checkDBConnect } from "@/utils/dataDB";
import { loadColumns, loadDataSource } from '@/utils/table';
import moment from "moment";
import { upperFirst } from "lodash";
import { getDB } from "@/utils/settingDB";
import DataTable from "@/components/DataTable";
import bus from '@/utils/bus';

const project = getDB("project");

export default {
  name: "HistoryPage",
  components: { DataTable },
  data: () => ({
    project,
    option: 0,
    search: "",
    period: [],
    loading: true,
    date: [],
    pageNumber: 1,
  }),
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
  },
  mounted() {
    if (checkDBConnect) {
      this.dataInit();
    }
    bus.on("dbConnect", () => {
      this.dataInit();
    });
  },
  methods: {
    dataInit() {
      this.dbConnect = true;
      /* this.columns = loadColumns(this.project);
      loadDataSource(this.project["name"]).then(
        ({dataSource, pageCount}) => {
            this.dataSource = dataSource;
            this.pageCount = pageCount;
            this.loading = false;
        }
      ); */
    },
    searchTable(searchObj) {
        const { name, paging, search, date } = searchObj;
        loadDataSource(name, paging, search, date)
        .then(({dataSource, pageCount}) => {
            this.dataSource = dataSource;
            this.pageCount = pageCount;
            this.loading = false;
        });
    },
    searchInput(e) {
      this.search = e.target.value;
    },
    reset() {},
    pageChange(pageNumber) {
        this.pageNumber = pageNumber;
        this.loading = true;
        console.log(pageNumber)
    }
  },
};
</script>

<style>
.search-input {
  width: 254px;
  margin-bottom: 15px;
  margin-right: 10px;
}
.paging-wrapper {
  float: right;
  margin-top: 15px;
}
</style>
