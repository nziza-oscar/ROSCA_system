import { jwtDecode } from "jwt-decode"

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined" || sessionStorage.getItem('nihemart_token') == 'undefined')
      return false

    if (sessionStorage.getItem('nihemart_token')){
      return true
    }else{
      return false
    }
  },
  token(){
    if (typeof window == "undefined" || sessionStorage.getItem('nihemart_token') == 'undefined')
      return false
    if (sessionStorage.getItem('nihemart_token')){
       return sessionStorage.getItem("nihemart_token")
    }
    return false
  },
  userInfo(){
    if (typeof window == "undefined")
    return false

    if (!this.isAuthenticated()) return false;
        const userId = jwtDecode(this.token()).id
        return userId      
  },
}
export default auth;