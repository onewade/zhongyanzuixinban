<template>
	<main class="page-wrapper">
		<Header class="headerContainer" />
		<div class="main-content">
			<slot></slot>
		</div>
		<FooterNew />
	</main>
</template>

<script setup>
</script>

<style scoped>
.page-wrapper {
	position: relative;
}

.main-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	-moz-user-select: none;
	-khtml-user-select: none;
	user-select: none;
}

.lang-switcher {
	/* position: fixed;
	top: 10px;
	right: 10px; */
	z-index: 99999;
}

.headerContainer {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	padding-top:0.9rem;
}

@media screen and (max-width: 640px) {
	.lang-switcher {
		position: fixed;
		top: 500px !important;
		right: 0;
		z-index: 9999;
	}

}
</style>
