 this.axios
     .post("http://localhost:8000/api/checkuser", data, {
         headers: {
             "Content-type": "application/x-www-form-urlencoded"
         }
     })
     .then(response => {
         console.log(response.data);
     });

 this.axios
     .get("http://localhost:8000/api/checkuser/" + this.username, {
         headers: {
             "Content-type": "application/x-www-form-urlencoded"
         }
     })
     .then(response => {
         console.log(response.data);
     });