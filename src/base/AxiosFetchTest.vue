<template>
  <div>
    <h1>Posts from JSONPlaceholder</h1>
    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <p class="font-bold py-2 text-orange-500">{{ post.address.geo.lat }}</p>
      </li>
    </ul>
    <p v-else-if="loading">Loading posts...</p>
    <p v-else-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

const fetchPosts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    posts.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch data: ' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)
</script>
