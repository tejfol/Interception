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
        class="transition-all w-96 flex items-end px-4 sm:items-start pt-4 pb-2 sm:px-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
          <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
          <transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="notification"
              class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              :class="notification.type">
              <div class="p-4 w-full">
                <div class="flex items-start">
                  <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-base font-medium text-gray-900">{{ notification.title }}</p>
                    <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
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

