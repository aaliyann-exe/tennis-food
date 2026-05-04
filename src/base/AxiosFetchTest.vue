<template>
  <div>
    <h1>Posts from JSONPlaceholder</h1>
    <!-- <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <p class="font-bold py-2 text-orange-500">{{ post.address.geo.lat }}</p>
      </li>
    </ul>
    <p v-else-if="loading">Loading posts...</p>
    <p v-else-if="error">{{ error }}</p> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

// const fetchPosts = async () => {
//   try {
//     await transporter.verify()
//     console.log('Server is ready to take our messages')
//     // loading.value = false
//   } catch (err) {
//     console.error('Verification failed:', err)
//   }
// }

// fetchPosts()
</script>
