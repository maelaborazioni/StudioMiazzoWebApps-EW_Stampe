/**
 * @private
 *
 * @properties={typeid:24,uuid:"20492E8B-3585-4B02-8538-CBF62C06CEA4"}
 */
function stampaGiornaliera() 
{
	var iddipendenti = selectLavoratori();
	if(!iddipendenti || iddipendenti.length === 0)
		return false;
					
	var params = forms.stampa_giornaliera_opzioni.getOptions();
		params['idditta'] = idditta;
		params['iddipendenti'] = iddipendenti;
		params['groupcontratto'] = forms.stampa_filtri_anagrafici.vGroupContratto;
		params['groupqualifica'] = forms.stampa_filtri_anagrafici.vGroupQualifica;
		params['groupposizioneinps'] = forms.stampa_filtri_anagrafici.vGroupPosizioneinps;
		params['groupsedelavoro'] = forms.stampa_filtri_anagrafici.vGroupSedelavoro;
		params['groupraggruppamento'] = forms.stampa_filtri_anagrafici.vGroupRaggruppamento;
		params['grouptiporaggruppamento'] = forms.stampa_filtri_anagrafici.vRaggruppamentoCodice;
			
	globals.stampaGiornalieraDitta(params);
		
	return true;
}

/**
 * @properties={typeid:24,uuid:"121A9AE6-3359-475C-9998-7D35331E8093"}
 */
function confermaStampa(event)
{
	var params = {
		processFunction: process_conferma_stampa_giornaliera,
		message: '',
		opacity: 0.5,
		paneColor: '#434343',
		textColor: '#EC1C24',
		showCancelButton: false,
		cancelButtonText: '',
		dialogName: 'This is the dialog',
		fontType: 'Arial,4,25',
		processArgs: [event]
	};
	plugins.busy.block(params);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CBBD4CCA-C0E1-48D5-85A2-BED1F5E755D0"}
 */
function process_conferma_stampa_giornaliera(event)
{
	try
	{
		if((returnValue = stampaGiornaliera()))
			globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_giornaliera : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * @properties={typeid:24,uuid:"026B95A1-9ED2-48CB-9052-E96B92F148C1"}
 */
function FiltraDipGiornaliera(fs)
{
	if(fs)
	{
		var firstDayOfMonth = new Date(forms.stampa_giornaliera_opzioni.vAnno,forms.stampa_giornaliera_opzioni.vMese - 1,1);
		var lastDayOfMonth = globals.getLastDate(firstDayOfMonth);
		
		fs.addFoundSetFilterParam('assunzione', '^||<=', lastDayOfMonth);
		fs.addFoundSetFilterParam('cessazione', '^||>=', firstDayOfMonth);
	}
	
	return fs;
}

/**
 * @properties={typeid:24,uuid:"9841D304-7758-46B3-8FAC-48E221BB7C01"}
 */
function filterLavoratori(fs)
{
	fs = _super.filterLavoratori(fs);
	return FiltraDipGiornaliera(fs);
}

/** *
 * @param _firstShow
 * @param _event
 *
 * @properties={typeid:24,uuid:"5F4EB858-0260-4592-B3AC-FFCA91891190"}
 */
function onShowForm(_firstShow, _event) 
{
    plugins.busy.prepare();
	
	fromGiornaliera = true;
	_super.onShowForm(_firstShow, _event);
		
    if(globals._tipoConnessione == globals.Connessione.CLIENTE)
    {
    	var frmElems = forms.stampa_giornaliera_opzioni.elements;
    	frmElems.lbl_codici_paga.visible = false;
    	frmElems.lbl_senza_divisione_elab_auto.visible = false;
    	frmElems.chk_codici_paga.visible = false;
    	frmElems.chk_senza_divisione_automatica.visible = false;
    }
}
