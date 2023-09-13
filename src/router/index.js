import { createRouter, createWebHistory } from "vue-router";

export const isLoggedIn = () => {
	return localStorage.getItem("token");
};

const routes = [
	{
		path: "/login",
		name: "login",
		component: () => import("../views/Auth/LoginPage.vue"),
	},
	{
		path: "/private",
		component: () => import("../views/private/PrivatePage.vue"),
		beforeEnter(to, from, next) {
			if (isLoggedIn()) {
				next();
			} else {
				next("/login");
			}
		},
		children: [
			{
				path: "/",
				name: "DashBoard",
				component: () => import("../views/private/pages/DashBoard.vue"),
			},
			// Wildcard route for 404
			{
				path: "/:catchAll(.*)",
				component: () => import("../views/private/pages/404Page.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
