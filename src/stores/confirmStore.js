import { defineStore } from "pinia";
export const useConfirmStore = defineStore('confirm' , {
    state: () => ({
        showModal : false,
        message:'',
        onConfirmCallback: null
    }),
    actions:{
        openConfirmModal(message,onConfirm){
            this.message = message;
            this.showModal = true;
            this.onConfirmCallback = onConfirm;
        },
        closeConfirmModal(){
            this.showModal = false;
            this.message = '';
            this.onConfirmCallback = null;
        },
        confirm(){
            if(this.onConfirmCallback){
                this.onConfirmCallback();
                this.closeConfirmModal();
            }
        }
    }
});