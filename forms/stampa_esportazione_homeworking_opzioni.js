/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"9FE5C9EA-5712-46AC-9306-4D2D3CB02D19",variableType:93}
 */
var vDallaData = null;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"C56613D4-A7AB-4897-8CB7-4BC94B4F2C3D",variableType:93}
 */
var vAllaData = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"281A013B-FB10-48DD-A597-AA7C8A3F48D6",variableType:4}
 */
var vChkSingoloDip = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1E720A69-85BC-4796-A203-E99F7AB31018",variableType:4}
 */
var vChkDatiContrattuali = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CD062BE4-183A-47BC-970B-E9084F4C6DEE",variableType:4}
 */
var vChkCausalizzate = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"EA40865F-5757-4A12-8068-B29EA5FCE64F",variableType:4}
 */
var vChkDatiRaggruppamenti = 1;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"C500C88A-DA52-4174-ADDF-A2740A913F3C",variableType:8}
 */
var vIdLavoratore = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"0742C26D-F6BF-49AD-9FAD-942B4AB7E590",variableType:8}
 */
var vCodice = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"6831D5F2-CA2B-48EE-AB6D-840A5B3B6935"}
 */
var vNominativo = null;

/**
 * @properties={typeid:24,uuid:"A80F721F-C3B6-48C1-9582-6CEADD9E64E2"}
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
 * @properties={typeid:24,uuid:"3FD9AD7E-FC9B-4FDF-BD03-E9B6006D58CF"}
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
 * @properties={typeid:24,uuid:"74D8A28D-BB76-49A3-BC45-734A97B22AF1"}
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
 * @properties={typeid:24,uuid:"46704DCC-26E2-4730-BFF8-BF6DBD38DF81"}
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
 * @properties={typeid:24,uuid:"8207C996-2327-478D-A675-B30515E335A5"}
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
 * @properties={typeid:24,uuid:"D16BEF20-CF42-455A-886A-68E459CD9481"}
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
