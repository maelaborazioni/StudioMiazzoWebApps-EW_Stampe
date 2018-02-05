/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"1032CBE4-ABFD-48FC-BA44-09C47E0BAA49",variableType:93}
 */
var vDallaData;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"2D6E158C-007F-433D-BB99-66B5EEF8ED8E",variableType:93}
 */
var vAllaData;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D258D06A-B5D8-4182-BC03-AA75D8CA9D49",variableType:4}
 */
var vDatiContrattuali = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"45A173A1-E726-4CC4-975F-6C0E83BC5BBF",variableType:4}
 */
var vSuddividiPerDipendente = 0;

/**
 * @properties={typeid:24,uuid:"006A9A0A-03C5-4F68-A517-E7BEB6526E25"}
 */
function getOptions()
{
	var params = _super.getOptions();
		params.dalladata			     = utils.dateFormat(vDallaData, globals.EU_DATEFORMAT);
		params.alladata				     = utils.dateFormat(vAllaData, globals.EU_DATEFORMAT);
		params.daticontrattuali		     = vDatiContrattuali		=== 1;
		params.periodo                   = vDallaData.getFullYear() * 100 + vDallaData.getMonth() + 1;
		params.suddivisioneperdipendente = vSuddividiPerDipendente;
	return params;
}


