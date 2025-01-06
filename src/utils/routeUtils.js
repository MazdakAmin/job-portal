import { useRoute } from "vue-router";
export function isRouteActive(path){
    const route = useRoute();
    return route.path === path;
}