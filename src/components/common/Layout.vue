<template>
	<main class="page-wrapper">
		<Header/>
		
		<div class="main-content">
			<slot></slot>
		</div>
	
		<Footer/>
	</main>
</template>

<script setup>

</script>

<style scoped>
.main-content{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	-moz-user-select: none;
  -khtml-user-select: none; 
  user-select: none;
}
</style>
