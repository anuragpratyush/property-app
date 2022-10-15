<template>
    <div>
        <NavHeader/>
        <div v-if="show" class="alert alert-success alert-dismissible fade show" role="alert">
           {{success_message}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <h1>API Property</h1>
        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">County</th>
      <th scope="col">Country</th>
      <th scope="col">Town</th>
      <th scope="col">Address</th>
      <th scope="col">Property Type</th>
      <th scope="col">Type</th>
      <th scope="col">Bedroom</th>
      <th scope="col">Bathroom</th>
      <th scope="col">Price</th>
      <th scope="col">Created Date</th>
     

    </tr>
  </thead>
  <tbody v-if="properties.length > 0">

    <tr v-for="property in properties" :key="property.id">
      <td>{{property.id}}</td>
      <td><img v-bind:src="property.thumbnail_url" height="50" width="50"></td>
      <td>{{property.county}}</td>
      <td>{{property.country}}</td>
      <td>{{property.town}}</td>
      <td>{{property.address}}</td>
      <td>{{property.property_type}}</td>
      <td>{{property.type}}</td>
      <td>{{property.bedrooms}}</td>
      <td>{{property.bathrooms}}</td>
      <td>{{property.price}}</td>
      <td>{{ moment(property.updated_at).format("DD-MM-YYYY")}}</td>
     

    </tr>
    
  </tbody>

   <tbody v-else>

        <tr >
            <td colspan="12" align="center">No Data Found.</td>
        </tr>

    </tbody>
</table>
    </div>
  
</template>




<script>
import NavHeader from "./Header.vue";
import moment from "moment";

export default {
    data() {
        return {
            properties: [],
            data_from : 'api',
            moment: moment
        };
    },
    created() {
        this.axios.get(`http://127.0.0.1:8000/api/get-property/${this.data_from}`).then((response) => {
            this.properties = response.data.data;
        });
    },
 
    components: { NavHeader }
}
</script>

<style>

</style>