<script setup>
import { ref } from 'vue'
import { Apple, Recycle } from 'lucide-vue-next'

const sensors = ref([
  { name: 'Torre A - Organicos', level: 82, status: 'Warning', icon: Apple},
  { name: 'Torre A - Reciclaje', level: 45 , status: 'Ok', icon: Recycle},
  { name: 'Torre C - Reciclaje', level: 91 , status: 'Critical', icon: Apple},
])
const getColor = () => {
  if (status === 'Critical') return 'rose'
  if (status === 'Warning') return 'amber'
  return 'emerald'
}

const getStatusText = () => {
  if (status === 'Critical') return 'URGENTE'
  if (status === 'Warning') return 'ALTO'
  return 'OK'
}
</script>

<template>
    <section class="px-5 pb-28">
        <div>
          <div v-for="(sensor, index) in sensors" :key="index" class="card-glass p-4 anim-up"
          :style="{ animationDeplay: `${index * 0.08}s` }">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2.5">
                <div :class="`w-9 h-9 rounded-xl bg-${getColor(sensor.status)}-500/15 flex items-center justify-center`">
                  <component :is="sensor.icon" :class="`text-${getColor(sensor.status)}-400 w-4 h-4`" />
                </div>

                <div>
                  <p class="text-white text-xs font-semibold">
                    {{ sensor.name }}
                  </p>
                  <div class="flex items-center gap-1 mt-0.5">
                    <span :class="`sensor-pulse inline-block w-1.5 h-1.5 rounded-full bg-${getColor(sensor.status)}-400`"></span>
                    <span :class="`text-${getColor(sensor.status)}-400 text-[9px]`">{{ sensor.level }}% lleno</span>

                  </div>
                </div>

              </div>
              <span class="text-white/30 text-[10px]">{{ getStatusText(sensor.status) }}</span>

            </div>
            <div class="compost-bar">
              <div :class="`compost-fill bg-${getColor(sensor.status)}-400`" :style="{ width: `${sensor.level}%` }">
              </div>
            </div>
          </div>
        </div>
    </section>

</template>