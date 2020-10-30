import axios from 'axios';

export class MyCustomAdapter{
  constructor(loader){
    this.loader = loader;
  }

  upload(){
    return this.loader.file.then(uploadedFile => {
        return new Promise( (resolve,reject) => {
            const data = new FormData();
            data.append('upload',uploadedFile);
            console.log(`Data : ${JSON.stringify(data)}`);
            axios({
                url : '/api/ques/img/save',
                method : 'post',
                data,
                headers : {
                    'Content-type' : 'multipart/form-data'
                },
                withCredentials : false
            })
                .then(res => {
                    console.log(res);
                    if(res.data.result === 'success'){
                        resolve({
                            default : res.data.url
                        })
                    }else{
                        reject(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                    reject("Unable to upload file");
                });

        });
    });
   }


  abort(){
   //return the rejected promise from the upload method
   return this.upload.catch(err => err);
  }

}



