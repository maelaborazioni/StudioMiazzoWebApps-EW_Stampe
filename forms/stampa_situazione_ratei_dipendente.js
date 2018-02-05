/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"0A6E7DF5-F619-47E2-8E81-824D9766CF54",variableType:93}
 */
var vAllaData = null;

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"A5D37B8E-D9E4-4C36-B4D3-D39A7EB2E478",variableType:-4}
 */
var vArrayCodiciRateo = [];

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A1A094C9-58B0-48E5-852D-3EEFCB5E8F8D"}
 * @AllowToRunInFind
 */
function stampaSituazioneRateiDipendente(event)
{
	if(!vAllaData)
	{
		globals.ma_utl_showWarningDialog('Inserire la data', 'Nessuna data selezionata');
		return false;
	}

	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
    globals.svy_mod_closeForm(event);
    
    /** @type {JSFoundset<db:/ma_anagrafiche/ditte_ratei>} */
	var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE, globals.Table.DITTE_RATEI);
	if(fs.find())
	{
		fs.ditte_ratei_to_ditte_rateiclassimaturazione.ditte_rateiclassimaturazione_to_e2rateiclassi.menssupplementare = 0;
		fs.search();
	}
	
	for(var i = 0; i < fs.getSize(); i++)
	   vArrayCodiciRateo.push(fs.getRecord(i).codice);
		
	var iddipendenti = [_to_sec_user$user_id.sec_user_to_sec_user_to_lavoratori.idlavoratore];							
	if (!iddipendenti || iddipendenti.length === 0)
		return false;	
	
	var params = new Object();
	    params['alladata']	= utils.dateFormat(vAllaData,globals.EU_DATEFORMAT);
	    params['daticontrattuali']= 1;
	    params['codicirateoselezionati'] = vArrayCodiciRateo;
	    params['periodo'] = vAllaData.getFullYear() * 100 + vAllaData.getMonth() + 1;
		params['idditta'] = globals.getDitta(iddipendenti[0]);
		params['iddipendenti'] = iddipendenti;
		params['bExcel'] = 0;
		params['groupContratto'] = 0;
		params['groupQualifica'] = 0;
		params['groupPosizioneInps'] = 0;
		params['groupSedeLavoro'] = 0;
		params['groupRaggruppamento'] = 0;
		params['groupTipoRaggruppamento'] = 0;
		
	var url = globals.WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaSituazioneRatei";
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
 * @properties={typeid:24,uuid:"59DFB66B-3056-42C8-8CE8-ABA13271B75C"}
 */
function annullaStampaSituazioneRateiDipendente(event) 
{
    globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
    globals.svy_mod_closeForm(event);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"34228806-A5FD-4E22-A50F-7F18198CF5E2"}
 */
function onShow(firstShow, event) 
{
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}
