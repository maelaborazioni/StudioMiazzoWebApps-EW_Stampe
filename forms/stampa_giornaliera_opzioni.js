/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"85E1A11E-784A-42F1-AF84-26728F0A24CE",variableType:4}
 */
var vMese

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"055A6335-BE1E-4641-B305-C59A8489B31C",variableType:4}
 */
var vAnno

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E376CDA6-61E5-4990-9DFE-9E7EA3ED80C9",variableType:4}
 */
var vTotaleEventi = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2C640F1A-0305-433B-8F43-D373A0E53C56",variableType:4}
 */
var vRateiMaturati = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8E1625A1-D03A-4B14-9C2D-52FE16E9A652",variableType:4}
 */
var vSenzaDivElabAuto = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A7EBE4A9-28E5-479F-B008-6F128808AF5C",variableType:4}
 */
var vCodiciPaga = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8706830D-4593-4DDF-96E0-1E5B45307929",variableType:4}
 */
var vNoteMensili = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0BBA8B46-BEA7-47D6-8C19-C61F68BCA9C4",variableType:4}
 */
var vLegendaEventi = 1;


/**
 * @properties={typeid:24,uuid:"29BF3F77-8636-42E1-B1FF-0CE1CBE21272"}
 */
function getOptions()
{
	var params = _super.getOptions();
		params.periodo 			= globals.toPeriodo(vAnno, vMese); 
		params.totaleeventi   	= vTotaleEventi 	=== 1;
		params.rateimaturati  	= vRateiMaturati 	=== 1;
		params.senzaelabdiv   	= vSenzaDivElabAuto === 1;
		params.codicipaga 	   	= vCodiciPaga		=== 1;
		params.notemensili    	= vNoteMensili 		=== 1;
		params.legendaeventi  	= vLegendaEventi    === 1;
		
	return params;
}