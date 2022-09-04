<script setup>
import ScanView from "./components/ScanView.vue";
import LandingView from "./components/LandingView.vue";
import { ref } from "vue";

let firstStart = !localStorage.getItem("firstStart");
const view = ref(firstStart ? "landing" : "main");
function changeView(value) {
  if (value != "landing") localStorage.setItem("firstStart", false);
  view.value = value;
}
</script>

<template>
  <LandingView v-if="view == 'landing'" @exitLanding="changeView('main')" />
  <ScanView v-if="view == 'main'" />
</template>
