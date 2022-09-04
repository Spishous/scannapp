<script setup>
import ProgressDot from "../components/ProgressDot.vue";
import ButtonPrimary from "../components/ButtonPrimary.vue";
import Barcode from "../components/icons/MdiBarcodeScan.vue";
import Stock from "../components/icons/Fa6SolidBoxesStacked.vue";
import Article from "../components/icons/MajesticonsArticleSearchLine.vue";
import { ref } from "vue";
let page = ref(0);
let maxPage = 3;
const emit = defineEmits(["exitLanding"]);
function nextPage() {
  page.value++;
}
function exitLanding() {
  emit("exitLanding");
}
</script>

<template>
  <div class="flex flex-col items-center flex-1 mx-6 my-20">
    <div
      class="flex-1 flex flex-col justify-center relative w-full items-center"
    >
      <Transition>
        <div v-if="page == 0" class="text-center">
          <Article
            class="material-icons-outlined mx-auto text-8xl text-ciel-bleu-500"
          />
          <p class="text-center mt-12 text-lg">
            "Scannez vos codes barre et obtenez les informations des produits"
          </p>
        </div>
      </Transition>
      <Transition>
        <div v-if="page == 1" class="text-center">
          <Stock
            class="material-icons-outlined mx-auto text-8xl text-ciel-bleu-500"
          />
          <p class="text-center mt-12 text-lg">
            "Des informations sur plus de 100'000 produits"
          </p>
        </div>
      </Transition>
      <Transition>
        <div v-if="page == 2" class="text-center">
          <Barcode
            class="material-icons-outlined mx-auto text-8xl text-ciel-bleu-500"
          />
          <p class="text-center mt-12 text-lg">En un seul geste</p>
        </div>
      </Transition>
    </div>

    <div class="text-center mt-auto w-full">
      <ProgressDot class="my-6" :from="page + 1" :to="maxPage" />
      <ButtonPrimary v-if="page < maxPage - 1" @click="nextPage()"
        >Suivant</ButtonPrimary
      >
      <ButtonPrimary v-else @click="exitLanding()">A vous!</ButtonPrimary>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active {
  transition: opacity 0.5s 0.2s, transform 0.5s 0.2s;
}

.v-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.v-leave-active {
  position: absolute;
}

.v-enter-from {
  transform: translateX(200px);
}

.v-leave-to {
  transform: translateX(-200px);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
