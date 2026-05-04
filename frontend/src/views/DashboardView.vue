<script setup>
import { ref } from 'vue'

import { Trash2, Recycle, Leaf } from 'lucide-vue-next'

const recyclingData = ref([
  { name: 'Plástico', percentage: 62, textColor: 'text-cyan-400', bgColor: 'bg-cyan-400' },
  { name: 'Papel/Cartón', percentage: 78, textColor: 'text-blue-400', bgColor: 'bg-blue-400' },
  { name: 'Vidrio', percentage: 45, textColor: 'text-emerald-400', bgColor: 'bg-emerald-400' },
  { name: 'Metal', percentage: 33, textColor: 'text-amber-400', bgColor: 'bg-amber-400' }
])

const weekData = ref([42,38,55,47,63,51,33])
const weekDays = ref(['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'])

const maxChartValue = Math.max(...weekData.value)

const calculateHeight = (value) => {
  return Math.round((value / maxChartValue) * 100)
}

const isToday = (index) => {
  const currentDay = new Date().getDay()
  const adjuntedTodayIndex = currentDay === 0 ? 6 : currentDay - 1
  return index === adjuntedTodayIndex
}

</script>

<template>
  <section>
    <div class="card-glass p-5 mb-4 flex items-center gap-5 anim-up anim-d1">
      <div class="relative" style="width: 100px; height: 100px; flex-shrink: 0">
        <svg viewBox="0 0 100 100" width="100" height="100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="8" />
          <circle
              class="gauge-ring"
              cx="50" cy="50" r="42"
              stroke="#6ee7a0" stroke-width="8"
              stroke-dasharray="263.9"
              stroke-dashoffset="79.2"
              transform="rotate(-90 50 50)"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-while font-bold text-2xl" style="font-family: 'Fraunces', serif">70%</span>
          <span class="text-while/40 text-[9px]">Capacidad</span>
        </div>
      </div>
      <div>
        <p class="text-white font-semibold text-sm text-sm mb-1">
          Contenedor Principal
        </p>
        <p class="text-white/40 text-xs leading-relaxed">
          Sensor ultrasónico activo. Próxima recolección estimada en
          <span class="text-amber-400 font-medium">2 días</span>.
        </p>
        <div class="flex items-center gap-1 mt-2">
          <span class="sensor-pulse inline-block w-2 h-2 rounded-full bg-emerald-400">

          </span>
          <span class="text-emerald-400 text-[10px] font-medium">
            EN LINEA
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 mb-4 anim-up anim-d2">
      <div class="card-glass p-3 text-center">
        <Trash2 class="mx-auto mb-1.5 text-rose-400 w-[18px] h-[18px]" />
        <p class="text-white font-bold text-base" style="font-family: 'Fraunces', serif">324</p>
        <p class="text-white/40 text-[9px] mt-0.5">KG ESTE MES</p>
      </div>
      <div class="card-glass p-3 text-center">
        <Recycle class="mx-auto mb-1.5 text-cyan-400 w-[18px] h-[18px]" />
        <p class="text-white font-bold text-base" style="font-family: 'Fraunces', serif">47%</p>
        <p class="text-white/40 text-[9px] mt-0.5">RECICLADO</p>
      </div>
      <div class="card-glass p-3 text-center">
        <Leaf class="mx-auto mb-1.5 text-lime-400 w-[18px] h-[18px]" />
        <p class="text-white font-bold text-base" style="font-family: 'Fraunces', serif">58</p>
        <p class="text-white/40 text-[9px] mt-0.5">KG COMPOST</p>
      </div>
    </div>

    <div class="card-glass p-4 mb-4 anim-up anim-d3">
      <p class="text-white font-semibold text-sm mb-3">Desglose de Reciclaje</p>
      <div class="space-y-3">
        <div v-for="(item, index) in recyclingData" :key="index">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-white/60">{{ item.name }}</span>
            <span :class="[item.textColor, 'font-medium']">{{ item.percentage }}%</span>
          </div>
          <div class="compost-bar">
            <div :class="['compost-fill', item.bgColor]" :style="{ width: `${item.percentage}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-glass p-4 anim-up anim-d4">
      <p class="text-white font-semibold text-sm mb-3">Residuos Semanal (kg)</p>
      <div class="flex items-end justify-between gap-2" style="height: 80px">
        <div v-for="(value, index) in weekData" :key="index" class="flex flex-col items-center gap-1 flex-1">
          <div
              :class="['w-full rounded-lg', isToday(index) ? 'bg-emerald-400' : 'bg-white/10']"
              :style="{ height: `${calculateHeight(value)}%`, minHeight: '8px', transition: 'height .5s ease' }"
          ></div>
          <span :class="['text-[9px]', isToday(index) ? 'text-emerald-400' : 'text-white/30']">
            {{ weekDays[index] }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>