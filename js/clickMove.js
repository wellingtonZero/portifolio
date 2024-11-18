const canvas = document.getElementById('riveCanvas');
        const layout = new rive.Layout({});
        const riveInstance = new rive.Rive({
            src: "assets/moldura.riv",
            stateMachines: "anime",
            canvas: document.getElementById("riveCanvas"),
            layout: layout,
            autoplay: true,
            onLoad: () => {
                // Obter as entradas da State Machine
                const stateMachineInputs = riveInstance.stateMachineInputs("anime");
                const desligada = stateMachineInputs.find(input => input.name === "desligou");
                const ligada = stateMachineInputs.find(input => input.name === "ligou");

                // Atualizar estado com base nas entradas
                riveInstance.on('statechange', (event) => {
                    if (desligada.value) {
                        canvas.classList.add("canvas-move");
                    } else if (ligada.value) {
                        canvas.classList.remove("canvas-move");
                    }
                });
            },
        });