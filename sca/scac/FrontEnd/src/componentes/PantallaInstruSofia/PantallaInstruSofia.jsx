import React from "react";
import './PantallaInstruSofia.css'

const apiUrl = import.meta.env.VITE_API_URL;

function PantallaInstruSofia({ file1, file2, handleScreenChange , codigoFicha }) {
    const handleSubmit = async () => {
        if (!file1 || !file2) {
            alert("Por favor, selecciona ambos archivos.");
            return;
        }

        const formData = new FormData();
        formData.append("file1", file1);
        formData.append("file2", file2);

        try {
            const response = await fetch(`${apiUrl}/process-comparacion/`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `ComparacionResultado(${codigoFicha}).xlsx`;
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error("Error en el servidor:", await response.text());
            }
        } catch (error) {
            console.error("Error al procesar los archivos:", error);
        }
    };

    return (
        <div className="result-screen">
            <h2 className="result-title">Validación de Datos de Aprendices</h2>
            <ul className="validation-details">
                <li>Compara Número de Documento, Tipo de Documento y Nombre del Aprendiz.</li>
                <li>Genera un archivo que valida la coincidencia total de los datos.</li>
                <li>Incluye una columna <strong>COINCIDENCIA</strong> al final del archivo.</li>
                <li>La columna analiza si los datos coinciden o no.</li>
            </ul>
            <div className="button-group">
                <button className="button-action" onClick={handleSubmit}>
                    <i className="fas fa-check-circle"></i> Descargar Validación
                </button>
                <button className="button-action" onClick={() => handleScreenChange('upload')}>
                    <i className="fas fa-arrow-left"></i> Volver a Cargar Archivos
                </button>
            </div>
        </div>
    );
}

export default PantallaInstruSofia;