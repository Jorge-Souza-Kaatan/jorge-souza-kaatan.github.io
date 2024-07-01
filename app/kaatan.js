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
    News: async () => {
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
        BOTTOMBAR.appendChild(prevButton);
        BOTTOMBAR.appendChild(nextButton);

        let posts = [];
        let i = 0;
        posts = await Content.LoadJSON("https://kaatan.loophole.site/cdn/blog/blog.json");
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
            if(i > 0) {
                i--;
                renderPost();
            }
        }
        function nextPost() {
            if(i < posts.length - 1) {
                i++;
                renderPost();
            }
        }
        renderPost();
    },
    LOOP: () => {
        Renderer.Layout.Verify();
    }
}