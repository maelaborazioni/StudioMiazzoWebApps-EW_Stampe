/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"144F354B-C54C-4E38-8EAF-B21372115FB6",variableType:8}
 */
var vTipoSituazioneEventi = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C204ED4F-28F4-49CF-91F6-40CBA5B1B97A",variableType:4}
 */
var vIdClasse = -1;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5C6610C0-B34C-43D5-BF80-42DE69BDC9AA"}
 */
var vCodClasse = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"36FECB20-A71A-4ECE-9042-37ECE0625386"}
 */
var vCodClasseDesc = '';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D7911947-5BE4-493D-93B0-465AC76C0C7D",variableType:4}
 */
var vSoloCertMese = 0;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"AD94FDCB-5A8C-465F-A9CA-50513D3F5A2D",variableType:93}
 */
var vSoloCertMeseDate = null; 

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F0AAFA9B-0EC8-43F6-974B-B18EAFC381BA",variableType:4}
 */
var vSoloDipInForzaAl = 0;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"0B03131B-3904-4641-9069-54AF494B8943",variableType:93}
 */
var vSoloDipInForzaAlDate = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"76D8EB10-9A11-4876-9DB6-F8346CEFA37F",variableType:4}
 */
var vCertCompresiTra = 0;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"3F79D7D9-4341-421C-BBB4-7044D8D2E089",variableType:93}
 */
var vCertificatiCompresiTraDal;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"79D34372-8C4B-44D2-87CA-CAE8A6E1B8A9",variableType:93}
 */
var vCertificatiCompresiTraAl;

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 *@private 
 * @properties={typeid:24,uuid:"350CC6AC-B1FB-4075-AD5F-754D2055F193"}
 */
function onDataChangeChkSoloCertNelMese(oldValue, newValue, event) 
{	
	if(newValue)
	{		
		vSoloCertMeseDate = globals.TODAY.setDate(1);
        elements.fld_solo_cert_mese.enabled = true;
        elements.btn_solo_cert.enabled = true;
        
        onDataChangeChkSoloDipInForzaAl(false,false,new JSEvent);
        onDataChangeCertCompresiTraEIl(false,false,new JSEvent);
        
		vCertCompresiTra = false;
	    vSoloDipInForzaAl = false;
	}
	else
	{
	   vSoloCertMeseDate = null;
	   elements.fld_solo_cert_mese.enabled = false;	
	   elements.btn_solo_cert.enabled = false;
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
 * @properties={typeid:24,uuid:"F37F0D07-74AE-4EA3-B928-C1DF17C29081"}
 */
function onDataChangeChkSoloDipInForzaAl(oldValue, newValue, event) 
{	
    if(newValue)
    {    	
    	vSoloDipInForzaAlDate = globals.TODAY;
    	elements.fld_solo_inforza_al.enabled = true;
    	elements.btn_solo_in_forza.enabled = true;
    	
    	onDataChangeCertCompresiTraEIl(false,false,null);
		onDataChangeChkSoloCertNelMese(false,false,null);
		
    	vCertCompresiTra = false;
    	vSoloCertMese = false;
    }
    else
    {
    	vSoloDipInForzaAlDate = null;
        elements.fld_solo_inforza_al.enabled = false;
        elements.btn_solo_in_forza.enabled = false;
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
 * @properties={typeid:24,uuid:"29145925-E763-4DA1-AA85-C16FD4449E32"}
 */
function onDataChangeCertCompresiTraEIl(oldValue, newValue, event) 
{	
	if(newValue)
	{
		var periodo = globals.toPeriodo(globals.TODAY.getFullYear(), globals.TODAY.getMonth() + 1);
		
		vCertificatiCompresiTraDal = globals.getFirstDatePeriodo(periodo);
		vCertificatiCompresiTraAl = globals.getLastDatePeriodo(periodo);
		
    	elements.fld_cert_compresi_tra_dal.enabled = true;
	    elements.fld_cert_compresi_tra_al.enabled = true;
	    elements.btn_solo_cert_dal.enabled = true;
	    elements.btn_solo_cert_al.enabled = true;
	    
	    onDataChangeChkSoloCertNelMese(false,false,null);
	    onDataChangeChkSoloDipInForzaAl(false,false,null);
	    
	    vSoloCertMese = false;
	    vSoloDipInForzaAl = false;
	}
	else
	{    
		vCertificatiCompresiTraDal = null;
		vCertificatiCompresiTraAl = null;
		elements.fld_cert_compresi_tra_dal.enabled = false;
        elements.fld_cert_compresi_tra_al.enabled = false;
        elements.btn_solo_cert_dal.enabled = false;
	    elements.btn_solo_cert_al.enabled = false;
	}
	
	return true;
}

/** *
 * @param _firstShow
 * @param _event
 *
 * @properties={typeid:24,uuid:"80CF7732-9E52-4200-BF82-089265EEE6E9"}
 */
function onShowForm(_firstShow, _event) 
{
	vTipoSituazioneEventi = 0;
}

/**
 * Filtra gli eventi classe selezionabili
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"D44BB5B0-AE78-46D6-9112-5C79174ADC39"}
 */
function FiltraEventiClasse(_fs)
{
	_fs.addFoundSetFilterParam('gestitoconstorico','=',1);
	return _fs;
}

/**
 * Aggiorna dopo la selezione della classe di evento
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"B52F42DA-AC0E-4032-B40C-CFCF9555E500"}
 */
function AggiornaEventiClasse(_rec)
{
	vIdClasse = _rec['ideventoclasse']
	vCodClasse = _rec['codevento']
	vCodClasseDesc = _rec['descrizioneclasseevento']
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
 * @properties={typeid:24,uuid:"283BE36B-919A-4F04-9560-5E40924F8926"}
 */
function onDataChangeCodEvento(oldValue, newValue, event)
{
	if(newValue == "")
	{
		vIdClasse = -1; // tutti i tipi di certificati
		vCodClasseDesc = "";
	    return true;
	}
	
	var lookup = 'LEAF_Lkp_Eventiclassi';
	
	var record = globals.ma_utl_find(lookup, newValue, 'codevento');
	if(record)
		AggiornaEventiClasse(record);
	else
		globals.ma_utl_showLkpWindow
		(
			{
				  event: event
				, lookup: lookup
				, methodToAddFoundsetFilter: 'FiltraEventiClasse'
				, methodToExecuteAfterSelection: 'AggiornaEventiClasse'
			}
		);
		
	return true;
}

/**
 * @return {{ tipoconnessione: Number, ideventoclasse: Number, tipostampa: Number, inforzaal: String, periodo: Number, compresidal: String, compresial: String }}
 * 
 * @properties={typeid:24,uuid:"22495B3B-026C-4C7D-B091-2F495EC95751"}
 */
function getOptions()
{
	var params = _super.getOptions();
	params.ideventoclasse 	= vIdClasse || -1;
    params.tipostampa		= vTipoSituazioneEventi;
    params.inforzaal 		= utils.dateFormat(vSoloDipInForzaAlDate, globals.EU_DATEFORMAT);
    params.periodo 			= vSoloCertMese ? 
    		globals.toPeriodo(vSoloCertMeseDate.getFullYear(), vSoloCertMeseDate.getMonth() + 1) : 
    		globals.toPeriodo(globals.TODAY.getFullYear(), globals.TODAY.getMonth() + 1);
    params.compresidal 		= utils.dateFormat(vCertificatiCompresiTraDal,globals.EU_DATEFORMAT);
    params.compresial 		= utils.dateFormat(vCertificatiCompresiTraAl,globals.EU_DATEFORMAT);
	    
	return params;
}
