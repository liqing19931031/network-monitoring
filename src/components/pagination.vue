<template>
	<nav aria-label="Page navigation">
		 <ul class="pagination pull-right">
		    <li>
		      <a aria-label="Previous" @click='changePage(currentPage - 1)'>
		        <span aria-hidden="true">&laquo;</span>
		      </a>
		    </li>
		    <li v-for='(item, index) in pages'>
		    	<a @click='changePage(item)' :class='item === currentPage ? "active" : ""'>
		    	{{item}}
		    	</a>
		    </li>
		    <li>
		      <a aria-label="Next" @click='changePage(currentPage + 1)'>
		        <span aria-hidden="true">&raquo;</span>
		      </a>
		    </li>
		  </ul>
	</nav>
</template>

<script>
	export default {
		props: ['totalPage', 'params', 'getList'],
		data () {
			return {
				currentPage: 1,
				pageItems: []
			}
		},
		name: 'pagination',
		computed: {
			pages () {
				let a
				this.pageItems = []
				if (this.totalPage <= 5) {
					for (a = 1; a <= this.totalPage; a++) {
						this.pageItems.push(a)
					}
				} else {
					if (this.currentPage > 3) {
						if (this.currentPage === 4) {
							this.pageItems = [1, this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, '...', this.totalPage]
						} else {
							if (this.totalPage > this.currentPage + 3) {
								this.pageItems = [1, '...', this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, '...', this.totalPage]
							} else {
								if (this.totalPage === this.currentPage + 3) {
									this.pageItems = [1, '...', this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, this.totalPage]
								} else {
									if (this.totalPage === this.currentPage + 2) {
										this.pageItems = [1, '...', this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.totalPage]
									} else {
										if (this.totalPage === this.currentPage + 1) {
											this.pageItems = [1, '...', this.currentPage - 2, this.currentPage - 1, this.currentPage, this.totalPage]
										} else {
											this.pageItems = [1, '...', this.currentPage - 2, this.currentPage - 1, this.totalPage]
										}
									}
								}
							}
						}
					} else {
						this.pageItems = [1, 2, 3, 4, '...', this.totalPage]
					}
				}
				return this.pageItems
			}
		},
		mounted () {
		},
		methods: {
			changePage (page) {
				if (page > 0 && page <= this.totalPage) {
					this.$set(this, 'currentPage', page)
					this.$set(this.params, 'page', page)
					this.getList(this.params)
				}
			}
		}
	}
</script>

<style lang='less'>
	.pagination{
		a{
			cursor: pointer;
		}
		.active{
			color: white;
			background-color: #38a4ff;
		}
	}
</style>
