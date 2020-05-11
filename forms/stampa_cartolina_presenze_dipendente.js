/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"8C530903-61BE-4206-A460-05C7E73C8510",variableType:93}
 */
var vPeriodo = null;
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CB3C9484-4FF5-4A3F-8235-5BF14478C3BB"}
 */
function annullaStampaCartolinaDipendente(event) {
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"ACB42C41-49FF-473C-B48C-5E56F7604D00"}
 */
function confermaStampaCartolinaDipendente(event) 
{
	var params = {
		processFunction: process_conferma_stampa_cartolina_dipendente,
		message: '',
		opacity: 0.5,
		paneColor: '#434343',
		textColor: '#EC1C24',
		showCancelButton: false,
		cancelButtonText: '',
		dialogName: 'This is the dialog',
		fontType: 'Arial,4,25',
		processArgs: []
	};
	plugins.busy.block(params);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"FBEFC100-9656-42A2-A7B3-C54D996A01FD"}
 */
function process_conferma_stampa_cartolina_dipendente(event)
{
	try
	{
		var idlavoratore = _to_sec_user$user_id.sec_user_to_sec_user_to_lavoratori.idlavoratore;
		var params = new Object();
		
		params['idditta'] = globals.getDitta(idlavoratore);
		if(!params['idditta'])
		{
			plugins.busy.unblock();
			globals.ma_utl_showWarningDialog('i18n:ma.msg.employee_not_found');
			return;
		}
				
		params['iddipendenti'] = [idlavoratore];
		params['periodo'] = vPeriodo.getFullYear() * 100 + vPeriodo.getMonth() + 1;
		params['daticontrattuali'] = 1;
		params['eventigiornaliera'] = 0;
		params['solocartolinecontimbr'] = 0;
		params['timbrmanuali'] = 1;
		params['timbrcausalizzate'] = 0;
		params['soloeventi'] = 0;
		params['totalieventi'] = 0;
		params['solotimbrmanuali'] = 0;
		params['spediscimail'] = 0;
		params['periodoal'] = params['periodo'];
		params['groupContratto'] = 0;
		params['groupQualifica'] = 0;
		params['groupPosizioneInps'] = 0;
		params['groupSedeLavoro'] = 0;
		params['groupRaggruppamento'] = 0;
		params['groupTipoRaggruppamento'] = 0;
		
		// add new operation info for future updates
		var operation = scopes.operation.create(params['idditta'],globals.getGruppoInstallazioneDitta(params['idditta']),params['periodo'],globals.OpType.SCP);
		if(operation == null || operation.operationId == null)
		{
			globals.ma_utl_showErrorDialog('Errore durante la preparazione dell\'operazione lunga. Riprovare o contattare il  servizio di Assistenza.');
			return;
		}
		params.operationid = operation.operationId;
		params.operationhash = operation.operationHash;
		
		globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
		globals.svy_mod_closeForm(event);
		
		var url = globals.WS_REPORT + "/Report32/StampaCartolinaPresenzeAsync";
		globals.addJsonWebServiceJob(url, params);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_cartolina_dipendente : ' + ex.message;
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
 * @properties={typeid:24,uuid:"14A80D7E-6DCA-492D-9572-766737753A9D"}
 */
function onShow(firstShow, event) 
{
	plugins.busy.prepare();
}
