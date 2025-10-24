sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageBox"
], (Controller, MessageToast, JSONModel, ResourceModel, MessageBox) => {
    "use strict";

    return Controller.extend("ymdb_wizard.controller.App", {

        onInit() {
            this._wizard = this.byId("WarrantyPortalWizard");
            this._oNavContainer = this.byId("wizardNavContainer");
            this._oWizardContentpage = this.byId("wizardContentPage");
            this.model = new JSONModel();
            this.model.setData({
                partnerState: "Error",
                claimTypeState: "Error" 
            });
            this.getView().setModel(this.model);
        },

        // to validate fields of step 1
        genInfoValidation() {
            var partnerName = this.byId("partner").getValue();
            var claimTypeName = this.byId("claimType").getValue();
            var refDate = this.byId("refDate").getValue();

            // if partnerName is empty 
            if(partnerName.length == 0) {
                this._wizard.setCurrentStep(this.byId("generalDetailsStep"));
                this.model.setProperty("/partnerState", "Error");
            } else {
                this.model.setProperty("/partnerState", "None");
            }

            // if claimType name is empty 
            if(claimTypeName.length == 0) {
                this._wizard.setCurrentStep(this.byId("generalDetailsStep"));
                this.model.setProperty("/claimTypeState", "Error");
            } else {
                this.model.setProperty("/claimTypeState", "None");
            }

            // to validate the wizard step
            if(partnerName.length == 0 || claimTypeName.length == 0) {
                this._wizard.invalidateStep(this.byId("generalDetailsStep"));
            } else {
                this._wizard.validateStep(this.byId("generalDetailsStep"));
            }
        }
    });
});

// onInit() {
    //     const oData = {
    //         recipient : {
    //             name : "Shaurya"
    //         }
    //     };

    //     const oModel = new JSONModel(oData);
    //     this.getView().setModel(oModel);
        
    //     const i18nModel = new ResourceModel({
    //         bundleName: "ymdb_wizard.i18n.i18n"
    //     });
    //     this.getView().setModel(i18nModel, "i18n");
    // },

    // onShowHello() {
    //     // read text form i18n model
    //     const oBundle = this.getView().getModel("i18n").getResourceBundle();
    //     const sRecipient = this.getView().getModel().getProperty("/recipient/name");
    //     const sMsg = oBundle.getText("helloMsg", [sRecipient]);

    //     MessageToast.show(sMsg);
    // }