import { defineStore } from "pinia";

export const useConfirmationStore = defineStore('confirm' , {
    state: () => ({
        showModal : false,
        message:'',
        onConfirmCallback: null
    }),
    actions:{
        openConfirmModal(message,onConfirm){
            this.message = message;
            this.onConfirmCallback = onConfirm;
            this.showModal = true;
        },
        closeConfirmModal(){
            this.showModal = false;
            this.message = '';
            this.onConfirmCallback = null;
        },
        confirm(){
            if(this.onConfirmCallback){
                this.openConfirmModal();
                this.closeConfirmModal();
            }
        }
    }
});