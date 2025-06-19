import React from "react";
import update from '../../assets/img/upload.png';
import logosofia from "../../assets/img/logosofiacopia.png"

function Pantallajuicio({ file3, setFile3, fileInputRef, handleRemoveFile3, handleScreenChange ,codigoFicha }) {
    return (
        <div className="processingScreen">
            <div className="titulosca">
                <h1 className="titusca">Bienvenido Al Modulo Carga de Juicios Evaluativos</h1>
            </div>
            <div className="mensajedebienvenida">
                <h2 className="tituloinstru">Modulo de Archivo Verificación de Juicios</h2>
                <div className="spanbienve">
                    <span className="spanbienvenida">
                        Estamos en el ultimo paso para generar nuestro reporte de Aprendices 
                    </span>
                    <span className="spanbienvenida">
                        Sube, carga o arrastra el archivo proporcionado de Juicios Evaluativos 
                    </span>
                    <span>Este archivo debe estar en formato .xlsx o .xls (excel).</span>
                    <span className="spanbienvenida">
                        Recomendaciones: asegúrate de que el archivo contenga celdas llenas y no tenga errores de formato.
                    </span>
                </div>
                <div className="listado">
                    <h3>¿Qué puedes hacer aquí?</h3>
                    <ul>
                        <li>Cargar archivos .XLSX o .XLS verificación Juicios</li>
                        <li>Validar información de aprendices</li>
                        <li>Generar reportes de validación</li>
                        <li>Descargar resultados</li>
                    </ul>
                </div>
                <br></br>
                <span className="span-codigo-ficha">
                        ¡NOTA! Los juicios evaluativos deben corresponder a este numero de ficha: {codigoFicha}
                    </span>
                    <br></br>
            </div>

            <div className="contenedorcircle">
                <div className="circle">1</div>
                <div className="circle">2</div>
                <div className="circle"id="tres">3</div>
                <div className="line"></div>
            </div>

            <div className="contenedordearchivos">
                <h1 className="titulocontenedorarch">Ingresa aqui el archivo descargado de el Juicios</h1>
                <div
                    className="custom-div"
                    onClick={() => fileInputRef.current.click()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) {
                            setFile3(file);
                        }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <p className="titulocontenedorarch">Arrastra el archivo o haz clic aquí</p>
                    <img src={update} alt="Logoupdate" className="imgupdate" />
                    <input
                        id="file3"
                        type="file"
                        className="hidden-input"
                        accept=".xlsx , .xls"
                        ref={fileInputRef}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setFile3(file);
                        }}
                    />
                </div>
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


            {file3 && (
                <div className="buttonorganizado">

                    <button className="botonescontinuar" onClick={() => handleScreenChange("resultados")}>
                        Resultados
                    </button>

                </div>


            )}
            <button className="botonescontinuar" onClick={() => handleScreenChange("upload")}>
                Volver
            </button>


        </div>
    );
};

export default Pantallajuicio;
