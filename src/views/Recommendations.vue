<template>
  <div class="min-h-screen py-14">
    <div class="max-w-4xl mx-auto px-5">

      <!-- Header -->
      <div class="text-center mb-12 fade-up">
        <h1 class="font-heading text-fluid-2xl text-text-primary mb-4">
          {{ isUnsure ? 'Some gentle suggestions for you' : 'Activities that might feel right today' }}
        </h1>
        <p class="text-text-secondary max-w-xl mx-auto leading-relaxed text-sm">
          {{ isUnsure
            ? 'When we don\'t know how we feel, sometimes the best thing is to start small.'
            : 'Based on how you\'re feeling, here are activities that might bring you comfort.' }}
        </p>
      </div>

      <!-- Primary recommendation — "Start here" -->
      <div v-if="primary" class="mb-8 fade-up">
        <span class="label-start-here">Start here</span>
        <div class="card-primary">
          <div class="flex items-start gap-5">
            <div class="text-4xl flex-shrink-0 mt-1">{{ primary.emoji }}</div>
            <div class="flex-1">
              <h3 class="font-heading text-xl text-text-primary mb-2">{{ primary.name }}</h3>
              <p class="text-text-secondary leading-relaxed mb-5">{{ primary.description }}</p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="flex items-center gap-1 badge">
                  <ion-icon name="time-outline" style="font-size:0.85rem;"></ion-icon>
                  {{ primary.timeEstimate }}
                </span>
                <span class="flex items-center gap-1 badge">
                  <ion-icon name="battery-half-outline" style="font-size:0.85rem;"></ion-icon>
                  {{ primary.energyLevel }}
                </span>
              </div>
              <div class="flex flex-wrap gap-3">
                <router-link :to="`/hobby/${primary.id}`" class="btn-primary inline-flex items-center gap-2 text-sm">
                  <ion-icon name="arrow-forward-circle-outline" style="font-size:1rem;"></ion-icon>
                  Explore gently
                </router-link>
                <button
                  @click="saveActivity(primary)"
                  class="btn-save text-sm"
                  :class="isSaved(primary.id) ? 'btn-save-active' : ''"
                >
                  <ion-icon :name="isSaved(primary.id) ? 'heart' : 'heart-outline'" style="font-size:1rem;"></ion-icon>
                  {{ isSaved(primary.id) ? 'Saved ✓' : 'Keep for later' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary recommendations — "Or try these" -->
      <div v-if="secondary.length" class="mb-10 fade-up delay-1">
        <span class="label-or-try">Or try these</span>
        <div class="grid md:grid-cols-2 gap-5">
          <HobbyCard
            v-for="hobby in secondary"
            :key="hobby.id"
            :hobby="hobby"
          />
        </div>
      </div>

      <!-- Show more -->
      <div v-if="hasMore" class="text-center mb-10 fade-up delay-2">
        <button @click="showMore" class="btn-ghost inline-flex items-center gap-2">
          <ion-icon name="chevron-down-outline" style="font-size:1rem;"></ion-icon>
          Explore a little more ({{ remainingCount }} more)
        </button>
      </div>

      <!-- Footer actions -->
      <div class="text-center space-y-5 fade-up delay-3">
        <p class="text-text-secondary italic text-sm">
          You don't need to be good at this. Just begin.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <router-link to="/quiz" class="btn-secondary inline-flex items-center justify-center gap-2 text-sm">
            <ion-icon name="refresh-outline" style="font-size:1rem;"></ion-icon>
            Try different questions
          </router-link>
          <router-link to="/calm-space" class="btn-primary inline-flex items-center justify-center gap-2 text-sm">
            <ion-icon name="heart-outline" style="font-size:1rem;"></ion-icon>
            View my saved activities
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import HobbyCard from '../components/HobbyCard.vue'
import { allHobbies } from '../data/hobbies.js'

export default {
  name: 'Recommendations',
  components: { HobbyCard },
  setup() {
    const allAvailable    = ref([])
    const showingCount    = ref(3)
    const selectedEmotion = ref('')
    const quizAnswers     = ref({})
    const savedIds        = ref([])

    const isUnsure = computed(() => selectedEmotion.value === 'unsure')

    const primary        = computed(() => allAvailable.value[0] || null)
    const secondary      = computed(() => allAvailable.value.slice(1, showingCount.value))
    const hasMore        = computed(() => showingCount.value < allAvailable.value.length)
    const remainingCount = computed(() => allAvailable.value.length - showingCount.value)

    const hobbiesByMood = {
      sad:      ['gentle-cooking', 'watercolor', 'memory-journaling', 'soft-music-listening', 'candle-making'],
      stressed: ['mindful-cooking', 'clay-work', 'boxing-pillow', 'origami-focus', 'bubble-wrap-popping', 'ice-cube-therapy'],
      anxious:  ['breathing-garden', 'gentle-walking', 'worry-stones', 'butterfly-breathing', 'lavender-sachets', 'mandala-coloring'],
      numb:     ['texture-exploration', 'warm-tea-ritual', 'ice-and-heat', 'scent-journey', 'mirror-talking', 'music-feeling'],
      happy:    ['creative-writing', 'dance-movement', 'gratitude-art', 'singing-shower', 'kindness-notes', 'photo-adventure', 'baking-gifts'],
      unsure:   ['grounding-breathing', 'color-play', 'body-scan', 'weather-watching', 'free-writing', 'intuitive-movement']
    }

    const buildList = () => {
      const emotion = selectedEmotion.value
      const answers = quizAnswers.value
      let ids = hobbiesByMood[emotion] || hobbiesByMood.unsure

      let list = ids.map(id => ({
        id,
        name: allHobbies[id]?.name || id,
        emoji: allHobbies[id]?.emoji || '🌟',
        description: allHobbies[id]?.description || 'A gentle activity for you.',
        timeEstimate: allHobbies[id]?.timeEstimate || '15–30 min',
        energyLevel: allHobbies[id]?.energyLevel || 'Low energy',
        ...allHobbies[id]
      })).filter(h => h.name)

      if (Object.keys(answers).length > 0) {
        list = list.filter(h => {
          if (answers.energy === 'low'  && h.energyLevel.includes('High'))     return false
          if (answers.energy === 'high' && h.energyLevel.includes('Very low')) return false
          if (answers.time === 'short'  && (h.timeEstimate.includes('60') || h.timeEstimate.includes('90'))) return false
          return true
        })
      }

      allAvailable.value = list
    }

    const showMore = () => {
      showingCount.value = Math.min(showingCount.value + 2, allAvailable.value.length)
    }

    const isSaved = (id) => savedIds.value.includes(id)

    const saveActivity = (hobby) => {
      const saved = JSON.parse(localStorage.getItem('savedHobbies') || '[]')
      if (!saved.find(h => h.id === hobby.id)) {
        saved.push(hobby)
        localStorage.setItem('savedHobbies', JSON.stringify(saved))
        savedIds.value.push(hobby.id)
      }
    }

    onMounted(() => {
      selectedEmotion.value = localStorage.getItem('selectedEmotion') || 'unsure'
      try {
        const qa = localStorage.getItem('quizAnswers')
        if (qa) quizAnswers.value = JSON.parse(qa)
      } catch { quizAnswers.value = {} }
      try {
        const sh = JSON.parse(localStorage.getItem('savedHobbies') || '[]')
        savedIds.value = sh.map(h => h.id)
      } catch { savedIds.value = [] }
      buildList()
    })

    return {
      isUnsure, primary, secondary, hasMore, remainingCount,
      showMore, isSaved, saveActivity
    }
  }
}
</script>
