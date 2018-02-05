/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0DFD70F4-8F7D-4A51-87B1-FE3305D032B4",variableType:4}
 */
var vChkLimiteAnnuo = 1;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A83C40A9-77F6-42EF-957E-086600E63D07",variableType:4}
 */
var vChkMediaSettimanale = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"BCD58E6F-AAF0-4039-BC63-5F142366DB85",variableType:4}
 */
var vChkSituazioneDettagliata = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C5583D1D-81EF-47D0-A958-6A387DA86AB0",variableType:4}
 */
var vTipoSituazione = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"3C3BEA43-0CB3-415A-BB9F-B571A3D02E84",variableType:4}
 */
var vTipoSituazioneMensile = 0;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"346DBED9-B4C4-4CFF-A5AB-D4C9BF96A360",variableType:93}
 */
var vAllaData = null;

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
 * @properties={typeid:24,uuid:"E6B7DDAE-6640-4648-AA3D-D34797028F72"}
 */
function onDataChangeLimiteAnnuo(oldValue, newValue, event) {
	
    onDataChangeMediaSettimanale(0,0,event);
    
    if(newValue)
    	vChkMediaSettimanale = 0;
    
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
 * @properties={typeid:24,uuid:"882AA140-0ACE-460E-B2F7-2CE8DD08AC88"}
 */
function onDataChangeMediaSettimanale(oldValue, newValue, event) {

	elements.rdb_tipo_situazione_mensile.enabled = newValue;
    elements.lbl_alla_data.enabled = newValue;
    elements.fld_alla_data.enabled = newValue;
    elements.btn_alla_data.enabled = newValue;
    elements.chk_situazione_dettagliata.enabled = newValue;
    elements.lbl_situazione_dettagliata.enabled = newValue;
    
    if(newValue)
    	vChkLimiteAnnuo = 0;
    
    globals.ma_utl_setStatus('edit',controller.getName());
    
	return true;
}

/**
 * @properties={typeid:24,uuid:"71C14F98-732F-49D7-83A4-6D63ADDBB0FB"}
 */
function getOptions()
{
	var params = _super.getOptions();
	   
	    params.tiposituazione        = vTipoSituazione, //limite annuo o situazione media settimanale
		params.tiposituazionemensile = vTipoSituazioneMensile;
		params.alladata              = vAllaData;
        params.stampadettagliata     = vChkSituazioneDettagliata;		      

    return params;    
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {Object} _firstShow
 * @param {Object} _event
 *
 * @properties={typeid:24,uuid:"17FBFC29-3380-47F6-8E4C-4B517931967C"}
 */
function onShowForm(_firstShow,_event)
{
	vAllaData = globals.TODAY;
	
	return;
}