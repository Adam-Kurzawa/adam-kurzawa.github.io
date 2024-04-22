<script setup>
import { useTranslation } from "@/utils/hooks";
import Panel from "./Panel.vue";

const t = useTranslation();
</script>

<template>
  <Panel class="footer" rounded="true">
    <div class="copyrights font-segoe">
      &copy; Wszelkie prawa zastrzeżone. Strona i jej zawartość są własnością
      Adama Kurzawy i objęte pełnią prawami autorskimi. Nieautoryzowane
      rozpowszechnianie w jakimkolwiek celu jest ściśle zabronione.
    </div>
  </Panel>
</template>

<style scoped>
.footer {
  background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(10px);
  color: white;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 1rem;
}

.copyrights {
  text-align: center;
}

.analytics {
    font-size: 0.85rem;
}

@media screen and (max-width: 1024px) {
  .footer {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
