// Basic Configuration[Edit here]
var base = [{
    url:'https://evaly.com.bd',
    maps:[],
}];
var haspreloader = true;
var preloader_handle = 'button.absolute';
var depth = 3;


// parse Arguments
var args = process.argv.slice(2);


// Call Scraper
if (args.length == 1) {
    if (args[0] == "entire"){
        const entire = require('./entire/index');
        entire(base, haspreloader, preloader_handle, depth);
    } else if (args[0] == "simplified"){
        const simplified = require('./simplified/index');
        simplified(base, haspreloader, preloader_handle, depth);
    } else {
        console.log("Error: Invalid Command.\n\n");
    }
} else{
    console.log("Error: Invalid Command.\n\n");
}

// console.log(args);
