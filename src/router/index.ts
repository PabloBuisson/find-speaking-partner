import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../views/NotFound.vue";
import PartnersLists from "@/views/partners/PartnersList.vue";
import { useAuthStore } from "@/stores/auth-store";

// routes
// Lazy loading for routes (recommended way) ↓
const PartnerDetails = () => import("../views/partners/PartnerDetails.vue");
const PartnerRegistration = () =>
  import("../views/partners/PartnerRegistration.vue");
const RequestsReceived = () => import("../views/requests/RequestsReceived.vue");
const UserAuth = () => import("../views/auth/UserAuth.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/partners" },
    {
      path: "/partners",
      name: "partners",
      component: PartnersLists,
    },
    {
      path: "/partners/:id",
      component: PartnerDetails,
      props: true,
    },
    {
      path: "/register",
      component: PartnerRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
  // add automatic scroll to anchor
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      // always scroll to top
      return { top: 0 };
    }
  },
});

router.beforeEach(function (to, _, next) {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useAuthStore();
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.isAuthenticated) {
    next("/partners");
  } else {
    next();
  }
});

export default router;
