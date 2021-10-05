sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.ToDoList", {

		formatter: formatter,

		onInit: function () {
			
		},

		// clicking the add entry button
		onAddEntry : function () {
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "sap.ui.demo.basicTemplate.view.AddItem"})
			}
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		// clicking the close button once the fragment is open
		onCloseEntry : function () {
			this.byId("addEntry").close();
		}, 

		// Adding the input fields from fragment into an array
		addEntry: function() {
			// Retrieving data from input fields of the fragment and putting this in an array
			var sName = this.getView().byId("input_name").getValue();
			var sOwner = this.getView().byId("input_owner").getValue();
			var sDate = this.getView().byId("input_date").getValue();
			var itemRow = {
				Name: sName,
				Owner: sOwner,
				Date: sDate
			};
		
			//retrieve JSON model data and append the fragment array 
			var oModel = this.getOwnerComponent().getModel("toDoList");
			// Get the property within the model 
			var itemData = oModel.getProperty("/ToDoList");
			itemData.push(itemRow);
			oModel.setProperty("/ToDoList",itemData);
			// Close the fragment once you have pressed 'Add Entry'
			this.onCloseEntry();
			// Clear the input fields once you've added the entry to the model 
			this.getView().byId("input_name").setValue("");
			this.getView().byId("input_owner").setValue("");
			this.getView().byId("input_date").setValue("");
		},
    });
});