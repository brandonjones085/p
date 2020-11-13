import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import * as bgHttp from "nativescript-background-http";
import { Post } from "./pup.model";
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';
import { Observable } from "@nativescript/core";






@Injectable({ providedIn: "root" })
export class PupService {
    private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

    public events: { eventTitle: string, eventData: any }[] = [];


  constructor(private http: HttpClient, private router: Router, private HttpClient: HttpClient) {}

 formData: any = new FormData();
    HttpUploadOptions = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data;" })
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(
      "http://35.165.251.254:4000/api/posts/" + id
    );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>("http://35.165.251.254:4000/api/posts")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath, 
              rates: post.rates
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  addPost(title: string, content: string, image: string) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append('image', image, title); 
    console.log(postData); 

    this.http
      .post<{ message: string; post: Post }>(
        "http://35.165.251.254:4000/api/posts",
        postData
      )
      .subscribe(responseData => {
        const post: Post = {
          id: responseData.post.id,
          title: title,
          content: content,
          imagePath: responseData.post.imagePath, 
          rates: 0
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
}


ratePup(id: string, title: string, content: string,  rates: number, image: string){

  let pupData = {
      id: id, 
      title: title, 
      content: content, 
      rates: rates, 
      image: image

  }
 //35.165.251.254:4000
  
  this.http.put("http://35.165.251.254:4000/api/rate/" + id, pupData)
  
  .subscribe(response=>{
    console.log(response)
   

  })
}


getP(){
  this.http.get<{message:string, posts:any}>("http://35.165.251.254:4000/api/rate")
  .pipe(map((postData)=>{
      
      return postData.posts.map(post=>{
          return{
              id: post._id, 
              title: post.title, 
              content: post.content, 
      
              imagePath: post.imagePath, 
              rates: post.rates
          
          }

   
      }); 
      
  }))
  .subscribe((transformedPosts)=>{
     this.posts = transformedPosts
     this.postsUpdated.next([...this.posts])
  
  })
    
  
}


  deletePost(postId: string) {
    this.http
      .delete("http://35.165.251.254:4000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}