<!--
/**
 * @component Login.vue
 * @description Page de connexion permettant aux utilisateurs de s'authentifier.
 * Cette page utilise les traductions pour supporter le français et l'anglais.
 * 
 * @requires vue-router - Pour la navigation
 * @requires vue-i18n - Pour les traductions
 * 
 * @author PASS.MAEGE Team
 * @version 1.0.0
 */
-->

<template>
  <div class="max-w-md mx-auto my-10 px-4 min-w-[350px]">
    <!-- En-tête de la page avec icône de cadenas et titre -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {{ $t('login.title') }}
      </h1>
      <div class="border-b border-gray-300 w-full my-4"></div>
    </div>

    <!-- Formulaire de connexion -->
    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- Champ nom d'utilisateur -->
      <div>
        <input 
          type="text" 
          v-model="username" 
          :placeholder="$t('login.username')" 
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      
      <!-- Champ mot de passe -->
      <div>
        <input 
          type="password" 
          v-model="password" 
          :placeholder="$t('login.password')" 
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      
      <!-- Bouton de connexion -->
      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">
        {{ errorMessage }}
      </div>

      <!-- Bouton de connexion avec état de chargement -->
      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center"
        :disabled="isLoading"
      >
        <!-- Icône de chargement -->
        <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ $t('login.submit') }}
      </button>
      
      <!-- Lien d'inscription pour les nouveaux utilisateurs -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600">{{ $t('login.noAccount') }}</p>
        <router-link to="/register" class="text-sm text-blue-500 hover:underline">{{ $t('login.register') }}</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
/**
 * Script de gestion de la page de connexion
 * Gère le formulaire de connexion, l'authentification et la redirection
 */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

// Initialisation des hooks
const router = useRouter();
const { t } = useI18n();

// Variables réactives pour le formulaire
const username = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

/**
 * Gère la soumission du formulaire de connexion
 * @async
 * @function handleLogin
 * @description Authentifie l'utilisateur et redirige vers la page d'accueil en cas de succès
 */
const handleLogin = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    
    // TODO: Intégrer avec l'API d'authentification réelle
    // Exemple d'appel API à implémenter:
    // const response = await authService.login(username.value, password.value);
    console.log(`Tentative de connexion avec: ${username.value}`);
    
    // Simulation d'une connexion réussie (à remplacer par l'appel API réel)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simule un délai réseau
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ username: username.value }));
    
    // Redirection vers la page d'accueil après connexion
    router.push('/');
  } catch (error) {
    // Gestion des erreurs d'authentification
    console.error('Erreur de connexion:', error);
    errorMessage.value = t('login.error') || 'Erreur d\'authentification';
  } finally {
    isLoading.value = false;
  }
};
</script>
