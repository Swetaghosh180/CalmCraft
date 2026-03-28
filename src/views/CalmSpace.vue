<template>
  <div class="min-h-screen py-14">
    <div class="max-w-3xl mx-auto px-5">

      <!-- Header -->
      <div class="text-center mb-12 fade-up">
        <ion-icon name="heart" class="text-dusty-rose mb-4" style="font-size:1.8rem;"></ion-icon>
        <h1 class="font-heading text-fluid-2xl text-text-primary mb-3">My Calm Space</h1>
        <p class="text-text-secondary max-w-md mx-auto text-sm leading-relaxed">
          These are small moments you chose for yourself.
        </p>
      </div>

      <!-- Saved hobbies -->
      <div v-if="savedHobbies.length > 0" class="space-y-6 mb-12">
        <div
          v-for="(hobby, i) in savedHobbies"
          :key="hobby.id"
          class="card fade-up"
          :style="`animation-delay: ${i * 0.07}s`"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-5 flex-1 min-w-0">
              <div class="text-3xl flex-shrink-0">{{ hobby.emoji }}</div>
              <div class="flex-1 min-w-0">
                <h3 class="font-heading text-lg text-text-primary mb-2">{{ hobby.name }}</h3>
                <p class="text-text-secondary text-sm mb-4 leading-relaxed">{{ hobby.description }}</p>

                <div class="flex flex-wrap gap-2 mb-5">
                  <span class="flex items-center gap-1 badge">
                    <ion-icon name="time-outline" style="font-size:0.8rem;"></ion-icon>
                    {{ hobby.timeEstimate }}
                  </span>
                  <span class="flex items-center gap-1 badge">
                    <ion-icon name="battery-half-outline" style="font-size:0.8rem;"></ion-icon>
                    {{ hobby.energyLevel }}
                  </span>
                </div>

                <div class="flex flex-wrap gap-3">
                  <router-link :to="`/hobby/${hobby.id}`" class="btn-primary inline-flex items-center gap-1.5 text-sm">
                    <ion-icon name="arrow-forward-outline" style="font-size:0.9rem;"></ion-icon>
                    Try this again
                  </router-link>
                  <router-link to="/" class="btn-ghost inline-flex items-center gap-1.5 text-sm">
                    Explore something new
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Remove button -->
            <button
              @click="removeHobby(hobby.id)"
              class="flex-shrink-0 p-2 rounded-full text-text-secondary hover:text-dusty-rose hover:bg-soft-sage transition-all duration-200"
              title="Remove from calm space"
            >
              <ion-icon name="close-outline" style="font-size:1.1rem;"></ion-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-20 fade-up">
        <ion-icon name="moon-outline" class="text-text-secondary mb-5" style="font-size:3.5rem; opacity:0.4;"></ion-icon>
        <h2 class="font-heading text-fluid-xl text-text-primary mb-4">Your calm space is ready</h2>
        <p class="text-text-secondary mb-8 max-w-sm mx-auto text-sm leading-relaxed">
          When you find activities that feel right, they'll appear here for you to revisit.
          Nothing is expected of you.
        </p>
        <router-link to="/" class="btn-primary inline-flex items-center gap-2">
          <ion-icon name="compass-outline" style="font-size:1rem;"></ion-icon>
          Explore gentle hobbies
        </router-link>
      </div>

      <!-- Gentle reminder -->
      <div class="bg-warm-white rounded-2xl p-8 text-center mt-4">
        <p class="text-text-secondary text-sm italic leading-relaxed max-w-md mx-auto">
          There's no pressure to do any of these. They're here when you need them —
          like a gentle friend waiting patiently.
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'CalmSpace',
  setup() {
    const savedHobbies = ref([])

    const loadSavedHobbies = () => {
      try {
        const saved = localStorage.getItem('savedHobbies')
        if (saved) savedHobbies.value = JSON.parse(saved)
      } catch {
        localStorage.removeItem('savedHobbies')
        savedHobbies.value = []
      }
    }

    const removeHobby = (id) => {
      savedHobbies.value = savedHobbies.value.filter(h => h.id !== id)
      localStorage.setItem('savedHobbies', JSON.stringify(savedHobbies.value))
    }

    onMounted(() => loadSavedHobbies())

    return { savedHobbies, removeHobby }
  }
}
</script>
