/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"38501111-D3D5-4B57-965F-963A38122DF4",variableType:93}
 */
var vDallaData = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"FC04BB19-CBE7-4824-AB95-1DBFD749936E",variableType:93}
 */
var vAllaData = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0FBA528C-0610-411D-9E79-DF75F39740FD",variableType:4}
 */
var vChkSingoloDip = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7CFF40E4-8C2B-49C4-8CAA-7BBBDE42E106",variableType:4}
 */
var vChkDatiContrattuali = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DAA2DADD-6BC9-4259-BCAF-A477BBBE11D2",variableType:4}
 */
var vChkCausalizzate = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"02E78314-F2EC-4384-AE30-881CA011533C",variableType:4}
 */
var vChkDatiRaggruppamenti = 1;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"F4096BFB-844C-4185-86D1-27C23B87FB85",variableType:8}
 */
var vIdLavoratore = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"7A469DDE-49D0-446C-B3B4-206F343581F6",variableType:8}
 */
var vCodice = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"3D527E23-6808-4291-8D2E-701178E40DFE"}
 */
var vNominativo = null;

/**
 * @properties={typeid:24,uuid:"B68D1495-07C7-43E6-B936-83D707D9039E"}
 */
function selectLavoratore()
{
	globals.ma_utl_showLkpWindow
	(
		{
			  lookup: forms.stampa_esportazione_timbrature.foundset.tipologia === globals.Tipologia.ESTERNA ? 'AG_Lkp_LavoratoriEsterni' : 'AG_Lkp_Lavoratori'  
			, returnForm: controller.getName()
			, methodToAddFoundsetFilter: 'filterLavoratore'
			, methodToExecuteAfterSelection : 'updateLavoratore'	
		}
	);
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"5FFCC800-7EE9-41AB-BC43-57C42EB15AE8"}
 */
function filterLavoratore(fs)
{
	var frm = forms.stampa_esportazione_timbrature;
	
	var fsLavInForza = frm.getLavoratori(vDallaData,vAllaData);
	if(fsLavInForza)
	{
		fs.addFoundSetFilterParam('idditta','=',frm.idditta);
		fs.addFoundSetFilterParam('idlavoratore','IN',globals.foundsetToArray(fsLavInForza,'idlavoratore'));
	}
	return fs;
}

/**
 * @param {JSRecord<db:/ma_anagrafiche/lavoratori>} lav
 * 
 * @properties={typeid:24,uuid:"8733D2E7-A06F-4D1C-8086-68A6E55D31BE"}
 */
function updateLavoratore(lav)
{
	vIdLavoratore = lav.idlavoratore;
	vCodice = lav.codice;
	vNominativo = lav.nominativo;
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"08AD7318-C799-46F4-82B4-2647D24EB5C8"}
 */
function onDataChangeSingoloDipendente(oldValue, newValue, event) 
{
	elements.lbl_codice.enabled =
		elements.lbl_nominativo.enabled =
			elements.btn_lkp_dipendente.enabled = newValue;
	elements.lbl_codice.readOnly =
		elements.lbl_nominativo.readOnly = newValue;
			
	if(!newValue)
		vIdLavoratore = vCodice = vNominativo = null;
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"14088335-0AB7-43DF-B556-6FF109F3D3D8"}
 */
function validaOptions()
{
	if(vDallaData == null || vAllaData == null)
	{
		globals.ma_utl_showWarningDialog('Controllare i valori inseriti per le date','Esportazione timbrature');
		return false;
	}
	
	if(vChkSingoloDip && vIdLavoratore == null)
	{
		globals.ma_utl_showWarningDialog('Si è scelto di filtrare su di un singolo dipendente ma non è stato selezionato alcun dipendente','Esportazione timbrature');
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
 * @properties={typeid:24,uuid:"C73DC669-F2F0-4CCC-AB16-D805AB1872D6"}
 */
function onShow(firstShow, event) 
{
	var idDittaSel = globals.isInterinale(forms.stampa_esportazione_timbrature.idditta) ? globals.getDittaRiferimento(forms.stampa_esportazione_timbrature.idditta) : forms.stampa_esportazione_timbrature.idditta;
	
	if(!scopes.giornaliera.haTimbratureCausalizzate(idDittaSel))
	{
		elements.chk_causalizzate.enabled = 
			elements.lbl_causalizzate.enabled = false;
		vChkCausalizzate = 0;	
	}
}
