import { defineStore } from "pinia";
export const useAuthStore = defineStore('auth' , {
    state:() => ({
        isLogin: !!sessionStorage.getItem('access-token'),
        type: sessionStorage.getItem('type') || 'user'
    }),
    actions:{
        login(respone){
            sessionStorage.setItem('access-token',respone.token);
            sessionStorage.setItem('type' , respone.role);
            this.isLogin = true;
            this.type = respone.role
        },
        logout(){
            sessionStorage.removeItem('access-token');
            sessionStorage.removeItem('type');
            this.isLogin = false
            this.type = 'user';
        }
    },
    persist: true
})