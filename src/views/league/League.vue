<template>
    <div>

        <div class="overflow-x-auto md:w-1/2 w-full mx-auto">

<table v-if="leagueTable" class="table md:table-md table-xs border-2 border-white my-12">
  <thead>
    <tr>
      <th>#</th>
      <th>Player</th>
      <th>P</th>
      <th>W</th>
      <th>L</th>
      <th>GF</th>
      <th>GA</th>
      <th>GD</th>
      <th>Points</th>
    </tr>
  </thead>
  <tbody>
    <tr class="hover"
      v-for="(leagueRow, index) in leagueTable" :key="index">
      <th>{{ index+1 }}</th>
      <th> {{ leagueRow.playerDto.name }} </th>
      <th>{{ leagueRow.totalMatches }}</th>
      <th>{{ leagueRow.totalWins }}</th>
      <th>{{ leagueRow.totalMatches - leagueRow.totalWins }}</th>
      <th>{{ leagueRow.points }}</th>
    </tr>
  </tbody>
</table>
</div>


    </div>
</template>

<script setup>
import { BASE_URL } from '../../config';
import { useRoute } from 'vue-router'
import {getLeagueTable} from '../../composables/leaderboard';
import {ref, onMounted} from 'vue';


const route = useRoute()
const leagueTable = ref(null);

onMounted(async () => {
    leagueTable.value = await getLeagueTable(route.params.id);
    console.log(leagueTable.value)
});




</script>

<style lang="scss" scoped>

</style>
