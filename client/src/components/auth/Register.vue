<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div class="alert alert-danger"
              style="display: flex; justify-content: space-between;"
              v-for="(error, index) in errors" :key="index">
              {{error}}
              <span @click="removeError(index)">&times;</span>
            </div>
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Enter username" v-model.trim="form.username">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control"
                  id="password" placeholder="Password"
                  v-model="form.password" autocomplete="current-password">
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                Register
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loading: false
    }
  },
  methods: {
    async submit() {
      if (this.form.username && this.form.password) {
        this.loading = true
        await this.$store.dispatch('register', this.form)
        this.loading = false
        if (this.errors.length === 0) {
          this.$router.push({name: 'home'})
        }
      } else {
        this.pushError("Please fill all fields")
      }
    },
    ...mapActions(['pushError', 'removeError']),
  },
  computed: {
    ...mapGetters(['errors'])
  }
}
</script>
