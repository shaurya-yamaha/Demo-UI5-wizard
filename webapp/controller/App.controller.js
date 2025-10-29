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
                // vinNumberState: "Error",
                claimTypeState: "Error"
            });
            this.getView().setModel(this.model);

            // data for drop dowm for claim type
            var oClaimTypeData = {
                "SelectedClaim" : 1,
                "ClaimCollection": [
                    {
                        "claimId" : 1,
                        "claimName" : "Regular"
                    },
                    {
                        "claimId" : 2,
                        "claimName" : "Recall"
                    },
                    {
                        "claimId" : 3,
                        "claimName" : "Auth"
                    },
                    {
                        "claimId" : 4,
                        "claimName" : "Goodwill"
                    },
                    {
                        "claimId" : 5,
                        "claimName" : "P&A"
                    }
                ]
            }

            var oClaimTypeModel = new JSONModel(oClaimTypeData);
            this.getView().setModel(oClaimTypeModel);

            const i18nModel = new ResourceModel({
                bundleName: "ymdb_wizard.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");            
        },

        // to validate fields of step 1
        genInfoValidation() {
            // var vinNumberName = this.byId("vinNumber").getValue();
            var claimTypeName = this.byId("claimType").getSelectedKey();
            // var vinDetailsValue = this.byId("vinDetails").getValue();

            // if vinNumberName is empty 
            // if(vinNumberName.length == 0) {
            //     this._wizard.setCurrentStep(this.byId("generalDetailsStep"));
            //     this.model.setProperty("/vinNumberState", "Error");
            // } else {
            //     this.model.setProperty("/vinNumberState", "None");
            // }

            // if claimType name is empty 
            if(claimTypeName.length == 0) {
                this._wizard.setCurrentStep(this.byId("generalDetailsStep"));
                this.model.setProperty("/claimTypeState", "Error");
            } else {
                this.model.setProperty("/claimTypeState", "None");
            }

            // to validate the wizard step
            if(claimTypeName.length == 0) {
                this._wizard.invalidateStep(this.byId("generalDetailsStep"));
            } else {
                this._wizard.validateStep(this.byId("generalDetailsStep"));
            }
        },

        onPress: function(evt) {
            MessageToast.show('Repair History Clicked!!!');
        }
    });
});
