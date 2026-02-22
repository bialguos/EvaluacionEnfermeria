# Guía Rápida de Inicio

## 🚀 Iniciar la Aplicación

```bash
# 1. Abrir terminal en la carpeta del proyecto
cd "C:\Users\oalvarez\Documents\Mis Documentos\UCA\Documentos Funcionales\EvaluacionEnfermeria"

# 2. Instalar dependencias (solo la primera vez)
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir navegador en http://localhost:5173
```

## 📝 Crear un Informe Quirúrgico (Paso a Paso)

### 1. Menú Principal
- Verás dos tarjetas:
  - "Evaluaciones de Enfermería" (módulo existente)
  - "Informe Quirúrgico de Enfermería" (nuevo módulo)
- Haz clic en **"Informe Quirúrgico de Enfermería"**

### 2. Lista de Informes
- Verás la lista de informes guardados (vacía al inicio)
- Haz clic en **"Nuevo Informe Quirúrgico"**

### 3. Selección de Paciente
Un modal aparecerá con 4 pacientes de ejemplo:
- García López, María (Colecistectomía laparoscópica)
- Rodríguez Sánchez, Juan Carlos (Hernioplastia inguinal derecha)
- Fernández Muñoz, Isabel (Tiroidectomía total)
- Martín Hernández, Pedro (Artroscopia de rodilla)

**Haz clic en cualquier paciente** (por ejemplo, "García López, María")

### 4. Selección de Cirugía
- Verás las cirugías disponibles para ese paciente
- Haz clic en la cirugía que desees

### 5. Formulario - Página 1

El formulario se abrirá con todos los datos precargados:

#### Campos que NO puedes editar (fondo gris):
- ✓ Datos del paciente (nombre, dirección, NIS, etc.)
- ✓ Hospitalización (alergias, medicación, PPCC, TA, FC)
- ✓ PRE-URPA (intervención, lateralidad, enfermera, medicación)
- ✓ Quirófano (cirujano, anestesista, fechas) - excepto medicación

#### Campos que SÍ puedes editar:
- ☑️ **Retirada:** Dispositivos, Dentadura
- ☑️ **Rasurado zona quirúrgica**
- ☑️ **Pruebas complementarias:** ECG, RX, AS, INF EXTERNO
- ☑️ **Verificación médica:** Cirujano, Anestesista
- ☑️ **Otros:** Marcaje, Pruebas cruzadas, Transfusión
- 💊 **Medicación Quirófano** (campo de texto, fondo amarillo claro)
- 📝 **Observaciones** (campo de texto libre)

**Marca los checkboxes que apliquen y escribe observaciones si es necesario**

Haz clic en **"Siguiente →"**

### 6. Formulario - Página 2

#### Constantes Vitales
- Verás 2 constantes prellenadas de "Planta"
- Puedes añadir más constantes con **"+ Añadir Constante"**
- Edita los valores (HORA, TAS/TAD, FC, SAT O2, EVA)
- Los valores fuera de rango se colorean automáticamente
- Haz clic en **"Ver Gráficos"** para visualizar tendencias

#### URPA
- Campos readonly: Anestesista URPA, Enfermera URPA
- **Campos editables (fondo amarillo - precargados):**
  - Fecha y Hora Entrada URPA (precargada desde quirófano, editable)
  - Fecha y Hora Salida URPA (precargada ~2h después, editable)

#### Órdenes Médicas
- Campo de texto libre para prescripciones

#### Medicación Administrada
- Haz clic en **"+ Añadir Medicación"**
- Completa: HORA, MEDICACIÓN, DOSIS
- Puedes añadir múltiples filas

#### Información Adicional
- **Columna izquierda:** Vías venosas, Vendaje, Sonda vesical
- **Columna derecha:** Oxigenoterapia, Drenajes, Otros
- **Apósitos:** Campo completo abajo

#### Firma
- Escribe el nombre de la **Enfermera responsable**
- La fecha y hora se generan automáticamente

**Opciones de guardado:**
- **"Guardar Informe"** - Solo guarda el informe
- **"Guardar e Imprimir"** - Guarda el informe Y genera un PDF automáticamente

### 7. Ver el Informe Guardado
- Volverás a la lista de informes
- Verás tu informe con:
  - Nombre del paciente
  - Fecha de creación
  - Intervención
  - Enfermera
- Botones: **Editar** | **Imprimir PDF** | **Eliminar**

### 8. Imprimir un Informe Existente

Desde la lista de informes:
1. Haz clic en **"Imprimir PDF"** en el informe que desees
2. El PDF se generará automáticamente
3. Se descargará con el nombre: `Informe_Quirurgico_[Paciente]_[Fecha].pdf`
4. El PDF contiene las 2 páginas del informe con el formato oficial

## 🔄 Editar un Informe Existente

1. En la lista de informes, haz clic en **"Editar"**
2. El formulario se abrirá con todos los datos guardados
3. Modifica lo que necesites
4. Navega entre páginas con "Anterior" y "Siguiente"
5. Haz clic en **"Guardar Informe"**

## 🗑️ Eliminar un Informe

1. En la lista, haz clic en **"Eliminar"**
2. Confirma la acción
3. El informe se borrará permanentemente

## 🔙 Volver al Menú Principal

Desde cualquier módulo, haz clic en **"← Volver al Menú Principal"**

## 💾 Persistencia de Datos

- Todos los informes se guardan en **localStorage**
- Los datos persisten aunque cierres el navegador
- Clave de almacenamiento: `surgicalReports`
- No interfiere con las evaluaciones generales

## 🎨 Características Visuales

### Constantes Vitales con Validación
Los valores se colorean según rangos:
- 🟢 **Verde:** Valores normales
- 🟡 **Amarillo:** Valores de advertencia
- 🔴 **Rojo:** Valores de peligro

### Gráficos Interactivos
- Presión Arterial (sistólica y diastólica)
- Frecuencia Cardíaca
- Saturación de O2

### Navegación Clara
- Indicador "PÁGINA: 1/2" siempre visible
- Botones contextuales según la página

## ⚡ Datos de Ejemplo

La aplicación incluye 4 pacientes con datos realistas:

1. **García López, María** (67 años)
   - Cirugía: Colecistectomía laparoscópica
   - Alergias: Penicilina, Contraste yodado

2. **Rodríguez Sánchez, Juan Carlos** (68 años)
   - Cirugía: Hernioplastia inguinal derecha
   - Sin alergias

3. **Fernández Muñoz, Isabel** (54 años)
   - Cirugía: Tiroidectomía total
   - Alergias: Látex

4. **Martín Hernández, Pedro** (46 años)
   - Cirugía: Artroscopia de rodilla - Meniscectomía
   - Sin alergias

## ❓ Preguntas Frecuentes

**P: ¿Los datos son reales?**
R: No, son datos mock de ejemplo para demostración.

**P: ¿Se pueden modificar los pacientes mock?**
R: Sí, edita el archivo `src/data/mockSurgicalData.ts`

**P: ¿Puedo exportar los informes a PDF?**
R: No está implementado aún, es una mejora futura sugerida.

**P: ¿Los datos se guardan en servidor?**
R: No, todo se guarda localmente en el navegador (localStorage).

**P: ¿Qué pasa si borro el localStorage?**
R: Perderás todos los informes guardados. No hay respaldo.

## 🛠️ Solución de Problemas

**Error al instalar dependencias:**
```bash
# Borrar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

**El servidor no inicia:**
```bash
# Verificar que el puerto 5173 no esté en uso
# O cambiar puerto en vite.config.ts
```

**Errores de TypeScript:**
```bash
# Compilar sin ejecutar
npm run build
```

## 📚 Documentación Completa

Para más detalles, consulta:
- `README.md` - Documentación técnica completa
- `VERIFICATION.md` - Lista de verificación de implementación
