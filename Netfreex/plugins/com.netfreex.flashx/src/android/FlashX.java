package com.netfreex.plugin;
import java.net.*;
import java.io.*;
import java.nio.charset.Charset;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import java.util.Scanner;

public class FlashX extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("extract")) {
			try{
				String id = data.getString(0);
				
				String url = "http://www.flash-x.tv/"+id+".html";
		
				URL obj = new URL(url);
				String content = null;
				
				StringBuilder sb = new StringBuilder();
				URLConnection urlConn = null;
				InputStreamReader inn = null;
				
				urlConn = obj.openConnection();
				urlConn.setRequestProperty( "User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
				if (urlConn != null)
					urlConn.setReadTimeout(60 * 1000);
				if (urlConn != null && urlConn.getInputStream() != null) {
					inn = new InputStreamReader(urlConn.getInputStream(),
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
				
				String code = content.split("file_id', '")[1].split("'")[0];
				String postUrl = content.split("POST\" action=\"")[1].split("\"")[0];
				String fname = content.split("fname\" value=\"")[1].split("\"")[0];
				 String referer = content.split("referer\" value=\"")[1].split("\"")[0];
				 String hash = content.split("hash\" value=\"")[1].split("\"")[0];
		
				 //Send coding call////////////////////////////////////////////////////////
				 obj = new URL("http://www.flashx.tv/coding.js?c="+code);
					urlConn = obj.openConnection();
					urlConn.setRequestProperty( "User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
					if (urlConn != null)
						urlConn.setReadTimeout(60 * 1000);
					if (urlConn != null && urlConn.getInputStream() != null) {
						inn = new InputStreamReader(urlConn.getInputStream(),
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
				 
				 //Send post call//////////////////////////////////////////////////////
				 obj = new URL(postUrl);
				 
				 HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		
				 //add reuqest header
				 con.setRequestMethod("POST");
				 con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
				 con.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded"); 
				 con.setRequestProperty( "User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/20100101 Firefox/18.0");
			
				 String urlParameters  = "op=download1&usr_login=&id="+id+"&fname="+fname+"&referer="+referer+"&hash="+hash+"&imhuman=Proceed to video";
				 
				 // Send post request
				 con.setDoOutput(true);
				 DataOutputStream wr = new DataOutputStream(con.getOutputStream());
				 wr.writeBytes(urlParameters);
				 wr.flush();
				 wr.close();
				 Thread.sleep(5000);
				 BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
				 String inputLine;
				 StringBuffer response = new StringBuffer();
			
				 while ((inputLine = in.readLine()) != null) {
				 response.append(inputLine);
				 }
				 in.close();
				 String res = response.toString();

				res = "eval"+res.split("<script type='text/javascript'>eval")[1].split("</script>")[0];
				
				callbackContext.success(res);
				
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
