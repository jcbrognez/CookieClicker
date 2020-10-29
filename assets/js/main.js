(() => {

    // your code here
    let run = document.getElementById('img');//onclick
    let w3 = document.getElementById('w3');//Progress bar
    // Return price & level of button
    let autoClickSpan1 = document.getElementById('span1');
    let autoClickSpan2 = document.getElementById('span2');
    let autoClickSpanA1 = document.getElementById('spanA1');
    let autoClickSpanA2 = document.getElementById('spanA2');
    let autoClickSpanB1 = document.getElementById('spanB1');
    let autoClickSpanB2 = document.getElementById('spanB2');
    //Buttons
    let autoClickBtn = document.getElementById('autoClicker');
    let prixDeAmeliorationBtn = document.getElementById('amelio');
    let boostBtn = document.getElementById('boost');
    let reset = document.getElementById('reset');
    //Timer
    let timerState = false;
    //Return score
    let target = document.getElementById("target");

    let value;//display level in cookieObj
    


    function setItemslocal() {
        localStorage.setItem('cookies', JSON.stringify({'score':0}));
        localStorage.setItem('multiplier', JSON.stringify({'price':20, 'level':1}));
        localStorage.setItem('booster', JSON.stringify({'price':50, 'time':15, 'level':0}));
        localStorage.setItem('autoClick', JSON.stringify({'price':30, 'level':0, 'delay': 1000}));
    }

    let cookieObj = JSON.parse(localStorage.getItem('cookies'));
    let multiplierObj = JSON.parse(localStorage.getItem('multiplier'));
    let boosterObj = JSON.parse(localStorage.getItem('booster'));
    let autoClickerObj = JSON.parse(localStorage.getItem('autoClick'));

    let interval;//Timerlaps


    function refreshScore() {
        target.innerHTML = " "+cookieObj.score+" ";
    }

    function load() {
        if(localStorage.getItem('cookies') === null){
            console.log('new');
        setItemslocal();
        cookieObj = JSON.parse(localStorage.getItem('cookies'));
        multiplierObj = JSON.parse(localStorage.getItem('multiplier'));
        boosterObj = JSON.parse(localStorage.getItem('booster'));
        autoClickerObj = JSON.parse(localStorage.getItem('autoClick'));    
        }else{
        localStorage.setItem('cookies', JSON.stringify({ 'score': cookieObj.score}));
        localStorage.setItem('multiplier', JSON.stringify({'price': multiplierObj.price, 'level': multiplierObj.level}));
        localStorage.setItem('booster', JSON.stringify({'price': boosterObj.price, 'time':boosterObj.time, 'level': boosterObj.level}));
        localStorage.setItem('autoClick', JSON.stringify({'price': autoClickerObj.price, 'level': autoClickerObj.level, 'delay': autoClickerObj.delay}));
        
        target.innerHTML = JSON.parse(localStorage.getItem('cookies')).score;

        autoClickSpan1.innerHTML = `Buy ${autoClickerObj.price}`;
        autoClickSpan2.innerHTML = `Level ${autoClickerObj.level+1}`;
        autoClickSpanA1.innerHTML = `Buy ${multiplierObj.price}`;
        autoClickSpanA2.innerHTML = `Level ${multiplierObj.level}`;
        autoClickSpanB1.innerHTML = `Buy ${boosterObj.price}`;
        autoClickSpanB2.innerHTML = `Level ${boosterObj.level+1} Time ${boosterObj.time}`;
        }
        updateDisplay(); 

    }

    function click(){ 
        if(!timerState){
            value = 1 * multiplierObj.level;
        }else{
            value = (1 * multiplierObj.level) * 2;
        }       
        cookieObj.score += value;
        target.innerText = cookieObj.score;

        localStorage.setItem('cookies', JSON.stringify({ 'score': cookieObj.score}));
        localStorage.setItem('multiplier', JSON.stringify({'price': multiplierObj.price, 'level': multiplierObj.level}));
        localStorage.setItem('booster', JSON.stringify({'price': boosterObj.price, 'time':boosterObj.time, 'level': boosterObj.level}));
        localStorage.setItem('autoClick', JSON.stringify({'price': autoClickerObj.price, 'level': autoClickerObj.level, 'delay': autoClickerObj.delay}));
    }

    function updateDisplay(){
        if(cookieObj.score >= autoClickerObj.price){
            autoClickBtn.disabled = false;
        }else{
            autoClickBtn.disabled = true;
        }
        if(cookieObj.score >= multiplierObj.price){
            prixDeAmeliorationBtn.disabled = false;
        }else{
            prixDeAmeliorationBtn.disabled = true;
        }        
        if(cookieObj.score >= boosterObj.price && timerState == false){
            boostBtn.disabled = false;
        }else{
            boostBtn.disabled = true;
        }

        autoClickSpan1.innerHTML = `Buy ${autoClickerObj.price}`;
        autoClickSpan2.innerHTML = `Level ${autoClickerObj.level+1}`;
        autoClickSpanA1.innerHTML = `Buy ${multiplierObj.price}`;
        autoClickSpanA2.innerHTML = `Level ${multiplierObj.level}`;
        autoClickSpanB1.innerHTML = `Buy ${boosterObj.price}`;
        autoClickSpanB2.innerHTML = `Level ${boosterObj.level+1} Time ${boosterObj.time}`;
    }

    function countSeconds(time){
        let i = 0;
        
        let timeInt = setInterval(()=>{
                if ( i <= time) {
                boostBtn.disabled = true;
                w3.style.width = `${(100*i)/time}%`;
                w3.innerText = `${parseInt((100*i)/time)}%`;
                i++;
                timerState = true;
            }else{
                clearInterval(timeInt);
                
                console.log('done');
                w3.style.width = `${0}%`;
                w3.innerText = `${0}%`;
                timerState = false;
            }
            },1000);
            
    }

    
    function autoclick(){
        clearInterval(interval);
        interval = setInterval(function(){        
            if(autoClickerObj.level > 0){
                
                click();
                updateDisplay()
                console.log(autoClickerObj.delay);
            }else{
                updateDisplay();
            }       
        }, autoClickerObj.delay);
    }

    //ADD EVENT

    window.addEventListener('load',()=>{
        load();
    })

        run.addEventListener('click',()=>{  
            click();
            //refreshScore();
            updateDisplay();
        });

        // RESET function
        reset.addEventListener('click', ()=> {
            cookieObj.score=0;
            multiplierObj.price=20;
            multiplierObj.level=1;
            boosterObj.price=50;
            boosterObj.time=15;
            boosterObj.level=0;
            autoClickerObj.price=30;
            autoClickerObj.level=0;
            autoClickerObj.delay=1000;
            localStorage.clear();
            refreshScore();
            updateDisplay();
        });

        autoClickBtn.addEventListener('click', ()=>{
            autoClickerObj.level += 1;
            autoClickerObj.delay = autoClickerObj.delay /1.1;
            cookieObj.score = cookieObj.score - autoClickerObj.price;
            autoClickerObj.price += parseInt((autoClickerObj.price * 50) / 100);
            console.log(autoClickerObj.level);
            refreshScore();
            autoclick();
            updateDisplay();
        });

        prixDeAmeliorationBtn.addEventListener('click', ()=>{
            cookieObj.score = cookieObj.score - multiplierObj.price;
            multiplierObj.level += 1; 
            multiplierObj.price += parseInt((multiplierObj.price * 40) / 100);
            refreshScore();
            updateDisplay();
        });

        boostBtn.addEventListener('click',()=>{
            boosterObj.level += 1;
            boosterObj.time += 1;
            cookieObj.score = cookieObj.score - boosterObj.price;
            boosterObj.price += parseInt((boosterObj.price * 50) / 100);
            countSeconds(boosterObj.time);
            refreshScore();
            updateDisplay();
        });

})();