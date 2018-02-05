/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9DBFE6FB-460C-40D9-A00F-55C06BB97F66",variableType:4}
 */
var vFormat = 0;

/**
 * @param {JSEvent} event
 * 
 * @return Boolean
 * 
 * @properties={typeid:24,uuid:"95B43D29-28C4-49C3-8A23-B3E46F5C7785"}
 */
function stampaStatisticaEventi(event) {
	
	var _frmOpt = forms.stampa_statistica_eventi_opzioni;

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
	
	var url = globals.WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaStatisticaEventi";
	globals.addJsonWebServiceJob(url, params);
	
	return true;
}


/**
 * @properties={typeid:24,uuid:"34950D9F-CF27-49BB-AA4D-8D0A816CC7B0"}
 */
function confermaStampa(event)
{
	var params = {
		processFunction: process_conferma_stampa_statistica_eventi,
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
 * @properties={typeid:24,uuid:"C267195D-4144-4CC6-AAB0-4945A6F30597"}
 */
function process_conferma_stampa_statistica_eventi(event)
{
	try
	{
	   if(stampaStatisticaEventi(event))
	      globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_statistica_eventi : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * 
 * @param {JSFoundset} _fs
 * @return {JSFoundset}
 *
 * @properties={typeid:24,uuid:"33EEA249-4C95-42C1-9DFE-AB8B7B506522"}
 */
function FiltraDipStatistica(_fs)
{
	var _frmOpt = forms.stampa_statistica_eventi_opzioni;
	
	_fs.addFoundSetFilterParam('assunzione','^||<=',_frmOpt.vAllaData);
	_fs.addFoundSetFilterParam('cessazione','^||>=',_frmOpt.vDallaData);
	
	return _fs;
}

/**
 * @properties={typeid:24,uuid:"24B2B72D-50EB-447D-9FFD-34F70E026915"}
 */
function filterLavoratori(fs)
{
	fs = _super.filterLavoratori(fs);
    return FiltraDipStatistica(fs);
}

/** *
 * @param _firstShow
 * @param _event
 *
 * @properties={typeid:24,uuid:"6D003477-3F68-4560-B770-876BCABF1D9D"}
 */
function onShowForm(_firstShow, _event) 
{
	plugins.busy.prepare();
	_super.onShowForm(_firstShow,_event);
	
	var frm = forms.stampa_statistica_eventi_opzioni;
	var periodo = globals.getUltimoPeriodoAttivato(idditta);
	var MM = globals.getMeseDaPeriodo(periodo);
	var yy = globals.getAnnoDaPeriodo(periodo);
	frm.vDallaData = new Date(yy,MM-1,1);
	frm.vAllaData = globals.getLastDate(frm.vDallaData);
	frm.vDatiContrattuali = 1;
	frm.vTotaliADipendente = 0;
	frm.vTotaliGiorno = 0;
	frm.vSoloTotali = 0;
	frm.vEventi = 0;
	frm.vRiepilogoEventiSelezionati = '';
	frm.vTipoGiornaliera = 0;
	frm.vVisualizzazione = 0;
	
	frm.onDataChangeChkEvSel(0,0,_event);
	
    return;
}

