<script setup>
import Panel from "./Panel.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>

<template>
  <Panel rounded="true" class="font-segoe welcome" max-width="1000px">
    {{ t("welcome.text") }}
    <a class="buycoffee font-madimi" href="https://buycoffee.to/"><img src="@/assets/buycoffee.png" /> {{ t("welcome.buycoffee") }}</a>.
  </Panel>
</template>

<style scoped>
.welcome {
  text-align: center;
  font-size: 1.25rem;
  line-height: 2rem;
}

.buycoffee {
  text-wrap: nowrap;
  background-color: lightblue;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

@media screen and (max-width: 1024px) {
  .welcome {
    margin-top: 1rem;
  }
}
</style>
