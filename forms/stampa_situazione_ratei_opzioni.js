/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"8CD0DE29-5453-4B8C-9223-72A93D003C94",variableType:93}
 */
var vAllaData = null

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"C94CCDE2-FDBA-4CCF-A071-FAF46A201222",variableType:-4}
 */
var vDatiContrattuali

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"AAFBEF2A-AB67-445D-BA90-09A4F71AFA8C",variableType:-4}
 */
var vCodiciRatei

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"FBD30E56-D3F5-481B-9B3D-93F1BEA7751D",variableType:8}
 */
var vFiltroResiduo

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AE7F3CC6-CCB4-44E2-865C-C9721328995E"}
 */
var vOpConfronto

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8BE4626A-59CB-45CE-8948-F576BD3197EA",variableType:8}
 */
var _valConfronto

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"01A49CD6-0C8D-4ED4-9CC9-B7287492570A",variableType:-4}
 */
var vArrayCodiciRateo = [];

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"B5F83C2D-2104-4AD1-9AE0-C88367FA5FD1",variableType:-4}
 */
var vIdRateoDitta = [];

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5229015E-F273-4853-9CBF-7FF9FC360BAC"}
 */
var vRiepilogoRateiSelezionati = '';

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"E673B1E9-8510-43CD-A193-4D298AC72B31"}
 */
function onDataChangeChkCodiciRatei(oldValue, newValue, event) 
{	
    if(newValue)
    	elements.btn_lkp_codice.enabled = true;
    else
    {
        vIdRateoDitta = [];
        vRiepilogoRateiSelezionati = '';
    	elements.btn_lkp_codice.enabled = false;    
    }
    
    return true;
}

/**
 * Filtra i ratei selezionabili per la ditta
 * 
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"C4A71277-20B0-4AC0-9505-1FCC6EA39D27"}
 */
function FiltraRatei(fs)
{
    fs.addFoundSetFilterParam('idditta', '=', idditta);
    return fs;
}

/**
 * Aggiorna la selezione dei ratei
 * 
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"67163ED7-4E4E-4B1A-A15A-55CF6E98C379"}
 * @AllowToRunInFind
 */
function AggiornaSelezioneRatei(rec)
{
    var _numFtr = vIdRateoDitta.length;
	vArrayCodiciRateo = [];
	for (var i=0;i<_numFtr;i++)
	{
		/** @type {JSFoundset<db:/ma_anagrafiche/ditte_ratei>} */
		var fs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE, 'ditte_ratei');
		if(fs.find())
		{
			fs.iddittarateo = vIdRateoDitta[i];
			fs.search();
			vArrayCodiciRateo.push(fs['codice']);
			vRiepilogoRateiSelezionati = vRiepilogoRateiSelezionati.concat(fs.codice.toString(), ' - ', fs.descrizione, '\n');
		}
		
	}
}

/**
 * @properties={typeid:24,uuid:"C74D55DE-2C6E-48DA-92D4-1492EF7A5506"}
 */
function getOptions()
{
	var params = _super.getOptions();
		params.alladata 				= utils.dateFormat(vAllaData,globals.EU_DATEFORMAT);
		params.daticontrattuali 		= vDatiContrattuali === 1;
		params.codicirateoselezionati	= vArrayCodiciRateo.length ? vArrayCodiciRateo : ottieniCodiciRateo(idditta);
		params.periodo                  = vAllaData.getFullYear() * 100 + vAllaData.getMonth() + 1;
	return params;
}

/**
 * Restituisce l'array con i codici rateo selezionabili per la ditta
 * 
 * @param {Number} idDitta
 *
 * @properties={typeid:24,uuid:"A6E11733-D21B-4EB4-92E4-ACC090530EE5"}
 * @AllowToRunInFind
 */
function ottieniCodiciRateo(idDitta)
{
	var arrCodiciRateoDitta = [];
	
	/** @type {JSFoundSet<db:/ma_anagrafiche/ditte_ratei>}*/
	var fsCodiciRateo = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.DITTE_RATEI);
	if(fsCodiciRateo.find())
	{
		fsCodiciRateo.idditta = idDitta;
		if(fsCodiciRateo.search())
			arrCodiciRateoDitta = globals.foundsetToArray(fsCodiciRateo,'codice');
	}
	
	return arrCodiciRateoDitta;
}