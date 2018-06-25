/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"19724F71-9FA4-43CD-8B9F-CBEBEAD8323C",variableType:4}
 */
var _idditta = -1;

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"FB6E3D8E-6945-4CA9-935D-4683B582106D",variableType:-4}
 */
var _arrDitteSel = [];

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AD389E29-23F7-49A7-B262-20506F39CAE4",variableType:4}
 */
var vFormat = 0;

/**
 * @properties={typeid:24,uuid:"EF2243E5-5E28-44E5-A722-BF300CBDE7DE"}
 */
function stampaPresentiAssenti()
{
	if(!validaStampa())
		return false;
	
	var params = forms.stampa_presenti_assenti_opzioni.getOptions();
	    params['idgruppoinstallazione'] = -1;
	    params['iddipendenti'] = [];
	    params['bexcel'] = vFormat;
	    params['periodo'] = globals.toPeriodo(globals.TODAY.getFullYear(),globals.TODAY.getMonth()+1);
	    params['groupcontratto'] = forms.stampa_filtri_anagrafici.vGroupContratto;
		params['groupqualifica'] = forms.stampa_filtri_anagrafici.vGroupQualifica;
		params['groupposizioneinps'] = forms.stampa_filtri_anagrafici.vGroupPosizioneinps;
		params['groupsedelavoro'] = forms.stampa_filtri_anagrafici.vGroupSedelavoro;
		params['groupraggruppamento'] = forms.stampa_filtri_anagrafici.vGroupRaggruppamento;
		params['grouptiporaggruppamento'] = forms.stampa_filtri_anagrafici.vRaggruppamentoCodice;
		
	var url = globals.WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaPresentiAssenti";
	globals.addJsonWebServiceJob(url,params);
	
	return true;
	
}

/**
 * Stampa i presenti assenti
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"067C72E3-7041-4EDE-9914-3DE3B6A6F57B"}
 */
function confermaStampa(event)
{
	var params = {
		processFunction: process_conferma_stampa_presenti_assenti,
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
 * @properties={typeid:24,uuid:"34131C17-00B2-4258-BD71-BF35CE7DB0C3"}
 */
function process_conferma_stampa_presenti_assenti(event)
{
	try
	{
		if(stampaPresentiAssenti())
		{
		   globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());	
		   globals.svy_mod_closeForm(event);
		}
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_presenti_assenti : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * Chiude la finestra ed aggiorna la visualizzazione
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"77061E54-CC6C-470C-9DFE-FE1F2D3A075A"}
 */
function annullaStampaPresentiAssenti(event)
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * @properties={typeid:24,uuid:"2B4A3E7B-17CC-48DC-8023-CEEA84D492F2"}
 */
function validaStampa()
{
	var frm = forms.stampa_presenti_assenti_opzioni;
	if(frm._chkSituazioneParametrizzata)
	{
		if (!(frm._alGiorno && frm._dalGiorno && frm._dalleOre && frm._alleOre))
			return false;
	}
	if(frm._chkSingolaDitta)
	{
		if(frm._idditta == null)
			return false;
	}
	return true;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"08E3E5F7-A4CD-4520-B23D-08B2E7160E0F"}
 */
function onShow(firstShow, event) 
{
	plugins.busy.prepare();
	_super.onShowForm(firstShow,event);
	elements.opzioni_panel.tabIndex = 2;
}
