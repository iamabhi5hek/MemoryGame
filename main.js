var cardsArray = [
    {    'name': 'London',    'img': 'https://th.bing.com/th/id/OIP.2T8w4d12rslY_xBgRCysFgHaFj?pid=Api&rs=1',  },
    {    'name': 'Sydney',    'img': 'https://th.bing.com/th/id/OIP.3QHWVixhsUXysjvEsHhFMQHaFN?pid=Api&rs=1',  },
    {    'name': 'NY',    'img': 'https://th.bing.com/th/id/OIP.zsG8WxEMNcCXUFnqT_grgAHaJ7?pid=Api&rs=1',  },
    {    'name': 'Paris',    'img': 'https://th.bing.com/th/id/OIP.BUltr48354-fFUsXOg-aGwHaJ7?pid=Api&rs=1',  },
    {    'name': 'Mauritius',    'img': 'https://th.bing.com/th/id/OIP.aPWNoL0USzECRv3O3w22xwHaE8?pid=Api&rs=1',  },
    {    'name': 'Singapore',    'img': 'https://th.bing.com/th/id/OIP.dLkf_uqHEJdK4NgQcbF6MAHaEK?pid=Api&rs=1',  },
    {    'name': 'Greece',    'img': 'https://th.bing.com/th/id/OIP.Djktb4EYDIWjc3KxHtzt5QHaE7?pid=Api&rs=1',  },
    {    'name': 'Finland',    'img': 'https://store.insiderenvy.com/images/2017/05/19161541/finland.jpg',  },
    {    'name': 'NZ',    'img': 'https://th.bing.com/th/id/OIP.h2GMr7HQQAlHUgevdqPC1gHaEF?pid=Api&rs=1',  },
    {    'name': 'Bangalore',    'img': 'https://th.bing.com/th/id/OIP.8AdwLSpuTNw0VntgJ410JQHaE8?pid=Api&rs=1',  },
    {    'name': 'Mumbai',    'img': 'https://th.bing.com/th/id/OIP.5yjvH8zMAzZI6dGZQRnmAgHaE8?pid=Api&rs=1',  },
    {    'name': 'Delhi',    'img': 'https://th.bing.com/th/id/OIP.NUxc6ISMadDyB8m8ZizKgQHaE7?pid=Api&rs=1',  },
  ];

//duplicate cardsArray to create a match for each card
var gameGrid=cardsArray.concat(cardsArray);

//randomise game grid on each refresh
gameGrid.sort(function(){
    return 0.5-Math.random();
})

//garb the div with id of game-board and assign to var game 
var game=document.getElementById('game-board');

//create a section element and assign to var grid
var grid=document.createElement('section');

//give section element a class of grid
grid.setAttribute('class','grid');

//append section element to game-board div
game.appendChild(grid);

//loop through each time in cardsArray
for(var i=0;i<gameGrid.length;i++){

    //create a div element and assign to var card
    var card=document.createElement('div');

    //apply card class to that div
    card.classList.add('card');

    //set the data name attribute of div to cardsArray name
    card.dataset.name=gameGrid[i].name;

    //create front of card
    var front=document.createElement('div');
    front.classList.add('front');

    //create back of card
    var back=document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    //append card to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

}


var firstGuess='';
var secondGuess='';

var count=0;
var previousTarget=null;
var delay=1200;

//add match class of css
var match=function(){
    var selected=document.querySelectorAll('.selected');
    
    //loop through array like object contaning selected class
    for(i=0;i<selected.length;i++){
        selected[i].classList.add('match');
    }
};

//reset guesses after two attempts
var resetGuesses=function(){
    firstGuess='';
    secondGuess='';
    count=0;
    previousTarget=null;

    var selected=document.querySelectorAll('.selected');
    for(var i=0;i<selected.length;i++){
        selected[i].classList.remove('selected');
    }
};

grid.addEventListener('click', function(event){
    //declare var to target our clicked item
    var clicked=event.target;

    //dont want grid section to get selected as class
    if(clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
        return;
    }

    if(count < 2){
        count++;

        if(count===1){
            firstGuess=clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        else{
            secondGuess=clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if(firstGuess !=='' && secondGuess!==''){
            if(firstGuess===secondGuess){
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            }
            else{
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget=clicked;

    }
   
});