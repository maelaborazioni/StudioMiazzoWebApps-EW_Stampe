/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"93B48149-F38E-4CB2-A7A7-51EFB4B784A0",variableType:-4}
 */
var _chkSituazioneAlMomento = false;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"21C8DCD8-75DD-4A11-BAE7-5885EEF475FA",variableType:-4}
 */
var _chkConsideraCausalizzate = false;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"082D751B-824A-4131-B5E8-CC0A488E293A",variableType:-4}
 */
var _chkDatiContrattuali = false;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"CFC76500-5F1B-4005-B5D4-44AABB4480C0",variableType:-4}
 */
var _chkSoloAssenti = false;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"70CD8352-8DB1-4B71-9810-C92C5C8F7B46",variableType:-4}
 */
var _chkSituazioneParametrizzata = false;
/**
 * @properties={typeid:35,uuid:"F56ACC79-66AA-4EEB-80D5-12DE079A0505",variableType:-4}
 */
var _chkSingolaDitta = false;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"02870CED-6464-4F42-BF85-289A0D9F25F7",variableType:93}
 */
var _dalGiorno = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"726868C7-9359-4439-A0D4-B9DC410C5508",variableType:93}
 */
var _alGiorno = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"FFDFEE85-91F7-4DF0-8D3E-FEF0ACDAF5A7",variableType:93}
 */
var _dalleOre = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"432E89B6-0DEC-4BC4-861E-1CD26E91DEB5",variableType:93}
 */
var _alleOre = null;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"43721099-73FE-4185-AC23-745A1E2EA2F4",variableType:-4}
 */
var _chkStampaTimbrature = false;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"AAE7DED8-F8CE-49A0-8334-FE5499EB9A14",variableType:-4}
 */
var _chkStampaAssenti = false;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"C782B8D4-3B58-48D0-B83B-FEFF0BE07B59",variableType:-4}
 */
var _chkStampaEventi = false;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"FB84661C-7DAD-475D-9BD3-E2D5933B78BA",variableType:-4}
 */
var _chkStampaPresenti = false;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"05F6D87B-42BA-4745-AE4B-945ADDA7A108",variableType:-4}
 */
var _chkStampaTutti = false;
/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"EDE2D00A-44AF-4508-AC4A-4FF7B82F671D",variableType:-4}
 */
var _chkStampaDatiCOntrattuali = false;
/**
 * @properties={typeid:35,uuid:"CA245D15-8EE8-41B4-B33F-B174CF12FBDA",variableType:-4}
 */
var _idditta = null;
/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"8555C293-5758-4B64-B442-2891913DFCF8",variableType:8}
 */
var _codditta = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"B24E6162-DA29-48F0-874A-96FBE3DE713D"}
 */
var _ragionesociale = null;

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A208EA74-20A9-4B35-8B10-B2D2A31AF2E9"}
 */
function onDataChangeSituazioneAlMomento(oldValue, newValue, event) {
	
	_chkSituazioneParametrizzata = !newValue;
	
	elements.chkConsideraLeCausalizzate.enabled = newValue;
    elements.chkDatiContrattuali.enabled = newValue;
	elements.chkSoloAssenti.enabled = newValue;
    
    elements.chkStampaTimbrature.enabled = !newValue;
    elements.chkStampaAssenti.enabled = !newValue;
    elements.chkStampaEventi.enabled = !newValue;
    elements.chkStampaPresenti.enabled = !newValue;
    elements.chkStampaTutti.enabled = !newValue;
    elements.chkStampaDatiContrattuali.enabled = !newValue;
    elements.fld_dal_giorno.enabled = !newValue;
    elements.fld_al_giorno.enabled = !newValue;
    elements.fld_dalle_ore.enabled = !newValue;
    elements.fld_alle_ore.enabled = !newValue;
    
    globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
    
	return true;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3ACDB33B-738E-4E0A-AFDF-94057682DA35"}
 */
function onDataChangeSituazioneParametrizzata(oldValue, newValue, event) {
	
	_chkSituazioneAlMomento = !newValue;
	elements.chkConsideraLeCausalizzate.enabled = !newValue;
	elements.chkSoloAssenti.enabled = !newValue;
    
	elements.chkStampaTimbrature.enabled = newValue;
    elements.chkStampaAssenti.enabled = newValue;
    elements.chkStampaEventi.enabled = newValue;
    elements.chkStampaPresenti.enabled = newValue;
    elements.chkStampaTutti.enabled = newValue;
    elements.chkStampaDatiContrattuali.enabled = newValue;
    elements.fld_dal_giorno.enabled = newValue;
    elements.fld_al_giorno.enabled = newValue;
    elements.fld_dalle_ore.enabled = newValue;
    elements.fld_alle_ore.enabled = newValue;
    
    globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
    
	return true;
}

/**
 * @properties={typeid:24,uuid:"43364D5A-9DED-46D1-B404-E574801DAE73"}
 */
function getOptions()
{
	var soloAssenti;
	var dal;
	var al;
	
	if(_chkSituazioneAlMomento)
	{
		if(_chkSoloAssenti) //stampa assenti
			soloAssenti = 0;
		else // stampa tutti
			soloAssenti = 2;
		
		dal = al = "";
	}
	else
	{
		if(_chkStampaAssenti) //stampa assenti
			soloAssenti = 0;
		else if(_chkStampaPresenti) //stampa solo presenti
			soloAssenti = 1;
		else //stampa tutti
			soloAssenti = 2;
		
		dal = _dalGiorno.getFullYear().toString() + 
		      globals.getStrFromNumber(_dalGiorno.getMonth()+1) + 
			  globals.getStrFromNumber(_dalGiorno.getDate()) + 
			  globals.getStrFromNumber(_dalleOre.getHours()) +
			  globals.getStrFromNumber(_dalleOre.getMinutes());
			  
	    al = _alGiorno.getFullYear().toString() + 
	         globals.getStrFromNumber(_alGiorno.getMonth()+1) + 
		     globals.getStrFromNumber(_alGiorno.getDate()) + 
		     globals.getStrFromNumber(_alleOre.getHours()) +
		     globals.getStrFromNumber(_alleOre.getMinutes());	  
 	}
	 	
	var params = _super.getOptions();
		params.idditta = _chkSingolaDitta && _idditta ? _idditta : -1;
        params.almomento = _chkSituazioneAlMomento;
        params.dalgghh = dal;
        params.algghh = al;
        params.daticontrattuali = _chkSituazioneAlMomento ? _chkDatiContrattuali : _chkStampaDatiCOntrattuali;
	    params.stampatimbrature = _chkStampaTimbrature;
        params.stampaeventi = _chkStampaEventi;
	    params.soloassenti = soloAssenti;
	    params.stampatimbratureservizio = _chkConsideraCausalizzate;
	    
	return params;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8CAE6F75-A5AA-4522-A01C-D3F5C11CA34E"}
 */
function onShow(firstShow, event) {
	
    if(firstShow)
    {
    	_chkSituazioneAlMomento = 1;
        _chkSituazioneParametrizzata = 0;
    }
    
    onDataChangeSituazioneAlMomento(false,true,event);
    
}
/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0D89DD72-55B8-435B-A33F-4BB4FBFAF8C2"}
 */
function onDataChangeSoloPresenti(oldValue, newValue, event) {
	
	if(newValue)
	{
		_chkStampaAssenti = false;
		_chkStampaTutti = false;
	}
	
	return true;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"23695A90-C437-4B85-ABDE-91AD41020C48"}
 */
function onDataChangeStampaTutti(oldValue, newValue, event) {
	
	if(newValue)
	{
		_chkStampaAssenti = false;
		_chkStampaPresenti = false;
	}
    return true;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C8F6FECC-62F6-46A0-99C4-F65FD143DBB4"}
 */
function onDataChangeSoloAssenti(oldValue, newValue, event) {
	
	if(newValue)
	{
		_chkStampaPresenti = false;
		_chkStampaTutti = false;
	}
	return true;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param _rec
 *
 * @properties={typeid:24,uuid:"5221EF6D-BB18-44E4-B65D-7F773282F433"}
 */
function AggiornaSelezioneDitta(_rec)
{
	_idditta = _rec['idditta'];
	_codditta = _rec['codice'];
	_ragionesociale = _rec['ragionesociale'];
}
/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F1CB845A-9C76-4AA0-AB16-85FC4707643E"}
 */
function onDataChangeSingolaDitta(oldValue, newValue, event) 
{
	_chkSingolaDitta = newValue;
	
	if(!newValue)
	{
		_idditta = null;
		_codditta = null;
		_ragionesociale = null;
	}
	
	elements.fld_cod_ditta.enabled = newValue;
	elements.fld_ragionesociale.enabled = newValue;
	elements.btn_selditta.enabled = newValue;
    
    globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
    
	return true;
}
