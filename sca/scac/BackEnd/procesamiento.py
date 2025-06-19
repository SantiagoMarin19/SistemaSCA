import pandas as pd
from ComponentesBackEnd.logger_configuracion import logger
from ComponentesBackEnd.excel_utils import ajustar_ancho_columnas
from ComponentesBackEnd.data_procesamiento import procesar_archivo_instructores, realizar_validacion , procesar_archivo_sin_juicios

def procesar_archivos(file_instru, file_sofia, file_juicio):
    try:
        instru_df, sofia_filtrado, juicio_df = procesar_archivo_instructores(file_instru, file_sofia, file_juicio)
        validacion_df = realizar_validacion(instru_df, sofia_filtrado, juicio_df)

        # Renombrar columnas y reordenar
        logger.info("Renombrando columnas y reordenando...")
        columnas_ordenadas = [
            "FICHA", "TIPO_PROGRAMA", "NIVEL_FORMACION", "DENOMINACION_PROGRAMA",
            "TIPO_INSTRU", "TIPO_SOFIA",
            "DOCUMENTO_DE_IDENTIFICACION_INSTRU", "DOCUMENTO_DE_IDENTIFICACION_SOFIA",
            "NOMBRE_COMPLETO_SENA_INSTRU", "NOMBRE_COMPLETO_SENA_SOFIA", "COINCIDENCIA", "JUICIOS_EVALUATIVO"
        ]
        validacion_df = validacion_df.reindex(columns=columnas_ordenadas, fill_value="")

        # Autocompletar columnas con los datos disponibles
        columnas_autocompletar = ["FICHA", "TIPO_PROGRAMA", "NIVEL_FORMACION", "DENOMINACION_PROGRAMA"]
        for columna in columnas_autocompletar:
            validacion_df[columna] = validacion_df[columna].fillna(method='ffill').fillna(method='bfill')
            
        # Rellenar columnas específicas con "No se encontraron datos"
        columnas_rellenar = [
            "TIPO_INSTRU", "TIPO_SOFIA",
            "DOCUMENTO_DE_IDENTIFICACION_INSTRU", "DOCUMENTO_DE_IDENTIFICACION_SOFIA",
            "NOMBRE_COMPLETO_SENA_INSTRU", "NOMBRE_COMPLETO_SENA_SOFIA"
        ]
        for columna in columnas_rellenar:
            validacion_df[columna] = validacion_df[columna].replace("", "No se encontraron datos").fillna("No se encontraron datos")

        validacion_df.rename(columns={
            "FICHA": "Ficha",
            "TIPO_PROGRAMA": "Tipo Programa",
            "NIVEL_FORMACION": "Nivel Formación",
            "DENOMINACION_PROGRAMA": "Denominación Programa",
            "TIPO_INSTRU": "Tipo Documento Instructores",
            "TIPO_SOFIA": "Tipo Documento Sofía",
            "DOCUMENTO_DE_IDENTIFICACION_INSTRU": "No. Documento Instructores",
            "DOCUMENTO_DE_IDENTIFICACION_SOFIA": "No. Documento Sofía",
            "NOMBRE_COMPLETO_SENA_INSTRU": "Nombre Aprendiz Instructores Consulta",
            "NOMBRE_COMPLETO_SENA_SOFIA": "Nombre Aprendiz Sofía",
            "COINCIDENCIA": "COINCIDENCIA",
            "JUICIOS_EVALUATIVO": "Juicios Evaluativos"
        }, inplace=True)

        output_path = "resultado_validacion.xlsx"
        validacion_df.to_excel(output_path, index=False)
        ajustar_ancho_columnas(output_path)
        logger.info(f"Archivo de resultado guardado en: {output_path}")

        return open(output_path, "rb")
    except Exception as e:
        logger.error(f"Error en el procesamiento: {str(e)}")
        raise

def comparacion_archivos_sofia_instru(file_instru, file_sofia):
    try:
        instru_df, sofia_filtrado = procesar_archivo_sin_juicios(file_instru, file_sofia)
        validacion_df = realizar_validacion(instru_df, sofia_filtrado, pd.DataFrame())

        # Renombrar columnas y reordenar
        logger.info("Renombrando columnas y reordenando...")
        columnas_ordenadas = [
            "FICHA", "TIPO_PROGRAMA", "NIVEL_FORMACION", "DENOMINACION_PROGRAMA",
            "TIPO_INSTRU", "TIPO_SOFIA",
            "DOCUMENTO_DE_IDENTIFICACION_INSTRU", "DOCUMENTO_DE_IDENTIFICACION_SOFIA",
            "NOMBRE_COMPLETO_SENA_INSTRU", "NOMBRE_COMPLETO_SENA_SOFIA", "COINCIDENCIA"
        ]
        validacion_df = validacion_df.reindex(columns=columnas_ordenadas, fill_value="")

        # Autocompletar columnas con los datos disponibles
        columnas_autocompletar = ["FICHA", "TIPO_PROGRAMA", "NIVEL_FORMACION", "DENOMINACION_PROGRAMA"]
        for columna in columnas_autocompletar:
            validacion_df[columna] = validacion_df[columna].fillna(method='ffill').fillna(method='bfill')

        # Rellenar columnas específicas con "No se encontraron datos"
        columnas_rellenar = [
            "TIPO_INSTRU", "TIPO_SOFIA",
            "DOCUMENTO_DE_IDENTIFICACION_INSTRU", "DOCUMENTO_DE_IDENTIFICACION_SOFIA",
            "NOMBRE_COMPLETO_SENA_INSTRU", "NOMBRE_COMPLETO_SENA_SOFIA"
        ]
        for columna in columnas_rellenar:
            validacion_df[columna] = validacion_df[columna].replace("", "No se encontraron datos").fillna("No se encontraron datos")

        validacion_df.rename(columns={
            "FICHA": "Ficha",
            "TIPO_PROGRAMA": "Tipo Programa",
            "NIVEL_FORMACION": "Nivel Formación",
            "DENOMINACION_PROGRAMA": "Denominación Programa",
            "TIPO_INSTRU": "Tipo Documento Instructores",
            "TIPO_SOFIA": "Tipo Documento Sofía",
            "DOCUMENTO_DE_IDENTIFICACION_INSTRU": "No. Documento Instructores",
            "DOCUMENTO_DE_IDENTIFICACION_SOFIA": "No. Documento Sofía",
            "NOMBRE_COMPLETO_SENA_INSTRU": "Nombre Aprendiz Instructores Consulta",
            "NOMBRE_COMPLETO_SENA_SOFIA": "Nombre Aprendiz Sofía",
            "COINCIDENCIA": "COINCIDENCIA"
        }, inplace=True)

        output_path = "resultado_validacion_sin_juicios.xlsx"
        validacion_df.to_excel(output_path, index=False)
        ajustar_ancho_columnas(output_path)
        logger.info(f"Archivo de resultado guardado en: {output_path}")

        return open(output_path, "rb")
    except Exception as e:
        logger.error(f"Error en el procesamiento: {str(e)}")
        raise