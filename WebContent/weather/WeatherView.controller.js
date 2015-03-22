jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("weather.WeatherView", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf com.neo.view.WeatherView
	 */
	onInit : function() {

	},
	doCitySearch : function(oEvent) {
		var queryString = oEvent.getParameters().query;
		if(jQuery.trim(queryString)==="") {
			sap.m.MessageToast.show("Please type a city name and hit Enter / Click Search.");
			
			return;
		}
			
		//now init an ajax call to fetch the data.
		var that = this;
		that.getView().byId("BusyDialog").open();
		var success=false;
		var id=setTimeout(function() {
			if(!success) {
				sap.m.MessageBox.show(
						"We couldn't fetch the Weather Data. Check your Network connection.  ",
							{
								icon: sap.m.MessageBox.Icon.ERROR,
								title: "OOPS!",
								actions: [sap.m.MessageBox.Action.OK]
							}
				);
				that.getView().byId("BusyDialog").close();
			}
		},10000);
		
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?q="
				+ encodeURI(queryString+",") + "in&callback=?",
				function(data, textStatus, jqXHR) {
					success=true;
					clearTimeout(id);
					that.getView().byId("BusyDialog").close();
					that._handleWeatherData(data, queryString);
					
		});
		
		
	},

	_handleWeatherData: function(data,queryString) {
		
		if(data.message) {
			sap.m.MessageBox.show(
					"Unable to find this place - " + queryString + "- ! ",
						{
							icon: sap.m.MessageBox.Icon.ERROR,
							title: "OOPS!",
							actions: [sap.m.MessageBox.Action.OK]
						}
				);
			return;
		}
		//else proceed
		data["main"].temp = this._convertToC(data["main"].temp);
		var oCityWeatherModel = new sap.ui.model.json.JSONModel(data);
		sap.m.MessageToast.show("City Set to..." + queryString);
		this.getView().setModel(oCityWeatherModel); 

		
	},
	_convertToC: function (fTempVal) {
        return (fTempVal-273.15 ).toFixed(2);
    },

    _convertToF: function (cTempVal){
        return (cTempVal * (9 / 5)) + 32;
        
    }
	

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
 * (NOT before the first rendering! onInit() is used for that one!).
 * @memberOf com.neo.view.WeatherView
 */
//		onBeforeRendering: function() {
//
//		},
/**
 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
 * This hook is the same one that SAPUI5 controls get after being rendered.
 * @memberOf com.neo.view.WeatherView
 */
//		onAfterRendering: function() {
//
//		},
/**
 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
 * @memberOf com.neo.view.WeatherView
 */
//		onExit: function() {
//
//		}
});