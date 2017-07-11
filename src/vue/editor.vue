<template>
    <textarea :value="input"></textarea>
</template>

<script>
export default {
  name: 'editor',
  data: {
      project_dir: '',
      input: "Open a project file to display here"
  }
}
</script>
