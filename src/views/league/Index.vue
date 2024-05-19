<template>
    <div>

        <div class="overflow-x-auto md:w-1/2 w-full mx-auto my-6">

            
            <h1 class="text-2xl font-bold text-center">My Leagues</h1>
            

            <div class="flex justify-end">
                <Button @click="() => router.push(`/league/find`)" variant="outline" class="bg-blue-500 mt-2">
                    Find new League
                </Button>
            </div>
            
            
            <Table class="mb-16 mt-10">
                <TableCaption>Leagues</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead class="w-[100px]">
                    League Name
                </TableHead>
                <TableHead>Description</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow @click="viewLeagueDetails(leagueRow.id)" v-for="(leagueRow) in leagues" :key="leagueRow.id" class="cursor-pointer">
                <TableCell>{{ leagueRow.name }}</TableCell>
                <TableCell>{{ leagueRow.description }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
    
</div>
    
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {getMyLeagues} from '@/composables/league'
import { useRouter } from 'vue-router'
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

const router = useRouter();
const leagues = ref(null);

onMounted(async () => {
    leagues.value = await getMyLeagues();
    console.log(leagues.value)
});


const viewLeagueDetails = (leagueId) => {
    router.push(`/league/${leagueId}`);
}


</script>

<style lang="scss" scoped>

</style>