<template>
  <v-app App>
     <v-app-bar ></v-app-bar>
     <ListDog/> 
  </v-app>  
</template>
 
<script>
import ListDog from './components/ListDog.vue'
export default {
  components:{
    ListDog
  },
  data:() =>{
    return{
      componente : 'ListDog'
    }
  }
  
  
}
</script>

<style scoped>
   
</style>
