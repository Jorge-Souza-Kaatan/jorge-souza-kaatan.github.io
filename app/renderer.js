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
        });
    },
    Search: async () => { alert("Search"); },
    Chat: async () => {
        Modal.Message("Kaatan Chat", `
            Em breve você encontrará aqui:<br>
            Uma aplicação de comunicação por texto, voz, vídeo e chamada completa com salas de bate-papo, postagens, contatos e muito mais!
        `);
        Renderer.Home();
    },
    ThreeD: async () => {
        Modal.Message("Mundo Kaatan", `
            Em breve você encontrará aqui:<br>
            Um mundo virtual com salas 3D para você montar seu avatar, se divertir e conhecer gente nova.
            Uma aplicação de renderização 3D em tempo real para você testar seus modelos e cenários.
        `);
        Renderer.Home();
    },
    Courses: async () => {
        Modal.Message("Kaatan Cursos", `
            Em breve você encontrará aqui:<br>
            Uma plataforma de cursos online no setor de tecnologia onde você poderá aprender sua próxima profissão
            ou descobrir um hobbie novo.
        `);
        Renderer.Home();
    },
    Radio: async () => {
        Modal.Message("Rádio Kaatan", `
            Em breve você encontrará aqui:<br>
            A nossa querida rádio com as melhores trilhas sonoras nacionais de todos os tempos! 
        `);
        Renderer.Home();
    },
    Ads: async () => {
        Modal.Message("Anúncios", `
            Em breve você encontrará aqui:<br>
            Um sistema de anúncios simplificado para que você divulgue sua marca em nossos serviços.
        `);
        Renderer.Home();
    },
    MyProfile: async () => {
        Modal.Message("Meu Perfil", `
            Em breve você encontrará aqui:<br>
            Crie, edite ou atualize seu perfil em nossa plataforma.
        `);
        Renderer.Home();
    },
    Notifications: async () => {
        Modal.Message("Notificações", `
            Em breve você encontrará aqui:<br>
            Visualize as notificações e atualizações mais importantes que você recebeu recentemente em nossa plataforma.
        `);
        Renderer.Home();
    },
    News: async () => {
        Modal.Message("Blog Kaatan", `
            Em breve você encontrará aqui:<br>
            As últimas novidades sobre os nossos serviços você encontra aqui.
        `);
        Renderer.Home();
    },
    ChatPlus: async () => {
        Modal.Message("Kaatan Chat+", `
            Em breve você encontrará aqui:<br>
            Uma aplicação de chat corporativo, profissional e elegante para sua equipe.
        `);
        Renderer.Home();
    },
    Help: async () => {
        Modal.Message("Ajuda", `
            Em breve você encontrará aqui:<br>
            Aprenda como nossos serviços funcionam e encontre suporte.
        `);
        Renderer.Home();
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