package com.example.plugin;
import java.net.*;
import java.io.*;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import java.util.Scanner;

public class Hello extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("greet")) {
			try{
				String id = data.getString(0);
				//String id = "e65c1fdf031e4";
				
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
				String server = link.substring(0, link.indexOf('.'));
				String restOfLink = link.substring(link.indexOf('.')+1, link.length());
				
				System.out.println(link);
				System.out.println(server);
				System.out.println(restOfLink);
				server = server.substring(0, server.length()-1) + "0";
		
				URL urlVideo = new URL("http://" + server + "." + restOfLink);
				callbackContext.success("http://" + server + "." + restOfLink);
				/*
				int responseCode = 0;
				try{
					HttpURLConnection huc = (HttpURLConnection) urlVideo.openConnection();
					huc.setRequestMethod("HEAD");
					responseCode = huc.getResponseCode();
				}
				catch(Exception ex){
					String[] listServers = new String[] {"00","10","20","30","40","50","70","80","90","100","110","120","130","140","150","160","180","190","200","210","220","230","240","250","260","270","280","290","60"};
					
					for (String s : listServers) {
						urlVideo = new URL("http://s" + s + "." + restOfLink);
						try{
							System.out.println(s);
							HttpURLConnection huc = (HttpURLConnection) urlVideo.openConnection();
							huc.setRequestMethod("HEAD");
							responseCode = huc.getResponseCode();
						}
						catch(Exception e){
							e.toString();
						}
						if (responseCode == 200) {
							System.out.println("GOOD");
							callbackContext.success("http://s" + s + "." + restOfLink);
							break;
						}
						
					}

				}
				if (responseCode == 200) {
					callbackContext.success("http://" + server + "." + restOfLink);
					System.out.println("GOOD");
				}
				//in.close();
				*/
				
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
