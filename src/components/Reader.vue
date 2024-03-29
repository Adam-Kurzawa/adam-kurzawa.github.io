<script setup>
import { computed, ref } from "vue";
import Panel from "./Panel.vue";

const props = defineProps(["story"]);

const darkMode = ref(true);
const fontSize = ref(1.25);
const fontFamily = ref("Times New Roman");

const semitransparentBgClass = computed(() => darkMode.value ? 'dark-mode-semitransparent-bg' : 'light-mode-semitransparent-bg')
const solidBgClass = computed(() => darkMode.value ? 'dark-mode-bg' : 'light-mode-bg')
const textClass = computed(() => darkMode.value ? 'dark-mode-text' : 'light-mode-text')
</script>

<template>
  <main>
    <Panel class="float" :class="[semitransparentBgClass]">
      <div class="settings">
        <div class="small-controls">
          <div class="btn-group dropdown">
            <p
              :class="[textClass]"
              style="
                border-top-right-radius: 0.5rem !important;
                border-bottom-right-radius: 0.5rem !important;
                border-right: 1px #e69b54 solid;
              "
            >
              Pobierz
            </p>
            <div class="dropdown-content" :class="[solidBgClass]">
              <a href="#" class="font-segoe" :class="[textClass]">PDF</a>
              <a href="#" class="font-segoe" :class="[textClass]">ePUB</a>
              <a href="#" class="font-segoe" :class="[textClass]">Mobi</a>
              <a href="#" class="font-segoe" :class="[textClass]">AZW3</a>
            </div>
          </div>
          <div class="btn-group">
            <p :class="[textClass]">Motyw</p>
            <button @click="() => { darkMode = !darkMode; }" :class="[textClass]">
              {{ darkMode ? "Jasny" : "Ciemny" }}
            </button>
          </div>
        </div>
        <div class="btn-group">
          <p :class="[textClass]">Rozmiar tekstu</p>
          <button @click="() => { fontSize = fontSize + 0.25; }" :class="[textClass]">+</button>
          <button @click="() => { fontSize = 1.25; }" :class="[textClass]">100%</button>
          <button @click="() => { fontSize = fontSize - 0.25; }" :class="[textClass]">-</button>
        </div>
        <div class="btn-group">
          <p :class="[textClass]">Czcionka</p>
          <button @click="() => { fontFamily = 'Times New Roman'; }" :class="[textClass]">Times</button>
          <button @click="() => { fontFamily = 'Georgia'; }" :class="[textClass]">Georgia</button>
          <button @click="() => { fontFamily = 'Arial'; }" :class="[textClass]">Arial</button>
          <button @click="() => { fontFamily = 'Verdana'; }" :class="[textClass]">Verdana</button>
        </div>
      </div>
    </Panel>
    <Panel class="transition" :class="[solidBgClass]">
      <div class="title" :class="[textClass]">{{ props.story.title }}</div>
      <div
        v-for="paragraph in props.story.paragraphs"
        class="paragraph"
        :class="[textClass]"
        :style="{ 'font-size': `${fontSize}rem`, 'font-family': fontFamily }"
      >
        {{ paragraph }}
      </div>
    </Panel>
  </main>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  border: 1px #e69b54 solid;
  border-radius: 0.5rem;
  top: -8.9rem;
  min-width: 160px;
  z-index: 1;
}

.dropdown-content a {
  padding: 12px 16px;
  border-radius: 0.5rem;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #e69b54;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

.dark-mode-bg {
  background-color: rgb(30, 54, 54);
}

.light-mode-bg {
  background-color: white;
}

.dark-mode-semitransparent-bg {
  background-color: rgba(0, 0, 0, 0.5);
}

.light-mode-semitransparent-bg {
  background-color: rgba(255, 255, 255, 0.5);
}

.dark-mode-text {
  color: white;
}

.light-mode-text {
  color: black;
}

.btn-group {
  width: fit-content;
}

.btn-group button {
  transition: font-size 1s ease;
  border: 1px solid #e69b54;
  padding: 0.5rem 1rem;
  background: none;
  cursor: pointer;
  float: left;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.btn-group p {
  transition: font-size 1s ease;
  border: 1px solid #e69b54;
  padding: 0.5rem 1rem;
  float: left;
  font-weight: bold;
  margin: 0;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.btn-group select {
  transition: font-size 1s ease;
  border: 1px solid #e69b54;
  padding: 0.5rem 1rem;
  float: left;
  font-weight: bold;
  margin: 0;
  background: none;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.btn-group :first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.btn-group :last-child {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.btn-group :not(:last-child) {
  border-right: none;
}

.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

.btn-group button:hover {
  background-color: #e69b54;
}

.float {
  transition: background 1s ease;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  backdrop-filter: blur(10px);
}

.small-controls {
  display: contents;
}

.settings {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.title {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.paragraph {
  transition: color 1s ease, font-size 1s ease;
  text-align: justify;
  margin-top: 0.5rem;
  text-indent: 2rem;
}

.transition {
  transition: background 1s ease;
  margin-bottom: 10rem;
}

@media screen and (max-width: 1200px) {
  .btn-group button {
    font-size: 0.75rem;
  }

  .btn-group p {
    font-size: 0.75rem;
  }

  .btn-group select {
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 1024px) {
  .settings {
    display: block;
  }
  
  .btn-group {
    margin-bottom: 0.5rem;
  }

  .btn-group button {
    font-size: 0.75rem;
  }

  .btn-group p {
    font-size: 0.75rem;
  }

  .btn-group select {
    font-size: 0.75rem;
  }

  .float {
    padding-bottom: 0 !important;
    padding-top: 1rem !important;
  }

  .small-controls {
    display: flex;
    gap: 1rem;
  }
}
</style>
