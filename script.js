const botResponses = {
    combos: {
        keywords: ["combo", "hamburguesas", "tacos", "pizzas", "menú", "comida", "oferta", "menú del día", "paquete", "combo especial", "menu"],
        response: "Tenemos combos de hamburguesas, tacos y pizzas. ¿Te gustaría saber más sobre los detalles de nuestros combos o tal vez te interese ver nuestras promociones? Si tienes alguna otra duda, también puedo ayudarte con precios o reservas."
    },
    precios: {
        keywords: ["precio", "costar", "cuesta", "costo", "valor", "tarifa", "cuánto"],
        response: "Nuestros precios comienzan desde $50 MXN. Los precios pueden variar dependiendo del combo o producto. ¿Te gustaría saber los precios de algún combo específico? Si te interesa reservar o conocer los horarios, también puedo proporcionarte esa información."
    },
    reservar: {
        keywords: ["reservar", "reserva", "mesa", "apartado", "reservación", "guardar mesa"],
        response: "Puedes reservar mesa llamando al 555-1234 o directamente en nuestra página web. ¿Quieres hacer una reserva para alguna fecha en particular? Si necesitas saber más sobre precios o nuestros combos, también puedo ayudarte."
    },
    pago: {
        keywords: ["pago", "tarjeta", "efectivo", "transferencia", "tarjetas", "formas de pago", "pago en línea"],
        response: "Aceptamos efectivo, tarjetas de crédito y débito, y pagos por transferencia. Además, también puedes pagar en línea de forma segura. ¿Te gustaría saber más sobre nuestras opciones de pago o necesitas detalles sobre alguna otra parte de la tienda?"
    },
    horarios: {
        keywords: ["horarios", "horario", "abierto", "cierre", "cuando abren", "cuando cierran"],
        response: "Nuestro horario de atención es de 9:00 AM a 10:00 PM, todos los días. ¿Te gustaría saber más sobre los horarios en días especiales o cómo hacer un pedido durante esos horarios? Si necesitas información sobre combos o precios, también puedo ayudarte."
    },
    ubicacion: {
        keywords: ["ubicación", "ubicacion", "dirección", "dónde están", "dónde se encuentran", "dirección del restaurante"],
        response: "Nos encontramos en Calle 123, en el centro de la ciudad. Si necesitas saber cómo llegar o alguna referencia más, estaré feliz de ayudarte. Además, si deseas saber sobre nuestros combos o precios, no dudes en preguntar."
    },
    contacto: {
        keywords: ["contacto", "teléfono", "whatsapp", "correo", "información de contacto"],
        response: "Puedes contactarnos al teléfono 555-1234 o a través de WhatsApp al 555-5678. También puedes escribirnos por correo electrónico a contacto@restaurante.com. Si necesitas detalles sobre precios, combos o reservas, también puedo ayudarte."
    },
    delivery: {
        keywords: ["delivery", "envio", "a domicilio", "entrega a casa", "delivery disponible"],
        response: "Sí, ofrecemos servicio de entrega a domicilio. ¿Te gustaría saber cómo hacer un pedido a domicilio o qué combos están disponibles para entrega? Si tienes preguntas sobre precios o promociones, también puedo ayudarte."
    },
    ingredientes: {
        keywords: ["ingredientes", "alergias", "gluten", "vegetariano", "sin gluten", "sin lactosa"],
        response: "Si tienes alguna alergia o restricción alimentaria, por favor háznoslo saber. Tenemos opciones vegetarianas, sin gluten y sin lactosa. Si quieres saber más sobre los ingredientes de algún combo o sus precios, también puedo proporcionarte la información."
    },
    promociones: {
        keywords: ["promoción", "promocion", "descuento", "oferta", "rebaja", "oferta especial"],
        response: "Actualmente tenemos varias promociones, como 2x1 en hamburguesas los lunes y descuentos en combos familiares. ¿Te gustaría saber más sobre nuestras ofertas? Si tienes preguntas sobre precios o disponibilidad de combos, también puedo ayudarte."
    },
    contactoWhatsApp: {
        keywords: ["whatsapp", "mensaje", "contactar por whatsapp", "whatsapp disponible"],
        response: "¡Claro! Puedes contactarnos a través de WhatsApp al 555-5678. ¿Te gustaría hacer una consulta por ahí o prefieres preguntar por algún combo o reservar una mesa? Estoy aquí para lo que necesites."
    },
    default: "Lo siento, no entendí eso. ¿Puedes intentar con otras palabras? Si tienes alguna otra duda sobre nuestros combos, precios o servicios, ¡no dudes en preguntarme! 😊"
};

// Función para escribir el mensaje con un retraso
function typeMessage(element, message, speed = 100) {
    let i = 0;
    element.textContent = ''; // Limpiar el texto previo
    const intervalId = setInterval(() => {
        element.textContent += message[i];
        i++;
        if (i === message.length) {
            clearInterval(intervalId);
        }
    }, speed);
}

// Función para desactivar el botón de enviar
function disableSendButton() {
    const sendButton = document.getElementById("sendButton");
    sendButton.disabled = true; // Desactiva el botón
}

// Función para activar el botón de enviar
function enableSendButton() {
    const sendButton = document.getElementById("sendButton");
    sendButton.disabled = false; // Activa el botón
}

// Función para enviar el mensaje y desplazarse hacia abajo
function sendMessage() {
    const chatBody = document.getElementById("chatBody");
    const userInput = document.getElementById("userInput");
    const userMessage = userInput.value.toLowerCase();

    // Validar si el mensaje está vacío
    if (userMessage === "") {
        return; // No hacer nada si no hay texto
    }

    // Deshabilitar la entrada del usuario
    userInput.disabled = true;

    // Mostrar el mensaje del usuario
    const userMessageElement = document.createElement("div");
    userMessageElement.className = "user-message";
    userMessageElement.textContent = userInput.value;
    chatBody.appendChild(userMessageElement);

    // Buscar la respuesta del bot
    let botMessage = botResponses.default;
    for (const key in botResponses) {
        if (key !== "default" && botResponses[key].keywords.some(keyword => userMessage.includes(keyword))) {
            botMessage = botResponses[key].response;
            break;
        }
    }

    // Mostrar el mensaje de carga del bot
    const botMessageElement = document.createElement("div");
    botMessageElement.className = "bot-message";
    botMessageElement.textContent = "..."; // Mostrar mensaje de carga
    chatBody.appendChild(botMessageElement);

    disableSendButton();
    // Limpiar el input
    userInput.value = "";

    // Desplazar el chat hacia abajo
    chatBody.scrollTop = chatBody.scrollHeight;

    // Efecto de escritura para la respuesta del bot
    function typeWriterEffect(text, element, speed) {
        return new Promise((resolve) => {
            let i = 0;
            element.textContent = ""; // Limpiar el contenido inicial
            const intervalId = setInterval(function () {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    // Desplazar el chat hacia abajo mientras se escribe el mensaje
                    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
                } else {
                    clearInterval(intervalId); // Detener el intervalo cuando termine de escribir
                    resolve(); // Notificar que se terminó de escribir
                }
            }, speed);
        });
    }
    
    // Llamar a la función con el mensaje del bot
    setTimeout(async () => {
        await typeWriterEffect(botMessage, botMessageElement, 20); // Efecto de escritura
        showSuggestions(); // Mostrar sugerencias después de que termine de escribir
        userInput.disabled = false; // Habilitar la entrada del usuario
        userInput.focus(); // Enfocar la entrada del usuario
        enableSendButton();

        // Desplazar el chat hacia abajo después de la respuesta del bot
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000); // Simular un retraso inicial de 1 segundo
}


window.onload = function () {
    // Mostrar sugerencias al cargar la página
    showSuggestions();
};


// Función para mostrar las sugerencias
function showSuggestions() {
    const chatBody = document.getElementById("chatBody");
    const suggestionsElement = document.createElement("div");
    suggestionsElement.className = "suggestions";

    const suggestions = generateSuggestions(); // Obtener opciones sugeridas aleatorias
    suggestions.forEach(suggestion => {
        const suggestionButton = document.createElement("button");
        suggestionButton.className = "suggestion-button";
        suggestionButton.textContent = suggestion;
        suggestionButton.addEventListener("click", function () {
            document.getElementById("userInput").value = suggestion;
            suggestionButton.disabled = true;
             // Coloca el texto sugerido en el input
        });
        suggestionsElement.appendChild(suggestionButton);
    });

    chatBody.appendChild(suggestionsElement);

    // Desplazar el chat hacia abajo para mostrar las sugerencias
    chatBody.scrollTop = chatBody.scrollHeight;
}




function generateSuggestions() {
    const options = ["Combo", "Precio", "Reservar", "Pago", "Horario", "Ubicacion", "Contacto", "Envio", "Ingredientes", "Promoción", "Whatsapp"];
    
    // Seleccionar 3 opciones aleatorias de la lista
    const shuffledOptions = options.sort(() => 0.5 - Math.random()); // Mezclar las opciones
    return shuffledOptions.slice(0, 3); // Seleccionar solo 3 opciones
}


userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
// Función para cambiar el tema oscuro y claro
document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const themeButton = document.getElementById('toggleTheme');
    themeButton.textContent = document.body.classList.contains('dark') ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
});

// Cambiar idioma (prototipo)
document.getElementById('changeLanguage').addEventListener('click', () => {
    alert('La función de cambio de idioma estará disponible pronto.');
});
window.onload = function () {
    showSuggestions(); // Mostrar sugerencias al cargar la página
};