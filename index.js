// Funcionalidad del modal
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const form = document.getElementById("signatureForm");

// Crear canvas para la firma
const canvas = new fabric.Canvas("signatureCanvas", {
  width: 600,
  height: 200,
  backgroundColor: "#ffffff",
});

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Limpiar el canvas
  canvas.clear();

  // Configurar estilos
  const styles = {
    fontFamily: "Arial",
    fontSize: 14,
    fill: "#333333",
    lineHeight: 1.5,
  };

  // Crear texto para la firma
  const textLines = [
    `${data.nombre}`,
    `${data.cargo}`,
    `Tel: ${data.telefono}`,
    `Email: ${data.correo}`,
    `${data.empresa}`,
  ];

  // Crear y agregar cada línea de texto al canvas
  let yPosition = 20;
  textLines.forEach((line) => {
    const text = new fabric.Text(line, {
      left: 20,
      top: yPosition,
      ...styles,
    });
    canvas.add(text);
    yPosition += 25;
  });

  // Convertir canvas a imagen
  const signatureImage = canvas.toDataURL({
    format: "png",
    quality: 1,
  });

  // Crear elemento de imagen para mostrar la firma
  const signaturePreview = document.createElement("div");
  signaturePreview.className = "mt-4 p-4 border rounded-lg";
  signaturePreview.innerHTML = `
    <h4 class="text-lg font-semibold mb-2">Tu firma generada:</h4>
    <img src="${signatureImage}" alt="Firma generada" class="max-w-full" />
    <div class="mt-4">
      <a href="${signatureImage}" download="mi-firma.png" 
         class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
        Descargar Firma
      </a>
    </div>
  `;

  // Agregar la vista previa al modal
  const modalContent = document.querySelector("#modal .bg-white");
  modalContent.appendChild(signaturePreview);
});
