<template>
    <div>

        <div class="overflow-x-auto md:w-1/2 w-full mx-auto">

<!-- <table v-if="leagueTable" class="table md:table-md table-xs border-2 border-white my-12">
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
</table> -->

<Table>
    <TableCaption>League Table Name</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Position
        </TableHead>
        <TableHead>Player</TableHead>
        <TableHead>Matches Played</TableHead>
        <TableHead>Wins</TableHead>
        <TableHead>Losses</TableHead>
        <TableHead class="text-right">Points</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(leagueRow, index) in leagueTable" :key="leagueRow.id">
        <TableCell class="font-medium">
          {{ index+1}}
        </TableCell>
        <TableCell>{{ leagueRow.playerDto.name }}</TableCell>
        <TableCell>{{ leagueRow.totalMatches }}</TableCell>
        <TableCell>{{ leagueRow.totalWins }}</TableCell>
        <TableCell>{{ leagueRow.totalMatches - leagueRow.totalWins }}</TableCell>
        <TableCell class="text-right">
          {{ leagueRow.points }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>


    </div>
</template>

<script setup>
import { BASE_URL } from '@/config'
import { useRoute } from 'vue-router'
import {getLeagueTable} from '@/composables/leaderboard';
import {ref, onMounted} from 'vue';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'


const route = useRoute();
const leagueTable = ref(null);

onMounted(async () => {
    leagueTable.value = await getLeagueTable(route.params.id);
    console.log(leagueTable.value)
});




</script>

<style lang="scss" scoped>

</style>
