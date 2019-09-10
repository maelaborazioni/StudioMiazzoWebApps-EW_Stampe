/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C4467891-DF43-46D5-80F8-F4C722A349B2",variableType:4}
 */
var vFormat = 0;

/**
 * @private 
 * 
 * @properties={typeid:24,uuid:"50B2E23B-3C73-4983-909F-95E6A936B290"}
 */
function stampaCartolinaPresenze() 
{
	var iddipendenti = selectLavoratori();
	if(!iddipendenti || iddipendenti.length === 0)
		return false;
	
	var params = forms.stampa_cartolina_presenze_opzioni.getOptions();
		params['idditta'] = idditta;
		params['iddipendenti'] = iddipendenti;
		params['groupcontratto'] = forms.stampa_filtri_anagrafici.vGroupContratto;
		params['groupqualifica'] = forms.stampa_filtri_anagrafici.vGroupQualifica;
		params['groupposizioneinps'] = forms.stampa_filtri_anagrafici.vGroupPosizioneinps;
		params['groupsedelavoro'] = forms.stampa_filtri_anagrafici.vGroupSedelavoro;
		params['groupraggruppamento'] = forms.stampa_filtri_anagrafici.vGroupRaggruppamento;
		params['grouptiporaggruppamento'] = forms.stampa_filtri_anagrafici.vRaggruppamentoCodice;
		
    var url = globals.WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaCartolinaPresenze";
	globals.addJsonWebServiceJob(url, params);
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"904493A2-B9F6-478A-B5DE-B6D659FF38AA"}
 */
function confermaStampa(event)
{
	var params = {
		processFunction: process_conferma_stampa,
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
 * @properties={typeid:24,uuid:"ADEB8DE9-3CAE-4769-B717-C7E07E825FA3"}
 */
function process_conferma_stampa(event)
{
	try
	{
	   if(stampaCartolinaPresenze())
	      globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * @properties={typeid:24,uuid:"256851A2-2786-40EC-B502-E63236D0C657"}
 * @AllowToRunInFind
 */
function FiltraDipPeriodo(fs)
{
	if(fs)
	{
		var frmOpt = forms.stampa_cartolina_presenze_opzioni;
		var firstDayOfMonth = frmOpt.vPeriodo;
		var lastDayOfMonth = globals.getLastDate(firstDayOfMonth);
		
		fs.addFoundSetFilterParam('assunzione', '^||<=', lastDayOfMonth);
		fs.addFoundSetFilterParam('cessazione', '^||>=', firstDayOfMonth);
	}
	
	return fs;
}

/**
 * @properties={typeid:24,uuid:"75A91696-D86B-4C5A-8DB4-3051FEBEB067"}
 */
function filterLavoratori(fs)
{
	fs = _super.filterLavoratori(fs);
	return FiltraDipPeriodo(fs);
}

/**
 *
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @param {Boolean} svyNavBaseOnShow
 *
 * @properties={typeid:24,uuid:"31A2970D-2DEC-49C3-821E-63B06AD82C19"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow)
{
	plugins.busy.prepare();
	fromGiornaliera = true;
	return _super.onShowForm(firstShow, event, svyNavBaseOnShow)
}
