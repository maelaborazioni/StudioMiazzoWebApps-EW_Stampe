/**
 * @properties={typeid:24,uuid:"D708D8A0-BE7A-4D2B-9CBC-5AA9250C90CE"}
 */
function getOptions()
{
	return { 
		userid                  : security.getUserName(), 
		clientid                : security.getClientID(),
		server                  : globals.server_db_name,
		databasecliente         : globals.customer_dbserver_name
		};
}