<template>
    <NavBar />
    <section class="bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-500 mb-4">Full-Time</div>
                        <h1 class="text-3xl font-bold mb-4">Senior Vue Developer</h1>
                        <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                            <i class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                            <p class="text-orange-700">Boston, MA</p>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-green-800 text-lg font-bold mb-6">
                            Job Description
                        </h3>
                        <p class="mb-4">
                            We are seeking a talented Front-End Developer to join our team in
                            Boston, MA. The ideal candidate will have strong skills in HTML,
                            CSS, and JavaScript, with experience working with modern
                            JavaScript frameworks such as Vue or Angular.
                        </p>
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-green-500 font-bold">$50</h3>
                            <p class="text-sm text-gray-500 italic">3 days ago</p>
                        </div>
                    </div>
                </main>

                <!-- Sidebar -->
                <aside>
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>

                        <h2 class="text-2xl">NewTek Solutions</h2>

                        <p class="my-2">
                            NewTek Solutions is a leading technology company specializing in
                            web development and digital solutions. We pride ourselves on
                            delivering high-quality products and services to our clients while
                            fostering a collaborative and innovative work environment.
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold">
                            contact@newteksolutions.com
                        </p>

                        <h3 class="text-xl">Contact Phone:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold">555-555-5555</p>
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <button @click.prevent="toggleModal()"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Apply</button>
                    </div>
                </aside>
            </div>
        </div>

<!-- modal -->
        <div v-if="showModal" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
            <div class="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-1/3">
                <h2 class="text-2xl font-bold text-green-800 mb-6">Apply for Senior Vue Developer</h2>
                <form>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email"
                            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    </div>

                    <div class="mb-4">
                        <label for="resume" class="block text-sm font-medium text-gray-700">Resume (PDF)</label>
                        <input type="file" id="resume" name="resume" accept="application/pdf"
                            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    </div>

                    <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
                        Submit Application
                    </button>
                </form>
                <button @click.prevent="toggleModal()" class="mt-4 text-center w-full text-red-500 font-bold">
                    Cancel
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        }
    },
    components: {
        NavBar
    }
}
</script>

<style scoped>

</style>
