export function getAllTabs() : Promise<chrome.tabs.Tab[]>
{
    return new Promise<chrome.tabs.Tab[]>((resolve,reject) => {
        chrome.tabs.query({}, tabs => resolve(tabs));
    });
}

export function getBackgroundPage() : Promise<Window>
{
    return new Promise<Window>((resolve, reject) => {
        chrome.runtime.getBackgroundPage(page => resolve(page));
    });
}

export function getActiveTab() : Promise<chrome.tabs.Tab>
{
    return new Promise<chrome.tabs.Tab>((resolve, reject) => {           
        chrome.tabs.query({active: true, currentWindow: true}, tabs =>  resolve(tabs[0]));
    }); 
}

export function sendMessage<T>(tab:chrome.tabs.Tab, message:any) : Promise<T>
{
    return new Promise<T>((resolve, reject) => {           
        chrome.tabs.sendMessage(tab.id, message, response => {
            resolve(response);
        });
    }); 
}