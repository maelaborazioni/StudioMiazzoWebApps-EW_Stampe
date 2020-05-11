/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C3F3A015-477C-4B8D-9C40-89141AE77E92",variableType:4}
 */
var vFormat = 0;

/**
 * @properties={typeid:24,uuid:"FC30BD92-0317-4338-AE54-4096C181AEB8"}
 */
function stampaAnomalieTimbrature()
{
	var iddipendenti = selectLavoratori();
	if(!iddipendenti || iddipendenti.length === 0)
		return false; 
		
	var params = forms.stampa_anomalie_timbrature_opzioni.getOptions();
	    params['idditta'] = idditta;
	    params['iddipendenti'] = iddipendenti;
	    params['groupcontratto'] = forms.stampa_filtri_anagrafici.vGroupContratto;
		params['groupqualifica'] = forms.stampa_filtri_anagrafici.vGroupQualifica;
		params['groupposizioneinps'] = forms.stampa_filtri_anagrafici.vGroupPosizioneinps;
		params['groupsedelavoro'] = forms.stampa_filtri_anagrafici.vGroupSedelavoro;
		params['groupraggruppamento'] = forms.stampa_filtri_anagrafici.vGroupRaggruppamento;
		params['grouptiporaggruppamento'] = forms.stampa_filtri_anagrafici.vRaggruppamentoCodice;
	    
	// add new operation info for future updates
	var operation = scopes.operation.create(params['idditta'],globals.getGruppoInstallazioneDitta(params['idditta']),params['periodo'],globals.OpType.CE);
	if(operation == null || operation.operationId == null)
	{
		globals.ma_utl_showErrorDialog('Errore durante la preparazione dell\'operazione lunga. Riprovare o contattare il  servizio di Assistenza.');
		return false;
	}
	params.operationid = operation.operationId;
	params.operationhash = operation.operationHash;
		
	var url = globals.WS_REPORT + "/Report32/StampaAnomalieTimbratureAsync";
    globals.addJsonWebServiceJob(url,params);
	    
    return true;	
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"1290ABD6-76AC-4B94-9E18-0566CD0CA5A3"}
 */
function confermaStampa(event)
{
	switch(validaOpzioni())
	{
		case 1 :
		globals.ma_utl_showWarningDialog('Inserire una data di partenza diversa dalla data finale','Stampa anomalie timbrature');
		return;
		break;
		case 2 :
		globals.ma_utl_showWarningDialog('Compilare i campi relative alle date','Stampa anomalie timbrature');
		return;
		break;
		default:
			break;
	}
	
	var params = {
		processFunction: process_stampa_anomalie,
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
 * @properties={typeid:24,uuid:"D4957EAC-C5EA-44D5-B5CD-A98CFB852429"}
 */
function process_stampa_anomalie(event)
{
	try
	{
	    if(stampaAnomalieTimbrature())
	       globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_stampa_anomalie : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg);
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * @return {Number}
 * 
 * @properties={typeid:24,uuid:"BCD32CA4-06A2-42A4-8C0D-B04101EAC062"}
 */
function validaOpzioni()
{
	var frm = forms.stampa_anomalie_timbrature_opzioni;
	if(frm.vAllaData 
			&& frm.vDallaData)
	{
		if(frm.vAllaData == frm.vDallaData)
			return 1;
	    return 0;
	}
	else
		return 2;
			
}
/**
 *
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @param {Boolean} svyNavBaseOnShow
 *
 * @properties={typeid:24,uuid:"D26E358D-CEEA-458D-A576-0BDF3F417DA5"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	plugins.busy.prepare();
	fromGiornaliera = true;
	return _super.onShowForm(firstShow, event, svyNavBaseOnShow)
}

/**
 * @properties={typeid:24,uuid:"96D133B6-D18B-41AA-910E-5D9B798B0DC3"}
 */
function filterLavoratori(fs)
{
	fs = _super.filterLavoratori(fs);
	return FiltraDipPeriodo(fs);
}

/**
 * @param {JSFoundSet} fs
 *
 * @properties={typeid:24,uuid:"AE7FF44D-EDC8-4B73-87FB-C08A9E49E4A0"}
 */
function FiltraDipPeriodo(fs)
{
	if(fs)
	{
		fs.addFoundSetFilterParam('assunzione', '^||<=', forms.stampa_anomalie_timbrature_opzioni.vAllaData);
		fs.addFoundSetFilterParam('cessazione', '^||>=', forms.stampa_anomalie_timbrature_opzioni.vDallaData);
	}
	
	return fs;
}