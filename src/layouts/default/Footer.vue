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
  </v-footer>
</template>

<script setup>
const links = ["About", "Methodology & Data", "Contact"];
</script>
