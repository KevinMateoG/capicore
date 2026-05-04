<script setup>
import {computed, ref} from 'vue'
import { Sprout, Thermometer, Droplets, Lightbulb } from 'lucide-vue-next';

const participants = ref([
  { name: 'Apto 201 — Familia Ruiz', kg: '12.5 kg', color: 'bg-emerald-500' },
  { name: 'Apto 304 — Familia Torres', kg: '9.8 kg', color: 'bg-lime-500' },
  { name: 'Apto 102 — Familia Méndez', kg: '8.2 kg', color: 'bg-teal-500' },
  { name: 'Apto 405 — Familia López', kg: '6.1 kg', color: 'bg-green-500' },
])

</script>

<template>
  <section class="px-5 pb-28">
    <div class="card-glass p-5 mb-4 anim-up">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-11 h-11 rounded-2xl bg-lime-500/15 flex items-center justify-center">
          <Sprout class="text-lime-400 w-[22px] h-[22px]"/>
        </div>
        <div>
          <p class="text-white font-semibold text-sm">
            Compostera Comunitaria
          </p>
          <p class="text-white/40 text-xs">
            Ciclo Actual: Dia 18 de 45
          </p>
        </div>
      </div>
      <div class="compost-bar mb-2" style="height: 10px">
        <div class="compost-fill bg-gradient-to-r from-lime-500 to-emerald-400" style="width: 40%">

        </div>
        <p class="text-white/50 text-[10px]">
          40% del ciclo completado — Fase de descomposición activa
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-4 anim-up anim-d1">
        <div class="card-glass p-4">
          <Thermometer class="text-orange-400 mb-2 w-[18px] h-[18px]"/>
          <p class="text-white font-bold text-lg" style="font-family: 'Fraunces', serif">54°C</p>
          <p class="text-white/40 text-[10px]">
            Temperatura
          </p>
        </div>
        <div class="card-glass p-4">
          <Droplets class="text-sky-400 mb-2 w-[18px] h-[18px]"/>
          <p class="text-white font-bold text-lg" style="font-family: 'Fraunces', serif">62%</p>
          <p class="text-white/40 text-[10px]">
            Humedad
          </p>
        </div>
      </div>
      <div class="card-glass p-4 mb-4 anim-up anim-d2">
        <p class="text-white font-semibold text-sm mb-3">
          Participantes activos
        </p>
        <div class="space-y-2">
          <div v-for="(participant, index) in participants" :key="index"
              class="flex items-center justify-between py-1.5">
            <div class="flex items-center gap-2.5">
              <div :class="['w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold', participant.color]">
                {{ index + 1 }}
              </div>
              <span class="text-white/70 text-xs">
                {{ participant.name }}
              </span>
            </div>
            <span class="text-emerald-400 text-xs font-semibold">
              {{ participant.kg }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="card-glass p-4 anim-up anim-d3" style="border-color: rgba(132,204,22,.15)">
      <div class="flex items-start gap-3">
        <Lightbulb class="text-yellow-400 mt-0.5 flex-shrink-0 w-4 h-4" />
        <div>
          <p class="text-white font-semibold text-xs mb-1">
            Tip del dia
          </p>
          <p class="text-white/50 text-xs leading-relaxed">
            Las cáscaras de huevo trituradas ayudan a equilibrar el pH de tu compostera. ¡Agrégalas en pequeñas cantidades!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>