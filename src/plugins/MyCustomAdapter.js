import axios from 'axios';
require("dotenv").config();

export class MyCustomAdapter{
  constructor(loader){
    this.loader = loader;
  }

  upload(){
    return this.loader.file.then(uploadedFile => {
        return new Promise( (resolve,reject) => {
         const data = new FormData();
         data.append('file',uploadedFile);
         data.append('api_key',process.env.REACT_APP_CLOUDINARY_API_KEY);
      //get timestamp and signature
      //from the server and add to data
       axios.get('/api/cloud/sign').then(res => {
        let { timestamp,
              signature,
              upload_preset
             } = res.data;

          data.append("timestamp",timestamp);
          data.append("upload_preset",upload_preset);
          data.append("signature",signature);

      axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,data)
         .then(res => {
           resolve({
            default : res.data.secure_url
           });
         }).catch(err => {
            reject("Unable to upload file");
         });
       }).catch(err => {
          reject('Unable to upload file');
       });

/*
            axios({
                url : `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                method : 'post',
                data,
                headers : {
                    'Content-Type' : 'multipart/form-data'
                },
                withCredentials : false
            })
                .then(res => {
                        resolve({
                            default : res.data.secure_url
                        })
                })
                .catch(err => {
                    reject("Unable to upload file");
                });
*/

        });
    });
   }


  abort(){
   //return the rejected promise from the upload method
   return this.upload.catch(err => err);
  }

}



