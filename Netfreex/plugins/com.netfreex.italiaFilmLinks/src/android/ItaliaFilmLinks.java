package com.netfreex.plugin;
import java.net.*;
import java.io.*;
import java.nio.charset.Charset;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import java.util.Scanner;

public class ItaliaFilmLinks extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("extract")) {
			try{
				String id = data.getString(0);

				URL url = new URL("http://hdlink.video/l/"+ id+"?host=2" );
				
				URLConnection connection = null;
				String content = null;
				InputStreamReader inn = null;
				StringBuilder sb = new StringBuilder();
				
				connection =  url.openConnection();
				connection.setRequestProperty( "User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
				connection.setRequestProperty( "Referer", "http://www.italia-film.co");
				if (connection != null)
					connection.setReadTimeout(60 * 1000);
				if (connection != null && connection.getInputStream() != null) {
					inn = new InputStreamReader(connection.getInputStream(),
							Charset.defaultCharset());
					BufferedReader bufferedReader = new BufferedReader(inn);
					if (bufferedReader != null) {
						int cp;
						while ((cp = bufferedReader.read()) != -1) {
							sb.append((char) cp);
						}
						bufferedReader.close();
					}
				}
				inn.close();
				
				content = sb.toString();

				content = content.split("/embed/")[1].split("/")[0];
				
				callbackContext.success("italiaFilmLinks|" + content);
					
				
					
			}catch(Exception ex)
			{
				callbackContext.error(ex.toString());
			}
            

            return true;

        } else {
            
            return false;

        }
    }
}
