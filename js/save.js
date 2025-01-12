const doc = document.getElementById.bind(document);
const queryAll = document.querySelectorAll.bind(document);

doc("save").addEventListener("click", save);
doc("togglePassword").addEventListener("click", togglePassword);

queryAll(".login").forEach(s => {
    s.addEventListener("keydown", e => {
        if (e.key == "Enter") {
            if (e.target.id == "usernumber") {
                doc("password").focus()
            };
            if (e.target.id == "password") {
                save()
            };
        }
    });
});

function togglePassword() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    doc("password").setAttribute('type', type);
    this.classList.toggle('bi-eye');
};

function save() {

    var usernumber = doc("usernumber").value;
    var password = doc("password").value;
    
    try {
        chrome.storage.sync.set({
        "usernumber": usernumber,
        "password": password
        });

        doc("save").innerHTML = "Opgeslagen!"
    } catch (e) {
        doc("save").innerHTML = "Fout"
        doc("save").className = "btn btn-danger float-right"
    }
};

function onLoad() {
    chrome.storage.sync.get(['usernumber', 'password'], function (result) {
        if (result.usernumber !== undefined){
            
            doc("usernumber").value = result.usernumber
        };

        if (result.password !== undefined) {
            doc("password").value = result.password
        };
    });

    chrome.storage.sync.get(['enabled'], function (result) {
        doc("switch").checked = result.enabled
    });

    chrome.storage.sync.get(['darkmode'], function (result) {
        doc("dark-mode").checked = result.darkmode
        doc("dark-link").disabled = !doc("dark-mode").checked
    });

    doc("switch").addEventListener("click", toggle)
    doc("dark-mode").addEventListener("click", darkMode)
};

function toggle() {
    var checked = doc("switch").checked;
    chrome.storage.sync.set({
        "enabled": checked
    });


    chrome.action.setIcon({
        path: checked ? {
            "16": "/icons/On/16x.png",
            "32": "/icons/On/32x.png",
            "48": "/icons/On/48x.png",
            "128": "/icons/On/128x.png",
            "256": "/icons/On/256x.png"
        } : {
            "16": "/icons/Off/16x.png",
            "32": "/icons/Off/32x.png",
            "48": "/icons/Off/48x.png",
            "128": "/icons/Off/128x.png",
            "256": "/icons/Off/256x.png"
        }
    });
};

function darkMode() {
    chrome.storage.sync.set({
        "darkmode": doc("dark-mode").checked
    });
    
    doc("dark-link").disabled = !doc("dark-mode").checked

}

onLoad()