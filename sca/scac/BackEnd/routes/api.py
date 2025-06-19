from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordRequestForm
from procesamiento import procesar_archivos , comparacion_archivos_sofia_instru

from ComponentesBackEnd.logger_configuracion import logger
import pandas as pd 


import traceback
import os
from io import BytesIO

router = APIRouter()


@router.post("/get-codigo-ficha/")
async def get_codigo_ficha(file_instru: UploadFile = File(...)):
    """
    Endpoint para extraer el Código de Ficha desde un archivo Excel.
    """
    try:
        # Leer el archivo Excel
        logger.info("Leyendo el archivo subido para extraer el Código de Ficha...")
        instru_df = pd.read_excel(file_instru.file, sheet_name="Validar nombre aprendiz", header=None, dtype=str)

        # Extraer la celda D2 (fila 1, columna 3 - índice basado en 0)
        logger.info("Extrayendo el Código de Ficha de la celda D2...")
        try:
            codigo_ficha = instru_df.iloc[1, 3]
            if pd.isna(codigo_ficha):
                raise ValueError("La celda D2 está vacía o no contiene un Código de Ficha válido.")
            logger.info(f"Código de Ficha identificado: {codigo_ficha}")
        except IndexError:
            logger.error("No se encontró la celda D2 en la hoja especificada.")
            raise HTTPException(status_code=400, detail="El archivo no contiene la celda D2 requerida para obtener el Código de Ficha.")

        # Devolver el Código de Ficha
        return {"codigo_ficha": codigo_ficha}

    except Exception as e:
        logger.error(f"Error al procesar el archivo: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error al procesar el archivo: {str(e)}")


# Ruta de inicio de sesión
@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # qnciales hardcodeadas para uso local
    if form_data.username == "admin" and form_data.password == "admin123":
        return {"access_token": "your_token_here", "token_type": "bearer"}
    # Lanzar error si las credenciales no son válidas
    raise HTTPException(status_code=400, detail="Credenciales inválidas")

# Ruta para procesar archivos
@router.post("/process-files/")
async def process_files(file1: UploadFile = File(...), file2: UploadFile = File(...), file3: UploadFile = File(...)):
    """
    Endpoint para procesar tres archivos Excel y devolver un archivo de resultado.
    """
    try:
        # Procesar los archivos
        resultado = procesar_archivos(file1.file, file2.file, file3.file)

        # Comprobar si se generó correctamente el archivo
        if resultado is None:
            raise HTTPException(status_code=500, detail="Error en el procesamiento de los archivos.")
        
        # Devolver el archivo como respuesta
        headers = {
            "Content-Disposition": "attachment; filename=PlantillaResultado.xlsx"
        }
        return StreamingResponse(resultado, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers=headers)

    except Exception as e:
        error_trace = traceback.format_exc()
        raise HTTPException(status_code=500, detail=f"Error al procesar archivos: {str(e)}. Trace: {error_trace}")

# Ruta para procesar la comparación de archivos de instructores y Sofía
@router.post("/process-comparacion/")
async def process_comparacion(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    """
    Endpoint para procesar dos archivos Excel y devolver un archivo de resultado.
    """
    try:
        # Procesar los archivos
        resultado = comparacion_archivos_sofia_instru(file1.file, file2.file)

        # Comprobar si se generó correctamente el archivo
        if resultado is None:
            raise HTTPException(status_code=500, detail="Error en el procesamiento de los archivos.")
        
        # Devolver el archivo como respuesta
        headers = {
            "Content-Disposition": "attachment; filename=ComparacionResultado.xlsx"
        }
        return StreamingResponse(resultado, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers=headers)

    except Exception as e:
        error_trace = traceback.format_exc()
        raise HTTPException(status_code=500, detail=f"Error al procesar archivos: {str(e)}. Trace: {error_trace}")