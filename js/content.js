// Load WebGazer by default
(() => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('WebGazer-master/www/webgazer.js');
    script.onload = () => {
        const gazeScript = document.createElement('script');
        gazeScript.src = chrome.runtime.getURL('js/WebGazerWrapper.js');
        document.body.appendChild(gazeScript);
    };
    document.body.appendChild(script);
})();
