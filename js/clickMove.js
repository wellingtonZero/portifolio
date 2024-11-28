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


const canvasmenu = document.getElementById('riveCanvasMenu');
const toggleButton = document.getElementById("toggleButton");

const riveInstancemenu = new rive.Rive({
    src: "assets/menu.riv",
    stateMachines: "menuanime",
    canvas: canvasmenu,
    autoplay: true,
    onLoad: () => {
        console.log("Rive carregado com sucesso!");

        // Obter as entradas da State Machine
        const stateMachineInputs = riveInstancemenu.stateMachineInputs("menuanime");
        const ligadoInput = stateMachineInputs.find(input => input.name === "ligado");

        if (ligadoInput) {
            console.log("Input 'ligado' encontrado:", ligadoInput);

            // Alternar o booleano 'ligado' ao clicar no botão
            toggleButton.addEventListener("click", () => {
                ligadoInput.value = !ligadoInput.value; // Inverter o valor do booleano
                toggleButton.textContent = ligadoInput.value ? "Desativar" : "Ativar"; // Atualizar o texto do botão
            });
        } else {
            console.error("Input 'ligado' não encontrado na State Machine 'animeMenu'.");
        }
    },
    onError: (error) => {
        console.error("Erro ao carregar o Rive:", error);
    },
});