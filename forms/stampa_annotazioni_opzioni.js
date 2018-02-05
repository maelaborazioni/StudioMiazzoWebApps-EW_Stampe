/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"1834210D-5CDD-474A-B548-04E4DD7CEA5F",variableType:-4}
 */
var vNoteMensili = false;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"923F54B3-BE45-45AF-B06F-7CCAEC36C0A2",variableType:-4}
 */
var vNoteEventiLunghi = false;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"C3C75BD0-BE23-46F5-9FD2-269C52EB0F32",variableType:-4}
 */
var vNoteAnagrafiche = false;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"5F31D6D8-5685-4179-B8D6-19A4950F95EA",variableType:-4}
 */
var vNoteAutomatiche = false;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"13B961E9-A8B4-46D5-940E-44AEFB544B33",variableType:-4}
 */
var vNoteMensiliDitta = false;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"158FD359-3FCD-4A8E-AF39-B35EA2CF2E31",variableType:8}
 */
var vMeseDal;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F3AD4832-BE28-4B95-8186-74F047EB3AF8",variableType:8}
 */
var vAnnoDal;

/** *
 * @param _firstShow
 * @param _event
 *
 * @properties={typeid:24,uuid:"59EBE85A-DCA3-4D40-A471-0D565B8812E0"}
 */
function onShowForm(_firstShow, _event) 
{	
	vAnnoDal = new Date().getFullYear();
	vMeseDal = new Date().getMonth() + 1;
	
//	if(globals._tipoConnessione === globals.Connessione.CLIENTE)
//	{
//		elements.chk_note_mensili_ditta.visible = false;
//		elements.lbl_note_mensili_ditta.visible = false;
//		vNoteMensiliDitta = false;
//	}
//	else
//	{
//		elements.chk_note_mensili_ditta.visible = true;
//		elements.lbl_note_mensili_ditta.visible = true;
//		vNoteMensiliDitta = true;
//	}
}

/**
 * @properties={typeid:24,uuid:"CC091AB0-C150-4E1E-ABCB-126850EABA97"}
 */
function getOptions()
{
	var params = _super.getOptions();
	 	params.periodo = globals.toPeriodo(vAnnoDal, vMeseDal);
		params.opzioni = [
							  vNoteAnagrafiche    === 1
							  , vNoteEventiLunghi === 1
							  , vNoteAutomatiche  === 1
							  , vNoteMensili	  === 1
							  , vNoteMensiliDitta === 1
						];
	
	return params;
}
