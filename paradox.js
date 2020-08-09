const container=document.querySelector('.container');
const doors=container.querySelectorAll('.doors');
const dropzones=container.querySelectorAll('.dropzones');
const coin=container.querySelector('.coin');
const modalScreen=document.querySelector('.modal-bg');
const modalSelectionBox=document.querySelector('.modal');
let ctx = modalSelectionBox.getContext('2d');
let maxRandomNumber=0;


//set properties for start and re-set properties for additional rounds
function setProperties(){
    for(let i=0; i<3; i++)
    {
        doors[i].identifier=i+1;// adding unique identifiers to every {door, dropzone} pairs plus additional properties
        dropzones[i].identifier=i+1;

        doors[i].randomValue=0;
        doors[i].isWinner=false;
        doors[i].selectedByTheUser=false;
    }
    coin.draggable=true;
    console.log('done: setProperties');

}


//generating random selection for the winning door (choice)


function assigningRandomValues(){
    

    let randomNumberArray=[];//array to keep track of random values, and to find the max value among them.
    doors.forEach(door => {
        let randomNumber=Math.random();
        door.randomValue=randomNumber//assigning random values to each doors
        randomNumberArray.push(randomNumber);
    
    });
    maxRandomNumber=Math.max(...randomNumberArray);
    console.log('done: assigningRandomValues');
}


//the door with the maximum randomValue will be the winner

function selectingThewinningDoor(){
    doors.forEach(door => {
        if(door.randomValue==maxRandomNumber){
            door.isWinner=true; 
        }

    });
    console.log('done: selectingThewinningDoor');
}


function playerSelection(){
    
    //dragstart
    coin.addEventListener('dragstart',()=>{
        console.log('dragstart')
        
       
    });
    coin.addEventListener('dragend',()=>{
        //coin.fill='red'//nem mukodik
    });
    
    //drag stettings - dropzone 
    dropzones.forEach(zone => {
        zone.addEventListener('dragenter',() =>{
            zone.classList.add('active-dropzone')
        });
        zone.addEventListener('dragleave',() =>{
            zone.classList.remove('active-dropzone')
        });
        zone.addEventListener('dragover',(e) =>{
            e.preventDefault();
        });
        zone.addEventListener('drop',(e) =>{
            e.preventDefault();
                coin.parentNode.removeChild(coin);
                e.target.appendChild(coin);
                let selectionIdentifier=e.target.identifier
                
                for(let i=0;i<3;i++){
                    if (doors[i].identifier===selectionIdentifier){
                        doors[i].selectedByTheUser=true;
                        coin.draggable=false;
                    }
                }  
            
            setTimeout(()=>{revealAnEmptyDoor()},1200);  
            
                  
        });
    });

    
    console.log('done: playerSelection');
}




//revealing one door
let doorToReveal;
let optionToSwap;

function revealAnEmptyDoor(){
    let twoRemainingChoices=[];
    for(let i=0; i<3;i++){

        if(doors[i].selectedByTheUser===false){
            twoRemainingChoices.push(doors[i]);
            
        }
    }
    
    switch(twoRemainingChoices[0].isWinner){
        case false:
            if(twoRemainingChoices[1].isWinner===false){
                if(twoRemainingChoices[0].randomValue<0.5){
                    doorToReveal=twoRemainingChoices[1];
                    optionToSwap=twoRemainingChoices[0];
                }
                else{doorToReveal=twoRemainingChoices[0];
                     optionToSwap=twoRemainingChoices[1];
                }
            }
            else{
                doorToReveal=twoRemainingChoices[0];
                optionToSwap=twoRemainingChoices[1];
            }
            break;
        case true:
            doorToReveal=twoRemainingChoices[1];
            optionToSwap=twoRemainingChoices[0];
            break;



    }
    doorToReveal.children[0].src='./img/door-opened.svg';
    dropzones.forEach(zone => {
        if(zone.identifier===doorToReveal.identifier){
            zone.removeEventListener('dragover',(e) =>{
                e.preventDefault();
            });

            zone.style.visibility='hidden';
            coin.draggable=true;
        }
        
    });
    console.dir(doorToReveal)

    setTimeout(()=>{popupModalWithQuestion()},1100)
    console.log('done: revealAnEmptyDoor');

}

function popupModalWithQuestion(){
    
    modalScreen.classList.add('modal-active');
    
    if(modalScreen.classList.contains('modal-active')){
        modalSelectionBox.addEventListener('mouseover',() =>{
            let x = event.clientX;     // Get the horizontal coordinate
            let y = event.clientY;     // Get the vertical coordinate
            let coord = "X coords: " + x + ", Y coords: " + y;
            //console.log(coord)

        })}
        modalSelectionBox.addEventListener('click',()=>{
            modalScreen.classList.remove('modal-active');
        })
        //itt az igazi valasztas meg hianyzik
        let swapOrStay='swap'
        return swapOrStay

}
//let valasz = popupModalWithQuestion()








function finalReveal(){
    for(let i=0; i<3; i++){
        doors[i].children[0].src='./img/door-opened.svg'
        console.log(doors[i].isWinner)
        if(doors[i].isWinner===true){
            doors[i].appendChild(coin).classList.add('winnerPrize')
        }

    }
}


function game(){

    setProperties();
    assigningRandomValues();
    selectingThewinningDoor();
    playerSelection();
    

    let swappingChoice='';
    swappingChoice='swap'
    if(swappingChoice='swap'){
        
        console.dir(coin)
    }
}
game();
