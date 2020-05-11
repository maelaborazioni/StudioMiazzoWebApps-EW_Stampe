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
 * @param formName
 * @param formTitle
 * @param [enableGrouping]
 * 
 * @properties={typeid:24,uuid:"632BB5C0-5B26-4BF1-B278-0E46D9A280A7"}
 * @AllowToRunInFind
 */
function seleziona_ditte_stampa(formName, formTitle, enableGrouping)
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
		/** @type {JSForm} */
		var form = forms[formName];
		/** @type {JSFoundSet} */
		var fs = form.foundset;
		if(form.foundset.find())
		{
			fs['idditta'] = arrDitte;
			fs.search();
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
function seleziona_ditta_stampa(formName, formTitle, enableGrouping)
{
	/** @type {Number} */
	var idditta = null;
	
	if(globals._filtroSuDitta)
	   idditta = globals._filtroSuDitta;
	else
	   idditta = globals.ma_utl_showLkpWindow({ lookup: 'LEAF_Lkp_Ditte',
		                                        multiSelect : false,
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
	seleziona_ditta_stampa(forms.stampa_situazione_eventi_lunghi.controller.getName(), 'Stampa situazione eventi lunghi');
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
	seleziona_ditte_stampa(forms.stampa_statistica_turni.controller.getName(), 'Stampa situazione turni', true);
}

/**
 * @param {Object} event
 *
 * @properties={typeid:24,uuid:"71B03A5E-07F5-4073-AE11-8CB177DE0C89"}
 */
function selezione_ditta_stampa_presenti_assenti(event)
{
	/** @type {JSFoundSet<db:/ma_presenze/e2sediinstallazione>} */
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
	seleziona_ditta_stampa(forms.stampa_esportazione_timbrature.controller.getName(),'Esportazione timbrature');
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
	// add new operation info for future updates
	var operation = scopes.operation.create(params['idditta'],globals.getGruppoInstallazioneDitta(params['idditta']),params['periodo'],globals.OpType.SG);
	if(operation == null || operation.operationId == null)
	{
		globals.ma_utl_showErrorDialog('Errore durante la preparazione dell\'operazione lunga. Riprovare o contattare il  servizio di Assistenza.');
		return;
	}
	params.operationid = operation.operationId;
	params.operationhash = operation.operationHash;
	
	var url = WS_REPORT + "/Report32/StampaGiornalieraAsync";
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
	// add new operation info for future updates
	var operation = scopes.operation.create(params['idditta'],globals.getGruppoInstallazioneDitta(params['idditta']),params['periodo'],globals.OpType.SSEL);
	if(operation == null || operation.operationId == null)
	{
		globals.ma_utl_showErrorDialog('Errore durante la preparazione dell\'operazione lunga. Riprovare o contattare il  servizio di Assistenza.');
		return;
	}
	params.operationid = operation.operationId;
	params.operationhash = operation.operationHash;
	
	/**
	 * Launch the operation and close the window
	 */
    var url = WS_REPORT + "/Report32/StampaSituazioneEventiLunghiAsync";
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
	seleziona_ditta_stampa(forms.stampa_anomalie_cartolina.controller.getName(),'Stampa anomalie cartolina');
//	var frm = forms.stampa_anomalie_cartolina;
//	globals.ma_utl_setStatus(globals.Status.EDIT,frm.controller.getName());
//	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Stampa anomalie cartolina');
}

/**
 * @properties={typeid:24,uuid:"5158B489-00C4-4603-AB12-7424549C5E24"}
 */
function selezione_periodo_stampa_cartolina_dipendente()
{
	seleziona_ditta_stampa(forms.stampa_cartolina_presenze_dipendente.controller.getName(),'Stampa cartolina dipendente');
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
	seleziona_ditta_stampa(forms.stampa_situazione_ratei_dipendente.controller.getName(),'Stampa ratei dipendente');
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
	frm.vPosizioneinpsString = '';
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
 * @param {Number} [classificazione]
 * 
 * @return {JSDataSet}
 * 
 * @properties={typeid:24,uuid:"3171832E-D1B1-4A4B-9D49-77188780E2F2"}
 */
function ottieniDatasetRiepilogoFasce(arrLavoratori,dal,al,contratto,qualifica,posinps,sedelavoro,raggruppamento,classificazione)
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
				var codClass = globals.getCodiceClassificazione(classificazione);
				var descClass = globals.getDescClassificazione(classificazione);
				var codDettClass = globals.getCodiceDettaglioClassificazioneLavoratore(arrLavoratori[l],codClass);
	            var descDettClass = globals.getDescDettaglioClassificazione(classificazione,codDettClass); 
			    
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
							  pclassificazione : params['groupclassificazione'],
							  pdettclassificazione : params['']
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
 * Creazione del report con il riepilogo dei turni
 * 
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
		var operation = scopes.operation.getNewOperation(globals.OpType.SST,op_values);
		if(!operation)
			throw new Error('createReport: Cannot create operation');		
				
		var frm = forms.mao_history_main_lite;
	    //  apertura form storico senza necessariamente aprire il program relativo (molto più snello)	
		globals.ma_utl_showFormInDialog(frm.controller.getName(), 'Avanzamento stato operazione');		
		
		// ottenimento del dataset
		var ds = globals.ottieniDatasetRiepilogoFasce(params.iddipendenti,params.dalladata,params.alladata,
			                                          params.groupcontratto,params.groupqualifica,params.groupposizioneinps,params.groupsedelavoro,
													  params.groupraggruppamento,params.groupclassificazione);
		
		operation.op_message = 'Generazione del report in corso...';
		operation.op_progress = 75;
		
		// definizione delle colonne e dei tipi del dataset
		var types = [JSColumn.NUMBER,JSColumn.NUMBER,JSColumn.NUMBER,JSColumn.TEXT,JSColumn.NUMBER,JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.TEXT,
		             JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT];
		// ciclo su 31 giorni (esposizione del report suddivisa per periodo)
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
		
		var fileName = 'Riepilogo_Programmazione_Fasce_Dal_' + globals.dateFormat(params.dal,globals.ISO_DATEFORMAT) + '_Al_' + globals.dateFormat(params.al,globals.ISO_DATEFORMAT);
		
		var reportParams = new Object();
		reportParams.pdal = params.dalladata;
		reportParams.pal = params.alladata;
		
		var reportName = 'PT_RiepilogoProgrammazione.jasper';
		fileName += '.pdf';
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
 * Creazione del file excel con il riepilogo dei turni
 * 
 * @param {{idditta : Number, iddipendenti : Array<Number>, dalladata : Date, alladata : Date, groupcontratto : String, groupqualifica : String, groupposizioneinps : String,
 *         groupsedelavoro : String,  groupraggruppamento : String, groupclassificazione : Number}} params
 * 
 * @properties={typeid:24,uuid:"6CF25DBC-E652-4594-B291-11A762953676"}
 */
function exportExcelRiepilogoTurni(params)
{
	try
	{
		var op_values = {op_ditta : params.idditta,
						 op_progress : 25,
						 op_periodo : params.dalladata.getFullYear() * 100 + params.dalladata.getMonth() + 1,
						 op_message : 'Recupero dei dati in corso...' };
		var operation = scopes.operation.getNewOperation(globals.OpType.SST,op_values);
		if(!operation)
			throw new Error('createReport: Cannot create operation');		
		
		var fileName = 'Riepilogo_Programmazione_Fasce_Dal_' + globals.dateFormat(params.dalladata,globals.ISO_DATEFORMAT) + '_Al_' + globals.dateFormat(params.alladata,globals.ISO_DATEFORMAT);
		
		/** @type {Array<byte>} */
		var template = plugins.file.readFile('C:/Report/PT_RiepilogoProgrammazione.xls');
		
		var frm = forms.mao_history_main_lite;

		//  apertura form storico senza necessariamente aprire il program relativo (molto più snello)	
		globals.ma_utl_showFormInDialog(frm.controller.getName(), 'Avanzamento stato operazione');		
		
		params.iddipendenti = scopes.lavoratori.sortByNominativo(params.iddipendenti);
		
		// ottenimento del dataset
		var ds = globals.ottieniDatasetRiepilogoFasce(params.iddipendenti,params.dalladata,params.alladata,
													  params.groupcontratto,params.groupqualifica,params.groupposizioneinps,params.groupsedelavoro,
													  params.groupraggruppamento,params.groupclassificazione);
		
		// definizione delle colonne e dei tipi del dataset
		var colTypes = [JSColumn.NUMBER,JSColumn.NUMBER,JSColumn.NUMBER,JSColumn.TEXT,JSColumn.NUMBER,JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.TEXT,
		             JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT];
		var colNames = ['periodo','idlavoratore','codiceditta','ragionesociale','codicelavoratore','assunzione','cessazione',
				 	    'nominativo','codcontratto','desccontratto','codqualifica','descqualifica',
						'codsedeinps','descsedeinps','codsedelavoro','descsedelavoro','codraggr','descraggr','coddettraggr','descdettraggr'];
		
		// ciclo su 31 giorni (esposizione del report suddivisa per periodo)
		for(var gm = 1; gm <= 31; gm++)
			colTypes.push(JSColumn.TEXT);
				
//		var sortArr = [];
//		var sortStr = '';
//		if(params.groupcontratto)
//			sortArr.push('codcontratto');
//		if(params.groupqualifica)
//			sortArr.push('codqualifica');
//		if(params.groupposizioneinps)
//			sortArr.push('codsedeinps');
//		if(params.groupsedelavoro)
//			sortArr.push('codsedelavoro');
//		if(params.groupclassificazione)
//			sortArr.push('coddettraggr');
//		sortArr.push('periodo');
//		sortArr.push('nominativo');	
//		
//		sortStr = sortArr.join(',');
//		
//		fs.sort(sortStr);
								
		var bytes = globals.xls_export(ds,fileName,true,false,true,null,'Riepilogo programmazione turni',template,colNames,colTypes);
	
		ds.removeRow(-1);
		
		if(!bytes || bytes.length == 0)
			return false;
		
		databaseManager.startTransaction();
		
		if(!globals.saveFile(operation, bytes, fileName + '.csv', globals.MimeTypes.CSV))
			throw 'Errore durante il salvataggio del file';
		
		operation.op_message = 'Esportazione completata con successo';
		operation.op_end = new Date();
		operation.op_status = globals.OpStatus.SUCCESS;
		operation.op_progress = 100;
		
		return true;
	}
	catch(ex)
	{
		application.output(ex.message,LOGGINGLEVEL.ERROR);
		if(operation)
		{
			operation.op_end = new Date();
			operation.op_status = globals.OpStatus.ERROR;
			operation.op_progress = 0;
			operation.op_message = 'Errore durante l\'esportazione dei dati' + (ex && (': ' + ex));
		}
		
		return false;
	}
	finally
	{
		/**
		 * Remove all created files and commit the transaction
		 */
		plugins.file.deleteFolder(globals.SERVER_TMPDIR.replace(/\\/g,'/') + '/export/', false);
		databaseManager.commitTransaction();
		/** @type {{statusCode:Number, returnValue:Object, message:String, operationId:String, 
                    operationHash:String, status:Number, start:Date, end:Date, progress:Number, lastProgress:Date}} */
		var retObj = {
			statusCode : HTTPStatusCode.OK,
			returnValue : true,
			message : operation.op_message,
			operationId : operation.op_id,
			operationHash : operation.op_hash,
			status : operation.op_status,
			start : operation.op_start,
			end : operation.op_end,
			progress : operation.op_progress,
			lastProgress : operation.op_lastprogress
		};
		forms.mao_history.checkStatusCallback(retObj);
		forms.mao_history.operationDone(retObj);
	}
}

/**
 * @param params
 *
 * @properties={typeid:24,uuid:"774A7B76-D97D-4E84-9EEF-81093237AED7"}
 */
function stampaGiornalieraDittaSync(params)
{
	var url = WS_REPORT + "/Report32/StampaGiornalieraSync";
	return getWebServiceResponse(url, params);
}

/**
 * @param params
 *
 * @properties={typeid:24,uuid:"4C6CE052-7D08-427B-9CE5-24FFDAC25F12"}
 */
function stampaCertificatiSync(params)
{
	var url = WS_REPORT + "/Report32/StampaSituazioneEventiLunghiSync";
    return globals.getWebServiceResponse(url, params);
}