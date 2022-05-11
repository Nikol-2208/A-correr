<template>
  <app>
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">A-Correr</router-link>
      </div>
    </nav>
    <div class="row mb-0 justify-content-md-center">
      <div class="col-md-12">
        <div class="project-title">
          <h1 class="mb-0 text-center">Vendedores ¡a correr!</h1>
          <router-view/>
        </div>
      </div>
    </div>
  </app>
</template>
