<template>
  <div class="leaders">
     <div class="row">
        <div class="col-9">
            <h3 class="title text-center">Leaderboard</h3>
            <div v-if="isLoading" class="loader">
               <span class="spinner-border spinner-border-sm" role="status"></span>
            </div>
            <table v-else class="table table-striped">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Username</th>
                     <th scope="col">Time</th>
                     <th scope="col">Wins</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(leader, i) in leaders" :key="leader.id">
                     <th scope="row">{{ i+1 }}</th>
                     <td>{{ leader.username }}</td>
                     <td>{{ formatTime(leader.gameData.personalBest) }}</td>
                     <td>{{ leader.gameData.totalWins }}</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div class="col-3">
            <div class="leader-count">
               <h6 class="title text-center">Count of leaders</h6>
               <select class="form-select" v-model.number="leadersCount">
                  <option value="5">5</option>
                  <option value="10">10</option>
               </select>
            </div>
         </div>
      </div>
  </div>
</template>

<script>
import api from '../../../http/api'

export default {
   name: 'Leaders',
   data() {
      return {
         leadersCount: 5,
         leaders: [],
         isLoading: false
      }
   },
   watch: {
      leadersCount() {
         this.getLeaders()
      }
   },
   mounted() {
      this.getLeaders()
   },
   methods: {
      formatTime(time) {
         let hours = Math.floor(time / 3600)
         let minutes = Math.floor((time - hours * 3600) / 60)
         let seconds = time - hours * 3600 - minutes * 60
         hours = hours < 10 ? '0' + hours : hours
         minutes = minutes < 10 ? '0' + minutes : minutes
         seconds = seconds < 10 ? '0' + seconds : seconds
         return `${hours}:${minutes}:${seconds}`
      },
      async getLeaders() {
         this.isLoading = true
         const { data } = await api.get('/user/all')
         const length = data.length < this.leadersCount ? data.length : this.leadersCount
         const users = await Promise.all(data.slice(0, length)
            .map(async (user) => {
               const { data: gameData } = await api.get(`/user/gameData/${user.id}`)
               return {...user, gameData}
            })
         )
         const leaders = users
            .filter(user => user.gameData.totalWins > 0)
            .sort((a, b) => {
               a.gameData.totalWins - b.gameData.totalWins
            })
         this.isLoading = false
         this.leaders = leaders
      }
   }
}
</script>
