<template>
  <section class="pb-10">
    
    <div class="mb-6 md:mb-8 hidden md:block anim-up">
      <h2 class="text-white font-bold text-2xl md:text-3xl" style="font-family: 'Fraunces', serif">
        Compostaje Comunitario
      </h2>
      <p class="text-white/40 text-sm mt-1">
        Estado del ciclo actual y contribuciones de los vecinos.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
      
      <div class="lg:col-span-7 flex flex-col gap-5 md:gap-6">
        
        <div class="card-glass p-5 md:p-7 anim-up anim-d1">
          <div class="flex items-center gap-4 mb-5 md:mb-6">
            <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-lime-500/15 flex items-center justify-center flex-shrink-0">
              <Sprout class="text-lime-400 w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <p class="text-white font-semibold text-base md:text-lg">Compostera Principal</p>
              <p class="text-white/40 text-xs md:text-sm mt-0.5">Ciclo actual: Día 18 de 45</p>
            </div>
          </div>
          <div class="compost-bar bg-white/5 h-2 md:h-3 mb-2.5">
            <div class="compost-fill bg-gradient-to-r from-lime-500 to-emerald-400" style="width: 40%"></div>
          </div>
          <p class="text-white/50 text-[10px] md:text-xs tracking-wide">
            40% COMPLETADO — FASE DE DESCOMPOSICIÓN ACTIVA
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 md:gap-6 anim-up anim-d2">
          <div class="card-glass p-5 md:p-6 text-center hover:bg-white/[0.06] transition-colors">
            <Thermometer class="text-orange-400 mx-auto mb-2 md:mb-3 w-6 h-6 md:w-8 md:h-8" />
            <p class="text-white font-bold text-2xl md:text-4xl" style="font-family: 'Fraunces', serif">54°C</p>
            <p class="text-white/40 text-[10px] md:text-xs mt-1 md:mt-2 tracking-wider">TEMPERATURA</p>
          </div>
          <div class="card-glass p-5 md:p-6 text-center hover:bg-white/[0.06] transition-colors">
            <Droplets class="text-sky-400 mx-auto mb-2 md:mb-3 w-6 h-6 md:w-8 md:h-8" />
            <p class="text-white font-bold text-2xl md:text-4xl" style="font-family: 'Fraunces', serif">62%</p>
            <p class="text-white/40 text-[10px] md:text-xs mt-1 md:mt-2 tracking-wider">HUMEDAD</p>
          </div>
        </div>

        <div class="card-glass p-5 md:p-6 anim-up anim-d3 border-lime-500/20 bg-lime-500/5">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb class="text-yellow-400 w-4 h-4" />
            </div>
            <div>
              <p class="text-white font-semibold text-sm md:text-base mb-1.5 md:mb-2">Tip del día</p>
              <p class="text-white/60 text-xs md:text-sm leading-relaxed">
                Las cáscaras de huevo trituradas ayudan a equilibrar el pH de tu compostera. ¡Agrégalas en pequeñas cantidades para mejores resultados!
              </p>
            </div>
          </div>
        </div>

      </div>

      <div class="lg:col-span-5 anim-up anim-d4">
        <div class="card-glass p-5 md:p-7 h-full flex flex-col">
          <div class="flex items-center justify-between mb-5 md:mb-6">
            <h3 class="text-white font-semibold text-sm md:text-base">Ranking del Mes</h3>
            <span class="text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2.5 py-1 rounded-full">Top Activos</span>
          </div>
          
          <div class="flex-1 space-y-2 md:space-y-3">
            <div 
              v-for="(participant, index) in participants" 
              :key="index"
              class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 rounded-xl md:hover:bg-white/5 transition-colors group cursor-default"
            >
              <div class="flex items-center gap-3 md:gap-4">
                <div 
                  :class="['w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg', participant.color]"
                >
                  {{ index + 1 }}
                </div>
                <span class="text-white/70 group-hover:text-white transition-colors text-xs md:text-sm font-medium">
                  {{ participant.name }}
                </span>
              </div>
              <span class="text-emerald-400 text-xs md:text-sm font-bold">{{ participant.kg }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Sprout, Thermometer, Droplets, Lightbulb } from 'lucide-vue-next';

const participants = ref([
  { name: 'Apto 201 — Familia Ruiz', kg: '12.5 kg', color: 'bg-emerald-500' },
  { name: 'Apto 304 — Familia Torres', kg: '9.8 kg', color: 'bg-lime-500' },
  { name: 'Apto 102 — Familia Méndez', kg: '8.2 kg', color: 'bg-teal-500' },
  { name: 'Apto 405 — Familia López', kg: '6.1 kg', color: 'bg-green-500' },
  { name: 'Apto 105 — Familia Castro', kg: '4.3 kg', color: 'bg-emerald-500/50' },
  { name: 'Apto 502 — Familia Silva', kg: '2.1 kg', color: 'bg-emerald-500/30' },
]);
</script>
