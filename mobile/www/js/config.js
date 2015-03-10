
	var baseURL="http://node.fountaintechies.com:7000/api/";
	//var baseURL="http://localhost:7000/api/";
	var profileUrl = "http://node.fountaintechies.com:7000/profile/";
 
if( typeof device ){
      device = {
        uuid : 1,
        platform : 'web'
    }
    window.localStorage.setItem("token_id", 0 );
   }