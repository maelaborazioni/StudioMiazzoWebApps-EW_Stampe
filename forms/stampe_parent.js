/**
 * @properties={typeid:35,uuid:"4A2FDED8-2324-4E09-A91A-2EA06949C0EA",variableType:-4}
 */
var fromGiornaliera = false;

/**
 * @type {Array<Number>}
 * 
 * @properties={typeid:35,uuid:"64970FF7-872B-46A1-BE15-277D40472B12",variableType:-4}
 */
var selectedElements = [];

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"2C866A86-4030-4018-913E-8C0C9440A234"}
 */
function onHide(event)
{
	if(_super.onHide(event))
	{
		if(dialogContinuation && application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT)
			dialogContinuation(returnValue);
		
		return true;
	}
	
	return false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected 
 *
 * @properties={typeid:24,uuid:"9D98DEB1-C4EA-43CB-A8FD-5A1322EDDA2B"}
 */
function annullaStampa(event)
{
	gotoBrowse();	
	globals.svy_mod_closeForm(event);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} [svyNavBaseOnShow]
 *
 * @protected 
 *
 * @properties={typeid:24,uuid:"0B69501B-D944-4845-9839-E74EB4E89D5B"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	plugins.busy.prepare();
	
	elements.opzioni_panel.tabIndex = 'opzioni_tab';
	
	var frmFtrAnag = forms.stampa_filtri_anagrafici;
	if(fromGiornaliera)
	{
		var grLavCurr = globals.getGruppoLavoratori();
		if(grLavCurr != '')
		{
			frmFtrAnag.elements.chk_gruppo_lavoratori.enabled = false;
			frmFtrAnag.vFilterGroupLavoratori = 1;
			frmFtrAnag.vGroupLavoratori = grLavCurr;
			frmFtrAnag.vGroupLavoratoriString = grLavCurr + ' - ' + globals.getDescGruppoLavoratori(idditta,grLavCurr);
			return;
		}
	}
	
	frmFtrAnag.elements.chk_gruppo_lavoratori.enabled = true;
	frmFtrAnag.vFilterGroupLavoratori = 0;
	frmFtrAnag.vGroupLavoratoriString = '';

	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
}

/**
 * @properties={typeid:24,uuid:"62021591-9962-451E-9B19-0C06EC34AB65"}
 */
function gotoEdit()
{
	_super.gotoEdit();
	for(var t = 1; t <= elements.opzioni_panel.getMaxTabIndex(); t++)
		globals.ma_utl_setStatus(globals.Status.EDIT, elements.opzioni_panel.getTabFormNameAt(t));
}

/**
 * @properties={typeid:24,uuid:"A9C6E799-F8D6-4A6F-90C0-8B537F2AEF29"}
 */
function gotoBrowse()
{
	_super.gotoBrowse();
	for(var t = 1; t <= elements.opzioni_panel.getMaxTabIndex(); t++)
		globals.ma_utl_setStatus(globals.Status.BROWSE, elements.opzioni_panel.getTabFormNameAt(t));
}

/**
 * @properties={typeid:24,uuid:"57F36D17-35B1-4C6F-83E6-E1DD8023FD99"}
 */
function filterLavoratori(fs)
{
	return forms.stampa_filtri_anagrafici.filterLavoratori(fs);
}

/**
 * @properties={typeid:24,uuid:"AD021B6A-4426-46FE-AB0C-76412B5506D9"}
 */
function getLavoratori()
{
	return forms.stampa_filtri_anagrafici.getLavoratori();
}

/**
 * @return {Array}
 * 
 * @properties={typeid:24,uuid:"1672A006-0CB8-4DAB-8945-9D3734644EE3"}
 */
function selectLavoratori()
{
	/** @type {Array} */
	var iddipendenti = globals.ma_utl_showLkpWindow
						(
							{
								  lookup: 'AG_Lkp_Lavoratori'// TODO foundset.tipologia === globals.Tipologia.ESTERNA ? 'AG_Lkp_LavoratoriEsterni' : 'AG_Lkp_Lavoratori'  
								, returnForm: controller.getName()
								, methodToAddFoundsetFilter: 'filterLavoratori'
								, multiSelect: true
								, selectedElements : selectedElements
							}
						);
						
	return iddipendenti;
}

/**
 * @properties={typeid:24,uuid:"40E7C7F4-89A3-4F70-AC30-4D86A7D0A2CA"}
 */
function selectDitte()
{
	/** @type {Array} */
	var idditte = globals.ma_utl_showLkpWindow
						(
							{
								  lookup: 'AG_Lkp_Ditte'  
								, returnForm: controller.getName()
								, multiSelect: true
							}
						);
						
	return idditte;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"009FDED5-4815-4E9F-8DD1-949211061E04"}
 */
function confermaStampa(event)
{
}
