import React, { useState } from "react";
import "./Inicio.css";
import sena from '../../assets/img/logosena.png';
import axios from "axios";

const Inicio = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Enviar credenciales al backend
            const response = await axios.post(
                "http://127.0.0.1:8001/api/token",
                new URLSearchParams({
                    username: username,
                    password: password,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const token = response.data.access_token;
            setToken(token); // Pasar el token al estado global o localStorage
            localStorage.setItem("token", token); // Guardar el token en localStorage para persistencia
            alert("Inicio de sesión exitoso");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales inválidas");
        }
    };

    return (
        <div className="contenedorprincipal">
            {/* Contenedor de Login */}
            <div className="contenedorlogin">
                <form className="contenedorinputs" onSubmit={handleLogin}>
                    <h1 className="tituloinputs">Iniciar Sesión</h1>

                    <input
                        className="inputusuario icono-usuario"
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        className="inputusuario icono-contraseña"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        className="buttoningresar"
                        type="submit"
                    >
                        Ingresar
                    </button>
                </form>
            </div>

            {/* Columna derecha */}
            <div className="columnaderecha">
                <div className="textocolumnaderecho">
                    <img src={sena} alt="LogoSena" className="imgsenaverde" />
                    <h1 className="titulosena">SCA</h1>
                    <h2 className="titulosena">Sistema De Certificación De Aprendices</h2>
                    <span className="mensajecolumnaderecha">
                        Este es el sistema de certificación de aprendices. Aquí encontrarás la guía y el paso a paso para generar con facilidad las certificaciones de los aprendices.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Inicio;
