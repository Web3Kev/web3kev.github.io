// main.js
import { initAudio, playMessageSound, playChoiceSound, playTextSound, stopTextSound, toggleSound, updateSpeakerIcon } from './audio.js';
import { initTTS, readMessage } from './tts.js';
import { initThreeJS, checkThreeEligibility, cleanupThreeJS } from './threed.js';
import {openMiniGame, availableGames} from './minigames.js';

let story;
let currentChoices = [];
let languageSet;
let choiceDiv = null;

// Initialize components
initAudio();
const tts = initTTS();
initThreeJS();

// Fetch and initialize the story
fetch("../portfoliostory.json")
  .then((response) => response.json())
  .then((storyContent) => {
    story = new inkjs.Story(storyContent);
    continueStory();
  });

const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const scrollToBottomButton = document.getElementById("scroll-to-bottom");
const modal = document.getElementById("modal");
const closeModal = document.getElementsByClassName("close")[0];
const projectIframe = document.getElementById("project-iframe");
const appContainer = document.querySelector(".app-container");

function randomChooseFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length); // Generate a random index
    return arr[randomIndex]; // Return the element at that index
}



function continueStory() {
    let storyText = "";
    let newChoices = false;
    let imagePath = null;
    let link = null;
    let emoji = null;

    while (story.canContinue) {

      const content = story.Continue();

        if (content.includes(':APPDO:')) {
            // Perform trimming or other actions
            let splitcontent = content.split(':APPDO:');
            let todo = splitcontent[1].trim();
            

            console.log("contains " + todo);

            
            if(todo.includes("about"))
            {
                link= ['about',`https://www.kidsfab.jp`];
            }
            else if(todo.includes("unity"))
            {
                link= ['unity projects',`https://www.unity.com`];
            }
            else if(todo.includes("flutter"))
            {
                link= ['flutter projects',`https://www.flutter.dev`];
            }
            else if(todo.includes("threeJS"))
            {
                link= ['threeJS projects',`https://www.threejs.org`];
                // link=['Game',`#game`];
            }
            else if(todo.includes("jsgame"))
            {
                const pickedGame = randomChooseFromArray(availableGames);
                link= [`Play "${pickedGame}"`,`#game${pickedGame}`];
            }
            else if(todo.includes("emoji"))
            {
                let emo= todo.split('emoji');
                emoji= emo[1].trim();
                addMessage({emoji:emoji});

            }
            else if(todo.includes("image"))
            {
                let img= todo.split('image');
                imagePath= img[1].trim();
            }

            storyText += splitcontent[0].trim() + "\n";

        } 
        else if(content.includes("KNOCKNAME"))
        {
            storyText += content + "\n";

            if(currentJoke)
            {
                console.log("second time");
                //replace KNOCKNAME with 
                storyText=storyText.replace(/KNOCKNAME/g, currentJoke);

                console.log(storyText);

                if(content.includes("KNOCKFULLNAME"))
                {
                    //repeat
                    // replace KNOCKFULLNAME
                    storyText=storyText.replace(/KNOCKFULLNAME/g, knockKnockJokes.get(currentJoke));
                    console.log(storyText);
                    
                    //nullify
                    currentJoke=null; 
                    //select next
                    currentJokeIndex++;
                    //return to first
                    if(currentJokeIndex>knockkeysArray.length-1){currentJokeIndex=0;}
                }
            }
            else
            {
                console.log("first time");
                //first time
                currentJoke=knockkeysArray[currentJokeIndex];
                //replace KNOCKNAME with 
                storyText=storyText.replace(/KNOCKNAME/g, currentJoke);
                console.log(storyText);

            }
        }
        else if(content.includes("JOKESTART"))
        {
            storyText += content + "\n";
            console.log("JOKESTART");

            if(!currentJoke)
            {
                //first time
                currentJoke=languageSet==="fr-FR"?FrenchJokeskeysArray[currentJokeIndex]:JapaneseJokeskeysArray[currentJokeIndex];
                storyText=storyText.replace(/JOKESTART/g, currentJoke);
                console.log(storyText);
            }
          
        }
        else if(content.includes("JOKEENDS"))
        {
            storyText += content + "\n";
            console.log("JOKEENDS");
            if(currentJoke)
            {
                storyText=storyText.replace(/JOKEENDS/g, languageSet==="fr-FR"?FrenchJokes.get(currentJoke):JapaneseJokes.get(currentJoke));
                console.log(storyText);
                //nullify
                currentJoke=null; 
                //select next
                currentJokeIndex++;
                //return to first
                if(languageSet==="fr-FR")
                {
                    if(currentJokeIndex>FrenchJokeskeysArray.length-1){currentJokeIndex=0;}
                }
                else
                {
                    if(currentJokeIndex>JapaneseJokeskeysArray.length-1){currentJokeIndex=0;}
                }
            }
            
        }
        else {
            storyText += content + "\n";
        }
    }

    if (story.currentChoices.length > 0) {

      currentChoices = story.currentChoices;
      newChoices=true;

        if(currentJoke && languageSet==="en-US")
        {
            //check for KNOCKNAME in choice and replace with currentJoke if not null

            for(let i=0; i<currentChoices.length; i++)
            {
               
                if(currentChoices[i].text.includes("KNOCKNAME"))
                {
                    currentChoices[i].text=currentChoices[i].text.replace(/KNOCKNAME/g, currentJoke);
                }
            }
        }
    }

    addMessage({text:storyText.trim(), sender:"app", choices:newChoices, imagePath:imagePath, link:link});// emoji:emoji
  
}

function addMessage({ text = null, sender = "app", choices = null, imagePath = null, link = null, emoji = null } = {}) {
    if(text)
        {
            const message = document.createElement("div");
           
            message.className = `message ${sender}-message`;

            const textElement = document.createElement("div");
            textElement.className = "message-text";
            message.appendChild(textElement);

            chatContainer.appendChild(message);

            if (sender === "user") {

                if(!languageSet){
                    //only do this once !
                    console.log("not set "+text);
                    if(text==="oui")
                    {
                        languageSet="fr-FR";
                        if(tts){tts.setLanguage(languageSet);}
                        
                        console.log("language set to :"+languageSet);
                    }
                    else if(text==="はい")
                    {
                        languageSet="ja-JP";
                        if(tts){tts.setLanguage(languageSet);}
                        console.log("language set to :"+languageSet);
                    }
                    else if(text==="yes")
                    {
                        languageSet="en-US";
                        if(tts){tts.setLanguage(languageSet);}
                        console.log("language set to :"+languageSet);
                    }
                }
                textElement.textContent = text;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            } 
            else 
            {
                let index = 0;
                const interval = setInterval(() => {

                    //for each character in the text 
                    textElement.textContent += text[index];
                    playTextSound();
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                    index++;

                    if (index === text.length) {

                        clearInterval(interval);
                        stopTextSound();

                        // TTS on click of text if language set
                        if(languageSet){textElement.onclick = () =>readMessage(text);}

                        // Add image if provided, inline with the text
                        if (imagePath) {
                            const imageElement = document.createElement("img");
                            imageElement.src = imagePath;
                            imageElement.className = "message-image";
                            imageElement.onclick = () => openImageModal(imagePath);
                            message.appendChild(imageElement);
                        }

                        //adds the following as separate divs 

                        if(link)
                        {
                            AddLink(link); 
                        }

                        // Delayed creation
                        setTimeout(() => {
                            if (choices) {
                                AddChoices();
                            }
                        }, 500); 
                    }

                }, 25);

            }
        }
        else
        {
            if (imagePath) 
            {
                AddImg(imagePath);
            }
            if(emoji)
            {
                const message = document.createElement("div");
                message.className = `message ${sender}-message emoji`;

                const textElement = document.createElement("div");
                textElement.className = "message-text";
                textElement.textContent += emoji;

                message.appendChild(textElement);

                chatContainer.appendChild(message);

                playMessageSound();
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }

}

function handleUserInput(userMessage) {
    const lowerCaseInput = userMessage.toLowerCase();
    const closestMatch = findClosestMatch(lowerCaseInput, currentChoices);
    
    if (closestMatch) {
      const choiceIndex = currentChoices.indexOf(closestMatch);

      addMessage({text:currentChoices[choiceIndex].text, sender:"user"}); //write picked answer

      GotoChoice(choiceIndex);
    //   RemoveChoices();
    //   story.ChooseChoiceIndex(choiceIndex);
    //   continueStory();
    } 
    else 
    {
        addMessage({text:userMessage, sender:"user"});

        if(userMessage.toLowerCase()==="game")
        {
            const pickedGame = randomChooseFromArray(availableGames);
            AddLink([`Play "${pickedGame}"`,`#game${pickedGame}`]); 
        }
        else
        {
            let errorMessage="";
            if(languageSet)
            {
                if(languageSet==="ja-JP")
                {
                    errorMessage="その選択が理解できませんでした。上記の選択肢から選んでください。";
                }
                else if(languageSet==="fr-FR")
                {
                    errorMessage="Je n’ai pas compris ce choix. Veuillez choisir parmi les options ci-dessus.";
                }
                else
                {
                    errorMessage="I didn't understand that choice. Please choose from the above.";
                }
            }
            else
            {
                errorMessage="I didn't understand that choice. Please choose from the above.";
            }

            addMessage({
                text:errorMessage,
                sender:"app"}
            );
        }

        
    }
}

function GotoChoice(index)
{
    RemoveChoices();
    story.ChooseChoiceIndex(index);
    continueStory();
    
}

function clickAnswer(index)
{
    addMessage({text:currentChoices[index].text, sender:"user"}); 
    GotoChoice(index);
}

function AddChoices()
{
    if(choiceDiv)
    {
        RemoveChoices();
    }

    choiceDiv = document.createElement("div");
    choiceDiv.className = `message app-message choices`;

    const textElement = document.createElement("div");
    textElement.className = "message-text";
    choiceDiv.appendChild(textElement);

    const choicesElement = document.createElement("div");
    choicesElement.className = "message-choices";
    textElement.appendChild(choicesElement);

    const ul = document.createElement('ul');
    choicesElement.appendChild(ul);

    for (let i = 0; i < currentChoices.length; i++) {
        const li = document.createElement('li'); // Create a new list item
        const p = document.createElement('p'); // Create a new paragraph
        p.textContent = currentChoices[i].text; // Set the text
        p.addEventListener('click', () => clickAnswer(i)); // Add the click event listener
        li.appendChild(p); // Append the paragraph to the list item
        ul.appendChild(li); // Append the list item to the container
    }

    chatContainer.appendChild(choiceDiv);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    playChoiceSound();
}

function RemoveChoices()
{
    if(choiceDiv)
    {
        console.log("choice removed");
        chatContainer.removeChild(choiceDiv);
        choiceDiv=null;
    }
}

function AddLink(link)
{

    const linkdiv = document.createElement("div");
    linkdiv.className = `message app-message choices`;

    const textElement = document.createElement("div");
    textElement.className = "message-text";
    linkdiv.appendChild(textElement);

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    textElement.appendChild(row);

    const svgElement = document.createElement('div');
    svgElement.style.marginRight = "10px";
    svgElement.innerHTML = '<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / External_Link"> <path id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#ff9300" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>';

    svgElement.onclick = () => {
        openlinkModal(link[1]);
    }

    row.appendChild(svgElement); 

    const title = document.createElement("div");
    title.style.fontSize = "16px";
    title.textContent=link[0];
    row.appendChild(title);

    //put the whole think in the chat
    chatContainer.appendChild(linkdiv);

    openlinkModal(link[1], 1000);

    playMessageSound();

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function AddImg(path)
{
    const imgdiv = document.createElement("div");
    imgdiv.className = `message app-message choices`;

    const textElement = document.createElement("div");
    textElement.className = "message-text";
    imgdiv.appendChild(textElement);

    const imageElement = document.createElement("img");
    imageElement.src = path;
    imageElement.className = "message-image";
    imageElement.onclick = () => openImageModal(path);
    textElement.appendChild(imageElement);

    //put the whole think in the chat
    chatContainer.appendChild(imgdiv);

    playMessageSound();

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function openImageModal(imagePath) {
    const modal = document.createElement("div");
    modal.className = "image-modal";

    const modalImage = document.createElement("img");
    modalImage.src = imagePath;
    modalImage.className = "modal-image";

    modal.appendChild(modalImage);
    document.body.appendChild(modal);

    modal.onclick = () => {
        document.body.removeChild(modal);
    };
}

const knockKnockJokes = new Map([
    ["Annie", "Annie body home?"],
    ["Lettuce", "in, it's freezing out here!"],
    ["Atch", "Bless you!"],
    ["Harry", "up and answer the door!"],
    ["Olive", "you and I miss you!"],
    ["Cow", "say who? No, cows say moooo!"],
    ["Dishes", "a nice place you got here!"],
    ["Nana", "your business!"],
    ["Luke", "through the peephole and find out!"],
    ["Candice", "door open or what?"],
    ["Yodel", "ay-hee-hoo!"],
    ["Wooden", "you like to know!"],
  ]);

  const FrenchJokes = new Map([
    ["Que se passe-t-il quand 2 poissons s'énervent", "Le thon monte !"],
    ["Quel fruit est assez fort pour couper des arbres ?", "Le citron !"],
    ["Quel est le réseau préféré des pêcheurs ?", "Truiteur !"],
    ["Où est-ce que l'homme invisible part en vacances ?", "Chez ses transparents !"],
    ["Quels sont les fruits qu'on trouve dans toutes les maisons ?", "Des coings et des mûres !"],
    ["Pourquoi est-ce que les moutons aiment le chewing-gum ?", "Parce que c’est bon pour l’haleine !"],
    ["Quelle est l'info la plus tirée par les cheveux ?", "Il n’y a pas de chauve à Bastia, mais à Calvi si."],
    ["Que dit une mère à son fils geek quand le dîner est servi ?", "Alt Tab !"],
    ["Que fait un geek quand il descend du métro ?", "Il libère la RAM."],
    ["Quel est l'animal le plus connecté ?", "Le porc USB !"]
  ]);

  const JapaneseJokes = new Map([
    ["布団", "吹っ飛んだ"],
    ["アルミ缶の上にある", "ミカン"],
    ["内容", "無いよう"],
    ["カオナシが好きの花は？", "クチナシ"],
    ["魚はいつ食べる？", "朝かなー！"],
    ["北海道の一番北の町の名前わかる？", "わっかない！"],
    ["お風呂に入るのが好きな街はどこ?", "入浴！"],
    ["モグラの歯", "モーグラグラ"],
    ["ゴミを捨てて", "ごみんなさい"],
    ["パンはパンでも食べられないパンはなに?", "フライパン！"],
]);


let currentJoke = null;

const knockkeysArray = Array.from(knockKnockJokes.keys());
const FrenchJokeskeysArray = Array.from(FrenchJokes.keys());
const JapaneseJokeskeysArray = Array.from(JapaneseJokes.keys());

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

shuffleArray(knockkeysArray);
shuffleArray(FrenchJokeskeysArray);
shuffleArray(JapaneseJokeskeysArray);

let currentJokeIndex=0;


function openlinkModal(path, timer) {

    projectIframe.style.display="none";

    // if(path==="#game")
    // {
    //     setTimeout(() => {
    //        openMiniGame(randomChooseFromArray(availableGames));
    //     }, timer?timer:0); 
    // }
    if (path.includes("#game")) {
        // Trim everything before and including "#game"
        const trimmedPath = path.split("#game")[1].trim(); 
        setTimeout(() => {
            openMiniGame(trimmedPath);
        }, timer?timer:0); 
    }    
    else
    {
        projectIframe.style.display="block";
        projectIframe.src = path;

        closeModal.onclick = function () {
            modal.style.display = "none";
            projectIframe.src = 'about:blank';
        };
        setTimeout(() => {
            modal.style.display = 'block';
        }, timer?timer:0); 
    }
    
}

// Levenshtein distance function to calculate string similarity
function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
        } else {
            matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
            );
        }
        }
    }

    return matrix[b.length][a.length];
}

// Function to find the closest match
function findClosestMatch(input, choices) {
    let closestMatch = null;
    let closestDistance = Infinity;

    for (let i = 0; i < choices.length; i++) {
        const distance = levenshteinDistance(input, choices[i].text);
        if (distance < closestDistance) {
        closestMatch = choices[i];
        closestDistance = distance;
        }
    }

    // You can adjust this threshold based on how strict you want the matching to be
    const similarityThreshold = 0.2;
    const maxDistance = Math.max(input.length, closestMatch.text.length);
    const similarity = 1 - closestDistance / maxDistance;

    console.log(similarity);

    return similarity > similarityThreshold ? closestMatch : null;
}



// Event listeners
sendButton.addEventListener("click", () => {
  const userIn = userInput;
  const userMessage = userIn.value.trim();
  if (userMessage) {
    userIn.value = "";
    handleUserInput(userMessage);
  }
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendButton.click();
    }
  });

  chatContainer.addEventListener("scroll", () => {
    if (
        chatContainer.scrollTop <
        chatContainer.scrollHeight - chatContainer.clientHeight
    ) {
        scrollToBottomButton.style.display = "block";
    } else {
        scrollToBottomButton.style.display = "none";
    }
});

scrollToBottomButton.addEventListener("click", () => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

closeModal.onclick = function () {
    modal.style.display = "none";
    projectIframe.src = 'about:blank';

    //reset iframe?
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Responsive design
function adjustAppContainer() {
    if (window.innerWidth >= 768) {
        const maxHeight = window.innerHeight - 40; // 40px for padding
        const aspectRatio = 9 / 19.5;
        const calculatedWidth = maxHeight * aspectRatio;

        if (calculatedWidth <= 375) {
            appContainer.style.height = maxHeight + "px";
            appContainer.style.width = calculatedWidth + "px";
        } else {
            appContainer.style.width = "375px";
            appContainer.style.height = 375 / aspectRatio + "px";
        }
        } else {
            appContainer.style.width = "100%";
            appContainer.style.height = "100vh";
    }
}

window.addEventListener("resize", adjustAppContainer);
adjustAppContainer();

function preventBounce(e) {
    e.preventDefault();
  }

  function allowBounce(e) {
    e.stopPropagation(); // Stop the event from propagating to the document
}



// Cleanup function
function cleanup(event) {
  console.log("clean...");
  event.preventDefault();
  event.returnValue = '';
  cleanupThreeJS();
  // ... (other cleanup tasks)
}


// // Initial message
// addMessage({
//     text: "Welcome to my portfolio, what would you like to see? Websites? iOS apps? Flutter? Please write one of those.",
//     sender: "app",
//     imagePath: "https://cdn.glitch.global/1d189f89-e0fc-4522-92f2-ad0cc534000f/shop.jpg?v=1726456475152"
//   });
  
//   addMessage({ sender: 'app', emoji: '😊' });
  


window.addEventListener('DOMContentLoaded', (event) => {
  window.addEventListener('beforeunload', cleanup);
});


// document.body.addEventListener('touchmove', preventBounce, { passive: false });
// appContainer.addEventListener('touchmove', allowBounce, { passive: true });

//prevent bounce for games
modal.addEventListener('touchmove', preventBounce, { passive: false });

export { toggleSound, updateSpeakerIcon,clickAnswer };