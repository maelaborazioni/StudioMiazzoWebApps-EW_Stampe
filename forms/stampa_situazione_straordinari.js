/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D79C5C95-99B7-40A9-8236-9F052B5592AA",variableType:4}
 */
var vFormat = 0;
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"DDFC7630-1E24-459A-8935-6AE8FB4D5E61",variableType:93}
 */
var _al;

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"9CCA83C0-D8FE-4EF5-B808-802F58A76F41",variableType:-4}
 */
var _arrDitteSel = [];

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"668ACBE0-5D57-4329-8A0E-802AD83450CE",variableType:93}
 */
var _dal;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2667DB4F-1C53-478F-825C-4AC2454C4DDA",variableType:4}
 */
var _idditta = -1;

/**
 * 
 * Lancia il processo di stampa della situazione straordinari
 * 
 * @param {JSEvent} event
 * 
 * @properties={typeid:24,uuid:"5C009905-5A7B-44F8-A12E-ED8170EAB7D4"}
 */
function stampaSituazioneStraordinari(event) {

	var _frmOpt = forms.stampa_situazione_straordinari_opzioni;

	var iddipendenti = selectLavoratori();
	if (!iddipendenti || iddipendenti.length === 0)
		return false;
	
	var params = _frmOpt.getOptions();
	params['idditta'] = idditta;
	params['iddipendenti'] = iddipendenti;
	params['bexcel'] = vFormat;
	params['groupcontratto'] = forms.stampa_filtri_anagrafici.vGroupContratto;
	params['groupqualifica'] = forms.stampa_filtri_anagrafici.vGroupQualifica;
	params['groupposizioneinps'] = forms.stampa_filtri_anagrafici.vGroupPosizioneinps;
	params['groupsedelavoro'] = forms.stampa_filtri_anagrafici.vGroupSedelavoro;
	params['groupraggruppamento'] = forms.stampa_filtri_anagrafici.vGroupRaggruppamento;
	params['grouptiporaggruppamento'] = forms.stampa_filtri_anagrafici.vRaggruppamentoCodice;
	
	// add new operation info for future updates
	var operation = scopes.operation.create(params['idditta'],globals.getGruppoInstallazioneDitta(params['idditta']),params['periodo'],globals.OpType.SSO);
	if(operation == null || operation.operationId == null)
	{
		globals.ma_utl_showErrorDialog('Errore durante la preparazione dell\'operazione lunga. Riprovare o contattare il  servizio di Assistenza.');
		return false;
	}
	params.operationid = operation.operationId;
	params.operationhash = operation.operationHash;
	
	var url = globals.WS_REPORT + "/Report32/HourStatisticsAsync";
	
	globals.addJsonWebServiceJob(url, params);
	
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C188DF1C-CFC5-4577-9B23-988FFA5D2DEF"}
 */
function annullaStampaStatEventi(event) {
	
	globals.ma_utl_setStatus('browse','stampa_situazione_straordinari_opzioni');
	globals.svy_mod_closeForm(event);
}

/**
 * 
 * @param {JSFoundset} _fs
 * @return {JSFoundset}
 *
 * @properties={typeid:24,uuid:"30C1AF4A-C2F4-4AEC-AFDB-5DA00924721F"}
 */
function FiltraDipStatistica(_fs)
{
	_fs.addFoundSetFilterParam('idditta','IN', globals.foundsetToArray(foundset,'idditta'));
	//_fs.addFoundSetFilterParam('idditta','=',_idditta);
	_fs.addFoundSetFilterParam('assunzione','^||<=',_al);
	_fs.addFoundSetFilterParam('cessazione','^||>=',_dal);
	_fs.sort('nominativo asc');
//	_fs.loadAllRecords();
	
	return _fs;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B41466CF-34D8-412F-A7C0-F2B28B48FE8E"}
 */
function onShow(firstShow, event) {
	
	_super.onShowForm(firstShow,event);
	elements.opzioni_panel.tabIndex = 2;
	
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"7076D925-72C3-4CB3-9152-B37A650EA8AC"}
 */
function confermaStampa(event)
{
	if(stampaSituazioneStraordinari(event))
		globals.svy_mod_closeForm(event);
}
