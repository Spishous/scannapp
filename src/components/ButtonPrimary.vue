<script setup>
import { haptic } from "../assets/js/nativeFunc";
function handleHaptic() {
  haptic.select();
}
</script>

<template>
  <button
    @click="handleHaptic"
    class="px-6 py-2 w-64 max-w-full bg-ciel-bleu-500 hover:bg-ciel-bleu-400 active:bg-ciel-bleu-500 text-ciel-bleu-100 text-md font-semibold rounded-md shadow-lg"
  >
    <slot></slot>
  </button>
</template>
