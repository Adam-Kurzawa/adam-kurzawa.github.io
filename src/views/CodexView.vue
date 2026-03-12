<script setup>
import CodexSection from '@/components/codex/CodexSection.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import GenericView from '@/GenericView.vue'
import { useMetaindex } from '@/utils/useMetaindex'
import { useStaticAsset } from '@/utils/useStaticAsset'
import { computed } from 'vue'

const metaindex = useMetaindex()

const universes = computed(() => {
    const raw = metaindex.value

    return [
        { ...raw.doktryna_solarna, universum: 'doktryna_solarna' },
        { ...raw.deus_vult, universum: 'deus_vult' },
        { ...raw.solstice, universum: 'solstice' },
        { ...raw.crimsonverse, universum: 'crimsonverse' }
    ]
})
</script>

<template>
    <GenericView>
        <Breadcrumbs :locations="[ { name: 'Codex', target: '/codex' } ]" />
        <ViewHeader title="Codex" description="Witaj w sercu uniwersów Alternaty. Tutaj gromadzimy wiedzę o postaciach, technologiach i historii światów, które narodziły się w wyobraźni. Wybierz ścieżkę, by dowiedzieć się więcej." />
        <template v-if="metaindex">
            <div class="py-20 space-y-48">
                <CodexSection v-for="(universum, index) in universes"
                              :key="universum.title"
                              :universum="universum.universum" 
                              :index="index + 1" 
                              :cover="useStaticAsset(universum.cover)" 
                              :logo="useStaticAsset(universum.logo)" 
                              :description="universum.description" 
                              :links="universum.values" 
                />
            </div>
        </template>
    </GenericView>
</template>
