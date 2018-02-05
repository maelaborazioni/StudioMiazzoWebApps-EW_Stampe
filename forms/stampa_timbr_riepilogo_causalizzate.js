/**
 * Imposta i parametri per la generazione del report e lancia l'operazione asincrona
 * 
 * @properties={typeid:24,uuid:"6D212175-573C-49C7-BA99-08136009F05B"}
 */
function stampaReportCausalizzate(event)
{
	try
	{
		var frmOpt = forms.stampa_timbr_riepilogo_causalizzate_opzioni;
		
		var parameters;
		var reportName = 'TimbratureCausalizzateRiepilogo';
		var dallaData = frmOpt.vDal;
		var allaData = frmOpt.vAl;
		
		var arrCausali = frmOpt.vChkCausali ? frmOpt.vElencoCausali : globals.getCausaliTimbratureDitta(vIdDitta);
		
		parameters =
		   {
			   pidditta					:	vIdDitta,
			   pdalladata				:	dallaData,
			   palladata      			:	allaData,
		       pdalladataiso			:	globals.dateFormat(dallaData,globals.ISO_DATEFORMAT),
			   palladataiso     		:	globals.dateFormat(new Date(allaData.getFullYear(),allaData.getMonth(),allaData.getDate() + 1),globals.ISO_DATEFORMAT),
			   pelencocausali           :   arrCausali
		   }
		 
		/**
		 * Save additional operation's information
		 */
		var vDateTo = new Date();
		var values = 
		{
			op_hash		: utils.stringMD5HashBase64(vIdDitta.toString() + vDateTo),
			op_ditta	: vIdDitta,
			op_message	: globals.getNumMese(dallaData.getMonth() + 1) + '/' + dallaData.getFullYear(),
			op_periodo 	: dallaData.getFullYear() * 100 + dallaData.getMonth() + 1
		};
		
		globals.startAsyncOperation
		(
			 globals.createReport
			,[
				 globals.getSwitchedServer(globals.Server.MA_PRESENZE)
				,parameters
				,'TimbratureCausalizzateRiepilogo.jasper'
				,[[reportName, dallaData.getFullYear(), globals.getNumMese(dallaData.getMonth() + 1)].join('_'),'pdf'].join('.')
			 ]
			, null
			, null
			, globals.OpType.SRCau
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
 * @return Boolean
 * 
 * @properties={typeid:24,uuid:"C1F0861B-2068-4210-9E48-D65B9498CC26"}
 */
function validaOpzioni()
{
	var frmOpt = forms.stampa_timbr_riepilogo_causalizzate_opzioni;
	if(!frmOpt.vDal)
	{
		globals.ma_utl_showWarningDialog('Inserire una data di partenza per il report','Stampa report timbrature causalizzate');
		return false;
	}
	if(!frmOpt.vAl)
	{
		globals.ma_utl_showWarningDialog('Inserire una data di fine per il report','Stampa report timbrature causalizzate');
		return false;
	}
	if(frmOpt.vDal > frmOpt.vAl)
	{
		globals.ma_utl_showWarningDialog('La data di partenza non può superare la data di fine','Stampa report timbrature causalizzate');
		return false;
	}
	return true;
}