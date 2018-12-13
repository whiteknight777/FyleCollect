const apiDevDomain = "http://31.207.34.70/fylecollect_api_dev/web/app_dev.php/";
const apiTestDomain =
  "http://31.207.34.70/fylecollect_api_test/web/app_dev.php/";
const localDomain = "http://localhost/API-REST/web/app_dev.php/";
const prodDomain = "http://31.207.34.70/fylecollect_api_prod/web/app_dev.php/";

let config = {
  baseURL: prodDomain,
  headers: {
    Content_type: "application/json",
    Authorization: "Bearer " + localStorage.token
    // 'Access-Control-Allow-Origin': 'http://localhost:8000',
    // 'Access-Control-Allow-Credentials': true,
    // 'Access-Control-Expose-Headers': FooBar,
  }
};

export default config;