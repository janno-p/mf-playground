<template>
    <div>
        <h3>App1</h3>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const count = ref(0)

        const inc = () => {
            count.value++
        }

        return {
            count,
            inc
        }
    }
}
</script>

<style scoped>
img {
    width: 200px;
}
h1 {
    font-family: Arial, Helvetica, sans-serif;
}
</style>
