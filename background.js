// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log(tab.url + " tab ")
//     chrome.scripting.executeScript({
//         target: {tabId: tabId},
//         files: ["./foreground.js"]
//     })
//         .then(() => {
//             console.log("INJECTED THE FOREGROUND SCRIPT.");
//         })
//         .catch(err => console.log(err));
//
// });

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('inject button')
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello") {
            chrome.action.setBadgeText({text: '1'});
            chrome.action.setBadgeBackgroundColor({color: '#f14646'});
        } else {
            chrome.action.setBadgeText({text: ''});
            chrome.action.setBadgeBackgroundColor({color: '#f14646'});
        }
    }
);

chrome.action.onClicked.addListener(tab => {
    var url = 'https://dotsave.app/?url=' + (tab.url);
    if (url.indexOf('/pin/') > 0) {
        chrome.tabs.create({url: url});
    } else {
        chrome.tabs.create({url: 'https://dotsave.app/'});
    }
});

chrome.tabs.onActivated.addListener(activeInfo => {

    let queryOptions = {active: true, currentWindow: true};
    chrome.tabs.query(queryOptions).then(result => {

        if (result[0].url.indexOf('/pin/') > 0) {
            chrome.action.setBadgeText({text: '1'});
        } else {
            chrome.action.setBadgeText({text: ''});
        }
        chrome.action.setBadgeBackgroundColor({color: '#f14646'});
    })
});


async function getCurrentTab() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

