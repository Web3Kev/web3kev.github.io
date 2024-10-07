import { playMessageSound, playChoiceSound, playThreeClickSound,playTextSound, stopTextSound, playToggleSound} from './audio.js';

let interval;
let playing;
let allListeners=[];

const availableGames= ["snake", "breakout"];

function addListener(eventType, callback) {
    document.addEventListener(eventType, callback);
    allListeners.push({ eventType, callback });
}


function openMiniGame(name="snake") {
    
     // Create modal
     const modal = document.getElementById("modal");
     modal.style.display='block';

     const modalcontent = document.querySelector(".modal-content");

     // Create canvas for the snake game
     const canvas = document.createElement("canvas");
     canvas.id = "snakeCanvas";

     const canvasWrapper = document.createElement("div");
     canvasWrapper.className = `canvas-wrapper`;
     canvasWrapper.appendChild(canvas);

     const messageBox = document.createElement("div");
     messageBox.id = "gameMessage";
    //  canvasWrapper.appendChild(messageBox);

     // Append canvas to modal content
     modalcontent.appendChild(canvasWrapper);

     // Add close button
     const closeButton =document.getElementsByClassName("close")[0];

     playing=true;

     let selectedGame;
     if(name==="snake")
     {
        selectedGame= () => resizeSnake(canvas, messageBox);
     }
     else if(name="breakout")
     {
        selectedGame= () => resizeBreak(canvas, messageBox);
     }
     else
     {
        selectedGame= () => resizeSnake(canvas, messageBox);
     }
     
    //  // Resize canvas to fit modal
    //  resizeSnake(canvas, modalcontent);
    selectedGame();

    //  // Handle window resize to adjust the canvas dynamically
    //  window.addEventListener("resize", () => resizeSnake(canvas, modalcontent));
    window.addEventListener("resize", selectedGame);

     closeButton.onclick = closeModal;

     // Handle click outside of the modal content to close it
     window.onclick = (event) => {
         if (event.target === modal) {
             closeModal();
         }
     };
 
     function closeModal() {
        playing = false;
        clearInterval(interval);
        //  window.removeEventListener("resize", resizeSnake);
        window.removeEventListener("resize", selectedGame);

        for(let i=0; i<allListeners.length; i++)
        {
            document.removeEventListener(allListeners[i].eventType, allListeners[i].callback);
        }
        stopTextSound();
        allListeners = [];

        modalcontent.removeChild(canvasWrapper);
        modal.style.display = 'none';
     }
  }

  function resizeSnake(canvas, message) {
    if(!playing){return;}

    console.log("Game starts");
    const isDarkMode = document.body.classList.contains('dark-mode');

    let tier = window.innerWidth>=700?1:2;

    if(tier===1)
    {
        canvas.width =480;
        canvas.height = 480;
    }
    else
    {
        canvas.width =300;
        canvas.height = 300;
    }

    let score = 0;

    if(interval){clearInterval(interval);} //reset game

    const ctx = canvas.getContext("2d");
    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 0, y: 0 };
    
    let gridSize = tier==1?20:10;

    let world = { 
        w: Math.floor(canvas.width/gridSize), 
        h: Math.floor(canvas.height/gridSize) 
    };

    // message.innerHtml = "Use keyboard arrows to move around<br><br>On touch device, swipe up, down, left or right";

    console.log(`width: ${world} height:${world}`);

    let food = { 
        x: Math.floor(Math.random() * (world.w-1))+1, 
        y: Math.floor(Math.random() * (world.h-1))-1 
    };

    let gameover=false;


    function gameLoop() {

        // Move snake
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        // Check if snake eats the food
        if (head.x === food.x && head.y === food.y) {
            score+=10;
            food = {
                 x: Math.floor(Math.random() * (world.w-1))+1, 
                 y: Math.floor(Math.random() * (world.h-1))+1 
            };
            playChoiceSound();
        } else {
            snake.pop();

            if (direction.y === 0 && direction.y === 0)
            {
            }
            else
            {
                playTextSound();
            }
            
        }

        // Check for collisions
        if (head.x < 0 || head.x >= (world.w) || head.y <0  || head.y >= (world.h) || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            gameover=true;
            playMessageSound();
        }
        

        // clear everything
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //playzone
        ctx.fillStyle = isDarkMode?"black":"white";//#222224
        ctx.fillRect(0, 0, (world.w*gridSize),(world.h*gridSize)); //canvas
        
        //text
        if(tier===1)
            {
                ctx.fillStyle = "teal";  // Set the fill color for the text
                ctx.font = "40px Arial";  // Set the font size and family
                ctx.fillText(`SNAKE`, gridSize, 50); //(world.h*gridSize)
                ctx.fillStyle = "red";  // Set the fill color for the text
                ctx.font = "30px Arial";  
                ctx.fillText(`${score}`, world.w*gridSize-(4*gridSize), 40);
                ctx.fillStyle = isDarkMode?"darkgray":"lightgray";
                ctx.font = "20px Arial"; 
                ctx.fillText(`use arrows on a keyboard`, gridSize, 80);  
                ctx.fillText(`swipe up left right down`, gridSize, 100);  
            }
            else
            {
                ctx.fillStyle = "teal";  // Set the fill color for the text
                ctx.font = "20px Arial";  // Set the font size and family
                ctx.fillText(`SNAKE`, gridSize, 20); //(world.h*gridSize)
                ctx.fillStyle = "red";  // Set the fill color for the text
                ctx.font = "15px Arial";  
                ctx.fillText(`${score}`, world.w*gridSize-(4*gridSize), 17);
                ctx.fillStyle = isDarkMode?"darkgray":"lightgray";
                ctx.font = "15px Arial"; 
                ctx.fillText(`use arrows on a keyboard`, gridSize, 40);  
                ctx.fillText(`swipe up left right down`, gridSize, 55);  
            }

        //snake
        ctx.fillStyle = "orange";
        for(let i=0; i<snake.length;i++)
        {
            if(i===0 )
            {
                //draw head only if not gameover
                if(!gameover)
                {ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);}
            }
            else
            {
                ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
            }
        }
        
        //food
        ctx.fillStyle = isDarkMode?"#dc09a1":"teal";
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);


        if(gameover){

            if(tier===1)
            {
                ctx.fillStyle = "teal";  // Set the fill color for the text
                ctx.font = "50px Arial";  // Set the font size and family
                ctx.fillText(`GAME OVER`, (world.w*gridSize)/6, (world.h*gridSize)-100); 
                ctx.fillStyle = "red"; 
                ctx.font = "30px Arial";  
                ctx.fillText(`your score: ${score}`, (world.w*gridSize)/4, (world.h*gridSize)-50);
                
            }
            else
            {
                ctx.fillStyle = "teal";  // Set the fill color for the text
                ctx.font = "30px Arial";  // Set the font size and family
                ctx.fillText(`GAME OVER`, (world.w*gridSize)/6, (world.h*gridSize)-40); 
                ctx.fillStyle = "red"; 
                ctx.font = "20px Arial";  
                ctx.fillText(`your score: ${score}`, (world.w*gridSize/4)+10, (world.h*gridSize)-20);

            }

           clearInterval(interval);
        }
    }

    // Touch controls: swipe up, down, left, right to move the snake
    let touchStartX = 0;
    let touchStartY = 0;




    function touchStart(e) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }

    function touchMove(e) {
        if (!touchStartX || !touchStartY) return;

        const touch = e.touches[0];
        const touchEndX = touch.clientX;
        const touchEndY = touch.clientY;

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Determine swipe direction
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Swipe left or right
            if (diffX > 0 && direction.x === 0) {
            direction = { x: 1, y: 0 }; // Swipe right
            } else if (diffX < 0 && direction.x === 0) {
            direction = { x: -1, y: 0 }; // Swipe left
            }
        } else {
            // Swipe up or down
            if (diffY > 0 && direction.y === 0) {
            direction = { x: 0, y: 1 }; // Swipe down
            } else if (diffY < 0 && direction.y === 0) {
            direction = { x: 0, y: -1 }; // Swipe up
            }
        }

        // Reset start positions
        touchStartX = 0;
        touchStartY = 0;
    }

    // document.addEventListener("touchmove",touchMove);
    // document.addEventListener("touchstart", touchStart);  //canvas

    addListener("touchmove", touchMove);
    addListener("touchstart", touchStart);

    // Start game on arrow key press or swipe
    window.onkeydown = (e) => {
    switch (e.key) {
        case "ArrowUp":
        if (direction.y === 0) direction = { x: 0, y: -1 };
        break;
        case "ArrowDown":
        if (direction.y === 0) direction = { x: 0, y: 1 };
        break;
        case "ArrowLeft":
        if (direction.x === 0) direction = { x: -1, y: 0 };
        break;
        case "ArrowRight":
        if (direction.x === 0) direction = { x: 1, y: 0 };
        break;
    }
    };

    interval = setInterval(gameLoop, 100);

}

function resizeBreak(canvas, container) {
    if(!playing){return;}

    console.log("Game starts");
    const isDarkMode = document.body.classList.contains('dark-mode');


    let tier = window.innerWidth>=700?1:2;

    if(tier===1)
    {
        canvas.width =480;
        canvas.height = 480;
        
    }
    else
    {
        canvas.width =300;
        canvas.height = 300;
    }
   
    console.log(canvas.width + `tier ${tier}`);

    let score = 0;
    let lives = 3;

    if(interval){clearInterval(interval);} //reset game

    const ctx = canvas.getContext("2d");
    let gameover=false;



    let paddle = {
        width: tier===2?45:90,
        height: tier===2?10:20,
        x: canvas.width / 2 - 50,
        y: tier===2?canvas.height - 20:canvas.height - 40,
        speed: 7,
        dx: 0
    };

    let ball = {
        x: canvas.width / 2,
        y: canvas.height - 40,
        radius: tier===2?5:10,
        speed: tier===2?3:5,
        dx: tier===2?3:5,
        dy: tier===2?-3:-5
    };

    const brick = {
        rowCount: 5,
        columnCount: tier===2?8:6,
        width: tier===2?30:60,
        height: tier===2?10:20,
        padding: tier===2?6:10,
        offsetTop: tier===2?30:40,
        offsetLeft: tier===2?8:35//35
    };

    let hitBricks=0;
    let wallHits=0;
    let paddleHits=0;

    let bricks = [];
    for(let c = 0; c < brick.columnCount; c++) {
        bricks[c] = [];
        for(let r = 0; r < brick.rowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, visible: true };
        }
    }

    // Draw paddle
    function drawPaddle() {
        ctx.fillStyle = isDarkMode ? "orange" : "orange";
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    // Draw ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? "white" : "white";
        ctx.fill();
        ctx.closePath();
    }

    // Draw bricks
    function drawBricks() {
        for(let c = 0; c < brick.columnCount; c++) {
            for(let r = 0; r < brick.rowCount; r++) {
                if(bricks[c][r].visible) {
                    const brickX = c * (brick.width + brick.padding) + brick.offsetLeft;
                    const brickY = r * (brick.height + brick.padding) + brick.offsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.fillStyle = isDarkMode ? "#888" : "white";
                    ctx.fillRect(brickX, brickY, brick.width, brick.height);
                }
            }
        }
    }

    // Draw everything
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        
        // ctx.fillStyle = "red";
        // ctx.font = "20px Arial";
        // ctx.fillText(`Score: ${score}`, 20, 30);
        // ctx.fillText(`Lives: ${lives}`, canvas.width - 100, 30);

        if(gameover){
            ctx.fillStyle = "teal";  // Set the fill color for the text
             
            if(lives===0)
            {
                const penalties = (wallHits+paddleHits)*5;
                const finalScore= lives>1?(score*lives)-penalties:score;

                if(tier===2)
                {
                    ctx.font = "30px Arial";
                    ctx.fillText(`Well Done`, (canvas.width)/4, (canvas.height)-100); 
                    ctx.fillStyle = "red";
                    ctx.font = "15px Arial";  
                    ctx.fillText(`final score: ${finalScore}`, (canvas.width/4)+20, (canvas.height)-50);
                }
                else
                {
                    ctx.font = "50px Arial";
                    ctx.fillText(`Well Done`, (canvas.width)/4, (canvas.height)-100); 
                    ctx.fillStyle = "red";
                    ctx.font = "30px Arial";  
                    ctx.fillText(`final score: ${finalScore}`, (canvas.width/4)+20, (canvas.height)-50);
          
                }
                
                clearInterval(interval);
            }
            else
            {
                if(tier===2)
                {
                    ctx.font = "30px Arial"; 
                    ctx.fillText(`GAME OVER`, (canvas.width/6)+5, (canvas.height)-100); 
                    ctx.fillStyle = "red";
                    ctx.font = "15px Arial";  
                    ctx.fillText(`your score: ${score}`, (canvas.width/4)+15, (canvas.height)-50);
                }
                else
                {
                    ctx.font = "50px Arial"; 
                    ctx.fillText(`GAME OVER`, (canvas.width/6)+5, (canvas.height)-100); 
                    ctx.fillStyle = "red";
                    ctx.font = "30px Arial";  
                    ctx.fillText(`your score: ${score}`, (canvas.width/4)+15, (canvas.height)-50);
               
                }
                clearInterval(interval);
            }
        }
        else
        {
            if(tier===2)
            {
                ctx.fillStyle = "red";
                ctx.font = "15px Arial";
                ctx.fillText(`Score: ${score}`, 20, 20);
                ctx.fillText(`Lives: ${lives}`, canvas.width - 80, 20);
            }
            else
            {
                ctx.fillStyle = "red";
                ctx.font = "20px Arial";
                ctx.fillText(`Score: ${score}`, 20, 30);
                ctx.fillText(`Lives: ${lives}`, canvas.width - 80, 30);
            }
            
        }
    }

    // Move paddle
    function movePaddle() {
        paddle.x += paddle.dx;

        if(paddle.x < 0) {
            paddle.x = 0;
        } else if(paddle.x + paddle.width > canvas.width) {
            paddle.x = canvas.width - paddle.width;
        }
    }

    // Move ball
    function moveBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Wall collision (left/right)
        if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx *= -1;
            playToggleSound();
            wallHits++;
        }

        // Wall collision (top)
        if(ball.y - ball.radius < 0) {
            ball.dy *= -1;
            playToggleSound();
            wallHits++;
        }

        // Paddle collision
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width && ball.y + ball.radius > paddle.y) {
            ball.dy = -ball.speed;
            playChoiceSound();
            paddleHits++;
        }

        // Brick collision
        for(let c = 0; c < brick.columnCount; c++) {
            for(let r = 0; r < brick.rowCount; r++) {
                const b = bricks[c][r];
                if(b.visible) {
                    if(ball.x > b.x && ball.x < b.x + brick.width && ball.y - ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {
                        ball.dy *= -1;
                        b.visible = false;
                        score += 10;
                        playThreeClickSound();

                        hitBricks++;
                        //check if last ball
                        if(hitBricks>=(brick.columnCount*brick.rowCount))
                        {
                            gameover=true;
                        }
                    }
                }
            }
        }

      

        // Bottom wall collision (game over)
        if(ball.y + ball.radius > canvas.height) {
            lives--;
            playMessageSound();
            if(lives === 0) {
                gameover=true;
                
            } else {
                // Reset ball and paddle position after losing a life
                ball.x = canvas.width / 2;
                ball.y = canvas.height - 40;
                ball.dx = tier===2?3:5;
                ball.dy = tier===2?-3:-5;
                paddle.x = canvas.width / 2 - paddle.width / 2;
            }
        }
    }

    // Update game elements
    function update() {
        movePaddle();
        moveBall();
        draw();
    }

    let touchStartX = null;


    // Handle keyboard input
    function keyDown(e) {
        if(e.key === "ArrowRight" || e.key === "Right") {
            paddle.dx = paddle.speed;
        } else if(e.key === "ArrowLeft" || e.key === "Left") {
            paddle.dx = -paddle.speed;
        }
    }

    function keyUp(e) {
        if(e.key === "ArrowRight" || e.key === "Right" || e.key === "ArrowLeft" || e.key === "Left") {
            paddle.dx = 0;
        }
    }

   // Handle touch input
    function touchStart(e) {
        touchStartX = e.touches[0].clientX; // Record the initial touch position
    }

    function touchMove(e) {
        if (touchStartX !== null) {
            const touchCurrentX = e.touches[0].clientX; // Current touch position
            const deltaX = touchCurrentX - touchStartX; // Calculate the delta (difference)

            if (deltaX > 0) {
                // Moving right
                paddle.dx = paddle.speed;
            } else if (deltaX < 0) {
                // Moving left
                paddle.dx = -paddle.speed;
            }
        }
    }

    function touchEnd(e) {
        paddle.dx = 0; // Stop paddle movement when touch ends
        touchStartX = null; // Reset the initial touch position
    }


    // Event listeners
    // document.addEventListener("keydown", keyDown);
    // document.addEventListener("keyup", keyUp);
    // document.addEventListener("touchstart", touchStart);
    // document.addEventListener("touchend", touchEnd);
    // document.addEventListener("touchmove", touchMove);

    addListener("touchmove", touchMove);
    addListener("touchstart", touchStart);
    addListener("touchend", touchEnd);
    addListener("keydown", keyDown);
    addListener("keyup", keyUp);

    // Start game loop
    interval = setInterval(update, 1000 / 60); // 60 FPS
}


  export{openMiniGame,availableGames};