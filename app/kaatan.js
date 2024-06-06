//#region GLOBAL
const State = {
    HTTPServer: (path = "") => { return "http://localhost:3002" + path },
    LoadJSON: async (path) => {
        return new Promise((resolve, reject) => {
            fetch(path)
                .then(response => response.json()).then(data => {
                    resolve(data);
                }).catch(() => {
                    reject(null);
                });
        })
    },
}

const HTTP = {
    Get: async (path) => {
        let res = await fetch(State.HTTPServer(path), {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await res.json();
    },
    Post: async (path, _body) => {
        let res = await fetch(State.HTTPServer(path), {
            method: "POST",
            body: JSON.stringify(_body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await res.json();
    },
}
//#endregion

const App = {
    Main: async () => {
        setTimeout(() => {
            try { document.body.removeChild(document.getElementById("splash-screen")); } catch { }
        }, 2999);
        Renderer.Home();
        setInterval(App.LOOP, 999);
    },
    LOOP: () => {
        Renderer.Layout.Verify();
        // Search notifications and messages
    }
}