// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

// const helpPage = document.querySelectorAll("div.code-help");

// helpPage.forEach((element) => {
//     console.log(element.textContent);
// })

document.body.addEventListener('click', (e) => {
    // console.log(e.target);
    // Check if click was on a play button
    if(e.target.matches("colab-run-button")) {
        console.log("THIS WAS A COLLAB RUN BUTTON");
    } else {
        console.log("THIS WAS NOT NOT NOT NOT NOT A COLLAB RUN BUTTON");
    }
})

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const observerCallback = (mutationList, observer) => {
  for (const mutation of mutationList) { // go through all the mutations
    if (mutation.type === "childList" && ( mutation.addedNodes[0]?.matches?.("colab-tab") ?? false )) { // if the mutation type refers to a childList change
        
        if ( mutation.addedNodes[0]?.matches?.("colab-tab") ?? false ) {
            console.log("A child node has been added or removed.");
            console.log(mutation.addedNodes[0])
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
        // console.log(i);
    }
})
// console.log(targetNodes)