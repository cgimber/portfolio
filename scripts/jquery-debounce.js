/*
 * adds Underscore.js debounce functionality to jQuery
 *
 * thanks to David Walsh for the example code and Malik for the explanation:
 * http://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript
 *
 * example:
 *
 * var foo = function() {
 *   // do something complicated
 * }
 *
 * var debouncedResize = debounce(foo, 60); // run at most one time per 60 ms
 *
 * $(window).resize(debouncedResize);
 */

function debounce(func, wait, immediate) {
    // @param func {Function} the function to invoke.
    // @param wait {Number} wait time after it stops being called for N milliseconds.
    // @param immediate {Boolean} immediately trigger the function on the leading edge,
    // instead of the trailing.

    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;

    // Calling debounce returns a new anonymous function
    return function() {
        // reference the context and args for the setTimeout function
        var context = this,
            args = arguments;

        // Should the function be called now? If immediate is true
        //   and not already in a timeout then the answer is: Yes
        var callNow = immediate && !timeout;

        // This is the basic debounce behaviour where you can call this 
        //   function several times, but it will only execute once 
        //   [before or after imposing a delay]. 
        //   Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);

        // Set the new timeout
        timeout = setTimeout(function() {

            // Inside the timeout function, clear the timeout variable
            // which will let the next execution run when in 'immediate' mode
            timeout = null;

            // Check if the function already ran with the immediate flag
            if (!immediate) {
                // Call the original function with apply
                // apply lets you define the 'this' object as well as the arguments 
                //    (both captured before setTimeout)
                func.apply(context, args);
            }
        }, wait);

        // Immediate mode and no wait timer? Execute the function..
        if (callNow) func.apply(context, args);
    };
}
