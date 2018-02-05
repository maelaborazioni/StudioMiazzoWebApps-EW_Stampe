/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"393F34DD-7696-4F9D-A10F-D534557F018B",variableType:93}
 */
var vAllaData = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"EF23DDBD-BDB5-4E75-BA07-498109180EEF",variableType:4}
 */
var vChkSelezionePerGiorno = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F754F10C-F428-49E6-BB44-E5CC114BABD8",variableType:4}
 */
var vChkSelezionePerPeriodo = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"ADD4CEF6-61D5-4E5B-A70B-01908C375BD8",variableType:8}
 */
var vChkDettaglioMese = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E8EB3FF0-2231-4E69-B6B7-597551BD22C2",variableType:8}
 */
var vChkTotaliLavoratori = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"BAA7ACFE-AB43-4454-AB9C-6966CF558EFE",variableType:8}
 */
var vChkTotaliDitta = 1;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"A40846FF-3F0A-4379-9232-4471C73020E1",variableType:93}
 */
var vDallaData = null;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"C5C8687A-A64F-4F45-8C49-65F22A5DF769",variableType:93}
 */
var vDalPeriodo = null;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"4EEA6697-49C0-414C-813C-EE587603DFB7",variableType:93}
 */
var vAlPeriodo = null;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"7F42BE45-10E0-47D7-998B-951419E212F4",variableType:93}
 */
var vAlPeriodoFinale = null;


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
 * @properties={typeid:24,uuid:"127B3A4E-047A-4C15-B85E-4DD4996C329E"}
 */
function onDataChangeTotaliLavoratori(oldValue, newValue, event) {
	
    if(newValue)
    {
    	vChkTotaliDitta = 0;
    	onDataChangeTotaliDitta(0,!newValue,event);
    }
	 
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
 * @properties={typeid:24,uuid:"932BE571-8BE8-410A-AFB3-A3AAB9473D26"}
 */
function onDataChangeTotaliDitta(oldValue, newValue, event) {
	
    if(newValue)
    {
    	vChkTotaliLavoratori = 0;
    	onDataChangeTotaliLavoratori(0,!newValue,event);
    }
    
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
 * @properties={typeid:24,uuid:"183E620D-727F-4AFB-B74B-F9D3492C0206"}
 */
function onDataChangeData(oldValue, newValue, event) {
	
	elements.fld_dal_giorno.enabled = newValue;
	elements.fld_al_giorno.enabled = newValue;
	elements.btn_dal_giorno.enabled = newValue;
	elements.btn_al_giorno.enabled = newValue;
	elements.fld_dal_periodo.enabled = !newValue;
	elements.fld_al_periodo.enabled = !newValue;
	elements.btn_dal_periodo.enabled = !newValue;
	elements.btn_al_periodo.enabled = !newValue;
	
	if(newValue)
		vChkSelezionePerPeriodo = 0;
	
	globals.ma_utl_setStatus('edit',controller.getName());
	
	return true;
}

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"4D98EB16-BDDF-42C9-92C7-5F65319342ED"}
 */
function onDataChangePeriodo(oldValue,newValue,event)
{
	elements.fld_dal_periodo.enabled = newValue;
	elements.fld_al_periodo.enabled = newValue;
	elements.btn_dal_periodo.enabled = newValue;
	elements.btn_al_periodo.enabled = newValue;
	elements.fld_dal_giorno.enabled = !newValue;
	elements.fld_al_giorno.enabled = !newValue;
	elements.btn_dal_giorno.enabled = !newValue;
	elements.btn_al_periodo.enabled = !newValue;
	
	if(newValue)
		vChkSelezionePerGiorno = 0;
	
	globals.ma_utl_setStatus('edit',controller.getName());
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"AB7B4714-C719-4A99-9348-37237DA30DD4"}
 */
function getOptions()
{
	var params = _super.getOptions();
        params.dalladata             = vChkSelezionePerGiorno ? utils.dateFormat(new Date(vDallaData.getFullYear(),vDallaData.getMonth(),vDallaData.getDate()),globals.EU_DATEFORMAT) :
        	                                                    utils.dateFormat(new Date(vDalPeriodo.getFullYear(),vDalPeriodo.getMonth(),1),globals.EU_DATEFORMAT);
        params.alladata              = vChkSelezionePerGiorno ? utils.dateFormat(new Date(vAllaData.getFullYear(),vAllaData.getMonth(),vAllaData.getDate()),globals.EU_DATEFORMAT) : 
        	                                                    utils.dateFormat(new Date(vAlPeriodo.getFullYear(),vAlPeriodo.getMonth(),globals.getTotGiorniMese(vAlPeriodo.getMonth()+1,vAlPeriodo.getFullYear())),globals.EU_DATEFORMAT);
        params.raggruppamese         = vChkDettaglioMese;
        params.totalilavoratori      = vChkTotaliLavoratori;
        params.totaliditta           = vChkTotaliDitta;
        params.periodo               = globals.TODAY.getFullYear()* 100 + globals.TODAY.getMonth() + 1;         
    return params;    
        
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
 * @properties={typeid:24,uuid:"15D4E71A-365D-41B0-9256-667C0CC7D00B"}
 */
function onDataChangeDalPeriodo(oldValue, newValue, event) {
	
	return true;
}

/**
 * 
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"74F7F3FA-64DF-4AFC-9420-5830C20044BB"}
 */
function onDataChangeAlPeriodo(oldValue, newValue, event) {
	
	vAlPeriodoFinale = new Date(vAlPeriodo.getFullYear(),vAlPeriodo.getMonth() + 1,0);
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
 * @properties={typeid:24,uuid:"FF5B6BB4-D1E0-41AE-9F5D-A5965987D737"}
 */
function onDataChangeChkSelezionePerGiorno(oldValue, newValue, event)
{
	vChkSelezionePerPeriodo = !newValue;
	elements.fld_dal_giorno.enabled = newValue;
	elements.lbl_dal_giorno.enabled = newValue;
	elements.btn_dal_giorno.enabled = newValue;
	elements.fld_al_giorno.enabled = newValue;
	elements.lbl_al_giorno.enabled = newValue;
	elements.btn_al_giorno.enabled = newValue;
	elements.fld_dal_periodo.enabled = !newValue;
	elements.lbl_dal_periodo.enabled = !newValue;
	elements.btn_dal_periodo.enabled = !newValue;
	elements.fld_al_periodo.enabled = !newValue;
	elements.lbl_al_periodo.enabled = !newValue;
	elements.btn_al_periodo.enabled = !newValue;
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	
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
 * @properties={typeid:24,uuid:"260E4525-C9A7-4CD2-A4F8-F37CE9E4246F"}
 */
function onDataChangeChkSelezionePerPeriodo(oldValue, newValue, event) 
{
	vChkSelezionePerGiorno = !newValue;
	elements.fld_dal_periodo.enabled = newValue;
	elements.lbl_dal_periodo.enabled = newValue;
	elements.btn_dal_periodo.enabled = newValue;
	elements.fld_al_periodo.enabled = newValue;
	elements.lbl_al_periodo.enabled = newValue;
	elements.btn_al_periodo.enabled = newValue;
	elements.fld_dal_giorno.enabled = !newValue;
	elements.lbl_dal_giorno.enabled = !newValue;
	elements.btn_dal_giorno.enabled = !newValue;
	elements.fld_al_giorno.enabled = !newValue;
	elements.lbl_al_giorno.enabled = !newValue;
	elements.btn_al_giorno.enabled = !newValue;
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	
	return true;
}
