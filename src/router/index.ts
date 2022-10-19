import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

import { useAuthStore } from "@/stores/auth-store";
import PartnersLists from "@/views/partners/PartnersList.vue";
import NotFound from "../views/NotFound.vue";

// routes
// Lazy loading ↓
const PartnerDetails = defineAsyncComponent(
  () => import("../views/partners/PartnerDetails.vue")
);
const PartnerRegistration = defineAsyncComponent(
  () => import("../views/partners/PartnerRegistration.vue")
);
const RequestsReceived = defineAsyncComponent(
  () => import("../views/requests/RequestsReceived.vue")
);
const UserAuth = defineAsyncComponent(
  () => import("../views/auth/UserAuth.vue")
);

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
    } else {
      return {
        el: to.hash,
        behavior: "smooth",
      };
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
