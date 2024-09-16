<script setup>
import { useTranslation } from "@/utils/hooks";

const t = useTranslation();
</script>

<template>
  <div class="footer">
    <div class="copyrights font-segoe">&copy; {{ t("copyrights.arr") }}</div>
    <div class="copyrights analytics font-segoe">
      &copy; {{ t("copyrights.cookies") }}
    </div>
  </div>
</template>

<style scoped>
.footer {
  color: darkslategray;
  background-color: gainsboro;
  padding: 2rem;
  padding-bottom: 4rem;
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
