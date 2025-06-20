<!--
/**
 * @component Navbar.vue
 * @description Barre de navigation principale de l'application PASS.MAEGE.
 * Contient le logo, le bouton de connexion et le sélecteur de langue.
 * 
 * @requires vue-router - Pour la navigation
 * @requires vue-i18n - Pour les traductions
 * 
 * @author PASS.MAEGE Team
 * @version 1.0.0
 */
-->

<template>
  <!-- Barre de navigation avec couleurs du design PASS.MAEGE -->
  <header class="bg-[#0d7a4f] text-white border-b-4 border-yellow-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <!-- Logo et nom de l'application -->
      <router-link to="/" class="flex items-center space-x-2">
        <img src="/src/assets/gin.png" alt="Logo" class="h-8 w-8" />
        <span class="font-bold text-xl text-white">PASS.MAEGE</span>
      </router-link>
      
      <div class="flex items-center space-x-4">
        <!-- Bouton de connexion -->
        <router-link to="/login" class="flex items-center text-white hover:text-yellow-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span>{{ $t('nav.login') }}</span>
        </router-link>
        
        <!-- Sélecteur de langue -->
        <div class="flex border border-white rounded overflow-hidden">
          <button
            @click="switchLocale('fr')"
            :class="['px-2 py-1', locale === 'fr' ? 'bg-yellow-500 text-white' : 'bg-transparent text-white']"
            aria-label="Changer la langue en français"
          >FR</button>
          <button
            @click="switchLocale('en')"
            :class="['px-2 py-1', locale === 'en' ? 'bg-yellow-500 text-white' : 'bg-transparent text-white']"
            aria-label="Change language to English"
          >EN</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
/**
 * Script de gestion de la barre de navigation
 * Gère la navigation, le changement de langue et l'affichage du menu mobile
 */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Initialisation des hooks
const { locale } = useI18n()

// État du menu mobile (fermé par défaut)
const mobileOpen = ref(false)

/**
 * Liste des liens de navigation principaux
 * Chaque lien contient une route et une clé de traduction
 * @type {Array<{to: string, label: string}>}
 */
const links = [
  { to: '/', label: 'nav.home' },
  { to: '/payments', label: 'nav.payments' },
  { to: '/how-to-apply', label: 'nav.howToApply' },
  { to: '/faq', label: 'nav.faq' },
  { to: '/support', label: 'nav.support' },
  { to: '/moderator', label: 'nav.moderator' },
]

/**
 * Change la langue de l'application et sauvegarde la préférence dans localStorage
 * @param {string} l - Code de la langue ('fr' ou 'en')
 */
function switchLocale(l: string) {
  locale.value = l
  localStorage.setItem('locale', l)
}

/**
 * Génère les classes CSS pour les boutons de sélection de langue
 * @param {string} l - Code de la langue ('fr' ou 'en')
 * @returns {string[]} Tableau de classes CSS à appliquer au bouton
 */
function btnLocale(l: string) {
  return [
    'px-2 py-1 rounded text-sm',
    l === locale.value ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300',
  ]
}
</script>
