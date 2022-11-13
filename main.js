// console.log("This is drag and drop utility");



const previousStatesStack = []



const redoStatesStack = []



var diskNumberbeingDropped = null;


// Getting the movestag

var movesDisplay = document.getElementById("MovesMade");


var numberofMoves = 0;
var dragElementTowerID = null;

var numberofRods = 3;

var displayRodsNumber = document.getElementById("diskNumberDisplay");

displayRodsNumber.innerHTML = numberofRods;


var timer;


// Increase and decrease number of rods


var firstTower = document.getElementById("firstTower");

var secondTower = document.getElementById("secondTower");

var thirdTower = document.getElementById("thirdTower");



var increase=  document.getElementById("increase");

var decrease=  document.getElementById("decrease");

increase.addEventListener("click", ()=>{
    if (numberofMoves == 0)
    {
        if (numberofRods  < 9){
            numberofRods += 1;
            displayRodsNumber.innerHTML = numberofRods;
            // console.log("Rods Increased");
            rodNumberIncreased();
        }
    }
    else{
        alert("Game has already stared");
    }
    
});

decrease.addEventListener("click",()=>{
    if(numberofMoves == 0)
    {
        if (numberofRods  > 3){
            numberofRods -= 1;
            displayRodsNumber.innerHTML = numberofRods;
            // console.log("Rods Decreased");
            rodNumberDecreased();
        }
    }
    else{
        alert("Game has already stared");
    }
    
})


function rodNumberDecreased(){

    var childs = firstTower.getElementsByTagName("div");
    firstTower.removeChild(childs[0]);

}


function rodNumberIncreased(){

    const elementCreated = document.createElement("div");
    elementCreated.className = "rod";
    elementCreated.innerHTML = numberofRods.toString();
    // console.log(elementCreated);

    eventsofRod(elementCreated);

    firstTower.insertBefore(elementCreated, firstTower.firstChild);
    
}



var rods = document.getElementsByClassName("rod");

var containers = document.getElementsByClassName("tower");

var dragRod = null;



// console.log(rods);


// For rods drag function
for(var i of rods){
    eventsofRod(i);
}

function eventsofRod(i){
    i.addEventListener('dragstart', (e)=>{

        dragRod = e.target;
        dragElementTowerID = dragRod.parentElement.id;
        //  console.log(dragRod.parentElement);
    
        // console.log(dragRod);


        // Getting number of disk to avoid smaller on top
        diskNumberbeingDropped = e.target.innerHTML;

        // console.log(diskNumberbeingDropped);

    
        setTimeout(()=>{
            e.target.className = 'hide';
        }, 0);
    
        // e.target.className += " hold"
        });
    
    
        i.addEventListener('dragend', (e)=>{
            // console.log("It has ended");
            // console.log(firstTower);
            // console.log(secondTower);

            // To maintain the functionalities of the three towers
            
            makeTopDiskDraggable();

            // KIA MUSEEBAT HA YAR AJEEEB

            console.log("INSIDE DRAGGGG");

            console.log(thirdTower.children.length);


            // GAME OVER, HE WOOONNNNNNNN
            if(thirdTower.children.length == numberofRods)
            {
                GameOver();
                countDownElement.innerHTML = `Time  left: 00: 00`;
                alert("You won!");
                // console.log("YUPPPPPPY");


            }

            while(redoStatesStack.length)
            {
                redoStatesStack.pop();
            }
            // redoStatesStack = [];

            // Maintaining the data for undo functionality





            dragRod = null;
        
            setTimeout(()=>{
                e.target.className = 'rod';
            }, 0);
        
            // e.target.className += " hold"
            });
}


function makeTopDiskDraggable(){
    var firstChild = firstTower.getElementsByTagName('div');
    var secondChild = secondTower.getElementsByTagName('div');
    var thirdChild = thirdTower.getElementsByTagName('div');

        // console.log(firstChild);

        var l1 = firstTower.children.length;
        var l2 = secondTower.children.length;
        var l3 = thirdTower.children.length;

        // console.log(l1,l2,l3);

        var j = 1

        if(l1 > 0)
        {
            // console.log("Inside First");
            for( var i of firstChild){
                // console.log(i,j);
                if (j == l1){

                    // console.log("HEHEHHE");

                    i.setAttribute('draggable','true');
                }
                else{
                    i.setAttribute('draggable','false');

                }
                j++;
            }
        }


        var j = 1

        if(l2 > 0)
        {
            // console.log("Inside First");
            for( var i of secondChild){
                // console.log(i,j);
                if (j == l2){

                    // console.log("HEHEHHE");

                    i.setAttribute('draggable','true');
                }
                else{
                    i.setAttribute('draggable','false');

                }
                j++;
            }
        }


        var j = 1

        if(l3 > 0)
        {
            // console.log("Inside First");
            for( var i of thirdChild){
                // console.log(i,j);
                if (j == l3){

                    // console.log("HEHEHHE");

                    i.setAttribute('draggable','true');
                }
                else{
                    i.setAttribute('draggable','false');

                }
                j++;
            }
        }
}




// For tower drag listeners

for(tower of containers){


    // prevent default so it continuosly keeps on triggering
    tower.addEventListener('dragover', (e)=>{
        e.preventDefault();
        
    });

    // tower.addEventListener('dragenter', ()=>{

    // });

    // tower.addEventListener('dragleave', ()=>{

    // });

    tower.addEventListener('drop', (e)=>{

        // console.log(e.target);
        // console.log(e.target.id);

        // console.log("From", dragElementTowerID);
        // console.log("To", e.target.id);



        // Checking if the move is not illegal
        // AAAAAAAAAAAAAAA

        if(e.target.hasChildNodes)
        {
            if(Number(e.target.lastChild.innerHTML) < Number(diskNumberbeingDropped))
            {
                alert("Wrong move");
                return;
            }           
        }

        var source = dragElementTowerID;
        var destination = e.target.id;

        if (e.target.id != dragElementTowerID)
        {
            numberofMoves += 1;
            // console.log("Move Made");
            movesDisplay.innerHTML = numberofMoves;

            // To maintain the undo functionality
            // Maintaining stack of source and destination tower

            var stack = [source,destination];
            // console.log("STACK", stack);


            previousStatesStack.push(stack);
            console.log("ALL STACKES", previousStatesStack);

            

            // Make realtable disks dropable now


        }


        // console.log(numberofMoves);

        // console.log('Drop has triggered');

        e.target.append(dragRod);

    });
}



// Timer 


const startingMinutes = 10;

let time = startingMinutes * 60;

const countDownElement = document.getElementById("countdown");

timer = setInterval(updateCountdown,1000);


function updateCountdown(){

    time--;


    let minutes = Math.floor(time/60);

    minutes = minutes < 10 ? '0' + minutes : minutes;


    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;


    countDownElement.innerHTML = `Time  left: ${minutes} : ${seconds}`;

    
    
   

    if (minutes == 0 && seconds == 0)
    {
        // countDownElement.innerHTML = `Time  left: 00: 00`;
        alert("Times up!");

        GameOver();

        // 
    }
}


function GameOver(){

    clearInterval(timer);

        // Removing all disks
        
        while (firstTower.firstChild) {
            firstTower.removeChild(firstTower.lastChild);
          }

          while (secondTower.firstChild) {
            secondTower.removeChild(secondTower.lastChild);
          }

          while (thirdTower.firstChild) {
            thirdTower.removeChild(thirdTower.lastChild);
          }
}



// Undo and Redo


var undo = document.getElementById("undo");

undo.addEventListener("click", ()=>{
    // console.log("HEHE")

    if(numberofMoves>0)
    {

        numberofMoves--;
        console.log("Number of moves", numberofMoves);
        movesDisplay.innerHTML = numberofMoves;

        var previous = previousStatesStack.pop();
        // console.log("From Undo", previous);
        
        // console.log("Source", previous[0]);
        // console.log("Destination", previous[1]);
        
        var source = previous[0];
        var destination = previous[1];
        redoStatesStack.push([destination,source]);
        console.log("REDO STACK", redoStatesStack);
        // console.log("REDO", redoStatesStack)

        
        undoredoHelping(source,destination);

       


    }
});


function undoredoHelping(source,destination){
        var sourceElement = document.getElementById(source);
        var destinationElement = document.getElementById(destination);

        // console.log(destinationElement.lastChild);
        // console.log(destinationElement);

        sourceElement.appendChild(destinationElement.lastChild);
        // console.log(destinationElement);
        if(destinationElement.hasChildNodes)
        {

            destinationElement.removeChild(destinationElement.lastChild);
        }

        makeTopDiskDraggable();
}

var redo = document.getElementById("redo");

redo.addEventListener("click", ()=>{
    // console.log("HEHE");

    if(redoStatesStack.length > 0)
    {

        numberofMoves++;
        movesDisplay.innerHTML = numberofMoves;
        // console.log("Source", r[0]);
        // console.log("Destination", r[1]);
        var r = redoStatesStack.pop();

        previousStatesStack.push([r[1],r[0]]);

        undoredoHelping(r[0], r[1]);

        

        // console.log(previousStatesStack);
    
       
    }
    
});
