
//
// get our dom elements so we can update the <p> and 
// create click event  handlers for the <button>'s
//
const stopBtn = document.querySelector('.stop-btn');
const goBtn = document.querySelector('.go-btn');
const p = document.querySelector('p');

//
// this long running function counts to 20, waiting a half secnd
// between each number, before outputting it to the console
// and also updating the DOM (a <p>).
//
// This happens in a web worker thread, where the wait happens,
// and on each number count, the worker sends a message with the
// current count back to our message event handler (see below).
//
// Our handler then updates the dom and outputs to console.log().
//
//
let w = undefined;
function longRunningFunction() {
    return new Promise((resolve, reject) => {
        if (typeof (w) == 'undefined') { w = new Worker('./worker.js'); }
        w.onmessage = function (event) {
            if (event.data === 'done') {
                w.terminate();
                w = undefined;                    
                resolve('done');
            } else {
                console.log(event.data);
                p.innerText = event.data;
            }
        }
    });
}


//
// click event to start the function...
//
goBtn.addEventListener('click', (e) => {
    console.log('starting!');
    longRunningFunction()
    .then((res) => console.log('done'));    
})

//
// click event to stop the function.
// in this version, it stops the function by terminating the worker.
// If I wanted to be more smooth, I would signal the worker to self-terminate...
// But this works fine.
//
// I also set the worker var to undefined so I can recreate it later.
// With work, I could design it to stay alive and restart it with messaging.
//
// 
stopBtn.addEventListener('click', (e) => {
    if (typeof(w) !== 'undefined') {
        w.terminate();
        w = undefined;
        p.innerText = 'stopped...';
    }
})

