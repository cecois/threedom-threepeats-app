// Composables
import { createRouter, createWebHistory } from "vue-router";

// const rfunc = (route) => {
//   return {
//     panel: !route.params.panel ? "list" : route.params.panel,
//     query: !route.params.query ? "*:*" : route.params.query,
//     tell: !route.params.telliso ? "$" : route.params.telliso,
//   };
// };

const rfunc = (route) => {
  return {
    panel: route.params.panel,
    query: route.params.query,
    tell: route.params.telliso,
  };
};

const routes = [
  {
    path: "/:panel?/:query?/:telliso?",
    name: "Default",
    component: () => import("@/layouts/default/Default.vue"),
    props: rfunc,
  },
  // {
  //   path: "/:panel/:tell",
  //   component: () => import("@/layouts/default/Default.vue"),
  //   children: [
  //     {
  //       path: "home",
  //       name: "Home",
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () =>
  //         import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  //       props: rfunc,
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
