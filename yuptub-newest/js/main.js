class API {  
  data;

  async getData(url) {  
      let dataToBeReturned = {};  
     await fetch(url).then( 
         (response) => {  
             return response.json();  
         }
     ).then((data) => {     
       dataToBeReturned = data.videos;   
     });
    return dataToBeReturned;
   
  }

  
}

class App {
  switcher;
  main;
  api;
  data;
  constructor() {
    this.api = new API();
    this.api.getData("../data/data.json").then((data) => {  
      this.data = data;
      this.switcher = new Switcher(this, data);
    }); 
}
}
  
  
class Switcher{
 yubtub;
 cleaner;
  app;
  data;
 default = 0;

 constructor(app,data ){
   this.app = app;
   this.data = data;
   
    this.yubtub = new Yubtub(this.app, this.data, this.data[0]);
    this.cleaner = new Cleaner();
 }
  

 switch(id){
    this.switch = new Switcher(this.app,  this.data[id]);

 }
}

class Cleaner{
    clean(whereToClean){
        document.querySelector(whereToClean).innerHTML = "";
    }
}

class Yubtub{
  aside;
  main;
  renderer;
  data;
  dataobject;
  app;
  constructor(yubtub, data, dataobject) {
    this.data = data;
    this.yubtub = yubtub;
    this.dataobject = dataobject;
    this.app = app;
    
      this.renderer = new Renderer();
      this.header = new Header(this, data);
      this.main = new Main(this, dataobject);
      this.aside = new Aside(this, data);
      //this.video = new Video(this, data);
    }
}

// class Renderer{
//     render(whereToRender, whatToRender){
//         document.querySelector(whereToRender).appendChild(whatToRender);
//     }
// }

class Header{
  htmlElement;
  textElement;
  iconElement;
  yubtub;
  
  constructor(yubtub,data){
    this.yubtub = yubtub;
    this.data = data;
    this.htmlElement = document.createElement("header");
    this.htmlElement.classList = "header";
    this.textElement = document.createElement("h2");
    this.textElement.innerHTML = "TWITCH";
    this.textElement.classList = "title__text";
    this.iconElement = document.createElement("i");
    this.iconElement.classList = "fa-brands fa-twitch";

    this.yubtub.renderer.render("body", this.htmlElement);
    this.yubtub.renderer.render("header",this.textElement);
    this.yubtub.renderer.render("h2",this.iconElement);
   
  }
}


class Main {
  yubtub;
  htmlElement;

  constructor(yubtub, dataobject) {
    this.yubtub = yubtub;
    this.dataobject = dataobject;
    this.htmlElement = document.createElement("main");
    this.htmlElement.classList = "main";
    this.yubtub.renderer.render("body", this.htmlElement);
    this.video = new Video(this, dataobject);
    
  }
}

class Video {
  yubtub;
  videoElement;

  constructor(main, dataobject) {
    this.main = main;
    this.dataobject = dataobject;
    console.log(dataobject)
    

    this.videoElement = document.createElement("video");
    this.videoElement.classList = "main__video";
    this.videoElement.src = "./videos/" + dataobject.video;
    this.videoElement.controls = true;
    this.main.yubtub.renderer.render("main", this.videoElement);
     this.videoElement.addEventListener("click", this.videoClicked);
  }

}

class Aside {
  yubtub;
  nextVideo;
  htmlElement;

  constructor(yubtub, data) {
    this.yubtub = yubtub;
    this.data = data;

    this.htmlElement = document.createElement("aside");
    this.htmlElement.classList = "aside__side";
    this.yubtub.renderer.render("main", this.htmlElement);
    this.nextVideo = new NextVideo(this, this.data);

  }
}

class NextVideo {
  aside;
  htmlElements;

  constructor(aside, data) {
    this.aside = aside;
    this.data = data;
    this.htmlElements = [];
    
    for (let i = 0; i < this.data.length; i++) {
      const videoElement = document.createElement("video");
      videoElement.src = "./videos/" + this.data[i].video;


      videoElement.classList = "aside_img";
      videoElement.controls = false;

      videoElement.addEventListener("mouseover", () => {
        videoElement.play();
      });

      videoElement.addEventListener("mouseout", () => {
        videoElement.pause();
        videoElement.currentTime = 0;
      });

      videoElement.addEventListener("click", () => {
        this.videoClicked(data[i]);
      }) 
      this.htmlElements.push(videoElement);
      this.aside.yubtub.renderer.render("aside", videoElement);
    }
  }

  videoClicked = (data) => {
    
    this.aside.yubtub.app.switcher.switch(data.link);
  };
}


const app = new App();
console.log(app);