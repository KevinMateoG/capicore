<script setup>
defineProps({
  currentTab:{
    type: String,
    required: true
  }
})
defineEmits(['change-tab'])
</script>
<template>
    <div class="absolute bottom-0 left-0 right-0 z-40"
         style="background:linear-gradient(transparent,rgba(10,10,18,.95) 30%)">
      <div>
        <button @click="$emit('change-tab', 'dashboard')"
        :class="['flex flex-col items-center gap-1', currentTab === 'dashboard' ? 'text-emerald-400' : 'text-white/30']">
          <span class="text-[9px] font-medium">Inicio</span>
        </button>

        <button @click="$emit('change-tab', 'sensors')"
                :class="['flex flex-col items-center gap-1', currentTab === 'sensors' ? 'text-emerald-400' : 'text-white/30']">
          <span class="text-[9px] font-medium">Sensors</span>
        </button>

        <button @click="$emit('change-tab', 'compost')"
                :class="['flex flex-col items-center gap-1', currentTab === 'compost' ? 'text-emerald-400' : 'text-white/30']">
          <span class="text-[9px] font-medium">Compost</span>
        </button>

      </div>
    </div>
</template>