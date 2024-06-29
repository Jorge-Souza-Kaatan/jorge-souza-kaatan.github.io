const App = {
    Main: async (callback) => {
        setTimeout(() => {
            try { document.body.removeChild(document.getElementById("splash-screen")); } catch { }
        }, 2999);
        if (window.location.pathname != "/") setInterval(App.LOOP, 999);
        if (callback) callback();
    },
    Home: () => {
        Renderer.Load("home").then(home => {
            const container = document.createElement("acacia-container");
            container.innerHTML = home;
            document.body.appendChild(container)
        });
    },
    About: () => {
        Renderer.Load("about").then(about => {
            APPVIEW.innerHTML = about;
        });
    },
    Support: () => {
        Renderer.Load("support").then(support => {
            APPVIEW.innerHTML = support;
        });
    },
    Ads: () => {
        Renderer.Load("ads").then(ads => {
            APPVIEW.innerHTML = ads;
        });
    },
    News: () => {
        Renderer.Load("news").then(news => {
            APPVIEW.innerHTML = news;
        });
    },
    LOOP: () => {
        Renderer.Layout.Verify();
    }
}