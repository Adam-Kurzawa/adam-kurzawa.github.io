<script setup>
import H1 from './headers/H1.vue'
import H3 from './headers/H3.vue'
import LinkButton from './buttons/LinkButton.vue';
import SecondaryText from './texts/SecondaryText.vue';
</script>

<template>
    <div class="ad">
        <H1 text="Bukowe Widziadło" colorful="true" class="white" />
        <SecondaryText text="Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et." class="gainsboro" />
        <LinkButton text="Przeczytaj fragment" class="white white-link" />
        <H3 text="Posłuchaj audiobooka" class="white" />
        <div>
            <span class="yt-channel">
                <img class="yt-channel-thumb" src="https://yt3.googleusercontent.com/OKaHAtlMS-6oDD6Xc_-ZhbtGWLpHsU82dMjkp24hVsdiuRZ-FZhdyK2bXvU5zL3CsWfZVAip=s900-c-k-c0x00ffffff-no-rj" />
                <span class="yt-channel-name font-segoe">Opowieści Siaka</span>
                <img class="yt-channel-icon" src="@/assets/youtube.png" />
            </span>
        </div>
    </div>
</template>

<style scoped>
.ad {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 0.5rem;
    padding: 2rem;
    background-image: url('@/assets/bukowe_widziadlo.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.gainsboro {
    color: gainsboro !important;
}

.white {
    color: white !important;
}

.white-link:hover {
    color: lightblue !important;
}

.yt-channel {
    display: inline-flex;
    flex-direction: row;
    gap: 1rem;
    background-color: white;
    border-radius: 4rem;
    padding-left: 0.5rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    align-items: center;
    transition: all 0.5s ease;
}

.yt-channel:hover {
    background-color: #FF0000;
}

.yt-channel:hover .yt-channel-name {
    color: white;
}

.yt-channel-thumb {
    border-radius: 100%;
    width: 3rem;
    height: auto;
}

.yt-channel-name {
    font-weight: bold;
    font-size: 1.10rem;
    transition: all 0.5s ease;
}

.yt-channel-icon {
    width: 2rem;
    height: auto;
}
</style>