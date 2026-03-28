<template>
  <div class="w-full max-w-md mx-auto mb-8">

    <!-- Step count -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-xs text-text-secondary">
        Question {{ current }} of {{ total }}
      </span>
      <span class="text-xs text-text-secondary">
        {{ Math.round((current / total) * 100) }}%
      </span>
    </div>

    <!-- Progress bar -->
    <div class="w-full bg-soft-sage rounded-full h-1.5">
      <div
        class="bg-olive-green h-1.5 rounded-full transition-all duration-500 ease-out"
        :style="{ width: `${(current / total) * 100}%` }"
      ></div>
    </div>

    <!-- Step dots -->
    <div class="flex justify-center gap-2 mt-3">
      <span
        v-for="n in total"
        :key="n"
        class="transition-all duration-300"
      >
        <ion-icon
          :name="n < current ? 'checkmark-circle' : n === current ? 'ellipse' : 'ellipse-outline'"
          :style="`font-size: ${n === current ? '0.7rem' : '0.55rem'};`"
          :class="n <= current ? 'text-olive-green' : 'text-text-secondary opacity-30'"
        ></ion-icon>
      </span>
    </div>

    <p class="text-xs text-text-secondary mt-2 opacity-60 text-center">
      Take your time
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProgressIndicator',
  props: {
    current: { type: Number, required: true },
    total:   { type: Number, required: true }
  }
}
</script>
