sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/model/json/JSONModel"
], function (Controller, formatter, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.ToDoList", {

		formatter: formatter,

		onInit: function () {
			var oModel = new JSONModel();
			this.getView().setModel(oModel, "visModel");

			// Hold the boolean value universally
			this.getView().getModel("visModel").setProperty("/inputVisible",false);
			this.getView().getModel("visModel").setProperty("/textVisible",true);	
			
		},

		// clicking the add entry button
		onAddEntry: function () {
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

		onEditEntry: function () {
			this.getView().byId("openEditEntry").setVisible(false);
			this.getView().byId("openAddEntry").setVisible(false);
			this.getView().byId("save").setVisible(true);
			this.getView().byId("cancel").setVisible(true);

			this.getView().getModel("visModel").setProperty("/inputVisible", true);
			this.getView().getModel("visModel").setProperty("/textVisible", false);

			var aTableData = JSON.parse(JSON.stringify(this.getView().getModel("toDoList").getProperty("/ToDoList")));
			this.getView().getModel("visModel").setProperty("/modelCopy", aTableData);
		},

		handleSavePress: function () {
			this.getView().byId("openEditEntry").setVisible(true);
			this.getView().byId("openAddEntry").setVisible(true);
			this.getView().byId("save").setVisible(false);
			this.getView().byId("cancel").setVisible(false);
			
			this.getView().getModel("visModel").setProperty("/inputVisible", false);
			this.getView().getModel("visModel").setProperty("/textVisible", true);

		},

		handleCancelPress: function () {
			this.handleSavePress();
			var aSavedData = this.getView().getModel("visModel").getProperty("/modelCopy");
			this.getView().getModel("toDoList").setProperty("/ToDoList", aSavedData);

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

		onDelete: function(oEvent){
			//get the item in which the context menu was opened 
			var sPath = parseInt(oEvent.getParameter("listItem").getBindingContext("toDoList").getPath().split("/")[2]) //getPath throwing an error
			var oModel = this.getView().getModel("toDoList").getProperty("/ToDoList"); 
			oModel.splice(sPath,1);
			//Set the model again after we've removed the item and refresh
			this.getView().getModel("toDoList").setProperty("/ToDoList",oModel)
		}
    });
});