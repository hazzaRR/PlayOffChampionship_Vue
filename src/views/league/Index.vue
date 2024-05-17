<template>
    <div>

        <div class="overflow-x-auto md:w-1/2 w-full mx-auto">

            
            <p>This is a page for just the leagues</p>
            
            
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
            <TableRow v-for="(leagueRow, index) in leagues" :key="leagueRow.id">
                <TableCell class="font-medium">
                    {{ index + 1 }}
                </TableCell>
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


const leagues = ref(null);

onMounted(async () => {
    leagues.value = await getMyLeagues();
    console.log(leagues.value)
});



</script>

<style lang="scss" scoped>

</style>