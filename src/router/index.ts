import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import PartnersLists from "@/views/partners/PartnersList.vue";
import { useStore } from "@/stores";

// routes
//const HomeView = () => import("../views/HomeView.vue");
const PartnerDetails = () => import("../views/partners/PartnerDetails.vue");
const PartnerRegistration = () =>
  import("../views/partners/PartnerRegistration.vue");
const ContactPartner = () => import("../views/requests/ContactPartner.vue");
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
      children: [
        { path: "contact", component: ContactPartner }, // /partners/c1/contact
      ],
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
});

router.beforeEach(function (to, _, next) {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useStore();
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
