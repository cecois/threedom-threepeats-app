<template>
  <v-footer padless="true" class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <!-- <v-col class="text-center mt-4" cols="12">
        ©️ {{ new Date().getFullYear() }} — <strong>C.C. Miller</strong>
      </v-col> -->
    </v-row>
    <v-row>no copyright infringement is intended</v-row>

    <!-- 
https://64.media.tumblr.com/153a4e9f238141d138d8dd38d589e4a1/tumblr_px2b2jaGyH1qzu9gno1_500.jpg
https://64.media.tumblr.com/0e5c80e0ec426d29c6dae0552463a38a/tumblr_pfnb4lLAvD1qzu9gno1_1280.jpg
https://www.thewrap.com/wp-content/uploads/2018/04/Screen-Shot-2018-04-12-at-2.58.10-PM-936x527.png 
-->
  </v-footer>
</template>

<script setup>
const links = ["About", "Methodology & Data", "Contact"];
</script>
