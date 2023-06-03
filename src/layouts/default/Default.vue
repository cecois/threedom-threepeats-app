<template>
  <v-app>
    <v-system-bar height="30" class="bg-app-offblack copy-app-primary">
      {{ _GUAGES.currentHits }} • {{ _GUAGES.maxEpisode }} • v1.0
    </v-system-bar>
    <v-app-bar>
      <v-tabs v-model="tab">
        <v-tab
          v-for="_panel in PANELS"
          selected-class="''"
          @click.prevent="_P = _panel.menu"
          :class="['ml-3', _panel.menu == _P ? 'font-weight-black' : '']"
          :value="_panel.menu"
          >{{ _panel.label }}</v-tab
        >
      </v-tabs>

      <v-row no-gutters>
        <v-col class="text-left" cols="6" align-self="start"> </v-col>
        <v-col class="text-center text-caption secondary" cols="1">
          <v-avatar variant="outlined">
            <span class="font-weight-black">{{ _GUAGES.totalEpisodes }}</span>
          </v-avatar>
          <p class="text-center text-caption">eps</p>
        </v-col>
        <v-col class="text-center text-caption secondary" cols="1">
          <v-avatar variant="outlined">
            <span class="font-weight-black">{{ _GUAGES.totalStories }}</span>
          </v-avatar>
          <p class="text-center text-caption">stories</p>
        </v-col>
        <v-col class="text-center text-caption secondary" cols="1">
          <v-avatar variant="outlined">
            <span class="font-weight-black">{{ _GUAGES.totalTellings }}</span>
          </v-avatar>
          <p class="text-center text-caption">tellings</p>
        </v-col>
        <v-col class="text-center text-caption secondary" cols="1">
          <v-avatar variant="outlined">
            <span class="font-weight-black">{{ _GUAGES.aveTellingsPer }}</span>
          </v-avatar>
          <p class="text-center text-caption">avg</p>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <div v-if="_P.toLowerCase() == 'about'">
          <!-- 0. what is this? 1. retelling classes -->
          <v-row class="pt-6">
            <v-col cols="4">
              <v-card class="mb-3">
                <v-card-item>
                  <v-card-title>What is this?</v-card-title>

                  <!-- <v-card-subtitle>This is a subtitle</v-card-subtitle> -->
                </v-card-item>

                <v-card-text
                  ><em>Threedom</em> is a podcast. Its hosts tend to repeat
                  their stories and their takes on this or that topic —
                  self-driving cars, beanie babies, restaurants, MRSA
                  infections, and so forth — and at one point wished aloud that
                  there was a log of those recurrences. This is that
                  log.</v-card-text
                >
              </v-card>
              <v-card class="mb-3">
                <v-card-item>
                  <v-card-title>What's its spirit?</v-card-title>

                  <!-- <v-card-subtitle>This is a subtitle</v-card-subtitle> -->
                </v-card-item>

                <v-card-text
                  >I hope it could go without saying, but: I absolutely love
                  this fuxking show and have listened to every single episode at
                  <em>minimum</em> four times. True math, that. This is a love
                  letter to the show and its hosts.</v-card-text
                >
              </v-card>
              <v-card class="mb-3">
                <v-card-item>
                  <v-card-title>How, though?</v-card-title>

                  <!-- <v-card-subtitle>This is a subtitle</v-card-subtitle> -->
                </v-card-item>

                <v-card-text
                  >Mostly this was done by listening through the full run,
                  remembering, listening back through again, multiple times.
                  Mostly it's easy to pick out stories that ended up being
                  repeated, so those get codified and stored and when the
                  retellings occur those get codified and collated. But the show
                  is approaching 200 episodes as of this writing so it helps to:
                  <ol class="ml-6 pl-6 pt-6 pb-6">
                    <li>convert all episodes' *.mp3 to *.wav</li>
                    <li>
                      `vosk-transcribe` using the
                      <a href="https://alphacephei.com/vosk/models"
                        >vosk-model-en-us-0.42-gigaspeech</a
                      >
                      model
                    </li>
                    <li>
                      index the result (associating episode metadata from the
                      <a href="https://www.comedybangbangworld.com/">CBBW</a>
                      feed)
                    </li>
                    <li>
                      write a cli program that can unobtrusively query this or
                      that word or phrase when they say it
                    </li>
                  </ol>
                  That way, if something comes up that even hints of a retell it
                  can be shopped against the fulltext transcription of the
                  show's entirety. This is of course not foolproof, as the
                  transcription is only so good of a show that is basically
                  <em>fueled</em>
                  by interruption and crosstalk and voices and screaming. And
                  the singing - godam, all the singing. Moreover, the
                  transcriber has trouble identifying proper nouns like "DJ
                  Qualls" and common sounds like "pie" so it's hard to locate
                  all the times Lauren hasn't shut the fuk up about her
                  doppelgänger or all the times Scott hasn't shut the fuk up
                  about eating multiple pies during the filming of a single
                  scene, respectively.
                </v-card-text>
              </v-card>

              <v-card class="mb-3">
                <v-card-item>
                  <v-card-title>The Timestamps</v-card-title>

                  <!-- <v-card-subtitle>This is a subtitle</v-card-subtitle> -->
                </v-card-item>

                <v-card-text
                  >The timestamps on these records correspond to the ad-free
                  episodes, 'scuse me. But that's why they aren't linked - we
                  don't know where you listen and if the ads are in there the
                  timestamps are bunk anyway. Figure out the ad length, multiply
                  by three er wutevr, then subtract...listen, figure it out.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="8">
              <v-card class="mb-3">
                <v-card-item>
                  <v-card-title>The types:</v-card-title></v-card-item
                >

                <v-card-text>
                  <v-list lines="three">
                    <!--                     {
    anno: "the first documented telling on *this* show",
    annoExtendo: "there are plenty of cases where these three have shared a story off-mic and are bringing it on-mic <— this does not count as a retelling, counts as an inaugural story",
    label: "Inaugural",
    key: "inaugural",
    css: "mdi-flare",
  } -->
                    <v-list-item
                      v-for="classDef in _tellingClassClass"
                      :key="classDef.key"
                      ><v-list-item-title>
                        <v-icon class="mr-3" :icon="classDef.css"></v-icon>
                        <span class="font-weight-black">{{
                          classDef.label
                        }}</span>
                        - {{ classDef.anno }}</v-list-item-title
                      >
                      <p class="ml-6 pl-5 font-weight-light">
                        {{ classDef.annoExtendo }}
                      </p></v-list-item
                    >
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- //callbacks & references don't count - must be some flavor of
          retelling the story //unconsidered are instances when it's clear or
          implied that the story may have been told interpersonally or on some
          other show -->
        </div>
        <div v-if="_P.toLowerCase() == 'dashboard'">
          <v-sheet class="py-6 text-center text-medium-emphasis">
            (universe of all charts is all stories, regardless of current query,
            <a @click.prevent="_P = 'about'" href="#" class="font-weight-bold"
              >excluding meta classes</a
            >)
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
          </v-container>
        </div>
        <!-- ./dashboard -->

        <div v-if="_P.toLowerCase() == 'search'">
          <v-row class="mt-16" justify="center" no-gutters>
            <v-col class="text-center" cols="2"></v-col>
            <v-col class="text-center" cols="8">
              <v-text-field
                clearable
                v-model="_Q"
                variant="solo"
              ></v-text-field>
            </v-col>
            <v-col class="" cols="2"
              ><!-- <v-switch
                v-model="M.excludeMeta"
                :color="COLORS.appHighlight"
                hide-details
                inset
                :label="
                  M.excludeMeta
                    ? 'query excludes meta classes'
                    : 'query includes meta classes'
                "
                @click="M.excludeMeta = !M.excludeMeta"
                hint="remove meta entries like 'inverted premise' and 'declined pimpings'"
              ></v-switch
            > --></v-col
            >
          </v-row>
          <v-row class="mt-n6" no-gutters>
            <v-col class="text-center" cols="2"></v-col>
            <v-col class="text-center justify-center" cols="8">
              <v-switch
                v-model="M.excludeMeta"
                :color="COLORS.appHighlight"
                hide-details
                density="compact"
                :label="
                  M.excludeMeta
                    ? 'query excludes meta classes'
                    : 'query includes meta classes'
                "
                @click="M.excludeMeta = !M.excludeMeta"
                hint="remove meta entries like 'inverted premise' and 'declined pimpings'"
              ></v-switch>
            </v-col>
            <v-col class="text-left align-self-end" cols="2"></v-col>
          </v-row>

          <!--           <v-row>
            <v-col
              ></v-col>
          </v-row> -->

          <div class="mt-6 mb-6 text-center">
            <v-pagination
              v-if="tells.payload.length > 0"
              v-model="M.page"
              :length="M.pages"
              rounded="circle"
              :color="COLORS.appSecondary"
            ></v-pagination>
          </div>

          <v-list v-if="tells.payload.length > 0" lines="one">
            <v-list-item :key="tell._id" v-for="tell in _payloadSubset"
              ><v-list-item-title>
                <strong>{{ tell._source.title }}</strong>
                <div class="pl-2 text-caption font-weight-thin">
                  ({{ tell._source.elucidation }})
                </div></v-list-item-title
              >

              <v-list-item-subtitle>
                <div>
                  <v-list lines="one">
                    <!-- <v-list-item v-for="telling in tell._source.tellings"> -->
                    <!-- <v-list-item
                      v-for="telling in tell._source.tellings.sort(
                        (t) => t.episode.key
                      )"
                    > -->
                    <v-list-item
                      v-for="telling in _sortBy(
                        tell._source.tellings,
                        (t) => t.episode.key
                      )"
                    >
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
                      {{ telling.episode.title }}
                      <span class="font-weight-thin"
                        >{{ telling.episode.key }}@{{
                          telling.startMinute
                        }}+</span
                      >
                    </v-list-item>
                  </v-list>
                </div>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>
        <!-- v-if==_P.list -->

        <!-- <v-footer class="" fixed paddless>
          <v-row justify="center" no-gutters>
            <v-col class="text-center mt-4" cols="6">
              {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-col>
            <v-col class="text-center mt-4" cols="6">
              {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-col>
          </v-row>
        </v-footer> -->

        <!--
                                   _____   U  ___ u   U  ___ u _____  U _____ u   ____
                                 |" ___|   \/"_ \/    \/"_ \/|_ " _| \| ___"|/U |  _"\ u
                                U| |_  u   | | | |    | | | |  | |    |  _|"   \| |_) |/
                                \|  _|/.-,_| |_| |.-,_| |_| | /| |\   | |___    |  _ <
                                 |_|    \_)-\___/  \_)-\___/ u |_|U   |_____|   |_| \_\
                                 )(\\,-      \\         \\   _// \\_  <<   >>   //   \\_
                                (__)(_/     (__)       (__) (__) (__)(__) (__) (__)  (__)
 -->

        <v-bottom-navigation>
          <v-btn
            @click.prevent="_Q = `tellings.class:${classDef.key}`"
            v-for="classDef in _tellingClassClass"
          >
            <v-tooltip activator="parent" location="top">{{
              classDef.anno
            }}</v-tooltip>
            <v-icon>{{ classDef.css }}</v-icon>
            {{ classDef.label }}
          </v-btn>
        </v-bottom-navigation>

        <v-overlay
          v-model="loading"
          contained
          class="align-center justify-center"
        >
          <v-progress-circular
            indeterminate
            color="secondary"
          ></v-progress-circular>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
/*
                                                       /$$                                               /$$
                                                      |__/                                              | $$
                                                       /$$ /$$$$$$/$$$$   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$
                                                      | $$| $$_  $$_  $$ /$$__  $$ /$$__  $$ /$$__  $$|_  $$_/
                                                      | $$| $$ \ $$ \ $$| $$  \ $$| $$  \ $$| $$  \__/  | $$
                                                      | $$| $$ | $$ | $$| $$  | $$| $$  | $$| $$        | $$ /$$
                                                      | $$| $$ | $$ | $$| $$$$$$$/|  $$$$$$/| $$        |  $$$$/
                                                      |__/|__/ |__/ |__/| $$____/  \______/ |__/         \___/
                                                                        | $$
                                                                        | $$
                                                                        |__/
*/

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

import { ref, reactive, onMounted, computed, watch, provide, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";

import _range from "lodash/range";
import _uniq from "lodash/uniq";
import _map from "lodash/map";
import _flatMap from "lodash/flatMap";
import _sortBy from "lodash/sortBy";
import _takeRight from "lodash/takeRight";
import _take from "lodash/take";
import _filter from "lodash/filter";
import _groupBy from "lodash/groupBy";
import _countBy from "lodash/countBy";
import _values from "lodash/values";

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
const snackbar = true;
const M = reactive({
  excludeMeta: true,
  page: 1,
  pageItems: 10,
  pages: 0,
  universe: {
    hits: 0,
    stories: 0,
    maxEpisode: null,
  },
});

// supplements are from https://coolors.co/738290-a9e5bb-774e24-f7b32b-2d1e2f
const COLORS = {
  appWhiteOff: "rgba(193, 181, 176, 1)",
  appWhiteNot: "rgba(251, 230, 207, 1)",
  appBlack: "rgba(18, 14, 14, 1)",
  appBlackOff: "rgba(37, 33, 34, 1)",
  appBlackNot: "rgba(75, 60, 50, 1)",
  appPrimary: "rgba(192, 70, 55, 1)",
  appSecondary: "rgba(243, 221, 158, 1)",
  appTertiary: "rgba(107, 105, 90, 1)",
  appHighlight: "rgba(208, 106, 73, 1)",
  appHighlightOff: "rgba(238, 165, 122, 1)",
  slateGray: "rgba(115, 130, 144, 1)",
  celadon: "rgba(169, 229, 187, 1)",
  sepia: "rgba(119, 78, 36, 1)",
  xanthous: "rgba(247, 179, 43, 1)",
  darkPurple: "rgba(45, 30, 47, 1)",
};

const PANELS = [
  { menu: "search", label: "Search" },
  { menu: "dashboard", label: "Dashboard" },
  { menu: "about", label: "About" },
  { menu: "contribute", label: "Contribute" },
  // { menu: "forthcoming", label: "Forthcoming" },
  { menu: "api", label: "API" },
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
    anno: "aggregated tags from all tellings (non-meta)",
  },
];

const _tellingClassClass = [
  {
    anno: "the first documented telling on *this* show",
    annoExtendo:
      "there are plenty of cases where these three have shared a story off-mic and are bringing it on-mic <— this does not count as a retelling, counts as an inaugural story; but then they'll probably repeat it later in the run anyway and *that* is a retelling",
    label: "Inaugural",
    key: "inaugural",
    css: "mdi-flare",
  },
  {
    anno: "cast member straightup retells a story they've already told",
    annoExtendo:
      "the purest datum for this project - somebody tells a story they've already told, completely forgetting we've heard it at least once",
    label: "Retelling",
    key: "retelling",
    css: "mdi-account-voice",
  },
  {
    anno: "cast member worries aloud if they're retelling a story but does so anyway",
    annoExtendo:
      "these are cases where the cast member either prefaces the story with some concern that it's a retell or midway through their retelling it begins to feel familiar and they'll ask if they're repeating material (and then finish anyway)",
    label: "Questioned",
    key: "questionedRetelling",
    css: "mdi-lightbulb-question-outline",
  },
  {
    anno: "cast member fully knows they're retelling a story but does so anyway",
    annoExtendo:
      "a story or topic is revisited even though everybody knows we've been there before - LL does it about those glasses that broke into her face; Scott does it with roughly one thousand Café Cordiale tales; even Dennis J. Peacock does it.",
    label: "Acknowledged",
    key: "acknowledgedRetelling",
    css: "mdi-hands-pray",
  },
  {
    anno: "(rare) cast member is accused of retelling a story (optionally spanked) but they in fact had not",
    annoExtendo:
      "a relic of the spanking era, this happened when LL was accused of revisiting 'Listen to Me Linda' and when Scott was accused of re-reporting that his car had been accessed (when in fact it had happened anew)",
    label: "Accused",
    key: "accusedRetelling",
    css: "mdi-bullhorn-outline",
  },
  {
    anno: "cast member solicits a retelling from another cast member",
    annoExtendo:
      "fairly rarely — PFT's sister in germany; scott's sharkies; posters from youth — a cast member will know a story they want to hear and request it and be indulged",
    label: "Pimped",
    key: "pimpedRetelling",
    css: "mdi-source-pull",
  },
  {
    anno: "(rare) cast member denies to tell a story prompted by another",
    annoExtendo:
      "the novelty here is that the pimped cast member actually declines and the conversation actually moves on",
    label: "Declined Pimp",
    key: "declinedPimping",
    css: "mdi-traffic-light-outline",
  },
  {
    anno: "(rare) cast member *wants* to be caught repeating a story for some reason",
    annoExtendo:
      "the cast member basically threatens to retell this or that story as a feigning grab for the spanking - e.g. PFT's MRSA once, Scott's Romeo & Juilet mashup",
    label: "Self Pimp",
    key: "selfPimp",
    css: "mdi-selection-ellipse-arrow-inside",
  },
  {
    anno: "(rare) cast member retells a story on behalf of another",
    annoExtendo:
      "the cast member loves another's story so much they just tell it themselves - PFT on Scott's history with retail; LL on testicular torsion, etc. - these are dangerously close to just being references",
    label: "Secondary",
    key: "secondaryRetelling",
    css: "mdi-satellite-uplink",
  },
  {
    anno: "the cast repeatedly revisits the fact that they repeatedly revisit the same stories",
    annoExtendo:
      "this is basically any time the cast address their penchant for repeating stories and revisiting topics",
    label: "Premise",
    key: "premise",
    css: "mdi-bullseye",
  },
  {
    anno: "cast member suspects they've told a story already but somehow have not",
    annoExtendo:
      "this has happened nearly 100 times through s5e170 - the cast member openly worries they've told this story before — proceeds to tell it anyway, of course — but it turns out they hadn't up to that point",
    label: "Inverted Premise",
    key: "invertedPremise",
    css: "mdi-backup-restore",
  },
];

const loading = ref(false);
const _props = defineProps({ panel: String, query: String, telliso: String });

const ROUTER = useRouter();

const _P = ref(_props.panel ? _props.panel : "search");
const _Q = ref(_props.query ? _props.query : "*:*");
const _T = ref(_props.telliso);

const errors = ref([]);
const log = ref([]);
const tells = reactive({ payload: [] });

const _QS = computed(() =>
  M.excludeMeta ? `${_Q.value} AND NOT isMeta:true` : `${_Q.value}`
);

const _payloadSubset = computed(() => {
  let from = (M.page - 1) * M.pageItems + 1;
  let to = M.page * M.pageItems;

  return tells.payload.slice(from, to);
});

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
    size: 10000,
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
    M.universe.hits = res.data.hits;
    M.universe.total = res.data.hits.total.value;
    // M.universe.maxEpisode = res.data.hits
    //   .map((h) => {
    //     console.log("h", h);
    //     return h._source.tellings;
    //   })
    //   .map((t) => t.episode.key)
    //   .sort((e) => e);
    $R(`retrieved universe`);
  } catch (e) {
    $E(e);
  }
};

const getUniverseElasticAggs = async () => {
  const qo = {
    size: 0,
    aggs: {
      threedom_universe_tellings: {
        terms: {
          field: "title.keyword",
          size: 9999,
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
      threedom_universe_tellings_count: { sum: { field: "tellingsLength" } },
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
    M.universe.total = res.data.hits.total.value;
    $R(`retrieved universe`);
  } catch (e) {
    $E(e);
  }
};

watch(
  () => [_Q.value, M.excludeMeta],
  (newp, oldp) => {
    $S();
    $Q();
  }
);

watch(
  () => [_P.value],
  (newp, oldp) => {
    $S();
  }
);

onMounted(() => {
  getUniverse();
  $Q();
});

/*
                                                                                           .-''-.
                                                                                          //'` `\|
                                                                                         '/'    '|
                                                                                        |'      '|
                                                                                        ||     /||
                                                                                         \'. .'/||
                                                                                          `--'` ||
                                                                                                ||
                                                                                                || />
                                                                                                ||//
                                                                                                |'/
                                                                                                |/
*/

const $Q = async () => {
  loading.value = true;
  try {
    const res = await axios.get(
      `http://milleria.org:9200/threepeats/_search?size=9999&q=${_QS.value}`
    );

    tells.payload = res.data.hits.hits
      .sort((ta, tb) => tb._source.tellings.length - ta._source.tellings.length)
      .sort((ta, tb) => tb._source.key[0] - ta._source.key[0]);
    $R(`retrieved ${tells.payload.length} tells for ${_QS.value}`);
    M.pages = Math.round(tells.payload.length / M.pageItems + 0.5);
    $S(); //if it went well we wanna write back to the uri
    loading.value = false;
  } catch (e) {
    $E(e);
    loading.value = false;
  }
};

const $QOG = async () => {
  const qo = {
    size: 9999,
    // aggs: {
    //   threedom_classes: {
    //     terms: { field: "tellings.class.keyword" },
    //   },
    // },
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
    // tells.payload = res.data.hits.hits;
    tells.payload = res.data.hits.hits
      .sort((ta, tb) => tb._source.tellings.length - ta._source.tellings.length)
      .sort((ta, tb) => tb._source.handle[0] - ta._source.handle[0]);
    $R(`retrieved ${tells.payload.length} tells for ${_QS.value}`);
    M.pages = Math.round(tells.payload.length / M.pageItems + 0.5);
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
  let totalTellings = _flatMap(
    _map(M.universe.hits.hits, "_source"),
    "tellings"
  ).length;

  let episodeKeys = _uniq(
    _map(
      _flatMap(_map(M.universe.hits.hits, "_source"), "tellings"),
      (t) => t.episode.key
    )
  );

  let sortedEps = _sortBy(episodeKeys, (a) => {
    let aP = a.split("e");
    let aS = aP[0];
    let aE = String(_uniq(aP[1].match(/(\d+)/))).padStart(
      episodeKeys.length.toString().length,
      "0"
    );
    return `${aS}.${aE}`;
  });

  return {
    currentHits: tells.payload.length,
    totalStories: M.universe.hits.total?.value,
    totalTellings: totalTellings,
    aveTellingsPer: (totalTellings / M.universe?.total).toFixed(1),
    totalEpisodes: episodeKeys.length,
    // totalEpisodesOG: _uniq(
    //   _map(
    //     _flatMap(_map(M.universe.hits.hits, "_source"), "tellings"),
    //     (t) => t.episode.key
    //   )
    // ).length,
    maxEpisode: sortedEps[sortedEps.length - 1],
    // M.universe?.hits.hits
    //  .map((h) => {
    //    console.log("h", h);
    //    return h._source.tellings;
    //  })
    //  .map((t) => t.episode.key)
    //  .sort((e) => e),
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

const chartPieTellingClasses = computed(() => {
  const classesMap = _map(
    _groupBy(
      _flatMap(
        _filter(_map(M.universe.hits.hits, "_source"), ["isMeta", false]),
        "tellings"
      ),
      "class"
    ),
    (v, n) => {
      let nom = _tellingClassClass?.find((tcc) => tcc.key == n);
      let noml = nom ? nom.label : n;

      return {
        value: v.length,
        name: noml,
      };
    }
  );

  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: [
      {
        color: _values(COLORS),
        name: "Retelling Class",
        type: "pie",
        radius: "45%",
        center: ["50%", "25%"],
        data: classesMap,
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

const chartBarTellingTopTotal = computed(() => {
  const mappedBuckets = _takeRight(
    //sort the plukt _source
    _map(
      _sortBy(
        _filter(_map(M.universe.hits.hits, "_source"), ["isMeta", false]),
        [
          "tellingsLength", //by tellingsLength (this is precacled into elastic)
        ]
      ),
      (s) => {
        return {
          value: s.tellingsLength,
          name: `${s.title} (${s.tellingsLength})`,
          elucidation: s.elucidation,
          tellingsLength: s.tellingsLength,
        };
      }
    ),
    10
  );

  const tellingsLengths = _map(mappedBuckets, "tellingsLength");
  const min = _take(tellingsLengths, 1)[0];
  const max = _takeRight(tellingsLengths, 1)[0];

  return {
    tooltip: {
      trigger: "item",
      formatter: (a, b, c) => `${a.data.elucidation}`,
    },
    series: [
      {
        textStyle: { fontSize: 9, fontWeight: "bold" },
        color: _values(COLORS).reverse(),
        name: "Top-Told Stories",
        type: "funnel",
        left: "1%",
        top: 20,
        bottom: 0,
        width: "100%",
        height: "50%",
        min: min,
        max: max,
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

const chartTreeTellingTags = computed(() => {
  const mappedTags = _map(
    _countBy(
      _flatMap(
        _flatMap(
          _filter(_map(M.universe.hits.hits, "_source"), ["isMeta", false]),
          "tellings"
        ),
        "tags"
      )
    ),
    (k, v) => {
      console.log(k);
      console.log(v);
      return { name: v, value: k, link: `/search/tellings.tags:pets` };
    }
  );

  return {
    color: _values(COLORS),
    tooltip: {
      formatter: function (info) {
        var value = info.value;
        var treePathInfo = info.treePathInfo;
        var treePath = [];
        for (var i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }
        return [
          '<div class="tooltip-title">' + treePath.join("/") + "</div>",
        ].join("");
      },
    },
    series: [
      {
        type: "treemap",
        breadcrumb: { show: false },
        data: mappedTags,
        nodeClick: "link",
      },
    ],
  };
}); //computed.chartreetellingtags
</script>
<style scoped>
.chart {
  height: 100vh;
}
</style>
<!-- <style lang="scss" scoped>
@import "@/styles/settings.scss";
.chart {
  height: 100vh;
}
</style> -->
