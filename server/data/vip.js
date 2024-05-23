module.exports = {
    menus: [
        {
            path: "/",
            name: "首頁",
            icon: "Document"
        },
        {
            path: "/project",
            name: "項目基礎信息",
            icon: "Discount"
        },
        {
            path: "/tunnel",
            name: "隧道設計信息",
            icon: "Picture"
        },
        {
            path: "/build",
            name: "施工監控檢測",
            icon: "Filter",
            children:[
                {
                    path:"/plan",
                    name:"檢測計劃"
                },
                {
                    path:"/section",
                    name:"切面檢測"
                }
            ]
        },
        {
            path: "/geological",
            name: "超前地質預報",
            icon: "ShoppingTrolley"
        },
        {
            path: "/system",
            name: "系统信息管理",
            icon: "Wallet"
        }
    ]
}
