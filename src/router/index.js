import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: import("../components/Home.vue"),
    },
    {
      path: "/apintegration",
      name: "apintegration",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/APIntegration.vue"),
    },

    {
      path: "/property-admin",
      name: "propertyadmin",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/PropertyAdmin.vue"),
    },

    {
      path: "/manage-property",
      name: "manageproperty",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/ManageProperty.vue"),
    },

    {
      path: "/manage-property/:id/edit",
      name: "EditProperty",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/EditProperty.vue"),
     
    },

    {
      path: "/api-property",
      name: "ApiProperty",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/ApiProperty.vue"),
     
    },
  ],
});

export default router;
