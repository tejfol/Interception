import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

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

  function raiseNotification(message: String = 'Something went wrong', type: String = 'error') {
    que.enqueue({ message, type });
    setTimeout(() => {
      que.dequeue();
    }, 2000);
  }

  return { raiseNotification, getNotifications };
});
