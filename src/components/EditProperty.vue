<template>
    <div>
        <NavHeader/>
        <h2>Edit Property</h2>
        <div v-if="show" class="alert alert-success alert-dismissible fade show" role="alert">
            {{success_message}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form>
        <div class="form-group">
            <label for="county">County:</label>
            
<input type="text" name="county" class="form-control" id="county" v-model="adminForm.county">
        </div>

        <div class="form-group">
            <label for="country">Country:</label>
            <input type="text" class="form-control" id="country" v-model="adminForm.country">
            <input type="hidden" v-model="adminForm.id">
        </div>

        <div class="form-group">
            <label for="town">Town:</label>
            <input type="text" class="form-control" id="town" v-model="adminForm.town">
        </div>

        <div class="form-group">
            <label for="postcode">Postcode:</label>
            <input type="text" class="form-control" id="postcode" v-model="adminForm.postcode">
        </div>

        <div class="form-group">
            <label for="description">Description:</label>
            <textarea class="form-control" rows="5" id="description" v-model="adminForm.description"></textarea>
        </div>

        <div class="form-group">
            <label for="displayAdd">Displayable Address:</label>
            <input type="text" class="form-control" id="displayAdd" v-model="adminForm.displayAddress">
        </div>


        <label for="bed">Number of bedroom</label>
            <select class="form-control" id="bed" v-model="adminForm.bedroom">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>

            <label for="bath">Number of bathroom</label>
            <select class="form-control" id="bath" v-model="adminForm.bathroom">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>

            <div class="form-group">
                <label for="price">Price</label>
                <input type="text" class="form-control" id="price" v-model="adminForm.price">
            </div>
           

            <label for="pt">Property Type</label>
            <select class="form-control" id="pt" v-model="adminForm.propertyType">
            <option>Private</option>
            <option>Public</option>
           
            </select>
            <br>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="sale" value="sale" v-model="adminForm.type">
                <label class="form-check-label" for="sale">
                For Sale
                </label>
            </div>

            <div class="form-check mb-4">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="rent" value="rent" v-model="adminForm.type">
                <label class="form-check-label" for="rent">
                    For Rent
                </label>
            </div>

            <button v-on:click="updateProperty" type="button" class="btn btn-primary  mb-4">Update Property</button>
        </form>

      
    </div>
  
</template>

<script>
import NavHeader from "./Header.vue";

export default {
    name: 'EditProperty',
  
    data () {

        return {
            adminForm : {
                county : null,
                country : null,
                town: null,
                postcode : null,
                displayAddress : null,
                description : null,
                bedroom : null,
                bathroom : null,
                price : null,
                propertyType: null,
                type : 'rent',
                id : null
              

            },
            'success_message' : '',
            'show' : false,

        }
    },

   
    methods: {

      async   showPropertyById(){

            await this.axios.get(`http://127.0.0.1:8000/api/get-property-by-id/${this.$route.params.id}`).then(response=>{
               console.log(response.data.data);
                this.adminForm.county = response.data.data.county
                this.adminForm.country =  response.data.data.country,
                this.adminForm.town = response.data.data.town,
                this.adminForm.postcode = response.data.data.country,
                this.adminForm.displayAddress = response.data.data.address,
                this.adminForm.description = response.data.data.description,
                this.adminForm.bedroom = response.data.data.bedrooms,
                this.adminForm.bathroom = response.data.data.bathrooms,
                this.adminForm.price = response.data.data.price,
                this.adminForm.propertyType = response.data.data.property_type,
                this.adminForm.type = response.data.data.type,
                this.adminForm.id = response.data.data.id
            }).catch(error=>{
              
            })
        },

        updateProperty () {

            console.log(this.adminForm);
            
                this.axios.post('http://127.0.0.1:8000/api/save-admin-property', this.adminForm)
                    .then((response) => {

                        this.success_message = response.data.msg;
                        this.show = true;

                        
                            this.$router.push({name:"manageproperty"});
                      
                       
                       
                    }, (error) => {
                        
                    });
        }
    },
   
    mounted (){
       this.showPropertyById();
      
    },
    components: { NavHeader }

}
</script>