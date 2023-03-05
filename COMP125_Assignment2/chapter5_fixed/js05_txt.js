"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Wilson Yang
      Date:   March 3 2023

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = "My Western Vacation"; 
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);

   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
      let indexCount = i;
   }

   let favBox = document.createElement("div");
   favBox.id = "favBox";
   galleryBox.appendChild(favBox);

   let favList = document.createElement('ul');
   favList.id = "favList";
   favBox.appendChild(favList);

   let favListTitle = document.createElement("h1");
   favListTitle.id = "favListTitle";
   let favTitle = "My Favourite Images List";
   favListTitle.textContent = favTitle;
   favList.appendChild(favListTitle);

   let images = [];



   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
    
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
    
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
    
      let favLinkButton = document.createElement("button");
      favLinkButton.innerHTML = "Add to Favourites List";
      favLinkButton.id = "fav-link-button";
      figureCaption.appendChild(favLinkButton);
    
      favLinkButton.addEventListener("click", () => {
        if (images.length > 3) {
          alert("You can only add up to 5 images to the favourites list.");
        }
    
        let favImage = document.createElement("img");
        favImage.src = modalImage.src;
        let favList = document.getElementById("favList");
        let listItem = document.createElement("li");
        listItem.id = "listItem";
        listItem.classList.add("favItem");
        listItem.dataset.index = images.length;
        listItem.appendChild(favImage);
    
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Remove This Image From Your Favourites";
        deleteButton.classList.add("deleteButton");
        deleteButton.onclick = function () {
          let itemIndex = parseInt(listItem.dataset.index);
          images.splice(itemIndex, 1);
          listItem.parentNode.removeChild(listItem);
          updateFavList();
        };
    
        listItem.appendChild(deleteButton);
        favList.appendChild(listItem);
        images.push(favImage);
    
        updateFavouritesList();
      });
    
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function () {
        document.body.removeChild(modalWindow);
      };
    
      modalWindow.appendChild(closeBox);
    
      document.body.appendChild(modalWindow);
    }

    function updateFavList() {
      let listItems = document.querySelectorAll("#favList .favItem");
      listItems.forEach((item, index) => {
        item.dataset.index = index;
      });
    }
}
