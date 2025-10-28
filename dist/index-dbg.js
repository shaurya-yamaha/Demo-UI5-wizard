sap.ui.define(["sap/ui/core/mvc/XMLView"], (XMLView) => {
    "use strict";

    XMLView.create({
        viewName: 'ymdb_wizard.view.App'
    }).then((oView) => oView.placeAt("content"));
});