package com.excelacom.century;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.excelacom.century.Database;
import com.excelacom.century.DatabaseRepo;

@RestController
public class DatabaseController {

	@Autowired
	DatabaseRepo dataRepo;

	@Autowired
	MongoTemplate mongoTemplate;

	@RequestMapping(value = "/createData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Database createData(@RequestBody Database data) {
		
		data.setId("12345");

		mongoTemplate.save(data);

		return data;
	}
	
	@RequestMapping(value = "/getData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Database> getData() {

		System.out.println("Begin /GET request!");

		return dataRepo.findAll();
	}
	
}
