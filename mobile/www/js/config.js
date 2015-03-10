
	var baseURL="http://node.fountaintechies.com:7000/api/";
	//var baseURL="http://localhost:7000/api/";
	var profileUrl = "http://node.fountaintechies.com:7000/profile/";
 
 
 //typeof device
 
if(  document.location.hostname == '192.168.1.3' || document.location.hostname == '192.168.0.101' ){
      device = {
        uuid : 1,
        platform : 'web'
    }
    window.localStorage.setItem("token_id", 0 );
   }