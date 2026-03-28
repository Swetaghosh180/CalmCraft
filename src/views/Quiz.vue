<template>
  <div class="min-h-screen py-14">
    <div class="max-w-xl mx-auto px-5">

      <p class="text-center text-sm text-text-secondary mb-8 fade-in italic">
        Take your time. There's no rush here.
      </p>

      <ProgressIndicator :current="currentQuestion + 1" :total="questions.length" />

      <transition name="slide-question" mode="out-in">
        <div :key="currentQuestion" class="card-primary fade-up">

          <h2 class="font-heading text-fluid-xl text-text-primary mb-3 text-center">
            {{ questions[currentQuestion].question }}
          </h2>

          <p class="text-text-secondary text-sm text-center mb-8 leading-relaxed">
            {{ questions[currentQuestion].subtitle }}
          </p>

          <!-- Options -->
          <div class="space-y-3 mb-8">
            <button
              v-for="option in questions[currentQuestion].options"
              :key="option.value"
              @click="selectAnswer(option.value)"
              class="quiz-option"
              :class="answers[questions[currentQuestion].id] === option.value ? 'quiz-option-selected' : ''"
            >
              <div class="flex items-center gap-3">
                <ion-icon :name="option.icon" class="text-olive-green flex-shrink-0" style="font-size:1.3rem;"></ion-icon>
                <span class="text-text-primary text-sm leading-snug">{{ option.label }}</span>
              </div>
            </button>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between items-center">
            <button
              v-if="currentQuestion > 0"
              @click="previousQuestion"
              class="btn-ghost inline-flex items-center gap-1"
            >
              <ion-icon name="arrow-back-outline" style="font-size:1rem;"></ion-icon>
              Back
            </button>
            <div v-else></div>

            <button @click="skipQuestion" class="btn-ghost text-xs opacity-60 hover:opacity-100">
              Skip for now
            </button>
          </div>
        </div>
      </transition>

      <p class="pause-moment mt-6">
        {{ pauseMessages[currentQuestion % pauseMessages.length] }}
      </p>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProgressIndicator from '../components/ProgressIndicator.vue'

export default {
  name: 'Quiz',
  components: { ProgressIndicator },
  setup() {
    const router = useRouter()
    const currentQuestion = ref(0)
    const answers = ref({})

    const pauseMessages = [
      'Take your time',
      'There\'s no rush here',
      'You\'re doing enough',
      'Be honest with yourself',
      'Every answer is the right one'
    ]

    const questions = [
      {
        id: 'energy',
        question: 'How much energy do you have right now?',
        subtitle: 'Be honest with yourself. There\'s no judgment here.',
        options: [
          { value: 'low',    label: 'Very little — I need something gentle', icon: 'moon-outline' },
          { value: 'medium', label: 'Some energy — I can focus a little',    icon: 'partly-sunny-outline' },
          { value: 'high',   label: 'Good energy — I\'m ready to engage',    icon: 'sunny-outline' }
        ]
      },
      {
        id: 'time',
        question: 'How much time feels right today?',
        subtitle: 'Choose what feels comfortable, not what you think you should do.',
        options: [
          { value: 'short',  label: '5–15 minutes — just a small moment', icon: 'timer-outline' },
          { value: 'medium', label: '30–60 minutes — a gentle hour',       icon: 'time-outline' },
          { value: 'long',   label: 'A few hours — I have space today',    icon: 'hourglass-outline' }
        ]
      },
      {
        id: 'setting',
        question: 'Where do you feel most comfortable?',
        subtitle: 'Trust your instincts about what feels safe.',
        options: [
          { value: 'indoor',  label: 'Inside — cozy and contained',  icon: 'home-outline' },
          { value: 'outdoor', label: 'Outside — fresh air and space', icon: 'leaf-outline' },
          { value: 'either',  label: 'Either feels okay today',       icon: 'swap-horizontal-outline' }
        ]
      },
      {
        id: 'social',
        question: 'Do you want to be around others?',
        subtitle: 'Both choices are perfectly valid.',
        options: [
          { value: 'alone',    label: 'Just me — I need quiet space',        icon: 'person-outline' },
          { value: 'social',   label: 'With others — connection sounds nice', icon: 'people-outline' },
          { value: 'flexible', label: 'I\'m open to either',                  icon: 'shuffle-outline' }
        ]
      },
      {
        id: 'expression',
        question: 'What kind of activity calls to you?',
        subtitle: 'There\'s no right answer — just what feels true.',
        options: [
          { value: 'calm',     label: 'Something calming and grounding',   icon: 'water-outline' },
          { value: 'creative', label: 'Something expressive and creative', icon: 'color-palette-outline' },
          { value: 'active',   label: 'Something that gets me moving',     icon: 'walk-outline' }
        ]
      }
    ]

    const selectAnswer = (value) => {
      answers.value[questions[currentQuestion.value].id] = value
      setTimeout(() => nextQuestion(), 280)
    }

    const nextQuestion = () => {
      if (currentQuestion.value < questions.length - 1) {
        currentQuestion.value++
      } else {
        completeQuiz()
      }
    }

    const previousQuestion = () => {
      if (currentQuestion.value > 0) currentQuestion.value--
    }

    const skipQuestion = () => nextQuestion()

    const completeQuiz = () => {
      localStorage.setItem('quizAnswers', JSON.stringify(answers.value))
      router.push('/recommendations')
    }

    onMounted(() => {
      try {
        const saved = localStorage.getItem('quizAnswers')
        if (saved) answers.value = JSON.parse(saved)
      } catch {
        localStorage.removeItem('quizAnswers')
        answers.value = {}
      }
    })

    return {
      currentQuestion, questions, answers, pauseMessages,
      selectAnswer, previousQuestion, skipQuestion
    }
  }
}
</script>

<style scoped>
.slide-question-enter-active { transition: all 0.35s ease; }
.slide-question-leave-active { transition: all 0.22s ease; }
.slide-question-enter-from   { opacity: 0; transform: translateX(24px); }
.slide-question-leave-to     { opacity: 0; transform: translateX(-16px); }
</style>
