<script setup>
import CamScanner from "../components/cam/CamScanner.vue";
import ButtonPrimary from "../components/ButtonPrimary.vue";
import { computed, reactive, ref } from "vue";
const cam = ref(CamScanner);
const isVisibleArticle = ref(false);
const infos = reactive({
  code: "",
  error: false,
  product: null,
});

function startScanning() {
  infos.product = null;
  cam.value.startScan();
}
function stopScanning() {
  cam.value.stopScan();
}
function showArticle(code) {
  infos.code = code;
  infos.error = false;
  stopScanning();
  isVisibleArticle.value = true;
  getInfos(code);
}

function getInfos(code) {
  let url = `https://world.openfoodfacts.org/api/v2/search?code=${code}`;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      let data = JSON.parse(xhttp.responseText);
      infos.product = data.products[0];
      if (!infos.product) infos.error = true;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function closeModal() {
  isVisibleArticle.value = false;
}

const description = computed(() => {
  if (infos.product) {
    if (infos.product.category_properties["ciqual_food_name:fr"]) {
      return infos.product.category_properties["ciqual_food_name:fr"];
    }
    if (infos.product.category_properties["ciqual_food_name:en"]) {
      return infos.product.category_properties["ciqual_food_name:en"];
    }
  }
  return "";
});
</script>

<template>
  <div
    class="text-center flex flex-col items-center flex-1 mx-6 my-20 justify-between"
  >
    <CamScanner ref="cam" @foundCode="showArticle" />
    <ButtonPrimary v-if="cam.scanning" @click="stopScanning"
      >Stop</ButtonPrimary
    >
    <ButtonPrimary
      v-else
      @click="startScanning"
      :class="{
        'bg-neutral-700 hover:bg-neutral-700 active:bg-neutral-700':
          cam.loading,
      }"
      >{{ cam.loading ? "Opening" : "Scanner" }}</ButtonPrimary
    >
    <!-- <ButtonPrimary @click="showArticle('3103220033838')">Prompt</ButtonPrimary> -->
    <!-- <ButtonPrimary @click="showArticle('5000204658927')">Prompt</ButtonPrimary> -->
    <div class="fixed w-full h-screen top-0 pointer-events-none">
      <Transition id="bg">
        <div
          v-if="isVisibleArticle"
          class="w-full h-full bg-neutral-900 bg-opacity-50 pointer-events-auto"
          @click="closeModal"
        ></div>
      </Transition>
      <Transition id="modal">
        <div
          v-if="isVisibleArticle"
          class="fixed dark:bg-ciel-bleu-500 bg-ciel-bleu-400 w-full text-neutral-0 h-screen top-52 pb-64 pt-2 rounded-3xl pointer-events-auto"
        >
          <div>
            <span class="py-1 w-16 bg-neutral-0 inline-block rounded-md"></span>
          </div>
          <div class="p-8 h-full flex flex-col">
            <div v-if="infos.product">
              <h1 class="text-3xl">
                {{ infos.product.brands
                }}<span v-if="infos.product.product_name_fr">
                  ({{ infos.product.product_name_fr }})</span
                >
              </h1>
              <br />
              <h2 class="text-lg text-left underline">Description:</h2>
              <p class="text-md text-left">{{ description }}.</p>
              <br />
              <h2
                class="text-lg text-left underline"
                v-if="infos.product.quantity"
              >
                Quantité:
              </h2>
              <p class="text-md text-left" v-if="infos.product.quantity">
                {{ infos.product.quantity }}
              </p>
            </div>
            <div v-else class="pb-52 h-full flex flex-col">
              <div v-if="infos.error" class="h-full flex flex-col">
                <h1 class="text-3xl mb-4">Article non trouvé</h1>
                <p class="italic">l'article doit être de type alimentaire</p>
              </div>
              <div v-else class="h-full flex flex-col">
                <p>Ref: {{ infos.code }}</p>
                <div class="my-auto inline-block">
                  <span class="animate-spin inline-block text-lg"
                    ><svg width="50" height="50" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 1-1zm10-5a1 1 0 0 1-1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1zM7 12a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1zm12.071 7.071a1 1 0 0 1-1.414 0l-2.121-2.121a1 1 0 0 1 1.414-1.414l2.121 2.12a1 1 0 0 1 0 1.415zM8.464 8.464a1 1 0 0 1-1.414 0l-2.12-2.12a1 1 0 0 1 1.414-1.415l2.12 2.121a1 1 0 0 1 0 1.414zM4.93 19.071a1 1 0 0 1 0-1.414l2.121-2.121a1 1 0 1 1 1.414 1.414l-2.12 2.121a1 1 0 0 1-1.415 0zM15.536 8.464a1 1 0 0 1 0-1.414l2.12-2.121a1 1 0 0 1 1.415 1.414L16.95 8.464a1 1 0 0 1-1.414 0z"
                      /></svg
                  ></span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

#modal.v-enter-from,
#modal.v-leave-to {
  transform: translateY(30%);
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
