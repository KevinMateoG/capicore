<template>
  <div class="h-full w-full bg-neutral-900 flex items-center justify-center overflow-auto">
    <div class="device-frame">
      <div class="notch"></div>
      
      <div class="app-scroll">
        <div class="flex items-center justify-between px-6 pt-10 pb-2 text-white/60 text-xs">
          <span>9:41</span>
          </div>

        <AppHeader communityName="Residencial Los Pinos" />

        <nav class="flex gap-1 px-5 mb-4">
          <button 
            @click="activeTab = 'dashboard'"
            :class="['px-3 py-1.5 text-xs font-semibold rounded-full', activeTab === 'dashboard' ? 'tab-active' : 'text-white/40']"
          >Dashboard</button>
          <button 
            @click="activeTab = 'sensors'"
            :class="['px-3 py-1.5 text-xs font-semibold rounded-full', activeTab === 'sensors' ? 'tab-active' : 'text-white/40']"
          >Sensores</button>
          <button 
            @click="activeTab = 'compost'"
            :class="['px-3 py-1.5 text-xs font-semibold rounded-full', activeTab === 'compost' ? 'tab-active' : 'text-white/40']"
          >Compost</button>
        </nav>

        <DashboardView v-if="activeTab === 'dashboard'" />
        <SensorsView v-else-if="activeTab === 'sensors'" />
        <CompostView v-else-if="activeTab === 'compost'" />

        <BottomNav :current-tab="activeTab" @change-tab="activeTab = $event" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import BottomNav from './components/BottomNav.vue';
import DashboardView from './views/DashboardView.vue';
import SensorsView from './views/SensorsView.vue';
import CompostView from './views/CompostView.vue';

// Estado reactivo para la navegación
const activeTab = ref('dashboard');
</script>

<style>
/* Aquí debes pegar todo tu CSS personalizado original (.device-frame, .notch, .app-scroll, etc.) */
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;width:100%;font-family:'DM Sans',sans-serif}

.device-frame{
  width:375px;max-width:100%;height:100%;
  border-radius:40px;
  box-shadow:0 0 0 12px #1a1a2e,0 0 0 14px #33334d,0 30px 80px rgba(0,0,0,.45);
  overflow:hidden;position:relative;
  background:#0a0a12;
}
@media(max-width:420px){
  .device-frame{border-radius:0;box-shadow:none}
}

.notch{
  width:160px;height:28px;background:#0a0a12;
  border-radius:0 0 20px 20px;
  position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:50;
}
.notch::after{
  content:'';width:60px;height:4px;background:#1a1a2e;border-radius:4px;
  position:absolute;bottom:8px;left:50%;transform:translateX(-50%);
}

.app-scroll{
  height:100%;overflow-y:auto;overflow-x:hidden;
  scrollbar-width:none;
}
.app-scroll::-webkit-scrollbar{display:none}

.gauge-ring{
  fill:none;stroke-linecap:round;
  transition:stroke-dashoffset .8s cubic-bezier(.4,0,.2,1);
}

.card-glass{
  background:rgba(255,255,255,.06);
  backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.08);
  border-radius:20px;
}

.tab-active{color:#6ee7a0;position:relative}
.tab-active::after{
  content:'';width:4px;height:4px;border-radius:50%;background:#6ee7a0;
  position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);
}

@keyframes fadeUp{
  from{opacity:0;transform:translateY(16px)}
  to{opacity:1;transform:translateY(0)}
}
.anim-up{animation:fadeUp .5s ease both}
.anim-d1{animation-delay:.1s}
.anim-d2{animation-delay:.2s}
.anim-d3{animation-delay:.3s}
.anim-d4{animation-delay:.4s}

.compost-bar{
  height:8px;border-radius:4px;background:rgba(255,255,255,.08);overflow:hidden;
}
.compost-fill{
  height:100%;border-radius:4px;
  transition:width .6s ease;
}

.sensor-pulse{
  animation:pulse 2s infinite;
}
@keyframes pulse{
  0%,100%{opacity:1}
  50%{opacity:.5}
}
body { 
  box-sizing: border-box; 
  }
</style>