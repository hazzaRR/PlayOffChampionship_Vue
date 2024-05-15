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
                        <CommandItem v-for="row in leagueTable" :key="row.playerDto.name" :value="row.playerId" @select="(event) => {
                matchDetails.player1Id = event.detail.value;
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
                        <CommandItem v-for="row in leagueTable" :key="row.playerDto.name" :value="row.playerId" @select="(event) => {
                matchDetails.player2Id = event.detail.value;
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

    <p>{{ matchDetails }}</p>
  </div>
</template>

<script setup>
import { BASE_URL } from '@/config'
import { useRoute } from 'vue-router'
import { getLeagueTable } from '@/composables/leaderboard';
import { getLeagueMatchHistory } from '@/composables/matches';
import { ref, onMounted } from 'vue';

import { Check, ChevronsUpDown } from 'lucide-vue-next'
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

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

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

onMounted(async () => {
  leagueTable.value = await getLeagueTable(route.params.id);
  console.log(leagueTable.value)
});




</script>

<style lang="scss" scoped></style>
