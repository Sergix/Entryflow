<template>
<div id="content">
	<div id="settings">
		<div class="col-sm-12">
			<button id="button-back" class="btn btn-default" v-on:click="back">Back</button>
			<h1 class="text-right">Settings</h1>
		</div>
		<h5 class="col-sm-12 text-right">Changes are automatically saved.</h5>
		<div id="form" class="form">
			<div class="form-group row">
				<label for="project_name" class="col-sm-2 control-label">Project Name</label>
				<input id="project_name" class="col-sm-6 form-control" type="text" v-model="project.project_name">
			</div>
			<div class="form-group row">
				<label for="docfile" class="col-sm-2 control-label">Documentation File</label>
				<input disabled id="docfile" class="col-sm-6 form-control" :value="docfile" type="text">
				<button class="col-sm-2 btn btn-default" v-on:click="selectFile" type="button">Browse</button>
			</div>
			<div class="form-group row">
				<label for="docpath" class="col-sm-2 control-label">Documentation Path</label>
				<input disabled id="docpath" class="col-sm-6 form-control" :value="docpath" type="text">
				<button class="col-sm-2 btn btn-default" v-on:click="selectPath" type="button">Browse</button>
			</div>
			<div class="form-group row">
				<label for="changelogfile" class="col-sm-2 control-label">Changelog File</label>
				<input disabled id="changelogfile" class="col-sm-6 form-control" :value="changelogfile" type="text">
				<button class="col-sm-2 btn btn-default" v-on:click="selectPath" type="button">Browse</button>
			</div>
			<div class="form-group row">
				<label for="changelogpath" class="col-sm-2 control-label">Changelog Path</label>
				<input disabled id="changelogpath" class="col-sm-6 form-control" :value="changelogpath" type="text">
				<button class="col-sm-2 btn btn-default" v-on:click="selectPath" type="button">Browse</button>
			</div>
			<div class="form-group">
				<label for="header_format" class="control-label">
					Entry header format (%d = day, %m = month, %y = year, %h = hour, %hm = hour (24-hour format), %mi = minute, %s = second, %e = entry number, %v = project version, %u = user name)
				</label>
				<textarea id="header_format" class="col-sm-12" v-model="project.header_format" type="text"></textarea>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'settings',
	data: {
		project: {}
	},
	methods: {
		back: (e) => {
			returnToEditor()
		}
	}
}
</script>