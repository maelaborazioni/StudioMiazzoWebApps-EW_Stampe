extendsID:"3C1793B0-0735-44AD-AE5B-B914E92636BA",
items:[
{
location:"35,80",
size:"173,20",
text:"Solo dipendenti in forza al",
transparent:true,
typeid:7,
uuid:"013F490A-CC70-402D-91E3-81EB0A14AA88"
},
{
customProperties:"methods:{\
onActionMethodID:{\
arguments:[\
null,\
null,\
\"'LEAF_Lkp_Eventiclassi'\",\
\"'AggiornaEventiClasse'\",\
\"'FiltraEventiClasse'\",\
null,\
null,\
null,\
\"true\"\
]\
}\
}",
horizontalAlignment:0,
location:"40,20",
mediaOptions:10,
name:"btn_lkp_ev",
onActionMethodID:"09683411-0331-4A08-BF5E-656611194522",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"btn_lookup",
transparent:true,
typeid:7,
uuid:"16193191-FD15-4C00-8356-D8D3CA19BB19"
},
{
dataProviderID:"vSoloCertMese",
displayType:4,
horizontalAlignment:0,
location:"10,50",
name:"chk_solo_cert_mese",
onDataChangeMethodID:"350CC6AC-B1FB-4075-AD5F-754D2055F193",
size:"20,20",
styleClass:"check",
transparent:true,
typeid:4,
uuid:"20541806-A6A9-4669-98EE-1728DD6666FA"
},
{
location:"10,0",
name:"lbl_ev_lungo",
size:"100,20",
text:"Evento lungo",
transparent:true,
typeid:7,
uuid:"20612175-598F-426A-BE2F-D8C2FD269350"
},
{
location:"300,110",
size:"55,20",
text:"ed il giorno",
transparent:true,
typeid:7,
uuid:"2A365111-63CF-476B-BDC1-9BD1BFCAE320"
},
{
height:140,
partType:5,
typeid:19,
uuid:"45889C1B-2C19-426B-9B12-EB86A3550190"
},
{
dataProviderID:"vTipoSituazioneEventi",
displayType:3,
editable:false,
enabled:false,
location:"300,20",
name:"rb_tipo_statistica",
onDataChangeMethodID:"-1",
size:"140,43",
transparent:true,
typeid:4,
uuid:"5D9F387F-E3D7-48E1-A701-8A5278BE8E0E",
valuelistID:"7B5E742F-4C15-4D2C-92FC-471A6F543129"
},
{
dataProviderID:"vCertificatiCompresiTraAl",
enabled:false,
format:"dd/MM/yyyy|mask",
location:"359,110",
name:"fld_cert_compresi_tra_al",
size:"80,20",
typeid:4,
uuid:"678EE477-435A-4EDF-8637-B95EA9B78D31"
},
{
dataProviderID:"vCertCompresiTra",
displayType:4,
horizontalAlignment:0,
location:"10,110",
name:"chk_cert_compresi_tra",
onDataChangeMethodID:"29145925-E763-4DA1-AA85-C16FD4449E32",
size:"20,20",
styleClass:"check",
transparent:true,
typeid:4,
uuid:"741E133B-42F6-4CAD-8A0F-2850915F0E1F"
},
{
extendsID:"8EF8FA14-9073-407F-A278-C4D516E29C86",
height:140,
typeid:19,
uuid:"80BD9AC6-90B0-4AC8-9A40-54C07D168DE1"
},
{
labelFor:"rb_tipo_statistica",
location:"300,0",
name:"lbl_tipologia",
size:"122,20",
text:"Tipologia",
transparent:true,
typeid:7,
uuid:"8C0C9296-1B4D-40F1-9D7B-A0C4895680D2"
},
{
dataProviderID:"vSoloCertMeseDate",
enabled:false,
format:"MM/yyyy|mask",
location:"210,50",
name:"fld_solo_cert_mese",
size:"80,20",
typeid:4,
uuid:"8E6D3F84-EC13-4B5E-A59D-4053BA82F55E"
},
{
dataProviderID:"vCertificatiCompresiTraDal",
enabled:false,
format:"dd/MM/yyyy|mask",
location:"210,111",
name:"fld_cert_compresi_tra_dal",
size:"80,20",
typeid:4,
uuid:"96476838-5833-4C24-A355-FE13B83D54F6"
},
{
dataProviderID:"vCodClasseDesc",
location:"60,20",
name:"fld_ev_lungo_desc",
size:"230,20",
typeid:4,
uuid:"9BFFC89D-25B9-48F0-BDBE-AB5D44B9474F"
},
{
customProperties:"",
enabled:false,
horizontalAlignment:0,
labelFor:"fld_cert_compresi_tra_dal",
location:"270,111",
mediaOptions:10,
name:"btn_solo_cert_dal",
onActionMethodID:"763FDDFF-2CFE-46E2-A447-E7F60173BC57",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"btn_calendar",
transparent:true,
typeid:7,
uuid:"9F61131F-E6DA-4755-966F-6038DC530793"
},
{
customProperties:"",
enabled:false,
horizontalAlignment:0,
labelFor:"fld_solo_cert_mese",
location:"270,50",
mediaOptions:10,
name:"btn_solo_cert",
onActionMethodID:"763FDDFF-2CFE-46E2-A447-E7F60173BC57",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"btn_calendar",
transparent:true,
typeid:7,
uuid:"AE7F573B-80D5-4A7B-BB3D-045C59D14D22"
},
{
dataProviderID:"vCodClasse",
horizontalAlignment:0,
location:"10,20",
name:"fld_ev_lungo",
onDataChangeMethodID:"283BE36B-919A-4F04-9560-5E40924F8926",
size:"30,20",
typeid:4,
uuid:"B5C340E3-8EF3-44E4-8D6C-268F86DDDD9D"
},
{
customProperties:"",
enabled:false,
horizontalAlignment:0,
labelFor:"fld_cert_compresi_tra_al",
location:"419,110",
mediaOptions:10,
name:"btn_solo_cert_al",
onActionMethodID:"763FDDFF-2CFE-46E2-A447-E7F60173BC57",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"btn_calendar",
transparent:true,
typeid:7,
uuid:"BCBDB100-3F5C-4E5C-8F95-D2C7CDA55174"
},
{
location:"35,50",
size:"173,20",
text:"Solo certificazioni nel mese",
transparent:true,
typeid:7,
uuid:"C3CE4528-56A3-448E-A40D-EBEABF3D59E5"
},
{
customProperties:"",
enabled:false,
formIndex:1,
horizontalAlignment:0,
labelFor:"fld_solo_inforza_al",
location:"270,80",
mediaOptions:10,
name:"btn_solo_in_forza",
onActionMethodID:"763FDDFF-2CFE-46E2-A447-E7F60173BC57",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"btn_calendar",
transparent:true,
typeid:7,
uuid:"C9C98F21-FC52-4637-9B0F-EAFAE75E0D6A"
},
{
location:"35,111",
size:"173,20",
text:"Certificati compresi tra il giorno",
transparent:true,
typeid:7,
uuid:"CA56B66A-87A5-4221-8FB2-894067CD112C"
},
{
dataProviderID:"vSoloDipInForzaAlDate",
enabled:false,
format:"dd/MM/yyyy|mask",
location:"210,80",
name:"fld_solo_inforza_al",
size:"80,20",
typeid:4,
uuid:"D7E92BB2-1207-45D3-8826-B747A837E62B"
},
{
dataProviderID:"vSoloDipInForzaAl",
displayType:4,
horizontalAlignment:0,
location:"10,80",
name:"chk_solo_inforza",
onDataChangeMethodID:"F37F0D07-74AE-4EA3-B928-C1DF17C29081",
size:"20,20",
styleClass:"check",
transparent:true,
typeid:4,
uuid:"F32DD529-3C17-46A6-95F8-10DE544625C2"
}
],
name:"stampa_situazione_eventi_lunghi_opzioni",
navigatorID:"-1",
size:"450,140",
styleName:"leaf_style",
typeid:3,
uuid:"F40A3293-6C8B-469E-AFF4-AC420069A9A6"