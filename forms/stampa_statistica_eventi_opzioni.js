/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"AF502F46-EB39-43B5-B4E8-B2C9C1B330E8",variableType:93}
 */
var vDallaData;
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"D741B3AA-4F75-4325-BCF6-982942596A82",variableType:93}
 */
var vAllaData;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"04CB2E91-8DBC-44F8-A545-05123CD9A47B",variableType:4}
 */
var vTipoGiornaliera = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"182C475D-5625-4EA8-9A06-2FE5DA05DAC8",variableType:4}
 */
var vDatiContrattuali = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B65910D0-1FC0-4D0E-8779-801145F799B3",variableType:4}
 */
var vTotaliGiorno = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"5FA86D78-943C-4D30-A71E-93B11D6331CB",variableType:4}
 */
var vTotaliADipendente = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F477033A-73F0-4494-A006-69AAFC780BE3",variableType:4}
 */
var vSoloTotali = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AA85A0BF-7F4C-47EF-A781-042DB0DD100A",variableType:4}
 */
var vEventi = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B0BA31ED-F571-4DD4-BB2C-896BBB481330",variableType:4}
 */
var vDettagliProprieta = 0;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"94736715-6394-45EB-9A7D-6762C16C811C"}
 */
var vRiepilogoEventiSelezionati = '';

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"F7F8F341-4F93-49C0-80BE-16AABFE6BA8C",variableType:-4}
 */
var vEventiSelezionati = [];

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1740BDAF-EF24-4FF0-8AC1-4B94D0D6D2F4",variableType:4}
 */
var vVisualizzazione = 0;

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
 * @properties={typeid:24,uuid:"967DACE3-2A43-45D3-B4F2-DD87BDB7DF8D"}
 */
function onDataChangeSoloTotaliDip(oldValue, newValue, event) 
{	
	onDataChangeBooleanOptions(oldValue, newValue, event);
    if(newValue)
    	vSoloTotali = false;
	 
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
 * @properties={typeid:24,uuid:"EB34FD71-F872-4F67-B2C2-6C24A1A5B90E"}
 */
function onDataChangeSoloTotali(oldValue, newValue, event) 
{	
	onDataChangeBooleanOptions(oldValue,newValue,event);
    if(newValue)
    	vTotaliADipendente = false;
    
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
 * @properties={typeid:24,uuid:"B5FE0ABB-41DC-4605-B749-4E8AD9EB86D2"}
 */
function onDataChangeChkEvSel(oldValue, newValue, event) 
{	
	if(newValue)
		elements.btn_lkp_selezionati.enabled = true;
	else
	{
	    elements.btn_lkp_selezionati.enabled = false;
	    vEventiSelezionati = [];
	    vRiepilogoEventiSelezionati = '';
	}
	return true;
}

/**
 * @param {JSFoundset} _fs
 * 
 * @properties={typeid:24,uuid:"8CDDFB8A-E14B-4FB1-9F21-8BF74744CE0B"}
 */
function FiltraEventiPeriodo(_fs)
{
	var ds = ottieniEventiPeriodo(idditta,
		                          utils.dateFormat(vDallaData,globals.ISO_DATEFORMAT),
								  utils.dateFormat(vAllaData,globals.ISO_DATEFORMAT),
								  vTipoGiornaliera == 0 ? globals.TipoGiornaliera.NORMALE : globals.TipoGiornaliera.BUDGET)
	
	_fs.removeFoundSetFilterParam('ftr_elencoEventiPeriodo');
	_fs.addFoundSetFilterParam('idevento','IN', ds.getColumnAsArray(1), 'ftr_elencoEventiPeriodo');
    _fs.loadAllRecords();
    
	return _fs;
}

/**
 * @AllowToRunInFind
 * 
 * @param {Array<JSRecord>} _recs
 *
 * @properties={typeid:24,uuid:"2E5ECE18-912C-46C2-B6E8-F4E20B07EE93"}
 */
function aggiornaRiepilogoEventi(_recs)
{	
	vEventiSelezionati = _recs;
	var ds = null;
	var sqlQuery = 'SELECT Evento, descriz FROM E2Eventi WHERE idEvento IN (' + _recs.map(function() {return '?'}).join(',') + ')';
	var args = _recs;
	
	ds = databaseManager.getDataSetByQuery(globals.Server.MA_PRESENZE, sqlQuery, args, -1);

	vRiepilogoEventiSelezionati = '';
	for(var i = 1; i <= ds.getMaxRowIndex(); i++)
		vRiepilogoEventiSelezionati += ds.getValue(i,1) + ' - ' + ds.getValue(i,2) + '\n';
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} idDitta
 * @param dal
 * @param al
 * @param tipoGiornaliera
 *
 * @return {JSDataSet}
 * 
 * @properties={typeid:24,uuid:"ACF524B0-311A-43D4-BF82-76CF0BB6F732"}
 */
function ottieniEventiPeriodo(idDitta,dal,al,tipoGiornaliera)
{
	var sqlQuery = 'SELECT * FROM F_Gio_ElencoEventiPeriodo(?,?,?,?)';
	var args = [idditta, 
	            dal,
				al,
				tipoGiornaliera];
	
	var ds = databaseManager.getDataSetByQuery(globals.Server.MA_PRESENZE, sqlQuery, args, -1);
	
	return ds;
}

/**
 * @properties={typeid:24,uuid:"D385909C-7899-4B65-8238-DFEFCBCA7A5C"}
 */
function getOptions()
{
	var params = _super.getOptions();
		params.eventiselezionati	= vEventiSelezionati.length ? 
				                      vEventiSelezionati : ottieniEventiPeriodo(idditta,
													                           utils.dateFormat(vDallaData,globals.ISO_DATEFORMAT),
																			   utils.dateFormat(vAllaData,globals.ISO_DATEFORMAT),
																			   vTipoGiornaliera == 0 ? globals.TipoGiornaliera.NORMALE : globals.TipoGiornaliera.BUDGET).getColumnAsArray(1);
		params.dalladata			= utils.dateFormat(vDallaData, globals.EU_DATEFORMAT);
		params.alladata				= utils.dateFormat(vAllaData, globals.EU_DATEFORMAT);
		params.tipogiornaliera		= vTipoGiornaliera ? 'B' : 'N',
		params.daticontrattuali		= vDatiContrattuali		=== 1;
		params.dettagliproprieta	= vDettagliProprieta	=== 1;
		params.totaligiorno			= vTotaliGiorno			=== 1;
		params.solototalidipendenti	= vTotaliADipendente	=== 1;
		params.solototali			= vSoloTotali			=== 1;
		params.periodo              = vDallaData.getFullYear() * 100 + vDallaData.getMonth() + 1;
		params.bGiorni              = vVisualizzazione;
	return params;
}
/**
 * @private
 *
 * @properties={typeid:24,uuid:"BB93ECF1-A4BA-4E14-8717-5C464F215436"}
 */
function onDataChangeBooleanOptions(oldValue, newValue, event) 
{
	return vDatiContrattuali || vTotaliADipendente || vTotaliGiorno || vSoloTotali;
}
