import Vue from 'vue';

const mutations = {
    listBreendsAdd(state,raca){
        state.listBreends.push(raca);
    },
    listBreendsHoundAdd(state,sub){
        state.listBreendsHount.push(sub);        
    },
}
export default mutations;