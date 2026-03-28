<template>
  <div class="card group">
    <div class="flex items-start gap-4">

      <div class="text-3xl flex-shrink-0 mt-1">{{ hobby.emoji }}</div>

      <div class="flex-1 min-w-0">
        <h3 class="font-heading text-lg text-text-primary mb-2 leading-snug">{{ hobby.name }}</h3>
        <p class="text-text-secondary text-sm mb-4 leading-relaxed">{{ hobby.description }}</p>

        <div class="flex flex-wrap gap-2 mb-5">
          <span class="flex items-center gap-1 badge">
            <ion-icon name="time-outline" style="font-size:0.85rem;"></ion-icon>
            {{ hobby.timeEstimate }}
          </span>
          <span class="flex items-center gap-1 badge">
            <ion-icon name="battery-half-outline" style="font-size:0.85rem;"></ion-icon>
            {{ hobby.energyLevel }}
          </span>
        </div>

        <!-- Actions — clear hierarchy: primary first, ghost-border second -->
        <div class="flex flex-wrap gap-3">
          <router-link
            :to="`/hobby/${hobby.id}`"
            class="flex items-center gap-1.5 btn-primary text-sm"
          >
            <ion-icon name="arrow-forward-outline" style="font-size:0.9rem;"></ion-icon>
            Explore gently
          </router-link>

          <button
            @click="saveHobby"
            class="btn-save text-sm"
            :class="[saved ? 'btn-save-active' : '', saving ? 'scale-[0.97]' : '']"
            style="transition: transform 0.15s ease, background-color 0.2s ease, color 0.2s ease;"
          >
            <ion-icon :name="saved ? 'heart' : 'heart-outline'" style="font-size:0.9rem;"></ion-icon>
            {{ saved ? 'Saved ✓' : 'Keep for later' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'HobbyCard',
  props: {
    hobby: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const saved  = ref(false)
    const saving = ref(false)

    const checkSaved = () => {
      try {
        const savedHobbies = JSON.parse(localStorage.getItem('savedHobbies') || '[]')
        saved.value = !!savedHobbies.find(h => h.id === props.hobby.id)
      } catch { saved.value = false }
    }

    const saveHobby = () => {
      if (saved.value) return
      saving.value = true
      setTimeout(() => { saving.value = false }, 150)
      try {
        const savedHobbies = JSON.parse(localStorage.getItem('savedHobbies') || '[]')
        if (!savedHobbies.find(h => h.id === props.hobby.id)) {
          savedHobbies.push(props.hobby)
          localStorage.setItem('savedHobbies', JSON.stringify(savedHobbies))
          saved.value = true
        }
      } catch {
        localStorage.setItem('savedHobbies', JSON.stringify([props.hobby]))
        saved.value = true
      }
    }

    onMounted(() => checkSaved())

    return { saved, saving, saveHobby }
  }
}
</script>
