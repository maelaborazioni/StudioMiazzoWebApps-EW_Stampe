/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"12BE338E-8391-4F0A-834E-1DE1DB8D698F",variableType:93}
 */
var vPeriodo;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"8B08EE5E-FDB7-4047-AB51-45D8153B5811",variableType:93}
 */
var vPeriodoAl; 

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"D72AC9B3-854A-4554-BB36-FD3A28214C4E",variableType:93}
 */
var vAllaData;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B49CC879-6F08-40EF-8693-5466FE34B1B4",variableType:4}
 */
var vSoloCartolineConTimbrature = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"51B19712-B22A-4271-889C-5C211B8D40BA",variableType:4}
 */
var vTotaliEventi = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7AF0F80A-BBAC-46FA-BE13-F582602B6FAB",variableType:4}
 */
var vSoloEventiGiornaliera = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"00533C90-5E3B-4CC2-A9E6-C41B67E0DF7C",variableType:4}
 */
var vAncheTimbratureManuali = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"FD1F1972-5130-4CF6-8998-3C20B42FD9B0",variableType:4}
 */
var vDatiContrattuali = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2F3A6C2C-6F5B-40E2-89EF-E734C10BAA1B",variableType:4}
 */
var vInviaMail = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F8168509-A9B1-4E29-9451-4AF34A92F57C",variableType:4}
 */
var vSoloTimbratureManuali = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"3E959A8A-F9C2-4660-8954-AA2DC779A395",variableType:4}
 */
var vTipoStampaPresenze = 1;

/**
 * @properties={typeid:24,uuid:"57A5D355-07D6-4015-87D9-D400D8D7B6C8"}
 */
function getOptions()
{
	var eventiInGiornaliera;
	var timbratureCausalizzate;
	
	switch(vTipoStampaPresenze)
	{
		case 0 :
			eventiInGiornaliera = false;
			timbratureCausalizzate = true;
			break;
		case 1 :
			eventiInGiornaliera = true;
		    timbratureCausalizzate = false;
			break;
		case 2 :
			eventiInGiornaliera = false;
		    timbratureCausalizzate = false;
			break;
		default:
			eventiInGiornaliera = false;
			timbratureCausalizzate = false;
	}
	
	var params = _super.getOptions();
		params.periodo					= globals.toPeriodo(vPeriodo.getFullYear(), vPeriodo.getMonth() + 1);
		params.periodoal                = globals.toPeriodo(vPeriodoAl.getFullYear(),vPeriodoAl.getMonth() + 1);
		
		if((params.periodoal - params.periodo) >= 9)
			globals.ma_utl_showWarningDialog('Per assicurare la riuscita della stampa corretta è consigliato non superare un intervallo temporale di 9 mensilità','Stampa cartoline');
		
		params.daticontrattuali 		= vDatiContrattuali 			=== 1;
		params.eventigiornaliera 		= eventiInGiornaliera			     ;
		params.solocartolinecontimbr 	= vSoloCartolineConTimbrature	=== 1;		
		params.timbrmanuali 			= vAncheTimbratureManuali		=== 1;
		params.timbrcausalizzate	 	= timbratureCausalizzate			 ;
		params.soloeventi 				= vSoloEventiGiornaliera		=== 1;
		params.totalieventi 			= vTotaliEventi					=== 1;
		params.solotimbrmanuali         = vSoloTimbratureManuali        === 1;
		params.spediscimail 			= vInviaMail					=== 1;
				
	return params;
}