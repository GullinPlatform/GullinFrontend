<template>
  <!-- begin:: Page -->
  <div class="m-grid m-grid--hor m-grid--root m-page">
    <div class="m-grid__item m-grid__item--fluid m-grid  m-error-1" style="background-image: url(/static/media/img//error/bg1.jpg);">
      <div class="m-error_container">
					<span class="m-error_number">
						<h1>
							404
						</h1>
					</span>
        <p class="m-error_desc">
          Sorry, but the page you are looking for has note been found.
        </p>
        <router-link :to="{name:'dashboard'}">go back to dashboard</router-link>
      </div>
    </div>
  </div>
  <!-- end:: Page -->
</template>
<script>
  export default {
    name: 'Page404',
  }
</script>
