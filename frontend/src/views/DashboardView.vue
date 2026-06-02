<template>
  <section class="pb-6 space-y-4">

    <!-- Fila 1: Contenedor principal -->
    <div class="card-glass p-5 flex flex-row items-center gap-5 anim-up anim-d1">
      <!-- Gauge circular -->
      <div class="relative shrink-0 w-24 h-24">
        <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="9"/>
          <circle cx="50" cy="50" r="42" fill="none" stroke="#6ee7a0" stroke-width="9"
                  stroke-dasharray="263.9" stroke-dashoffset="79.2" stroke-linecap="round"/>
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-white font-bold text-2xl leading-none" style="font-family:'Fraunces',serif">70%</span>
          <span class="text-white/40 text-[9px] tracking-widest mt-0.5">CAP.</span>
        </div>
      </div>
      <!-- Info -->
      <div class="min-w-0 flex-1">
        <h2 class="text-white font-semibold text-sm md:text-base truncate">Contenedor Principal</h2>
        <p class="text-white/50 text-xs leading-relaxed mt-1">
          Sensor activo · Recolección en <span class="text-amber-400 font-medium">2 días</span>
        </p>
        <div class="flex items-center gap-2 mt-3">
          <span class="sensor-pulse inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="text-emerald-400 text-[10px] font-semibold tracking-wider">EN LÍNEA</span>
        </div>
      </div>
    </div>

    <!-- Fila 2: 3 tarjetas de stats -->
    <div class="grid grid-cols-3 gap-3 anim-up anim-d2">
      <div class="card-glass p-4 flex flex-col items-center justify-center text-center gap-1.5">
        <Trash2 class="text-rose-400 w-5 h-5 shrink-0" />
        <p class="text-white font-bold text-xl leading-none" style="font-family:'Fraunces',serif">{{ stats.kg_total }}</p>
        <p class="text-white/40 text-[9px] tracking-wide leading-tight">KG ESTE MES</p>
      </div>
      <div class="card-glass p-4 flex flex-col items-center justify-center text-center gap-1.5">
        <Recycle class="text-cyan-400 w-5 h-5 shrink-0" />
        <p class="text-white font-bold text-xl leading-none" style="font-family:'Fraunces',serif">{{ stats.recycled_percentage }}%</p>
        <p class="text-white/40 text-[9px] tracking-wide">RECICLADO</p>
      </div>
      <div class="card-glass p-4 flex flex-col items-center justify-center text-center gap-1.5">
        <Leaf class="text-lime-400 w-5 h-5 shrink-0" />
        <p class="text-white font-bold text-xl leading-none" style="font-family:'Fraunces',serif">{{ stats.compost_kg }}</p>
        <p class="text-white/40 text-[9px] tracking-wide">KG COMPOST</p>
      </div>
    </div>

    <!-- Fila 3: Desglose de Reciclaje + Gráfica semanal -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 anim-up anim-d3">

      <!-- Desglose reciclaje -->
      <div class="card-glass p-5">
        <h3 class="text-white font-semibold text-sm mb-4">Desglose de Reciclaje</h3>
        <div class="space-y-3.5">
          <div v-for="item in recyclingData" :key="item.name">
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-white/60">{{ item.name }}</span>
              <span :class="[item.textColor,'font-medium']">{{ item.percentage }}%</span>
            </div>
            <div class="compost-bar">
              <div :class="['compost-fill', item.bgColor]" :style="{ width: item.percentage+'%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráfica semanal -->
      <div class="card-glass p-5">
        <h3 class="text-white font-semibold text-sm mb-4">Residuos Semanal (kg)</h3>
        <div class="flex items-end justify-between gap-1.5 h-36">
          <div
            v-for="(val, i) in weekData" :key="i"
            class="flex flex-col items-center gap-1.5 flex-1 h-full justify-end group"
          >
            <div
              :class="['w-full rounded-t-md transition-all duration-500 cursor-pointer',
                isToday(i) ? 'bg-emerald-400' : 'bg-white/10 hover:bg-white/20']"
              :style="{ height: calcH(val)+'%', minHeight:'6px' }"
            ></div>
            <span :class="['text-[9px] font-medium', isToday(i) ? 'text-emerald-400' : 'text-white/40']">
              {{ weekDays[i] }}
            </span>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Trash2, Recycle, Leaf } from 'lucide-vue-next';
import { api } from '@/api.js';

const recyclingData = ref([]);
const weekData      = ref([]);
const stats         = ref({});
const weekDays      = ref(['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']);

const maxVal = computed(() => Math.max(...weekData.value, 1));
const calcH  = (v) => Math.round((v / maxVal.value) * 100);
const isToday = (i) => i === weekDays.value.length - 1;

onMounted(async () => {
  const data = await api.getDashboard();
  stats.value        = data.stats;
  recyclingData.value = data.breakdown.map(b => ({
    name: b.name,
    percentage: b.percentage,
    textColor: `text-${b.color}-400`,
    bgColor:   `bg-${b.color}-400`,
  }));

  if (data.weekly && data.weekly.length > 0) {
    const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    weekData.value = data.weekly.map(w => Number(w.kg));
    weekDays.value = data.weekly.map(w => {
      // Necesitamos asegurar que parsee la fecha correctamente
      const d = new Date(w.date);
      // Añadimos horas para evitar desfases de UTC si es necesario, o simplemente getUTCDay()
      // getUTCDay() suele ser más seguro para fechas que vienen de base de datos tipo 'YYYY-MM-DD'
      return dayNames[d.getUTCDay()];
    });
  } else {
    weekData.value = [0, 0, 0, 0, 0, 0, 0];
    weekDays.value = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  }
});
</script>
