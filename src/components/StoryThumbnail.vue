<script setup>
import { useAsset, useLocale } from "@/utils/hooks";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["title"]);

const router = useRouter();
const locale = useLocale();

const imageSrc = useAsset(import(`@/assets/story/covers/${props.title}.jpg`));
const content = useAsset(
  import(`@/assets/story/${props.title}_${locale.value}.json`)
);

const title = computed(() => content.value.title);
const description = computed(() => content.value.description);
const year = computed(() => content.value.year);
const chapters = computed(() => content.value.chapters.length);
const genre = computed(() => "sci-fi");
const tags = computed(() => ["#sci-fi", "#space-opera", "#military", "#action"]);
const fragment = computed(() => content.value.chapters[0][0]);

const openReader = () => {
  router.push({
    name: "reader",
    params: { lang: locale.value, title: props.title },
    query: { type: "story" },
  });
};
</script>

<template>
  <div class="story-thumbnail" v-if="content">
    <div class="story-thumbnail-title font-yeseva">{{ title }}</div>
    <img class="story-thumbnail-cover" :src="imageSrc" />
    <div class="story-thumbnail-bottom">
      <div class="story-thumbnail-bottom-up">
        <div class="story-thumbnail-button font-segoe" @click="openReader">Przeczytaj</div>
        <div class="story-thumbnail-bottom-up-right">
          <button class="story-thumbnail-icon-button">
            <img class="story-thumbnail-icon-button-icon font-segoe" src="../assets/download.svg" />
            <span class="story-thumbnail-icon-button-label font-segoe">Pobierz ePUB</span>
          </button>          
          <button class="story-thumbnail-icon-button">
            <img class="story-thumbnail-icon-button-icon font-segoe" src="../assets/download.svg" />
            <span class="story-thumbnail-icon-button-label font-segoe">Pobierz mobi</span>
          </button>       
          <button class="story-thumbnail-icon-button">
            <img class="story-thumbnail-icon-button-icon font-segoe" src="../assets/send.svg" />
            <span class="story-thumbnail-icon-button-label font-segoe">Wyślij do Kindle</span>
          </button>       
          <button class="story-thumbnail-icon-button">
            <img class="story-thumbnail-icon-button-icon" src="../assets/share.svg" />
            <span class="story-thumbnail-icon-button-label font-segoe">Udostępnij</span>
          </button>
        </div>
      </div>
      <div class="story-thumbnail-bottom-bottom">
        <div class="story-thumbnail-bottom-bottom-left">
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin">Opis</div>
            <div class="font-segoe">{{ description }}</div>
          </div>
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin">Fragment</div>
            <div class="story-thumbnail-fragment font-segoe">{{ fragment }}..</div>
          </div>
        </div>
        <div class="story-thumbnail-bottom-bottom-right">
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin">Rok wydania</div>
            <div class="story-thumbnail-value font-segoe">{{ year }}</div>
          </div>
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin">Rozdziały</div>
            <div class="story-thumbnail-value font-segoe">{{ chapters }}</div>
          </div>
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin">Gatunek</div>
            <div class="story-thumbnail-value font-segoe">{{ genre }}</div>
          </div>
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin">Tagi</div>
            <div class="story-thumbnail-tags">
              <span class="story-thumbnail-tag font-segoe" v-for="tag in tags">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.story-thumbnail {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-thumbnail-cover {
  position: absolute;
  width: 14rem;
  top: -4rem;
  left: 4rem;
  height: auto;
  box-shadow: 11px 35px 27px -10px rgba(66, 68, 90, 1);
}

.story-thumbnail-label {
  color: darkslategrey;
  font-weight: bold;
}

.story-thumbnail-fragment {
  font-style: italic;
  text-indent: 2rem;
}

.story-thumbnail-tuple {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.story-thumbnail-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.story-thumbnail-icon-button-icon {
  width: 1.25rem;
  height: auto;
  filter: invert(28%) sepia(8%) saturate(1633%) hue-rotate(131deg) brightness(93%) contrast(92%);
}

.story-thumbnail-icon-button-label {
  font-size: 1rem;
}

.story-thumbnail-icon-button {
  background-color: transparent;
  border-radius: 0.5rem;
  border: 1px solid darkslategray;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;
}

.story-thumbnail-icon-button:hover {
  color: darkgoldenrod;
  border-color: darkgoldenrod;
}

.story-thumbnail-tag {
  cursor: pointer;
}

.story-thumbnail-tag:hover {
  color: darkgoldenrod;
}

.story-thumbnail-button {
  border-radius: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: fit-content;
  color: white;
  background-color: darkslategray;
  font-weight: lighter;
  cursor: pointer;
}

.story-thumbnail-button:hover {
  background-color: darkgoldenrod;
}

.story-thumbnail-bottom {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: gainsboro;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 0.5rem;
}

.story-thumbnail-bottom-up {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: space-between;
  padding-bottom: 2rem;
  margin-left: 18rem;
  border-bottom: 1px solid darkslategray;
}

.story-thumbnail-bottom-up-right {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.story-thumbnail-bottom-bottom {
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 4rem;
}

.story-thumbnail-bottom-bottom-left {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
}

.story-thumbnail-bottom-bottom-right {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-thumbnail-title {
  font-size: 2rem;
  padding-left: 22rem;
}
</style>
