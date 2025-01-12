const doc = document.getElementById.bind(document);
const query = document.querySelector.bind(document);

// user object moet gemaakt worden vanuit chrome.storage.sync

var snooze = ms => new Promise(res => setTimeout(res, ms));
function login() {
    const currentUrl = window.location.href;
    chrome.storage.sync.get(['usernumber', 'password'], async function (result) {
       
        if (currentUrl.includes('accounts.magister.net')) {
            await waitForSel("#username");

            if (doc("username") && result.usernumber) {
                doc("username").value = result.usernumber;
                doc("username").dispatchEvent(new Event("input"));
            };

            await waitForSel("#username_submit")
            if (doc("username_submit")) {
                doc("username_submit").click();
            };

            await waitForSel("#password")

            if (doc("password") && result.password) {
                doc("password").value = result.password;
                doc("password").dispatchEvent(new Event("input"));
            };

            await waitForSel("#password_submit")
            if (doc("password_submit")) {
                doc("password_submit").click();
            };
        };
        if (currentUrl.includes('sso.ssc.college')) {
            // Autofill on sso.ssc.college

            await waitForSel("#passwordInput")
            await waitForSel("#submitButton")

            if (doc("passwordInput") && doc("submitButton")) {
                doc("passwordInput").value = result.password;
                doc("submitButton").click();
            }
        } 
        if (currentUrl.includes('login.microsoftonline.com')) {
        // Autofill on login.microsoftonline.com

            await waitForSel("#KmsiCheckboxField")
            await waitForSel("#idSIButton9")
        
            if (doc("KmsiCheckboxField") && doc("idSIButton9")) {
                doc("KmsiCheckboxField").click();
                doc("idSIButton9").click();
            }
        }
        if (currentUrl.includes('.itslearning.com')) {
            // Autofill on .itslearning.com
            const confirmButton = document.getElementsByClassName('h-box-sizing-bb ccl-button itsl-no-text-decoration itsl-native-login-button itsl-button-color-federated')[0]; 
            if (confirmButton) {
              confirmButton.click();
            }
        
            await waitForSel("#AutoLogout")
            if (doc("AutoLogout")) {
                doc("AutoLogout").remove()
            }
          }
    });
}

function waitForSel(s) {
    return new Promise(res => {
        setInterval(() => {
            if (query(s)) {
                res()
            }
        }, 10);
    });
};

chrome.storage.sync.get(['enabled'], function (result){
    if(result.enabled){
        login();
    };
});



