/**
 * @properties={typeid:24,uuid:"79059BD1-134D-4DB6-BDDC-8CE8DA7EF3A8"}
 */
function getOptions()
{
	var params = _super.getOptions();
		params.dalladata			     = vDallaData;
		params.alladata				     = vAllaData; 
		params.daticontrattuali		     = vDatiContrattuali		=== 1;
		params.periodo                   = vDallaData.getFullYear() * 100 + vDallaData.getMonth() + 1;
		params.suddivisioneperdipendente = vSuddividiPerDipendente;
	return params;
}