<template>
    <div>
        <header class="shadow py-4 px-5">
            <div class="flex justify-between">
                <div>
                    <span class="lg">R</span><span class="sm">ank</span>
                    <span class="lg">W</span><span class="sm">ith</span>
                    <span class="lg">E</span><span class="sm">bube</span>
                </div>

                <u-button to="/admin/auth/logout" label="Sign Out" icon="fa6-solid:arrow-right-to-bracket" size="md" color="error" variant="soft" />
            </div>
        </header>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.lg {
    font-weight: bolder;
    font-size: larger;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.sm{
    font-size: x-small;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>