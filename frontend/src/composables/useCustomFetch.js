import { createFetch } from '@vueuse/core';

const useFetch = createFetch({
  baseUrl: 'https://my-api.com',
  options: {
    async beforeFetch({ cancel, options }) {
      const myToken = '';

      if (!myToken) {
        console.log('no token, нюхіс бебрус 🤷');
        cancel();
      }

      options.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        ...options.headers,
        Authorization: `Bearer ${myToken}`
      };

      return {
        options
      };
    }
  },
  fetchOptions: {
    mode: 'no-cors'
  }
});

export default useFetch;
