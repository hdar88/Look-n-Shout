(() => {
    fetch(chrome.runtime.getURL('boundaries.html')).then(response => response.text()).then(html => {
        const div = document.createElement('div');
        div.innerHTML = html;
        document.body.appendChild(div);

        // Load WebGazer
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('WebGazer/webgazer.js');
        script.onload = () => {
            const gazeScript = document.createElement('script');
            gazeScript.src = chrome.runtime.getURL('js/WebGazerWrapper.js');
            document.body.appendChild(gazeScript);
        };
        document.body.appendChild(script);
    }).catch(err => console.warn('Error loading overlay:', err));
})();