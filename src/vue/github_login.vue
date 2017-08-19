<template>
<div id="content" class="container">
  <h1>Login to GitHub</h1>
  <h3>Connect to incorporate GitHub features within Entryflow, such as your username.</h3>
  <h6>No data is stored from your login.</h6>
  <div id="form" class="form-inline">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" class="form-control" v-model="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" class="form-control" v-model="password">
    </div>
  </div>
  <button class="btn btn-default" v-on:click="login">Login</button> 
</div>
</template>

<script>
import github_login from './github_login'
import editor from './editor'

export default {
  name: 'github',
  data: {
    username: '',
    password: ''
  },
  methods: {
    login: (e) => {
      github.authenticate({
        type: "basic",
        username: 'Sergix',
        password: '7wcrqowe1Ks'
      });

      github.authorization.create({
        scopes: ["user", "public_repo", "repo", "repo:status"],
        note: "Allows Entryflow to access your project information and username for their incorporation into the application.",
        note_url: "https://sergix.github.io",
        }, function(err, res) {
          if (err)
            console.log(err)

          if (res.token) {
            editor.data.project.oauth_token = res.token
            exportAppData()
          }
      })
    }
  }
}
</script>