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
                  <router-link class="btn btn-outline-success mx-2" :to="{name: 'login'}">Login</router-link>
                  <router-link class="btn btn-outline-primary" :to="{name: 'register'}">Register</router-link>
               </div>
            </div>
         </div>
      </nav>
   </header>
</template>

<script>
export default {

}
</script>
