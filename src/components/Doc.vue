<template>
	<div class="doc">
		<h2 class="text-gray-darker">网站监控ui定制</h2>
		<h1 class="text-gray-dark">网站监控ui定制</h1>
		<h3 class="text-gray">网站监控ui定制</h3>
		<h4 class="text-gray-light">网站监控ui定制</h4>
		<h5 class="text-gray-lighter">网站监控ui定制</h5>
		<div class="rect-line">
			<div class="btn btn-success">按钮</div>
			<div class="btn btn-primary">按钮</div>
			<div class="btn btn-info">按钮</div>
			<div class="btn btn-warning">按钮</div>
			<div class="btn btn-danger">按钮</div>
		</div>
		<div class="rect-line">
			<div class="btn btn-success" disabled='disabled'>按钮</div>
			<div class="btn btn-primary" disabled='disabled'>按钮</div>
			<div class="btn btn-info" disabled='disabled'>按钮</div>
			<div class="btn btn-warning" disabled='disabled'>按钮</div>
			<div class="btn btn-danger" disabled='disabled'>按钮</div>
		</div>
		<div class="">
			<div class="btn btn-success btn-lg">按钮</div>
			<div class="btn btn-success">按钮</div>
			<div class="btn btn-success btn-sm">按钮</div>
			<div class="btn btn-success btn-xs">按钮</div>
		</div>
		<div class="rect-line">
			<div class="text text-success">文字颜色</div>
			<div class="text text-primary">文字颜色</div>
			<div class="text text-info">文字颜色</div>
			<div class="text text-warning">文字颜色</div>
			<div class="text text-danger">文字颜色</div>
		</div>
<!-- 		<div class="rect-line">
			<div class="rect bg-success"></div>
			<div class="rect bg-primary"></div>
			<div class="rect bg-info"></div>
			<div class="rect bg-warning"></div>
			<div class="rect bg-danger"></div>
		</div> -->
		<div class="rect-line">
			<div class="rect brand-success"></div>
			<div class="rect brand-primary"></div>
			<div class="rect brand-info"></div>
			<div class="rect brand-warning"></div>
			<div class="rect brand-danger"></div>
		</div>
		<div class="rect-line">
			<div class="rect brand-gray-darker"></div>
			<div class="rect brand-gray-dark"></div>
			<div class="rect brand-gray"></div>
			<div class="rect brand-gray-light"></div>
			<div class="rect brand-gray-lighter"></div>
		</div>
		<div style="width: 50%">
			<form class="form-horizontal">
			  <div class="form-group">
			    <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
			    <div class="col-sm-10">
			      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
			    </div>
			  </div>
			  <div class="form-group">
			    <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
			    <div class="col-sm-10">
			      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
			    </div>
			  </div>
			  <input type="checkbox" style="margin-left: 20px;">
			  <div class="input-group">
			  	<label for="">type1</label>
			  	<input type="radio" name="radio" checked>
			  </div>
			  <div class="input-group">
			  	<label for="">type2</label>
			  	<input type="radio" name="radio">
			  </div>
			  <div class="form-group">
			    <div class="col-sm-offset-2 col-sm-10">
			      <button type="submit" class="btn btn-info">提交</button>
			    </div>
			  </div>
			</form>
		</div>
		<div class="table-group">
			<div class="table-header">
				我是标题
			</div>
			<div class="table-body" style="height: 300px">
				
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'doc'
}
</script>
<style lang='less'>
	.doc{
		padding: 0 40px;
		.rect-line{
			margin: 20px 0;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-between;
			.text{
				text-align: center;
			}
			.rect{
				width: 100px;
				height: 100px;
			}
		}
	}
</style>
