// Funcionalidad del modal
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const form = document.getElementById("signatureForm");
const previewModal = document.getElementById("previewModal");
const closePreviewModalBtn = document.getElementById("closePreviewModal");
const downloadSignatureBtn = document.getElementById("downloadSignature");
const signaturePreview = document.getElementById("signaturePreview");

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

  // Mostrar la firma en el modal de vista previa
  signaturePreview.innerHTML = `
    <img src="${signatureImage}" alt="Firma generada" class="max-w-full" />
  `;

  // Configurar el botón de descarga
  downloadSignatureBtn.onclick = () => {
    const link = document.createElement("a");
    link.href = signatureImage;
    link.download = "mi-firma.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mostrar el modal de vista previa
  previewModal.classList.remove("hidden");
  previewModal.classList.add("flex");
});

// Cerrar el modal de vista previa
closePreviewModalBtn.addEventListener("click", () => {
  previewModal.classList.add("hidden");
  previewModal.classList.remove("flex");
});

// Cerrar el modal de vista previa al hacer clic fuera de él
previewModal.addEventListener("click", (e) => {
  if (e.target === previewModal) {
    previewModal.classList.add("hidden");
    previewModal.classList.remove("flex");
  }
});
