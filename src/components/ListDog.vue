<template>
  <v-app ListDog>
    <v-main>
      <v-container class="container">
          <v-card>
            <v-card-title class="title">
                Lista de cães
            <v-spacer></v-spacer>
             
            </v-card-title>
            <v-spacer></v-spacer>
             <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Pesquisar"
                  single-line
                  hide-details
            ></v-text-field>
            <v-data-table :headers="header" 
                          :items="Lista_caes" 
                          :search="search" 
                          item-key="key" 
                          class="elevation-1">
               <template v-slot:body="{ items }">
                 <tbody >              
                    <tr :class="key === selectedRow ? 'custom-highlight-row' : ''"                   
                         @click="rowSelect(key)" v-for="(item, key) in items" :key="item.key">                                                                
                      <td>{{item.raca}}</td>
                      <td>{{item.sub}}</td>                      
                      <td>                          
                        <v-icon v-if="listaAddFavorito[key] && listaAddFavorito[key].favoritado === true " class="mx-2"  color="orange">star</v-icon>                        
                         <v-icon v-if="!listaAddFavorito[key]" class="mx-2" color="gray">star</v-icon>
                      </td>                                           
                    </tr>
                 </tbody>                                  
               </template>               
            </v-data-table>
          </v-card>
      </v-container>
    </v-main>
  </v-app>  
</template>
 
<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  data:() =>{
    return{ 
      cor: 'gray',
      line_favoritada : false,
      listaAddFavorito: [], 
      list_dog: [],
      selectedRow: null,
      search: '',
        header: [         
          { text: 'Raça', value: 'raca' },
          { text: 'Sub-Raça', value: 'sub' },
          { text: 'Favorito', value: '' },                                       
        ],
        Lista_caes: []
    }
  },
  created(){
    if(!localStorage.Lista_caes){
     this.loadListBreeds();
    }
  },
  mounted(){
    const dados_favorito = JSON.parse(localStorage.getItem('dados_favorito'));
    const lista_caes = JSON.parse(localStorage.getItem('lista_caes'));

    if(dados_favorito){
      this.listaAddFavorito = dados_favorito;
    }
    if(lista_caes){
      this.Lista_caes = lista_caes;
    }

  },
  computed: Object.assign({},
    mapGetters(['loadListBreends']),
    {

    }  
  ),
  methods: Object.assign({},
    mapActions(['loadBreeds','loadBreedsHound']),
    {
      loadListBreeds(){        
        this['loadBreeds']().then( ret => {
          if(ret.ok){            
           for( var raca in ret.data.message){             
             if(ret.data.message[raca].length === 0){
               this.list_dog.push({'raca': raca,'sub': ''});
             }
             else{
                ret.data.message[raca].forEach(sub => {
                this.list_dog.push({'raca': raca,'sub': sub});                               
               });
             }            
           }
           this.$store.commit('listBreendsAdd',this.list_dog);
           this.Lista_caes = this.list_dog; 
           localStorage.setItem('lista_caes',JSON.stringify(this.Lista_caes))
         
          } 
        })                   
      },    
      addFavorito(idx){  
        this.listaAddFavorito.push({'select_line':idx,'favoritado':true }) 
        console.log(this.listaAddFavorito);
        localStorage.setItem('dados_favorito',JSON.stringify(this.listaAddFavorito))                                                              
      },
      rowSelect(idx){ 
        console.log(this.cor);
        this.cor = 'orange';  
        console.log(this.cor);                    
        this.selectedRow = idx;
        this.addFavorito(idx);
      }, 
    }
  
  )
}
</script>

<style scoped>
  .custom-highlight-row{
     background-color:rgb(248, 201, 114);
  }
  
  .title{
    background-color:orange;
    color: white;
  }

</style>
