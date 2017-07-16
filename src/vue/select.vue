<template>
<div id="content">
	<div id="select-project" class="container">
		<h1 class="text-center">Select an Option</h1>
		<button v-on:click="openProject" class="btn btn-primary btn-lg btn-block">Open Existing Project</button>
    <button v-on:click="newProject" class="btn btn-primary btn-lg btn-block">Import New Project</button>
    <button v-on:click="cancel" id="cancel-button" class="btn">Cancel</button>
	</div>
</div>
</template>

<script>
export default {
  name: 'select',
  data: {
    
  },
  methods: {
    openProject: (event) => {
      openProject()
    },
    newProject: (event) => {
      nextLoaderPage(0)
    },
    cancel: (event) => {
      returnToEditor()
    }
  }
}
</script>