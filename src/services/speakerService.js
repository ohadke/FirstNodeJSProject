const { resolve } = require("path/posix");
const axios = require ('axios');// axios make the http calls for us
const { response } = require("express");

function speakerService(){
    function getSpeakerById(id){
        //calling a third party api and return a data async
        return new Promise((resolve, reject)=>{
            axios
            .get('http://localhost:3000/speakers/'+id)
            .then((response)=>{
                // return from the http request a promis which is response , then we going to resolve the response (what we want to pass through)
                resolve(response);
        })
        .catch((error)=>{
            reject(error);
        });
    })
}
    return {getSpeakerById}
}
module.exports= speakerService();