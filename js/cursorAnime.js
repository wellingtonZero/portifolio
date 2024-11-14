const text = "Sou Desenvolvedor de Front-End."; // Texto a ser exibido
const typingSpeed = 100; // Velocidade da digitação em milissegundos
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("text").innerHTML += text.charAt(index); // Adiciona uma letra ao texto
        index++;
        setTimeout(typeWriter, typingSpeed); // Aguarda e chama a função novamente para a próxima letra
    }
}

typeWriter();