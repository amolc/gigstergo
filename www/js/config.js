if (document.location.hostname == "localhost"){
	var base = window.location.origin;
    var baseURL = base +"/api/";
    var logoURL = base +"/housingadmin2/logos/";
} else {
	var baseURL="http://node.fountaintechies.com:7000/api/";
	var logoURL = "http://node.fountaintechies.com:7000/housingadmin2/logos/";
} 
