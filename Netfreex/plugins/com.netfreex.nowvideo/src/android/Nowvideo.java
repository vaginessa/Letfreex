package com.netfreex.plugin;
import java.net.*;
import java.io.*;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import java.util.Scanner;

public class Nowvideo extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("extract")) {
			try{
				String id = data.getString(0);
				
				String[] serverPremium = {"s210","s00", "s40", "s10", "s20", "s30", "s50", "s70", "s80", "s90", "s100", "s110", "s120", "s130", "s140", "s160", "s170", "s180", "s190", "s200", "s220", "s230", "s240", "s250", "s260", "s270", "s280", "s290"};
    	
				URL url = new URL("http://www.nowvideo.li/mobile/video.php?id="+ id + "&download=2");
				URLConnection connection = null;
				String content = null;
				connection =  url.openConnection();
				Scanner scanner = new Scanner(connection.getInputStream());
				scanner.useDelimiter("\\Z");
				content = scanner.next();
			
				String[] array = content.split("<source src=\"http://");
				String link ="";
				if(array.length>2)
					link = array[2].split("\"")[0];
				else
					link = array[1].split("\"")[0];
				String originalServer = link.substring(0, link.indexOf('.'));
				String restOfLink = link.substring(link.indexOf('.')+1, link.length());
				
				System.out.println(link);
				System.out.println(originalServer);
				System.out.println(restOfLink);
				
				String server = originalServer.substring(0, originalServer.length()-1) + "0";

				URL urlVideo = new URL("http://" + server + "." + restOfLink);
				
				int responseCode = 0;
				try{
					HttpURLConnection huc = (HttpURLConnection) urlVideo.openConnection();
					huc.setRequestMethod("HEAD");
					huc.setConnectTimeout(2000); 
					responseCode = huc.getResponseCode();
					if (responseCode != 200)
						throw new Exception();
					callbackContext.success("http://" + server + "." + restOfLink);
				}
				catch(Exception e){
					for (String tryServer : serverPremium){
						try{
							urlVideo = new URL("http://"+tryServer+"." + restOfLink);
							HttpURLConnection huc = (HttpURLConnection) urlVideo.openConnection();
							huc.setRequestMethod("HEAD");
							huc.setConnectTimeout(2000); 
							responseCode = huc.getResponseCode();
							if (responseCode != 200)
								throw new Exception();
							callbackContext.success("http://" + tryServer + "." + restOfLink);
						}
						catch(Exception exc){
							
						}
					}
					callbackContext.success("http://" + originalServer + "." + restOfLink);
				}
				
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
