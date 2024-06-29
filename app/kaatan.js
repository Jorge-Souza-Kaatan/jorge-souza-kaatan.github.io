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
    News: () => {
        //Renderer.Layout.Verify();
    },
    LOOP: () => {
        Renderer.Layout.Verify();
    }
}