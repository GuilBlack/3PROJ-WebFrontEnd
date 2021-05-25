const AUTH_USER = 'auth-user';

// function to get a specific cookie from the browser by name
const getCookie = name => {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements and compare the cookie name
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        if(name === cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}

// boolean to know if the user is authenticated
export const isLoggedIn = () => {
    return getCookie(AUTH_USER) ? true : false;
}