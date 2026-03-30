<template>
  <div class="min-h-screen py-14">
    <div class="max-w-3xl mx-auto px-5">

      <!-- Header -->
      <div class="text-center mb-12 fade-up">
        <ion-icon name="leaf" class="text-olive-green mb-4" style="font-size:2.2rem;"></ion-icon>
        <h1 class="font-heading text-fluid-2xl text-text-primary mb-4">About CalmCraft</h1>
        <p class="text-fluid-base text-text-secondary leading-relaxed">
          Healing through hobbies, one gentle moment at a time.
        </p>
      </div>

      <div class="space-y-8">

        <!-- Philosophy -->
        <section class="card fade-up">
          <div class="flex items-center gap-2 mb-5">
            <ion-icon name="flower-outline" class="text-olive-green" style="font-size:1.3rem;"></ion-icon>
            <h2 class="font-heading text-fluid-xl text-text-primary">Our Philosophy</h2>
          </div>
          <div class="space-y-4 text-text-secondary text-sm leading-relaxed">
            <p>
              CalmCraft believes that healing doesn't always happen in therapy rooms or through grand gestures.
              Sometimes, it happens in the quiet moments when we're kneading bread, painting with watercolors,
              or simply breathing deeply while tending to a plant.
            </p>
            <p>
              This is not a medical website. We don't promise to fix you because you're not broken.
              We don't use clinical language because healing can be gentle and human.
              We don't rush you because growth happens in its own time.
            </p>
            <p>
              Instead, we offer a soft space to explore activities that might bring you comfort,
              connection, and moments of peace. We believe in the healing power of creativity,
              presence, and doing things simply because they feel right.
            </p>
          </div>
        </section>

        <!-- Personal Story -->
        <section class="card fade-up delay-1">
          <div class="flex items-center gap-2 mb-5">
            <ion-icon name="restaurant-outline" class="text-olive-green" style="font-size:1.3rem;"></ion-icon>
            <h2 class="font-heading text-fluid-xl text-text-primary">A Personal Story</h2>
          </div>
          <div class="space-y-4 text-text-secondary text-sm leading-relaxed">
            <p>
              CalmCraft was born from something very personal in my life.
            </p>
            <p>
              Whenever I felt stressed or anxious, I didn’t always know how to deal with it. 
              Somehow, I would turn to cooking—not as a routine, but as a way to feel a little more at ease. Even on difficult days, the kitchen became a place of comfort.
              As I explored different dishes and experimented with flavors, cooking slowly became more than just a task—it became a space where I could breathe.
            </p>
            <p>
              What surprised me the most was this: a simple hobby had quietly turned into a form of therapy. Over time, I realized it was never just about cooking.
              At different stages of my life, I found comfort in different things—art, creative activities, and small moments of doing something for myself.
            </p>
            <p>
              I never cook because it is my responsibility. I cook because I love it.
              And somewhere in that process, I discovered something important: sometimes, the most powerful healing doesn’t come from big solutions—it comes from small, meaningful moments we create for ourselves.
            </p>
            <p>
              CalmCraft exists to share that feeling with you. 
              Because maybe, you have something like that too.
            </p>
          </div>
        </section>

        <!-- Values -->
        <section class="card fade-up delay-2">
          <div class="flex items-center gap-2 mb-6">
            <ion-icon name="heart-circle-outline" class="text-olive-green" style="font-size:1.3rem;"></ion-icon>
            <h2 class="font-heading text-fluid-xl text-text-primary">Our Values</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-5">
            <div v-for="value in values" :key="value.title" class="flex items-start gap-3">
              <ion-icon :name="value.icon" class="text-olive-green flex-shrink-0 mt-0.5" style="font-size:1.2rem;"></ion-icon>
              <div>
                <h3 class="font-heading text-base text-text-primary mb-1">{{ value.title }}</h3>
                <p class="text-text-secondary text-sm leading-relaxed">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Final reminder -->
        <section class="bg-soft-sage rounded-2xl p-8 text-center fade-up delay-3">
          <ion-icon name="moon-outline" class="text-olive-green mb-4" style="font-size:1.6rem;"></ion-icon>
          <h2 class="font-heading text-fluid-xl text-text-primary mb-4">A Gentle Reminder</h2>
          <p class="text-text-secondary text-sm leading-relaxed italic max-w-md mx-auto">
            CalmCraft does not push. CalmCraft does not rush. CalmCraft does not judge.
            <br><br>
            This website exists to sit quietly with you —
            until you're ready to explore again.
          </p>
        </section>

        <!-- CTA -->
        <div class="text-center pb-4 fade-up delay-4">
          <router-link to="/" class="btn-primary inline-flex items-center gap-2">
            <ion-icon name="sparkles-outline" style="font-size:1rem;"></ion-icon>
            Begin your gentle journey
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  setup() {
    const values = [
      {
        title: 'Emotional Safety',
        icon: 'shield-checkmark-outline',
        description: 'Every interaction is designed to make you feel safe, seen, and accepted exactly as you are.'
      },
      {
        title: 'No Pressure',
        icon: 'hand-left-outline',
        description: 'There are no shoulds here. No timelines. No expectations. Only gentle invitations.'
      },
      {
        title: 'Process Over Product',
        icon: 'color-palette-outline',
        description: 'We care about how activities make you feel, not what you create or achieve.'
      },
      {
        title: 'Gentle Growth',
        icon: 'leaf-outline',
        description: 'Healing happens slowly, quietly, in small moments of connection with ourselves.'
      }
    ]

    return { values }
  }
}
</script>
