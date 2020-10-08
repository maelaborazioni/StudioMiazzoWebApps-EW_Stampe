/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B4602E89-CB8E-45F7-BF3F-8E82FF8DC444",variableType:4}
 */
var vFormat = 0;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"162AAD6F-7B48-4640-9BF6-FCEA778D3068",variableType:93}
 */
var _al;

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"4D1ACCDA-66FB-4332-AAD2-AE2204CBCB84",variableType:-4}
 */
var _arrDitteSel = [];

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"C9402080-B7A3-4E82-8472-4F1E8C55837A",variableType:93}
 */
var _dal;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AE5B7C6A-1006-4CBF-BD82-E69383399E1C",variableType:4}
 */
var _idditta = -1;

/**
 * 
 * Lancia il processo di stampa della statistica eventi
 * 
 * @param {JSEvent} event
 * 
 * @properties={typeid:24,uuid:"D3FBD9E2-6482-4ABC-913F-76EE4C98620B"}
 */
function stampaStatisticaOre(event) {

	var _frmOpt = forms.stampa_statistica_ore_opzioni;
    
	if(!validaOpzioniStampaStatisticaOre())
		return false;
	
	var iddipendenti = selectLavoratori();
	if(!iddipendenti || iddipendenti.length === 0)
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
 * @properties={typeid:24,uuid:"6D76F04E-4F8C-4EEA-B232-4094AC9B6062"}
 */
function validaOpzioniStampaStatisticaOre()
{
	var frm = forms.stampa_statistica_ore_opzioni;
	if((frm.vChkSelezionePerGiorno && (!frm.vDallaData || !frm.vAllaData)) ||
	   (frm.vChkSelezionePerPeriodo && (!frm.vDalPeriodo || !frm.vAlPeriodo)))
	{
		globals.ma_utl_showWarningDialog('Controllare i valori immessi','Stampa statistica ore');
		return false;
	}
	
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"927374F1-9461-4DA8-B5E7-3980489D12FD"}
 */
function confermaStampa(event)
{
	var params = {
		processFunction: process_conferma_stampa_statistica_ore,
		message: '',
		opacity: 0.5,
		paneColor: '#434343',
		textColor: '#EC1C24',
		showCancelButton: false,
		cancelButtonText: '',
		dialogName: 'This is the dialog',
		fontType: 'Arial,4,25',
		processArgs: [event]
	};
	plugins.busy.block(params);
}


/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"1901A03E-C518-4E32-893B-3651FBF99B91"}
 */
function process_conferma_stampa_statistica_ore(event)
{
	try
	{
	    if(stampaStatisticaOre(event))
	       globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_statistica_ore : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7E49F3A3-6A7F-4278-9ACE-A7DBD32B1E82"}
 */
function annullaStampaStatOre(event) 
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * 
 * @param {JSFoundset} _fs
 * @return {JSFoundset}
 *
 * @properties={typeid:24,uuid:"D05F8D60-92A0-41F4-8974-90922D14C560"}
 */
function FiltraDipStatistica(_fs)
{
	var _frmOpt = forms.stampa_statistica_ore_opzioni;
	var _dateDal = _frmOpt.vChkSelezionePerGiorno ?
			    new Date(_frmOpt.vDallaData.getFullYear(),_frmOpt.vDallaData.getMonth(),_frmOpt.vDallaData.getDate()) :
			    new Date(_frmOpt.vDalPeriodo.getFullYear(),_frmOpt.vDalPeriodo.getMonth(),1);
	var _dateAl = _frmOpt.vChkSelezionePerGiorno ?
			    new Date(_frmOpt.vAllaData.getFullYear(),_frmOpt.vAllaData.getMonth(),_frmOpt.vAllaData.getDate()) : 
			    new Date(_frmOpt.vAlPeriodo.getFullYear(),_frmOpt.vAlPeriodo.getMonth(),globals.getTotGiorniMese(_frmOpt.vAlPeriodo.getMonth()+1,_frmOpt.vAlPeriodo.getFullYear()))	
	
	_fs.addFoundSetFilterParam('assunzione','^||<=',_dateAl);
	_fs.addFoundSetFilterParam('cessazione','^||>=',_dateDal);
		
	return _fs;
}

/**
 * @properties={typeid:24,uuid:"54A9833D-C2E6-423D-ADE5-0D2572F4E162"}
 */
function filterLavoratori(fs)
{
	fs = _super.filterLavoratori(fs);
    return FiltraDipStatistica(fs);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"60F0F75B-321D-4C62-AC5A-0154E5D25B9B"}
 */
function onShow(firstShow, event) 
{
	plugins.busy.prepare();
	_super.onShowForm(firstShow,event);
	elements.opzioni_panel.tabIndex = 2;
		
}
