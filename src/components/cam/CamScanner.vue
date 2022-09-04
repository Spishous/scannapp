<script setup>
import BarcodeOff from "../icons/MdiBarcodeScan.vue";
import { scanner as decodeBC } from "./decode-barrecode.js";
import { onMounted, ref, watch } from "vue";
const video = ref(null);
const scanning = ref(false);
const loading = ref(false);
let codeBarScanner = new decodeBC();
const codeBar = ref(-1);
const emits = defineEmits(["foundCode"]);

let vid = document.createElement("VIDEO");
let canvasx = document.createElement("CANVAS");
let contextx = canvasx.getContext("2d");
let canvasxb = document.createElement("CANVAS");
let contextxb = canvasxb.getContext("2d");

let ratio,
  maxw = 1100;
let instanceLoop;

onMounted(() => {
  video.value.style.width = document.width + "px";
  video.value.style.height = document.height + "px";
  video.value.setAttribute("autoplay", "");
  video.value.setAttribute("muted", "");
  video.value.setAttribute("playsinline", "");
  vid.style.width = "1px";
  vid.style.height = "1px";
  vid.style.position = "fixed";
  //vid.style.display="none";
  vid.setAttribute("autoplay", "");
  vid.setAttribute("muted", "");
  vid.setAttribute("playsinline", "");
  vid.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    false
  );
  video.value.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    false
  );

  if (video.value.hasAttribute("controls")) {
    video.value.removeAttribute("controls");
  }
  if (vid.hasAttribute("controls")) {
    vid.removeAttribute("controls");
  }

  document.body.append(vid);

  video.value.addEventListener(
    "loadedmetadata",
    function () {
      ratio = video.value.videoWidth / video.value.videoHeight;
    },
    false
  );
});

function foundCodeBar() {
  emits("foundCode", codeBar.value);
}

watch(scanning, () => {
  if (scanning.value) {
    instanceLoop = setInterval(() => {
      canvasx.width = maxw * ratio;
      canvasx.height = maxw;
      contextx.drawImage(video.value, ratio, 0, maxw * ratio, maxw);
      let base = canvasx.toDataURL("image/jpeg");

      codeBarScanner.startQuagga(base, (result) => {
        codeBar.value = result;
      });
      canvasxb.width = maxw * ratio * 0.9;
      canvasxb.height = maxw * 0.9;
      contextxb.drawImage(
        video.value,
        ratio - maxw * 0.1,
        -maxw * 0.35,
        maxw * ratio + maxw * 0.35,
        maxw + maxw * 0.2
      );
      base = canvasxb.toDataURL("image/jpeg");
      codeBarScanner.startQuagga(base, (result) => {
        codeBar.value = result;
      });
    }, 100);
  } else {
    streamCam(false);
    clearInterval(instanceLoop);
  }
});

watch(codeBar, () => {
  if (codeBar.value > 0) {
    foundCodeBar(codeBar.value);
    stopScan();
  }
});

//add loadedmetadata which will helps to identify video attributes
async function startScan() {
  scanning.value = false;
  loading.value = true;
  let rep = await openCamera();
  if (rep) {
    loading.value = false;
    scanning.value = true;
  } else {
    loading.value = false;
  }
}

function stopScan() {
  scanning.value = false;
  loading.value = false;
}

async function openCamera() {
  let constraints = {
    audio: false,
    video: {
      facingMode: { exact: "environment" },
    },
  };
  return new Promise((resolve) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function success(stream) {
        streamCam(stream);
        resolve(true);
      })
      .catch(() => {
        constraints = { audio: false, video: true };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function success(stream) {
            streamCam(stream);
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      });
  });
}

function streamCam(stream = false) {
  if (stream && !video.value.srcObject && loading.value) {
    video.value.srcObject = stream;
  } else {
    if (video.value.srcObject) {
      const tracks = video.value.srcObject.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
    }
    video.value.srcObject = null;
  }
  // //vid.srcObject = stream;
  // $("#value").html("Scanning");

  // $("#cam").attr("disabled", "");
  // $("#stop").removeAttr("disabled");
  // $(".scan-container").removeClass("cam-off");
  // $("#value").html("Presentez le code barre");
}

defineExpose({ startScan, stopScan, scanning, loading, codeBar });
</script>

<template>
  <div id="cam" class="relative" style="max-width: 80%">
    <div
      class="dark:bg-neutral-700 bg-ciel-bleu-200 rounded-lg text-ciel-bleu-400 dark:text-ciel-bleu-100"
      style="padding-top: 100%; width: 300px; max-width: 100%; max-height: 30%"
    >
      <ul class="corner static">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <video
        v-show="scanning"
        ref="video"
        autoplay="true"
        id="video"
        playsinline
        class="h-full w-full object-cover absolute top-0"
        style="border-radius: inherit"
      ></video>
      <div
        v-show="!scanning"
        class="h-full w-full object-cover absolute top-0 flex justify-center items-center"
      >
        <BarcodeOff class="text-9xl font-bold" />
      </div>
    </div>
  </div>
</template>

<style scoped>
ul {
  border-radius: inherit;
}
#cam .corner li {
  border-color: currentColor;
  border-width: 4px;
  height: 1.2rem;
  width: 1.2rem;
  position: absolute;
  font-size: 0.2rem;
}
#cam .corner li:nth-child(1) {
  border-right: none;
  border-bottom: none;
  top: -1em;
  left: -1em;
  border-top-left-radius: inherit;
}
#cam .corner li:nth-child(2) {
  border-left: none;
  border-bottom: none;
  right: -1em;
  top: -1em;
  border-top-right-radius: inherit;
}
#cam .corner li:nth-child(3) {
  border-right: none;
  border-top: none;
  left: -1em;
  bottom: -1em;
  border-bottom-left-radius: inherit;
}
#cam .corner li:nth-child(4) {
  border-left: none;
  border-top: none;
  bottom: -1em;
  right: -1em;
  border-bottom-right-radius: inherit;
}
</style>
