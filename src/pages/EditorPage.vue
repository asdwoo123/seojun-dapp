<template>
  <a-layout-content style="padding: 28px">
    <div class="editor-wrapper">
      <a-button type="primary"> Add project </a-button>
      <a-button type="primary"> Save project </a-button>
      <a-button type="primary"> Reset project </a-button>
      <a-button type="primary"> Change password </a-button>
    </div>
    <a-row :gutter="16">
      <a-col :sm="12" :xl="8" :xxl="6" :key="pi" v-for="(p, pi) in project">
        <a-card class="con-box" style="margin-bottom: 16px" :title="p['name']">
          <template #extra>
            <div class="flex">
              <a-button
                type="primary"
                size="small"
                style="margin-right: 8px; margin-bottom: 8px"
              >
                Add station
              </a-button>
              <a-button type="primary" size="small"> Remove project </a-button>
            </div>
          </template>
          <div class="flex">
            <a-popover trigger="click">
              <template #content>
                <div>
                  <a-input class="project-name-iinput" v-model="p['name']" />
                </div>
              </template>
              <a-button type="primary" size="small" style="margin-right: 8px"
                >Rename</a-button
              >
            </a-popover>
            <a-dropdown-button type="primary" size="small">
              {{ pi + 1 }}st order
              <template #overlay>
                <a-menu> 
                    <a-menu-item v-for="(p, pi) in project" :key="pi">
                        {{ pi + 1 }}st order
                    </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown-button>
          </div>
          <Container>
            <Draggable :key="si" v-for="(s, si) in p['station']" class="draggable-wrapper">
                <div class="flex between draggable">
                    {{ s['name'] }}
                <div class="draggable-button-wrapper">
                    <a-button type="primary">
                        Detail
                    </a-button>
                    <a-button type="danger">
                        Delete
                    </a-button>
                </div>
                </div>
            </Draggable>
          </Container>
        </a-card>
      </a-col>
    </a-row>
    <EditorModal :visible="visible" :okAction="saveStation" :closeAction="modalClose"
    :station="station" :tooltip="tooltip" :ipList="ipList" :netLoading="netLoading" />
  </a-layout-content>
</template>

<script>
import arp from "arp-a";
import { getDB, setDB } from "@/utils/settingDB";
import { Container, Draggable } from "vue3-smooth-dnd";
import { dialog, clipboard } from "@electron/remote";
import EditorModal from "@/components/EditorModal.vue";

const project = getDB("project");
const tooltip = {
  stationName: "스테이션 식별자",
  url: "PLC 아이피 주소 예)192.168.0.1:4840",
  barcode: "바코드 값 노드",
  pcState: "PC에서 PLC로 지속적으로 보내는 생존신호 노드",
  scan: "바코드스캐너에 바코드 값이 입력될때 true 값이 되는 노드",
  pass: "이전 공정이 모두 완료 되었을때 PLC에서 펄스신호로 받을 노드",
  notPass: "이전 공정이 완료가 안되었을때 PLC에서 펄스신호로 받을 노드",
  done: "생산이 완료되었을때 PC로 보내는 완료신호 노드",
  result: "제품의 합/불 여부",
};

export default {
  name: "EditorPage",
  components: {
    Container,
    Draggable,
    EditorModal
},
  computed: {
    darkMode() {
        return this.$store.state.darkMOde;
    }
  },
  data: () => ({
    project,
    password: "",
    changePassword: "",
    formLayout: "vertical",
    station: null,
    projectIndex: 0,
    stationIndex: 0,
    tooltip,
    rock: true,
    ipList: [],
    mode: "",
    visible: false,
    netLoading: false
  }),
  methods: {
    saveStation() {

    },
    modalClose() {

    }
  }
};
</script>

<style>
.editor-wrapper {
  display: flex;
  margin-bottom: 24px;
  justify-content: flex-end;
}
.editor-wrapper > button:not(:last-child) {
  margin-right: 8px;
}
.draggable {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 5px;
  background: #ffffff;
}

.dataItem {
  padding: 3px 0;
}

.label {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 15px;
}

.project-name-input {
  width: 120px;
  margin-right: 10px;
}

.draggable-wrapper {
    margin-bottom: 8px;
    cursor: pointer;
}

.draggable-button-wrapper > button:not(:last-child) {
    margin-right: 8px;
}
</style>
