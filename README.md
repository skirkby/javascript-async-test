## JavaScript Async Code Test

This test shows how important asynchronous code is when you have long-running functions and a User Interface.

JavaScript is technically "single threaded", which means that your code only gets one thread to run in. Anything you do that is "long-running" in the thread will block the thread and hog all of the CPU time.

This will mean that your UI, which is also running in your thread, will be locked, unable to respond to any events like mouse clicks.

The solution is to run your long-running code "asynchronously".

In this sample
