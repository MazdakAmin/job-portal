<template>
    <div :class="[bg , 'p-6' , 'rounded-lg' , 'shadow-md']">
        <slot />
    </div>
</template>
<script>
export default {
    props:{
        bg:{
            type:String,
            default:"bg-gray-100"
        }
    }
}
</script>