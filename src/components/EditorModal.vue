<template>
    <a-modal :class="(darkMode) ? 'dark-mode' : null" :width="width" @ok="okAction" @cancle="CloseAction" :dialogStyle="dialogStyle">
        <template v-if="station">
            <div class="flex between" style="margin-bottom: 30px;">
                <div class="flex between">
                    <div class="flex" style="margin-right: 19px;">
                        <a-tooltip placement="topLeft" :title="tooliip['stationName']">
                            <div class="dark-label" style="width: 100px;">
                                Station name
                            </div>
                        </a-tooltip>
                        <a-input style="width: 250px;" v-model="station['name']" />
                    </div>
                    <div class="flex" style="margin-right: 19px;">
                        <div class="dark-label" style="width: 100px;">
                            url
                        </div>
                        <a-select style="width: 250px;" v-model="station['url']">
                            <a-select-option :key="ip" v-for="ip in ipList" :value="ip">
                                {{ ip }}
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="flex">
                        <div class="dark-label" style="width: 100px;">
                            port
                        </div>
                    </div>
                    <a-button type="primary" style="margin-left: 20px;" :loading="netLoading">Connect</a-button>
                </div>
                <div style="margin-right: 20px;">
                    <a-button @click="closeAction">Cancel</a-button>
                    <a-button type="primary" style="margin-left: 8px;" @click="okAction">Ok</a-button>
                </div>
            </div>
            <a-row style="margin-bottom: 30px;">
                <a-col :span="6">

                </a-col>
            </a-row>
        </template>
    </a-modal>
</template>

<script>
export default {
  name: "EditorModal",
  props: ["visible", "okAction", "closeAction", "station", "tooltip", "ipList", "netLoading"],
  data: () => ({
    width: 1524,
    dialogStyle: { top: '20px' }
  }),
  computed: {
    darkMode() {
      return this.$store.state.darkMode;
    },
  },
};
</script>

<style></style>
