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