<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useNotificationStore } from '@/stores/notification';
const notificationStore = useNotificationStore();

</script>

<template>
  <div>
    <header>
      <nav class="flex gap-4 p-4">
        <router-link to="/">Home</router-link>
        <router-link to="login">Login</router-link>
      </nav>
    </header>
    <div class="absolute top-0 right-0 flex flex-col h-screen z-50 pointer-events-none overflow-hidden">
      <div v-for="notification in notificationStore.getNotifications()" :key="notification.index" aria-live="assertive"
        class="w-96 flex items-end px-4 sm:items-start py-4 sm:px-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
          <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
          <transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="notification"
              class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="p-4 w-full">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <p class="h-6 w-6 rounded-full bg-red-600" aria-hidden="true"></p>
                  </div>
                  <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium text-gray-900">{{ notification.message }}</p>
                    <p class="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
                  </div>
                  <div class="ml-4 flex flex-shrink-0">
                    <button type="button"
                      class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span class="sr-only">Close</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <RouterView />
  </div>
</template>

