const Renderer = {
    Load: async (viewName) => {
        return new Promise((resolve, reject) => {
            fetch(`views/${viewName}`)
                .then(response => response.text()).then(htmlContent => {
                    resolve(htmlContent);
                }).catch(() => {
                    reject(null);
                });
        })
    },

    //#region UI
    Home: async () => {
        Renderer.Load("home").then(home => {
            window.APPVIEW.innerHTML = home;
            Renderer.Layout.MainTopBar();
        });
    },
    Search: async () => { alert("Search"); },
    Chat: async () => { alert("Chat"); },
    ThreeD: async () => { alert("ThreeD"); },
    Courses: async () => { alert("Courses"); },
    Radio: async () => { alert("Radio"); },
    Ads: async () => { alert("Ads"); },
    MyProfile: async () => {
        alert("MyProfile");
    },
    Notifications: async () => {
        alert("Notifications");
    },
    Settings: async () => {
        alert("Settings");
    },
    News: async () => {
        // Redirect to other app
        alert("News");
    },
    ChatPlus: async () => {
        // Redirect to other app
        alert("ChatPlus");
    },
    Help: async () => {
        alert("Help");
    },
    //#endregion

    Layout: {
        PortraitLayout: true,
        SideMenuVisible: false,
        Verify: () => {
            if (window.innerWidth > window.innerHeight) {
                Renderer.Layout.Landscape();
            } else {
                Renderer.Layout.Portrait();
            }
        },
        Landscape: () => {
            document.getElementById("app").style.gridTemplateColumns = "20vw 60vw 20vw";
            document.getElementById("app-view").style.gridColumn = "2";
            document.getElementById("left-bar").style.display = "flex";
            document.getElementById("right-bar").style.display = "flex";
        },
        Portrait: () => {
            document.getElementById("app").style.gridTemplateColumns = "100vw";
            document.getElementById("app-view").style.gridColumn = "1";
            document.getElementById("left-bar").style.display = "none";
            document.getElementById("right-bar").style.display = "none";
        },
        ShowSideMenu: () => {
            alert("ShowSideMenu")
        },
        MainTopBar: () => {
            window.TOPBAR.innerHTML = "";
            const ids = ["menu-kt-logo", "", "menu-profile-pic", "menu-learn-pic", "menu-mini"];
            const imgsSrc = ["/files/conjunto_branco.svg", "", "/files/default.svg", "/files/book.svg", "/files/menumini.svg"];
            const actions = ["Home", "", "MyProfile", "MyLearning", ""];
            for (let i = 0; i < 5; i++) {
                const span = document.createElement("span");
                if (ids[i] != "") span.id = ids[i];
                if (i > 1) span.classList.add("menu-button");
                if (actions[i] != "") span.onclick = Renderer[actions[i]];

                const img = document.createElement("img");
                if (imgsSrc[i] != "") {
                    img.src = imgsSrc[i];
                    span.appendChild(img);
                }

                window.TOPBAR.appendChild(span);
            }

            document.getElementById("menu-mini").onclick = Renderer.Layout.ShowSideMenu;
            document.getElementById("menu-profile-pic").onmouseover = () => Tooltip.Tooltip("Meu perfil", document.getElementById("menu-profile-pic"));
            document.getElementById("menu-learn-pic").onmouseover = () => Tooltip.Tooltip("Meu aprendizado", document.getElementById("menu-learn-pic"));

        },
        BackTopBar: (callback = () => { }) => {
            window.TOPBAR.innerHTML = "";
            const ids = ["menu-back-btn", "", "menu-profile-pic", "menu-learn-pic", "menu-mini"];
            const imgsSrc = ["/files/arrow.svg", "", "/files/default.svg", "/files/book.svg", "/files/menumini.svg"];
            const actions = ["", "", "MyProfile", "MyLearning", ""];
            for (let i = 0; i < 5; i++) {
                const span = document.createElement("span");
                if (ids[i] != "") span.id = ids[i];
                if (i > 1) span.classList.add("menu-button");
                if (actions[i] != "") span.onclick = Renderer[actions[i]];

                const img = document.createElement("img");
                if (imgsSrc[i] != "") {
                    img.src = imgsSrc[i];
                    span.appendChild(img);
                }

                window.TOPBAR.appendChild(span);
            }

            document.getElementById("menu-mini").onclick = Renderer.Layout.ShowSideMenu;
            document.getElementById("menu-back-btn").onclick = callback;
            document.getElementById("menu-profile-pic").onmouseover = () => Tooltip.Tooltip("Meu perfil", document.getElementById("menu-profile-pic"));
            document.getElementById("menu-learn-pic").onmouseover = () => Tooltip.Tooltip("Meu aprendizado", document.getElementById("menu-learn-pic"));
        },
    }
}