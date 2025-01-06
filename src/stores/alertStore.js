import { defineStore } from "pinia";
export const useAlertStore = defineStore('alert' , {
    state: () => ({
        alertMessage : '',
        alertType : ''
    }),
    actions:{
        setAlertMessage(message, type = 'success'){
            if(typeof message === Object && message !==null){
                this.alertMessage = message.message || 'An Alert occurred';
                this.alertType = message.type || type;
            }else{
                this.alertMessage = message;
                this.alertType = type;
            }
        },
        clearAlertMessage(){
            this.alertMessage = '';
            this.alertType = '';
        }
    }
});