
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const fulfilledBtn = document.querySelector('input[value="fulfilled"]');
const rejectedBtn = document.querySelector('input[value="rejected"]');
const createBtn = document.querySelector(".btn");
const form = document.querySelector(".form");

function handleSubmit(event) {
  event.preventDefault();
  event.target;

  const formData = new FormData(form);
  const delay = formData.get("delay"); 
  const state = formData.get("state");

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
  .then(message => {
    iziToast.show({
        class: "wave-stroke",  
        title: "OK",
        message: message,
        position: "topRight",
        closeOnEscape: true,
        closeOnClick: true,
        backgroundColor: "#59a10d",
    });
  })
  .catch(error => {
    iziToast.show({
        class: "wave-stroke",   
        title: "Error!",
        message: error,
        position: "topRight",
        closeOnEscape: true,
        closeOnClick: true,
        backgroundColor: "#ef4040",
    });
  });
}

form.addEventListener("submit", handleSubmit);