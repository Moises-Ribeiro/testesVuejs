import state from './state';

export default  {
    loadListBreends(){
        return state.listBreends;
    },
    loadListBreendsHount(){
        return state.listBreendsHount;
    },
    loadLocalStorage(){
        return state.data;
    }
    
    
}