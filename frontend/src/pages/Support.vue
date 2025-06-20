<template>
  <section class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-semibold mb-6">{{ $t('support.title') }}</h1>
    <form class="space-y-4 max-w-lg">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input type="email" class="w-full border rounded px-3 py-2" placeholder="you@example.com" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
        <textarea rows="4" class="w-full border rounded px-3 py-2" />
      </div>
      <button class="bg-primary text-white px-4 py-2 rounded">Envoyer</button>
    </form>
  </section>
</template>
