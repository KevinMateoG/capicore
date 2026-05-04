<script setup>
defineProps({
  welcomeMessage: {
    type: String,
    default: '¡Hola, vecino!'
  },
  communityName: {
    type: String,
    default: 'Residencial los pinos'
  },
  subtitle: {
    type: String,
    default: 'Panel de gestion de residuos'
  }
})
</script>

<template>
  <header class="px-5 pt-3 pb-4 anim-up ">
    <p class="text-emerald-400/80 text-xs font-medium tracking-wider uppercase mb-1">
      {{ welcomeMessage }}
    </p>
    <h1 class="text-white font-bold text-xl" style="font-family: 'Fraunces', serif; font-size: 22px" >
      {{ communityName}}
    </h1>
    <p class="text-white/40 text-xs mt-1">
      {{ subtitle }}
    </p>
  </header>
</template>

<style scoped>

</style>