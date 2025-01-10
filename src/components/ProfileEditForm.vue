<template>
    <div class="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <!-- <aside class="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div class="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 class="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <a href="#" class="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full">
            Pubic Profile
          </a>
          <a href="#" class="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full">
            Account Settings
          </a>
          <a href="#" class="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            Notifications
          </a>
          <a href="#" class="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            PRO Account
          </a>
        </div>
      </aside> -->
  
      <main class="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div class="p-2 md:p-4">
          <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 class="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
            <div class="grid max-w-2xl mx-auto mt-8">
              <!-- Profile Picture Section -->
              <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  v-if="profilePicUrl"
                  :src="profilePicUrl"
                  alt="Profile Picture"
                  class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                />
                <img
                  v-else
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Default Profile Picture"
                  class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                />
                <div class="flex flex-col space-y-5 sm:ml-8">
                  <!-- Change Picture Button -->
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    @change="handleImageUpload"
                    class="hidden"
                  />
                  <button
                    @click="triggerFileInput"
                    type="button"
                    class="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                  >
                    Change picture
                  </button>
                  <button
                    type="button"
                    class="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                  >
                    Delete picture
                  </button>
                </div>
              </div>
  
              <!-- Profile Information Section -->
              <div class="items-center mt-8 sm:mt-14 text-[#202142]">
                <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div class="w-full">
                    <label for="first_name" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                      Your first name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      v-model="user.firstName"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your first name"
                      required
                    />
                  </div>
  
                  <div class="w-full">
                    <label for="last_name" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                      Your last name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      v-model="user.lastName"
                      class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>
  
                <div class="mb-2 sm:mb-6">
                  <label for="email" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="user.email"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="your.email@mail.com"
                    required
                  />
                </div>
  
                <div class="mb-2 sm:mb-6">
                  <label for="profession" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                    Profession
                  </label>
                  <input
                    type="text"
                    id="profession"
                    v-model="user.profession"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="your profession"
                    required
                  />
                </div>
  
                <div class="mb-6">
                  <label for="message" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                    Bio
                  </label>
                  <textarea
                    id="message"
                    v-model="user.bio"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Write your bio here..."
                  ></textarea>
                </div>
  
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          firstName: 'Jane',
          lastName: 'Ferguson',
          email: 'jane@example.com',
          profession: 'Designer',
          bio: 'A passionate designer with an eye for detail.',
        },
        profilePicUrl: null, // The URL of the current profile picture
      };
    },
    methods: {
      // This method is triggered when the file input changes (i.e., when the user selects a new image)
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profilePicUrl = e.target.result; // Set the profile picture URL to the uploaded image
          };
          reader.readAsDataURL(file); // Convert the file to a base64 URL
        }
      },
      // This method simulates clicking the file input when the 'Change picture' button is clicked
      triggerFileInput() {
        document.getElementById('fileInput').click();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styling if needed */
  </style>
  