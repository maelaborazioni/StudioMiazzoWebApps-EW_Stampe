/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"24C94BE5-8649-4A03-8BB0-2F6D43939941",variableType:-4}
 */
var _arrSelDitteStampa = []

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"88D58E89-B963-4CDE-A345-05DB73181592",variableType:8}
 */
var _dittaStampa = -1

/**
 * Stampa la scheda interna della ditta
 * 
 * @param {Number} idditta
 *
 * @properties={typeid:24,uuid:"F8C56B8D-75A2-4BB6-93CD-2836BFB26E7E"}
 * @AllowToRunInFind
 */
function stampa_scheda_interna_ditta(idditta){
	
	var url = WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaSchedaInternaDitta";
	var today = new Date()
    var periodo = today.getFullYear()*100 + today.getMonth() + 1	
	var params = {
		          idditta : idditta,
		          periodo: periodo, 
				  tipoconnessione : globals._tipoConnessione
				  };
	
	//globals.addJsonWebServiceJob(url,params);
    var _response = getWebServiceResponse(url,params)
	if(_response['returnValue'])
	{
		//TODO trovare una maniera scientifica per lanciare l'operazione
		//solo una volta che la stampa sia effettivamente presente nel database 
		application.sleep(2000)
		
		//recupera la stampa a partire dall'id dell'operazione
		var _op_id = _response['op_id']
		
		/** @type {JSFoundset<db:/ma_log/operationfile>} */
		var _fs_op = databaseManager.getFoundSet('ma_log','OperationFile')
		if(_fs_op.find())
		{
			_fs_op.op_id = _op_id
			_fs_op.search()
		}
		if(_fs_op.getSize() == 1)
		{
			/** @type {JSFoundset<db:/ma_log/filelog>} */
			var _fs_file = databaseManager.getFoundSet('ma_log','FileLog')
			if(_fs_file.find())
			{
				_fs_file.file_id = _fs_op.file_id
				_fs_file.search()
			}
			if(_fs_file.getSize() == 1)
			{
				plugins.file.writeFile(_fs_file.file_name,_fs_file.file_bytes,_fs_file.file_type)
			}else
				globals.ma_utl_showErrorDialog('File di stampa non recuperato, riprovare','Stampa scheda interna ditta')
		}
		else
			globals.ma_utl_showErrorDialog('Identificativo dell\'operazione non trovato, riprovare','Stampa scheda interna ditta')
	}
	else
	globals.ma_utl_showErrorDialog('Stampa scheda interna non riuscita, riprovare','Stampa scheda interna ditta')
}

/**
 * @param formName
 * @param formTitle
 * @param [enableGrouping]
 * 
 * @properties={typeid:24,uuid:"632BB5C0-5B26-4BF1-B278-0E46D9A280A7"}
 * @AllowToRunInFind
 */
function seleziona_ditta_stampa(formName, formTitle, enableGrouping)
{
	/** @type {Array<Number>} */
	var arrDitte = null;
	
	if(globals._filtroSuDitta)
	   arrDitte = [globals._filtroSuDitta];
	else
	   arrDitte = globals.ma_utl_showLkpWindow({ lookup: 'LEAF_Lkp_Ditte',
		                                        multiSelect : true,
		                                        allowinBrowse: true, 
												methodToAddFoundsetFilter : 'filtraDittaControllate',
												/*width: 660, height: 670,*/
												dateFormat: globals.EU_DATEFORMAT })
												
    if(arrDitte && arrDitte.length)
	{
		var form = forms[formName];
		if(form.foundset.find())
		{
			form.foundset['idditta'] = arrDitte;
			form.foundset.search();
		}
		
		if(forms.stampa_filtri_anagrafici.foundset.find())
		{
		 	forms.stampa_filtri_anagrafici.foundset.idditta = arrDitte;
		 	forms.stampa_filtri_anagrafici.foundset.search();
		}
		
		azzeraFiltriAnagrafici();
		
		// TODO gestione enableGrouping
		abilitaRaggruppamenti(forms.stampa_filtri_anagrafici.controller.getName(),enableGrouping || false);
		
		globals.ma_utl_setStatus(globals.Status.EDIT, formName);
		globals.ma_utl_showFormInDialog(formName, formTitle);
	}
	else
		globals.ma_utl_showWarningDialog('Selezionare almeno una ditta', 'Nessuna ditta selezionata');
}

/**
 * @param formName
 * @param formTitle
 * @param [enableGrouping]
 * 
 * @properties={typeid:24,uuid:"975898D3-9CB0-4CEE-90ED-3BFA1C106238"}
 */
function seleziona_ditta_stampa_singola(formName, formTitle, enableGrouping)
{
	/** @type {Number} */
	var idditta = null;
	
	if(globals._filtroSuDitta)
	   idditta = globals._filtroSuDitta;
	else
	   idditta = globals.ma_utl_showLkpWindow({ lookup: 'LEAF_Lkp_Ditte',
		                                        multiSelect : true,
		                                        allowinBrowse: true, 
												methodToAddFoundsetFilter : 'filtraDittaControllate',
												/*width: 660, height: 670,*/
												dateFormat: globals.EU_DATEFORMAT })
												
    if(idditta)
	{
		var form = forms[formName];
		form.foundset.loadRecords(idditta);
		forms.stampa_filtri_anagrafici.foundset.loadRecords(idditta);
		
		azzeraFiltriAnagrafici();
		
		// TODO gestione enableGrouping
		abilitaRaggruppamenti(forms.stampa_filtri_anagrafici.controller.getName(),enableGrouping || false);
		
		globals.ma_utl_setStatus(globals.Status.EDIT, formName);
		globals.ma_utl_showFormInDialog(formName, formTitle);
	}
	else
		globals.ma_utl_showWarningDialog('Selezionare almeno una ditta', 'Nessuna ditta selezionata');
}

/**
 * Mostra la selezione dei parametri per la stampa della situazione ditta
 * 
 * @properties={typeid:24,uuid:"CAD41D19-2C70-4118-8DD3-A80A9C1CDAA9"}
 */
function selezione_ditta_stampa_situazione_ditta()
{
	seleziona_ditta_stampa(forms.stampa_situazione_ditta.controller.getName(), 'Stampa situazione');
}

/**
 * Mostra la selezione dei parametri per la stampa delle annotazioni
 * 
 * @properties={typeid:24,uuid:"065DB7E5-C0FD-4AD9-919D-E75E5B1AFA06"}
 */
function selezione_ditta_stampa_annotazioni()
{
	seleziona_ditta_stampa(forms.stampa_annotazioni.controller.getName(), 'Stampa annotazioni');
}

/**
 * Mostra la selezione dei parametri per la stampa della situazione degli eventi lunghi
 *
 * @properties={typeid:24,uuid:"BDCD4820-0850-4680-B1E3-1DEB00576DB6"}
 */
function selezione_ditta_stampa_situazione_eventi_lunghi()
{
	seleziona_ditta_stampa(forms.stampa_situazione_eventi_lunghi.controller.getName(), 'Stampa situazione eventi lunghi', true);
}

/**
 * Mostra la selezione dei parametri per la stampa della situazione ratei
 * 
 * @param {Number} [idditta]
 * @param {Number} [idlavoratore]
 * 
 * @properties={typeid:24,uuid:"D8D6B90B-83CB-41C3-8EF0-0052D206870B"}
 */
function selezione_ditta_stampa_situazione_ratei(idditta,idlavoratore)
{
	seleziona_ditta_stampa(forms.stampa_situazione_ratei.controller.getName(), 'Stampa situazione ratei', true);
}

/**
 * Mostra la selezione dei parametri per la stampa della statistica voci 
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"21B1A02F-070F-480C-85A8-5C1043EC0071"}
 */
function selezione_ditta_stampa_statistica_eventi(event)
{
	seleziona_ditta_stampa(forms.stampa_statistica_eventi.controller.getName(), 'Stampa statistica eventi', true);
}

/**
 * Mostra la selezione dei parametri per la stampa della statistica fasce
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6FBA8C05-26D5-4A34-AC11-5F350F8250F0"}
 */
function selezione_ditta_stampa_statistica_fasce(event)
{
	seleziona_ditta_stampa(forms.stampa_statistica_fasce.controller.getName(), 'Stampa statistica fasce');
}

/**
 * Mostra la selezione dei parametri per la stampa dei turni
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"C750CB58-05D6-413F-81E0-28F67A20D171"}
 */
function selezione_ditta_stampa_situazione_turni(event)
{
	seleziona_ditta_stampa(forms.stampa_statistica_turni.controller.getName(), 'Stampa situazione turni', true);
}

/**
 * @param {Object} event
 *
 * @properties={typeid:24,uuid:"71B03A5E-07F5-4073-AE11-8CB177DE0C89"}
 */
function selezione_ditta_stampa_presenti_assenti(event)
{
	/** @type {JSFoundset<db:/ma_presenze/e2sediinstallazione>} */
	var fsGruppiInst = databaseManager.getFoundSet(globals.Server.MA_PRESENZE,globals.Table.SEDI_INSTALLAZIONE);
	fsGruppiInst.loadAllRecords();
	if(fsGruppiInst.getSize() > 1)
		// TODO gestione caso con più gruppi di installazione
		globals.ma_utl_showWarningDialog('Caso con più gruppi di installazione... contattare il servizio di assistenza');
	else
	{
		var idDitta = getIdDitta(fsGruppiInst.cod_ditta);
		var formName = forms.stampa_presenti_assenti.controller.getName();
		var formTitle = 'Stampa presenti/assenti';
		var form = forms[formName];
		form.foundset.loadRecords(idDitta);
		
		azzeraFiltriAnagrafici();
		
		abilitaRaggruppamenti(forms.stampa_filtri_anagrafici.controller.getName(),false);
		
		globals.ma_utl_setStatus(globals.Status.EDIT, formName);
		globals.ma_utl_showFormInDialog(formName, formTitle);
	}
//	seleziona_ditta_stampa(forms.stampa_presenti_assenti.controller.getName(), 'Stampa presenti/assenti');
}

/**
 * Mostra la selezione dei parametri per la stampa della situazione straordinari
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"088135B7-D25A-4617-AAA1-956C852EE93B"}
 */
function selezione_ditta_stampa_situazione_straordinari(event)
{
	seleziona_ditta_stampa(forms.stampa_situazione_straordinari.controller.getName(), 'Stampa situazione straordinari', true);
}

/**
 * Mostra la selezione dei parametri per la stampa della statistica ore
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"9C290CC9-621C-450C-8E21-F759F6E1AE88"}
 */
function selezione_ditta_stampa_statistica_ore(event)
{
	seleziona_ditta_stampa(forms.stampa_statistica_ore.controller.getName(), 'Stampa statistica ore', true);
}

/**
 * Mostra la selezione dei parametri per l'esportazione delle timrbature
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"060BC3E0-E5FD-4B13-BC08-55231ACABDDE"}
 */
function selezione_ditta_stampa_esportazione_timbrature(event)
{
	seleziona_ditta_stampa_singola(forms.stampa_esportazione_timbrature.controller.getName(),'Esportazione timbrature');
}

/**
 * Stampa la giornaliera 
 * 
 * @param 			  params
 * @param {Function} [callback]
 * 
 * @properties={typeid:24,uuid:"5FFA83B3-12F9-4CF7-9CF6-3A73D149774C"}
 */
function stampaGiornalieraDitta(params, callback)
{
	var url = WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaGiornaliera";
	addJsonWebServiceJob(url, params, null, null, callback);
}

/**
 * Stampa la situazione dei certificati
 * 
 * @param 			  params
 * @param {Function} [callback]
 *
 * @properties={typeid:24,uuid:"CEC802A2-8157-4EA9-BBAA-A21C4389CA75"}
 */
function stampaCertificati(params, callback)
{
	/**
	 * Launch the operation and close the window
	 */
    var url = WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaSituazioneEventiLunghi";
    globals.addJsonWebServiceJob(url, params, null, null, callback);
}

/**
 * Stampa il resoconto dei controlli
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5D92ED74-73C5-41F5-99E1-0167A44569A7"}
 */   
function selezione_ditta_stampa_tipologia_controlli(event)
{
    _dittaStampa = -1;
    _arrSelDitteStampa = [];
	
	_arrSelDitteStampa = globals.svy_nav_showLookupWindow(new JSEvent, '_arrSelDitteStampa', 'LEAF_Lkp_Ditte','','',null,null,'',true,null,null, true, '', 'dd/MM/yyyy')
	
	if (_arrSelDitteStampa.length > 0){
			
		_dittaStampa = _arrSelDitteStampa[0];
		forms.stampa_controlli_coerenza_dati._idditta = _dittaStampa;
		forms.stampa_controlli_coerenza_dati._arrDitteSel = _arrSelDitteStampa;
		var _winStampaContrCoer = application.createWindow('win_stampa_controlli_coerenza_dati',JSWindow.MODAL_DIALOG);
		_winStampaContrCoer.title = 'Stampa controlli coerenza dati';
		_winStampaContrCoer.setInitialBounds(JSWindow.DEFAULT,JSWindow.DEFAULT,405,275)
		globals.svy_nav_dc_setStatus('edit','stampa_controlli_coerenza_dati',true);
		_winStampaContrCoer.show(forms.stampa_controlli_coerenza_dati);
 	
	}else
		globals.ma_utl_showWarningDialog('Selezionare almeno una ditta','Nessuna ditta selezionata');
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B4AFFB68-03EB-4018-97F4-F68FEB5A3335"}
 */
function selezione_periodo_stampa_anomalie_cartolina(event)
{
	seleziona_ditta_stampa_singola(forms.stampa_anomalie_cartolina.controller.getName(),'Stampa anomalie cartolina');
//	var frm = forms.stampa_anomalie_cartolina;
//	globals.ma_utl_setStatus(globals.Status.EDIT,frm.controller.getName());
//	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Stampa anomalie cartolina');
}

/**
 * @properties={typeid:24,uuid:"5158B489-00C4-4603-AB12-7424549C5E24"}
 */
function selezione_periodo_stampa_cartolina_dipendente()
{
	seleziona_ditta_stampa_singola(forms.stampa_cartolina_presenze_dipendente.controller.getName(),'Stampa cartolina dipendente');
//	var form = forms.stampa_cartolina_presenze_dipendente;
//	globals.ma_utl_setStatus(globals.Status.EDIT,form.controller.getName());
//    globals.ma_utl_showFormInDialog(form.controller.getName(),'Stampa cartolina dipendente');
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"7544218A-790F-4346-9BAB-F4DBF16B3B18"}
 */
function selezione_data_stampa_situazione_ratei_dipendente(event)
{
	seleziona_ditta_stampa_singola(forms.stampa_situazione_ratei_dipendente.controller.getName(),'Stampa ratei dipendente');
//	var frm = forms.stampa_situazione_ratei_dipendente;
//	globals.ma_utl_setStatus(globals.Status.EDIT,frm.controller.getName());
//	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Stampa ratei dipendente');
}

/**
 * Stampa l'elenco e/o le anagrafiche dei dipendenti
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F57E86B3-4058-4934-B9DA-00F23F1BB12A"}
 * @AllowToRunInFind
 */
function selezione_ditta_stampa_elenco_dipendenti(event)
{
	_dittaStampa = -1;
	_arrSelDitteStampa = [];
	
	if(globals._filtroSuDitta != null)
		   _dittaStampa = globals._filtroSuDitta;
	else
	    globals.svy_nav_showLookupWindow(new JSEvent, '_dittaStampa', 'LEAF_Lkp_Ditte','','',null,null,'',true,null,null, false, '', 'dd/MM/yyyy')
	
	var form = forms.stampa_anagrafica_dipendenti;	
		
	if(_dittaStampa != -1)
	{
		if (_dittaStampa > 0)
		{
			form._arrDitteSel = _arrSelDitteStampa;
			form._idditta = _dittaStampa;
			form.foundset.loadRecords(_dittaStampa);
			
			globals.ma_utl_setStatus(globals.Status.EDIT,form.controller.getName());
			globals.ma_utl_showFormInDialog(form.controller.getName(), 'Elenco anagrafiche dipendenti');
		}
		else
			globals.ma_utl_showWarningDialog('Selezionare almeno una ditta','Nessuna ditta selezionata');
	}
}

/**
 * Apre la form di selezione delle stampe amministrative
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"58190376-68ED-450A-A50F-E724E11F12FB"}
 */
function selezione_stampe_amministrazione(event)
{
	var frm = forms.stampa_amministrazione;
	globals.ma_utl_setStatus(globals.Status.EDIT,frm.controller.getName());
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Stampe amministrazione');
}

/**
 * Funzione generica che recupera i dati necessari alla creazione del
 * dataset per l'esportazione in Excel
 *  
 * @param {Object} params
 * 
 * @return {Array}
 * 
 * @properties={typeid:24,uuid:"0B587228-9036-4278-9AC6-728C962616BB"}
 */
function recuperaDatiEsportazione(params)
{
	var url = WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ?  "/Stampe" : "/Report") + "/RecuperaDatiEsportazione";
    var _responseObj = getWebServiceResponse(url,params);
	
	if(_responseObj != null){
					   					
		if(_responseObj['returnValue'] == true){
					
			return _responseObj['dipArray'];
					
		}else
			return null;
			
	}else				
		globals.ma_utl_showErrorDialog('Il server non risponde, si prega di riprovare','Errore di comunicazione');
			
	return null;
	
}

/**
 * @properties={typeid:24,uuid:"89197C27-C5A9-453D-BEAF-E6285731CA6E"}
 */
function azzeraFiltriAnagrafici()
{
	var frm = forms.stampa_filtri_anagrafici;
	
	frm.vFilterContratto = 0;
	frm.vFilterPosizioneInps = 0;
	frm.vFilterQualifica = 0;
	frm.vFilterRaggruppamento = 0;
	frm.vFilterSedeLavoro = 0;
	
	frm.vContrattoString = '';
	frm.vPosizioneInpsString = '';
	frm.vQualificaString = '';
	frm.vRaggruppamento = null;
	frm.vRaggruppamentoString = '';
	frm.vRaggruppamentiDettaglio = 
	frm.vRaggruppamentiDettaglioString = '';
	
	frm.elements.btn_contratto.enabled = false;
	frm.elements.btn_posizioneinps.enabled = false;
	frm.elements.btn_posinail.enabled = false;
	frm.elements.btn_qualifica.enabled = false;
	frm.elements.btn_raggruppamento.enabled = false;
	frm.elements.btn_sedelavoro.enabled = false;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param formName
 * @param visible
 *
 * @properties={typeid:24,uuid:"E04B3483-472D-4F74-A364-5E5A8E4A7F72"}
 */
function abilitaRaggruppamenti(formName,visible)
{
	var frm = forms[formName];
	
	frm.elements['chk_group_contratto'].visible = visible;
	frm.elements['chk_group_qualifica'].visible = visible;
	frm.elements['chk_group_posizioneinps'].visible = visible;
	frm.elements['chk_group_sedelavoro'].visible = visible;
	frm.elements['chk_group_raggruppamento'].visible = visible;
	
}

/**
 * Recupera i dati relativi alle fasce (forzata,programmata,teorica) dei lavoratori nel periodo richiesto
 * 
 * @param {Array<Number>} arrLavoratori
 * @param {Date} dal
 * @param {Date} al
 * @param {String} [contratto]
 * @param {String} [qualifica]
 * @param {String} [posinps]
 * @param {String} [sedelavoro]
 * @param {String} [raggruppamento]
 * 
 * @return {JSDataSet}
 * 
 * @properties={typeid:24,uuid:"3171832E-D1B1-4A4B-9D49-77188780E2F2"}
 */
function ottieniDatasetRiepilogoFasce(arrLavoratori,dal,al,contratto,qualifica,posinps,sedelavoro,raggruppamento)
{
	// definizione del dataset
	var colNames = ['periodo','idlavoratore','codiceditta','ragionesociale','codicelavoratore','assunzione','cessazione',
			 	    'nominativo','codcontratto','desccontratto','codqualifica','descqualifica',
					'codsedeinps','descsedeinps','codsedelavoro','descsedelavoro','codraggr','descraggr','coddettraggr','descdettraggr'];

	for(var gm = 1; gm <= 31; gm++)
		colNames.push('giorno_' + gm);
	
	var ds = databaseManager.createEmptyDataSet(0,colNames);
		
	// definizione dei periodi da considerare
	var periodoIni = dal.getFullYear() * 100 + dal.getMonth() + 1;
	var arrPeriodi = [periodoIni];
	for(var d =  dal; d <= al; d = new Date(d.getFullYear(),d.getMonth(),d.getDate() + 1))
	{
		var periodo = d.getFullYear() * 100 + d.getMonth() + 1;
		if(arrPeriodi.indexOf(periodo) == -1)
			arrPeriodi.push(periodo);
	}
	
	// popolamento del dataset di riepilogo fasce
	for(var p = 0; p < arrPeriodi.length; p++)
	{
		for(var l = 0; l < arrLavoratori.length; l++)
		{
			var arrRiepFasce = [];
			// periodo
			arrRiepFasce.push(arrPeriodi[p]);
			// lavoratore
			arrRiepFasce.push(arrLavoratori[l]);
			// codice ditta
			arrRiepFasce.push(globals.getDitta(arrLavoratori[l]));
			// ragione sociale
			arrRiepFasce.push(globals.getRagioneSociale(globals.getDitta(arrLavoratori[l])));
			// codice lavoratore 
			arrRiepFasce.push(globals.getCodLavoratore(arrLavoratori[l]));
			// assunzione
			arrRiepFasce.push(globals.getDataAssunzione(arrLavoratori[l]));
			// cessazione
			arrRiepFasce.push(globals.getDataCessazione(arrLavoratori[l]));
			// nominativo lavoratore
			arrRiepFasce.push(globals.getNominativo(arrLavoratori[l]));
			
			// eventuali raggruppamenti
			// contratto 
			if(contratto)
			{
				var codContratto = globals.getContratto(arrLavoratori[l]);
				var descContratto = globals.getDescContratto(codContratto);
				arrRiepFasce.push(codContratto);
				arrRiepFasce.push(descContratto);
			}
			else
			{
				arrRiepFasce.push(null);
				arrRiepFasce.push(null);
			}
			// qualifica
			if(qualifica)
			{
				var codQualifica = globals.getQualifica(arrLavoratori[l]);
				var descQualifica = globals.getDescQualifica(codQualifica);
				arrRiepFasce.push(codQualifica);
				arrRiepFasce.push(descQualifica);
			}
			else
			{
				arrRiepFasce.push(null);
				arrRiepFasce.push(null);
			}
			
			// posizione inps
			if(posinps)
			{
				var posInps = globals.getPosInpsLavoratore(arrLavoratori[l]);
				var descInps = globals.getDescDittaInpsDefault(globals.getDitta(arrLavoratori[l]));
				arrRiepFasce.push(posInps);
				arrRiepFasce.push(descInps);
			}
			else
			{
				arrRiepFasce.push(null);
				arrRiepFasce.push(null);
			}
			// sede di lavoro 
			if(sedelavoro)
			{
				var idSede = globals.getIdSedeLavoro(arrLavoratori[l]);
			    var codSede = globals.getCodSedeDiLavoro(idSede);
			    var descSede = globals.getNomeSedeDiLavoro(idSede);
			    arrRiepFasce.push(codSede);
			    arrRiepFasce.push(descSede);
			}
			else
			{
				arrRiepFasce.push(null);
				arrRiepFasce.push(null);
			}
			
			// eventuale classificazione lavoratore
			if(raggruppamento)
			{  
				//raggruppamento == iddittaclassificazione
				var codClass = globals.getCodiceClassificazione(raggruppamento)
				var descClass = globals.getDescClassificazione(raggruppamento);
				var codDettClass = globals.getCodiceDettaglioClassificazioneLavoratore(arrLavoratori[l],codClass);
	            var descDettClass = globals.getDescDettaglioClassificazione(raggruppamento,codDettClass); 
			    arrRiepFasce.push(codClass);
	            arrRiepFasce.push(descClass);
	            arrRiepFasce.push(codDettClass);
	            arrRiepFasce.push(descDettClass);
			}
			else
			{
				arrRiepFasce.push(null);
				arrRiepFasce.push(null);
				arrRiepFasce.push(null);
				arrRiepFasce.push(null);
			}
			
			var primoGgMese = globals.getFirstDatePeriodo(arrPeriodi[p]);
			var ultimoGgMese = globals.getLastDatePeriodo(arrPeriodi[p]);
			
			for(var g = 1; g <= 31; g++)
			{
				var giorno = new Date(primoGgMese.getFullYear(),primoGgMese.getMonth(),primoGgMese.getDate() + g - 1);
				if(giorno >= primoGgMese && giorno <= ultimoGgMese)
				{
					var infoFascia = globals.ottieniInformazioniFasciaGiorno(arrLavoratori[l],giorno);
 					if(infoFascia)
						arrRiepFasce.push(infoFascia.codalternativo ? infoFascia.codalternativo : '');
					else
						arrRiepFasce.push('');
				}
			}
			
			ds.addRow(arrRiepFasce);
		}
	}
	
	return ds;
	
//	var sqlRiepilogoFasce = "SELECT \
//	YEAR(CAL.Giorno) * 100 + MONTH(CAL.Giorno) AS Periodo \
//	,CAL.Giorno AS Data \
//	,D.Codice AS CodiceDitta \
//	,D.RagioneSociale \
//	,L.idLavoratore \
//	,L.Codice AS CodiceLavoratore \
//	,L.Assunzione \
//	,L.Cessazione \
//	,CASE WHEN P.Nominativo IS NOT NULL \
//	 THEN P.Nominativo \
//	 ELSE (CASE WHEN LPE.Nominativo IS NOT NULL THEN LPE.Nominativo ELSE '' END) \
//	 END AS Nominativo \
//	,CASE \
//	 WHEN G.idFasciaOrariaForzata IS NOT NULL \
//	 THEN G.idFasciaOrariaForzata \
//	 ELSE (CASE WHEN GPF.idFasciaOraria IS NOT NULL THEN GpF.idFasciaOraria ELSE dbo.F_Lav_IDFasciaTeorica(L.idLavoratore,CAL.Giorno) END) \
//	 END AS Fascia \
//	,FO.CodiceFascia \
//	,FO.Descrizione \
//	,CASE WHEN FO.CodAlternativo IS NOT NULL \
//	 THEN FO.CodAlternativo \
//	 ELSE '' \
//	 END AS Turno \
//	FROM \
//	Lavoratori L \
//	INNER JOIN Ditte D \
//	ON L.idDitta = D.idDitta \
//	LEFT JOIN dbo.UF_ElencoGiorniPeriodo(?,?}) CAL \
//	ON CAL.Giorno > L.Assunzione \
//	LEFT OUTER JOIN E2Giornaliera G \
//	ON G.Giorno = CAL.Giorno AND G.idDip = L.idLavoratore \
//	LEFT OUTER JOIN E2GiornalieraProgFasce GPF \
//	ON GPF.Giorno = CAL.Giorno AND GPF.idDip = L.idLavoratore \
//	LEFT JOIN E2FO_FasceOrarie FO \
//	ON FO.idFasciaOraria = (CASE \
//	 WHEN G.idFasciaOrariaForzata IS NOT NULL \
//	 THEN G.idFasciaOrariaForzata \
//	 ELSE (CASE WHEN GPF.idFasciaOraria IS NOT NULL THEN GpF.idFasciaOraria ELSE dbo.F_Lav_IDFasciaTeorica(L.idLavoratore,CAL.Giorno) END) \
//	 END) \
//	LEFT OUTER JOIN Persone P \
//	ON L.CodiceFiscale = P.CodiceFiscale \
//	LEFT OUTER JOIN Lavoratori_PersoneEsterne LPE \
//	ON L.idLavoratore = LPE.idLavoratore \
//	WHERE CAL.Giorno BETWEEN ? AND ? \
//	AND L.idLavoratore IN (" + arrLavoratori.map(function(l){return l}).join(',') + ") \
//	AND L.Assunzione < ? AND (Cessazione IS NULL OR Cessazione > ?) \
//	ORDER BY Nominativo,CAL.Giorno"; 
//	
//	var arrRiepilogoFasce = [dal,al,dal,al,al,dal];
//	var dsRiepilogoFasce = databaseManager.getDataSetByQuery(globals.Server.MA_PRESENZE,sqlRiepilogoFasce,arrRiepilogoFasce,-1);
//
//	return dsRiepilogoFasce;
}

/**
 * Perform the element default action.
 *
 * @param {Object} params
 * 
 * @properties={typeid:24,uuid:"4F7C490C-A817-49B1-B0FB-07A5ADBEF34A"}
 * @AllowToRunInFind
 */
function exportReportRiepilogoTurniDip(params) 
{
	try
	{
		var reportName = 'PT_RiepilogoProgrammazioneDip';
		var periodo = params['periodo'];
		var parameters = {
				              pelencodip : params['iddipendenti'],
				              pdal : params['dalladata'],
							  pal : params['alladata'],
							  pcontratto : params['groupcontratto'],
							  pqualifica : params['groupqualifica'],
							  pposinps   : params['groupposizioneinps'],
							  psedelavoro : params['groupsedelavoro'],
							  pclassificazione : params['groupclassificazione']
						  };
		
		/**
		 * Save additional operation's information
		 */
		var vDateTo = new Date();
		var values = 
		{
			op_hash		: utils.stringMD5HashBase64(params['idditta'] + vDateTo.toString()),
			op_ditta	: params['idditta'],
			op_message	: globals.getNumMese(vDateTo.getMonth() + 1) + '/' + vDateTo.getFullYear(),
			op_periodo 	: periodo
		};
		
		globals.startAsyncOperation
		(
			 globals.createReport
			,[
				 globals.getSwitchedServer(globals.Server.MA_PRESENZE)
				,parameters
				,reportName + '.jasper'
				,[[reportName, globals.dateFormat(params['dalladata'],globals.ISO_DATEFORMAT), globals.dateFormat(params['alladata'],globals.ISO_DATEFORMAT)].join('_'),'pdf'].join('.')
			 ]
			, null
			, null
			, globals.OpType.SST
			, values
		);
	}
	catch(ex)
	{
		globals.ma_utl_logError(ex);
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param params
 *
 * @properties={typeid:24,uuid:"2C16F721-BAA2-4F40-9CD6-2C13F3666D4C"}
 */
function exportReportRiepilogoTurni(params)
{
	try
	{
		var op_values = {op_ditta : params.idditta,
						 op_progress : 25,
						 op_periodo : params.dalladata.getFullYear() * 100 + params.dalladata.getMonth() + 1,
						 op_message : 'Recupero dei dati in corso...' };
		var operation = scopes.log.GetNewOperation(globals.OpType.SST,op_values);
		if(!operation)
			throw new Error('createReport: Cannot create operation');		
				
		var frm = forms.mao_history_main_lite;
	    //  apertura form storico senza necessariamente aprire il program relativo (molto più snello)	
		globals.ma_utl_showFormInDialog(frm.controller.getName(), 'Avanzamento stato operazione');		
		
		// ottenimento del dataset
		var ds = globals.ottieniDatasetRiepilogoFasce(params.iddipendenti,params.dalladata,params.alladata,
			                                          params.groupcontratto,params.groupqualifica,params.groupposizioneinps,params.groupsedelavoro,params.groupclassificazione);
		
		operation.op_message = 'Generazione del report in corso...';
		operation.op_progress = 75;
		
		// definizione delle colonne e dei tipi del dataset
		var types = [JSColumn.NUMBER,JSColumn.NUMBER,JSColumn.NUMBER,JSColumn.TEXT,JSColumn.NUMBER,JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.TEXT,
		             JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT];
		for(var gm = 1; gm <= 31; gm++)
			types.push(JSColumn.TEXT);
			
		// creazione foundset corrispondente
		var fs = databaseManager.getFoundSet(ds.createDataSource('dS_ReportRiepilogoFasce',types));
		fs.loadAllRecords();
		
		var sortArr = [];
		var sortStr = '';
		if(params.groupcontratto)
			sortArr.push('codcontratto');
		if(params.groupqualifica)
			sortArr.push('codqualifica');
		if(params.groupposizioneinps)
			sortArr.push('codsedeinps');
		if(params.groupsedelavoro)
			sortArr.push('codsedelavoro');
		if(params.groupclassificazione)
			sortArr.push('coddettraggr');
		sortArr.push('periodo');
		sortArr.push('nominativo');	
		
		sortStr = sortArr.join(',');
		
		fs.sort(sortStr);
		
		var reportParams = new Object();
		reportParams.pdal = params.dalladata;
		reportParams.pal = params.alladata;
		
		var reportName = 'PT_RiepilogoProgrammazione.jasper';
		var fileName = 'Riepilogo_Programmazione_Fasce_Dal_' + globals.dateFormat(params.dal,globals.ISO_DATEFORMAT) + '_Al_' + globals.dateFormat(params.al,globals.ISO_DATEFORMAT) +'.pdf';
		globals.createReportWithFoundset(fs,reportParams,reportName,fileName,operation);
	}
	catch(ex)
	{
		application.output(ex.message);
		globals.ma_utl_showErrorDialog('Errore durante la creazione del report')
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * @param params
 *
 * @properties={typeid:24,uuid:"774A7B76-D97D-4E84-9EEF-81093237AED7"}
 */
function stampaGiornalieraDittaSync(params)
{
	var url = WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaGiornalieraSync";
	return getWebServiceResponse(url, params);
}

/**
 * @param params
 *
 * @properties={typeid:24,uuid:"4C6CE052-7D08-427B-9CE5-24FFDAC25F12"}
 */
function stampaCertificatiSync(params)
{
	var url = WS_REPORT_URL + (globals.WS_DOTNET_CASE == globals.WS_DOTNET.CORE ? "/Report" : "/Stampe") + "/StampaSituazioneEventiLunghiSync";
    return globals.getWebServiceResponse(url, params);
}