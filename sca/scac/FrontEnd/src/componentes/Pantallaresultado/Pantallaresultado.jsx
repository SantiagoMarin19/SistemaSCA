import React from "react";

function Pantallaresult({ file1, file2, file3, handleScreenChange , codigoFicha}) {
  const handleSubmit = async () => {
    if (!file1 || !file2 || !file3) {
      alert("Por favor, selecciona los tres archivos.");
      return;
    }

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);

    try {
      const response = await fetch("http://127.0.0.1:8001/api/process-files/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType === "application/json") {
          const result = await response.json();
          console.log("Resultado:", result);
        } else {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `ResultadosValidacionCompleta(${codigoFicha}).xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      } else {
        console.error("Error en el servidor:", await response.text());
      }
    } catch (error) {
      console.error("Error al procesar los archivos:", error);
    }
  };

  return (
    <div className="resultScreen">
      <h2>¡Procesamiento completado!</h2>
      <p>Los resultados están listos para ser descargados.</p>
      <button className="botonescontinuar" onClick={handleSubmit}>
        <i className="fas fa-check-circle"></i> Descargar
      </button>
      <button
        className="botonescontinuar"
        onClick={() => handleScreenChange("upload")}
      >
        Volver al inicio
      </button>
    </div>
  );
}

export default Pantallaresult;
