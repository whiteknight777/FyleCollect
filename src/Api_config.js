const API_URL = "http://31.207.34.70/fylecollect_api/web/app_dev.php/"
const LOCAL_URL = "http://localhost/API-REST/web/app_dev.php/"

export default config = {
    apiURL: API_URL,
    localURL: LOCAL_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + localStorage.token,
        // 'Access-Control-Allow-Origin': 'http://localhost:8000',
        // 'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Expose-Headers': FooBar,
    }
}