<script setup>
import ScanView from "./views/ScanView.vue";
import LandingView from "./views/LandingView.vue";
import { ref } from "vue";

let token = "2";
let firstStart = localStorage.getItem("firstStart") != token;
const view = ref(firstStart ? "landing" : "main");

function changeView(value) {
  if (value != "landing") localStorage.setItem("firstStart", token);
  view.value = value;
}
</script>

<template>
  <LandingView v-if="view == 'landing'" @exitLanding="changeView('main')" />
  <ScanView v-if="view == 'main'" />
</template>
