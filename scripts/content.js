// dictates how matching strings using regex is replaced
function blankSpaceReplacer(match, p1, p2) {
  return p2;
};

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const observerCallback = (mutationList, observer) => {
  for (const mutation of mutationList) { // go through all the mutations
    if (mutation.type === "childList" && ( mutation.addedNodes[0]?.matches?.("colab-tab") ?? false )) { // if the mutation type refers to a childList change
        if ( mutation.addedNodes[0]?.matches?.("colab-tab") ?? false ) {
            console.log("A child node has been added or removed.");
            console.log(mutation.addedNodes[0].children[0].children[0].children[0].textContent);
            mutation.addedNodes[0].children[0].children[0].children[0].textContent = mutation.addedNodes[0].children[0].children[0].children[0].textContent.replace(/(_)(\w)/g, blankSpaceReplacer);
        }
    } else if (mutation.type === "attributes") { // if the mutation type refers to the atributes of the observed element changing 
    //   console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observerCallback);

// Select the node that will be observed for mutations

const targetNodes = document.querySelectorAll("div.tab-pane-container").forEach((i) => {
    if (i) {
        observer.observe(i, config) // Start observing the target node for configured mutations
    }
});
