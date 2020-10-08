/**
 * @private
 *
 * @properties={typeid:24,uuid:"B4514D6F-7451-4E4B-A328-39BD7CF0CADA"}
 */
function stampaAnnotazioni() 
{	
//	var iddipendenti = selectLavoratori();
//	if (!iddipendenti || iddipendenti.length === 0)
//		return false;
	
	var params = forms.stampa_annotazioni_opzioni.getOptions();
		params['idditta'] = idditta;
		params['iddipendenti'] = [];//iddipendenti;
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
		
	var url = globals.WS_REPORT + "/Report32/AnnotationsAsync";
	globals.addJsonWebServiceJob(url, params);
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"DFA1E547-2A0F-4235-9F90-4128EF9F7DAE"}
 */
function confermaStampa(event)
{
	var params = {
		processFunction: process_stampa_annotazioni,
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
 * @properties={typeid:24,uuid:"379B138D-39CE-48AD-82E4-737F93BD0BE5"}
 */
function process_stampa_annotazioni(event)
{
	try
	{
		if(stampaAnnotazioni())
		{
			goToBrowse();
			globals.svy_mod_closeForm(event);
		}
	}
	catch(ex)
	{
		var msg = 'Metodo process_stampa_annotazioni : ' + ex.message;
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
 * @properties={typeid:24,uuid:"6AD2F0C7-3876-4D81-A6E1-D06C1379AFB8"}
 */
function annullaStampa(event) 
{
	goToBrowse();
	globals.svy_mod_closeForm(event);
}

/**
 * @properties={typeid:24,uuid:"6446C5A3-EDCA-4A23-8B35-87BD860C641F"}
 */
function goToBrowse()
{
	globals.ma_utl_setStatus(globals.Status.BROWSE, controller.getName());
	for(var t = 1; t <= elements.opzioni_panel.getMaxTabIndex(); t++)
		globals.ma_utl_setStatus(globals.Status.BROWSE, elements.opzioni_panel.getTabFormNameAt(t));
}

/**
 * @properties={typeid:24,uuid:"26AD3BC8-2BC9-4FB5-8F5F-702B4DE9FDA4"}
 */
function goToEdit()
{
	globals.ma_utl_setStatus(globals.Status.EDIT, controller.getName());
	for(var t = 1; t <= elements.opzioni_panel.getMaxTabIndex(); t++)
		globals.ma_utl_setStatus(globals.Status.EDIT, elements.opzioni_panel.getTabFormNameAt(t));
}
/**
 *
 * @param {Boolean} _firstShow
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"400DC7A4-93F3-44E3-86F1-E21DA43C6801"}
 */
function onShowForm(_firstShow, _event) 
{
	plugins.busy.prepare();
	_super.onShowForm(_firstShow, _event);
	goToEdit();
}

/**
*
* @param {JSEvent} event
*
* @properties={typeid:24,uuid:"5DFAC46E-2C48-4B54-BC37-BBA4AB270033"}
*/
function onHide(event) 
{
	goToBrowse();
	_super.onHide(event);
}

/**
 * 
 * @param {JSFoundset} _fs
 * @return {JSFoundset}
 *
 * @properties={typeid:24,uuid:"B4E1C0B9-DA2E-4A10-91EB-8CE0329AE726"}
 */
function FiltraDipAnnotazioni(_fs)
{
	var _frmOpt = forms.stampa_annotazioni_opzioni;
	
	_fs.addFoundSetFilterParam('assunzione','^||<=',globals.getFirstDatePeriodo(_frmOpt.vAnnoDal * 100 + _frmOpt.vMeseDal));
	_fs.addFoundSetFilterParam('cessazione','^||>=',globals.getLastDatePeriodo(_frmOpt.vAnnoDal * 100 + _frmOpt.vMeseDal));
	
	return _fs;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"14F5FBEE-513F-4010-B04A-9FA4052FBE3F"}
 */
function filterLavoratori(fs)
{
	fs = _super.filterLavoratori(fs);
    return FiltraDipAnnotazioni(fs);
}