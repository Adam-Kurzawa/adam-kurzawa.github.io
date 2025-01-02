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
        <div>
            <SecondaryText text="Audiobook dostępny na kanale Opowieści Siaka." class="gainsboro" />
            <span class="yt-channel">
                <img class="yt-channel-icon" src="@/assets/youtube.png" />
                <span class="yt-channel-name font-segoe">Posłuchaj audiobooka</span>
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
    background: rgba(0, 0, 0, 0.25) url('@/assets/bukowe_widziadlo.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: darken;
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
    margin-top: 1rem;
    display: inline-flex;
    flex-direction: row;
    cursor: pointer;
    gap: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 1rem;
    padding-top: 0.4rem;
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

.yt-channel:hover .yt-channel-icon {
    border: 1px solid white;
}

.yt-channel-name {
    font-weight: bold;
    font-size: 1rem;
    transition: all 0.5s ease;
}

.yt-channel-icon {
    width: 1.85rem;
    border: 1px solid transparent;
    border-radius: 1rem;
    margin-top: 0.15rem;
    height: auto;
    transition: all 0.5s ease;
}
</style>