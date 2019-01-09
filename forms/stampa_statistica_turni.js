/**
 * @properties={typeid:35,uuid:"642C8B49-C413-4F29-A597-BD651461C819",variableType:-4}
 */
var params = null;

/**
 * @param {JSEvent} event
 * 
 * @return Boolean
 * 
 * @properties={typeid:24,uuid:"0EB240EE-1A11-490C-AA3E-060AB6278335"}
 */
function stampaStatisticaTurni(event) {
	
	var _frmOpt = forms.stampa_statistica_turni_opzioni;
	
	var iddipendenti = globals.getLavoratoriDittaDalAl(globals.foundsetToArray(foundset,'idditta'),
											           forms.stampa_statistica_turni_opzioni.vDallaData,
													   forms.stampa_statistica_turni_opzioni.vAllaData);;
	if (!iddipendenti || iddipendenti.length === 0)
		return false;

	params = _frmOpt.getOptions();
	params['idditta'] = idditta;
	params['iddipendenti'] = iddipendenti;
	params['bexcel'] = vFormat;
	params['groupcontratto'] = forms.stampa_filtri_anagrafici.vGroupContratto;
	params['groupqualifica'] = forms.stampa_filtri_anagrafici.vGroupQualifica;
	params['groupposizioneinps'] = forms.stampa_filtri_anagrafici.vGroupPosizioneinps;
	params['groupsedelavoro'] = forms.stampa_filtri_anagrafici.vGroupSedelavoro;
	params['groupclassificazione'] = forms.stampa_filtri_anagrafici.vIdDittaClassificazione;
	//params['groupraggruppamento'] = forms.stampa_filtri_anagrafici.vGroupRaggruppamento;
	//params['grouptiporaggruppamento'] = forms.stampa_filtri_anagrafici.vRaggruppamentoCodice;
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"C9019C27-D429-4467-837C-A4306B1F8F4D"}
 */
function confermaStampa(event)
{
	var _params = {
		processFunction: process_conferma_stampa_statistica_turni,
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
	plugins.busy.block(_params);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"76DDB07F-DC39-443E-BBAC-805C68D169CE"}
 */
function process_conferma_stampa_statistica_turni(event)
{
	try
	{	
		if(stampaStatisticaTurni(event))
		{
			if(params.bexcel)
				exportExcel(event);
			else if(params.suddivisioneperdipendente)
				exportReport(event,globals.exportReportRiepilogoTurniDip);
			else
				exportReport(event,globals.exportReportRiepilogoTurni);
			
		}
		else throw new Error('Verificare i parametri della selezione');
		
//		if(proceed)
//		{	
//			globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
//			globals.svy_mod_closeForm(event);
//			
//			if(params.bexcel)
//				globals.exportExcelRiepilogoTurni(params);
//			else
//			{
//				if(params.suddivisioneperdipendente)
//					globals.exportReportRiepilogoTurniDip(params);
//				else
//					globals.exportReportRiepilogoTurni(params);
//			}			
//		}
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_statistica_turni : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {JSEvent} event
 * @param {Function} method
 * 
 * @properties={typeid:24,uuid:"99ACAC29-4BBB-49AB-BDBF-5866869AD612"}
 */
function exportReport(event,method)
{
	try
	{
		globals.ma_utl_setStatus(globals.Status.BROWSE,forms.stampa_filtri_anagrafici.controller.getName());
		globals.svy_mod_closeForm(event);
			
		var vDate = new Date();
		var values = 
		{
			op_hash		: utils.stringMD5HashBase64(idditta + vDate.toString()),
			op_ditta	: idditta,
			op_message	: 'Esportazione in corso...',
			op_periodo 	: utils.dateFormat(vDate, globals.PERIODO_DATEFORMAT)
		};
		
		globals.startAsyncOperation
		(
			 method,//globals.exportReportRiepilogoTurni,
			 [params],
			 null,
			 null,
			 globals.OpType.SST,
			 values
		);
		
		
	}
	catch(ex)
	{
		application.output(ex,LOGGINGLEVEL.ERROR);
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"2F3B2A47-2408-4062-A283-A356ACF64D88"}
 */
function exportExcel(event)
{
	try
	{
		globals.ma_utl_setStatus(globals.Status.BROWSE,forms.stampa_filtri_anagrafici.controller.getName());
		globals.svy_mod_closeForm(event);
			
		var vDate = new Date();
		var values = 
		{
			op_hash		: utils.stringMD5HashBase64(idditta + vDate.toString()),
			op_ditta	: idditta,
			op_message	: 'Esportazione in corso...',
			op_periodo 	: utils.dateFormat(vDate, globals.PERIODO_DATEFORMAT)
		};
		
		globals.startAsyncOperation
		(
			 globals.exportExcelRiepilogoTurni,
			 [params],
			 null,
			 null,
			 globals.OpType.EST,
			 values
		);
		
		
	}
	catch(ex)
	{
		application.output(ex,LOGGINGLEVEL.ERROR);
	}
}

/**
 * 
 * @param {JSFoundset} _fs
 * @return {JSFoundset}
 *
 * @properties={typeid:24,uuid:"F8E8F061-7DB0-4288-B7A0-6E6AD46F3880"}
 */
function FiltraDipStatistica(_fs)
{
	var _frmOpt = forms.stampa_statistica_turni_opzioni;
	
	_fs.addFoundSetFilterParam('assunzione','^||<=',_frmOpt.vAllaData);
	_fs.addFoundSetFilterParam('cessazione','^||>=',_frmOpt.vDallaData);
	_fs.addFoundSetFilterParam('idditta','IN', globals.foundsetToArray(foundset,'idditta'));
	//_fs.addFoundSetFilterParam('idditta','IN',idditta);
	
	return _fs;
}

/** *
 * @param _firstShow
 * @param _event
 *
 * @properties={typeid:24,uuid:"631613F5-BEF4-4907-8A3F-D5935F0B7E46"}
 */
function onShowForm(_firstShow, _event) 
{
	plugins.busy.prepare();
	_super.onShowForm(_firstShow,_event);
	
	var frm = forms.stampa_statistica_turni_opzioni;
	var periodo = globals.getUltimoPeriodoAttivato(idditta);
	var MM = globals.getMeseDaPeriodo(periodo);
	var yy = globals.getAnnoDaPeriodo(periodo);
	frm.vDallaData = new Date(yy,MM-1,1);
	frm.vAllaData = globals.getLastDate(frm.vDallaData);
	
    return;
}
/**
 * @properties={typeid:24,uuid:"88B3BC14-7A01-4139-9C4E-89724317156F"}
 */
function checkExport()
{
	return true;
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6648FE2E-F51B-4A6C-A367-B0F0B3810676"}
 */
function onDataChangeFileFormat(oldValue, newValue, event) 
{
	var enabled = !newValue;
		
	forms.stampa_statistica_turni_opzioni.elements.chk_dividi_dipendenti.enabled = enabled;

	if(!enabled)
		forms.stampa_statistica_turni_opzioni.vSuddividiPerDipendente = enabled;
	
	return true;
}
