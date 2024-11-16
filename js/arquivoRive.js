const layout = new rive.Layout({});
        const riveInstance = new rive.Rive({
            src: "assets/moldura.riv",
            stateMachines: "anime",
            canvas: document.getElementById("riveCanvas"),
            layout: layout,
            autoplay: true,
        },
    )