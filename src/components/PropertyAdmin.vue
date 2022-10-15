<template>
    <div>
        <NavHeader/>
        <h2>Add Property</h2>

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
        <form>
        <div class="form-group">
            <label for="county">County:</label>
            <input type="text" ref="county" class="form-control" id="county" v-model="adminForm.county">
        </div>

        <div class="form-group">
            <label for="country">Country:</label>
            <input type="text" ref="country"  class="form-control" id="country" v-model="adminForm.country">
        </div>

        <div class="form-group">
            <label for="town">Town:</label>
            <input type="text" ref="town" class="form-control" id="town" v-model="adminForm.town">
        </div>

        <div class="form-group">
            <label for="postcode">Postcode:</label>
            <input type="text" ref="postcode" class="form-control" id="postcode" v-model="adminForm.postcode">
        </div>

        <div class="form-group">
            <label for="description">Description:</label>
            <textarea ref="description" class="form-control" rows="5" id="description" v-model="adminForm.description"></textarea>
        </div>

        <div class="form-group">
            <label for="displayAdd">Displayable Address:</label>
            <input type="text" ref="address" class="form-control" id="displayAdd" v-model="adminForm.displayAddress">
        </div>

        <label for="bed">Number of bedroom</label>
            <select ref="bedroom" class="form-control" id="bed" v-model="adminForm.bedroom">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>

            <label for="bath">Number of bathroom</label>
            <select ref="bathroom" class="form-control" id="bath" v-model="adminForm.bathroom">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>

            <div class="form-group">
                <label for="price">Price</label>
                <input type="text" ref="price" class="form-control" id="price" v-model="adminForm.price">
            </div>

            <label for="pt">Property Type</label>
            <select ref="propertyType" class="form-control" id="pt" v-model="adminForm.propertyType">
            <option>Duplex</option>
            <option>Semi-detached</option>
            <option>Banglow</option>
            <option>Flat</option>
           
            </select>
            <br>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="sale" value="sale" v-model="adminForm.type">
                <label class="form-check-label" for="sale">
                For Sale
                </label>
            </div>

            <div class="form-check mb-3">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="rent" value="rent" v-model="adminForm.type">
                <label class="form-check-label" for="rent">
                    For Rent
                </label>
            </div>

            <button v-on:click="submitAdminFormData" type="button" class="btn btn-primary mb-4">Save Property</button>
        </form>

      
    </div>
  
</template>

<script>
import NavHeader from "./Header.vue";

export default {
    components: { NavHeader },
    data () {

        return {
            errors: [],
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
              

            },
            'success_message' : '',
            'show' : false,

        }
    },
    methods: {
        submitAdminFormData () {
            this.errors = [];

        if (this.adminForm.county && this.adminForm.country && this.adminForm.town && this.adminForm.postcode && this.adminForm.displayAddress && this.adminForm.description && this.adminForm.bedroom && this.adminForm.bathroom && this.adminForm.price && this.adminForm.propertyType) {

            this.axios.post('http://127.0.0.1:8000/api/save-admin-property', this.adminForm)
                    .then((response) => {

                        this.success_message = response.data.msg;
                        this.show = true;
                        this.$router.push({name:"manageproperty"});
                    }, (error) => {
                        
                    });
        }

       

        if (!this.adminForm.county) {
            this.errors.push('County field is required');
           
        }
        if (!this.adminForm.country) {
            this.errors.push('Country field is required.');
            
        }

        if (!this.adminForm.town) {
            this.errors.push('town field is required.');
           
        }

        if (!this.adminForm.postcode) {
            this.errors.push('Postcode field is required.');
          
        } else if (!this.validPostalCode(this.adminForm.postcode)) {
            this.errors.push('Postalcode must be alphanumeric and should be 8 character in length');
        }

        if (!this.adminForm.displayAddress) {
            this.errors.push('Display address field is required.');
       
        }

        if (!this.adminForm.description) {
            this.errors.push('Description field is required.');
           
        }

        if (!this.adminForm.bedroom) {
            this.errors.push('Bedroom field is required.');
           
        }

        if (!this.adminForm.bathroom) {
            this.errors.push('Bathroom field is required.');
           
        }

        if (!this.adminForm.price) {
            this.errors.push('Price field is required is required.');
          
        } else if (!this.validPrice(this.adminForm.price)) {
            this.errors.push('Price must be valid integer');
        }

        if (!this.adminForm.propertyType) {
            this.errors.push('Property type field is required.');
           
        }

   
        },
        
        validPrice: function (price) {
           let num =  isNaN(price);
           if(num) {
                return false;
           } else {
            return true;
           } 
        
        },

        validPostalCode: function (postalcode) {

        let letterNumber = /^[0-9a-zA-Z]+$/;
       
            if((postalcode.match(letterNumber)) && postalcode.length == 8) 
            {
              
                return true;
            }
            else
            {   
              
                return false; 
            }
        }

        
    },

    mounted (){
       
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