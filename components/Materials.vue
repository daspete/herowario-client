<template>
    <div class="materials">
        <div
            v-for="material in Object.keys(materials)"
            :key="`material-${ material }`"
        >
            {{ material }}: {{ materials[material] }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        materials: { type: Object, default: () => { return {} } }
    }
}
</script>

<style>

</style>