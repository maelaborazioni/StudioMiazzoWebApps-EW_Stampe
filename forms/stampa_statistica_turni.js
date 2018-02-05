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
	
	var iddipendenti = selectLavoratori();
	if (!iddipendenti || iddipendenti.length === 0)
		return false;

	params = _frmOpt.getOptions();
	params['idditta'] = idditta;
	params['iddipendenti'] = iddipendenti;
	params['bexcel'] = vFormat;
	
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
	plugins.busy.unblock();
	
	if(stampaStatisticaTurni(event));
	{
		globals.svy_mod_closeForm(event);
	
		if(params.suddivisioneperdipendente)
			globals.exportReportRiepilogoTurniDip(params);
		else
			globals.exportReportRiepilogoTurni(params);
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
	_fs.addFoundSetFilterParam('idditta','IN',idditta);
	
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
