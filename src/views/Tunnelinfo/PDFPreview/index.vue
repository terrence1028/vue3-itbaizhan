<template>
    <iframe :src="pdfUrl" width="100%" height="100%"></iframe>
    <!-- <VuePdf v-for="page in numOfPages" :key="page" :src="pdfUrl" /> -->
  </template>
  <script setup>
  import { useRoute } from "vue-router";
  import { onMounted, ref } from "vue";
  import api from "@/api/index.js";
  // import { VuePdf, createLoadingTask } from "vue3-pdfjs/esm";
  
  const route = useRoute();
  const pdfUrl = ref("");
  const numOfPages = ref(0);  
  
  onMounted(() => {
    api
      .getPdfPreView({
        id: route.params.id,
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          pdfUrl.value = "http://localhost:3000/" + res.data.result.url;
          const loadingTask = createLoadingTask(pdfUrl.value);
          loadingTask.promise.then((pdf) => {
            numOfPages.value = pdf.numPages;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  </script>
  