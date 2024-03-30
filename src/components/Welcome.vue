<script setup>
import Panel from "./Panel.vue";
</script>

<template>
  <Panel rounded="true" class="font-segoe welcome" max-width="1000px">
    Witaj na Alternacie, mojej skromnej stronie. Nazywam się Adam Kurzawa
    i zapraszam Cię do spędzenia kilku chwil pośród tekstów mojego autorstwa. Odnajdziesz tutaj opowiadania sci-fi,
    różnotematyczne artykuły na blogu oraz prologi z książek. Jeśli doceniasz moją twórczość, możesz
    <a class="buycoffee font-madimi" href="https://buycoffee.to/"><img src="@/assets/buycoffee.png" /> postawić mi kawę</a>.
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
</style>
