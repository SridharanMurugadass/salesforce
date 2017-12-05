package com.excelacom.century;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.excelacom.century.Objectconfig;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.excelacom.century.ObjectRepo;

@RestController
public class ObjectController {

	@Autowired
	ObjectRepo objRepo;

	@Autowired
	MongoTemplate mongoTemplate;

	@RequestMapping(value = "/createParam", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Objectconfig create(@RequestBody Objectconfig object) {

		UUID paramid = UUID.randomUUID();
		
		BasicDBObject update = new BasicDBObject();
		update.put("id", "12345");
		
		BasicDBObject obj = new BasicDBObject();
		obj.put("paramid",paramid.toString());
		obj.put("salesname",object.getSalesname());
		obj.put("chartname", object.getChartname());
		obj.put("columnname", object.getColumnname());
		obj.put("direction", object.getDirection());
		
		BasicDBObject query = new BasicDBObject();
		query.put("$push", new BasicDBObject("paramid",obj));
		
		mongoTemplate.getCollection("objectconfig").update(update, query,true,true);
	    

		return object;
	}
	
	@RequestMapping(value = "/updateParam", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Objectconfig updateParam(@RequestBody Objectconfig object) {

		
		
		BasicDBObject delete = new BasicDBObject();
		delete.put("id", "12345");
		
		BasicDBObject param = new BasicDBObject();
		param.put("paramid", object.getId());
		
		BasicDBObject deleteQuery = new BasicDBObject();
		deleteQuery.put("$pull", new BasicDBObject("paramid",param));
		
		mongoTemplate.getCollection("objectconfig").update(delete, deleteQuery,true,true);
		
		BasicDBObject update = new BasicDBObject();
		delete.put("id", "12345");
		
		BasicDBObject obj = new BasicDBObject();
		obj.put("paramid",object.getId());
		obj.put("salesname",object.getSalesname());
		obj.put("chartname", object.getChartname());
		obj.put("columnname", object.getColumnname());
		obj.put("direction", object.getDirection());
		
		BasicDBObject query = new BasicDBObject();
		query.put("$push", new BasicDBObject("paramid",obj));
		
		mongoTemplate.getCollection("objectconfig").update(update, query,true,true);
	    

		return object;
	}
	
	@RequestMapping(value = "/getParam", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public DBObject getParam() {

		return mongoTemplate.getCollection("objectconfig").findOne();
	}
	
}
