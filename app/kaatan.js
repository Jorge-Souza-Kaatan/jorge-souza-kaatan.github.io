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
        //BOTTOMBAR.sty
        let _ = document.createElement("span")

        BOTTOMBAR.style.display = "grid";
        BOTTOMBAR.style.gridTemplateColumns = "1fr 1fr";
        BOTTOMBAR.style.padding = "5px";
        BOTTOMBAR.style.gap = "5px";
        let prevButton = document.createElement("card-big");
        prevButton.style.textAlign = "center";
        prevButton.innerText = "Anterior"
        let nextButton = document.createElement("card-big");
        nextButton.style.textAlign = "center";
        nextButton.innerText = "Próximo";
        let posts = Content.LoadJSON("blog.json");
        BOTTOMBAR.appendChild(prevButton);
        BOTTOMBAR.appendChild(nextButton);
    },
    LOOP: () => {
        Renderer.Layout.Verify();
    }
}