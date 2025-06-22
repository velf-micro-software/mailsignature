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

// Manejo del checkbox de logo
const logoCheckbox = document.getElementById("logoCheckbox");
const logoInputContainer = document.getElementById("logoInputContainer");
const logoInput = document.getElementById("logoInput");

logoCheckbox.addEventListener("change", function () {
  logoInputContainer.classList.toggle("hidden", !this.checked);
  if (!this.checked) {
    logoInput.value = ""; // Limpiar el input cuando se desmarca
  }
});

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const cargo = document.getElementById("cargo").value;
  const empresa = document.getElementById("empresa").value;
  const telefono = document.getElementById("telefono").value;
  const correo = document.getElementById("correo").value;
  const fuente = document.getElementById("fuente").value;

  // Mapeo de fuentes
  const fuentesMap = {
    "sans-serif": "sans-serif, Arial, Helvetica",
    "Segoe-Script": "'Segoe Script', cursive, sans-serif",
    "Courier-New": "'Courier New', Courier, monospace",
    "Times-New-Roman": "'Times New Roman', Times, serif",
  };
  const fontFamily = fuentesMap[fuente] || "sans-serif";

  let signatureHTML = `<div class="flex items-start space-x-4" style="font-family: ${fontFamily};">`;

  // Agregar logo si está marcado y se ha seleccionado una imagen
  if (logoCheckbox.checked && logoInput.files.length > 0) {
    const logoFile = logoInput.files[0];
    const logoUrl = URL.createObjectURL(logoFile);
    signatureHTML += `
          <div class="flex-shrink-0">
              <img src="${logoUrl}" alt="Logo" class="w-24 h-24 object-contain">
          </div>
      `;
  }

  // Agregar información de la firma
  signatureHTML += `
      <div class="flex-grow">
          <p class="font-bold text-lg">${nombre}</p>
          <p class="text-gray-600"><i class="fas fa-briefcase mr-2"></i>${cargo}</p>
          <p class="text-gray-600"><i class="fas fa-building mr-2"></i>${empresa}</p>
          ${
            telefono
              ? `<p class="text-gray-600"><i class="fas fa-phone mr-2"></i>${telefono}</p>`
              : ""
          }
          <p class="text-gray-600"><i class="fas fa-envelope mr-2"></i>${correo}</p>
      </div>
  </div>`;

  document.getElementById("signaturePreview").innerHTML = signatureHTML;
  document.getElementById("previewModal").classList.remove("hidden");
  document.getElementById("previewModal").classList.add("flex");

  // Configurar el botón de descarga
  downloadSignatureBtn.onclick = async () => {
    const signatureElement = document.getElementById("signaturePreview");

    try {
      // Crear un canvas temporal
      const canvas = await html2canvas(signatureElement, {
        backgroundColor: "#ffffff",
        scale: 2, // Mayor calidad
        logging: false,
      });

      // Convertir el canvas a una imagen
      const image = canvas.toDataURL("image/png");

      // Crear un enlace de descarga
      const link = document.createElement("a");
      link.href = image;
      link.download = "mi-firma.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al generar la imagen:", error);
      alert("Hubo un error al generar la imagen. Por favor, intenta de nuevo.");
    }
  };
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
