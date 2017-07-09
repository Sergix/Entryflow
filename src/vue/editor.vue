<template>
    <textarea :value="input"></textarea>
</template>

<script>
export default {
  name: 'editor',
  data: {
      input: "Open a project file to display here"
  }
}
</script>
