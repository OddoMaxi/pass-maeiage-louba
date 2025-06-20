<template>
  <div class="max-w-4xl mx-auto py-6 px-4">
    <!-- Titre de la page -->
    <h1 class="text-2xl font-bold text-center mb-6">{{ $t('payments.title') }}</h1>
    
    <!-- Ligne de séparation -->
    <div class="border-t border-gray-300 mb-6"></div>
    
    <!-- Indicateur d'étapes -->
    <div class="flex justify-center mb-8 space-x-1">
      <div class="h-1 w-16" :class="{ 'bg-green-600': currentStep >= 1, 'bg-gray-300': currentStep < 1 }"></div>
      <div class="h-1 w-16" :class="{ 'bg-green-600': currentStep >= 2, 'bg-gray-300': currentStep < 2 }"></div>
      <div class="h-1 w-16" :class="{ 'bg-green-600': currentStep >= 3, 'bg-gray-300': currentStep < 3 }"></div>
      <div class="h-1 w-16" :class="{ 'bg-green-600': currentStep >= 4, 'bg-gray-300': currentStep < 4 }"></div>
      <div class="h-1 w-16" :class="{ 'bg-green-600': currentStep >= 5, 'bg-gray-300': currentStep < 5 }"></div>
    </div>
    
    <!-- Message d'avertissement -->
    <div class="bg-amber-50 border border-amber-300 rounded-md p-4 mb-6">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-bold text-amber-800">{{ $t('payments.warning') }}</h3>
          <div class="mt-1 text-sm text-amber-700">
            {{ $t('payments.warningSubmit') }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Information pour demande par procuration -->
    <div class="border-l-4 border-gray-400 pl-4 mb-8">
      <p class="text-gray-600 text-sm">{{ $t('payments.proxyInfo') }}</p>
    </div>
    
    <!-- ÉTAPE 1: Nom du demandeur -->
    <div v-if="currentStep === 1">
      <!-- Titre de l'étape -->
      <h2 class="text-2xl font-bold text-center mb-8">Nom du demandeur</h2>
      
      <!-- Formulaire de saisie du nom -->
      <div class="border rounded-md p-8 mb-8">
        <div class="mb-6">
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('payments.firstName') }}</label>
          <input 
            type="text" 
            id="firstName" 
            v-model="formData.firstName" 
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>
        
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('payments.lastName') }}</label>
          <input 
            type="text" 
            id="lastName" 
            v-model="formData.lastName" 
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>
      </div>
    </div>
    
    <!-- ÉTAPE 2: Date de naissance -->
    <div v-if="currentStep === 2">
      <!-- Titre de l'étape -->
      <h2 class="text-2xl font-bold text-center mb-8">{{ $t('payments.birthDate') }}</h2>
      
      <!-- Formulaire de saisie de la date de naissance -->
      <div class="border rounded-md p-8 mb-8">
        <div class="flex flex-wrap gap-4">
          <!-- Jour -->
          <div class="flex-1 min-w-[120px]">
            <label for="day" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('payments.day') }}</label>
            <div class="relative">
              <select 
                id="day" 
                v-model="formData.day"
                class="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <!-- Autres options pour les jours -->
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Mois -->
          <div class="flex-1 min-w-[200px]">
            <label for="month" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('payments.month') }}</label>
            <div class="relative">
              <select 
                id="month" 
                v-model="formData.month"
                class="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Janvier">{{ $t('payments.january') }}</option>
                <!-- Autres options pour les mois -->
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Année -->
          <div class="flex-1 min-w-[120px]">
            <label for="year" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('payments.year') }}</label>
            <div class="relative">
              <select 
                id="year" 
                v-model="formData.year"
                class="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="1983">1983</option>
                <!-- Autres options pour les années -->
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ÉTAPE 3: Genre -->
    <div v-if="currentStep === 3">
      <!-- Titre de l'étape -->
      <h2 class="text-2xl font-bold text-center mb-8">{{ $t('payments.gender') }}</h2>
      
      <!-- Formulaire de sélection du genre -->
      <div class="border rounded-md p-8 mb-8">
        <div class="space-y-4">
          <div class="flex items-center">
            <input 
              type="radio" 
              id="male" 
              name="gender" 
              value="Homme"
              v-model="formData.gender"
              class="h-4 w-4 text-green-600 focus:ring-green-500"
            >
            <label for="male" class="ml-2 block text-sm font-medium text-gray-700">{{ $t('payments.male') }}</label>
          </div>
          <div class="flex items-center">
            <input 
              type="radio" 
              id="female" 
              name="gender" 
              value="Femme"
              v-model="formData.gender"
              class="h-4 w-4 text-green-600 focus:ring-green-500"
            >
            <label for="female" class="ml-2 block text-sm font-medium text-gray-700">{{ $t('payments.female') }}</label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ÉTAPE 4: Lieu d'enrôlement -->
    <div v-if="currentStep === 4">
      <!-- Titre de l'étape -->
      <h2 class="text-2xl font-bold text-center mb-8">{{ $t('payments.enrollmentLocation') }}</h2>
      
      <!-- Formulaire de sélection du lieu d'enrôlement -->
      <div class="border rounded-md p-8 mb-8">
        <div class="space-y-6">
          <!-- Pays ou Territoire -->
          <div>
            <label for="country" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('payments.countryTerritory') }}</label>
            <div class="relative">
              <select 
                id="country" 
                v-model="formData.country"
                class="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="France">France</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Ambassade ou Consulat -->
          <div>
            <label for="embassy" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('payments.embassy') }}</label>
            <div class="relative">
              <select 
                id="embassy" 
                v-model="formData.embassy"
                class="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Paris">Paris</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ÉTAPE 5: Validité du passeport -->
    <div v-if="currentStep === 5">
      <!-- Titre de l'étape -->
      <h2 class="text-2xl font-bold text-center mb-8">{{ $t('payments.passportValidity') }}</h2>
      
      <!-- Formulaire de sélection de la validité du passeport -->
      <div class="border rounded-md p-8 mb-8">
        <div class="space-y-4">
          <div class="flex items-center">
            <input 
              type="radio" 
              id="5years" 
              name="passportValidity" 
              value="5 ans"
              v-model="formData.passportValidity"
              class="h-4 w-4 text-green-600 focus:ring-green-500"
            >
            <label for="5years" class="ml-2 block text-sm font-medium text-gray-700">5 ans --- 153.54 USD</label>
          </div>
          <div class="flex items-center">
            <input 
              type="radio" 
              id="10years" 
              name="passportValidity" 
              value="10 ans"
              v-model="formData.passportValidity"
              class="h-4 w-4 text-green-600 focus:ring-green-500"
            >
            <label for="10years" class="ml-2 block text-sm font-medium text-gray-700">10 ans --- 307.08 USD</label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ÉTAPE 6: Résumé et confirmation -->
    <div v-if="currentStep === 6">
      <!-- Titre de l'étape -->
      <h2 class="text-2xl font-bold text-center mb-8">{{ $t('payments.summary') }}</h2>
      
      <!-- Résumé des informations -->
      <div class="border rounded-md p-8 mb-8">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-right text-gray-600">{{ $t('payments.firstName') }}</div>
          <div class="font-bold">{{ formData.firstName }}</div>
          
          <div class="text-right text-gray-600">{{ $t('payments.lastName') }}</div>
          <div class="font-bold">{{ formData.lastName }}</div>
          
          <div class="text-right text-gray-600">{{ $t('payments.birthDate') }}</div>
          <div class="font-bold">{{ formData.day }}/{{ formData.month }}/{{ formData.year }}</div>
          
          <div class="text-right text-gray-600">{{ $t('payments.gender') }}</div>
          <div class="font-bold">{{ formData.gender }}</div>
          
          <div class="text-right text-gray-600">{{ $t('payments.country') }}</div>
          <div class="font-bold">{{ formData.country }}</div>
          
          <div class="text-right text-gray-600">{{ $t('payments.embassy') }}</div>
          <div class="font-bold">{{ formData.embassy }}</div>
          
          <div class="text-right text-gray-600">{{ $t('payments.passportValidity') }}</div>
          <div class="font-bold">{{ formData.passportValidity }}</div>
        </div>
        
        <!-- Message d'avertissement spécifique à l'étape de confirmation -->
        <div class="mt-6 bg-amber-50 border border-amber-300 rounded-md p-4">
          <p class="text-amber-800">{{ $t('payments.warningText') }}</p>
        </div>
        
        <!-- Confirmation -->
        <div class="mt-4 flex items-center">
          <input 
            type="checkbox" 
            id="confirmInfo" 
            v-model="infoConfirmed"
            class="h-4 w-4 text-green-600 focus:ring-green-500"
          >
          <label for="confirmInfo" class="ml-2 block text-sm font-medium text-gray-700">{{ $t('payments.infoCorrect') }}</label>
        </div>
      </div>
    </div>
    
    <!-- Boutons de navigation -->
    <div class="flex justify-center space-x-4 mb-6">
      <button 
        class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center"
        @click="goBack"
      >
        <span class="mr-2">&lt;</span> {{ $t('payments.back') }}
      </button>
      
      <button 
        class="px-6 py-2 bg-green-600 text-white rounded-md flex items-center"
        @click="goNext"
        :disabled="currentStep === 6 && !infoConfirmed"
      >
        {{ currentStep === 6 ? $t('payments.pay') : $t('payments.continue') }} <span class="ml-2">&gt;</span>
      </button>
    </div>
    
    <!-- Liens de bas de page -->
    <div class="flex justify-center text-sm text-gray-600 space-x-4">
      <a href="#" class="hover:underline">{{ $t('payments.resumeProcess') }}</a>
      <span>|</span>
      <a href="#" class="hover:underline">{{ $t('payments.paymentHistory') }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// État du formulaire
const currentStep = ref(1) // 1: Nom, 2: Date de naissance, 3: Genre, etc.
const infoConfirmed = ref(false)

// Données du formulaire
const formData = reactive({
  firstName: 'OUSMANE',
  lastName: 'DOUMBOUYA',
  day: '02',
  month: 'Janvier',
  year: '1983',
  gender: 'Homme',
  country: 'FRANCE',
  embassy: 'PARIS',
  passportValidity: '5 ans'
})

const router = useRouter()

// Fonctions de navigation
function goBack() {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push('/')
  }
}

function goNext() {
  // Passage à l'étape suivante ou soumission finale
  if (currentStep.value < 6) {
    currentStep.value++
  } else if (infoConfirmed.value) {
    // Soumission finale du formulaire
    console.log('Données finales du formulaire:', formData)
    // Simulation d'un appel API pour le paiement
    alert('Paiement en cours de traitement...')
  }
}
</script>
