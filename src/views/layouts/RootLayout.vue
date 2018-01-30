<template>
  <!-- begin:: Page -->
  <div>
    <!-- begin::Header -->
    <head-bar></head-bar>
    <!-- end::Header -->
    <!-- begin::Body -->
    <router-view></router-view>
    <!-- end::Body -->
    <!-- begin::Footer -->
    <foot-bar></foot-bar>
    <!-- end::Footer -->
  </div>
</template>


<script>
  import HeadBar from 'components/HeadBar'
  import FootBar from 'components/FootBar'

  export default {
    name: 'RootLayout',
    components: {
      HeadBar,
      FootBar,
    },
  }
</script>



