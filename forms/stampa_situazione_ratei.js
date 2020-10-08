/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0C6D53F3-8A85-4781-ABB4-7200065ED6DE",variableType:4}
 */
var vFormat = 0;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"267BF77B-B36D-4399-9098-64C0A7C56851",variableType:4}
 */
var vIdLavoratore = -1;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *  
 * @private
 *
 * @properties={typeid:24,uuid:"A606C78E-D264-4E71-88F3-F9BCE4CE793E"}
 */
function stampaSituazioneRatei(event) 
{
	if(!forms.stampa_situazione_ratei_opzioni.vAllaData)
	{
		globals.ma_utl_showWarningDialog('Inserire la data', 'Nessuna data selezionata');
		return false;
	}

	/** @type {Array<Number>}*/
	var iddipendenti = selectLavoratori();							
	if (!iddipendenti || iddipendenti.length === 0)
		return false;	
	
	var params = forms.stampa_situazione_ratei_opzioni.getOptions();
		params['idditta'] = idditta;
		params['bexcel'] = vFormat;
		params['groupcontratto'] = forms.stampa_filtri_anagrafici.vGroupContratto;
		params['groupqualifica'] = forms.stampa_filtri_anagrafici.vGroupQualifica;
		params['groupposizioneinps'] = forms.stampa_filtri_anagrafici.vGroupPosizioneinps;
		params['groupsedelavoro'] = forms.stampa_filtri_anagrafici.vGroupSedelavoro;
		params['groupraggruppamento'] = forms.stampa_filtri_anagrafici.vGroupRaggruppamento;
		params['grouptiporaggruppamento'] = forms.stampa_filtri_anagrafici.vRaggruppamentoCodice;
	
		params['iddipendenti'] = params['groupraggruppamento'] ? scopes.lavoratori.sortByRaggruppamentoDettaglio(iddipendenti) : scopes.lavoratori.sortByNominativo(iddipendenti);
	
	// add new operation info for future updates
	var operation = scopes.operation.create(params['idditta'],globals.getGruppoInstallazioneDitta(params['idditta']),params['periodo'],globals.OpType.SSR);
	if(operation == null || operation.operationId == null)
	{
		globals.ma_utl_showErrorDialog('Errore durante la preparazione dell\'operazione lunga. Riprovare o contattare il  servizio di Assistenza.');
		return false;
	}
	params.operationid = operation.operationId;
	params.operationhash = operation.operationHash;
		
	var url = globals.WS_REPORT + "/Report32/RateSituationAsync";
	globals.addJsonWebServiceJob(url, params);
	  
	return true;
}

/**
 * 
 * @param {JSFoundset} _fs
 * @return {JSFoundset}
 *
 *
 * @properties={typeid:24,uuid:"8BE4D126-C857-46B6-AA77-1E8B5C766B8A"}
 */
function FiltraDipRatei(_fs)
{
	if(forms.stampa_situazione_ratei_opzioni.vAllaData)
		_fs.addFoundSetFilterParam('assunzione','^||<=',forms.stampa_situazione_ratei_opzioni.vAllaData);
	
	if(forms.stampa_situazione_ratei_opzioni.vAllaData)
		_fs.addFoundSetFilterParam('cessazione','^||>=',forms.stampa_situazione_ratei_opzioni.vAllaData);
	
	return _fs;
}

/**
 * @properties={typeid:24,uuid:"439FA892-7D78-4DCD-B15A-69D831DBAD69"}
 */
function filterLavoratori(fs)
{
	fs = _super.filterLavoratori(fs);
	return FiltraDipRatei(fs);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F3AB9640-768F-4218-B7AA-A1D51649A94B"}
 */
function confermaStampa(event) 
{
	var params = {
		processFunction: process_conferma_stampa_situazione_ratei,
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
 * @properties={typeid:24,uuid:"FE275B61-CD79-46A6-8B86-1A4E8856C38A"}
 */
function process_conferma_stampa_situazione_ratei(event)
{
	try
	{ 
	    if(stampaSituazioneRatei(event))
	       globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_situazione_ratei : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"25523262-AD52-41C5-AC10-ADA9BCC58F35"}
 */
function onShowForm(firstShow, event)
{
	plugins.busy.prepare();
	
	_super.onShowForm(firstShow,event);
	
	var frm = forms.stampa_situazione_ratei_opzioni;
	frm.vAllaData = globals.TODAY;
	frm.vCodiciRatei = 0;
	frm.vDatiContrattuali = 0;
	frm.onDataChangeChkCodiciRatei(0,0,event);
}
