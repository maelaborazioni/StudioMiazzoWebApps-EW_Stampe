/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"FC35DD30-CFC0-4F5C-A7DD-8D6D44804C93",variableType:-4}
 */
var _arrDitteSel = [];

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"54B84E85-5A6F-43DA-B8D2-7C6E2B9DA81C",variableType:4}
 */
var _idditta = -1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"97B54239-FD49-4086-BB5B-FF932BD9524F",variableType:4}
 */
var vFormat = 1;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FEC61647-FE95-43B5-8813-5AAEA9D28CB5"}
 */
function onShow(firstShow, event) 
{	
	if(firstShow)
		vFormat = globals.FileFormats.EXCEL;
	
	plugins.busy.prepare();
	_super.onShowForm(firstShow, event);		
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B6B14A93-A565-44DB-A7D7-B0796E0CCE93"}
 * @AllowToRunInFind
 */
function stampaAnagrafica(event) {

	if (forms.stampa_filtri_anagrafici.validaFiltriAnagrafici())
	{
		if(validaOpzioni())
		{		
			var choice = vFormat;
			var params;
			
			switch (choice) 
			{
				case globals.FileFormats.PDF:
					params = {
						processFunction: process_export_report,
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
				    break;
				case globals.FileFormats.EXCEL:
					params = {
						processFunction: process_export_excel,
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
					break;
	
				default:
					globals.ma_utl_showWarningDialog('Selezionare il formato di esportazione', 'i18n:hr.msg.attention');
			}		
		} 
		else
			globals.ma_utl_showWarningDialog('Controllare i valori inseriti', 'Stampa anagrafica dipendenti');
			
	}
}

/**
 * @returns Boolean
 * 
 * @properties={typeid:24,uuid:"94525729-7DB6-4919-9A45-C85625EAAA24"}
 */
function validaOpzioni()
{
	var frmOpt = forms.stampa_anagrafica_dipendenti_opzioni;
	
	if(frmOpt.vChkInForzaAl)
	{
		if(frmOpt.vChkInForzaAlGiorno && frmOpt.vInForzaAlGiorno === null)
			return false;
		
		if(frmOpt.vChkInForzaAlMese && frmOpt.vInForzaAlMese === null)
			return false;
		
		if(!frmOpt.vChkInForzaAlGiorno && !frmOpt.vChkInForzaAlMese)
			return false;
	}
	
	if(frmOpt.vChkAssunti || frmOpt.vChkDimessi || frmOpt.vChkCtrScadenza)
	{
		if(frmOpt.vChkDalGiorno === null || frmOpt.vAlGiorno === null)
			return false;
		
	}
	
	if(frmOpt.vChkDecorrenzeAl && frmOpt.vArrDecorrenze.length == 0)
		return false;
		
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F263E1D8-F865-4D38-9F69-426614429A2A"}
 */
function process_export_report(event)
{
	try
	{
		exportReport(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_export_report : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CC412A8D-4977-4ABA-B53A-8BA3B2B5673B"}
 */
function process_export_excel(event)
{
	try
	{
		exportExcel(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_export_excel : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}

/**
 * Lancia l'operazione lunga di creazione del report richiesto
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"090196E3-2A50-430D-8256-A4B721B95A14"}
 */
function exportReport(event)
{
	try
	{
		globals.ma_utl_setStatus(globals.Status.BROWSE,forms.stampa_filtri_anagrafici.controller.getName());
		globals.svy_mod_closeForm(event);
			
		var vDate = new Date();
		var values = 
		{
			op_hash		: utils.stringMD5HashBase64(idditta + vDate.toString()),
			op_ditta	: idditta,
			op_message	: 'Esportazione in corso...',
			op_periodo 	: utils.dateFormat(vDate, globals.PERIODO_DATEFORMAT)
		};
		
		globals.startAsyncOperation
		(
			 createReport,
			 [_idditta,new Date()],
			 null,
			 null,
			 globals.OpType.EWEA,
			 values
		);	
	}
	catch(ex)
	{
		application.output(ex,LOGGINGLEVEL.ERROR);
	}
}

/**
 * Lancia l'operazione lunga di esportazione del file di excel
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"0CC6479E-6B75-4AA2-A514-D50285EA14AC"}
 */
function exportExcel(event) 
{
	try
	{
		globals.ma_utl_setStatus(globals.Status.BROWSE,forms.stampa_filtri_anagrafici.controller.getName());
		globals.svy_mod_closeForm(event);
			
		var vDate = new Date();
		var values = 
		{
			op_hash		: utils.stringMD5HashBase64(idditta + vDate.toString()),
			op_ditta	: idditta,
			op_message	: 'Esportazione in corso...',
			op_periodo 	: utils.dateFormat(vDate, globals.PERIODO_DATEFORMAT)
		};
		
		globals.startAsyncOperation
		(
			 createExcelFile,
			 [_idditta,new Date()],
			 null,
			 null,
			 globals.OpType.EWEA,
			 values
		);
		
		
	}
	catch(ex)
	{
		application.output(ex,LOGGINGLEVEL.ERROR);
	}
}

/**
 * @AllowToRunInFind
 * 
 * Popola e genera il file excel con i dati richiesti
 * 
 * @param {Number} dittaID
 * @param {Date} dateTo
 * @param {JSRecord<db:/ma_log/operationlog>} operation
 *
 * @properties={typeid:24,uuid:"C831303E-71C2-42CE-B337-D290684ABE3D"}
 * @SuppressWarnings(wrongparameters)
 */
function createExcelFile(dittaID, dateTo, operation)
{
	try
	{
		/**
		 * Make sure some date is set
		 */
		var vDateTo = globals.TODAY;
		
		// verifica tipologia ditta
		var isInterinale = globals.isInterinale(idditta);
		
		// form opzioni anagrafica
		var frmAnag = forms.stampa_filtri_anagrafici;
		
		// verifica tipologia raggruppamento
		var isClassificazioneManuale = globals.isClassificazioneManuale(idditta,frmAnag.vRaggruppamentoCodice);
		
		// LOG per inizio recupero dati
		operation.op_message = 'Inizio estrazione dati';
		operation.op_end = new Date();
		operation.op_status = globals.OpStatus.ONGOING;
		operation.op_progress = 10;
		
		var fileName = ['Elenco_Anagrafiche', 'Periodo', utils.dateFormat(vDateTo, globals.PERIODO_DATEFORMAT)].join('_');
		var localFile = true;
		/** @type {Array<byte>} */
		var template = plugins.file.readFile('C:/Report/EW_ElencoAnagrafiche.xls');
		
		// form opzioni di stampa
		var frmOpt = forms.stampa_anagrafica_dipendenti_opzioni;
		var dal,al = null;
		if(frmOpt.vChkInForzaAl)
		{
			if(frmOpt.vChkInForzaAlGiorno)
			{
				dal = frmOpt.vInForzaAlGiorno;
				al = frmOpt.vInForzaAlGiorno;
			}
			else
			{
			 	dal = new Date(frmOpt.vInForzaAlMese.getFullYear(),frmOpt.vInForzaAlMese.getMonth(),1);
			 	al = new Date(frmOpt.vInForzaAlMese.getFullYear()
			 		          ,frmOpt.vInForzaAlMese.getMonth()
							  ,globals.getTotGiorniMese(frmOpt.vInForzaAlMese.getMonth() + 1,frmOpt.vInForzaAlMese.getFullYear()));
			}
				
		}
		else if(frmOpt.vChkAssunti || frmOpt.vChkDimessi || frmOpt.vChkCtrScadenza)
		{
			dal = frmOpt.vDalGiorno;
			al = frmOpt.vAlGiorno;
		}
		else if(frmOpt.vChkDecorrenzeAl)
		{ 
			dal = frmOpt.vDecorrenzeAl;
			al = frmOpt.vDecorrenzeAl;
		}
		else
		{
			dal = globals.TODAY;
			al = globals.TODAY;
		}
		
		// array di parametri
		var sqlArr = [dal];
		
		// array con nomi delle colonne
		var colNames = ['codditta','ragionesociale','cod_sedelavoro','sedelavoro','coddipendente','nominativo','sesso','matricola','qualifica','livello',
		                'dataassunzione','datacessazione','scadenzacontratto','dataanzianitaTFR','dataanzianitacontributiva','codcontrinserim','desccontrinserim',
						'datanascita','codicefiscale','luogonascita','indirizzo', 'posizioneinps', 'codtitolostudio','desctitolostudio','tiporapportoCUD','turnista','stagionale',
						'parttime','codcategpartic','desccategpartic','cittadinanza','extracomunitario'];
		var colTypes = [JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,
		                JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.TEXT,JSColumn.TEXT,
						JSColumn.DATETIME,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT, JSColumn.NUMBER, JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,
						JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT];
		
		// query originale Epi2
		var strSQL = "SELECT "
        strSQL = strSQL + " D.Codice as CodDitta, D.RagioneSociale, DS.Codice AS Cod_SedeLavoro, DS.Descrizione AS SedeLavoro"
        strSQL = strSQL + " , L.CodDipendente, ISNULL(LPE.Nominativo, P.Nominativo) AS Nominativo, ISNULL(LPE.Sesso, P.Sesso) AS Sesso"
        strSQL = strSQL + " , L.Matricola, TQ.Descrizione AS Qualifica"
        strSQL = strSQL + " , LJ.CodLivello AS Livello, L.Assunzione AS DataAssunzione, L.Cessazione AS DataCessazione"
        strSQL = strSQL + " , L.ScadenzaContratto AS ScadenzaContratto, L.AnzConvenzionale AS DataAnzianitaTFR, L.AnzContributiva AS DataAnzianitaContributiva"
        strSQL = strSQL + " , L.CodContrattoInserimento AS CodContrInserim, TCIns.Descrizione AS DescContrInserim"
        strSQL = strSQL + " , ISNULL(LPE.Nascita_Data, P.Nascita_Data) AS DataNascita, ISNULL(L.CodiceFiscale,LPE.CodiceFiscale) AS CodiceFiscale"
        strSQL = strSQL + " , ISNULL(RTRIM(TCINas.Descrizione) + ' (' + TCINas.Provincia + ')', RTRIM(TSENas.Descrizione) + ' (EE)') AS LuogoNascita"
        strSQL = strSQL + " , RTRIM(LDA.INDIRIZZO) + ' - ' + CAST(LDA.CAP AS VarChar) + ' ' + RTRIM(LDA.Comune) + ' (' + LDA.Provincia + ')' AS Indirizzo"
		strSQL = strSQL + " , L.PosizioneInps"
		
        strSQL = strSQL + " , TTS.CodComunicazione AS CodTitoloStudio"
		strSQL = strSQL + " , TTS.Descrizione AS DescTitoloStudio"
        strSQL = strSQL + " , L.CodTipoRapporto AS TipoRapportoCUD"
        strSQL = strSQL + " , dbo.F_Lav_DecAllaDataValore(L.idLavoratore, 23, ?) AS Turnista"
        strSQL = strSQL + " , L.Stagionale"
		strSQL = strSQL + " , CASE WHEN L.PercentualePT = 0 THEN '' ELSE REPLACE(CAST(L.PercentualePT AS varchar),'.',',') END AS PartTime"
        strSQL = strSQL + " , L.CodCategoriaParticolare as CodCategPartic, TCP.Descrizione AS DescCategPartic"
        strSQL = strSQL + " , ISNULL(SE.Descrizione, 'NON DEFINITO') AS Cittadinanza"
        strSQL = strSQL + " , CASE WHEN dbo.F_Lav_Extracomunitario(L.idLavoratore, '') = 1 THEN 'SI' ELSE 'NO' END AS Extracomunitario"

        if(frmOpt.vChkDecorrenzeAl)
        {
           template = plugins.file.readFile('C:/Report/EW_ElencoAnagraficheDecorrenze.xls');	
           strSQL = strSQL + " , LavDec.Decorrenza AS DataDecorrenza, LavDec.idDCG_Campi AS CodTipoDecorrenza, Campi.DescrizioneCampo AS TipoDecorrenza"
           colNames.push('datadecorrenza');
           colTypes.push(JSColumn.DATETIME);
           colNames.push('codtipodecorrenza');
           colTypes.push(JSColumn.TEXT);
           colNames.push('tipodecorrenza');
           colTypes.push(JSColumn.TEXT);
           colNames.push('valoredecorrenza');
           colTypes.push(JSColumn.TEXT);
           colNames.push('valoreaggiuntivo');
           colTypes.push(JSColumn.TEXT);
           
           strSQL += " , CASE WHEN LavDec.idDCG_Campi = 3 THEN R.CodiceRegola + ' (' + R.DescrizioneRegola + ')' ELSE LavDec.Valore END AS ValoreDecorrenza"
           strSQL += " , CASE WHEN LavDec.ValoreAgg IS NULL THEN '' ELSE 'Giorno di partenza della regola : ' + LavDec.ValoreAgg END AS ValoreAggiuntivo"	   
        }
                
        if(frmAnag.vFilterRaggruppamento)
        {
        	strSQL = strSQL + " , CL.Codice, CL.Descrizione , CL.CodDettaglio , CL.DescDettaglio";
        	colNames.push('codice');
        	colTypes.push(JSColumn.TEXT);
        	colNames.push('descrizione');
        	colTypes.push(JSColumn.TEXT);
        	colNames.push('coddettaglio');
        	colTypes.push(JSColumn.TEXT);
        	colNames.push('descdettaglio');
        	colTypes.push(JSColumn.TEXT);
        }
        
        strSQL = strSQL + " FROM V_Lavoratori L"
		strSQL = strSQL + " LEFT OUTER JOIN Persone P ON L.CodiceFiscale = P.CodiceFiscale"
        strSQL = strSQL + " LEFT OUTER JOIN Lavoratori_JOB LJ ON L.idLavoratore = LJ.idLavoratore"
        strSQL = strSQL + " LEFT OUTER JOIN E2TabQualifiche TQ ON TQ.RadiceQualifica = L.CodQualifica"
        strSQL = strSQL + " LEFT OUTER JOIN Ditte D ON L.idDitta = D.idDitta"
        if(frmAnag.vFilterPosizioneInps)
           strSQL = strSQL + " LEFT OUTER JOIN Ditte_Inps DI ON DI.idDitta = D.idDitta"
        strSQL = strSQL + " LEFT OUTER JOIN E2TabCategorieParticolari TCP ON L.CodCategoriaParticolare = TCP.CATEG_PARTIC_ANAGR"
        strSQL = strSQL + " LEFT OUTER JOIN Lavoratori_PersoneEsterne LPE ON L.idLavoratore = LPE.idLavoratore"
        strSQL = strSQL + " LEFT OUTER JOIN Lavoratori_StatoAnag LSA ON L.idLavoratore = LSA.idLavoratore"
        strSQL = strSQL + " LEFT OUTER JOIN Tab_ComuniItalia TCINas ON ISNULL(LPE.Nascita_CodComune, P.Nascita_CodComune) = TCINas.CodComune"
        strSQL = strSQL + " LEFT OUTER JOIN Tab_StatiEsteri TSENas ON ISNULL(LPE.Nascita_CodComune, P.Nascita_CodComune) = TSENas.CodIrpefStato"
        strSQL = strSQL + " LEFT OUTER JOIN (SELECT * FROM V_Persone_UltimoIndirizzo WHERE CodTipoIndirizzo = 'R'"
        strSQL = strSQL + " ) LDA ON L.CodiceFiscale = LDA.CodiceFiscale"
        strSQL = strSQL + " LEFT OUTER JOIN E2TabTitoliStudio TTS ON LSA.CodTitoloStudio = TTS.idTitoloStudio"
        strSQL = strSQL + " LEFT OUTER JOIN E2TabContrattiInserimento TCIns ON L.CodContrattoInserimento = TCIns.Codice"
        strSQL = strSQL + " LEFT OUTER JOIN (SELECT * FROM Tab_StatiEsteri WHERE CodiceDR <> '000' OR Codice = 1) SE ON LSA.CodCittadinanza = SE.CodiceDR "
                
        //Legame con le decorrenze
        if(frmOpt.vChkDecorrenzeAl)
        {
           strSQL = strSQL + " LEFT OUTER JOIN F_Dec_Ditta_Periodo(?,?,?) AS LavDec ON L.idLavoratore = LavDec.id_Legato";
           strSQL = strSQL + " LEFT JOIN E2DCG_Campi Campi ON Campi.idDCG_Campi = LavDec.idDCG_Campi";
           strSQL = strSQL + " LEFT OUTER JOIN E2Regole R ON R.idRegole = LavDec.Valore"
           sqlArr.push(idditta);
           sqlArr.push(dal);
           sqlArr.push(dal);
        }
        
        if(frmAnag.vFilterRaggruppamento)
        {
        	strSQL = strSQL + " INNER JOIN \
								 (\
									SELECT \
								   LC.idLavoratoreClassificazione \
								   , LC.idLavoratore \
								   , LC.idDitta \
								   , DC.Codice \
								   , DC.Descrizione \
								   , DC.DescrizioneSostitutiva \
								   , DCD.Codice AS CodDettaglio \
								   , DCD.Descrizione AS DescDettaglio \
								   , DCD.idDittaClassificazioneDettaglio \
								FROM \
									Lavoratori_Classificazioni LC ";
        	
        	if(isInterinale && !isClassificazioneManuale)
        		strSQL += " LEFT OUTER JOIN Ditte_Legami DL ON LC.idDitta = DL.idDitta "; 
        	
        	strSQL += " INNER JOIN Ditte_ClassificazioniDettaglio DCD ON DCD.Codice = LC.CodClassificazione \
                        INNER JOIN Ditte_Classificazioni DC ON DCD.idDittaClassificazione = DC.idDittaClassificazione " 
        	
        	isInterinale && !isClassificazioneManuale ? strSQL += " AND DC.idDitta = DL.idDittaRiferimento " : strSQL += " AND DC.idDitta = LC.idDitta"; 
								
			strSQL += " WHERE LC.idDitta = " + idditta + " \
					    AND LC.CodTipoClassificazione = " + frmAnag.vRaggruppamentoCodice + " AND LC.CodClassificazione IN (" + frmAnag.vRaggruppamentiDettaglio.join(',') + ") \
						AND DC.Codice = " + frmAnag.vRaggruppamentoCodice + " \
						AND DCD.Codice IN (" + frmAnag.vRaggruppamentiDettaglio.join(',') + ") \
						) AS CL ON CL.idLavoratore = L.idLavoratore ";
        }
        strSQL = strSQL + " LEFT OUTER JOIN Ditte_Sedi DS ON L.idDittaSede = DS.idDittaSede"
		strSQL = strSQL + " WHERE D.idDitta = ?"
		
		sqlArr.push(idditta);
		
		if(frmAnag.vFilterContratto )
			strSQL = strSQL + " AND L.RadiceContratto IN (" + frmAnag.vContratto.join(',') + ")";
		
		if(frmAnag.vFilterQualifica)
			strSQL = strSQL + " AND L.CodQualifica IN (" + frmAnag.vQualifica.join(',') + ")";
		
		if(frmAnag.vFilterPosizioneInps)
			strSQL = strSQL + " AND L.PosizioneInps IN (" + frmAnag.vPosizioniInps.join(',') + ")";
		
		if(frmAnag.vFilterSedeLavoro)
			strSQL = strSQL + " AND DS.idDittaSede IN (" + frmAnag.vSediLavoro.join(',') + ")";
		
//		if(frmAnag.vFilterRaggruppamento)
//		{
//			strSQL = strSQL + " AND LR.CodTipoClassificazione = ?"
//			sqlArr.push(frmAnag.vRaggruppamentoCodice);
//		    
//			if(frmAnag.vRaggruppamentiDettaglio && frmAnag.vRaggruppamentiDettaglio.length > 0)
//				strSQL = strSQL + " AND LR.CodClassificazione IN (" + frmAnag.vRaggruppamentiDettaglio.join(',') + ")";
//		
//		}
                
        // gestione opzioni di "in forza al"
		if (frmOpt.vChkInForzaAl) 
		{
			strSQL = strSQL.concat(' AND ((L.Cessazione >= ? OR L.Cessazione IS NULL) AND L.Assunzione <= ?) ');
			
			if (frmOpt.vChkInForzaAlGiorno) 
			{
				sqlArr.push(dal);
			    sqlArr.push(al);
			}
			else
			{
				var periodo = frmOpt.vInForzaAlMese.getFullYear() * 100 + frmOpt.vInForzaAlMese.getMonth() + 1;
				/** @type {Date} */
				var ultimoGGMese = globals.getLastDatePeriodo(periodo);
				sqlArr.push(dal);
				sqlArr.push(ultimoGGMese);
			}
		}
		// gestione opzioni di "assunti/dimessi/licenziati"
		if (frmOpt.vChkAssunti)
		{
			strSQL = strSQL.concat(' AND L.Assunzione BETWEEN ? AND ? ');
			sqlArr.push(dal);
			sqlArr.push(al);
		}
		if (frmOpt.vChkDimessi) 
		{
			strSQL = strSQL.concat(' AND L.Cessazione BETWEEN ? AND ? ');
			sqlArr.push(dal);
			sqlArr.push(al);
		}
		if (frmOpt.vChkCtrScadenza) {
			strSQL = strSQL.concat(' AND L.Scadenzacontratto BETWEEN ? AND ? ');
			sqlArr.push(dal);
			sqlArr.push(al);
		}
        
        // Filtro su decorrenze eventuale
        if(frmOpt.vChkDecorrenzeAl)
        {
//			var arrDec = [];
//	        if(frmOpt.vChkRegola)
//	        	arrDec = [globals.TipoDecorrenza.REGOLA];
//	        else if(frmOpt.vChkBadge)
//	        	arrDec = [globals.TipoDecorrenza.BADGE,globals.TipoDecorrenza.BADGE_SOSTITUTIVO,globals.TipoDecorrenza.BADGE_OCCASIONALE];
//	        else
//	        	arrDec = [globals.TipoDecorrenza.BADGE,globals.TipoDecorrenza.BADGE_SOSTITUTIVO,globals.TipoDecorrenza.BADGE_OCCASIONALE,globals.TipoDecorrenza.REGOLA,globals.TipoDecorrenza.PERC_BANCA_ORE,globals.TipoDecorrenza.PERC_RIMPIAZZO];
	
	        strSQL = strSQL + " AND (LavDec.idDCG_Campi IN (" +	frmOpt.vArrDecorrenze.map(function(val){return val}).join(',')	+ "))";            
        }
        
        // applica filtri su dipendenti in ingresso
		if(!globals.ma_utl_hasKey(globals.Key.AUT_GESTORE))
		{
			var arrLavFiltratiInclusi = globals.getLavoratoriFiltri(false);
			var arrLavFiltratiEsclusi = globals.getLavoratoriFiltri(true);
			
			if(arrLavFiltratiInclusi && arrLavFiltratiInclusi.length)
				strSQL = strSQL.concat(' AND L.idLavoratore IN (' + arrLavFiltratiInclusi.join(',') + ')');
			
			if(arrLavFiltratiEsclusi && arrLavFiltratiEsclusi.length)
				strSQL = strSQL.concat(' AND L.idLavoratore NOT IN (' + arrLavFiltratiEsclusi.join(',') + ')');
		}
        
        strSQL = strSQL + " ORDER BY ISNULL(LPE.Nominativo, P.Nominativo)"
         
		var ds = databaseManager.getDataSetByQuery(globals.Server.MA_ANAGRAFICHE,strSQL,sqlArr,-1);
				
		// LOG per fine recupero dati e creazione file di esportazione
//		operation.op_message = 'Creazione file excel in corso...';
//		operation.op_end = new Date();
//		operation.op_status = globals.OpStatus.ONGOING;
//		operation.op_progress = 20;
		
		var bytes = globals.xls_export(ds,fileName,localFile,false,true,null,'Elenco anagrafiche',template,colNames,colTypes);

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
		application.output(ex, LOGGINGLEVEL.ERROR);
		
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
		
		var retObj = {status : operation};
		forms.mao_history.checkStatusCallback(retObj);
		forms.mao_history.operationDone(retObj);
	}
}

/**
 * @AllowToRunInFind
 * 
 * Popola e genera il file pdf di report con i dati richiesti
 * 
 * @param {Number} dittaID
 * @param {Date} dateTo
 * @param {JSRecord<db:/ma_log/operationlog>} operation
 *
 * @properties={typeid:24,uuid:"C186DECF-E0B6-435C-95E8-343F9D046B95"}
 * @SuppressWarnings(wrongparameters)
 */
function createReport(dittaID, dateTo, operation)
{
	try
	{
		/**
		 * Make sure some date is set
		 */
		var vDateTo = globals.TODAY;
		
		// verifica tipologia ditta
		var isInterinale = globals.isInterinale(idditta);
		
		// form opzioni anagrafica
		var frmAnag = forms.stampa_filtri_anagrafici;
		
		// verifica tipologia raggruppamento
		var isClassificazioneManuale = globals.isClassificazioneManuale(idditta,frmAnag.vRaggruppamentoCodice);
		
		// LOG per inizio recupero dati
//		operation.op_message = 'Inizio estrazione dati';
//		operation.op_end = new Date();
//		operation.op_status = globals.OpStatus.ONGOING;
//		operation.op_progress = 10;
		
		var fileName = ['Elenco_Anagrafiche', 'Periodo', utils.dateFormat(vDateTo, globals.PERIODO_DATEFORMAT)].join('_');
		
		// parametro relativo ad impostazione titolo del report
		var pTitolo = '';
				
		// form opzioni di stampa
		var frmOpt = forms.stampa_anagrafica_dipendenti_opzioni;
		var dal,al = null;
		if(frmOpt.vChkInForzaAl)
		{
			pTitolo += ' In forza al ' + globals.dateFormat(frmOpt.vInForzaAlGiorno,globals.EU_DATEFORMAT);
			
			if(frmOpt.vChkInForzaAlGiorno)
			{
				dal = frmOpt.vInForzaAlGiorno;
				al = frmOpt.vInForzaAlGiorno;
			}
			else
			{
			 	dal = new Date(frmOpt.vInForzaAlMese.getFullYear(),frmOpt.vInForzaAlMese.getMonth(),1);
			 	al = new Date(frmOpt.vInForzaAlMese.getFullYear()
			 		          ,frmOpt.vInForzaAlMese.getMonth()
							  ,globals.getTotGiorniMese(frmOpt.vInForzaAlMese.getMonth() + 1,frmOpt.vInForzaAlMese.getFullYear()));
			}
				
		}
		else if(frmOpt.vChkAssunti || frmOpt.vChkDimessi || frmOpt.vChkCtrScadenza)
		{
			if(frmOpt.vChkAssunti)
				pTitolo += 'Assunti ';
			if(frmOpt.vChkDimessi)
				pTitolo += 'Dimessi ';
			if(frmOpt.vChkCtrScadenza)
				pTitolo += 'In scadenza ';
			
			pTitolo = 'dal ' + globals.dateFormat(frmOpt.vDalGiorno,globals.EU_DATEFORMAT) + 
					  ' al ' + globals.dateFormat(frmOpt.vAlGiorno,globals.EU_DATEFORMAT);
			
			dal = frmOpt.vDalGiorno;
			al = frmOpt.vAlGiorno;
		}
		else if(frmOpt.vChkDecorrenzeAl)
		{ 
			dal = frmOpt.vDecorrenzeAl;
			al = frmOpt.vDecorrenzeAl;
		}
		else
		{
			dal = globals.TODAY;
			al = globals.TODAY;
		}
		
		// array di parametri
		var sqlArr = [];
		
		// array con nomi delle colonne
		var colNames = ['codditta','ragionesociale','cod_sedelavoro','sedelavoro','coddipendente','nominativo','qualifica','livello',
		                'dataassunzione','datacessazione','scadenzacontratto','datanascita'];
		var colTypes = [JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,JSColumn.TEXT,
		                JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.DATETIME,JSColumn.DATETIME];
		
		// query originale Epi2
		var strSQL = "SELECT "
        strSQL = strSQL + " D.Codice as CodDitta, D.RagioneSociale, DS.Codice AS Cod_SedeLavoro, DS.Descrizione AS SedeLavoro"
        strSQL = strSQL + " , L.CodDipendente, ISNULL(LPE.Nominativo, P.Nominativo) AS Nominativo"
        strSQL = strSQL + " , TQ.Descrizione AS Qualifica"
        strSQL = strSQL + " , LJ.CodLivello AS Livello, L.Assunzione AS DataAssunzione, L.Cessazione AS DataCessazione"
        strSQL = strSQL + " , L.ScadenzaContratto AS ScadenzaContratto"
        strSQL = strSQL + " , ISNULL(LPE.Nascita_Data, P.Nascita_Data) AS DataNascita"
             
        if(frmAnag.vFilterRaggruppamento)
        {
        	strSQL = strSQL + " , CL.Codice AS raggr_codice, CL.Descrizione as raggr_descrizione, CL.CodDettaglio as raggr_coddettaglio, CL.DescDettaglio as raggr_descdettaglio";
        	colNames.push('codice');
        	colTypes.push(JSColumn.TEXT);
        	colNames.push('descrizione');
        	colTypes.push(JSColumn.TEXT);
        	colNames.push('coddettaglio');
        	colTypes.push(JSColumn.TEXT);
        	colNames.push('descdettaglio');
        	colTypes.push(JSColumn.TEXT);
        }
                
        strSQL = strSQL + " FROM V_Lavoratori L"
		strSQL = strSQL + " LEFT OUTER JOIN Persone P ON L.CodiceFiscale = P.CodiceFiscale"
        strSQL = strSQL + " LEFT OUTER JOIN Lavoratori_JOB LJ ON L.idLavoratore = LJ.idLavoratore"
        strSQL = strSQL + " LEFT OUTER JOIN E2TabQualifiche TQ ON TQ.RadiceQualifica = L.CodQualifica"
        strSQL = strSQL + " LEFT OUTER JOIN Ditte D ON L.idDitta = D.idDitta"
        strSQL = strSQL + " LEFT OUTER JOIN Lavoratori_PersoneEsterne LPE ON L.idLavoratore = LPE.idLavoratore"
               
        if(frmAnag.vFilterRaggruppamento)
        {
        	strSQL = strSQL + " INNER JOIN \
			 (\
				SELECT \
			   LC.idLavoratoreClassificazione \
			   , LC.idLavoratore \
			   , LC.idDitta \
			   , DC.Codice \
			   , DC.Descrizione \
			   , DC.DescrizioneSostitutiva \
			   , DCD.Codice AS CodDettaglio \
			   , DCD.Descrizione AS DescDettaglio \
			   , DCD.idDittaClassificazioneDettaglio \
			FROM \
				Lavoratori_Classificazioni LC ";

			if(isInterinale && !isClassificazioneManuale)
			strSQL += " LEFT OUTER JOIN Ditte_Legami DL ON LC.idDitta = DL.idDitta "; 
			
			strSQL += " INNER JOIN Ditte_ClassificazioniDettaglio DCD ON DCD.Codice = LC.CodClassificazione \
			   INNER JOIN Ditte_Classificazioni DC ON DCD.idDittaClassificazione = DC.idDittaClassificazione " 
			
			isInterinale && !isClassificazioneManuale ? strSQL += " AND DC.idDitta = DL.idDittaRiferimento " : strSQL += " AND DC.idDitta = LC.idDitta"; 
						
			strSQL += " WHERE LC.idDitta = " + idditta + " \
			   AND LC.CodTipoClassificazione = " + frmAnag.vRaggruppamentoCodice + " AND LC.CodClassificazione IN (" + frmAnag.vRaggruppamentiDettaglio.join(',') + ") \
				AND DC.Codice = " + frmAnag.vRaggruppamentoCodice + " \
				AND DCD.Codice IN (" + frmAnag.vRaggruppamentiDettaglio.join(',') + ") \
				) AS CL ON CL.idLavoratore = L.idLavoratore ";
      	
        }
        strSQL = strSQL + " LEFT OUTER JOIN Ditte_Sedi DS ON L.idDittaSede = DS.idDittaSede"
		strSQL = strSQL + " WHERE D.idDitta = ?"
		
		sqlArr.push(idditta);
		
		if(frmAnag.vFilterContratto)
			strSQL = strSQL + " AND L.RadiceContratto IN (" + frmAnag.vContratto.join(',') + ")";
		
		if(frmAnag.vFilterQualifica)
			strSQL = strSQL + " AND L.CodQualifica IN (" + frmAnag.vQualifica.join(',') + ")";
		
		if(frmAnag.vFilterPosizioneInps)
			strSQL = strSQL + " AND L.PosizioneInps IN (" + frmAnag.vPosizioniInps.join(',') + ")";
		
		if(frmAnag.vFilterSedeLavoro)
			strSQL = strSQL + " AND DS.idDittaSede IN (" + frmAnag.vSediLavoro.join(',') + ")";
                
        // gestione opzioni di "in forza al"
		if (frmOpt.vChkInForzaAl) 
		{
			strSQL = strSQL.concat(' AND ((L.Cessazione >= ? OR L.Cessazione IS NULL) AND L.Assunzione <= ?) ');
			
			if (frmOpt.vChkInForzaAlGiorno) 
			{
				sqlArr.push(dal);
			    sqlArr.push(al);
			}
			else
			{
				var periodo = frmOpt.vInForzaAlMese.getFullYear() * 100 + frmOpt.vInForzaAlMese.getMonth() + 1;
				/** @type {Date} */
				var ultimoGGMese = globals.getLastDatePeriodo(periodo);
				sqlArr.push(dal);
				sqlArr.push(ultimoGGMese);
			}
		}
		
		// gestione opzioni di "assunti/dimessi/licenziati"
		if (frmOpt.vChkAssunti)
		{
			strSQL = strSQL.concat(' AND L.Assunzione BETWEEN ? AND ? ');
			sqlArr.push(dal);
			sqlArr.push(al);
		}
		if (frmOpt.vChkDimessi) 
		{
			strSQL = strSQL.concat(' AND L.Cessazione BETWEEN ? AND ? ');
			sqlArr.push(dal);
			sqlArr.push(al);
		}
		if (frmOpt.vChkCtrScadenza) {
			strSQL = strSQL.concat(' AND L.Scadenzacontratto BETWEEN ? AND ? ');
			sqlArr.push(dal);
			sqlArr.push(al);
		}
        
		// applica filtri su dipendenti in ingresso
		if(!globals.ma_utl_hasKey(globals.Key.AUT_GESTORE))
		{
			var arrLavFiltratiInclusi = globals.getLavoratoriFiltri(false);
			var arrLavFiltratiEsclusi = globals.getLavoratoriFiltri(true);
			
			if(arrLavFiltratiInclusi && arrLavFiltratiInclusi.length)
				strSQL = strSQL.concat(' AND L.idLavoratore IN (' + arrLavFiltratiInclusi.join(',') + ')');
			
			if(arrLavFiltratiEsclusi && arrLavFiltratiEsclusi.length)
				strSQL = strSQL.concat(' AND L.idLavoratore NOT IN (' + arrLavFiltratiEsclusi.join(',') + ')');
		}
			
        strSQL = strSQL + " ORDER BY "
		
        if(frmAnag.vFilterRaggruppamento)
        	strSQL = strSQL + " raggr_coddettaglio, ";
        
        strSQL = strSQL + " ISNULL(LPE.Nominativo, P.Nominativo)"
         
		var ds = databaseManager.getDataSetByQuery(globals.Server.MA_ANAGRAFICHE,strSQL,sqlArr,-1);
				
		// creazione foundset corrispondente
		var fs = databaseManager.getFoundSet(ds.createDataSource('dS_ElencoAnagrafiche_' + application.getUUID(),colTypes));
		fs.loadAllRecords();
		
		var reportParams = new Object();
		reportParams.ptitolo = pTitolo;
		
		globals.createReportWithFoundset(fs,reportParams,'Elenco_Anagrafiche_Periodo.jasper',fileName + '.pdf',operation)
		
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
	}
	finally
	{
		/**
		 * Remove all created files and commit the transaction
		 */
		plugins.file.deleteFolder(globals.SERVER_TMPDIR.replace(/\\/g,'/') + '/export/', false);
		databaseManager.commitTransaction();
		
		var retObj = {status : operation};
		forms.mao_history.checkStatusCallback(retObj);
		forms.mao_history.operationDone(retObj);
	}
}
/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"91799F02-E26D-49F6-9F6E-34CAAE01EDE9"}
 */
function onDataChangeChkFormat(oldValue, newValue, event) 
{
	var frmOpt = forms.stampa_anagrafica_dipendenti_opzioni;
	var elems = frmOpt.elements;
	
	elems.chkDecorrenzeAl.enabled =
		elems.lbl_decorrenzeAl.enabled =
			elems.lbl_decorrenza.enabled =
				elems.fld_decorrenzeAlGiorno.enabled =
					elems.chkFiltraDec.enabled =
						elems.lblFiltraDec.enabled = 
							elems.btn_filtra_decorrenza.enabled = 
								elems.btn_decorrenzeAl.enabled = 
									newValue;
	
	if(newValue)
	{
		frmOpt.vChkDecorrenzeAl = 
			frmOpt.vChkFiltraDec = 0;
		frmOpt.vDecorrenzeAl = null;		
	}
	
	return true;
}
