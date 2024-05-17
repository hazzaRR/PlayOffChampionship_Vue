<template>
    <div>

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
          <TableRow v-for="(leagueRow, index) in leagueTable" :key="leagueRow.id">
            <TableCell class="font-medium">
              {{ index + 1 }}
            </TableCell>
            <TableCell>{{ leagueRow.name }}</TableCell>
            <TableCell>{{ leagueRow.description }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      

    </div>
</template>

<script setup>

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



</script>

<style lang="scss" scoped>

</style>