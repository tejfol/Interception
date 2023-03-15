import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { NOTIFICATION_TYPES } from '@/constans/notification.js';
import type { Notification } from '@/types/notification';

class Queue {
  constructor() {
    this.elements = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    this.elements.push(element);
    this.tail++;
  }

  dequeue() {
    this.elements.shift();
    this.head++;
  }

  get length() {
    return this.tail - this.head;
  }

  get notifications() {
    return this.elements;
  }

  get isEmpty() {
    return this.length === 0;
  }
}

export const useNotificationStore = defineStore('notification', () => {
  const que = reactive(new Queue());

  const getNotifications = () => {
    return que.notifications;
  };

  function raiseNotification({
    title = 'Something went wrong',
    message = 'You can directly access any getter as a property of the store (exactly like state properties)',
    type = 'SUCCESS'
  }: Notification) {
    que.enqueue({ title, message, type: NOTIFICATION_TYPES[type.toLowerCase()] });

    setTimeout(() => {
      que.dequeue();
    }, 5000);
  }

  return { raiseNotification, getNotifications };
});
