<style lang="scss" src="./style.scss">
</style>

<template>
  <div class="page-home">
    <div class="bg-move fill"></div>
    <div class="bg-overlay fill"></div>
    <div class="y-center w100p ta-c">
      <h1 class="fz-0">{{ info.title || "My Blog" }}</h1>
      <div class="mt-3 op-7">{{ info.bio || "Have a nice day" }}</div>
      <div class="mt-7">
        <ul class="so-link">
          <li class="bdrs-100 pos-r" v-for="it in links" :key="it.key">
            <a class="pos-center" :href="it.link" target="_blank">
              <img :src="`img/${it.key}.svg`" class="logo d-b" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      info: {},
    };
  },
  computed: {
    links() {
      const arr = ["github", "twitter", "discord", "facebook"];
      const list = [];
      for (const key of arr) {
        const link = this.info[key];
        if (!link) continue;
        list.push({
          key,
          link,
        });
      }
      return list;
    },
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    async getConfig() {
      try {
        const {
          data: { config },
        } = await Axios.get("./config.json");
        const info = {};
        for (const row of config) {
          const arr = row.options;
          for (const row of arr) {
            info[row.key] = row.value;
          }
        }
        if (info.title) {
          document.title = info.title;
        }
        this.info = info;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>