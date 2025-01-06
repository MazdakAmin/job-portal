import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth' , {
    state:() => ({
        isLogin: !!localStorage.getItem('access-token'),
        type: localStorage.getItem('type') || 'user'
    }),
    actions:{
        login(respone){
            localStorage.setItem('access-token',respone.token);
            localStorage.setItem('type' , respone.type);
            this.isLogin = true;
            this.type = respone.type
        },
        logout(){
            localStorage.removeItem('access-token');
            localStorage.removeItem('type');
            this.isLogin = false
            this.type = 'user';
        }
    },
    persist: true
})