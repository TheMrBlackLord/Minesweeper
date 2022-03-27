<template>
  <div>
      <div class="row justify-content-center my-5">
         <div class="col-7">
            <form class="filter" @submit.prevent="">
               <input type="text" v-model.trim="filter" class="form-control" placeholder="Filter by username">
            </form>
         </div>
      </div>
      <div class="row justify-content-center">
         <div class="col-11">
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
                     <div class="editable">
                        <span class="value">{{ user.username }}</span>
                        <input type="text" class="edit-field hide" :value="user.username">
                        <button class="btn btn-outline-info edit">Edit</button>
                     </div>
                  </td>
                  <td>
                     <div class="editable">
                        <span class="value">*********</span>
                        <input type="text" class="edit-field hide">
                        <button class="btn btn-outline-info edit">Edit</button>
                     </div>
                  </td>
                  <td>
                     <div class="editable">
                        <span class="value">{{ user.role }}</span>
                        <input type="text" class="edit-field hide" :value="user.role">
                        <button class="btn btn-outline-info edit">Edit</button>
                     </div>
                  </td>
                  <td>{{ formatDate(user.createdAt) }}</td>
               </tr>
            </tbody>
            </table>
            <div v-else class="no-results">No users found</div>
         </div>
      </div>
  </div>
</template>

<script>
import api from '../../../http/api'
import { mapGetters } from 'vuex'

export default {
   data() {
      return {
         users: [],
         isLoading: false,
         filter: ''
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
      }
   },
   computed: {
      ...mapGetters(['user']),
      fetchedUsers() {
         return this.users.filter(user => user.username.includes(this.filter))
      }
   }
}
</script>

<style>

</style>
