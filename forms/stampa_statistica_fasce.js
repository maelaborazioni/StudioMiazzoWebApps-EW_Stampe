/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6A7BA07B-BB9E-438D-8F07-9D9D3F7E1F17",variableType:4}
 */
var vFormat = 0;

/**
 * @param {JSEvent} event
 * 
 * @return Boolean
 * 
 * @properties={typeid:24,uuid:"983F899E-FE3B-4A6A-BE40-0D85D512C1B7"}
 */
function stampaStatisticaFasce(event) {
	
	var _frmOpt = forms.stampa_statistica_fasce_opzioni;

	var iddipendenti = selectLavoratori();
	if (!iddipendenti || iddipendenti.length === 0)
		return false;

	var params = _frmOpt.getOptions();
	params['idditta'] = idditta;
	params['iddipendenti'] = iddipendenti;
	params['bexcel'] = vFormat;

	// add new operation info for future updates
	var operation = scopes.operation.create(params['idditta'],globals.getGruppoInstallazioneDitta(params['idditta']),params['periodo'],globals.OpType.SSF);
	if(operation == null || operation.operationId == null)
	{
		globals.ma_utl_showErrorDialog('Errore durante la preparazione dell\'operazione lunga. Riprovare o contattare il  servizio di Assistenza.');
		return false;
	}
	params.operationid = operation.operationId;
	params.operationhash = operation.operationHash;
	
	var url = globals.WS_REPORT + "/Report32/ShiftStatisticsAsync";
	globals.addJsonWebServiceJob(url, params);
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"E21280A9-0F71-40E6-BB1F-D0850DC0BCC3"}
 */
function confermaStampa(event)
{
	var params = {
		processFunction: process_conferma_stampa_statistica_fasce,
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
 * @properties={typeid:24,uuid:"AE287567-1EE5-4F50-8CFE-A218FC66F6D3"}
 */
function process_conferma_stampa_statistica_fasce(event)
{
	try
	{
	   if(stampaStatisticaFasce(event))
	      globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_statistica_fasce : ' + ex.message;
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
 * @properties={typeid:24,uuid:"0CACEFF1-1885-4EA5-8702-ECFED1E9A608"}
 */
function FiltraDipStatistica(_fs)
{
	var _frmOpt = forms.stampa_statistica_fasce_opzioni;
	
	_fs.addFoundSetFilterParam('assunzione','^||<=',_frmOpt.vAllaData);
	_fs.addFoundSetFilterParam('cessazione','^||>=',_frmOpt.vDallaData);
	_fs.addFoundSetFilterParam('idditta','IN', globals.foundsetToArray(foundset,'idditta'));
//	_fs.addFoundSetFilterParam('idditta','IN',idditta);
	
	return _fs;
}

/**
 * @properties={typeid:24,uuid:"BD2D45C8-8470-4B17-8AA7-19B0F3F420F7"}
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
 * @properties={typeid:24,uuid:"5237E40B-F97E-41CF-9034-0A9B7223D821"}
 */
function onShowForm(_firstShow, _event) 
{
	plugins.busy.prepare();
	_super.onShowForm(_firstShow,_event);
	
	var frm = forms.stampa_statistica_fasce_opzioni;
	var periodo = globals.getUltimoPeriodoAttivato(idditta);
	var MM = globals.getMeseDaPeriodo(periodo);
	var yy = globals.getAnnoDaPeriodo(periodo);
	frm.vDallaData = new Date(yy,MM-1,1);
	frm.vAllaData = globals.getLastDate(frm.vDallaData);
	
    return;
}
