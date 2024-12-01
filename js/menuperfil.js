
// Selecionar elementos
const container = document.querySelector('.container-filho');;
const typewriterText = document.querySelector('.typewriter-text');
const cursor = document.querySelector('.cursor');
const typingSpeed = 100;
let typingTimeout; // Para controlar o typing
let contador = 0;

// Função de digitação
function typeWriter(element) {
    if (contador == 1) {
        console.log("entrou no typewriter");
        const text = element.getAttribute('texto');
        element.innerHTML = ''; // Reseta o texto
        let index = 0;
        cursor.style.display = 'inline-block'; // Garante que o cursor esteja visível

        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                typingTimeout = setTimeout(type, typingSpeed);
            } else {
                // Cursor continuará piscando após digitação
                cursor.style.display = 'inline-block';
            }
        }
        type();
    } else {
        console.log("saiu");
    }
}
const canvas = document.getElementById("riveCanvasMoldura");
const canvasmenu = document.getElementById("riveCanvasMenu");
const canvastexto = document.getElementById("riveCanvasTexto");
const toggleButton = document.getElementById("toggleButton");
const typewriterElement = document.querySelector('.typewriter');
// Carregar moldura.riv
const riveMoldura = new rive.Rive({
    src: "assets/moldura.riv",
    stateMachines: "anime",
    canvas: canvas,
    autoplay: true,
    onLoad: () => {
        // Obter inputs da State Machine
        const inputsMoldura = riveMoldura.stateMachineInputs("anime");
        const desligadaInput = inputsMoldura.find(input => input.name === "desligou");
        const ligadaInput = inputsMoldura.find(input => input.name === "ligou");

        // Monitorar alterações nos estados de moldura.riv
        riveMoldura.on("statechange", () => {
            if (ligadaInput.value) {
                console.log(contador);
                canvas.classList.add("center");
                canvas.classList.remove("canvas-move-moldura");
                // aciona efeito de digitação do texto
                typewriterElement.style.visibility = 'visible';
                typewriterElement.style.display = 'block'

                canvastexto.style.visibility = 'visible';
                canvastexto.style.display = 'block'
                // Animar o crescimento do container
                const container = document.querySelector('.container-filho');
                container.style.width = '80%';
                container.style.height = '65%';
               
                setTimeout(() => typeWriter(typewriterText), 1000);
                contador += 1;
                // Sincronizar com menu.riv
                if (riveInstancemenu) {
                    const ligadoMenu = riveInstancemenu.stateMachineInputs("menuPerfil")
                        .find(input => input.name === "ligarPerfil");
                    if (ligadoMenu) ligadoMenu.value = true; // Ativar no menu.riv
                }
                
                setTimeout(() => {
                    if (riveInstanceTexto) {
                        const ligadoMenuTexto = riveInstanceTexto.stateMachineInputs("animaContainer")
                            .find(input => input.name === "abrirContainer");
                        if (ligadoMenuTexto) ligadoMenuTexto.value = true; // Ativar no menu.riv
                    }
                }, 1000); 
            }
            if (desligadaInput.value) {
                contador = 0;
                canvas.classList.remove("center");
                canvas.classList.add("canvas-move-moldura");
                //retirar o texto principal
                typewriterElement.style.display = 'none';
                canvastexto.style.display = 'none';
                //canvastexto.style.display = 'none';
                typewriterElement.querySelector('.typewriter-text').innerHTML = '';
                //retirar o container animado
                const container = document.querySelector('.container-filho');
                container.style.width = '0';
                container.style.height = '0';
                // Sincronizar com menu.riv
                if (riveInstancemenu) {
                    const ligadoMenu = riveInstancemenu.stateMachineInputs("menuPerfil")
                        .find(input => input.name === "ligarPerfil");
                    if (ligadoMenu) ligadoMenu.value = false; // Desativar no menu.riv
                }
                
                if (riveInstanceTexto) {
                    const ligadoMenuTexto = riveInstanceTexto.stateMachineInputs("animaContainer")
                        .find(input => input.name === "abrirContainer");
                    if (ligadoMenuTexto) ligadoMenuTexto.value = false; // Ativar no menu.riv
                }
            }
        });
    },

});
// Carregar menu.riv
const riveInstancemenu = new rive.Rive({
    src: "assets/menupe.riv",
    stateMachines: "menuPerfil",
    canvas: canvasmenu,
    autoplay: true,
    onLoad: () => {
        const inputsMenu = riveInstancemenu.stateMachineInputs("menuPerfil");
        const ligadoInputMenu = inputsMenu.find(input => input.name === "ligarPerfil");
    },
    onError: (error) => {
        console.error("Erro ao carregar o menu.riv:", error);
    },
});

const riveInstanceTexto = new rive.Rive({
    src: "assets/container.riv",
    stateMachines: "animaContainer",
    canvas: canvastexto,
    autoplay: true,
    onLoad: () => {
        const inputsMenuTexto = riveInstanceTexto.stateMachineInputs("animaContainer");
        const ligadoInputTexto = inputsMenuTexto.find(input => input.name === "abrirContainer");
    }
});

