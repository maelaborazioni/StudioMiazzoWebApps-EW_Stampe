/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"56077EBD-799E-4DBF-AEE1-1E442000AD4E",variableType:8}
 */
var _anno;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"778F8A6A-A7C1-4C89-B73B-5B1E964E3C1D",variableType:8}
 */
var _mese;

/** 
 * @param _firstShow
 * @param _event
 *
 * @properties={typeid:24,uuid:"A480DAEC-DFC9-462B-8AD4-2851A9C0041F"}
 */
function onShowForm(_firstShow, _event) {
	
	_anno = new Date().getFullYear()
	_mese = new Date().getMonth()
	
	return _super.onShowForm(_firstShow, _event)
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"35E522E3-993D-4E46-8F43-A25549785897"}
 */
function stampaSituazioneDitta(event) {
	 
	var _periodo = _anno * 100 + _mese
	
	globals.svy_nav_dc_setStatus('browse','stampa_situazione_ditta',true)
	
	application.getWindow('win_stampa_situazione_ditta').hide()
	
	var url = globals.WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaSituazioneDitta";
	var params = {
		          idditta : globals._dittaStampa, 
		          ditte : [globals._dittaStampa], 
				  periodo : _periodo, 
				  tipoconnessione : globals._tipoConnessione
				 };
	
	globals.addJsonWebServiceJob(url,params);
	
}




/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"31B6015F-962E-42A3-88C8-F8BB6226F9D8"}
 */
function annullaStampaSituazioneDitta(event) {
	
    globals.svy_nav_dc_setStatus('browse','stampa_situazione_ditta',true)
	
	application.getWindow('win_stampa_situazione_ditta').hide()
}
