var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
    
var size = 500;
canvas.style.width = size + "px";
canvas.style.height = size + "px";
var scale = 1.5; 
            
canvas.width = Math.floor(size * scale);
canvas.height = Math.floor(size * scale);
  
ctx.scale(scale, scale);
ctx.font = '18px Wallington';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

function draw_line(x1,x2,y1,y2){
    ctx.beginPath();
    ctx.lineWidth=3;
    ctx.strokeStyle='orange';
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();

}
function draw_gird(parts){
    for(let i=1; i<parts;i++){
        let hi = (canvas.height/parts)*i/scale;
        draw_line(0,canvas.width,hi,hi);
    }
    for(let i=1; i<parts;i++){
        let wi = (canvas.width/parts)*i/scale;
        draw_line(wi,wi,0,canvas.height);
    }
}

function zero_matrix(size){
    let ARR = new Array(size);
    for (let i=0;i<ARR.length;i++){
        ARR[i] = new Array(size);
    }
    for(var i=0; i<ARR.length;i++){
        for(var j=0; j<ARR[i].length;j++)
            ARR[i][j]=0;
    }
    return ARR ;
}
function prodALL(M){
    let prod = 17;
    for(let row = 0; row < M.length; row++) {
        for(let col = 0; col < M[row].length; col++) {
            prod*=M[row][col];
        }
    }
    return prod;
}

function display_matrix(MAT){
    let H = canvas.height;
    let W = canvas.width;
    let p = MAT.length;
    let c = H/(2*scale*p);

    ctx.fillStyle='darkblue';

    for(var i=0; i<MAT.length;i++){
        for(var j=0; j<MAT[i].length;j++){

            let X = (H/p)*i/scale;
            let Y = (W/p)*j/scale;
            ctx.fillText(MAT[j][i],X+c,Y+c+10/scale)
        }
    }
}
// TO GENERATE A RANDOM NUMBER WITHIN DESIRED RANGE
function randInt(dim){
    return Math.trunc(Math.random()*73)%dim;
}

// TO GENERATE SOME 2s IN SOME RANDOM SPOTS IN THE MATRIX 
function genSomeTwos(M){
    let count = 0;
    let loopCount = 0;
    let d = M.length;
    let maxCount = 3;
    if(d <= 5){ maxCount=2;}
    while(count < maxCount){
        loopCount+=1;
        var posX = randInt(d);
        var posY = randInt(d);
        if( M[posX][posY] == 0 ){
            M[posX][posY] = 2;
            count+=1;
        }
        if(loopCount > Math.pow(d,2) && prodALL(M) !=0){
        break;
        }
    }
    return M;
}

// matrix display combined function
function displayMat(MAT){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    display_matrix(MAT);
    draw_gird(MAT.length);
}
// Left FALL function.

function leftFallArr(ARR) {
    let pos = 0;
    let B = new Array(ARR.length);
    for(let i=0; i < ARR.length;i++){

        if (pos==0 && ARR[i] != 0){ 
            B[pos] = ARR[i]; 
            pos+=1;
        }
        else if( pos>0 && ARR[i]!=0){
            if (B[pos-1]==ARR[i]) {
                B[pos-1]*=2; 
            }
            else{
                B[pos] = ARR[i];
                pos+=1;
            }
        }
        else{continue;}
    }
    while(pos<B.length){
        B[pos] = 0;
        pos+=1;
    }
    return B;
}

function leftFall(MAT){
    for(let i=0; i<MAT.length;i++){
        MAT[i] = leftFallArr(MAT[i])
    }
    return MAT;
}

// Some matrix manipunation functions.
function transposeMat(M){
    let B = zero_matrix(M.length);

    for(let row = 0; row < M.length; row++) {
        for(let col = 0; col < M[row].length; col++) {
            B[col][row] = M[row][col];
        }
    }
    return B;
}

function mirrorMat(M){
    let B = zero_matrix(M.length);

    for(let row = 0; row < M.length; row++) {

        for(let col = 0; col < M[row].length; col++) {

            B[row][col] = M[row][M.length -1 -col];
        
        }
    }
    return B;

}

// Defining all other Fall functions

function rightFall(MAT){
    MAT = mirrorMat(MAT);
    MAT = leftFall(MAT);
    MAT = mirrorMat(MAT);
    return MAT;
}

function raiseMat(MAT){
    MAT = transposeMat(MAT);
    MAT = leftFall(MAT);
    MAT = transposeMat(MAT);
    return MAT;
}
function fallMat(MAT){
    MAT = transposeMat(MAT);
    MAT = rightFall(MAT);
    MAT = transposeMat(MAT);
    return MAT;    
}


function Init(dim){
    let MAT = zero_matrix(dim);
    MAT = genSomeTwos(MAT);
    displayMat(MAT)
    return MAT;
}



function getInputSize(){
    var GameSize = document.getElementById('GameSize').value ;
    GameSize = Number(GameSize);
    if(!GameSize.isNumber){
        GameSize=6;
    }
    return GameSize;
}


let str = getInputSize();
let MAT = Init(str);


document.addEventListener("keydown",function(e){
    const key = e.key;
    e.preventDefault();

    switch(key){
        case "ArrowUp" :
            MAT = raiseMat(MAT);
            MAT = genSomeTwos(MAT);
            displayMat(MAT);
            break;
        case "ArrowDown" :
            MAT = fallMat(MAT);
            MAT = genSomeTwos(MAT);
            displayMat(MAT);
            break;
        case "ArrowRight" :
            MAT = rightFall(MAT);
            MAT = genSomeTwos(MAT);
            displayMat(MAT);
            break;
        case "ArrowLeft":
            MAT = leftFall(MAT);
            MAT = genSomeTwos(MAT);
            displayMat(MAT);
            break;
        case "Enter":
            delete str;
            let str = Number(document.getElementById('GameSize').value);
            delete MAT ; 
            MAT = Init(str);
            break;

        default:
            ; 
    }
});

