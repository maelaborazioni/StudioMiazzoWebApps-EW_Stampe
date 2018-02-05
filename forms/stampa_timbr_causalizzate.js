/**
 * @type {Number} *
 * 
 * @properties={typeid:35,uuid:"3BE96072-68D5-4833-8A5B-0446995F40FE",variableType:-4}
 */
var vIdDitta = null;

/**
 * Imposta i parametri per la generazione del report e lancia l'operazione asincrona
 * 
 * @properties={typeid:24,uuid:"1399CF26-CDFC-40D6-BBFC-925389F942B8"}
 */
function stampaReportCausalizzate(event)
{
	try
	{
		var frmOpt = forms.stampa_timbr_causalizzate_opzioni;
		
			var parameters;
			var reportName = 'TimbratureCausalizzate';
			var dallaData = frmOpt.vDal;
			var allaData = frmOpt.vAl;
			var arrCausali = frmOpt.vChkCausali ? frmOpt.vElencoCausali : globals.getCausaliTimbratureDitta(vIdDitta);
			parameters =
			   {
				   pidditta					:	vIdDitta,
				   pdalladata				:	dallaData,
				   palladata      			:	new Date(allaData.getFullYear(),allaData.getMonth(),allaData.getDate() + 1),
				   pelencocausali           :   arrCausali,
				   pnumerotimbrature        :   frmOpt.vNumTimbr
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
					,'TimbratureCausalizzate.jasper'
					,[[reportName, dallaData.getFullYear(), globals.getNumMese(dallaData.getMonth() + 1)].join('_'),'pdf'].join('.')
				 ]
				, null
				, null
				, globals.OpType.STCau
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
 * @properties={typeid:24,uuid:"18675B32-0F96-4D8A-91DB-BC3EADFC89AB"}
 */
function validaOpzioni()
{
	var frmOpt = forms.stampa_timbr_causalizzate_opzioni;
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

/**
 * Procede con la creazione del report di stampa delle causalizzate
 * 
 * @param event
 *
 * @properties={typeid:24,uuid:"77A6AF24-E139-41F2-9658-EEF03AB66F25"}
 */
function confermaStampa(event)
{
	if(validaOpzioni())
	{
		var params = {
			processFunction: process_conferma_stampa_timbrature_causalizzate,
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
}


/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"9D0BC94B-D6F2-401B-B744-8FC49E2A802E"}
 */
function process_conferma_stampa_timbrature_causalizzate(event)
{
	try
	{
		globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
		globals.svy_mod_closeForm(event);
		stampaReportCausalizzate(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_timbrature_causalizzate : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
	
}

/**
 *
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @param {Boolean} svyNavBaseOnShow
 *
 * @properties={typeid:24,uuid:"56D44D68-64F4-4171-BA95-C6D80696BE56"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	plugins.busy.prepare();
	return _super.onShowForm(firstShow, event, svyNavBaseOnShow)
}
