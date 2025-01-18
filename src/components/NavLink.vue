<template>
<RouterLink 
:to="to"
 :class="[ 'text-white', isRouteActive ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'rounded-md', 'px-3', 'py-2']"
 
 >
<slot></slot>
</RouterLink>
</template>
<script>
import { RouterLink,useRoute } from 'vue-router';
export default{
    components:{
        RouterLink
    },
    props:{
        to:{
            type:String,
            required:true
        }
    },
    computed:{
        isRouteActive(){
        const route = useRoute();
        return route.path === this.to;
        }
    }
}
</script>