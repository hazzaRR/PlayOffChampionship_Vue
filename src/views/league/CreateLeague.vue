<template>
    <div class="bg-white rounded-lg shadow-md dark:bg-gray-400 h-full min-h-screen pt-16">
        <!-- <div class="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="max-w-3xl px-6 py-16 mx-auto text-center">
                <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">Create New League</h1>
                <p class="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">Create a new league for you and your
                    mates to track your competitions</p>

            </div>

            <form @submit.prevent="create" class="">
                <div>
                    <label for="leagueName" class="block text-sm text-gray-800 dark:text-gray-200">League Name</label>
                    <input type="text" v-model="leagueDetails.name"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div class="mt-4">
                    <label for="Description" class="block text-sm text-gray-500 dark:text-gray-300">Description</label>

                    <textarea placeholder="lorem..." v-model="leagueDetails.description"
                        class="block mt-2 w-full px-4 h-32 py-2.5 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"></textarea>

                </div>

                <div class="mt-6">
                    <button
                        class="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Create
                    </button>
                </div>
            </form>
        </div> -->
        <Card class="w-[350px] mx-auto">
            <CardHeader>
                <CardTitle>Create League</CardTitle>
                <CardDescription>Create a new virtual league</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div class="grid items-center w-full gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="name">Name</Label>
            <Input  v-model="leagueDetails.name" id="name" placeholder="Name of your league" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="framework">Description</Label>
            <Textarea v-model="leagueDetails.description" placeholder="Type the description of your league for others to see" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button @click="cancel" variant="outline">
        Cancel
      </Button>
      <Button @click="create">Create</Button>
    </CardFooter>
</Card>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { createLeague } from '../../composables/league';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter();



const leagueDetails = ref(
    {
        name: null,
        description: null
    }
);


const create = async () => {
    console.log(leagueDetails.value);

    await createLeague(leagueDetails.value);

    leagueDetails.value = {
        name: null,
        description: null
    };
};

const cancel = () => {
    router.push("/");
}

</script>

<style lang="scss" scoped></style>