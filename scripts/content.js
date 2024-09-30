function waitForElements(selector) {
  return new Promise(resolve => {
    if (document.querySelectorAll(selector).length > 0) {
      return resolve(document.querySelectorAll(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelectorAll(selector).length > 0) {
        observer.disconnect();
        resolve(document.querySelectorAll(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

const observer = new MutationObserver(mutationList => {
  for (const mutation of mutationList) { // go through all the mutations
    if (mutation.type === "childList" && ( mutation.addedNodes[0]?.matches?.("colab-tab") ?? false )) { // if the mutation type refers to a childList change
        if ( mutation.addedNodes[0]?.matches?.("colab-tab") ?? false ) {
          mutation.addedNodes[0].children[0].children[0].children[0].textContent = mutation.addedNodes[0].children[0].children[0].children[0].textContent.replace(/(_)/g, '');
        }
    } else if (mutation.type === "attributes") { // if the mutation type refers to the atributes of the observed element changing 
    }
  }
});

waitForElements("div.tab-pane-container").then(elmList => {
  elmList.forEach(elm => {
    const targetNodes = observer.observe(elm, { childList: true, subtree: true})
  });
});