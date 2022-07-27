//For hamburger nav bar
var hamburger = document.querySelector(".hamburger");
var nav = document.querySelector("nav");
hamburger.addEventListener('click', ()=> {
    nav.classList.toggle("open");
})

//For intro
var basketballButton = document.querySelectorAll(".equipmentscontainer .equipmentbox")[0];
var backboardButton = document.querySelectorAll(".equipmentscontainer .equipmentbox")[1];
var courtButton = document.querySelectorAll(".equipmentscontainer .equipmentbox")[2];
basketballButton.addEventListener('click', ()=> {
    var names = document.querySelectorAll(".equipmentscontainer p");
    for (let i=0; i < names.length; i++) {
        if (i == 0) {
            names[i].classList.add("bold");
        }
        else {
            names[i].classList.remove("bold");
        }
    }
    names[0].innerHTML = "Basketball";
    var desc = document.querySelector(".introtextbox2");
    desc.innerHTML = "The basketball is a spherical ball used in basketball games. Basketballs have different sizes that are meant for different age groups, like size 7 for men and boys who are at least 15 years old. Most basketballs have an inflatable rubber bladder inside of them, and a small opening to pump air in the bladder or release air out of it, to increase or decrease the pressure of the ball. The basketball has to be thrown into the basket for teams to score points."

})
backboardButton.addEventListener('click', ()=> {
    var names = document.querySelectorAll(".equipmentscontainer p");
    for (let i=0; i < names.length; i++) {
        if (i == 1) {
            names[i].classList.add("bold");
        }
        else {
            names[i].classList.remove("bold");
        }
    }
    names[1].innerHTML = "Backboard";
    var desc = document.querySelector(".introtextbox2");
    desc.innerHTML = "The backboard is a raised vertical rectangular board, with an attached basket consisting of a net suspended from a circular hoop. The backboard can be made out of many materials, but usually it is made out Plexiglass, which has the properties of safety glass when shattered. The hoop is where the players must put the basketball in to score points, and the backboard helps a shooter determine the proper aim for either a layup or distance shot."
})
courtButton.addEventListener('click', ()=> {
    var names = document.querySelectorAll(".equipmentscontainer p");
    for (let i=0; i < names.length; i++) {
        if (i == 2) {
            names[i].classList.add("bold");
        }
        else {
            names[i].classList.remove("bold");
        }
    }
    names[2].innerHTML = "Court";
    var desc = document.querySelector(".introtextbox2");
    desc.innerHTML = "The basketball court is a flat, rectangular surface with baskets attached to backboards at opposite ends. Basketball courts have the half-court line, which separates the two halves of the court, the three-point arc at both baskets, which separates the area outside the arc, where baskets are worth 3 points, from the area within the arc, where baskets are worth 2 points, and the free-throw line, where one stands while taking a foul shot."
})