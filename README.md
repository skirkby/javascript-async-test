## JavaScript Async Code Test

This test shows how important asynchronous code is when you have long-running functions and a User Interface.

JavaScript is technically "single threaded", which means that your code only gets one thread to run in. Anything you do that is "long-running" in the thread will block the thread and hog all of the CPU time.

This will mean that your UI, which is also running in your thread, will be locked, unable to respond to any events like mouse clicks.

The solution is to run your long-running code "asynchronously".

In this sample, there are two web pages. One is developed using only "synchronous" code, while the other is developed using "asynchronous" code.

Web app simply counts to 20, increasing the count by 1 every 500 milliseconds, and displaying the current count in a paragraph element. The current count is also output to the console. 

You begin the counting by clicking the "Go!" button. It will stop when it reaches 20. You can also click the "Stop!" button to prematurely stop the counting.

## Synchronous code: index.html / index.js 
These comprise the synchronous app. Open the browser's developer tools console in order to see console messages.

What you will notice when you click "Go!" is 2 things:

1. The "wait()" function, since it is running in the main thread, will hog all of the CPU. This means that the UI is unresponsive. You can click on the "Stop!" button, but the button click won't register until the counting loop (found in a function named "longRunningFunction()") is finished.

2. The app is obviously running, even though the UI appears unresponsive. You can tell by watching the console log. You will see the "count: x" messages increasing. Once the app finishes counting to 20, you then will see multiple console log messages indicating that you clicked the "stop" button (one log message will appear for each button click, but not until the long running function is complete. They will all be processed after the long running function is done.

## Asynchronous code: fixed.html / fixed.js
These comprise the async app. Open the browser's developer tools console in order to see console messages.

What you will ntoice when you click "Go!" is 2 things:

1. Because the long running function is kicked off in a "web worker" thread, the wait function will still block the thread, it will just block it's own thread, where the counting loop exists. That web worker thread gets a time-slice bit of attention along with every other thread on the computer, including your application's "main thread", which is where your UI is running. Therefore, the UI is still responsive, *and* the counting loop continues to count every 500 milliseconds.

2. Clicking "Stop!" will work - the button click will register, and the event handler will run. In addition, the paragraph counter will count up, along with the "count: x" console log messages.

## setTimeout() and setInterval()
You will often see setTimeout() used in discussions about asynchronous code. However, in fact, setTimeout() is only *partly* asynchronous.

setTimeout() takes 2 parameters: a callback function, and a number of milliseconds to wait before calling the callback function.

I don't know exactly how setTimeout counts time (or even *if* it counts time - it may depend on the JavaScript engine ot do that...), but it's the "time counting" (i.e. waiting) part that is asynchronous, not the callback function. As you saw in the synchronous code sample above, one method for counting time (the method we used - retrieving the current time over and over and over and comparing it to the start time, until the number of milliseconds has passed) will completely block the CPU. Perhaps setTimeout() does something similar. But, however it does it, the time counting is done on another thread, so your app's main thread is not blocked by it.

HOWEVER, when the time is up, setTimeout() will place your callback function in the execution queue *of your main thread*. Whatever is in your callback function will execute "synchronously" on your main thread.

If you were to use setTimeout() to execute a long running function, the long running function callback would block your main thread. Even if setTimeout() is passed "0 milliseconds". Passing 0 will cause it to queue your callback immediately (waiting 0 milliseconds), but by queueing it, it merely places it in the execution queue of your main thread.

The same is true of setInterval(), although it will queue your callback function repeatedly at regular intervals (whatever number of milliseconds you specified.)

That being said, because the code in our counting loop is fast, you *could* approximate asynchronous code by using setTimeout(longRunningFunction, 500), as long as "longRunningFunction()" doesn't do any time counting ... let setTimeout() do that part (asynchronously). The only part the long running function would need to do is increment the counter and update the <p> element.
  
 The timer function would be asynchronous, but the counting and displaying would not (technically - but they are fast, not long running, so, who cares?)
 
 --end--
