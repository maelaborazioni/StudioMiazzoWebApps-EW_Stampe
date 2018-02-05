/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C0F76CC7-2667-4C3A-8CA9-E290834761F0",variableType:4}
 */
var vTipoElenco = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7A3014A6-FBFD-4977-B5E5-235E1633BA88",variableType:4}
 */
var vChkInForzaAlGiorno = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C1A9A6A7-D69A-4BEC-9154-1A2949411A66",variableType:4}
 */
var vChkInForzaAl = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"59C622CE-8667-4D3C-B82A-A0E09E96FDA4",variableType:4}
 */
var vChkInForzaAlMese = 0;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"3B7FCE06-14CD-4DD8-AFEF-70D4888CCDE2",variableType:93}
 */
var vInForzaAlMese = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"9975EF64-2DC2-4B45-A64A-C5620803803F",variableType:93}
 */
var vInForzaAlGiorno = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9109D9F2-7D9A-420A-A20A-A9F976234989",variableType:4}
 */
var vChkAssunti = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F5708C80-0E36-46F1-AEB2-0A26DFCDD5D9",variableType:4}
 */
var vChkDimessi = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"57E7DF37-006E-445A-9E33-A0675C30FC23",variableType:4}
 */
var vChkCtrScadenza = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"928D9055-C226-404A-B33E-002BF2CA0BD8",variableType:4}
 */
var vChkDalGiorno = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A7C1FD1B-CDA1-495B-9B8B-A4B4C56BAC4D",variableType:4}
 */
var vChkAlGiorno = 0;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"EB9E141E-2808-4CF0-83BE-0A0F32522BB2",variableType:93}
 */
var vDalGiorno = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"E8384F96-8DC2-4F95-8BB0-A21A55437FD4",variableType:93}
 */
var vAlGiorno = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7EF021DC-B9C2-4F41-9D08-CC66CCB2AB2C",variableType:4}
 */
var vChkDecorrenzeAl = 0;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"3753A40C-47B0-40FE-948E-3D035026915F",variableType:93}
 */
var vDecorrenzeAl = null;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B4D18778-7F4F-458E-A761-ACCE436832A8",variableType:4}
 */
var vChkBadge = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E12840F2-BDB0-43B4-86FD-00127CB366A0",variableType:4}
 */
var vChkRegola = 0;

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5CC0A8CD-D8E2-455C-A41C-2275D34D0E9B"}
 */
function onDataChangeChkInForza(oldValue, newValue, event) 
{	
    elements.chk_inForzaAlGiorno.enabled = newValue;
    elements.chk_inForzaAlMese.enabled = newValue;
    
    elements.fld_inForzaAlGiorno.enabled = newValue ? true : false;
    elements.fld_inForzaAlMese.enabled = newValue ? true : false;
    
   	globals.ma_utl_setStatus(globals.Status.EDIT, controller.getName());
    
	return true;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"68E5E421-1D26-4CA3-8FD1-A795F264DFA0"}
 */
function onDataChangeDalGiorno(oldValue, newValue, event) {

	if(vChkAssunti || vChkDimessi || vChkCtrScadenza)
	{
	   elements.fld_dalGiorno.enabled = true;
       elements.fld_alGiorno.enabled = true;
       elements.btn_dalGiorno.enabled = true,
	   elements.btn_alGiorno.enabled = true;
	}
	else
	{
	   elements.fld_dalGiorno.enabled = false;
	   elements.fld_alGiorno.enabled = false;
	   elements.btn_dalGiorno.enabled = false,
	   elements.btn_alGiorno.enabled = false;
	   
	   vDalGiorno = vAlGiorno = null;
	}
	
	globals.ma_utl_setStatus('edit',controller.getName());
	
	return true;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"37A71830-8C96-49AA-A1AA-F0926F460028"}
 */
function onDataChangeDecorrenzeAl(oldValue, newValue, event) {
	
    elements.fld_decorrenzeAlGiorno.enabled = newValue;
    elements.chkBadge.enabled = newValue;
    elements.chkRegola.enabled = newValue;
    
    if(vChkInForzaAl)
    {
    	if(vChkInForzaAlGiorno)
    		vDecorrenzeAl = vInForzaAlGiorno;
    	else
    		vDecorrenzeAl = vInForzaAlMese;
    }else
    	vDecorrenzeAl = null;
    
    globals.ma_utl_setStatus('edit',controller.getName());
    	
	return true;
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D2F47F22-7EDC-41B2-98C3-6544E6293DF6"}
 */
function onActionChkInForzaAl(event)
{
	switch(event.getElementName())
	{
		case elements.chk_inForzaAlGiorno.getName():
			vChkInForzaAlMese = 1 - vChkInForzaAlGiorno;
			break;
		case elements.chk_inForzaAlMese.getName():
			vChkInForzaAlGiorno = 1 - vChkInForzaAlMese;
			break;
	}
}
/**
 * Handle changed data.
 *
 * @param {Date} oldValue old value
 * @param {Date} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"33A5D628-E0F0-4E6C-A166-557F4163663F"}
 */
function onDataChangeInForzaAlGiorno(oldValue, newValue, event)
{
	if(newValue)
	{
		vChkInForzaAlGiorno = 1;
		vChkInForzaAlMese = 0;
	}
	else
	{
		vChkInForzaAlGiorno = 0;
		vChkInForzaAlMese = 1;
	}
	
	return true;
}

/**
 * Handle changed data.
 *
 * @param {Date} oldValue old value
 * @param {Date} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"135E29E9-4E2C-453D-8481-04008F07E1FD"}
 */
function onDataChangeInForzaAlMese(oldValue, newValue, event) 
{
	if(newValue)
	{
		vChkInForzaAlMese = 1;
		vChkInForzaAlGiorno = 0;
	}
	else
	{
		vChkInForzaAlMese = 0;
		vChkInForzaAlGiorno = 1;
	}
	
	return true;
}

/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0E19D0A0-8BC3-45B9-BE27-A13DB7986AEE"}
 */
function onDataChangeChkBadge(oldValue, newValue, event) 
{
	newValue == 1 ? vChkRegola = 0 : vChkRegola = 1;
		
	return true
}

/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F3C09E43-35DF-49C4-AC0B-D5C31B15CF38"}
 */
function onDataChangeChkRegola(oldValue, newValue, event)
{
	newValue == 1 ? vChkBadge = 0 : vChkBadge = 1;
	
	return true
}
