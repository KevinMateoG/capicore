<template>
  <aside class="w-60 h-full flex flex-col shrink-0 bg-[#0a0a12] border-r border-white/5 py-8 px-4">
    
    <div class="flex items-center gap-3 px-3 mb-10">
      <div class="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
        <Leaf class="text-emerald-400 w-4 h-4" />
      </div>
      <span class="font-bold text-base tracking-wide text-white" style="font-family:'Fraunces',serif">
        EcoResidencial
      </span>
    </div>

    <nav class="flex flex-col gap-1 flex-1">
      <button 
        @click="$emit('change-tab','dashboard')"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-all duration-300',
          currentTab==='dashboard' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-white/40 hover:bg-white/5 hover:text-white/80']"
      >
        <LayoutDashboard class="w-4 h-4 shrink-0" />
        Inicio
      </button>
      <button 
        @click="$emit('change-tab','sensors')"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-all duration-300',
          currentTab==='sensors' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-white/40 hover:bg-white/5 hover:text-white/80']"
      >
        <Radio class="w-4 h-4 shrink-0" />
        Sensores
      </button>
      <button 
        @click="$emit('change-tab','compost')"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-all duration-300',
          currentTab==='compost' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-white/40 hover:bg-white/5 hover:text-white/80']"
      >
        <Sprout class="w-4 h-4 shrink-0" />
        Compost
      </button>
    </nav>

    <div class="pt-6 border-t border-white/5">
      <button class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:bg-white/5 hover:text-white/80 transition-all w-full">
        <Bell class="w-4 h-4 shrink-0" /> Alertas
      </button>
      <button class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:bg-white/5 hover:text-white/80 transition-all w-full mt-1">
        <Settings class="w-4 h-4 shrink-0" /> Configuración
      </button>
    </div>

  </aside>
</template>

<script setup>
import { LayoutDashboard, Radio, Sprout, Leaf, Bell, Settings } from 'lucide-vue-next';
defineProps({ currentTab: { type: String, required: true } });
defineEmits(['change-tab']);
</script>