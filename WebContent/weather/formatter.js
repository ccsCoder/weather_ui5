//jQuery.sap.declare("weather.formatter");

weather.ObjectHeader.formatter = {
	
	_convertToC: function (fTempVal) {
        return (fTempVal - 32) * (5 / 9);
    },

    _convertToF: function (cTempVal){
        return (cTempVal * (9 / 5)) + 32;
        
    }
};
<!-- path: ['/main/temp'],
formatter: function (fTempVal) {
	        return (fTempVal - 32) * (5 / 9);
	    }
}"  -->