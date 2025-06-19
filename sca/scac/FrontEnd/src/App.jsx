import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Inicio from "../src/componentes/Inicio/Inicio";
import PagePrincipal from "../src/componentes/Pageprincipal/Pageprincipal";
import Unificacion from "./componentes/PruebaUnificacion/Unificacion";


const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token"); 
    };

    return (
        <Router>
            <Routes>

                <Route path="/login"element={token ? (<Navigate to="/principal" replace /> ) : (<Inicio setToken={setToken} />)}/>
                <Route path="/principal"element={token ? (<PagePrincipal handleLogout={handleLogout} /> ) : (<Navigate to="/login" replace />) }/>
                <Route path="*" element={<Navigate to="/login" replace />} />
                <Route path="/Unificacion" element={<Unificacion />} />
             
            </Routes>
        </Router>
    );
};

export default App;
