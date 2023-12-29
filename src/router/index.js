import { createRouter, createWebHistory } from "vue-router";

const routes = [
   {
    path: "/",
    name: "Monitor",
    component: () => import("@/pages/MonitorPage"),
  },
   {
    path: "/monitor",
    name: "Monitor",
    component: () => import("@/pages/MonitorPage"),
  },
  {
    path: "/history",
    name: "History",
    component: () => import("@/pages/HistoryPage"),
  },
  /* {
    path: "/editor",
    name: "Editor",
    component: () => import("@/pages/EditorPage"),
  },
  {
    path: "/log",
    name: "Log",
    component: () => import("@/pages/LogPage"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/pages/SettingPage"),
  }, */
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { router, routes };
