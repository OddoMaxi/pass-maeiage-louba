<template>
  <div class="min-h-screen flex flex-col dark:bg-gray-900">
    <Navbar />
    <router-view class="flex-grow" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

