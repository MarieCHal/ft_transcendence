<template>
    <button class="glow-button">
        <div class="gradient"></div>
        <span class="span">
            submit 
        </span>
    </button>
</template>

<!--if (this.Code.length === 4){
  axios.post("http://c1r2s3:3000/auth/code", data,{
    responseType: 'blob'
  }).then((response) => {
    var accessToken = response.data.access_token;
    var avatar = response.data.loginUser.Avatar;
    var firstname = response.data.loginUser.Firstname;
    var lastname = response.data.loginUser.Lastname;
    var nickname = response.data.loginUser.Nickname;
    var email = response.data.loginUser.Email;
    var password = response.data.loginUser.Password;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('Avatar', avatar);
    localStorage.setItem('Firstname', firstname);
    localStorage.setItem('Lastname', lastname);
    localStorage.setItem('Nickname', nickname);
    localStorage.setItem('Email', email);
    localStorage.setItem('Password', password);
    console.log(accessToken);
    console.log(localStorage.getItem('accessToken'))
    this.$router.push("/main")
  }).catch((error) => {
  this.MessageError = error.response.data.message ;
  this.StatusCode = true;
})
  }-->