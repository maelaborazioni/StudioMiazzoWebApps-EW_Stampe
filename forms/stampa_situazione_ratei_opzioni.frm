dataSource:"db:/ma_anagrafiche/ditte",
extendsID:"3C1793B0-0735-44AD-AE5B-B914E92636BA",
items:[
{
extendsID:"8EF8FA14-9073-407F-A278-C4D516E29C86",
height:120,
typeid:19,
uuid:"1EBE3BF2-5B1A-44FB-BBDA-F35F2F0563C5"
},
{
location:"10,30",
name:"lbl_codici_ratei",
text:"Codici ratei",
transparent:true,
typeid:7,
uuid:"33D3FC1F-7656-4358-830A-CD2640EC06C5"
},
{
location:"32,175",
name:"lblfiltro_residuo",
size:"104,20",
text:"Filtro sul residuo",
transparent:true,
typeid:7,
uuid:"416BF1AC-2725-4018-9477-0C6EEF9BF539",
visible:false
},
{
dataProviderID:"vRiepilogoRateiSelezionati",
displayType:1,
editable:false,
location:"10,50",
name:"txt_codici_ratei",
size:"390,60",
typeid:4,
uuid:"5411C8F2-E5D9-40AC-8419-304B731DF152"
},
{
dataProviderID:"_valConfronto",
location:"216,175",
name:"fld_val_confronto",
size:"81,20",
typeid:4,
uuid:"57EC45D5-9F56-4884-8681-488F4736D001",
visible:false
},
{
formIndex:1,
labelFor:"fld_alla_data",
location:"150,10",
name:"bt_calendario",
onActionMethodID:"763FDDFF-2CFE-46E2-A447-E7F60173BC57",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"btn_calendar",
transparent:true,
typeid:7,
uuid:"6EA73671-BD44-4265-B640-F76DAC7CCA52"
},
{
location:"10,10",
name:"lbl_alla_data",
text:"Alla data ",
transparent:true,
typeid:7,
uuid:"70F6AFC2-00BA-49C9-B1F0-90F20745DA49"
},
{
dataProviderID:"vDatiContrattuali",
displayType:4,
horizontalAlignment:0,
location:"180,11",
name:"chk_dati_contrattuali",
size:"20,20",
styleClass:"check",
transparent:true,
typeid:4,
uuid:"80F9D99C-ED3A-4DAB-8088-3391BE2D4AB6"
},
{
dataProviderID:"vOpConfronto",
displayType:11,
horizontalAlignment:0,
location:"156,175",
name:"fld_op_confronto",
size:"50,20",
typeid:4,
uuid:"99D028F9-407D-4C55-9A0A-882121FBF118",
valuelistID:"F8A67FDB-FC6D-4FE7-B7A9-01F92E8CDCCE",
visible:false
},
{
location:"200,10",
name:"lbl_dati_contrattuali",
size:"140,20",
text:"Stampa i dati contrattuali",
transparent:true,
typeid:7,
uuid:"AB9262A0-914A-43E5-AA7D-C8CFC296D924"
},
{
dataProviderID:"vAllaData",
format:"dd/MM/yyyy|mask",
location:"90,10",
name:"fld_alla_data",
size:"80,20",
typeid:4,
uuid:"B53327CD-503B-41BA-8951-83066799DF49"
},
{
customProperties:"methods:{\
onActionMethodID:{\
arguments:[\
null,\
\"'vIdRateoDitta'\",\
\"'LEAF_Lkp_Ratei'\",\
null,\
\"'FiltraRatei'\",\
null,\
null,\
null,\
\"true\",\
null,\
null,\
\"true\",\
\"'AggiornaSelezioneRatei'\"\
]\
}\
}",
enabled:false,
horizontalAlignment:0,
location:"405,90",
name:"btn_lkp_codice",
onActionMethodID:"09683411-0331-4A08-BF5E-656611194522",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"btn_lookup",
transparent:true,
typeid:7,
uuid:"C164E41A-DDC5-40A6-BE12-210634CBED50"
},
{
dataProviderID:"vCodiciRatei",
displayType:4,
horizontalAlignment:0,
location:"405,50",
name:"chk_codici_ratei",
onDataChangeMethodID:"E673B1E9-8510-43CD-A193-4D298AC72B31",
size:"20,20",
styleClass:"check",
transparent:true,
typeid:4,
uuid:"D30F3C7C-260A-4643-BD5B-40744BA1024F"
},
{
height:120,
partType:5,
typeid:19,
uuid:"DEC2774F-4310-4445-ACCB-7A61B9A578A7"
},
{
dataProviderID:"vFiltroResiduo",
displayType:4,
horizontalAlignment:0,
location:"7,175",
name:"chk_filtro_residuo",
size:"20,20",
styleClass:"check",
transparent:true,
typeid:4,
uuid:"F69B9F12-7320-49A2-8483-4D38B0A42E46",
visible:false
}
],
name:"stampa_situazione_ratei_opzioni",
navigatorID:"-1",
onShowMethodID:"-1",
scrollbars:36,
size:"435,120",
styleName:"leaf_style",
typeid:3,
uuid:"CE82E60F-19FF-46B5-B0D9-5E787C815AB9"