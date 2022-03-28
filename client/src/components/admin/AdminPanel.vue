<template>
  <div class="admin">
      <div class="row justify-content-center my-5">
         <div class="col-7">
            <form class="filter" @submit.prevent="">
               <input type="text" v-model.trim="filter" class="form-control" placeholder="Filter by username">
            </form>
         </div>
      </div>
      <div class="row justify-content-center">
         <div class="col-11">
            <div class="alert alert-danger"
               style="display: flex; justify-content: space-between;"
               v-for="(error, index) in errors" :key="index">
               {{error}}
               <span @click="removeError(index)">&times;</span>
            </div>
            <div v-if="isLoading" class="loader">
               <span class="spinner-border spinner-border-sm" role="status"></span>
            </div>
            <table v-else-if="fetchedUsers.length > 0" class="table table-striped users">
               <thead>
               <tr>
                  <td scope="col">#</td>
                  <td scope="col">Username</td>
                  <td scope="col">Password</td>
                  <td scope="col">Role</td>
                  <td scope="col">Created</td>
               </tr>
               </thead>
               <tbody>
               <tr v-for="(user, i) in fetchedUsers" :key="user.id">
                  <td>{{ i+1 }}</td>
                  <td>
                     <editable :defaultValue="user.username"
                        :name="'username'"
                        @edited="edited(user.id, $event)"/>
                  </td>
                  <td>
                     <editable :defaultValue="'*********'"
                        :name="'password'"
                        @edited="edited(user.id, $event)"/>
                  </td>
                  <td>
                     <editable :defaultValue="user.role"
                        :name="'role'"
                        @edited="edited(user.id, $event)"/>
                  </td>
                  <td>{{ formatDate(user.createdAt) }}</td>
               </tr>
            </tbody>
            </table>
            <div v-else class="center no-results">No users found</div>
            <div class="center">
               <button class="btn btn-outline-success" v-if="changesIsNotEmpty" @click="saveChanges">Save changes</button>
            </div>
         </div>
      </div>
  </div>
</template>

<script>
import api from '../../../http/api'
import { mapGetters, mapActions } from 'vuex'
import editable from './editable.vue'
import { isEmpty } from 'lodash'

export default {
   components: {editable},
   data() {
      return {
         users: [],
         isLoading: false,
         filter: '',
         changes: {}
      }
   },
   async mounted() {
      this.isLoading = true
      const { data } = await api.get('/user/all')
      this.users = data
      this.isLoading = false
   },
   methods: {
      formatDate(date) {
         return new Date(date).toLocaleString()
      },
      edited(id, data) {
         if (Object.hasOwnProperty.call(this.changes, id)) {
            const [key, value] = Object.entries(data)[0]
            this.changes[id][key] = value
         } else {
            this.changes[id] = data
         }
      },
      async saveChanges() {
         await this.$store.dispatch('saveChanges', this.changes)
         if (this.errors.length === 0) {
            this.changes = {}
         }
      },
      ...mapActions(['removeError']),
   },
   computed: {
      ...mapGetters(['user', 'errors']),
      fetchedUsers() {
         return this.users.filter(({username}) => {
            return username.toLowerCase().includes(this.filter.toLowerCase())
         })
      },
      changesIsNotEmpty() {
         return !isEmpty(this.changes)
      }
   }
}
</script>

<style>

</style>
