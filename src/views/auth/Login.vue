<template>
    <div>
        <div class="bg-white rounded-lg shadow-md dark:bg-gray-400 h-full min-h-screen pt-16">

            <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ">
                <div class="px-6 py-4">
                    <div class="flex justify-center mx-auto">
                        <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="">
                    </div>
                    
                    <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>
                    
                    <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>
                    
                    <form @submit.prevent="attemptLogin">
                        <div class="w-full mt-4">
                            <input v-model="loginDetails.email"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="email" placeholder="Email Address" aria-label="Email Address" />
                        </div>
                        
                        <div class="w-full mt-4">
                            <input v-model="loginDetails.password"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password" placeholder="Password" aria-label="Password" />
                        </div>
                        
                        <div class="flex items-center justify-between mt-4">
                            
                            <button
                            class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
            
            <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <span class="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>
                
                <a href="#" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
            </div>
        </div>
        
    </div>
    </div>
</template>

<script setup>
import { BASE_URL } from '../../config';
import { ref } from 'vue';

const loginDetails = ref({
    email: "",
    password: ""
});


const attemptLogin = async () => {

    // const response = await fetch(`${BASE_URL}/login?useCookies=true&useSessionCookies=true`, {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails.value)
    });

    const data = await response.json();

    if (response.status === 200) {

        console.log(data);
        alert("login successful");
        loginDetails.value.email = "";
    }

    else {
        alert("Error logging in, email or password is incorrect");
    }


    loginDetails.value.password = "";
}

</script>

<style lang="scss" scoped></style>