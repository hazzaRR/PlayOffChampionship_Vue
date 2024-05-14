<template>
  <div>

    
    <div class="overflow-x-auto md:w-1/2 w-full mx-auto">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">
            Add Match
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add match</DialogTitle>
            <DialogDescription>
              Create a match record for the league
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="player1" class="text-right">
                Player 1
              </Label>
              <Input id="player1" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="player2" class="text-right">
                Player 2
              </Label>
              <Input id="player2" class="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


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
              {{ index + 1 }}
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


      <Table>
        <TableCaption>League Match history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">
              Player 1
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
              {{ index + 1 }}
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
import { getLeagueTable } from '@/composables/leaderboard';
import { getLeagueMatchHistory } from '@/composables/matches';
import { ref, onMounted } from 'vue';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


const route = useRoute();
const leagueTable = ref(null);

onMounted(async () => {
  leagueTable.value = await getLeagueTable(route.params.id);
  console.log(leagueTable.value)
});




</script>

<style lang="scss" scoped></style>
