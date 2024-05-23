const manager = {

    path: "/work",
    name: "work",
    component: () => import("../views/Work/index.vue"),
    meta: {
        requiresAuth: true,
        key: "工作監督管理"
    }

}

export default manager