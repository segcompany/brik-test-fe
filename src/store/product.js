import { notify, confirm } from "@/mixins/notify"
import http from "@/plugins/axios"
import router from "@/router"
import { defineStore } from "pinia"

export const useProductStore = defineStore('product', {
  state: ()=> ({
    products: [],
    detail: null,
    pageTotal: 10,
    pageCount: 10,
    loading: false,
    count: null,
    categories: [],
  }),
  actions: {
    async getProduct(data={}){
      this.loading = true

      let query =''

      if(data.page){
        query += `page=${data.page}`
      }

      if(data.count){
        this.pageCount = data.count
      }

      if(data.q){
        query = `q=${data.q}`
      }

      query += `&count=${this.pageCount}`


      await http.get(`product?${query}`)
        .then(({ data })=> {
          this.products = data.data.results
          this.pageTotal = data.data.total
        })
        .catch(err => notify(err.response.data.message, 'error'))

      this.loading = false
    },

    async getProductDetail(id){
      await http.get(`product/${id}`)
        .then(({ data })=> {
          this.detail = data.data
        })
        .catch(err => notify(err.response.data.message, 'error'))
    },

    async updateProduct(form){
      this.loading = true

      const formData = new FormData()

      if(form.file){
        formData.append('file', form.file)
      }

      for(const [key, value] of Object.entries(this.detail)){
        if(key != 'image'){
          formData.append(key, value)
        }
      }
      await http.patch(`product/${this.detail.id}`, formData, { headers: {
        'Content-Type': 'multipart/form-data',
      } })
        .then(({ data })=> {
          notify(data.message)
          router.push({ name: 'product' })
        })
        .catch(err => notify(err.response.data.message, 'error'))

      this.loading = false
    },

    async storeProduct(form){
      this.loading = true

      const formData = new FormData()

      if(form.file){
        formData.append('file', form.file)
      }

      for(const [key, value] of Object.entries(this.detail)){
        if(key != 'image'){
          formData.append(key, value)
        }
      }
      await http.post(`product`, formData, { headers: {
        'Content-Type': 'multipart/form-data',
      } })
        .then(({ data })=> {
          notify(data.message)
          router.push({ name: 'product' })
        })
        .catch(err => notify(err.response.data.message, 'error'))

      this.loading = false
    },

    deleteProduct(id){
      confirm(async ()=> {
        await http.delete(`product/${id}`)
          .then(({ data })=> {
            notify(data.message)
          })
          .catch(err => notify(err.response.data.message, 'error'))

        await this.getProduct()
      })
    },

    async getCategory(){
      await http.get('product/category')
        .then(({ data })=> {
          this.categories = data.data.categories
        })
        .catch(err => notify(err.response.data.message, 'error'))

    },

    setDetailDefault(){
      this.detail = {
        name: "",
        categoryName: "",
        length: "",
        height: "",
        weight: "",
        width: "",
        price: "",
        image: "https://firebasestorage.googleapis.com/v0/b/perhitunganair.appspot.com/o/files%2F63hDvLIS87.png?alt=media&token=d6b40dbf-27f0-4604-ab88-cf1c320f0039",
      }
    },
  },
})
