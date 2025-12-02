# 📘 Proyecto SAP UI5 Freestyle desde Cero (Sin Plantilla)

Este documento explica paso a paso cómo crear un proyecto **SAP UI5 Freestyle** completamente desde cero, sin utilizar plantillas. Incluye instalación, configuración, estructura del proyecto y una plantilla funcional lista para usar.

Enunciado:
Crear una aplicación UI5 freestyle que muestre un saludo al usuario usando un Input y un Button, sin usar plantillas predefinidas.
• Campo de entrada (Input)
• El usuario debe poder escribir su nombre.
• Botón (Button)
• Al hacer clic, debe mostrar el nombre ingresado.
• Mostrarlo con un MessageToast o en un control de tipo Text.

• Subirlo al mismo proyecto del repositorio del GitHub donde esta el to-do
• Renombrar el repositorio a ARTECH-Capacitacion-Fiori
• En la rama donde tengas el to-do, renombrarla por 1.Ejercicio[to-do]
• Crear una nueva rama para este ejercicio y nómbrala 2.Ejercicio[fiori-sin-plantilla]

• Colocar en los topic el siguiente nombre:
❖ artech-fiori
---

## 🚀 1. Requisitos Previos

Asegurate de tener instalado:

* **Node.js** (v14+ recomendado)
* **npm** (incluido con Node)
* Editor recomendado: **VS Code**

---

## 📦 2. Crear el Proyecto Base

Inicializar Node:

```bash
npm init -y
```

---

## 🛠️ 3. Instalar UI5 CLI

```bash
npm install --save-dev @ui5/cli
```

Crear `.gitignore` en la raíz e incluir:

```
node_modules/
```

---

## 📁 4. Inicializar UI5

Crear carpeta base:

```bash
mkdir webapp
```

Inicializar:

```bash
npx ui5 init
```

Esto genera el archivo **ui5.yaml**.

### ✔ Ajustar `ui5.yaml`

Usar **kebab-case**:

```yaml
specVersion: "3.0"
type: application
metadata:
  name: artech-capacitacion-fiori
```

> ⚠ No usar dot notation: causa problemas al cargar módulos.

---

## 🧩 5. Crear `manifest.json`

Crear `webapp/manifest.json`:

```json
{
  "_version": "1.9.0",
  "sap.app": {
    "id": "artech.capacitacion.fiori"
  }
}
```

> El campo **sap.app.id** define el namespace del proyecto.

---

## 🧪 6. Instalar bibliotecas UI5

```bash
npx ui5 use sapui5@latest
npx ui5 add sap.ui.core sap.m themelib_sap_horizon
```

---

## 🌐 7. Crear `index.html` (Bootstrap de UI5)

Archivo: `webapp/index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>UI5 Freestyle</title>

    <script
        src="resources/sap-ui-core.js"
        data-sap-ui-theme="sap_horizon"
        data-sap-ui-libs="sap.m"
        data-sap-ui-compatVersion="edge"
        data-sap-ui-oninit="module:artech/capacitacion/fiori/index"
        data-sap-ui-resourceroots='{"artech.capacitacion.fiori": "./"}'>
    </script>
</head>

<body id="content" class="sapUiBody sapUiSizeCompact"></body>
</html>
```

---

## 📌 8. Crear `index.js`

Archivo: `webapp/index.js`

```js
sap.ui.define(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
  "use strict";
  includeStylesheet("css/style.css");

  sap.ui.core.mvc.XMLView.create({
    viewName: "artech-capacitacion-fiori.view.App",
  }).then(function (oView) {
    oView.placeAt("content");
  });
});
```

---

## 🖼️ 9. Crear Vista XML

Archivo: `webapp/view/App.view.xml`

```xml
<mvc:XMLView controllerName="artech-capacitacion-fiori.controller.App"
    xmlns:mvc="sap.ui.core.mvc" 
    xmlns="sap.m">
    <Shell>
        <App>
            <Page>
                <Title text="Ejercicio - Clase 2" 
                    level="H1" 
                    class="sapUiMediumMarginBegin sapUiMediumMarginTop" 
                    wrapping="true" />
    
                <VBox class="sapUiContentPadding"> 
                    
                    <Label text="Nombre:" 
                        labelFor="inputName"/>
                        
                    <Input 
                        id="inputName"
                        width="20rem" 
                        placeholder="Introduce el nombre"/>
                    
                    <Button 
                        text="Saludar" 
                        press=".onClick" 
                        type="Emphasized" 
                        class="sapUiTinyMarginTop"/> 
                        
                </VBox>
            </Page>
        </App>
    </Shell>
</mvc:XMLView>
```

---

## 🎮 10. Crear Controller

Archivo: `webapp/controller/App.controller.js`

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("artech-capacitacion-fiori.controller.App", {
        onClick: function() {
            const inputName = this.byId("inputName");
            const name = inputName.getValue();
            sap.m.MessageToast.show(`Hola ${name}`);
            inputName.setValue("");
        }
    });
});
```

---

## 🎨 11. Crear archivo CSS

Archivo: `webapp/css/style.css`


---

## ▶️ 12. Ejecutar la aplicación

```bash
npx ui5 serve
```

Abierto en:

```
http://localhost:8080
```

---

# 🧱 13. Plantilla Completa del Proyecto

```
project-root/
│
├── node_modules/
├── package.json
├── package-lock.json
├── ui5.yaml
├── .gitignore
│
└── webapp/
    ├── index.html
    ├── index.js
    ├── manifest.json
    │
    ├── css/
    │   └── style.css
    │
    ├── view/
    │   └── App.view.xml
    │
    └── controller/
        └── App.controller.js
```

---

