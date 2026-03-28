<template>
  <div class="min-h-screen py-14">
    <div class="max-w-3xl mx-auto px-5">

      <div v-if="hobby" class="fade-up">

        <!-- Hero -->
        <div class="text-center mb-12">
          <div class="text-6xl mb-5">{{ hobby.emoji }}</div>
          <h1 class="font-heading text-fluid-2xl text-text-primary mb-4">{{ hobby.name }}</h1>
          <p class="text-fluid-base text-text-secondary leading-relaxed max-w-xl mx-auto">{{ hobby.description }}</p>
        </div>

        <!-- Why it helps + What you need -->
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="card">
            <div class="flex items-center gap-2 mb-4">
              <ion-icon name="heart-circle-outline" class="text-olive-green" style="font-size:1.3rem;"></ion-icon>
              <h3 class="font-heading text-base text-text-primary">Why this might help</h3>
            </div>
            <p class="text-text-secondary text-sm leading-relaxed">{{ hobby.emotionalBenefit }}</p>
          </div>

          <div class="card">
            <div class="flex items-center gap-2 mb-4">
              <ion-icon name="bag-handle-outline" class="text-olive-green" style="font-size:1.3rem;"></ion-icon>
              <h3 class="font-heading text-base text-text-primary">What you'll need</h3>
            </div>
            <ul class="space-y-2">
              <li
                v-for="material in hobby.materials"
                :key="material"
                class="flex items-center gap-2 text-text-secondary text-sm"
              >
                <ion-icon name="checkmark-outline" class="text-olive-green flex-shrink-0" style="font-size:0.9rem;"></ion-icon>
                {{ material }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Gentle steps -->
        <div class="card mb-6">
          <div class="flex items-center gap-2 mb-6">
            <ion-icon name="footsteps-outline" class="text-olive-green" style="font-size:1.3rem;"></ion-icon>
            <h3 class="font-heading text-base text-text-primary">Gentle steps to begin</h3>
          </div>
          <div class="space-y-5">
            <div
              v-for="(step, index) in hobby.steps"
              :key="index"
              class="flex items-start gap-4"
            >
              <div class="w-7 h-7 bg-olive-green text-warm-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                {{ index + 1 }}
              </div>
              <p class="text-text-secondary text-sm leading-relaxed">{{ step }}</p>
            </div>
          </div>
        </div>

        <!-- Remember card -->
        <div class="bg-soft-sage rounded-2xl p-8 mb-10">
          <h3 class="font-heading text-base text-text-primary mb-3">Remember</h3>
          <p class="text-text-secondary text-sm leading-relaxed italic">
            You don't need to be good at this. Just begin. There's no timeline, no pressure, no judgment.
            This is your time to simply be present with something that might bring you comfort.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="saveHobby"
            class="btn-primary inline-flex items-center justify-center gap-2"
            :class="saving ? 'scale-[0.97]' : ''"
            style="transition: transform 0.15s ease;"
          >
            <ion-icon :name="saved ? 'heart' : 'heart-outline'" style="font-size:1.1rem;"></ion-icon>
            {{ saved ? 'Saved to Calm Space ✓' : 'Keep this for later' }}
          </button>
          <router-link to="/recommendations" class="btn-secondary inline-flex items-center justify-center gap-2">
            <ion-icon name="arrow-back-outline" style="font-size:1rem;"></ion-icon>
            See other suggestions
          </router-link>
        </div>

      </div>

      <!-- Not found -->
      <div v-else class="text-center py-20">
        <p class="text-text-secondary mb-6">This activity wasn't found.</p>
        <router-link to="/" class="btn-primary inline-flex items-center gap-2">
          <ion-icon name="home-outline" style="font-size:1rem;"></ion-icon>
          Return home
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { allHobbies } from '../data/hobbies.js'

export default {
  name: 'HobbyDetail',
  setup() {
    const route  = useRoute()
    const hobby  = ref(null)
    const saved  = ref(false)
    const saving = ref(false)

    const checkSaved = (id) => {
      try {
        const list = JSON.parse(localStorage.getItem('savedHobbies') || '[]')
        saved.value = !!list.find(h => h.id === id)
      } catch { saved.value = false }
    }

    const saveHobby = () => {
      if (!hobby.value || saved.value) return
      saving.value = true
      setTimeout(() => { saving.value = false }, 150)
      try {
        const list = JSON.parse(localStorage.getItem('savedHobbies') || '[]')
        list.push(hobby.value)
        localStorage.setItem('savedHobbies', JSON.stringify(list))
      } catch {
        localStorage.setItem('savedHobbies', JSON.stringify([hobby.value]))
      }
      saved.value = true
    }

    onMounted(() => {
      const id = route.params.id
      if (allHobbies[id]) {
        hobby.value = { id, ...allHobbies[id] }
        checkSaved(id)
      }
    })

    return { hobby, saved, saving, saveHobby }
  }
}
</script>
