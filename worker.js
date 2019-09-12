//
// this function allows us to wait for a certain number of milliseconds
//
// it just compares the current time with the start time in a while loop
// until the right amount of time has passed.
//
// This while loop is blocking... it's creating a LOT of Date objects...
//
// While it is running, the thread is locked, and anything else on
// the thread has to wait.
//
// If you call this function multiple times in a row, the thread will
// be locked for the duration of all of the runs.
//
// Fortunately, *this* thread is a web worker thread, and nothing else
// is running in it. It's *totally fine* to block this one. The main thread
// with our UI (and other stuff) on it will not be impacted.
//
function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}


function countStuff() {
  for (let i = 0; i <= 20; i++) {
    postMessage(`count: ${i}`);
    wait(500);
  }
  postMessage('done');
}


countStuff();
