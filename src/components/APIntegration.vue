<template>
    
    <div>
        <NavHeader/>
        <div class="container">
        <h5 class="text-center">API Integration</h5>

        <p v-if="errors.length > 0">
        <b class="colourHead">Please correct the following error(s):</b>
        <ul>
            
            <li class="error" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        </p>

        <div v-if="show" class="alert alert-success alert-dismissible fade show" role="alert">
           {{success_message}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>


            <form @submit="apiData">
            <label for="pn">Page Number</label>
            <select class="form-control" id="pn" v-model="form.pageNumber">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>

            <label for="ps">Page Size</label>
            <select class="form-control" id="ps" v-model="form.pageSize">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>

            <label for="api">API Key</label>
                <input type="text" class="form-control" id="api" placeholder="API Key"  v-model="form.apiKey" readonly>
                <br>
                <button v-on:click="submitFormData" type="button" class="btn btn-primary">Call MTC API</button>
            </form>
          </div>
                
           
    
       </div>
      
</template>

<script>
import NavHeader from "./Header.vue";


export default {
    components: { NavHeader },
    data() {

        return {
            errors: [],
            form : {
              
                pageNumber: null,
                pageSize:null,
                apiKey: '3NLTTNlXsi6rBWl7nYGluOdkl2htFHug',
                data_from : {data_from : 'api'},
                
                },
            'success_message' : '',
            'show' : false,

        }
    },

    methods : {
        submitFormData() {

          this.errors = [];

          if(this.form.pageNumber && this.form.pageSize) {
            this.axios.get(`https://trial.craig.mtcserver15.com/api/properties?page[number]=${this.form.pageNumber}&page[size]=${this.form.pageSize}&api_key=${this.form.apiKey}`,
            ).then((response) => {
                    console.  log(response.data.data)
                    let postData = response.data.data; 
                    console.log('postdata ----',postData);
                    this.axios.post('http://127.0.0.1:8000/api/save-property', postData)
                        .then((response) => {

                            console.log('msg----',response.data.msg);
                            this.success_message = response.data.msg;
                            this.show = true;
                        }, (error) => {
                          
                        });
                })

          }

          if (!this.form.pageNumber) {
            this.errors.push('Please select page number');
           
          }
          if (!this.form.pageSize) {
              this.errors.push('Please select page size');
              
          }
           
          
            
        }

    },
    updated () {

      console.log('rfgrhy');
    }
}
</script>


<style scoped>
.colourHead {

    color : #800020
}

.error {

    color:   #EE4B2B;
}

</style>
