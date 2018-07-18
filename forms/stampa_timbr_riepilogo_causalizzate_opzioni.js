/**
 * Filtra le causali selezionabili in base alla ditta selezionata
 * 
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"0F15826F-8DB1-4F2E-887C-4F80B47C42AC"}
 */
function FiltraCausali(fs)
{
	fs.addFoundSetFilterParam('idditta','=',forms.stampa_timbr_riepilogo_causalizzate.vIdDitta);
	return fs;
}

/**
 * Aggiorna le causali selezionate
 * 
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"DED51EB4-FCAD-40FB-ACC4-AD073C76F95C"}
 * @AllowToRunInFind
 */
function AggiornaCausali(rec)
{
	var _numCausali = vElencoCausali.length;
	for (var i=0;i<_numCausali;i++)
	{
		/** @type {JSFoundSet<db:/ma_presenze/e2timbratureserviziogestione>} */
		var fs = databaseManager.getFoundSet(globals.Server.MA_PRESENZE, 'e2timbratureserviziogestione');
		if(fs.find())
		{
			fs.causale = vElencoCausali[i];
			fs.idditta = forms.stampa_timbr_riepilogo_causalizzate.vIdDitta;
			if(fs.search())
			   vRiepilogoCausali = vRiepilogoCausali.concat(fs.causale, ' - ', fs.descrizione, '\n');
		}
	}
}