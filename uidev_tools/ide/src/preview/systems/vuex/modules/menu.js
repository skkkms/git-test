import Axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        menus: [],
        activeMenu: null,
        activeMenuId: null,
        menuDepth: 2
    }),
    mutations: {
        setMenus(state, menus) {
            state.menus = Object.preventExtensions(menus)
        },
        selectMenu(state, menu) {
            state.activeMenu = menu
        },
        releaseMenu(state) {
            state.activeMenu = null
        },
        selectMenuId(state, menuid) {
            state.activeMenuId = menuid
        },
        releaseMenuId(state) {
            state.activeMenuId = null
        },
        setMenuDepth(state, depth) {
            state.menuDepth = depth
        }
    },
    actions: {
        //Getting Menus
        getMenus({commit}) {
            return new Promise(resolve => {
                    const menuRaw = [
            {
                "id": 1,
                "label": "SAMPLE",
                "order": "00000",
                "pageid": "P1"
            },
            {
                "id": 2,
                "label": "SAMPLES",
                "order": "00000",
                "pageid": "P2",
                "parent_id": 1
            },
            {
                "id": 3,
                "label": "Sample1",
                "order": "00000",
                "pageid": "P3",
                "route": "_",
                "parent_id": 2
            },
            {
                "id": 4,
                "label": "Sample2",
                "order": "00000",
                "pageid": "P4",
                "route": "_",
                "parent_id": 2
            },
            {
                "id": 5,
                "label": "TEMPLATE",
                "order": "00000",
                "pageid": "P5"
            },
            {
                "id": 6,
                "label": "COMPLEX",
                "order": "00000",
                "pageid": "P6",
                "parent_id": 5
            },
            {
                "id": 7,
                "label": "Complex01",
                "order": "00000",
                "pageid": "P7",
                "route": "_",
                "parent_id": 6
            },
            {
                "id": 8,
                "label": "Complex02",
                "order": "00000",
                "pageid": "P8",
                "route": "_",
                "parent_id": 6
            },
            {
                "id": 9,
                "label": "SPLIT",
                "order": "00000",
                "pageid": "P9",
                "parent_id": 5
            },
            {
                "id": 10,
                "label": "Sample Page",
                "order": "00000",
                "pageid": "P10",
                "route": "_",
                "parent_id": 9
            },
            {
                "id": 11,
                "label": "Split02",
                "order": "00000",
                "pageid": "P11",
                "route": "_",
                "parent_id": 9
            },
            {
                "id": 12,
                "label": "Split03",
                "order": "00000",
                "pageid": "P12",
                "route": "_",
                "parent_id": 9
            },
            {
                "id": 13,
                "label": "STACK",
                "order": "00000",
                "pageid": "P13",
                "parent_id": 5
            },
            {
                "id": 14,
                "label": "Stack01",
                "order": "00000",
                "pageid": "P14",
                "route": "_",
                "parent_id": 13
            },
            {
                "id": 15,
                "label": "Stack02",
                "order": "00000",
                "pageid": "P15",
                "route": "_",
                "parent_id": 13
            },
            {
                "id": 16,
                "label": "Stack03",
                "order": "00000",
                "pageid": "P16",
                "route": "_",
                "parent_id": 13
            }
        ]
                    commit('setMenus', menuRaw)
                    commit('selectMenuId', 10)
                    resolve()
                }
            )
        }
    },
    getters: {
        menus: state => {

            let menuMap = {}

            state.menus
                .sort((a, b) => {return a.order - b.order})
                .forEach(menu => {
                    menuMap[menu.id] = menu
                })

            // If menu depth is 1, All page menu should be located GNB menus
            if (state.menuDepth == 1) {
                Object.values(menuMap)
                    .forEach(menu => {
                        let parentId = menu.parent_id
                        let parentMenu = null

                        while (parentId) {
                            parentMenu = menuMap[parentId]
                            parentId = parentMenu && parentMenu.parent_id ? parentMenu.parent_id : null
                        }

                        if (parentMenu) menu.parent_id = parentMenu.id
                    })

                Object.values(menuMap)
                    .filter(menu => menu.parent_id && !menu.route)
                    .forEach(menu => delete menuMap[menu.id])
            }

            // Create hierachy structure menu object
            Object.values(menuMap).forEach(menu => {
                if (menu.parent_id) {
                    if (menuMap[menu.parent_id]) {
                        if (!menuMap[menu.parent_id].menus) menuMap[menu.parent_id].menus = []
                        menuMap[menu.parent_id].menus.push(menu)
                    }
                }
            })

            const setFirstRoute = (menu, menus) => {
                for (let i = 0; i < menus.length; i++) {
                    if (menus[i].route) {
                        menu.route = menus[i].route
                        return menus[i].route

                    } else if (menus[i].menus) {
                        const firstRoute = setFirstRoute(menus[i], menus[i].menus)
                        if (firstRoute) {
                            menu.route = firstRoute
                            return firstRoute
                        }
                    }
                }
            }

            Object.values(menuMap).forEach(menu => {
                if (!menu.route && menu.menus)
                    setFirstRoute(menu, menu.menus)
            })

            // Setup all menu data
            return menuMap
        },
        gnbMenus: (state, getters) => {
            return Object.values(getters.menus)
                            .filter(menu => !menu.parent_id)
        },
        activeMenu: (state, getters) => getters.menus[state.activeMenuId],
        activeGnbMenu: (state, getters) => {
            let menu = getters.activeMenu

            if (menu) {
                let parentId = menu.parent_id

                while (parentId) {
                    menu = getters.menus[parentId]
                    parentId = menu && menu.parent_id ? menu.parent_id : null
                }

                return menu

            } else {
                return null
            }
        },
        lnbMenus: (state, getters) => getters.activeGnbMenu ? getters.activeGnbMenu.menus : [],
        activeMenuPath: (state, getters) => {
            let menu = getters.activeMenu

            if (menu) {
                let parentId = menu.parent_id

                const menuPath = []
                menuPath.push(menu.label)

                while (parentId) {
                    menu = getters.menus[parentId]
                    menuPath.splice(0, 0, menu.label)
                    // parentId = menu && menu.parent_id ? menu.parent_id : null
                    parentId = menu.parent_id ? menu.parent_id : null
                }

                return menuPath.join(' > ')

            } else {
                return ''
            }
        }
    }
}