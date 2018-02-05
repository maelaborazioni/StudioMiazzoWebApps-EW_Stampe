/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8053F401-1E67-436C-B043-6E668947754C",variableType:4}
 */
var _idditta = -1;

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"77EEE246-7C4D-4802-A1E7-88F8AE8B737A",variableType:-4}
 */
var _arrDitteSel = [];

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"071D09CA-28D2-4F31-A1F2-0BA82E184E81",variableType:4}
 */
var _idTipologiaControlli = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C1218FB3-2CA0-4B70-8002-19014A93E53A"}
 */
var _descTipologiaControllo = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1C6D9DB7-808F-4F4D-A023-0FD04E9630F2"}
 */
var _riepSceltaControlli = '';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"985FF234-FC55-49CD-B331-2FEBF0CD824A",variableType:4}
 */
var chkSceltaControlli = 0;

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"539F48E8-ABD5-44BF-96BE-AE9A0A395C89",variableType:-4}
 */
var _arrElencoCampi = [];

/**
 * Aggiorna la scelta della tipologia dei controlli
 * 
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"315E8689-BB3A-426F-95C0-45A9F8D389BE"}
 */
function AggiornaTipologiaControlli(rec)
{
	_idTipologiaControlli = rec['idtipologiacontrolli'];
	_descTipologiaControllo = rec['descrizionecontrollo'];
}

/**
 * Filtra la tipologia dei controlli per HR
 * 
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"438DE6D9-5BD1-40A5-82B3-ECB743687F82"}
 */
function FiltraTipologiaControlli(fs)
{
	fs.addFoundSetFilterParam('HR','=',1);
	
	return fs;
}

/**
 * Aggiorna l'elenco dei campi seleezionati
 * 
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"31190336-6D45-4F01-94D4-F35BD5D0EBC3"}
 * @AllowToRunInFind
 */
function AggiornaElencoCampi(rec)
{
    var _numFtr = _arrElencoCampi.length;
	
	for (var i=0;i<_numFtr;i++)
	{
		var fs = databaseManager.getFoundSet(globals.Server.MA_PRESENZE,'e2controlli_elencocampi');
		if(fs.find())
		{
			fs['idcontrolli_elencocampi'] = _arrElencoCampi[i];
			fs.search();
			_riepSceltaControlli = _riepSceltaControlli.concat(fs['descrizione'],'\n');
		}
		
	}
}

/**
 * Filtra i campi selezionabili in base alla tipologia selezionata
 * 
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"5A3D7B7C-6CA2-4BDF-ACBC-C9809F27D772"}
 */
function FiltraElencoCampi(fs)
{
	fs.addFoundSetFilterParam('idtipologiacontrollo','=',_idTipologiaControlli);
	
	return fs;
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
 * @properties={typeid:24,uuid:"8E6D2A36-FE3C-47F8-8934-3CAEDED3BAC4"}
 */
function onDataChangeChkSceltaControlli(oldValue, newValue, event) {
	
	elements.btn_scelta_controlli.enabled = newValue;
	
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7C578651-AAE4-44C9-9845-E0618DF4BBD4"}
 */
function stampaControlliCoerenzaDati(event) {
	
	if (_idTipologiaControlli != null && _arrElencoCampi.length > 0) {
		
		var url = globals.WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaControlliCoerenzaDati";
		var now = new Date();
		var params = {
			idditta: _idditta,
			ditte: _arrDitteSel,
			iddipendenti: [],
			idtipologiacontrolli: _idTipologiaControlli,
			elencocampi: _arrElencoCampi,
			tipogiornaliera: "N",
			tipoconnessione: globals._tipoConnessione,
			periodo: now.getFullYear() * 100 + now.getMonth() + 1

		};
		
		globals.svy_nav_dc_setStatus('browse', 'stampa_controlli_coerenza_dati', true);
        globals.svy_mod_closeForm(event);
		globals.addJsonWebServiceJob(url, params);
	}
	else
		globals.ma_utl_showWarningDialog('Selezionare una tipologia ed almeno un controllo','Stampa controlli coerenza dati');
}
