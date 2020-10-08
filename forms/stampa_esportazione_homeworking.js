/**
 * Lancia l'operazione lunga di creazione dell'esportazione desiderata
 * 
 * @param event
 *
 * @properties={typeid:24,uuid:"76ED7A20-6372-4083-83CC-B609D00FCE7F"}
 */
function stampaEsportazioneTimbrature(event)
{
	var params = {
        processFunction: process_export_excel,
        message: '', 
        opacity: 0.2,
        paneColor: '#434343',
        textColor: '#EC1C24',
        showCancelButton: false,
        cancelButtonText: '',
        dialogName : '',
        fontType: 'Arial,4,25',
        processArgs: [event]
    };
	
	plugins.busy.block(params);
}

/**
 * @properties={typeid:24,uuid:"E7890133-2164-47D9-BC47-C63B53DF3DE3"}
 */
function validaOpzioni()
{
   var frmOpt = forms.stampa_esportazione_homeworking_opzioni;	

   if(!frmOpt.vDallaData)
   {
	   globals.ma_utl_showErrorDialog("Inserire una data di inizio per l\'esportazione");
       return false;
   }
   if(!frmOpt.vAllaData)
   {
	   globals.ma_utl_showErrorDialog("Inserire una data di fine per l\'esportazione");
       return false;
   }
   
   return true;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"EA209CAD-1C24-4A52-AFD0-518D95D5DE9D"}
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
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"FA4B6B80-466F-46D7-AA89-2F7D354EDB7C"}
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
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"25165F74-584C-4CF5-A636-7024406295A5"}
 */
function exportReport(event)
{
	
}

/**
 * Lancia l'operazione lunga di esportazione delle timbrautre in excel
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B866A2C4-28E2-429F-87DD-3BB91D885F20"}
 */
function exportExcel(event)
{
	try
	{
		globals.svy_mod_closeForm(event);
			
		var vDate = new Date();
		var values = 
		{
			op_hash		: utils.stringMD5HashBase64(idditta + vDate.toString()),
			op_ditta	: idditta,
			op_message	: 'Esportazione in corso...',
			op_periodo 	: utils.dateFormat(vDate, globals.PERIODO_DATEFORMAT)
		};
		
		// set parametri operazione
		var frmOpt = forms.stampa_esportazione_homeworking_opzioni;
//		var frmAnag = forms.stampa_filtri_anagrafici;
		
		globals.startAsyncOperation
		(
			 createExcelFile,
			 [
			  idditta
			  ,frmOpt.vDallaData
			  ,frmOpt.vAllaData
//			  ,frmOpt.vChkDatiContrattuali
//			  ,frmOpt.vChkDatiRaggruppamenti && frmAnag.vFilterSedeLavoro
//			  ,frmOpt.vChkDatiRaggruppamenti && frmAnag.vFilterRaggruppamento && frmAnag.vRaggruppamentoCodice == 1
//			  ,frmOpt.vChkDatiRaggruppamenti && frmAnag.vFilterRaggruppamento && frmAnag.vRaggruppamentoCodice == 2
//			  ,frmOpt.vChkDatiRaggruppamenti && frmAnag.vFilterRaggruppamento && frmAnag.vRaggruppamentoCodice == 3
			  ],
			 null,
			 null,
			 globals.OpType.SSH, // stampa esportazione statistica homeworking
			 values
		);		
	}
	catch(ex)
	{
		application.output(ex,LOGGINGLEVEL.ERROR);
	}
}

/**
 * Popola e genera il file excel con i dati richiesti
 * 
 * @param {Number} idDitta
 * @param {Date} dateFrom
 * @param {Date} dateTo
 * @param {JSRecord<db:/ma_log/operationlog>} operation
 * @param {Boolean} [datiContrattuali]
 * @param {Boolean} [raggrSede]
 * @param {Boolean} [raggrCdc]
 * @param {Boolean} [raggrRagg1]
 * @param {Boolean} [raggrRagg2]
 * 
 * @properties={typeid:24,uuid:"4217B74E-954A-48B2-85E6-E78217FA7931"}
 */
function createExcelFile(idDitta,dateFrom,dateTo,operation,datiContrattuali,raggrSede,raggrCdc,raggrRagg1,raggrRagg2)
{
	try
	{
		// LOG per inizio recupero dati
		operation.op_message = 'Inizio estrazione dati';
		operation.op_end = new Date();
		operation.op_status = globals.OpStatus.ONGOING;
		operation.op_progress = 10;
		
		var fileName = ['Esportazione_Statistica_Homeworking'
		                , 'Dal', utils.dateFormat(dateFrom, globals.PERIODO_DATEFORMAT)
						, 'Al', utils.dateFormat(dateTo,globals.PERIODO_DATEFORMAT)].join('_');
		var localFile = true;
		/** @type {Array<byte>} */
		var template = plugins.file.readFile('C:/Report/EW_EsportazioneStatisticaHomeworking.xls');
		
		// array di parametri
		/**@type Array */
		var sqlArgs =  
			[idDitta
             ,utils.dateFormat(dateFrom,globals.ISO_DATEFORMAT)
			 ,utils.dateFormat(dateTo,globals.ISO_DATEFORMAT)
//			 ,datiContrattuali ? 1 : 0
//			 ,raggrSede ? 1 : 0
//			 ,raggrCdc ? 1: 0
//			 ,raggrRagg1 ? 1 : 0
//			 ,raggrRagg2 ? 1 : 0
			 ];
		
		// array con nomi delle colonne
		var colNames = [];
		// array con nomi dei tipi di colonna
		var colTypes = [];
		
		// query
		var sql = "{call S_Report_StatisticaOre_Homeworking(?,?,?)}";
		
		/** @type {Array<Number>} */
		var typesArr = [0,0,0];
		var ds = plugins.rawSQL.executeStoredProcedure(
			                               globals.Server.MA_PRESENZE
			                               ,sql
			                               ,sqlArgs
										   ,typesArr
										   ,-1)
		
	    databaseManager.startTransaction();
										   
        if(ds == null || ds.getMaxRowIndex() == 0)
        {
        	operation.op_message = "Nessun evento di homeworking per il periodo selezionato";
    		operation.op_end = new Date();
    		operation.op_status = globals.OpStatus.SUCCESS;
    		operation.op_progress = 100;
        }
        else
        {
			// array con nomi delle colonne
			colNames = ds.getColumnNames();
			// array con nomi dei tipi di colonna
			colTypes = [];
			for(var c = 0; c < colNames.length; c++)
				colTypes.push(ds.getColumnType(c));
			
			var bytes = globals.xls_export(ds,fileName,localFile,false,true,null,'Esportazione statistica homeworking',template,colNames,colTypes);
	
			ds.removeRow(-1);
			
			if(!bytes || bytes.length == 0)
				return false;
					
			if(!globals.saveFile(operation, bytes, fileName + '.csv', globals.MimeTypes.CSV))
				throw 'Errore durante il salvataggio del file';
			
			operation.op_message = 'Esportazione completata con successo';
			operation.op_end = new Date();
			operation.op_status = globals.OpStatus.SUCCESS;
			operation.op_progress = 100;
        }
		
		return true;
	}
	catch (ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
		
		if(operation)
		{
			operation.op_end = new Date();
			operation.op_status = globals.OpStatus.ERROR;
			operation.op_progress = 0;
			operation.op_message = ex.message || 'Errore durante l\'esportazione dei dati' + (ex && (': ' + ex));
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
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 *
 * @properties={typeid:24,uuid:"99450441-04D5-4D58-8F2C-E0FF20C6C56C"}
 */
function onShow(firstShow, event) 
{	
	if(controller.readOnly)
		gotoBrowse();
	
	init(firstShow);
	
	plugins.busy.prepare();
}

/**
 * @return {Array}
 * 
 * @properties={typeid:24,uuid:"3FF51A5D-5802-4AEA-937D-7D192064665B"}
 */
function selectLavoratori()
{
	/** @type {Array} */
	var iddipendenti = globals.ma_utl_showLkpWindow
						(
							{
								  lookup: 'AG_Lkp_Lavoratori'// TODO foundset.tipologia === globals.Tipologia.ESTERNA ? 'AG_Lkp_LavoratoriEsterni' : 'AG_Lkp_Lavoratori'  
								, returnForm: controller.getName()
								, methodToAddFoundsetFilter: 'filterLavoratoriEsportazione'
								, multiSelect: true								
							}
						);
						
	return iddipendenti;
}

/**
 * @param {JSFoundSet} fs
 *
 * @properties={typeid:24,uuid:"D80A952A-DC70-4DF6-BFA2-C86DC5EB7BA2"}
 */
function filterLavoratoriEsportazione(fs)
{
	var fsLavoratori = getLavoratori(forms.stampa_esportazione_timbrature_opzioni.vDallaData
		                             ,forms.stampa_esportazione_timbrature_opzioni.vAllaData);
	if(fsLavoratori)
		fs.addFoundSetFilterParam('idlavoratore','=',globals.foundsetToArray(fsLavoratori,'idlavoratore'));
	
	return fs;
}
