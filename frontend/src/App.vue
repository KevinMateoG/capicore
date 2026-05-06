<template>
  <div class="h-screen w-screen bg-[#0a0a12] text-white flex overflow-hidden font-sans">
    
    <AppSidebar 
      class="hidden md:flex"
      :currentTab="activeTab" 
      @change-tab="activeTab = $event" 
    />

    <main class="flex-1 min-w-0 overflow-y-auto overflow-x-hidden pb-20 md:pb-0">
      <div class="w-full p-4 md:p-6">
        <AppHeader communityName="Residencial Los Pinos" />
        <div class="mt-4">
          <DashboardView v-if="activeTab === 'dashboard'" />
          <SensorsView   v-else-if="activeTab === 'sensors'" />
          <CompostView   v-else-if="activeTab === 'compost'" />
        </div>
      </div>
    </main>

    <BottomNav 
      class="md:hidden" 
      :currentTab="activeTab" 
      @change-tab="activeTab = $event" 
    />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader     from './components/AppHeader.vue';
import AppSidebar    from './components/AppSidebar.vue';
import BottomNav     from './components/BottomNav.vue';
import DashboardView from './views/DashboardView.vue';
import SensorsView   from './views/SensorsView.vue';
import CompostView   from './views/CompostView.vue';

const activeTab = ref('dashboard');
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; width: 100%; background: #0a0a12; font-family: 'DM Sans', sans-serif; }

.card-glass {
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,.2);
}

.compost-bar  { height: 8px; border-radius: 4px; background: rgba(255,255,255,.08); overflow: hidden; }
.compost-fill { height: 100%; border-radius: 4px; transition: width .6s ease; }

.sensor-pulse { animation: sensorPulse 2s infinite; }
@keyframes sensorPulse {
  0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(52,211,153,.4); }
  50%      { opacity:.5; box-shadow:0 0 8px 4px rgba(52,211,153,.1); }
}
@keyframes fadeUp {
  from { opacity:0; transform:translateY(14px); }
  to   { opacity:1; transform:translateY(0); }
}
.anim-up { animation: fadeUp .45s ease both; }
.anim-d1 { animation-delay:.08s; }
.anim-d2 { animation-delay:.16s; }
.anim-d3 { animation-delay:.24s; }
.anim-d4 { animation-delay:.32s; }
</style>