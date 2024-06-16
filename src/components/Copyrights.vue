<script setup>
import { useTranslation } from "@/utils/hooks";
import Panel from "./Panel.vue";

const t = useTranslation();
</script>

<template>
  <Panel class="footer" rounded="true">
    <div class="copyrights font-segoe">
      &copy; {{ t('copyrights.arr') }}
    </div>
    <div class="copyrights analytics font-segoe">
      &copy; {{ t('copyrights.cookies') }}
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
  margin-bottom: 8rem;
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
