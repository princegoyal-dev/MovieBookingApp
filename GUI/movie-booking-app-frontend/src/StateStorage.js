import create from 'zustand'
import {devtools, persist} from 'zustand/middleware'

const Store = (set) => ({
    loginId: "",
    jwtToken: ""
    ,
    addValues: (loginId, jwtToken) => {
        set((state) => ({
            loginId: loginId,
            jwtToken: jwtToken,
        }))
    },
    removeValues: () => {
        set((state) => ({
            loginId: "",
            jwtToken: ""
        }))
    },
})

const useStore = create(
    devtools(
        persist(Store, {
            name: "localStore"
        })
    )
)

export default useStore;