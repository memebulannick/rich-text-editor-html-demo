let fontName = document.getElementById("fontName");
let toolButtons = document.querySelectorAll(".toolbar-item");
let advanceToolButtons = document.querySelectorAll(".adv-toolbar-item");
let formatButtons = document.querySelectorAll(".format");
let linkButton = document.getElementById("createLink");
let inputContent = document.getElementById("text-input");
let htmlButton = document.getElementById("html-button");
let htmlDisplay = document.getElementById("html-content")

var htmlContent = "";

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Comic Sans MS",
    "Poppins",
    "Monospace",
];

//Function for the "Get HTML" button to display the innerhtml of the text-input area
htmlButton.addEventListener("click", function() {
    htmlContent = inputContent.innerHTML;
    htmlDisplay.style.display = "block";
    var breakSplit = htmlContent.split("><");
    var newDisplay = ""
    console.log("Length: " +breakSplit.length);
    for(var i=0; i<breakSplit.length; i++){
        console.log(breakSplit[i]);
        if(i == breakSplit.length - 1){
            newDisplay = newDisplay + breakSplit[i];
        }else{
            newDisplay = newDisplay + breakSplit[i] + ">\n<";
        }
    }
    htmlDisplay.textContent = newDisplay;
    //htmlDisplay.textContent = htmlContent;
});

inputContent.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // event.preventDefault();
        //insertBreakOnSelection("text-input");
    }
});

const initializer = () => {
    //function calls for highlighting buttons
    //No highlights for link, unlink,lists since they are one time operations
    highlighter(formatButtons, false);

    //create options for font names
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //set font family to initial font family
    inputContent.style.fontFamily = fontName[0].value;
};

//Main logic
const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
};

//For basic operations which don't need value parameter
toolButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});


//options that require value parameter (e.g link, fonts)
advanceToolButtons.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
}); 

//create link function
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    //if link has http then pass directly else add https
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            //needsRemoval = true means only one button should be highlight and other would be normal
            if (needsRemoval) {
                let alreadyActive = false;

            //If currently clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }

            //Remove highlight from other buttons
                highlighterRemover(className);
                if (!alreadyActive) {
                    //highlight clicked button
                    button.classList.add("active");
                }
            } else {
            //if other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
    });
};

//Remove Highlight function
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

//function to set selection to end of document
const setSelectionToEnd = (contentId) => {
    const el = document.getElementById(contentId);
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(el);
    range.collapse(false);
    selection.addRange(range);
    el.focus();
};

//function to insert break on current position of selection
// const insertBreakOnSelection = (contentId) => {
//     let element = document.getElementById(contentId);
//     let currentPosition = window.getSelection().anchorOffset;
//     let trimmed = element.innerHTML.trim().replace(/&nbsp;/g, '');
//     element.innerHTML = trimmed.slice(0,currentPosition) + "</br>" + trimmed.slice(currentPosition, trimmed.length);
//     console.log(element.innerHTML);
//     //console.log(trimmed.slice(0,currentPosition) + "</br>" + trimmed.slice(currentPosition, trimmed.length));
// }

window.onload = initializer();