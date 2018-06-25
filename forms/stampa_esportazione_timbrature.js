/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"7B294BF4-9873-4701-B4E4-666BD8161A1A"}
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
	
//	if (forms.stampa_filtri_anagrafici.validaFiltriAnagrafici())
//	{
//		if(validaOpzioni())
//		{		
//			var choice = 1;
//			var params;
//			
//			switch (choice) 
//			{
//				case globals.FileFormats.PDF:
//					params = {
//						processFunction: process_export_report,
//						message: '',
//						opacity: 0.5,
//						paneColor: '#434343',
//						textColor: '#EC1C24',
//						showCancelButton: false,
//						cancelButtonText: '',
//						dialogName: 'This is the dialog',
//						fontType: 'Arial,4,25',
//						processArgs: [event]
//					};
//					plugins.busy.block(params);
//				    break;
//				case globals.FileFormats.EXCEL:
//					params = {
//						processFunction: process_export_excel,
//						message: '',
//						opacity: 0.5,
//						paneColor: '#434343',
//						textColor: '#EC1C24',
//						showCancelButton: false,
//						cancelButtonText: '',
//						dialogName: 'This is the dialog',
//						fontType: 'Arial,4,25',
//						processArgs: [event]
//					};
//				    plugins.busy.block(params);
//					break;
//	
//				default:
//					globals.ma_utl_showWarningDialog('Selezionare il formato di esportazione', 'i18n:hr.msg.attention');
//			}		
//		} 
//		else
//			globals.ma_utl_showWarningDialog('Controllare i valori inseriti', 'Stampa anagrafica dipendenti');
//			
//	}
}

/**
 * @properties={typeid:24,uuid:"0A57F4F0-6216-4661-A570-B4867C565CA7"}
 */
function validaOpzioni()
{
	// TODO
	return true;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"C4DB1ECE-6EB6-4F9F-9379-D2FA71925769"}
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
 * @properties={typeid:24,uuid:"14467248-286D-4281-ADCE-F186916E7D63"}
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
 * @properties={typeid:24,uuid:"7B22CE9E-A7FC-433C-943B-35C06DEE5F62"}
 */
function exportReport(event)
{
	
}

/**
 * Lancia l'operazione lunga di esportazione delle timbrautre in excel
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"98908259-3FAA-4C02-A1F6-34748A64337B"}
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
		
		// set parametri operazione
		var frmOpt = forms.stampa_esportazione_timbrature_opzioni;
		globals.startAsyncOperation
		(
			 createExcelFile,
			 [idditta,frmOpt.vDallaData,frmOpt.vAllaData,frmOpt.vChkCausalizzate,frmOpt.vIdLavoratore || -1,frmOpt.vChkDatiContrattuali],
			 null,
			 null,
			 globals.OpType.SET, // stampa esportazione timbrature
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
 * @param {Boolean} causalizzate
 * @param {Number} idLavoratore
 * @param {Boolean} datiContrattuali
 * 
 * @param {JSRecord<db:/ma_log/operationlog>} operation
 * 
 * @properties={typeid:24,uuid:"81C7AE54-8883-4BDC-B3B8-8C94952430A8"}
 */
function createExcelFile(idDitta,dateFrom,dateTo,causalizzate,idLavoratore,datiContrattuali,operation)
{
	try
	{
		// LOG per inizio recupero dati
		operation.op_message = 'Inizio estrazione dati';
		operation.op_end = new Date();
		operation.op_status = globals.OpStatus.ONGOING;
		operation.op_progress = 10;
		
		var fileName = ['Esportazione_Timbrature'
		                , 'Dal', utils.dateFormat(dateFrom, globals.PERIODO_DATEFORMAT)
						, 'Al', utils.dateFormat(dateTo,globals.PERIODO_DATEFORMAT)].join('_');
		var localFile = true;
		/** @type {Array<byte>} */
		var template = plugins.file.readFile('C:/Report/EW_EsportazioneTimbrature.xls');
		
		// array di parametri
		/**@type Array */
		var sqlArgs =  
			[idDitta
		              ,utils.dateFormat(dateFrom,globals.ISO_DATEFORMAT)
					  ,utils.dateFormat(dateTo,globals.ISO_DATEFORMAT)
					  ,causalizzate ? 1 : 0
					  ,idLavoratore
					  ,datiContrattuali ? 1 : 0];
		        
		// array con nomi delle colonne
		var colNames = [];
		// array con nomi dei tipi di colonna
		var colTypes = [];
		
		// query
		var sql = "{call S_Report_Timbrature(?,?,?,?,?,?)}";
		
		/** @type {Array<Number>} */
		var typesArr = [0,0,0,0,0,0];
		var ds = plugins.rawSQL.executeStoredProcedure(
			                               globals.Server.MA_PRESENZE
			                               ,sql
			                               ,sqlArgs
										   ,typesArr
										   ,-1)
		
	    databaseManager.startTransaction();
										   
        if(ds == null || ds.getMaxRowIndex() == 0)
        {
        	operation.op_message = "Nessuna timbratura per il periodo selezionato";
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
			
			var bytes = globals.xls_export(ds,fileName,localFile,false,true,null,'Esportazione timbrature',template,colNames,colTypes);
	
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
 * @properties={typeid:24,uuid:"C1762B6C-C88C-4BB2-A39A-94612BB81743"}
 */
function onShow(firstShow, event) 
{	
	plugins.busy.prepare();
	_super.onShowForm(firstShow, event);
}
