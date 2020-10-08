/**
 * Perform the element default action.
 *
 * @private
 *
 * @properties={typeid:24,uuid:"52ED431B-FB09-403D-A0B7-B20F38225CF5"}
 */
function stampaSituazioneEventiLunghi() 
{
	/** @type {Array} */
	var iddipendenti = selectLavoratori();	
	if(!iddipendenti || iddipendenti.length === 0)
		return false;
	
	iddipendenti = scopes.lavoratori.sortByNominativo(iddipendenti,globals.getTipologiaDitta(idditta));
	
	var params = forms.stampa_situazione_eventi_lunghi_opzioni.getOptions();
		params.idditta = idditta;
		params.iddipendenti = iddipendenti;
	// add new operation info for future updates
	var operation = scopes.operation.create(params['idditta'],globals.getGruppoInstallazioneDitta(params['idditta']),params['periodo'],globals.OpType.SSEL);
	if(operation == null || operation.operationId == null)
	{
		globals.ma_utl_showErrorDialog('Errore durante la preparazione dell\'operazione lunga. Riprovare o contattare il  servizio di Assistenza.');
		return false;
	}
	params.operationid = operation.operationId;
	params.operationhash = operation.operationHash;	
	/**
	 * Launch the operation and close the window
	 */
    var url = globals.WS_REPORT + "/Report32/CertificatesAsync";
    globals.addJsonWebServiceJob(url, params);
    
    return true;
}

/**
 * @properties={typeid:24,uuid:"572B1157-FD07-4FCC-9AEB-B2584E28691B"}
 */
function confermaStampa(event)
{
	var frmOpt = forms.stampa_situazione_eventi_lunghi_opzioni;
	if(frmOpt.vSoloCertMese == 0 && frmOpt.vCertCompresiTra == 0 && frmOpt.vSoloDipInForzaAl == 0)
	{
		globals.ma_utl_showWarningDialog('Selezionare una tra le tipologie per la ricerca','Stampa situazione eventi lunghi');
		return;
	}
	
	if(frmOpt.vCertCompresiTra == 1)
	{
		if(frmOpt.vCertificatiCompresiTraAl == null 
		   || frmOpt.vCertificatiCompresiTraDal == null)
	    {
		   globals.ma_utl_showWarningDialog('Inserire le date di inizio e fine della ricerca','Stampa situazione eventi lunghi');
		   return;
	    }
	}
	
	if(frmOpt.vSoloCertMese == 1)
	{
		if(frmOpt.vSoloCertMeseDate == null)
		{
			globals.ma_utl_showWarningDialog('Inserire il periodo della ricerca','Stampa situazione eventi lunghi');
		    return;
		}
	}
	
	if(frmOpt.vSoloDipInForzaAl == 1)
	{
		if(frmOpt.vSoloDipInForzaAlDate == null)
		{
		   globals.ma_utl_showWarningDialog('Inserire la data per la ricerca dei dipendenti in forza','Stampa situazione eventi lunghi');
		   return;
		}
	}
	
	if((returnValue = stampaSituazioneEventiLunghi()))
		globals.svy_mod_closeForm(event);
}

/**
 * 
 * @param {JSFoundset} _fs
 * @return {JSFoundset}
 * @properties={typeid:24,uuid:"D98D3D19-EFD4-4EEB-907E-A24553208093"}
 */
function FiltraDipStatistica(_fs)
{
	var options = forms.stampa_situazione_eventi_lunghi_opzioni.getOptions();
	if(options.periodo)
	{
	   _fs.addFoundSetFilterParam('assunzione','^||<=',globals.getLastDatePeriodo(options.periodo));
	   _fs.addFoundSetFilterParam('cessazione','^||>=',globals.getFirstDatePeriodo(options.periodo));
	
	}
	else if(options.inforzaal)
	{
	   _fs.addFoundSetFilterParam('assunzione','^||<=',utils.parseDate(options.inforzaal,globals.EU_DATEFORMAT));
	   _fs.addFoundSetFilterParam('cessazione','^||>=',utils.parseDate(options.inforzaal,globals.EU_DATEFORMAT));
	}
	else if(options.compresidal)
	{
		_fs.addFoundSetFilterParam('assunzione','^||<=',utils.parseDate(options.compresidal,globals.EU_DATEFORMAT));
		_fs.addFoundSetFilterParam('cessazione','^||>=',utils.parseDate(options.compresial,globals.EU_DATEFORMAT));
	}
	
	_fs.sort('lavoratori_to_nominativo asc');
	return _fs;
}

/**
 * @param {JSFoundSet<db:/ma_anagrafiche/lavoratori>} fs
 *
 * @properties={typeid:24,uuid:"DADC723B-D7C6-4374-9686-B9AF7BDCC2D7"}
 */
function filterLavoratori(fs)
{
	fs = _super.filterLavoratori(fs);
	return FiltraDipStatistica(fs);
}