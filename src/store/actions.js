import Vue from 'vue';

const actions = {

    loadBreeds(){
        return Vue.http.get('https://dog.ceo/api/breeds/list/all').then(ret => {
          return ret;
        });
      },
      loadBreedsHound(){
        return Vue.http.get('https://dog.ceo/api/breed/hound/list').then(ret => {
          return ret;
        });
      }

}
export default actions;