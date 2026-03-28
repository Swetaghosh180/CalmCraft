<template>
  <div class="min-h-screen">

    <!-- ── Hero ── -->
    <section class="max-w-3xl mx-auto px-5 pt-8 pb-6 text-center">

      <p v-if="isReturning" class="fade-up text-sm text-olive-green mb-5 font-medium">
        Welcome back. How are you feeling today?
      </p>

      <h1 class="fade-up font-heading text-fluid-3xl text-text-primary mb-4 leading-tight">
        Healing Through Hobbies
      </h1>

      <p class="fade-up delay-1 text-fluid-base text-text-secondary mb-8 leading-relaxed max-w-xl mx-auto">
        Find a gentle activity based on how you feel right now.
        No pressure. No perfection. Just small moments that bring you back to yourself.
      </p>

      <router-link to="/quiz" class="fade-up delay-2 btn-primary inline-flex items-center gap-2">
        <ion-icon name="sparkles-outline" style="font-size:1.1rem;"></ion-icon>
        Find something that fits how I feel
      </router-link>

      <p class="fade-up delay-3 pause-moment mt-4">
        Take your time. There's no rush here.
      </p>
    </section>

    <!-- ── Emotion Selection ── -->
    <section class="max-w-4xl mx-auto px-5 pb-10">
      <h2 class="fade-up font-heading text-fluid-2xl text-center text-text-primary mb-2">
        How are you feeling today?
      </h2>
      <p class="fade-up delay-1 text-center text-text-secondary mb-6 max-w-sm mx-auto text-sm">
        Choose what resonates. There's no wrong answer here.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div
          v-for="(emotion, i) in emotions"
          :key="emotion.id"
          class="emotion-card fade-up"
          :class="selectedId === emotion.id ? 'emotion-card-selected' : ''"
          @click="selectEmotion(emotion)"
          :style="`animation-delay: ${(i + 1) * 0.08}s`"
        >
          <div>
            <ion-icon :name="emotion.icon" class="text-olive-green mb-2 block mx-auto" style="font-size:2rem;"></ion-icon>
            <h3 class="font-heading text-base text-text-primary mb-1">{{ emotion.name }}</h3>
            <p class="text-xs text-text-secondary">{{ emotion.description }}</p>
          </div>
        </div>
      </div>

      <!-- ── "I Don't Know How I Feel" ── -->
      <div class="max-w-2xl mx-auto">
        <div v-if="!showUnsureCard" class="text-center">
          <button @click="revealUnsureCard" class="btn-ghost text-base">
            I don't know how I feel
          </button>
        </div>

        <transition name="bloom">
          <div v-if="showUnsureCard" class="unsure-card fade-up">
            <p class="text-center text-text-secondary text-sm mb-8 italic">
              That's okay. Not knowing is a feeling too. Here are two gentle places to start.
            </p>

            <div class="grid md:grid-cols-2 gap-5">
              <!-- Grounding -->
              <div class="unsure-suggestion border-olive-green bg-soft-sage bg-opacity-40 p-6 rounded-2xl">
                <p class="text-xs font-medium text-olive-green uppercase tracking-wide mb-3">Grounding</p>
                <h4 class="font-heading text-text-primary mb-2">Grounding Breathing</h4>
                <p class="text-sm text-text-secondary leading-relaxed mb-5">
                  Sit quietly. Breathe in for 4, hold for 4, out for 6.
                  Let your breath be your anchor right now.
                </p>
                <router-link to="/hobby/grounding-breathing" class="btn-ghost inline-flex items-center gap-1 text-xs px-3 py-1">
                  Begin gently
                  <ion-icon name="arrow-forward-outline" style="font-size:0.85rem;"></ion-icon>
                </router-link>
              </div>

              <!-- Expressive -->
              <div class="unsure-suggestion border-muted-clay bg-warm-white p-6 rounded-2xl">
                <p class="text-xs font-medium text-muted-clay uppercase tracking-wide mb-3">Expressive</p>
                <h4 class="font-heading text-text-primary mb-2">Emotion Colour Discovery</h4>
                <p class="text-sm text-text-secondary leading-relaxed mb-5">
                  Choose colours without thinking. Let them tell you how you feel.
                  No plan needed — just colour.
                </p>
                <router-link to="/hobby/color-play" class="btn-ghost inline-flex items-center gap-1 text-xs px-3 py-1">
                  Begin gently
                  <ion-icon name="arrow-forward-outline" style="font-size:0.85rem;"></ion-icon>
                </router-link>
              </div>
            </div>

            <div class="text-center mt-8">
              <router-link
                to="/recommendations"
                @click="setUnsure"
                class="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <ion-icon name="grid-outline" style="font-size:1rem;"></ion-icon>
                Show me more gentle options
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </section>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const selectedId     = ref(null)
    const showUnsureCard = ref(false)
    const isReturning    = ref(false)

    const emotions = [
      { id: 'sad',      name: 'Sad',      icon: 'rainy-outline',       description: 'Feeling down or heavy' },
      { id: 'stressed', name: 'Stressed', icon: 'thunderstorm-outline', description: 'Overwhelmed or tense' },
      { id: 'anxious',  name: 'Anxious',  icon: 'pulse-outline',        description: 'Worried or restless' },
      { id: 'numb',     name: 'Numb',     icon: 'moon-outline',         description: 'Disconnected or empty' },
      { id: 'happy',    name: 'Happy',    icon: 'sunny-outline',        description: 'Content or joyful' }
    ]

    const selectEmotion = (emotion) => {
      selectedId.value = emotion.id
      localStorage.setItem('selectedEmotion', emotion.id)
      setTimeout(() => router.push('/quiz'), 320)
    }

    const revealUnsureCard = () => { showUnsureCard.value = true }
    const setUnsure = () => { localStorage.setItem('selectedEmotion', 'unsure') }

    onMounted(() => {
      if (localStorage.getItem('selectedEmotion')) isReturning.value = true
    })

    return {
      emotions, selectedId, showUnsureCard, isReturning,
      selectEmotion, revealUnsureCard, setUnsure
    }
  }
}
</script>

<style scoped>
.bloom-enter-active { transition: all 0.4s ease; }
.bloom-leave-active { transition: all 0.25s ease; }
.bloom-enter-from   { opacity: 0; transform: scale(0.97) translateY(10px); }
.bloom-leave-to     { opacity: 0; transform: scale(0.97); }
</style>
