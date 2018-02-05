/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"E2BC52B1-DA91-4C14-A0A3-3D1CAC4A2577",variableType:93}
 */
var vDallaData;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"B3F7D996-AE16-41A2-B5CD-9D0D7C68DB09",variableType:93}
 */
var vAllaData;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"97CA333E-CA75-4E0C-B5AA-969853EA5712",variableType:4}
 */
var vInviaComeAllegato = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"3B031E4B-200E-4D23-8A08-7540BC83896F",variableType:4}
 */
var vLavoratori = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B5960C2C-C776-4168-8762-B720882F3C2B",variableType:4}
 */
var vAMail = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"60FD69C3-F674-457A-9B70-40324E214BBD",variableType:12}
 */
var vIndirizzoMail = "";

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"82319FCD-5216-4F75-9C2A-4FAED18FD9B1",variableType:4}
 */
var vDividiPerDip = 0;

/**
 * @properties={typeid:24,uuid:"67920296-4F97-4455-B238-0D7F2E1CCFE2"}
 */
function getOptions()
{
	var params = _super.getOptions();
	params.periodo                  = globals.toPeriodo(vDallaData.getFullYear(),vDallaData.getMonth() + 1);
    params.dalladata                = utils.dateFormat(vDallaData,globals.EU_DATEFORMAT);
    params.alladata                 = utils.dateFormat(vAllaData,globals.EU_DATEFORMAT);
    params.spediscimail             = vInviaComeAllegato;
    params.indirizzomail			= vIndirizzoMail ? vIndirizzoMail : "";
    params.dividiperdip				= vDividiPerDip  

    return params;
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
 * @properties={typeid:24,uuid:"C0FC238C-4D5C-458F-9BD5-DA639038F35A"}
 */
function onDataChangeInviaMail(oldValue, newValue, event) {
	
	if(newValue)	
		vLavoratori = 1;
	else		
		vLavoratori = vAMail = 0;
	
	return true
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
 * @properties={typeid:24,uuid:"B5CD8667-5559-476C-9E28-67756B4901E9"}
 */
function MailDestinatario(oldValue, newValue, event) {
	
	if(newValue)		
		vLavoratori = 0;
	
	return true
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
 * @properties={typeid:24,uuid:"2F2F4074-2DBC-4CD3-80AC-B95452984070"}
 */
function MailLavoratore(oldValue, newValue, event) {
	
	if(newValue)		
		vAMail = 0;		
	
	return true
}
