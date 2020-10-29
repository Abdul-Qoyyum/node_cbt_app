import axios from 'axios';

export class MyCustomAdapter{
  constructor(loader){
    this.loader = loader;
  }

  upload(){
    let data = new FormData();
    data.append('file',this.loader.file);

    return axios.post('/api/ques/img/save',data)
           .then(res => {
             console.log(res);
             return res.data;
           })
           .catch(err => {
            console.log(err);
            return err;
          });
   }


  abort(){
   //return the rejected promise from the upload method
   return this.upload.catch(err => err);
  }

}



