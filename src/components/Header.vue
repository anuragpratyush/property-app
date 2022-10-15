<template>
  <header>

    
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">


  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/apintegration" class="nav-link">API Integration</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/api-property" class="nav-link">API Property Listing</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/property-admin" class="nav-link">Admin Property</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/manage-property" class="nav-link">Admin Property Listing</RouterLink>
      </li>
    </ul>
  </div>
</div>
</nav>
     
      
    
  </header>
  

 
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

</script>

<style scoped>


</style> 
