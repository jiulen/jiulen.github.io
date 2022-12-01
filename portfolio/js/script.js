//For hamburger nav bar
let hamburger = document.querySelector(".hamburger");
hamburger.addEventListener('click', ()=> {
    let nav = document.querySelector("nav");
    nav.classList.toggle("open"); //Open or close nav bar
})

//For intro
if ( document.URL.includes("intro.html") ) {
    //Choose which equipment to see info
    let basketballButton = document.querySelectorAll(".equipmentscontainer .equipmentbox")[0];
    let backboardButton = document.querySelectorAll(".equipmentscontainer .equipmentbox")[1];
    let courtButton = document.querySelectorAll(".equipmentscontainer .equipmentbox")[2];
    basketballButton.addEventListener('click', ()=> {
        let names = document.querySelectorAll(".equipmentscontainer p");
        for (let i=0; i < names.length; i++) {
            if (i == 0) {
                names[i].classList.add("bold"); //Bold text of selected icon
            }
            else {
                names[i].classList.remove("bold"); //Unbold text of not selected icons
            }
        }
        names[0].innerHTML = "Basketball"; //Reveal name if not revealed
        let desc = document.querySelector(".introtextbox2");
        desc.innerHTML = "The basketball is a spherical ball used in basketball games. Basketballs have different sizes that are meant for different age groups, like size 7 for men and boys who are at least 15 years old. Most basketballs have an inflatable rubber bladder inside of them, and a small opening to pump air in the bladder or release air out of it, to increase or decrease the pressure of the ball. The basketball has to be thrown into the basket for teams to score points."

    })
    backboardButton.addEventListener('click', ()=> {
        let names = document.querySelectorAll(".equipmentscontainer p");
        for (let i=0; i < names.length; i++) {
            if (i == 1) {
                names[i].classList.add("bold"); //Bold text of selected icon
            }
            else {
                names[i].classList.remove("bold"); //Unbold text of not selected icons
            }
        }
        names[1].innerHTML = "Backboard"; //Reveal name if not revealed
        let desc = document.querySelector(".introtextbox2");
        desc.innerHTML = "The backboard is a raised vertical rectangular board, with an attached basket consisting of a net suspended from a circular hoop. The backboard can be made out of many materials, but usually it is made out Plexiglass, which has the properties of safety glass when shattered. The hoop is where the players must put the basketball in to score points, and the backboard helps a shooter determine the proper aim for either a layup or distance shot."
    })
    courtButton.addEventListener('click', ()=> {
        let names = document.querySelectorAll(".equipmentscontainer p");
        for (let i=0; i < names.length; i++) {
            if (i == 2) {
                names[i].classList.add("bold"); //Bold text of selected icon
            }
            else {
                names[i].classList.remove("bold"); //Unbold text of not selected icons
            }
        }
        names[2].innerHTML = "Court"; //Reveal name if not revealed
        let desc = document.querySelector(".introtextbox2");
        desc.innerHTML = "The basketball court is a flat, rectangular surface with baskets attached to backboards at opposite ends. Basketball courts have the half-court line, which separates the two halves of the court, the three-point arc at both baskets, which separates the area outside the arc, where baskets are worth 3 points, from the area within the arc, where baskets are worth 2 points, and the free-throw line, where one stands while taking a foul shot."
    })
}
//For skills
if ( document.URL.includes("skills.html") ) {
    let flipCards = document.querySelectorAll(".flip-card");
    for (let i=0; i<3; ++i) {
        flipCards[i].addEventListener('click', ()=> {
            flipCards[i].classList.toggle("selected"); //Flip cards
        });
    }
    //For minigame
    let score = 0;
    let highscore = 0;

    let textScore = document.querySelector(".score");
    let textHighScore = document.querySelector(".highscore");

    textScore.innerHTML = parseInt(score, 10);

    if (typeof(Storage) !== "undefined") { //Check if browser support web storage
        if (sessionStorage.getItem("highscore")) { //Already have highscore
            textHighScore.innerHTML = sessionStorage.getItem("highscore"); //set value to stored high score
            highscore = parseInt(textHighScore.innerHTML, 10); //10 is to ensure base 10
        }
        else {
            //Init and store highscore
            sessionStorage.setItem("highscore", "0");
            textHighScore.innerHTML = sessionStorage.getItem("highscore"); //set value to stored high score
            highscore = parseInt(textHighScore.innerHTML, 10);
        }
    }

    let ball = document.querySelector(".basketball");
    let hoop = document.querySelector(".hoop");

    var audio = new Audio("audio/swish.mp3"); //Swish sound effect

    //Shoot basketball
    let shot = false;

    //Basketball animation
    let shootTimer;
    let up = true; //going up or down
    let sound = false;
    function startShoot() {
        if (!shootTimer) {
            shootTimer = setInterval(animateShoot, 10); //Every 0.01s
        }        
    }
    function stopShoot() {
        clearInterval(shootTimer);
        shootTimer = null; // clear
        
        ball.style.top = "0px"; //Reset ball position
        startStrafe(); //Start moving sideways again
    }
    function animateShoot() { //For shooting        
        let ballBounds = ball.getBoundingClientRect();
        let hoopBounds = hoop.getBoundingClientRect();
        if (up) {
            if (ballBounds.bottom < hoopBounds.top - 50) {
                up = false;
                ball.classList.add("down");
            }
        }
        else {
            if (ballBounds.bottom > hoopBounds.top && //Check if bottom of ball touching hoop
             ( (ballBounds.left < hoopBounds.left && ballBounds.right > hoopBounds.left) || //Check if ball touching left of hoop, but not completely inside hoop
               (ballBounds.left < hoopBounds.right && ballBounds.right > hoopBounds.right) )) { //Check if ball touching right of hoop, but not completely inside hoop
                //Player missed
                up = true;
                shot = false;
                sound = false;
                ball.classList.remove("down");
                stopShoot();

                score = 0; //Reset streak
                textScore.innerHTML = parseInt(score, 10); //Update streak
            }
            else if (ballBounds.top > hoopBounds.bottom) {
                //Player scored
                up = true;
                shot = false;
                sound = false;
                ball.classList.remove("down");
                stopShoot();

                ++score; //Add to streak
                textScore.innerHTML = parseInt(score, 10); //Update streak
                if (score > highscore) { //If score > highscore then update highscore
                    highscore = score;
                    sessionStorage.setItem("highscore", highscore); //Update highscore in session storage
                    textHighScore.innerHTML = sessionStorage.getItem("highscore"); //set value to stored high score
                }          
            }            
            else if (ballBounds.bottom > hoopBounds.top && //Check if top of ball touching hoop
                     ballBounds.left > hoopBounds.left && ballBounds.right < hoopBounds.right) { //Ball within hoop width
                //Player will score
                if (!sound) {
                    audio.pause();
                    audio.src = audio.src;
                    audio.play();
                    sound = true;
                }                
            }
        }

        if (shot) {
            let posT = parseInt(ball.style.top);
            let newT = 0;
            if (up) {
                newT = -5; //Move up
            }
            else {
                newT = 7.5; //Move down (faster than up)
            }
            if (!isNaN(posT)) {
              newT += posT;
            }    
            ball.style.top = newT + "px";
        }
    }

    let strafeTimer;
    let right = true; //Moving right or left
    function startStrafe() { //For moving sideways (before shoot)
        if (!strafeTimer) {
            strafeTimer = setInterval(animateStrafe, 10); //Every 0.01s
        } 
    }
    function stopStrafe() {
        clearInterval(strafeTimer);
        strafeTimer = null; // clear
    }
    function animateStrafe() {
        let ballBounds = ball.getBoundingClientRect();
        if (right) {
            if (parseInt(ball.style.left, 10) > ballBounds.width) { //Check if moved past its width on right side
                right = false;
            }
        }
        else {
            if (parseInt(ball.style.left, 10) < -ballBounds.width) { //Check if moved past its width on left side
                right = true;
            }
        }

        let posL = parseInt(ball.style.left, 10);
        let newL = 0;
        if (right) {
            newL = 3; //Move right
        }
        else {
            newL = -3; //Move left
        }
        if (!isNaN(posL)) {
            newL += posL;
        }    
        ball.style.left = newL + "px";
    }

    startStrafe(); //Start moving left and right
    //Shoot the ball
    ball.addEventListener('click', ()=> {
        if (!shot) {
            shot = true;
            startShoot(); //Start shooting
            stopStrafe(); //Stop moving sideways while shooting
        }
    });    

}
//For players
if ( document.URL.includes("player.html") ) {
    let arrows = document.querySelectorAll(".playercontainer2a > img");
    let imgfig = document.querySelector(".imgslider figure");

    let curPic = 2; //5 pics, pic 1 and 5 duplicates

    arrows[0].addEventListener('click', ()=> {
        imgfig.classList.add("slide"); //Add back sliding, if removed
        switch (curPic)
        {
            case 2:
                imgfig.style.left = "0%"; //First to third pic
                curPic = 1;
                break;
            case 3:
                imgfig.style.left = "-100%"; //Second to first pic
                curPic = 2;
                break;
            case 4:
                imgfig.style.left = "-200%"; //Third to second pic
                curPic = 3;
                break;
        }        
    });
    arrows[1].addEventListener('click', ()=> {        
        imgfig.classList.add("slide"); //Add back sliding, if removed
        switch (curPic)
        {
            case 2:
                imgfig.style.left = "-200%"; //First to second pic
                curPic = 3;
                break;
            case 3:
                imgfig.style.left = "-300%"; //Second to third pic
                curPic = 4;
                break;
            case 4:
                imgfig.style.left = "-400%"; //Third to first pic
                curPic = 5;
                break;
        }        
    });

    imgfig.addEventListener('transitionend', ()=> { //For transitioning between edges (First to third/third to first)
        if (curPic == 5) { //Pic 5 (First pic) to Pic 2 (Also first pic)
            curPic = 2;
            imgfig.classList.remove("slide"); //Remove sliding when swapping pics
            imgfig.style.left = "-100%";
        }
        else if (curPic == 1) { //Pic 1 (third pic) to Pic 4 (Also third pic)
            curPic = 4;
            imgfig.classList.remove("slide"); //Remove sliding when swapping pics
            imgfig.style.left = "-300%";
        }
    });
}