import { defineStore } from "pinia"
import http from "../plugins/axios"
import router from '../router/index'
import { notify } from "@/mixins/notify"

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    token: '',
    user: {},
    loading: false,
  }),
  actions: {
    async login(form){
      this.loading = true
      await http.post('auth/login', form)
        .then(({ data })=> {
          this.setUser(data.data)
          router.push({ path: 'dashboard' })
          this.loading=false
          notify(data.message)
        })
        .catch(err=> {
          console.log("error", err)
          this.loading=false
          notify(err.response.data.message, 'error')
        })
    },

    setUser(data={}){
      this.token = data.token
      this.user = {
        id: data.id,
        name: data.name,
        email: data.email,
      }
    },
  },
  persist: true,
})
