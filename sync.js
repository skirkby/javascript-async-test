

const stopBtn = document.querySelector('.stop-btn');
const goBtn = document.querySelector('.go-btn');
const p = document.querySelector('p');

let stopMe = false;
function longRunningFunction() {
  for (let i = 0; i<=20; i++) {
    if (stopMe) {p.innerText = p.innerText + '\nstopped';  break;}
    console.log(`count: ${i}`);
    p.innerText = `count: ${i}`;  
    wait(500);
  }  
}

goBtn.addEventListener('click', (e) => {
    console.log('starting!');
    stopMe = false;
    longRunningFunction();
    console.log('done');

})

stopBtn.addEventListener('click', (e) => {
  console.log('stopping...!');
  stopMe = true;
})

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

