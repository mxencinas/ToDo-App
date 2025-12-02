sap.ui.define(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
  "use strict";
  includeStylesheet("css/style.css");

  // new sap.m.Text({ text: "Hola Fiori" }).placeAt("content");

  sap.ui.core.mvc.XMLView.create({
    viewName: "artech-capacitacion-fiori.view.App",
  }).then(function (oView) {
    oView.placeAt("content");
  });
});