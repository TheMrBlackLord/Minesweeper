<template>
  <div>
     <div v-if="isLoading" class="loader">
         <span class="spinner-border spinner-border-sm" role="status"></span>
      </div>
     <div class="no-results" v-else-if="!user">
         <h2>No user found</h2>
     </div>
     <div v-else>
        <div class="row">
           <div class="col-lg-6 col-sm mb-3">
               <div class="card">
                     <div class="card-body">
                     <h5 class="card-title">
                        {{ user.username }}
                        &nbsp;
                        <span class="text-muted">({{user.role}})</span>
                     </h5>
                     <h6 class="card-subtitle mb-2 text-muted">id: {{ user.id }}</h6>
                     </div>
               </div>
           </div>
           <div class="col-lg-6 col-sm">
              <div class="card">
                     <div class="card-body">
                        <h5 class="card-subtitle my-2">
                           Personal best:
                           <span class="badge bg-info">{{ formatTime(gameData.personalBest) }}</span>
                        </h5>
                        <h5 class="card-subtitle my-2">
                           Games:
                           <span class="badge bg-primary">{{ gameData.games.length }}</span>
                        </h5>
                        <h5 class="card-subtitle my-2">
                           Wins:
                           <span class="badge bg-success">{{ gameData.totalWins }}</span>
                        </h5>
                        <h5 class="card-subtitle my-2">
                           Defeats:
                           <span class="badge bg-danger">{{ gameData.totalDefeats }}</span>
                        </h5>
                     </div>
               </div>
           </div>
        </div>
        <div class="row my-5">
             <div class="col">
               <div class="card">
                     <div class="card-body">
                        <h5 class="card-title text-center">Games</h5>
                        <table class="table table-striped table-hover">
                           <thead>
                              <tr>
                                 <th scope="col">#</th>
                                 <th scope="col">Difficulty</th>
                                 <th scope="col">Status</th>
                                 <th scope="col">Time</th>
                                 <th scope="col">Date</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr scope="row" v-for="(game, i) in gameData.games" :key="game.id">
                                 <td>{{ i+1 }}</td>
                                 <td>{{ game.difficulty }}</td>
                                 <td :class="{'bg-danger': !game.isWin, 'bg-success': game.isWin}">
                                    {{ game.isWin ? 'Win' : 'Defeat' }}
                                 </td>
                                 <td>{{ formatTime(game.time) }}</td>
                                 <td>{{ new Date(game.timestamp).toLocaleString() }}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                </div>
             </div>
        </div>
     </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTime } from '../../utils'
import api from '../../../http/api'

export default {
   data() {
      return {
         user: null,
         gameData: null,
         isLoading: false
      }
   },
   async mounted() {
      this.isLoading = true
      const {data} = await api.get(`/user/${this.id}`)
      this.user = data
      if (data) {
         const {data: gameData} = await api.get(`/user/gameData/${this.id}`)
         this.gameData = gameData
      }
      this.isLoading = false
   },
   methods: {
      formatTime(time) {
         return getTime(time)
      }
   },
   computed: {
      ...mapGetters({
         loggedIn: 'user'
      }),
      id() {
         return this.$route.params.id || this.loggedIn.id
      }
   }
}
</script>
