import React, { useState, useRef } from "react";
import update from '../../assets/img/upload.png';
import sena from '../../assets/img/logosena.png';
import "./Unificacion.css";

const apiUrl = import.meta.env.VITE_API_URL;

function Unificacion({ handleLogout }) {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [codigoFicha, setCodigoFicha] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [validationResults, setValidationResults] = useState(null);
    const [generatedFile, setGeneratedFile] = useState(null);
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append("file_instru", file);

        try {
            const response = await fetch(`${apiUrl}/get-codigo-ficha`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setCodigoFicha(data.codigo_ficha);
            } else {
                console.error("Error al obtener el código de ficha.");
            }
        } catch (error) {
            console.error("Error al enviar el archivo:", error);
        }
    };

    const handleFile1Change = (e) => {
        const file = e.target.files[0];
        setFile1(file);
        handleFileUpload(file);
    };

    const handleFile2Change = (e) => setFile2(e.target.files[0]);
    const handleFile3Change = (e) => setFile3(e.target.files[0]);

    const handleRemoveFile1 = () => {
        setFile1(null);
        if (fileInputRef1.current) {
            fileInputRef1.current.value = "";
        }
    };

    const handleRemoveFile2 = () => {
        setFile2(null);
        if (fileInputRef2.current) {
            fileInputRef2.current.value = "";
        }
    };

    const handleRemoveFile3 = () => {
        setFile3(null);
        if (fileInputRef3.current) {
            fileInputRef3.current.value = "";
        }
    };

    const handleNextStep = async () => {
        if (currentStep === 1) {
            // Validar los archivos cargados
            const validationResults = await validateFiles();
            setValidationResults(validationResults);
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Generar el archivo resultante
            const generatedFile = await generateResults();
            setGeneratedFile(generatedFile);
            setCurrentStep(3);
        }
    };

    const validateFiles = async () => {
        // Aquí puedes agregar la lógica de validación de los archivos
        // Por ejemplo, puedes enviar los archivos al servidor para validación
        const formData = new FormData();
        if (file1) formData.append("file1", file1);
        if (file2) formData.append("file2", file2);
        if (file3) formData.append("file3", file3);

        try {
            const response = await fetch(`${apiUrl}/validate-files`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error("Error al validar los archivos.");
                return null;
            }
        } catch (error) {
            console.error("Error al enviar los archivos para validación:", error);
            return null;
        }
    };

    const generateResults = async () => {
        // Aquí puedes agregar la lógica de generación de resultados
        // Por ejemplo, puedes enviar los archivos validados al servidor para generar el archivo resultante
        const formData = new FormData();
        if (file1) formData.append("file1", file1);
        if (file2) formData.append("file2", file2);
        if (file3) formData.append("file3", file3);

        try {
            const response = await fetch(`${apiUrl}/generate-results`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob();
                return URL.createObjectURL(blob);
            } else {
                console.error("Error al generar los resultados.");
                return null;
            }
        } catch (error) {
            console.error("Error al enviar los archivos para generación de resultados:", error);
            return null;
        }
    };

    const downloadFile = (fileUrl) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "resultados.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSubmit = () => {
        if (generatedFile) {
            downloadFile(generatedFile);
        }
    };

    return (
        <div className="Contenedorprincipal">
            <div className="columnaizquierda">
                <div className="letrascolumna">
                    <img src={sena} alt="LogoSena" className="imgsena" />
                    <div className="Enlances">
                        <span><i className="bi bi-motherboard-fill"></i> Complementaria</span>
                        <span><i className="bi bi-mortarboard-fill"></i> Titulada</span>
                    </div>
                </div>
                <div className="enlacesabajo">
                    <span className="buttoncerrar" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>Cerrar sesión
                    </span>
                    <span className="derechosreservados">Todos los derechos reservados CBI Palmira</span>
                </div>
            </div>

            <div className="unificacionScreen">
                <header className="header">
                    <div className="header-content">
                        <img src={update} alt="Logo" className="header-logo" />
                        <div>
                            <h1 className="header-title">Sistema de Validación SENA</h1>
                            <p className="header-subtitle">Sofía Plus - Gestión de Certificaciones</p>
                        </div>
                    </div>
                </header>

                <main className="main-content">
                    <div className="steps-container">
                        <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
                            <div className="step-number">1</div>
                            <span className="step-title">Carga de Archivos</span>
                        </div>
                        <div className={`step ${currentStep >= 2 ? 'completed' : ''}`}>
                            <div className="step-number">2</div>
                            <span className="step-title">Validación de Datos</span>
                        </div>
                        <div className={`step ${currentStep >= 3 ? 'completed' : ''}`}>
                            <div className="step-number">3</div>
                            <span className="step-title">Generación de Resultados</span>
                        </div>
                    </div>

                    {currentStep === 1 && (
                        <div className="file-upload-container">
                            <div className="file-upload-section">
                                <h2>Archivo de Instructores</h2>
                                <div
                                    className="custom-div"
                                    onClick={() => fileInputRef1.current.click()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files[0];
                                        if (file) {
                                            setFile1(file);
                                            handleFileUpload(file);
                                        }
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <p>Arrastra el archivo o haz clic aquí</p>
                                    <img src={update} alt="Logoupdate" className="imgupdate" />
                                    <input
                                        id="file1"
                                        type="file"
                                        className="hidden-input"
                                        accept=".xlsx , .xls"
                                        ref={fileInputRef1}
                                        onChange={handleFile1Change}
                                    />
                                </div>
                                {file1 && (
                                    <div className="archivonombre">
                                        <span className="spanicono">
                                            <i className="bi bi-check-square-fill icono-archi"></i> Archivo cargado correctamente
                                        </span>
                                        <div className="campoarchivo">
                                            <span className="file-name">
                                                <i className="bi bi-file-earmark-excel icono-archidos"></i>
                                                {file1.name}
                                            </span>
                                            <button className="delete-button" onClick={handleRemoveFile1}>x</button>
                                        </div>
                                        {codigoFicha && (
                                            <div className="codigo-ficha">
                                                <p>Código de Ficha: {codigoFicha}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="file-upload-section">
                                <h2>Archivo de Sofía</h2>
                                <div
                                    className="custom-div"
                                    onClick={() => fileInputRef2.current.click()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files[0];
                                        if (file) {
                                            setFile2(file);
                                        }
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <p>Arrastra el archivo o haz clic aquí</p>
                                    <img src={update} alt="Logoupdate" className="imgupdate" />
                                    <input
                                        id="file2"
                                        type="file"
                                        className="hidden-input"
                                        accept=".xlsx , .xls"
                                        ref={fileInputRef2}
                                        onChange={handleFile2Change}
                                    />
                                </div>
                                {file2 && (
                                    <div className="archivonombre">
                                        <span className="spanicono">
                                            <i className="bi bi-check-square-fill icono-archi"></i> Archivo cargado correctamente
                                        </span>
                                        <div className="campoarchivo">
                                            <span className="file-name">
                                                <i className="bi bi-file-earmark-excel icono-archidos"></i>
                                                {file2.name}
                                            </span>
                                            <button className="delete-button" onClick={handleRemoveFile2}>x</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="file-upload-section">
                                <h2>Archivo de Juicios</h2>
                                <div
                                    className="custom-div"
                                    onClick={() => fileInputRef3.current.click()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const file = e.dataTransfer.files[0];
                                        if (file) {
                                            setFile3(file);
                                        }
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <p>Arrastra el archivo o haz clic aquí</p>
                                    <img src={update} alt="Logoupdate" className="imgupdate" />
                                    <input
                                        id="file3"
                                        type="file"
                                        className="hidden-input"
                                        accept=".xlsx , .xls"
                                        ref={fileInputRef3}
                                        onChange={handleFile3Change}
                                    />
                                </div>
                                {file3 && (
                                    <div className="archivonombre">
                                        <span className="spanicono">
                                            <i className="bi bi-check-square-fill icono-archi"></i> Archivo cargado correctamente
                                        </span>
                                        <div className="campoarchivo">
                                            <span className="file-name">
                                                <i className="bi bi-file-earmark-excel icono-archidos"></i>
                                                {file3.name}
                                            </span>
                                            <button className="delete-button" onClick={handleRemoveFile3}>x</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="validation-container">
                            <h2>Validación de Datos</h2>
                            <p>Validando los datos de los archivos cargados...</p>
                            {validationResults && (
                                <div>
                                    <p>Resultados de la validación:</p>
                                    <pre>{JSON.stringify(validationResults, null, 2)}</pre>
                                </div>
                            )}
                            <button className="botonescontinuar" onClick={handleNextStep}>
                                Generar Resultados
                            </button>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="results-container">
                            <h2>Generación de Resultados</h2>
                            <p>Generando los resultados de la validación...</p>
                            {generatedFile && (
                                <div>
                                    <p>Archivo generado correctamente. Haga clic en el botón para descargar.</p>
                                    <button className="botonescontinuar" onClick={handleSubmit}>
                                        <i className="fas fa-check-circle"></i> Descargar
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {currentStep < 3 && (
                        <button className="botonescontinuar" onClick={handleNextStep}>
                            Siguiente
                        </button>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Unificacion;