/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"E738F3C8-F478-49A5-8E72-0665C6CB251E",variableType:93}
 */
var vDal = null;
/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"EBC2C94D-BBC4-4494-91D6-07D2E1667283",variableType:93}
 */
var vAl = null;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"90CAA400-CA9C-45D0-BCF3-92769C274D93",variableType:4}
 */
var vNumTimbr = 4;
/**
 * @type Array
 * 
 * @properties={typeid:35,uuid:"B5C000B1-0DE5-4C25-984B-9B1CD9D1F56D",variableType:-4}
 */
var vElencoCausali = [];
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F8291B08-824D-4FC2-96B7-A8C50E79046F"}
 */
var vRiepilogoCausali = '';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"196D4CB1-DFB8-44CA-92C0-6DEB0B4E49C4",variableType:4}
 */
var vChkCausali = 0;

/**
 * TODO generated, please specify type and doc for the params
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"6D167447-DB88-457F-92DE-009973D05B61"}
 */
function onDataChangeChkCausali(oldValue,newValue,event)
{
	if(newValue)
    	elements.btn_lkp_tipi_causali.enabled = true;
    else
    {
        vElencoCausali = [];
        vRiepilogoCausali = '';
    	elements.btn_lkp_tipi_causali.enabled = false;    
    }
    
    return true;
}
/**
 * Filtra le causali selezionabili in base alla ditta selezionata
 * 
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"3B1FF4D5-60D8-4E4F-BDC4-2DB8E44192BD"}
 */
function FiltraCausali(fs)
{
	fs.addFoundSetFilterParam('idditta','=',forms.stampa_timbr_causalizzate.vIdDitta);
	return fs;
}

/**
 * Aggiorna le causali selezionate
 * 
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"129C8AA7-A49B-4FF9-AC89-DD28570FB9CE"}
 * @AllowToRunInFind
 */
function AggiornaCausali(rec)
{
	var _numCausali = vElencoCausali.length;
	for (var i=0;i<_numCausali;i++)
	{
		/** @type {JSFoundSet<db:/ma_presenze/e2timbratureserviziogestione>} */
		var fs = databaseManager.getFoundSet(globals.Server.MA_PRESENZE, 'e2timbratureserviziogestione');
		if(fs.find())
		{
			fs.causale = vElencoCausali[i];
			fs.idditta = forms.stampa_timbr_causalizzate.vIdDitta;
			if(fs.search())
			   vRiepilogoCausali = vRiepilogoCausali.concat(fs.causale, ' - ', fs.descrizione, '\n');
		}
	}
}