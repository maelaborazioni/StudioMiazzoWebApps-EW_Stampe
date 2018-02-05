/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"8A99EEAE-AEBA-45C3-ADCA-6FDB00532E0A",variableType:93}
 */
var vDallaData = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"ED44932D-A7BD-441C-970E-90F860F29C1D",variableType:93}
 */
var vAllaData = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1F8ED596-6341-45BB-8BC9-CBBF14755B48"}
 */
function confermaStampaAnomalieCartolina(event)
{
	if(!validaPeriodo())
	{
		globals.ma_utl_showWarningDialog('Controllare i valori inseriti per il periodo','Stampa anomalie cartolina');
	    return;
	}
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
	
	var idlavoratore = _to_sec_user$user_id.sec_user_to_sec_user_to_lavoratori.idlavoratore;
	var iddipendenti = [idlavoratore];
	
	var params = new Object;
	
    params['idditta'] = globals.getDitta(idlavoratore);    
    if(!params['idditta'])
    {
    	globals.ma_utl_showWarningDialog('i18n:ma.msg.employee_not_found');
    	return;
    }
    
    params['iddipendenti'] = iddipendenti;
    params['dalladata'] = utils.dateFormat(vDallaData,globals.EU_DATEFORMAT);
    params['alladata'] = utils.dateFormat(vAllaData,globals.EU_DATEFORMAT);
    params['dividiperdip'] = 0;
    params['indirizzomail'] = "";
    params['spediscimail'] = 0;
    params['tipoconnessione'] = 1;
    params['periodo'] = vDallaData.getFullYear()*100 + vDallaData.getMonth() + 1;
    params['groupcontratto'] = 0;
	params['groupqualifica'] = 0;
	params['groupposizioneinps'] = 0;
	params['groupsedelavoro'] = 0;
	params['groupraggruppamento'] = 0;
	params['grouptiporaggruppamento'] = 0;
	
    var url = globals.WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaAnomalieTimbrature";
    globals.addJsonWebServiceJob(url,params);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"AC9D470D-69F6-45B4-B713-5EA7903153DF"}
 */
function annullaStampaAnomalieCartolina(event)
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * @properties={typeid:24,uuid:"575C86F0-CDBD-47DD-99E1-F69822555598"}
 */
function validaPeriodo()
{
	if(vDallaData && vAllaData)
		return true;
	else
		return false;
}
