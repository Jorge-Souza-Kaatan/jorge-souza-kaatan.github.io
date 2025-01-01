const App = {
    Main: async (callback) => {
        // Main-menu functions
        document.getElementById("topbar-logo").onclick = () => window.location.href = "/";
        document.getElementById("main-btn-1").onclick = () => {
            Modal.Message("Aguarde", "Temos uma plataforma de cursos quentinha saindo do forno! Retorne em breve para mais novidades.");
        };
        document.getElementById("main-btn-2").onclick = () => window.location = "/radio.html";
        document.getElementById("main-btn-3").onclick = () => window.location.href = "/blog.html";
        document.getElementById("main-btn-4").onclick = () => window.location.href = "/anuncio.html";
        document.getElementById("main-btn-5").onclick = () => window.location.href = "/sobre.html";

        document.getElementById("main-btn-6").onclick = () => { };
        document.getElementById("main-btn-7").onclick = () => { };
        document.getElementById("main-btn-8").onclick = () => { };

        // Quotes
        const url = "https://kaatan-server.azurewebsites.net/kaatanserver/quote/";
        const quote = await fetch(url).then(x => x.json());
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors"
            });
            const quote = (await response.text()).replaceAll("\\r", "").replaceAll('"', '');
            console.log(quote);
            document.getElementById("menu-quote").textContent = quote;
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
        if (callback) callback();
    },
    Ads: async () => {
        await Renderer.Load("ads", APPVIEW);
    },
    News: async () => {
        await Renderer.Load("news", APPVIEW);
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
        BOTTOMBAR.appendChild(prevButton);
        BOTTOMBAR.appendChild(nextButton);

        let posts = [];
        let i = 0;
        posts = await Content.LoadJSON("blog/blog.json");
        console.log(posts)
        const container = document.getElementById("posts-list");

        function renderPost() {
            container.innerHTML = "";

            const cardBig = document.createElement("card-big");
            cardBig.classList.add("no-hover");
            cardBig.classList.add("no-elastic");
            const title = document.createElement("text-heading");
            title.innerHTML = posts[i].Title;
            cardBig.appendChild(title);
            if (posts[i].Image) {
                const image = document.createElement("img");
                image.style.width = "100%";
                image.style.boxShadow = "0 0 5px #00DD8877";
                image.src = posts[i].Image;
                cardBig.appendChild(image);
            }
            const content = document.createElement("text-paragraph");
            content.innerHTML = posts[i].Content;
            cardBig.appendChild(content);
            //
            if (posts[i].Link) {
                const link = document.createElement("button-squared");
                link.textContent = posts[i].Link.Title;
                link.onclick = () => window.open(posts[i].Link.URL);
                cardBig.appendChild(link);
            }
            container.appendChild(cardBig);

            updateNavigationButtons();
        }

        //

        function updateNavigationButtons() {
            if (i === 0) {
                prevButton.style.opacity = 0.3;
                prevButton.removeEventListener("click", prevPost);
            } else {
                prevButton.style.opacity = 1;
                prevButton.addEventListener("click", prevPost);
            }

            if (i === posts.length - 1) {
                nextButton.style.opacity = 0.3;
                nextButton.removeEventListener("click", nextPost);
            } else {
                nextButton.style.opacity = 1;
                nextButton.addEventListener("click", nextPost);
            }
        }

        //

        function prevPost() {
            if (i > 0) {
                i--;
                renderPost();
            }
        }
        function nextPost() {
            if (i < posts.length - 1) {
                i++;
                renderPost();
            }
        }
        renderPost();
    },
    About: async () => {
        await Renderer.Load("about", APPVIEW);
    },
    Radio: async () => {
        await Renderer.Load("radio", APPVIEW);
        Renderer.Load("bottom-bar", BOTTOMBAR);
    },
    Help: async () => {
        await Renderer.Load("support", APPVIEW);
    },
    Rules: async () => {
        await Renderer.Load("rules", APPVIEW);
    },
    AddTrackRequest: async () => {
        await Renderer.Load("add-request", APPVIEW);
    },
    RemoveTrackRequest: async () => {
        await Renderer.Load("remove-request", APPVIEW);
    },
    Terms: async () => {
        await Renderer.Load("terms", APPVIEW);
    },
    PlayRadio: () => {
        if (Radio.Stream()) {
            document.getElementById("paused").style.display = "none";
            document.getElementById("playing").style.display = "block";
            document.getElementById("play-btn-img").src = "https://kaatan.azurewebsites.net/files/pause.svg";
            Tooltip.Toast("Iniciando Rádio Kaatan, aguarde...", 5);
        } else {
            document.getElementById("paused").style.display = "none";
            document.getElementById("playing").style.display = "block";
            document.getElementById("play-btn-img").src = "https://kaatan.azurewebsites.net/files/play.svg";
        }
    },
    MuteRadio: () => {
        if (Radio.Volume == 1) {
            console.log(Radio.Volume);
            Radio.Mute(true);
            document.getElementById("mute-btn-img").src = "https://kaatan.azurewebsites.net/files/mute.svg";
        } else {
            console.log(Radio.Volume);
            Radio.Mute(false);
            document.getElementById("mute-btn-img").src = "https://kaatan.azurewebsites.net/files/volume.svg";
        }
    },
    _: async () => { },
};