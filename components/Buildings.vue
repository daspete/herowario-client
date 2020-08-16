<template>
    <div class="buildings flex flex-wrap">
        <Building
            v-for="building in buildings"
            :key="`building-${ building.id }`"
            :building="building"
        />
    </div>
</template>

<script>
export default {
    props: {
        buildings: { type: Array, default: () => { return [] } }
    },
}
</script>

<style>

</style>