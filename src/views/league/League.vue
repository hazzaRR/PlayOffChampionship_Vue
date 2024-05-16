<template>
  <div>

    <Toaster />


    <div class="overflow-x-auto md:w-1/2 w-full mx-auto">
      <h1 v-if="leagueTable" class="font-bold text-2xl text-center mt-6">{{ leagueTable[0].leagueDto.name }}</h1>
      <h2 v-if="leagueTable" class="font-mediym text-lg text-center">{{ leagueTable[0].leagueDto.description }}</h2>

      
      
      <Table v-if="leagueTable" class="mb-16 mt-10">
        <TableCaption>League Table</TableCaption>
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
      
      <Dialog class="">
        <div class="flex justify-end">
        <DialogTrigger as-child class="flex justify-end">
          <Button variant="outline" class="bg-blue-500 justify-end">
            Add Match
          </Button>
        </DialogTrigger>
        </div>
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
              <Popover v-model:open="openSelectPlayer1">
                <PopoverTrigger as-child>
                  <Button variant="outline" role="combobox" :aria-expanded="openSelectPlayer1"
                    class="w-[200px] justify-between">
                    {{ matchDetails.player1Id
                ? leagueTable.find((row) => row.playerDto.name === matchDetails.player1Dto.name)?.playerDto.name
                : "Select Player..." }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[200px] p-0">
                  <Command>
                    <CommandInput class="h-9" placeholder="Select Player" />
                    <CommandEmpty>No Players found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem v-for="row in leagueTable" :key="row.playerDto.name" :value="row.playerDto.name" @select="(event) => {
                matchDetails.player1Id = row.playerId;
                matchDetails.player1Dto = row.playerDto;
                openSelectPlayer1 = false
              }">
                          {{ row.playerDto.name }}
                          <Check :class="cn(
                'ml-auto h-4 w-4',
                matchDetails.player1Dto === row.playerDto ? 'opacity-100' : 'opacity-0',
              )" />
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="player1" class="text-right">
                Goals
              </Label>
                <Input v-model="matchDetails.player1Score"  type="number" placeholder="0" />
            </div>


            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="player2" class="text-right">
                Player 2
              </Label>

              <Popover v-model:open="openSelectPlayer2">
                <PopoverTrigger as-child>
                  <Button variant="outline" role="combobox" :aria-expanded="openSelectPlayer2"
                    class="w-[200px] justify-between">
                    {{ matchDetails.player2Id
                ? leagueTable.find((row) => row.playerDto.name === matchDetails.player2Dto.name)?.playerDto.name
                : "Select Player..." }}
                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[200px] p-0">
                  <Command>
                    <CommandInput class="h-9" placeholder="Select Player" />
                    <CommandEmpty>No Players found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem v-for="row in leagueTable" :key="row.playerDto.name" :value="row.playerDto.name" @select="(event) => {
                matchDetails.player2Id = row.playerId;
                matchDetails.player2Dto = row.playerDto;
                openSelectPlayer2 = false
              }">
                          {{ row.playerDto.name }}
                          <Check :class="cn(
                'ml-auto h-4 w-4',
                matchDetails.player2Dto === row.playerDto ? 'opacity-100' : 'opacity-0',
              )" />
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="player2" class="text-right">
                Goals
              </Label>
                <Input v-model="matchDetails.player2Score" type="number" placeholder="0" />
            </div>


          </div>
          <DialogFooter>
            <DialogClose as-child>
            <Button @click="addMatchBtn" type="submit">
              Create
            </Button>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table v-if="matchHistory">
        <TableCaption>League Match history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Match Date</TableHead>
            <TableHead>Player 1</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Player 2</TableHead>
            <TableHead>Winner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(match) in matchHistory" :key="match.id">
            <TableCell>{{ new Date(match.matchDate).toLocaleDateString() }}</TableCell>
            <TableCell >{{ match.player1.name }}</TableCell>
            <TableCell>{{ match.player1Score }} - {{ match.player2Score }}</TableCell>
            <TableCell >{{ match.player2.name }}</TableCell>
            <TableCell class="font-medium" >{{ match.winner.name }}</TableCell>
            <TableCell>
              <Trash2 class="hover:bg-slate-600 hover:bg-opacity-25 m-2 rounded-md text-red-600" @click="deleteMatch(match.id) "/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getLeagueTable } from '@/composables/leaderboard';
import { getLeagueMatchHistory, addMatchResult, deleteMatchResult } from '@/composables/matches';
import { ref, onMounted } from 'vue';

import { Check, ChevronsUpDown, Trash2 } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
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
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'


import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const { toast } = useToast()

const openSelectPlayer1 = ref(false);
const openSelectPlayer2 = ref(false);
const matchDetails = ref({
  player1Id: null,
  player1Dto: null,
  player1Score: 0,
  player2Id: null,
  player2Dto: null,
  player2Score: 0
})


const route = useRoute();
const leagueTable = ref(null);
const matchHistory = ref(null);

onMounted(async () => {
  leagueTable.value = await getLeagueTable(route.params.id);
  console.log(leagueTable.value)
  matchHistory.value = await getLeagueMatchHistory(route.params.id);
});


const addMatchBtn = async () => {

  const response = await addMatchResult(matchDetails.value, route.params.id);

  if (response) {
    matchDetails.value = {
      player1Id: null,
      player1Dto: null,
      player1Score: 0,
      player2Id: null,
      player2Dto: null,
      player2Score: 0
    }

    toast({
        title: "New Match Record",
        description: 'New Match result has been added',
      });

      leagueTable.value = await getLeagueTable(route.params.id);
      matchHistory.value = await getLeagueMatchHistory(route.params.id);
  }
};


const deleteMatch = async (matchId) => {

  console.log(matchId)

  const response = await deleteMatchResult(matchId);

  if (response) {
    toast({
        title: "Match deleted",
        description: `Match result with the id ${matchId} was deleted`,
      });

      leagueTable.value = await getLeagueTable(route.params.id);
      matchHistory.value = await getLeagueMatchHistory(route.params.id);

  }

};



</script>

<style lang="scss" scoped></style>
