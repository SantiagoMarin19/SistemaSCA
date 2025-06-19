import React from "react";
import update from '../../assets/img/upload.png';
import logosofia from "../../assets/img/logosofiacopia.png"

function Pantallatres({ file2, setFile2, fileInputRef, handleRemoveFile2, handleScreenChange }) {
    return (
        <div className="processingScreen">
            <div className="titulosca">
                <h1 className="titusca">Bienvenido Al Modulo Archivo de Carga <img src={logosofia} alt="LogoSofia" className="LogoSofia" /></h1>
            </div>
            <div className="mensajedebienvenida" id="sofia">
                <h2 className="tituloinstru">Modulo de Archivo Verificación de SofiaPlus</h2>
                <div className="spanbienve">
                    <span className="spanbienvenida">
                        !Perfecto¡ Ahora estas en el segundo paso de la certificacion de aprendices
                    </span>
                    <span>Sube, carga o arrastra el archivo descargadp de la plataforma SofiaPlus.</span>
                    <span className="spanbienvenida">
                        Este archivo masivo debe contener las fichas a certificar de etapa (Complementaria).
                    </span>
                    <span className="spanbienvenida">
                        El archivo debe estar en formato .xlsx o .xls (Excel).
                    </span>
                    <span className="spanbienvenida">
                        Recomendaciones: Asegurate que el archivo (SOFIA) contenga la misma ficha que el archivo anteriormente
                    </span>
                </div>
                <div className="listado">
                    <h3>¿Qué puedes hacer aquí?</h3>
                    <ul>
                        <li>Cargar archivos .XLSX o .XLS verificación SofiaPlus</li>
                        <li>Validar información de aprendices</li>
                        <li>Generar reportes de validación</li>
                        <li>Descargar resultados</li>
                    </ul>
                </div>
            </div>
            <div className="contenedorcircle">
                <div className="circle">1</div>
                <div className="circle" id="dos">2</div>
                <div className="circle">3</div>
                <div className="line"></div>
            </div>

            <div className="contenedordearchivos">
                <h1 className="titulocontenedorarch">Ingresa aqui el archivo descargado de SofiaPlus</h1>
                <div
                    className="custom-div"
                    onClick={() => fileInputRef.current.click()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) {
                            setFile2(file);
                        }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <p className="titulocontenedorarch">Arrastra el archivo o haz clic aquí</p>
                    <img src={update} alt="Logoupdate" className="imgupdate" />
                    <input
                        id="file2"
                        type="file"
                        className="hidden-input"
                        accept=".xlsx , .xls"
                        ref={fileInputRef}
                        onChange={(e) => setFile2(e.target.files[0])}
                    />
                </div>
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
                    <button className="botonesdescargar" onClick={() => handleScreenChange("instruSofia")}>Continuar a Comparación</button>
                </div>
            )}

            {file2 && (
                <div className="buttonorganizado">
                    <button className="botonescontinuar" onClick={() => handleScreenChange("juicios")}>Continuar a Juicios</button>
                </div>
            )}
            <button className="botonescontinuar" onClick={() => handleScreenChange("upload")}>Volver</button>
        </div>
    );
}

export default Pantallatres;