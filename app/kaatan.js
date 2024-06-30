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
        let postsIndex = 0;
        posts = await Content.LoadJSON("blog.json");
        const container = document.getElementById("posts-list");

        for(const i = 0; i < posts.length; i++) {
            const cardBig = document.createElement("card-big");
            const title = document.createElement("text-heading");
            title.innerHTML = posts[i].Title;
            cardBig.appendChild(title);
            if(posts[i].Image) {
                const image = document.createElement("img");
                image.src = posts[i].Image;
                cardBig.appendChild(image);
            }
            const content = document.createElement("text-paragraph");
            content.innerHTML = posts[i].Content;
            cardBig.appendChild(content);
            //
            if(posts[i].Link) {
                const link = document.createElement("buttom-squared");
                link.innerHTML = posts[i].Link.Title;
                link.onclick = () => window.open(posts[i].Link);
                cardBig.appendChild(image);
            }
            container.appendChild(cardBig);
        }
    },
    LOOP: () => {
        Renderer.Layout.Verify();
    }
}