<template>
<div id="content" class="container">
  <div id="open" class="active container">
    <h1 class="row">Select Existing Project</h1>
    <ul id="select-list" class="form-horizontal">
      <li class="form-group row" v-for="project in projects" v-bind:key="project">
        <a id="test" v-on:click="openProject" href="#" class="col-sm-1"><i data-feather="download"></i></a>
        <span class="col-sm-3">{{ project.project_name }}</span>
        <div class="col-sm-7">
          <input disabled class="form-control" type="text" :value="project.doc_path">
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data: {
    projects: []
  },
  methods: {
    openProject: (event) => {
      let project_name = event.path[2].childNodes[2].innerText
      jsonData.open_project = project_name
      exportAppData()
      checkAppData()
    }
  }
}
</script>
