<template>
  <v-app>
    <v-system-bar height="30">
      <!-- <span
        @click="_P = _p.menu"
        v-for="_p in PANELS"
        :class="_p.menu == _P ? '' : 'font-weight-black'"
        >{{ _p.menu }}</span
      > -->

      qs:{{ _QS }} 🥎 iso:{{ _T }} 🥎 viewing {{ tells.payload.length }} of
      {{ M.universe.stories }} total stories
    </v-system-bar>
    <v-app-bar>
      <span v-for="tclass in _tellingClassClass">
        {{ tclass.label }}
      </span>

<!-- 
_GUAGES
totalStories
totalTellings
aveTellingsPer
totalEpisodes
maxEpisode
 -->
      <v-avatar color="brown" size="x-large" variant="outlined">
        <span class="font-weight-black">{{_GUAGES.totalEpisodes}}</span>
      </v-avatar> (through {{_GUAGES.maxEpisode}})

      <v-avatar color="brown" size="x-large" variant="outlined">
        <span class="font-weight-black">{{_GUAGES.totalStories}}</span>
      </v-avatar> stories

      <v-avatar color="brown" size="x-large" variant="outlined">
        <span class="font-weight-black">{{_GUAGES.totalTellings}}</span>
      </v-avatar>
      tellings

      <v-avatar color="brown" size="x-large" variant="outlined">
        <span class="font-weight-black">{{_GUAGES.aveTellingsPer}}</span>
      </v-avatar>
      ave tellings per
      <!-- <router-link to="/dashboard/*:*">Dashboard</router-link> -->
      🌗 <span @click="_P = 'dashboard'">DASHB</span>
      🌗 <span @click="_P = 'list'">LIST</span>
    </v-app-bar>
    <v-main>
      <v-container>
        <!-- {{ PANELS.find((p) => p.menu == _P.anno }} -->

        <!-- <div v-for="_lo in log">{{ _lo }}</div>
        <div v-for="_er in errrors">{{ _er }}</div> -->

        <div v-if="_P.toLowerCase() == 'dashboard'">
          <!-- <v-sheet border rounded :height="250">dashitem1</v-sheet> -->

          <v-sheet class="py-6 text-center text-medium-emphasis">
            (universe of all charts is all stories, regardless of current query)
          </v-sheet>

          <v-container class="">
            <v-row no-gutters>
              <v-col>
                <v-sheet>
                  <v-card style="height: 50vh">
                    <v-card-title class="text-h5">
                      RETELLING CLASSES
                    </v-card-title>

                    <v-card-subtitle
                      class="pl-6"
                      v-html="VIZS.find((v) => v.key == 'tellingsbyclass').anno"
                    />

                    <v-chart
                      class="chart"
                      :option="chartPieTellingClasses"
                      autoresize
                    />
                    <!-- <v-card-actions>
                      <v-btn variant="text"> Listen Now </v-btn>
                    </v-card-actions> -->
                  </v-card>
                </v-sheet>
              </v-col>
              <v-col>
                <!-- <v-sheet> -->
                <v-card style="height: 70vh">
                  <v-card-title class="text-h5"> TOP TELLINGS </v-card-title>

                  <v-card-subtitle
                    class="pl-6"
                    v-html="VIZS.find((v) => v.key == 'toptellings').anno"
                  />
                  <v-chart
                    class="chart"
                    :option="chartBarTellingTopTotal"
                    autoresize
                  />
                </v-card>
                <!-- </v-sheet> -->
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <v-sheet>
                  <v-card density="compact">
                    <v-card-title class="text-h5"> TELLING TAGS </v-card-title>

                    <v-card-subtitle
                      class="pl-6"
                      v-html="VIZS.find((v) => v.key == 'tellingtags').anno"
                    />

                    <v-chart
                      class="chart"
                      :option="chartTreeTellingTags"
                      autoresize
                    />

                    <!-- <v-card-actions>
                      <v-btn variant="text"> Listen Now </v-btn>
                    </v-card-actions> -->
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>

            <!-- <v-row no-gutters>
              <v-col>
                <v-sheet> .v-col-auto </v-sheet>
              </v-col>
              <v-col>
                <v-sheet> .v-col-auto </v-sheet>
              </v-col>
              <v-col>
                <v-sheet> .v-col-auto </v-sheet>
              </v-col>
            </v-row> -->
          </v-container>
        </div>
        <!-- ./dashboard -->

        <div v-if="_P.toLowerCase() == 'list'">
          <v-text-field v-model="_Q"></v-text-field>

          <v-list v-if="tells.payload.length > 0" lines="one">
            <v-list-item
              :key="tell._source.handle"
              v-for="tell in tells.payload.slice(0,10)"
              ><v-list-item-title
                ><strong>{{ tell._source.title }}</strong> ({{
                  tell._source.elucidation
                }})</v-list-item-title
              >

              <v-list-item-subtitle>
                <div>
                  <v-list lines="one">
                    <v-list-item v-for="telling in tell._source.tellings">
                      <v-icon
                        class="mr-3"
                        :icon="
                          telling.class
                            ? _tellingClassClass.find(
                                (c) =>
                                  c.key.toLowerCase() ==
                                  telling.class.toLowerCase()
                              )?.css
                            : 'mdi-alert-octagon-outline'
                        "
                      ></v-icon>
                      {{ telling.episode.title }} ({{ telling.class }})
                    </v-list-item>
                  </v-list>
                </div>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>
        <!-- v-if==_P.list -->

        <v-footer class="bg-grey-lighten-1">
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
            <v-col class="text-center mt-4" cols="12">
              {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-col>
          </v-row>
        </v-footer>

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
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, TreemapChart, FunnelChart } from "echarts/charts";
import {
  TitleComponent,
  GridComponent,
  VisualMapComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

import { ref, reactive, onMounted, computed, watch, provide } from "vue";
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import DefaultView from "./View.vue";
import DefaultFooter from "./Footer.vue";
// import DefaultBar from "./AppBar.vue";

use([
  CanvasRenderer,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  TreemapChart,
  FunnelChart,
]);

provide(THEME_KEY, "light");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const M = reactive({
  universe: {
    stories:0,
    threedom_universe_classes: { buckets: [] },
    threedom_universe_tellings_count: { buckets: [] },
    threedom_universe_tags: { buckets: [] },
  },
});

const PANELS = [
  { menu: "list", anno: "bigl list" },
  { menu: "tops", anno: "top N tellings" },
  { menu: "chart", anno: "chart w real chart?" },
  { menu: "treetags", anno: "tag tree" },
  { menu: "dashboard", anno: "dashboard ov" },
];

const VIZS = [
  {
    key: "tellingsbyclass",
    anno: "retellings by type - pimped, acknowledged, straight, etc.",
  },
  {
    key: "toptellings",
    anno: `top 10 most-told stories`,
  },
  {
    key: "tellingtags",
    anno: "aggregated tags from all tellings, all types",
  },
];

const _tellingClassClass = [
  {
    anno: "",
    label: "Self Pimp",
    key: "selfPimp",
    css: "mdi-selection-ellipse-arrow-inside",
  },
  {
    anno: "",
    label: "Pimp Fail",
    key: "pimpFail",
    css: "mid-emoticon-sad-outline",
  },
  { anno: "", label: "Inaugural Telling", key: "inaugural", css: "mdi-flare" },
  {
    anno: "",
    label: "Pimped Retelling",
    key: "pimpedRetelling",
    css: "mdi-source-pull",
  },
  {
    anno: "",
    label: "Secondary Telling",
    key: "secondaryTelling",
    css: "mdi-satellite-uplink",
  },
  {
    anno: "",
    label: "Questioned Retelling",
    key: "questionedRetelling",
    css: "mdi-lightbulb-question",
  },
  {
    anno: "",
    label: "Acknowledged Retelling",
    key: "acknowledgedRetelling",
    css: "mdi-hands-pray",
  },
  { anno: "", label: "Retelling", key: "retelling", css: "mdi-account-voice" },
  {
    anno: "",
    label: "Inverted Premise",
    key: "invertedPremise",
    css: "mdi-lightbulb-question-outline",
  },
];

const loading = ref(false);
const _props = defineProps({ panel: String, query: String, telliso: String });

const ROUTER = useRouter();

const _P = ref(_props.panel ? _props.panel : "list");
const _Q = ref(_props.query ? _props.query : "*:*");
const _T = ref(_props.telliso);

const errors = ref([]);
const log = ref([]);
const tells = reactive({ payload: [] });

const _QS = computed(() => `${_Q.value}`);

const $R = (m) => log.value.push(`${new Date()} - ${m}`);
const $E = (m) => errors.value.push(`${new Date()} - ${m}`);

/*
                                                                                                  oo

                                                                                dP    dP 88d888b. dP dP   .dP .d8888b. 88d888b. .d8888b. .d8888b.
                                                                                88    88 88'  `88 88 88   d8' 88ooood8 88'  `88 Y8ooooo. 88ooood8
                                                                                88.  .88 88    88 88 88 .88'  88.  ... 88             88 88.  ...
                                                                                `88888P' dP    dP dP 8888P'   `88888P' dP       `88888P' `88888P'
                                                                                oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

*/

const getUniverse = async () => {
  const qo = {
    size: 0,
    aggs: {
      threedom_universe_tellings_count: {
        terms: {
          field: "title.keyword",
          size: 12,
          script: "params['_source']['tellings'].size()",
        },
        aggs: {
          threedom_universe_stories: {
            terms: { size: 9999, field: "title.keyword" },
            aggs: {
              elucidations: {
                terms: {
                  field: "elucidation.keyword",
                  size: 9999,
                },
              },
            },
          },
        },
      },
      threedom_universe_classes: {
        terms: { size: 9999, field: "tellings.class.keyword" },
      },
      threedom_universe_tags: {
        terms: { size: 9999, field: "tellings.tags.keyword" },
      },
      threedom_universe_episodes: {
        terms: { size: 9999, field: "tellings.episode.title.keyword" },
      },
      threedom_universe_episodekeys: {
        terms: { size: 9999, field: "tellings.episode.key.keyword" },
      },
    },
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
    M.universe = res.data.aggregations;
    M.universe.total=res.data.hits.total.value;
    $R(`retrieved universe`);
  } catch (e) {
    $E(e);
  }
};

watch(
  () => [_Q.value],
  (newp, oldp) => {
    $S();
    // uriBusiness();
  }
);

watch(
  () => [_P.value],
  (newp, oldp) => {
    $S();
    // uriBusiness();
  }
);

onMounted(() => {
  getUniverse();
  $Q();
});

const $Q = async () => {
  const qo = {
    size: 9999,
    aggs: {
      threedom_classes: {
        terms: { field: "tellings.class.keyword" },
      },
    },
    query: {
      function_score: {
        query: {
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
    $R(`retrieved ${tells.payload.length} tells for ${_QS.value}`);
    $S(); //if it went well we wanna write back to the uri
    loading.value = false;
  } catch (e) {
    $E(e);
    loading.value = false;
  }
};

/*

                                                                                             ,+.   ,-.
                                                                                            ( | ` (   `
                                                                                             `+.   `-.
                                                                                            . | ) .   )
                                                                                             `+'   `-'

*/
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

// const _GUAGES = null; //{totalStories: M.universe.};
// console.log("_GUAGES", _GUAGES);
// const totalStories = AGGS.hits.total.value;

// const totalTellings =
//   AGGS.aggregations.threedom_universe_classes.buckets.reduce(
//     (accumulator, bucket) => {
//       return accumulator + bucket.doc_count;
//     },
//     0
//   );

// const episodeKeys = AGGS.aggregations.threedom_universe_episodes_w_key.buckets;

// const O = {
//   totalStories: totalStories,
//   totalTellings: totalTellings,
//   aveTellingsPer: totalTellings / totalStories,
//   totalEpisodes: episodeKeys.length,
//   maxEpisode: episodeKeys.sort((a, b) => a.key - b.key)[
//     episodeKeys.length - 1
//   ].key,
// };


/*

                                          .g8"""bgd `7MMF'   `7MF'    db       .g8"""bgd `7MM"""YMM   .M"""bgd
                                        .dP'     `M   MM       M     ;MM:    .dP'     `M   MM    `7  ,MI    "Y
                                        dM'       `   MM       M    ,V^MM.   dM'       `   MM   d    `MMb.
                                        MM            MM       M   ,M  `MM   MM            MMmmMM      `YMMNq.
                                        MM.    `7MMF' MM       M   AbmmmqMA  MM.    `7MMF' MM   Y  , .     `MM
                                        `Mb.     MM   YM.     ,M  A'     VML `Mb.     MM   MM     ,M Mb     dM
                                          `"bmmmdPY    `bmmmmd"'.AMA.   .AMMA. `"bmmmdPY .JMMmmmmMMM P"Ybmmd"

                                    mmmmmmm
*/

const _GUAGES = computed(() => {
  let totalTellings=M.universe.threedom_universe_classes.buckets.reduce(
     (accumulator, bucket) => {
       return accumulator + bucket.doc_count;
     },
     0
   );
  return {totalStories: M.universe?.total,
    totalTellings: totalTellings,
    aveTellingsPer: (totalTellings/M.universe?.total).toFixed(2),
    totalEpisodes: M.universe.threedom_universe_episodekeys?.buckets.length,
    maxEpisode: M.universe.threedom_universe_episodekeys?.buckets.sort((a, b) => a.key - b.key)[
      M.universe.threedom_universe_episodekeys.buckets.length - 1
    ].key,
  };
});

/*

                                                                                       /
                                                                                     #/                                           #
                                                                                     ##                                   #      ###
                                                                                     ##                                  ##       #
                                                                                     ##                                  ##
                                                                             /###    ##  /##      /###   ###  /###     ######## ###   ###  /###     /###
                                                                            / ###  / ## / ###    / ###  / ###/ #### / ########   ###   ###/ #### / /  ###  /
                                                                           /   ###/  ##/   ###  /   ###/   ##   ###/     ##       ##    ##   ###/ /    ###/
                                                                          ##         ##     ## ##    ##    ##            ##       ##    ##    ## ##     ##
                                                                          ##         ##     ## ##    ##    ##            ##       ##    ##    ## ##     ##
                                                                          ##         ##     ## ##    ##    ##            ##       ##    ##    ## ##     ##
                                                                          ##         ##     ## ##    ##    ##            ##       ##    ##    ## ##     ##
                                                                          ###     /  ##     ## ##    /#    ##            ##       ##    ##    ## ##     ##
                                                                           ######/   ##     ##  ####/ ##   ###           ##       ### / ###   ### ########
                                                                            #####     ##    ##   ###   ##   ###           ##       ##/   ###   ###  ### ###
                                                                                            /                                                            ###
                                                                                           /                                                       ####   ###
                                                                                          /                                                      /######  /#
                                                                                         /                                                      /     ###/

*/

const chartBarTellingTopTotal = computed(() => {
  let mappedBuckets = M.universe.threedom_universe_tellings_count
    ? M.universe.threedom_universe_tellings_count.buckets
        .map((b) => {
          return {
            tellings: b.threedom_universe_stories.buckets
              .map((bu) => {
                return {
                  value: parseInt(b.key),
                  name: `${bu.key}`,
                  elucidation: bu.elucidations.buckets[0].key,
                }; //return
              }) //map->bu
              .flat(),
          }; //return
        })
        .map((array) => array["tellings"])
        .flat()
        .sort((a, b) => b.value - a.value)
        .slice(2, 12)
    : [];

  const minmax = mappedBuckets
    .map((a) => a["value"])
    .filter((value, index, array) => array.indexOf(value) === index) //uniq
    .map((v) => parseInt(v))
    .sort()
    .reverse();

  return {
    tooltip: {
      trigger: "item",
      formatter: (a, b, c) => `${a.data.elucidation} (${a.data.value})`,
      // formatter: "{b} ({c} tellings)",
    },
    series: [
      {
        name: "Top-Told Stories",
        type: "funnel",
        left: "1%",
        top: 20,
        bottom: 0,
        width: "100%",
        height: "50%",
        min: minmax[minmax.length - 1] - 1,
        max: minmax[0] + 1,
        // min: 0,
        // max: 10,
        minSize: "50%",
        maxSize: "100%",
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 12,
          },
        },
        data: mappedBuckets,
      }, //seriesob
    ], //seriesarr
  };
}); //chartbartellingtoptotal

const chartBarTellingTopTotalOG = computed(() => {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c}%",
    },
    series: [
      {
        name: "Funnel",
        type: "funnel",
        left: "10%",
        top: 60,
        bottom: 60,
        width: "80%",
        min: 0,
        max: 100,
        minSize: "0%",
        maxSize: "100%",
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        dataog: [
          { value: 60, name: "Visit" },
          { value: 40, name: "Inquiry" },
          { value: 20, name: "Order" },
          { value: 80, name: "Click" },
          { value: 100, name: "Show" },
        ],
        data: M.universe.threedom_universe_classes.buckets,
      },
    ],
  };
});

const chartTreeTellingTags = computed(() => {
  return {
    series: [
      {
        type: "treemap",
        breadcrumb: { show: false },
        data: M.universe.threedom_universe_tags.buckets.map((b) => {
          return {
            name: b.key,
            value: b.doc_count,
            children: [],
          };
        }),
      },
    ],
  };
}); //computed.chartreetellingtags

const chartPieTellingClasses = computed(() => {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: [
      {
        name: "Retelling Class",
        type: "pie",
        radius: "45%",
        center: ["50%", "25%"],
        data: M.universe.threedom_universe_classes.buckets
          .filter(
            (u) =>
              u.key?.toLowerCase() !== "inaugural" &&
              u.key?.toLowerCase() !== "invertedpremise"
          )
          .map((b) => {
            return {
              name: `${
                _tellingClassClass.find(
                  (c) => c.key.toLowerCase() == b.key.toLowerCase()
                )?.label
              } (${b.doc_count})`,
              value: b.doc_count,
            };
          }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
}); //computed.chartPieTellingClasses
</script>
<style scoped>
.chart {
  height: 100vh;
}
</style>
