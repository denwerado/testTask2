//Подключение фреймворка vue: npm i -s vue 
const Vue= require("vue");

//Подключение работы прогресс бара: npm install progressbar.js
const ProgressBar = require('progressbar.js');


const vm = new Vue({
   el: '#app',
   data:{

   },
   methods:{
      overDescription(event){
         let mainLocArr = document.querySelectorAll('.main__location');
         let mainDescArr = document.querySelectorAll('.main__description');
         mainLocArr.forEach((element,index)=>{
            if(element == event.target){
               mainDescArr[index].classList.remove('animate__animated');
               mainDescArr[index].classList.remove('animate__fadeOutDown');
               mainDescArr[index].style.display = 'block';
               mainDescArr[index].classList.add('animate__animated');
               mainDescArr[index].classList.add('animate__fadeInUp');
            }
         })
      },

      outDescription(event){
         let mainLocArr = document.querySelectorAll('.main__location');
         let mainDescArr = document.querySelectorAll('.main__description');
         mainLocArr.forEach((element,index)=>{
            if(element == event.target){
               mainDescArr[index].classList.remove('animate__animated');
               mainDescArr[index].classList.remove('animate__fadeInUp');
               mainDescArr[index].classList.add('animate__animated');
               mainDescArr[index].classList.add('animate__fadeOutDown');
               setTimeout(()=>{
                  mainDescArr[index].style.display = 'none'
               },800)
            }
         })
      }
   },
   created(){
      let mainDescArr = document.querySelectorAll('.main__description');
      mainDescArr.forEach((element)=>{
         element.style.display = 'none';
      });
   },
   mounted(){

      //Работа с прогресс баром вокруг стрелки
      let element = document.querySelector('.main__arrow-right')
      var bar = new ProgressBar.Circle(element, {
         strokeWidth: 1,
         easing: 'easeInOut',
         duration: 5000,
         color: 'rgba(255,255 ,255 ,1 )',
         trailColor: 'rgba(255,255 ,255 ,0.3 )',
         trailWidth: 1,
         svgStyle: null
      });

      bar.animate(1);

      setInterval(function() {
         bar.set(0);
         bar.animate(1);
      }, 5000);
   }
});
