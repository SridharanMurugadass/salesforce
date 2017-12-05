package com.excelacom.century;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class SalesController {
	
	
	@RequestMapping(value = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public JSONObject create(@RequestBody String JsonVal) throws FileNotFoundException, IOException, ParseException {
		 
		 JSONParser parser = new JSONParser();
		 
		 Object obj = parser.parse(new FileReader("test.json"));

         JSONObject jsonObject = (JSONObject) obj;
         
         JSONObject json = (JSONObject) parser.parse(JsonVal);
         
				
		JSONObject jsonObject2 = new JSONObject();
		
		Set<String> keys = jsonObject.keySet();
		Iterator<String> itr = keys.iterator();
		String key = null;
		String val = null;

		while(itr.hasNext()) {
			key = itr.next();
			val = (String)jsonObject.get(key);			
			System.out.println(key + " : "+json.get(val));	
			jsonObject2.put(key, json.get(val));
		}
		System.out.println(jsonObject2);
		
		return jsonObject2;
	}
	
	
	@RequestMapping(value = "/createFile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public String createFile(@RequestBody String JsonVal) {

		
		 try (FileWriter file = new FileWriter("test2.json")) {

	            file.write(JsonVal);
	            file.flush();

	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		
		
		return JsonVal;

	}
	
	
	@RequestMapping(value = "/createSales", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public JSONObject createSales(@RequestBody String JsonVal) throws FileNotFoundException, IOException, ParseException {
		 
		 JSONParser parser = new JSONParser();
		 JSONObject json = (JSONObject) parser.parse(JsonVal);
		 
		 Object obj = parser.parse(new FileReader("test2.json"));
		 JSONObject jsonObject = (JSONObject) obj;
		 
		 JSONArray solutions = (JSONArray) jsonObject.get("Id");
		 
		 JSONObject jsonObject2 = new JSONObject();
		 
		 for(Object jsondata : solutions){
			 JSONObject jb = (JSONObject)jsondata;
			 Set<String> keys = jb.keySet();
		 		Iterator<String> itr = keys.iterator();
		 		String key = null;
		 		String val = null;
		
		 		while(itr.hasNext()) {
		 			key = itr.next().toString();
		 			val = (String)jb.get(key);			
//		 			System.out.println(key + " : "+val);
		 			if(key.equals("Direction") && !jb.get(key).equals("0")) {
//		 				System.out.println(key + " : "+jb.get(key));	
		 				
		 				System.out.println(jb.get("ColumnName") + " : "+json.get(jb.get("SalesName")));
		 			
		 				jsonObject2.put(jb.get("ColumnName"), json.get(jb.get("SalesName")));
		 			}
		 			 
		 		}
//		 		System.out.println(json);
             
         }
		 
		 RestTemplate restTemplate = new RestTemplate();
		 
			String postUrl = "http://127.0.0.1:1400/create";
			
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<String> entity = new HttpEntity<String>(jsonObject2.toString(), headers);
			String response = restTemplate.postForObject(postUrl, entity, String.class);

			System.out.println(" /POST ends!" + response);
	
		return jsonObject2;
	
	}
	
	

}
