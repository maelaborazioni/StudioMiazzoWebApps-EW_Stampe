/**
 * @properties={typeid:24,uuid:"D708D8A0-BE7A-4D2B-9CBC-5AA9250C90CE"}
 */
function getOptions()
{
	return { 
		user_id                 : security.getUserName(), 
		client_id               : security.getClientID(),
		tipoconnessione         : globals.getTipoConnessione()
		};
}