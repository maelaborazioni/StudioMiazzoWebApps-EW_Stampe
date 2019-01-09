/**
 * @type {Number} *
 * 
 * @properties={typeid:35,uuid:"F01E5535-57A7-4B19-A208-9C3B264AA8E9",variableType:-4}
 */
var vIdDitta = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 * @override
 *
 * @properties={typeid:24,uuid:"2FE403BB-D79B-46F6-812F-CF948FB8DBA5"}
 */
 function confermaStampa(event)
 {
 	if(validaOpzioni())
 	{
 		var params = {
 			processFunction: process_conferma_stampa_timbrature_web,
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
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"7A704A68-9FAD-454E-849D-EECC6B17B320"}
 */
function process_conferma_stampa_timbrature_web(event)
{
	try
	{
		globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
		globals.svy_mod_closeForm(event);
		stampaReportWeb(event);
	}
	catch(ex)
	{
		var msg = 'Metodo process_conferma_stampa_timbrature_web : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
	
}

/**
 * @properties={typeid:24,uuid:"F88F5D06-AE09-4D14-9B6A-FD937A42A1CA"}
 */
function validaOpzioni()
{
	var frmOpt = forms.stampa_timbr_web_opzioni;
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
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"70C349B3-10D9-468E-90E5-BDF4EBF970C3"}
 */
function stampaReportWeb(event)
{
	try
	{
		var frmOpt = forms.stampa_timbr_web_opzioni;
		
			var parameters;
			var reportName = 'TimbratureWeb';
			var dalTimbratura = frmOpt.vDal;
			var alTimbratura = frmOpt.vAl;
			var arrCausali = [];
			parameters =
			   {
				   pidditta					:	vIdDitta,
				   pdaltimbratura			:	parseInt(globals.dateFormat(dalTimbratura,globals.ISO_DATEFORMAT) + '0000',10),
				   paltimbratura      		:	parseInt(globals.dateFormat(new Date(alTimbratura.getFullYear(),alTimbratura.getMonth(),alTimbratura.getDate()),globals.ISO_DATEFORMAT) + '2359',10),
				   pelencocausali           :   arrCausali,
				   pdal                     :   dalTimbratura,
				   pal                      :   alTimbratura
			   }
			 
			/**
			 * Save additional operation's information
			 */
			var vDateTo = new Date();
			var values = 
			{
				op_hash		: utils.stringMD5HashBase64(vIdDitta.toString() + vDateTo),
				op_ditta	: vIdDitta,
				op_message	: globals.getNumMese(dalTimbratura.getMonth() + 1) + '/' + dalTimbratura.getFullYear(),
				op_periodo 	: dalTimbratura.getFullYear() * 100 + dalTimbratura.getMonth() + 1
			};
			
			globals.startAsyncOperation
			(
				 globals.createReport
				,[
					 globals.getSwitchedServer(globals.Server.MA_PRESENZE)
					,parameters
					,'TimbratureWebRiepilogo.jasper'
					,[[reportName, dalTimbratura.getFullYear(), globals.getNumMese(dalTimbratura.getMonth() + 1)].join('_'),'pdf'].join('.')
				 ]
				, null
				, null
				, globals.OpType.STWeb
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
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} [svyNavBaseOnShow]
 *
 * @private
 * @override
 *
 * @properties={typeid:24,uuid:"FB105794-107D-4ECD-9C12-9FDD692C0522"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	
	if(firstShow)
	{	
		var anno = globals.getAnno();
		var mese = globals.getMese();
		
		if(anno && mese)
		{
			var frmOpt = forms.stampa_timbr_web_opzioni;
			frmOpt.vDal = new Date(anno, mese - 1,1);
			frmOpt.vAl = new Date(anno, mese - 1, globals.getTotGiorniMese(mese,anno));
		}
	}
}
