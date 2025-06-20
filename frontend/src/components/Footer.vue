<!--
/**
 * @component Footer.vue
 * @description Pied de page de l'application PASS.MAEGE.
 * Contient les liens de navigation secondaires, le sélecteur de langue,
 * le logo du gouvernement guinéen et les mentions légales.
 * 
 * @requires vue-router - Pour la navigation
 * @requires vue-i18n - Pour les traductions
 * 
 * @author PASS.MAEGE Team
 * @version 1.0.0
 */
-->

<template>
  <!-- Pied de page avec fond gris clair et bordure supérieure -->
  <footer class="bg-gray-100 py-6 mt-auto border-t border-gray-200">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Contenu principal du footer avec menu et logo -->
      <div class="flex flex-col md:flex-row items-center justify-between">
        <!-- Menu de navigation et sélecteur de langue -->
        <div class="mb-4 md:mb-0">
          <!-- Menu de navigation -->
          <div class="text-sm text-gray-500">
            <p>{{ $t('footer.menu') }}</p>
            <ul class="list-disc pl-5 mt-1">
              <li><router-link to="/payments" class="hover:text-[#0d7a4f]">{{ $t('nav.payments') }}</router-link></li>
              <li><router-link to="/how-to-apply" class="hover:text-[#0d7a4f]">{{ $t('nav.howToApply') }}</router-link></li>
              <li><router-link to="/faq" class="hover:text-[#0d7a4f]">{{ $t('nav.faq') }}</router-link></li>
              <li><router-link to="/support" class="hover:text-[#0d7a4f]">{{ $t('nav.support') }}</router-link></li>
              <li><router-link to="/moderator" class="hover:text-[#0d7a4f]">{{ $t('nav.moderator') }}</router-link></li>
            </ul>
          </div>
          <!-- Sélecteur de langue -->
          <div class="mt-4 text-sm text-gray-500">
            <p>{{ $t('footer.language') }}</p>
            <ul class="list-disc pl-5 mt-1">
              <li><a href="#" @click.prevent="switchLocale('fr')" class="hover:text-[#0d7a4f]">{{ $t('footer.french') }}</a></li>
              <li><a href="#" @click.prevent="switchLocale('en')" class="hover:text-[#0d7a4f]">{{ $t('footer.english') }}</a></li>
            </ul>
          </div>
        </div>
        
        <!-- Logo du gouvernement guinéen -->
        <div class="text-center">
          <img src="/src/assets/gin.png" alt="{{ $t('footer.govLogo') }}" class="h-20 w-20 mx-auto" />
          <p class="text-xs text-gray-500 mt-2">{{ $t('footer.govName') }}</p>
        </div>
      </div>
      
      <!-- Copyright et mentions légales -->
      <div class="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} PASS.MAEGE | <a href="https://loubaservices.com" class="text-[#0d7a4f] hover:underline">Louba Services</a></p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
/**
 * Script de gestion du pied de page
 * Gère le changement de langue et l'affichage des informations de copyright
 */
import { useI18n } from 'vue-i18n'

// Initialisation des hooks
const { locale } = useI18n()

/**
 * Change la langue de l'application et sauvegarde la préférence dans localStorage
 * @param {string} l - Code de la langue ('fr' ou 'en')
 */
function switchLocale(l: string) {
  locale.value = l
  localStorage.setItem('locale', l)
}
</script>
