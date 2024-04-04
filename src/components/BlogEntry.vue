<script setup>
import { useTranslation } from "@/utils/hooks";

const t = useTranslation()
</script>

<template>
  <div class="entry">
    <img src="@/assets/ENG.png" class="image" />
    <div class="title font-josefin">Coruscant - miasto nie do życia</div>
    <div class="stub font-segoe">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      fermentum nunc nulla, ac fermentum purus interdum vel. Donec at leo
      aliquam diam viverra vestibulum. Aenean iaculis sem sed mauris tincidunt,
      nec euismod nunc malesuada. Mauris ac egestas massa, at auctor orci.
      Nullam ante turpis, luctus quis aliquam a, vehicula vitae diam.
      Pellentesque malesuada gravida libero vitae egestas. Nam nec nisi viverra,
      tincidunt urna vel, faucibus lorem.
    </div>
  </div>
</template>

<style scoped>
.entry {
    transition: background 1s ease;
    border-radius: 0.5rem;
    max-width: 400px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    cursor: pointer;
}

.entry:hover {
    background-color: #e69b54;
}

.image {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    height: 200px;
}

.title {
    transition: color 0.5s ease;
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
    color: #e69b54;
    text-align: center;
    text-transform: uppercase;
}

.entry:hover .title {
  color: white;
}

.stub {
    transition: color 0.5s ease;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    text-align: justify;
    font-size: 0.85rem;
}

.entry:hover .stub {
  color: white;
}
</style>
