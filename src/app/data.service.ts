import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs';

import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  
constructor(private http: Http){}

changeMessage(brandnamer: string) {
    this.messageSource.next(brandnamer);
  }


getProducts(): Promise<any[]>{
    return this.http.get('http://localhost:3000/retrieve/')
                .toPromise()
                .then(response=> response.json().data)
                .catch(this.handleError)
}

getProduct(productname:string,productbrand:string): Promise<any[]>{
    

    return this.http.get('http://localhost:3000/productInfo/'+productbrand+'/'+productname)
                .toPromise()
                .then(response=> response.json().data)
                .catch(this.handleError)
}

getbrandProducts(item:string): Promise<any[]>{
    return this.http.get('http://localhost:3000/brandproducts/'+item)
                .toPromise()
                .then(response=> response.json().data)
                .catch(this.handleError)
}

getCollections(): Promise<any[]>{
    return this.http.get('http://localhost:3000/collections/')
                .toPromise()
                .then(response=> response.json().data)
                .catch(this.handleError)
}

sendData(name:string){
     this.messageSource.next(name);

}


insertItem(item :FormData):Promise<any[]>{

        
         return this.http.post('http://localhost:3000/insert/',item)
                .toPromise()
                .then(response => response)
                .catch(this.handleError)
}

insertAmazonItem(item):Promise<any[]>{

        
         return this.http.get('http://localhost:3000/addproduct/'+item)
                .toPromise()
                .then(response => response)
                .catch(this.handleError)
}
deleteproduct(productid):Promise<any[]>{
  
     return this.http.get('http://localhost:3000/deleteproduct/'+productid)
                .toPromise()
                .then(response=> response.json().data)
                .catch(this.handleError)
}

private handleError (error: any) : Promise<any>{
        console.error('An error occured',error);
        return Promise.reject(error.message||error);
}

}