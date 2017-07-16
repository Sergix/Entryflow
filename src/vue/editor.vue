<template>
<div id="content">
        <textarea id="file-editor" :value="input"></textarea>
</div>
</template>

<script>
export default {
  name: 'editor',
  data: {
      project: '',
      input: "Open a project file to display here"
  }
}
</script>
