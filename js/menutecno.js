
// Selecionar elementos
const container2 = document.querySelector('.container-filho-tecno');;
const typewriterText2 = document.querySelector('.typewriter-text');
const cursor2 = document.querySelector('.cursor');
const typingSpeed2 = 100;
let typingTimeout2; // Para controlar o typing
let contador2 = 0;

// Função de digitação
function typeWriter(element) {
    if (contador2 == 1) {
        console.log("entrou no typewriter");
        const text = element.getAttribute('texto');
        element.innerHTML = ''; // Reseta o texto
        let index = 0;
        cursor2.style.display = 'inline-block'; // Garante que o cursor esteja visível

        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                typingTimeout2 = setTimeout(type, typingSpeed);
            } else {
                // Cursor continuará piscando após digitação
                cursor2.style.display = 'inline-block';
            }
        }
        type();
    } else {
        console.log("saiu");
    }
}
const canvas2 = document.getElementById("riveCanvasMolduraTecno");
const canvasmenu2 = document.getElementById("riveCanvasMenuTecno");
const canvastexto2 = document.getElementById("riveCanvasTextoTecno");
const toggleButton2 = document.getElementById("toggleButton");
const typewriterElement2 = document.querySelector('.typewriter');
// Carregar moldura.riv
const riveMoldura2 = new rive.Rive({
    src: "assets/moldura.riv",
    stateMachines: "anime",
    canvas: canvas2,
    autoplay: true,
    onLoad: () => {
        // Obter inputs da State Machine
        const inputsMoldura2 = riveMoldura2.stateMachineInputs("anime");
        const desligadaInput2 = inputsMoldura2.find(input => input.name === "desligou");
        const ligadaInput2 = inputsMoldura2.find(input => input.name === "ligou");

        // Monitorar alterações nos estados de moldura.riv
        riveMoldura2.on("statechange", () => {
            if (ligadaInput2.value) {
                console.log(contador);
                canvas2.classList.add("center-tecno");
                canvas2.classList.remove("canvas-move-moldura");
                // aciona efeito de digitação do texto
                typewriterElement2.style.visibility = 'visible';
                typewriterElement2.style.display = 'block'

                canvastexto2.style.visibility = 'visible';
                canvastexto2.style.display = 'block'
                // Animar o crescimento do container
                const container2 = document.querySelector('.container-filho-tecno');
                container2.style.width = '80%';
                container2.style.height = '65%';
               
                setTimeout(() => typeWriter(typewriterText2), 1000);
                contador2 += 1;
                // Sincronizar com menu.riv
                if (riveInstancemenu2) {
                    const ligadoMenu2 = riveInstancemenu2.stateMachineInputs("menuPerfil")
                        .find(input => input.name === "ligarPerfil");
                    if (ligadoMenu2) ligadoMenu2.value = true; // Ativar no menu.riv
                }
                
                setTimeout(() => {
                    if (riveInstanceTexto2) {
                        const ligadoMenuTexto2 = riveInstanceTexto2.stateMachineInputs("animaContainer")
                            .find(input => input.name === "abrirContainer");
                        if (ligadoMenuTexto2) ligadoMenuTexto2.value = true; // Ativar no menu.riv
                    }
                }, 1000); 
            }
            if (desligadaInput2.value) {
                contador2 = 0;
                canvas2.classList.remove("center-tecno");
                canvas2.classList.add("canvas-move-moldura-tecno");
                //retirar o texto principal
                typewriterElement2.style.display = 'none';
                canvastexto2.style.display = 'none';
                //canvastexto.style.display = 'none';
                typewriterElement2.querySelector('.typewriter-text').innerHTML = '';
                //retirar o container animado
                const container2 = document.querySelector('.container-filho-tecno');
                container2.style.width = '0';
                container2.style.height = '0';
                // Sincronizar com menu.riv
                if (riveInstancemenu2) {
                    const ligadoMenu2 = riveInstancemenu2.stateMachineInputs("menuPerfil")
                        .find(input => input.name === "ligarPerfil");
                    if (ligadoMenu2) ligadoMenu2.value = false; // Desativar no menu.riv
                }
                
                if (riveInstanceTexto2) {
                    const ligadoMenuTexto2 = riveInstanceTexto2.stateMachineInputs("animaContainer")
                        .find(input => input.name === "abrirContainer");
                    if (ligadoMenuTexto2) ligadoMenuTexto2.value = false; // Ativar no menu.riv
                }
            }
        });
    },

});
// Carregar menu.riv
const riveInstancemenu2 = new rive.Rive({
    src: "assets/menupe.riv",
    stateMachines: "menuPerfil",
    canvas: canvasmenu2,
    autoplay: true,
    onLoad: () => {
        const inputsMenu2 = riveInstancemenu2.stateMachineInputs("menuPerfil");
        const ligadoInputMenu2 = inputsMenu2.find(input => input.name === "ligarPerfil");
    },
    onError: (error) => {
        console.error("Erro ao carregar o menu.riv:", error);
    },
});

const riveInstanceTexto2 = new rive.Rive({
    src: "assets/container.riv",
    stateMachines: "animaContainer",
    canvas: canvastexto2,
    autoplay: true,
    onLoad: () => {
        const inputsMenuTexto2 = riveInstanceTexto2.stateMachineInputs("animaContainer");
        const ligadoInputTexto2 = inputsMenuTexto2.find(input => input.name === "abrirContainer");
    }
});

