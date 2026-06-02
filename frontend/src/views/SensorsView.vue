<template>
  <section class="pb-10">
    
    <div class="mb-6 md:mb-8 hidden md:block anim-up">
      <h2 class="text-white font-bold text-2xl md:text-3xl" style="font-family: 'Fraunces', serif">
        Estado de los Sensores
      </h2>
      <p class="text-white/40 text-sm mt-1">
        Monitoreo en tiempo real de los contenedores de la comunidad.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      
      <div 
        v-for="(sensor, index) in sensors" 
        :key="index"
        class="card-glass p-5 flex flex-col justify-between transition-all duration-300 md:hover:-translate-y-1.5 md:hover:shadow-[0_12px_40px_-10px_rgba(52,211,153,0.15)] anim-up cursor-default" 
        :style="{ animationDelay: `${index * 0.08}s` }"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div :class="`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-${getColor(sensor.status)}-500/15 flex items-center justify-center flex-shrink-0`">
              <component :is="sensor.icon" :class="`text-${getColor(sensor.status)}-400 w-5 h-5 md:w-6 md:h-6`" />
            </div>
            
            <div>
              <p class="text-white text-sm md:text-base font-semibold">{{ sensor.name }}</p>
              <div class="flex items-center gap-1.5 mt-1">
                <span :class="`sensor-pulse inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-${getColor(sensor.status)}-400`"></span>
                <span :class="`text-${getColor(sensor.status)}-400 text-[10px] md:text-xs font-medium`">
                  {{ sensor.level }}% LLENO
                </span>
              </div>
            </div>
          </div>
          
          <span class="text-white/30 text-[10px] md:text-xs font-bold tracking-wider bg-white/5 px-2 py-1 rounded-md">
            {{ getStatusText(sensor.status) }}
          </span>
        </div>

        <div class="mt-auto">
          <div class="compost-bar bg-white/5 h-1.5 md:h-2">
            <div 
              :class="`compost-fill bg-${getColor(sensor.status)}-400`" 
              :style="{ width: `${sensor.level}%` }"
            ></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Apple, Recycle, Trash2, BatteryWarning } from 'lucide-vue-next';
import { api } from '@/api.js';

const iconMap = { organic: Apple, recycle: Recycle, general: Trash2, battery: BatteryWarning };
const sensors = ref([]);

onMounted(async () => {
  const data = await api.getSensors();
  sensors.value = data.map(s => ({ ...s, icon: iconMap[s.icon_type] }));
});

const getColor      = (status) => status === 'critical' ? 'rose' : status === 'warning' ? 'amber' : 'emerald';
const getStatusText = (status) => status === 'critical' ? 'URGENTE' : status === 'warning' ? 'ALTO' : 'NORMAL';
</script>