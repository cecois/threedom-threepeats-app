<template>
  <v-app>
    <v-system-bar height="30">
      qs:{{ _QS }} 🥎 iso:{{ _T }} 🥎 viewing {{ tells.payload.length }} of
      {{ M.universe.stories }} total stories
    </v-system-bar>
    <v-app-bar>
      <span
        @click="_P = _p.menu"
        v-for="_p in PANELS"
        :class="_p.menu == _P ? '' : 'font-weight-black'"
        >{{ _p.menu }}</span
      >
    </v-app-bar>
    <v-main>
      <v-container>
        {{ PANELS.find((p) => p.menu == _P).anno }}
        <!--
          ,        ,
 _. _ ._ -+- _ ._ -+-
(_.(_)[ ) | (/,[ ) |
 -->

        <!-- <div v-for="error in errors">
          <code>{{ error }}</code>
        </div>

        <div v-for="logItem in log">
          <code>{{ logItem }}</code>
        </div> -->

        <!-- was on v-text-field, below -> too busy: @keyup="uriBusiness" -->
        <v-text-field v-model="_Q"></v-text-field>

        <v-list v-if="_P.toLowerCase() == 'list'" lines="one">
          <v-list-item :key="tell._source.handle" v-for="tell in tells.payload"
            ><v-list-item-title
              ><strong>{{ tell._source.title }}</strong></v-list-item-title
            ><v-list-item-subtitle>{{
              tell._source.elucidation
            }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              <span
                class="pl-12"
                v-for="(telling, tellingi) in tell._source.tellings"
              >
                {{ tellingi }}
              </span>
            </v-list-item-subtitle>
          </v-list-item>
          <!-- <v-list-item
            class="mt-2"
            v-for="tell in tells.filter(
              (t) =>
                t._source.title.toLowerCase().indexOf(liveFilter.value) >= 0
            )"
            :key="tell._source.handle"
          >
            <v-list-item-title>{{ tell._source.title }} </v-list-item-title>

            <v-list-item-subtitle
              >{{ tell._source.elucidation }}
              <v-chip size="x-small" variant="outlined">{{
                tell._source.tellings.length
              }}</v-chip>
              <v-list-item-subtitle class="pl-4">
                {{ tell._source.tellings.map((o) => o["ep"]).join(" • ") }}
              </v-list-item-subtitle>
            </v-list-item-subtitle>
          </v-list-item> -->
        </v-list>

        <v-overlay
          v-model="loading"
          contained
          class="align-center justify-center"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import DefaultView from "./View.vue";
import DefaultFooter from "./Footer.vue";
// import DefaultBar from "./AppBar.vue";

const PANELS = [
  { menu: "list", anno: "bigol list" },
  { menu: "chart", anno: "chart instead" },
];

const loading = ref(false);
const _props = defineProps({ panel: String, query: String, telliso: String });

const ROUTER = useRouter();

const _P = ref(_props.panel);
const _Q = ref(_props.query);
const _T = ref(_props.telliso);
const errors = ref([]);
const log = ref([]);
const tells = reactive({ payload: [] });

// const _QS = computed(() => `${_Q.value.replace(/tags:/g, "tellings.tags:")}*`);
const _QS = computed(() => `${_Q.value}`);
watch(
  () => [_Q.value],
  (newp, oldp) => {
    uriBusiness();
  }
);

onMounted(() => {
  // getUniverse();
  uriBusiness();
  // $S();
});

const $S = () => {
  let r = {
    title: "THREEPEATS-APP",
    params: {
      panel: _P.value,
      query: _Q.value,
      tell: _T.value,
    },
  };
  ROUTER.push(r);
};

const $R = (m) => log.value.push(`${new Date()} - ${m}`);
const $E = (m) => errors.value.push(`${new Date()} - ${m}`);

const M = reactive({
  universe: {
    stories: 0,
  },
});

const uriBusiness = async () => {
  // console.log(`in uriBusiness, _QS==${_QS.value}`);
  /*  const qo = {
    size: 9999,
    query: {
      function_score: {
        query: {
          query_string: { query: _Q.value == "" ? "*:*" : `${_Q.value}*` },
        },
        boost: "5",
        random_score: {},
        boost_mode: "multiply",
      },
    },
  };*/

  {
  }

  const qo = {
    size: 9999,
    aggs: {
      // threedom_tags: {
      //   terms: { field: "tellings.tags.keyword" },
      // },
      threedom_classes: {
        terms: { field: "tellings.class.keyword" },
      },
    },
    query: {
      function_score: {
        query: {
          // query_string: { query: _Q.value == "" ? "*:*" : _QS },
          query_string: { query: _QS.value },
        },
        boost: "5",
        random_score: {},
        boost_mode: "multiply",
      },
    },
  };

  loading.value = true;
  try {
    const res = await axios.post(
      "http://milleria.org:9200/threepeats/_search",
      qo
    );
    tells.payload = res.data.hits.hits;
    $R(`retrieved ${tells.payload.length} tells for ${_QS}`);
    $S(); //if it went well we wanna write back to the uri
    loading.value = false;
  } catch (e) {
    $E(e);
    loading.value = false;
  }
};

const getUniverse = async () => {
  const qo = {
    size: 0,
    query: {
      function_score: {
        query: { query_string: { query: "*:*" } },
      },
    },
  };

  try {
    const res = await axios.post(
      "http://milleria.org:9200/threepeats/_search",
      qo
    );
    M.universe.stories = res.data.hits.total.value;
    $R(`retrieved ${M.universe.stories} as universe`);
  } catch (e) {
    $E(e);
  }
};
</script>
