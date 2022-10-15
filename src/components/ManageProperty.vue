<template>
    <div>
        <NavHeader/>
        <div v-if="show" class="alert alert-success alert-dismissible fade show" role="alert">
           {{success_message}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <h1>Manage Admin Property</h1>
<div class="table-responsive">
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">County</th>
      <th scope="col">Country</th>
      <th scope="col">Town</th>
      <th scope="col">Postal Code</th>
      <th scope="col">Address</th>
      <th scope="col">Bedroom</th>
      <th scope="col">Bathroom</th>
      <th scope="col">Price</th>
      <th scope="col">Property Type</th>
      <th scope="col">Type</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody v-if="properties.length > 0">

    <tr v-for="property in properties" :key="property.id">
      <td>{{property.id}}</td>
      <td>{{property.county}}</td>
      <td>{{property.country}}</td>
      <td>{{property.town}}</td>
      <td>{{property.postalcode}}</td>
      <td>{{property.address}}</td>
      <td>{{property.bedrooms}}</td>
      <td>{{property.bathrooms}}</td>
      <td>{{property.price}}</td>
      <td>{{property.property_type}}</td>
      <td>{{property.type}}</td>
      <td>{{ moment(property.updated_at).format("DD-MM-YYYY")}}</td> 

      <td>
        <div class="d-flex">
            <RouterLink :to="{name:'EditProperty', params:{id : property.id}}" class="btn btn-primary">Edit</RouterLink> 
        

        <button v-on:click="DeleteRecord(property.id)" type="button" class="btn btn-danger ml-2">Delete</button>

        </div>
       
    </td>

    </tr>
    
  </tbody>

   <tbody v-else>

        <tr >
            <td colspan="12" align="center">No Data Found.</td>
        </tr>

    </tbody>
</table>
</div>
    </div>
  
</template>




<script>
import moment from "moment";
import NavHeader from "./Header.vue";

export default {
    data() {
        return {
            properties: [],
            "success_message": "",
            "show": false,
            "data_from" : 'admin',
            moment: moment
        };
    },
    created() {
        this.axios.get(`http://127.0.0.1:8000/api/get-property/${this.data_from}`).then((response) => {
            this.properties = response.data.data;
        });
    },
    methods: {
        DeleteRecord(propId) {
            this.axios.post("http://127.0.0.1:8000/api/delete-property", { id: propId })
                .then((response) => {
                this.success_message = response.data.msg;
                this.show = true;
                this.properties = this.properties.filter(p => p.id !== propId);
            }, (error) => {
            });
        }
    },
    components: { NavHeader }
}
</script>

<style>

</style>