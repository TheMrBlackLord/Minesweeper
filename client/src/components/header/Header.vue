<template>
   <header class="header">
      <nav class="navbar navbar-expand-md navbar-light bg-light">
         <div class="container">
            <router-link class="navbar-brand" :to="{name: 'home'}">Minesweeper</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header-navbar" aria-controls="header-navbar" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="header-navbar">
               <ul class="navbar-nav me-auto mb-lg-0">
                  <li class="nav-item">
                     <a class="nav-link" aria-current="page" href="#">Rules</a>
                  </li>
               </ul>
               <div class="d-flex me-1">
                  <div v-if="user">
                     <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" id="user-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                           {{user.username}}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="user-dropdown">
                           <li><router-link :to="{name: 'profile'}" class="dropdown-item">Profile</router-link></li>
                           <li><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                     </div>
                  </div>
                  <div v-else>
                     <router-link v-if="route !== 'login'" class="btn btn-outline-success mx-2" :to="{name: 'login'}">Login</router-link>
                     <router-link v-if="route !== 'register'" class="btn btn-outline-primary" :to="{name: 'register'}">Register</router-link>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   computed: {
      ...mapGetters(['user']),
      route() {
         return this.$route.name
      }
   }
}
</script>
