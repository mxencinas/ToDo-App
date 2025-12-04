sap.ui.define(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
  "use strict";
  includeStylesheet("css/style.css");

  // new sap.m.Text({ text: "Hola Fiori" }).placeAt("content");

  sap.ui.core.mvc.XMLView.create({
    viewName: "artech-capacitacion-fiori.view.App",
  }).then(function (oView) {
    oView.setModel(new sap.ui.model.resource.ResourceModel({ bundleName: "artech-capacitacion-fiori.i18n.i18n" }), "i18n");
            // Ruta al archivo de propiedades de internacionalización (i18n)
            // Asigna el modelo con el alias "i18n" para usarlo en la vista
    oView.placeAt("content");
  });
});