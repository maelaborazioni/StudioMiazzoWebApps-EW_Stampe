/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7A141205-27C5-47E3-9872-88071B1451AB",variableType:4}
 */
var vFormat = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"194D8040-DE9C-47F3-A8AC-9970D55B223E",variableType:4}
 */
var vTipoStampa = 0;

/**
 * @properties={typeid:35,uuid:"D36B14CC-E4E8-4AB2-9EF4-B032ACBD2189",variableType:-4}
 */
var vAmmReportTypes = {
	AUTORIZZAZIONI_GENERALI : 'Report_Auth.jasper',
	MODULI_PER_ORGANIZZAZIONE : 'Report_Auth_ModuliOrganizzazione.jasper',
	CHIAVI_PER_CLIENTE : 'Report_Auth_ChiaveCliente.jasper',
	INFORMAZIONI_UTENTI : 'Report_Info_Utenti.jasper'
}

/**
 * @properties={typeid:35,uuid:"16E78E63-C8E0-4DC4-B2DF-2A87A5206A9F",variableType:-4}
 */
var vAmmExcelFiles = {
	AUTORIZZAZIONI_GENERALI : 'C:\\Report\\Report_Auth.xls',
	MODULI_PER_ORGANIZZAZIONE : 'C:\\Report\\Report_Auth_ModuliOrganizzazione.xls',
	CHIAVI_PER_CLIENTE : 'C:\\Report\\Report_Auth_ChiaveCliente.xls',
	INFORMAZIONI_UTENTI : 'C:\\Report\\Report_Info_Utenti.jasper'
}

/**
 * @properties={typeid:35,uuid:"DB8FC92B-16CD-49B1-BC47-22651F31F8F6",variableType:-4}
 */
var vAmmReportNames = {
	AUTORIZZAZIONI_GENERALI : 'Autorizzazioni_Generali',
	MODULI_PER_ORGANIZZAZIONE : 'Moduli_Per_Organizzazione',
	CHIAVI_PER_CLIENTE : 'Chiavi_Per_Cliente',
	INFORMAZIONI_UTENTI : 'Informazioni_Utenti'
}

/**
 * @properties={typeid:35,uuid:"C74A759E-DDB2-4DCA-BE25-52BDCF32D3D4",variableType:-4}
 */
var vAmmReportSql = {
	AUTORIZZAZIONI_GENERALI : 'SELECT ssk.name AS key, ssk.description as key_description, su.user_name \
	                           , sg.name AS group, so.name AS organization, sow.name AS owner, sur.is_denied \
                              FROM sec_security_key ssk, sec_user_right sur, sec_user_in_group sug, sec_group sg \
	                          , sec_user_org suo, sec_user su, sec_organization so, sec_owner sow \
                              WHERE	ssk.security_key_id = sur.security_key_id AND sur.group_id = sug.group_id \
	                          AND sug.group_id = sg.group_id \
	                          AND suo.user_org_id = sug.user_org_id \
	                          AND suo.user_id = su.user_id \
	                          AND suo.organization_id = so.organization_id \
	                          AND sow.owner_id = so.owner_id \
	                          AND (ssk.module_id IS NULL OR ssk.module_id IN \
	                          (SELECT som.module_id	FROM sec_owner_in_module som \
			                   WHERE (som.start_date IS NULL OR som.start_date <= now()) \
				               AND (som.end_date IS NULL OR som.end_date >= now())) \
                               )\
                               ORDER BY \
                               sow.name \
                               , so.name \
                               , sg.name \
                               , su.user_name \
	                           , ssk.name',
	MODULI_PER_ORGANIZZAZIONE : 'SELECT so.name,sm.name as module_name,sm.description as module_desc \
                                 FROM sec_owner so \
                                 INNER JOIN sec_owner_in_module soim ON so.owner_id = soim.owner_id \
                                 INNER JOIN sec_module sm ON soim.module_id = sm.module_id \
                                 ORDER BY so.name, module_name',
	CHIAVI_PER_CLIENTE : 'SELECT ssk.name AS key,ssk.description as key_description, su.user_name \
	                      , sg.name AS group, so.name AS organization, sow.name AS owner \
	                      , sur.is_denied \
                          FROM sec_security_key ssk , sec_user_right sur, sec_user_in_group sug \
	                      , sec_group sg, sec_user_org suo, sec_user su, sec_organization so, sec_owner sow \
                          WHERE \
                            ssk.security_key_id = sur.security_key_id \
	                      AND sur.group_id = sug.group_id \
	                      AND sug.group_id = sg.group_id \
	                      AND suo.user_org_id = sug.user_org_id \
	                      AND suo.user_id = su.user_id \
	                      AND suo.organization_id = so.organization_id \
	                      AND sow.owner_id = so.owner_id \
	                      AND(ssk.module_id IS NULL OR ssk.module_id IN \
		                     (SELECT som.module_id FROM \
				                     sec_owner_in_module som \
			                  WHERE	(som.start_date IS NULL OR som.start_date <= now()) \
				              AND (som.end_date IS NULL OR som.end_date >= now()) \
		                      )\
	                          )\
                         ORDER BY owner  \
                                  , so.name \
                                  , sg.name \
                                  , su.user_name \
                                  , key',
	INFORMAZIONI_UTENTI : ''
}

/**
 * @properties={typeid:35,uuid:"1FA7481E-BB51-4F02-B237-5F2E36924EB3",variableType:-4}
 */
var vAmmColumnsSql = {
	AUTORIZZAZIONI_GENERALI : [],
	MODULI_PER_ORGANIZZAZIONE : ['name','module_name','module_desc'],
	CHIAVI_PER_CLIENTE : [],
	INFORMAZIONI_UTENTI : []
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CB648071-A493-469B-97A1-6FBF92301BB1"}
 */
function onShow(firstShow, event) 
{	
	vFormat = globals.FileFormats.PDF;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6B7341DC-FE48-4D96-B33E-F2A4A9FB600B"}
 * @AllowToRunInFind
 */
function stampaAmministrazione(event) {

	if (validaOpzioni())
	{		
		var choice = vFormat;
		globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
		switch (choice) 
		{
			case globals.FileFormats.PDF:
				exportReport(event);
				break;
			case globals.FileFormats.EXCEL:
				exportExcel(event);
				break;

			default:
				globals.ma_utl_showWarningDialog('Selezionare il formato di esportazione', 'i18n:hr.msg.attention');
		}		
	} 
	else
	{
		globals.ma_utl_showWarningDialog('Controllare i valori inseriti', 'Stampa amministrazione');
	}
}

/**
 * @properties={typeid:24,uuid:"206E1E5C-12F1-4030-8DF5-F7A78B5A4C6D"}
 */
function validaOpzioni()
{
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @private
 *
 * @properties={typeid:24,uuid:"3DD039FD-B096-40A4-9BCA-CC442488AF8F"}
 * @AllowToRunInFind
 */
function exportReport(event) 
{
	var reportName;
	var reportType;
	var opType;
	var idditta = 230; //definire valore di default per amministrazione
	var vAnno = globals.TODAY.getFullYear();
	var vMese = globals.TODAY.getMonth() + 1;
	var parameters;
	
	switch(vTipoStampa)
	{
		case 0:
			reportName = vAmmReportNames.AUTORIZZAZIONI_GENERALI;
			reportType = vAmmReportTypes.AUTORIZZAZIONI_GENERALI;
			opType = globals.OpType.AmmAG;
			break;
		case 1:
		    reportName = vAmmReportNames.MODULI_PER_ORGANIZZAZIONE;
		    reportType = vAmmReportTypes.MODULI_PER_ORGANIZZAZIONE;
		    opType = globals.OpType.AmmMO;
		    break;
		case 2:
		    reportName = vAmmReportNames.CHIAVI_PER_CLIENTE;
		    reportType = vAmmReportTypes.CHIAVI_PER_CLIENTE;
		    opType = globals.OpType.AmmCC;
		    var keys = globals.ma_utl_showLkpWindow({ returnForm : controller.getName(),
		    	                                      lookup : 'SEC_Lkp_Keys',
													  allowInBrowse : true,
													  multiSelect : true
		                                            });
		    parameters = {parrchiavi : keys};
		    break;
		case 3:
		    reportName = vAmmReportNames.INFORMAZIONI_UTENTI;
		    reportType = vAmmReportTypes.INFORMAZIONI_UTENTI;
		    opType = globals.OpType.AmmIU;
		    break;
		default:
			break;
	}
	
	try
	{
			/**
			 * Save additional operation's information
			 */
			var vDateTo = new Date();
			var values = 
			{
				op_hash		: utils.stringMD5HashBase64(idditta.toString() + vDateTo),
				op_ditta	: idditta,
				op_message	: globals.getNumMese(vMese) + '/' + vAnno,
				op_periodo 	: vAnno * 100 + vMese
			};
			
			globals.startAsyncOperation
			(
				 globals.createReport
				,[
					 globals.getSwitchedServer(globals.Server.SVY_FRAMEWORK)
					,parameters
					,reportType
					,[[reportName, vAnno, globals.getNumMese(vMese)].join('_'),'pdf'].join('.')
				 ]
				, null
				, null
				, opType
				, values
			);
		
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
	}
	finally
	{
		// Close this form					
		globals.svy_mod_closeForm(event);
	}
}

/**
 * Lancia l'operazione lunga per la generazione del file in formato excel
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E4206E94-65BE-40F4-A50C-32F615188D7A"}
 */
function exportExcel(event) 
{
	var opType;
	var idditta = 230; //definire valore di default per amministrazione
	var vAnno = globals.TODAY.getFullYear();
	var vMese = globals.TODAY.getMonth() + 1;
	
	switch(vTipoStampa)
	{
		case 0:
			opType = globals.OpType.AmmAG;
			break;
		case 1:
		    opType = globals.OpType.AmmMO;
		    break;
		case 2:
		    opType = globals.OpType.AmmCC;
		    break;
		case 3:
		    opType = globals.OpType.AmmIU;
		    break;
		default:
			break;
	}
	
	try
	{
		globals.svy_mod_closeForm(event);
		
		var vDateTo = new Date();
		var values = 
		{
			op_hash		: utils.stringMD5HashBase64(idditta.toString() + vDateTo),
			op_ditta	: idditta,
			op_message	: globals.getNumMese(vMese) + '/' + vAnno,
			op_periodo 	: vAnno * 100 + vMese
		};
				
		globals.startAsyncOperation
		(
			 createExcelFile,
			 [idditta, new Date()],
			 null,
			 500,
			 opType,
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
 * @properties={typeid:24,uuid:"B49CCBFE-B71B-48AD-9DFF-02DAAFDA3D75"}
 */
function createExcelFile(dittaID, dateTo, operation)
{
	var reportFile;
	var reportName;
	var reportSql;
	var reportColNames;
	
	var opType = operation.operationlog_to_operationtype.codice;
	switch(opType)
	{
		case globals.OpType.AmmAG:
			reportName = vAmmReportNames.AUTORIZZAZIONI_GENERALI;
			reportFile = vAmmExcelFiles.AUTORIZZAZIONI_GENERALI;
			reportSql = vAmmReportSql.AUTORIZZAZIONI_GENERALI;
			reportColNames = vAmmColumnsSql.AUTORIZZAZIONI_GENERALI;
			break;
		case globals.OpType.AmmMO:
		    reportName = vAmmReportNames.MODULI_PER_ORGANIZZAZIONE;
		    reportFile = vAmmExcelFiles.MODULI_PER_ORGANIZZAZIONE;
		    reportSql = vAmmReportSql.MODULI_PER_ORGANIZZAZIONE;
		    reportColNames = vAmmColumnsSql.MODULI_PER_ORGANIZZAZIONE;
		    break;
		case globals.OpType.AmmCC:
		    reportName = vAmmReportNames.CHIAVI_PER_CLIENTE;
		    reportFile = vAmmExcelFiles.CHIAVI_PER_CLIENTE;
		    reportSql = vAmmReportSql.CHIAVI_PER_CLIENTE;
		    reportColNames = vAmmColumnsSql.CHIAVI_PER_CLIENTE;
			break;
		case globals.OpType.AmmIU:
		    reportName = vAmmReportNames.INFORMAZIONI_UTENTI;
		    reportFile = vAmmExcelFiles.INFORMAZIONI_UTENTI;
		    reportSql = vAmmReportSql.INFORMAZIONI_UTENTI;
		    reportColNames = vAmmColumnsSql.INFORMAZIONI_UTENTI;
		    break;
		default:
			break;
	}
	
	try
	{
		/**
		 * Make sure some date is set
		 */
		var vDateTo = globals.TODAY;
				
		// LOG per inizio recupero dati
		operation.op_message = 'Inizio estrazione dati';
		operation.op_end = new Date();
		operation.op_status = globals.OpStatus.ONGOING;
		operation.op_progress = 10;
		
		var fileName = [reportName, 'Periodo', utils.dateFormat(vDateTo, globals.PERIODO_DATEFORMAT)].join('_') + '.xls';
		/** @type {Array<byte>} */
		var output = [];
		var result = [];
		
		var template = plugins.file.readFile(reportFile);
		
		// query e variabili di partenza
		var sql = reportSql;      
        	
		var ds = databaseManager.getDataSetByQuery(globals.Server.SVY_FRAMEWORK,sql,null,-1);
		
		// LOG per fine recupero dati e creazione file di esportazione
		operation.op_message = 'Creazione file excel in corso...';
		operation.op_end = new Date();
		operation.op_status = globals.OpStatus.ONGOING;
		operation.op_progress = 20;
		
		result = globals.xls_export(ds,fileName,null,null,null,null,reportName,template,reportColNames);
		ds.removeRow(-1);
		
		output = (result.length > 0 && result) || output;
				
		if(!output)
			return false;
		
		databaseManager.startTransaction();
		
		if(!globals.saveFile(operation, output, fileName, globals.MimeTypes.EXCEL))
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
	}
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"146ADF36-1083-4430-A23E-2E91C5B2B8D6"}
 */
function annullaStampa(event) {
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}
