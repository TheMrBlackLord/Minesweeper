<template>
  <div class="leaders">
     <div class="row">
        <div class="col-9">
            <h3 class="title text-center">Leaderboard</h3>
            <div v-if="isLoading" class="loader">
               <span class="spinner-border spinner-border-sm" role="status"></span>
            </div>
            <table v-else class="table table-striped leaders-table">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col" class="can-sorted" ref="sort1" @click="sort($event, 'username')">Username</th>
                     <th scope="col" class="can-sorted" ref="sort2" @click="sort($event, 'gameData.personalBest')">Time</th>
                     <th scope="col" class="can-sorted desc" ref="sort3" @click="sort($event, 'gameData.totalWins')">Wins</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(leader, i) in sortedLeaders" :key="leader.id">
                     <th scope="row">{{ i+1 }}</th>
                     <td>
                        <router-link :to="{name: 'userProfile', params: {id: leader.id}}">{{ leader.username }}</router-link>
                     </td>
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
import { get, forIn } from 'lodash'
import { getTime } from '../../utils.js'

export default {
   name: 'Leaders',
   data() {
      return {
         leadersCount: 5,
         leaders: [],
         isLoading: false,
         sortBy: 'wins',
         sortDir: 'desc'
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
         return getTime(time)
      },
      sort(e, by) {
         if(by === this.sortBy) {
            this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'
         } else {
            this.sortDir = 'desc'
         }
         
         forIn(this.$refs, element => {
            element.classList.remove('asc', 'desc')
         })
         e.target.classList.add(this.sortDir)

         this.sortBy = by
      },
      async getLeaders() {
         this.isLoading = true
         const { data } = await api.get('/user/all')
         const users = await Promise.all(data
            .map(async (user) => {
               const { data: gameData } = await api.get(`/user/gameData/${user.id}`)
               return {...user, gameData}
            })
         )
         const length = data.length < this.leadersCount ? data.length : this.leadersCount
         const leaders = users
            .filter(user => user.gameData.totalWins > 0)
            .slice(0, length)
         this.isLoading = false
         this.leaders = leaders
      }
   },
   computed: {
      sortedLeaders() {
         return [...this.leaders].sort((a, b) => {
            const valueA = get(a, this.sortBy)
            const valueB = get(b, this.sortBy)
            if(this.sortDir === 'asc') {
               return valueA > valueB ? 1 : -1
            } else {
               return valueA < valueB ? 1 : -1
            }
         })
      }
   }
}
</script>
